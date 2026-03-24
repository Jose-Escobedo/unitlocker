'use client';

import Link from 'next/link';

const LAST_UPDATED = 'March 24, 2025';
const CONTACT_EMAIL = 'unitlocker@gmail.com';

export default function PrivacyPolicy() {
  return (
    <div
      className="min-h-screen pt-16"
      style={{ background: '#0a0c0f' }}
    >
      {/* Top accent line */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,229,160,0.3) 40%, rgba(0,229,160,0.3) 60%, transparent)',
        }}
      />

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">

        {/* Header */}
        <div className="mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md mb-5"
            style={{
              background: 'rgba(0,229,160,0.08)',
              border: '1px solid rgba(0,229,160,0.2)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00e5a0' }} />
            <span
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: '#00e5a0', fontFamily: "'DM Mono', monospace" }}
            >
              Legal
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight mb-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              letterSpacing: '-0.03em',
              color: '#e8ecf0',
            }}
          >
            Privacy Policy
          </h1>
          <p
            className="text-sm"
            style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
          >
            Last updated: {LAST_UPDATED}
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-10">

          <Section>
            <p>
              UnitLocker ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and application (collectively, the "Service"). Please read this policy carefully. By using the Service you agree to the practices described here.
            </p>
            <p>
              If you have questions or concerns, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}>
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <Section title="1. Information We Collect">
            <SubHeading>Information you provide directly</SubHeading>
            <ul>
              <li><strong>Account information</strong> — your full name and email address when you create an account.</li>
              <li><strong>Betting data</strong> — bets you log including sport, odds, stake, result, and any notes you add. This data is entered voluntarily by you.</li>
              <li><strong>Payment information</strong> — when Pro launches, payments will be processed by Stripe. We do not store your full card number, CVV, or banking details on our servers. Stripe handles all payment data in accordance with PCI-DSS standards. We receive only a tokenized reference and basic billing details (e.g. last 4 digits, card type).</li>
            </ul>
            <SubHeading>Information collected automatically</SubHeading>
            <ul>
              <li><strong>Device and browser information</strong> — browser type, operating system, device type, and screen resolution.</li>
              <li><strong>Usage data</strong> — pages visited, features used, time spent in the app, and click interactions.</li>
              <li><strong>IP address</strong> — collected for security and fraud prevention purposes.</li>
              <li><strong>Cookies and similar technologies</strong> — we use session cookies to keep you logged in and functional cookies to remember your preferences. We do not use advertising or tracking cookies.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Create and maintain your account.</li>
              <li>Provide, operate, and improve the Service.</li>
              <li>Display your betting history, bankroll stats, and performance analytics.</li>
              <li>Process payments securely via Stripe (Pro plan, when available).</li>
              <li>Respond to your support requests and inquiries.</li>
              <li>Monitor usage patterns to fix bugs and improve performance.</li>
              <li>Detect, investigate, and prevent fraudulent or unauthorized activity.</li>
              <li>Comply with legal obligations.</li>
            </ul>
            <p>
              We do not sell your personal information to third parties. We do not use your betting data for advertising purposes.
            </p>
          </Section>

          <Section title="3. How We Share Your Information">
            <p>We do not sell, trade, or rent your personal information. We may share your information only in the following limited circumstances:</p>
            <ul>
              <li><strong>Service providers</strong> — trusted third-party vendors who help us operate the Service, including Firebase for database and authentication, and Stripe for payment processing. These providers are contractually obligated to keep your data confidential and use it only to provide their services to us.</li>
              <li><strong>Legal requirements</strong> — if required by law, court order, or governmental authority.</li>
              <li><strong>Protection of rights</strong> — if we believe disclosure is necessary to protect the rights, property, or safety of UnitLocker, our users, or the public.</li>
              <li><strong>Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you via email prior to any such transfer.</li>
            </ul>
          </Section>

          <Section title="4. Data Retention">
            <p>
              We retain your account information and betting data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal or compliance purposes.
            </p>
            <p>
              Aggregated, anonymized data (e.g. overall platform usage statistics) may be retained indefinitely as it cannot be used to identify you.
            </p>
          </Section>

          <Section title="5. Data Security">
            <p>
              We implement industry-standard security measures to protect your information, including encrypted data transmission (HTTPS/TLS), secure authentication via Firebase, and access controls limiting who can view your data internally.
            </p>
            <p>
              No method of transmission over the internet or electronic storage is 100% secure. While we take reasonable precautions, we cannot guarantee absolute security. In the event of a data breach that affects your personal information, we will notify you as required by applicable law.
            </p>
          </Section>

          <Section title="6. Your Rights and Choices">
            <p>You have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
              <li><strong>Correction</strong> — request that we correct inaccurate or incomplete data.</li>
              <li><strong>Deletion</strong> — request that we delete your account and personal data.</li>
              <li><strong>Portability</strong> — request an export of your betting data in a machine-readable format.</li>
              <li><strong>Opt-out of communications</strong> — unsubscribe from any emails we send by clicking the unsubscribe link or contacting us directly.</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}>
                {CONTACT_EMAIL}
              </a>. We will respond within 30 days.
            </p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>
              UnitLocker is not directed to children under the age of 18. We do not knowingly collect personal information from anyone under 18. If you believe a minor has provided us with their information, please contact us and we will promptly delete it.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              The Service may contain links to third-party websites or services such as our Discord community. We are not responsible for the privacy practices of those third parties and encourage you to review their privacy policies.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date at the top of this page. If changes are material, we will notify you via email or a notice within the app. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
            <div
              className="mt-2 p-5 rounded-xl"
              style={{
                background: '#111418',
                border: '1px solid #1e242c',
              }}
            >
              <p
                className="font-semibold mb-1"
                style={{ color: '#e8ecf0', fontFamily: "'Inter', sans-serif" }}
              >
                UnitLocker
              </p>
              <p>United States</p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ color: '#00e5a0' }}
                onMouseEnter={e => e.currentTarget.style.color = '#00f0aa'}
                onMouseLeave={e => e.currentTarget.style.color = '#00e5a0'}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </Section>

          {/* Footer nav */}
          <div
            className="flex flex-wrap gap-6 pt-6"
            style={{ borderTop: '1px solid #1e242c' }}
          >
            <Link
              href="/terms"
              className="text-sm transition-colors duration-200"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-sm transition-colors duration-200"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
            >
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
        <h2
          className="text-lg font-semibold"
          style={{
            color: '#e8ecf0',
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h2>
      )}
      <div
        className="flex flex-col gap-3 text-sm leading-relaxed"
        style={{ color: '#8a95a3', fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </div>
    </div>
  );
}

function SubHeading({ children }) {
  return (
    <p
      className="font-semibold text-sm"
      style={{ color: '#a8b3bf', fontFamily: "'DM Sans', sans-serif" }}
    >
      {children}
    </p>
  );
}