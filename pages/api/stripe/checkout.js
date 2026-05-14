import { stripe } from '@/lib/stripe';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

const PLANS = {
  monthly: { amount: 999,  interval: 'month', label: 'UnitLocker Pro — Monthly' },
  annual:  { amount: 7999, interval: 'year',  label: 'UnitLocker Pro — Annual'  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const cookies = parse(req.headers.cookie || '');
    const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    await connectDB();
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    const { plan = 'monthly' } = req.body;
    const config = PLANS[plan] ?? PLANS.monthly;

    // Reuse existing Stripe customer or create one
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user._id.toString() },
      });
      customerId = customer.id;
      await User.findByIdAndUpdate(user._id, { stripeCustomerId: customerId });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: config.label },
          unit_amount: config.amount,
          recurring: { interval: config.interval },
        },
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/picks?subscribed=true`,
      cancel_url:  `${process.env.NEXT_PUBLIC_URL}/picks`,
      subscription_data: {
        metadata: { userId: user._id.toString() },
      },
      allow_promotion_codes: true,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
