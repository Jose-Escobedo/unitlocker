import Link from "next/link";

export const metadata = {
  title: "Terms of Use | The Bookie Reaper",
  description: "Terms and Use for The Bookie Reaper website.",
};

export default function TermsOfUse() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-50 text-gray-800 font-sans space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Use</h1>

      <p>
        This page states the terms and conditions under which you may use The Bookie Reaper site. By using this site or clicking “I Agree” you agree to be bound by the terms and conditions of this agreement, even if you have not read them. It is important to read this entire agreement. Note that this contains provisions that may limit your rights, such as under the section entitled “Limitations”.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Intellectual Property</h2>
      <p>
        Copyright © 2025 The Bookie Reaper. All rights reserved. The contents of this site are owned and copyrighted by The Bookie Reaper and its suppliers. You may print, copy, or save portions of this site for your own use only, provided that all copyright and trademark provisions remain intact.
      </p>
      <p>
        Unauthorized use beyond this may violate copyright, trademark, and other laws.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Infringing Content</h2>
      <p>
        If you believe anything on this site offends your copyright or other rights, is defamatory, or otherwise infringes your rights, please email The Bookie Reaper at the contact below. Appropriate action will be taken as necessary.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Website Content</h2>
      <p>
        The information provided on The Bookie Reaper website is for general informational and entertainment purposes only. The Bookie Reaper is not a licensed gambling operator and does not accept or handle any customer funds for betting. All tips, predictions, and content are provided solely for entertainment, educational, and informational purposes.
</p>
<p>
Users assume full responsibility for any decisions they make related to sports betting or gambling. You may lose some or all of your money when betting. The Bookie Reaper cannot and does not guarantee any winnings or financial outcomes. Users should always gamble responsibly and only wager amounts they can afford to lose.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Discord Community Disclaimer</h2>
      <p>
       Access to The Bookie Reaper’s Discord server is provided as part of our premium service. All discussions, tips, predictions, and content shared within the Discord are for entertainment and informational purposes only.
</p>
<p>
The Bookie Reaper is not responsible for the behavior, content, or advice of other members. Users are expected to follow Discord’s Terms of Service and our community guidelines. By participating, you acknowledge that any betting decisions made based on discussions in the Discord are at your own risk, and The Bookie Reaper cannot guarantee any financial outcomes.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Telegram Community Disclaimer</h2>
      <p>
       Access to The Bookie Reaper’s Telegram channel is provided as part of our premium service. All discussions, tips, predictions, and content shared within the Telegram channel are for entertainment and informational purposes only.
</p>
<p>
The Bookie Reaper is not responsible for the behavior, content, or advice of other members. Users are expected to follow Telegram’s Terms of Service and our community guidelines. By participating, you acknowledge that any betting decisions made based on discussions in the Telegram channel are at your own risk, and The Bookie Reaper cannot guarantee any financial outcomes.
      </p>


      <h2 className="text-2xl font-semibold mt-6">User Content</h2>
      <p>
        Users may submit content such as text, images, messages, and other materials. You are responsible for any content you submit. The Bookie Reaper or its affiliates hold no liability regarding user content. Content may be edited or removed, and The Bookie Reaper may use your content for promotional or advertising purposes without compensation.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Limitations</h2>
      <p>
        All promises made by The Bookie Reaper are contained in this agreement. No promises implied by law apply. You cannot collect damages exceeding the amount paid to The Bookie Reaper for goods or services related to your claim.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Governing Law</h2>
      <p>
        This site is governed by the laws of the State of California, excluding its conflicts of law provisions. Any legal action arising from or related to this site shall take place in the courts of California.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Links</h2>
      <p>
        Third-party sites linked on this site are not under The Bookie Reaper’s control. We are not responsible for content, links, or policies on those sites.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Privacy</h2>
      <p>
        Please see our <Link href="/privacy-policy" className="text-br-gold underline">Privacy Policy</Link>.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Changing These Terms</h2>
      <p>
        The Bookie Reaper may change these terms by posting notice on its site. Users should check periodically for updates.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Securities</h2>
      <p>
        Nothing on this site is intended as an offering for sale of The Bookie Reaper securities to the public.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Contact</h2>
      <p>
        You may contact The Bookie Reaper using the form on our <Link href="/contact" className="text-br-gold underline">contact page</Link> or via email at <a href="mailto:support@bookiereaper.com" className="text-br-gold underline">support@bookiereaper.com</a>.
      </p>
    </main>
  );
}
