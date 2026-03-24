'use client';

import Link from 'next/link';

const LAST_UPDATED = 'March 24, 2025';
const CONTACT_EMAIL = 'unitlocker@gmail.com';

export default function TermsOfUse() {
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
            Terms of Use
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
              Welcome to UnitLocker. These Terms of Use ("Terms") govern your access to and use of the UnitLocker website and application (collectively, the "Service"), operated by UnitLocker ("we", "us", or "our"), based in the United States.
            </p>
            <p>
              By creating an account or using the Service in any way, you agree to be bound by these Terms. If you do not agree, do not use the Service.
            </p>
            <p>
              If you have questions, contact us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}>
                {CONTACT_EMAIL}
              </a>.
            </p>
          </Section>

          <Section title="1. Eligibility">
            <p>
              You must be at least 18 years of age to use UnitLocker. By using the Service, you represent and warrant that you are 18 or older and have the legal capacity to enter into these Terms.
            </p>
            <p>
              You are solely responsible for ensuring that your use of the Service complies with all laws and regulations applicable in your jurisdiction, including any laws relating to sports betting and gambling.
            </p>
          </Section>

          <Section title="2. Account Registration">
            <p>
              To access certain features of the Service, you must create an account. You agree to:
            </p>
            <ul>
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain the security of your password and not share it with others.</li>
              <li>Notify us immediately at{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: '#00e5a0' }}>
                  {CONTACT_EMAIL}
                </a>{' '}
                if you suspect unauthorized access to your account.
              </li>
              <li>Accept responsibility for all activity that occurs under your account.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account at our discretion if we believe you have violated these Terms.
            </p>
          </Section>

          <Section title="3. Description of Service">
            <p>
              UnitLocker is a sports betting bankroll management tool. The Service allows you to:
            </p>
            <ul>
              <li>Track your betting bankroll and log individual bets.</li>
              <li>View performance statistics including win rate, ROI, and streaks.</li>
              <li>Access gamification features including XP, ranks, and achievements.</li>
              <li>Access advanced analytics (Pro plan, when available).</li>
            </ul>
            <p>
              UnitLocker is a tracking and management tool only. We do not facilitate, accept, or process any wagers. We are not a sportsbook, gambling operator, or betting exchange. No real money is wagered through the Service.
            </p>
          </Section>

          <Section title="4. No Gambling Services">
            <p>
              UnitLocker does not offer gambling services of any kind. The Service is purely a data tracking and analytics tool designed to help users manage their existing betting activity on licensed third-party sportsbooks.
            </p>
            <p>
              You are solely responsible for ensuring that sports betting is legal in your jurisdiction before engaging in any wagering activity with third-party operators. UnitLocker accepts no liability for any illegal gambling activity undertaken by users.
            </p>
          </Section>

          <Section title="5. Subscription and Payments">
            <SubHeading>Free plan</SubHeading>
            <p>
              The core features of UnitLocker are available free of charge with no time limit and no credit card required.
            </p>
            <SubHeading>Pro plan</SubHeading>
            <p>
              When the Pro plan launches, it will be available on a monthly ($9.99/month) or annual ($79.99/year) subscription basis. All payments are processed securely by Stripe. By subscribing, you authorize us to charge your payment method on a recurring basis until you cancel.
            </p>
            <SubHeading>Cancellation</SubHeading>
            <p>
              You may cancel your Pro subscription at any time. Cancellation takes effect at the end of your current billing period. We do not offer refunds for partial billing periods except where required by applicable law.
            </p>
            <SubHeading>Price changes</SubHeading>
            <p>
              We reserve the right to change subscription pricing. We will provide at least 30 days notice before any price change takes effect. Your continued use of the Pro plan after the notice period constitutes acceptance of the new pricing.
            </p>
          </Section>

          <Section title="6. Acceptable Use">
            <p>You agree not to use the Service to:</p>
            <ul>
              <li>Violate any applicable law or regulation.</li>
              <li>Impersonate any person or entity or misrepresent your affiliation.</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure.</li>
              <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
              <li>Scrape, crawl, or systematically extract data from the Service without our written permission.</li>
              <li>Upload or transmit any malicious code, viruses, or harmful content.</li>
              <li>Use the Service for any commercial purpose without our prior written consent.</li>
              <li>Harass, threaten, or harm other users through any community features.</li>
            </ul>
            <p>
              Violation of these rules may result in immediate suspension or termination of your account without notice.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              All content, features, and functionality of the Service — including but not limited to the UnitLocker name, logo, design, text, graphics, and software — are owned by UnitLocker and protected by applicable intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to access and use the Service for your personal, non-commercial purposes. You may not reproduce, distribute, modify, or create derivative works of any part of the Service without our express written consent.
            </p>
            <p>
              Your betting data remains yours. We do not claim ownership over data you enter into the Service.
            </p>
          </Section>

          <Section title="8. Disclaimer of Warranties">
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, error-free, or completely secure. We do not guarantee the accuracy of any statistics, analytics, or performance data displayed in the Service. You use the Service at your own risk.
            </p>
            <p>
              UnitLocker does not provide financial, investment, or gambling advice. Nothing in the Service constitutes a recommendation to place any bet or wager.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, UNITLOCKER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, LOSS OF DATA, OR GAMBLING LOSSES.
            </p>
            <p>
              OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR $50 USD IF YOU HAVE NOT MADE ANY PAYMENTS.
            </p>
          </Section>

          <Section title="10. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless UnitLocker and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or relating to your use of the Service, your violation of these Terms, or your violation of any applicable law.
            </p>
          </Section>

          <Section title="11. Termination">
            <p>
              We may suspend or terminate your access to the Service at any time, with or without notice, for any reason including violation of these Terms. Upon termination, your right to use the Service ceases immediately.
            </p>
            <p>
              You may delete your account at any time. Upon deletion, we will remove your personal data in accordance with our Privacy Policy.
            </p>
          </Section>

          <Section title="12. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the courts located in the United States.
            </p>
          </Section>

          <Section title="13. Changes to These Terms">
            <p>
              We reserve the right to update these Terms at any time. When we do, we will update the "Last updated" date at the top of this page. If changes are material, we will notify you via email or a prominent in-app notice at least 14 days before the changes take effect. Your continued use of the Service after that period constitutes your acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>If you have any questions about these Terms, please contact us:</p>
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
              href="/privacy-policy"
              className="text-sm transition-colors duration-200"
              style={{ color: '#5a6474', fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={e => e.currentTarget.style.color = '#00e5a0'}
              onMouseLeave={e => e.currentTarget.style.color = '#5a6474'}
            >
              Privacy Policy
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