// app/privacy-policy/page.js
export const metadata = {
  title: "Privacy Policy | The Bookie Reaper",
  description: "Privacy Policy for The Bookie Reaper website.",
};

export default function PrivacyPolicy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-50 text-gray-800 font-sans space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p>
        This Privacy Policy governs the manner in which The Bookie Reaper collects, uses, maintains, and discloses information collected from users (herein referred to as “user”, “users”, “you” or “your”) of The Bookie Reaper website (herein referred to as “we”, “the site”, or “our site”).
      </p>

      <h2 className="text-2xl font-semibold mt-6">Personal Identification Information</h2>
      <p>
        We may collect personal identification information from users in a variety of ways, including, but not limited to, when users visit our site, fill out a form, or engage with other services we provide. Users may be asked for their email address. Users can visit our site anonymously. We collect personal information only if voluntarily submitted, including emails for newsletters stored in our database.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Non-personal Identification Information</h2>
      <p>
        We may collect non-personal identification information whenever users interact with our site. This may include browser name, device type, operating system, internet service provider, and other technical connection details.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Web Browser Cookies</h2>
      <p>
        Our site may use cookies to enhance user experience. Users can refuse cookies in their browser settings, though some site features may not function properly.
      </p>

      <h2 className="text-2xl font-semibold mt-6">How We Use Collected Information</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>To operate our site correctly and display content.</li>
        <li>To personalize user experience by understanding aggregate usage data.</li>
        <li>To send periodic emails in response to inquiries or requests.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">How We Protect Your Information</h2>
      <p>
        We adopt appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of personal information stored on our site.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Sharing Your Personal Information</h2>
      <p>
        We do not sell or trade personal identification information. We may share aggregated, non-identifiable data with trusted partners and affiliates. Third-party service providers may assist with operations like sending newsletters, and we only share information for those limited purposes with your permission.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Exceptions</h2>
      <p>
        We may disclose personal information if required by law, to protect rights, property, or public safety, or in the event of a site sale or bankruptcy.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Electronic Newsletters</h2>
      <p>
        Users opting into our mailing list may receive emails with updates, news, or relevant product/service information. We use third-party providers for this purpose with your consent.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Third Party Websites</h2>
      <p>
        Our site may contain links to third-party websites. We are not responsible for their content or privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Advertising</h2>
      <p>
        Ads may be delivered via partners who use cookies for targeted advertising. This policy does not cover third-party cookie usage.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Google DART</h2>
      <p>
        Some ads may be served by Google using the DART cookie, which does not personally identify you. You can opt out via Google’s privacy settings.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Changes to This Privacy Policy</h2>
      <p>
        The Bookie Reaper may update this privacy policy at any time. Users should check this page periodically for changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Acceptance of These Terms</h2>
      <p>
        By using this site, you accept this policy. Conflicting terms in our Terms of Use take precedence.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Contacting Us</h2>
      <p>
        For questions regarding this Privacy Policy or our practices, please contact us at <a href="mailto:support@bookiereaper.com" className="text-br-gold underline">support@bookiereaper.com</a>.
      </p>
    </main>
  );
}
