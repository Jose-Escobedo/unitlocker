import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export const config = { api: { bodyParser: false } };

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

// Find user by metadata.userId first, fall back to stripeCustomerId
async function findUser(subscription) {
  await connectDB();
  const userId = subscription.metadata?.userId;
  if (userId) return User.findById(userId);
  // Fallback: look up by Stripe customer ID
  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer?.id;
  if (customerId) return User.findOne({ stripeCustomerId: customerId });
  return null;
}

async function syncSubscription(subscription) {
  const user = await findUser(subscription);
  if (!user) {
    console.warn('syncSubscription: no user found for subscription', subscription.id);
    return;
  }

  const status = subscription.status === 'active' ? 'active'
    : subscription.status === 'past_due' ? 'past_due'
    : 'inactive';

  const periodEnd = subscription.current_period_end
    ? new Date(subscription.current_period_end * 1000)
    : null;

  await User.findByIdAndUpdate(user._id, {
    subscriptionStatus: status,
    subscriptionEndsAt: periodEnd,
    cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
    // Keep stripeCustomerId in sync in case it wasn't set yet
    ...(user.stripeCustomerId ? {} : {
      stripeCustomerId: typeof subscription.customer === 'string'
        ? subscription.customer
        : subscription.customer?.id,
    }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: `Webhook error: ${err.message}` });
  }

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.mode === 'subscription' && session.subscription) {
          // session.subscription may be a string ID or an already-expanded object
          const subId = typeof session.subscription === 'string'
            ? session.subscription
            : session.subscription.id;
          const subscription = await stripe.subscriptions.retrieve(subId);
          await syncSubscription(subscription);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await syncSubscription(event.data.object);
        break;

      case 'customer.subscription.deleted': {
        const user = await findUser(event.data.object);
        if (user) {
          await User.findByIdAndUpdate(user._id, {
            subscriptionStatus: 'inactive',
            subscriptionEndsAt: null,
            cancelAtPeriodEnd: false,
          });
        }
        break;
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).end();
  }

  res.status(200).json({ received: true });
}
