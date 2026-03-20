export const metadata = {
  title: "Accessibility | The Bookie Reaper",
  description: "Accessibility statement for The Bookie Reaper website.",
};

export default function AccessibilityPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-50 text-gray-800 font-sans space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Accessibility Statement</h1>

      <p>
        The Bookie Reaper is committed to ensuring digital accessibility for all users, including people with disabilities. We are actively working to improve the accessibility of our website and services in accordance with best practices and recognized standards.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Measures to Support Accessibility</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Providing text alternatives for non-text content, including images and icons.</li>
        <li>Ensuring navigation is possible via keyboard and screen readers.</li>
        <li>Using clear language, readable fonts, and sufficient color contrast.</li>
        <li>Providing captions or transcripts for videos and multimedia content whenever possible.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6">Feedback</h2>
      <p>
        We welcome feedback on the accessibility of The Bookie Reaper website. If you encounter any barriers, please contact us at <a href="mailto:support@bookiereaper.com" className="text-br-gold underline">support@bookiereaper.com</a>. 
        We will investigate and respond promptly and consider your suggestions as we continue to improve our services.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Technical Specifications</h2>
      <p>
        This site uses modern web standards (HTML5, CSS3, and JavaScript) to ensure broad accessibility. We continually test our website with various assistive technologies and devices.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Formal Compliance</h2>
      <p>
        While we strive to meet recognized accessibility standards, we cannot guarantee full compliance with all accessibility guidelines at all times.
      </p>
    </main>
  );
}