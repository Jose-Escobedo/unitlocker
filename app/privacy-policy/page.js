'use client';

import Link from 'next/link';

const LAST_UPDATED = 'May 14, 2026';
const CONTACT_EMAIL = 'unitlocker@gmail.com';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#0a0c0f' }}>
      <div className="h-px w-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3) 40%, rgba(0,229,160,0.3) 60%, transparent)' }} />

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-5"
            style={{ background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5a0' }} />
            <span className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}>Legal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '-0.03em', color: '#e8ecf0' }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        <div className="flex flex-col gap-10">

          <Section>
            <p>
              UnitLocker ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our sports prop picks service (the "Service"). By using the Service you agree to the practices described here.
            </p>
            <p>
              If you have questions or concerns, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}>{CONTACT_EMAIL}</a>.
            </p>
          </Section>

          <Section title="1. Information We Collect">
            <SubHeading>Information you provide directly</SubHeading>
            <ul>
              <li><strong>Account information</strong> — your full name and email address when you register.</li>
              <li><strong>Payment information</strong> — subscription payments are processed by Stripe. We do not store your full card number, CVV, or banking details. Stripe handles all payment data in accordance with PCI-DSS standards. We receive only a tokenized customer reference and high-level billing details (e.g. last 4 digits, card type, subscription status, and renewal date).</li>
            </ul>
            <SubHeading>Information collected automatically</SubHeading>
            <ul>
              <li><strong>Device and browser information</strong> — browser type, operating system, and device type.</li>
              <li><strong>Usage data</strong> — pages visited, picks viewed, features used, and time spent in the app.</li>
              <li><strong>IP address</strong> — collected for security and fraud prevention.</li>
              <li><strong>Authentication tokens</strong> — we use HTTP-only JWT cookies to maintain your session. These are not accessible to client-side scripts and expire after 7 days.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and maintain your account.</li>
              <li>Provide access to the picks feed based on your subscription status.</li>
              <li>Process and manage subscriptions securely via Stripe.</li>
              <li>Send transactional emails (account creation, subscription confirmation, cancellation).</li>
              <li>Respond to your support requests.</li>
              <li>Monitor usage patterns to fix bugs and improve the Service.</li>
              <li>Detect, investigate, and prevent fraudulent or unauthorized activity.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We do not use your data for advertising purposes.
            </p>
          </Section>

          <Section title="3. How We Share Your Information">
            <p>We do not sell, trade, or rent your personal information. We share information only in these limited circumstances:</p>
            <ul>
              <li><strong>Stripe</strong> — for subscription payment processing. Stripe operates as an independent data controller for payment data. Their privacy policy is available at stripe.com/privacy.</li>
              <li><strong>MongoDB Atlas</strong> — our database infrastructure provider, used to store account and subscription data. Data is stored securely and access-controlled.</li>
              <li><strong>Legal requirements</strong> — if required by law, court order, or governmental authority.</li>
              <li><strong>Protection of rights</strong> — if we believe disclosure is necessary to protect the rights, property, or safety of UnitLocker, our users, or the public.</li>
              <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you via email prior to any such transfer.</li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We retain your account information for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal or compliance purposes (for example, Stripe may retain billing records for tax purposes).
            </p>
            <p>
              Aggregated, anonymized usage data may be retained indefinitely as it cannot be used to identify you.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul>
              <li>Encrypted data transmission via HTTPS/TLS.</li>
              <li>JWT-based authentication stored in HTTP-only cookies, preventing client-side access.</li>
              <li>Passwords stored as bcrypt hashes — we never store plaintext passwords.</li>
              <li>Access controls limiting internal access to user data.</li>
            </ul>
            <p>
              No method of transmission over the internet is 100% secure. While we take reasonable precautions, we cannot guarantee absolute security. In the event of a data breach affecting your personal information, we will notify you as required by applicable law.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              We use a single HTTP-only session cookie to keep you logged in. This cookie does not track you across third-party websites and is automatically cleared when it expires (after 7 days) or when you log out.
            </p>
            <p>
              We do not use advertising cookies, third-party tracking cookies, or analytics cookies that send data to external services.
            </p>
          </Section>

          <Section title="7. Your Rights and Choices">
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong> — request that we correct inaccurate or incomplete data.</li>
              <li><strong>Deletion</strong> — request that we delete your account and personal data.</li>
              <li><strong>Subscription management</strong> — cancel your subscription at any time by contacting us.</li>
              <li><strong>Opt-out of communications</strong> — unsubscribe from non-transactional emails by contacting us directly.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}>{CONTACT_EMAIL}</a>. We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              UnitLocker is not directed to anyone under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has created an account, please contact us and we will promptly delete it.
            </p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>
              The Service may contain links to third-party websites such as our Discord community or sportsbook partners. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies before providing any information.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. If changes are material, we will notify you via email. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have any questions, concerns, or data requests regarding this Privacy Policy, please contact us:</p>
            <div className="mt-2 p-5 rounded-xl" style={{ background: '#111418', border: '1px solid #1e242c' }}>
              <p className="font-semibold mb-1" style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}>UnitLocker</p>
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00f0aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#00e5a0'}>
                {CONTACT_EMAIL}
              </a>
            </div>
          </Section>

          <div className="flex flex-wrap gap-6 pt-6" style={{ borderTop: '1px solid #1e242c' }}>
            <Link href="/terms-of-use" className="text-sm transition-colors duration-200"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}>
              Terms of Use
            </Link>
            <Link href="/" className="text-sm transition-colors duration-200"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}>
              Back to home
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-4">
      {title && (
        <h2 className="text-lg font-semibold"
          style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif", letterSpacing: '-0.01em' }}>
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-3 text-sm leading-relaxed"
        style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}>
        {children}
      </div>
    </div>
  );
}

function SubHeading({ children }) {
  return (
    <p className="font-semibold text-sm" style={{ color: '#a8b3bf', fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </p>
  );
}
