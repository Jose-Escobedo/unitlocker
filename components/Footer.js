import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-950 to-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo */}
        
<div className="flex justify-center mb-10">
  <Link href="/">
    <Image
      src="https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/bookie%20reaper%20white.png?alt=media&token=6698de0a-4e62-4e2b-8a66-91bb8e2933e2"
      alt="The Bookie Reaper Logo"
      width={120}
      height={120}
      className="rounded-xl cursor-pointer shadow-lg hover:scale-105 transition-transform"
    />
  </Link>
</div>


        {/* Links */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            {/* Quick Links */}
            <div>
              <h3 className="text-br-gold font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "VIP Picks", href: "/vip" },
                  { name: "About", href: "/about" },
                  { name: "Why Us", href: "/why-us" },
                  { name: "Sports", href: "/sports" },
                  { name: "Blog", href: "/blog" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-br-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-br-gold font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms of Use", href: "/terms-of-use" },
                  { name: "Accessibility", href: "/accessibility" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-br-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-br-gold font-semibold mb-4">Contact</h3>
              <p>
                <Link
                  href="mailto:support@bookiereaper.com"
                  className="hover:text-br-gold transition-colors"
                >
                  support@bookiereaper.com
                </Link>
              </p>
              <p className="mt-2">
                <Link
                  href="/contact"
                  className="hover:text-br-gold transition-colors"
                >
                  Contact Page
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="mt-12 flex justify-center space-x-5">
          {[
            { icon: Twitter, href: "https://twitter.com" },
            { icon: Instagram, href: "https://www.instagram.com/thebookiereaper/?utm_source=ig_web_button_share_sheet" },
            { icon: Youtube, href: "https://youtube.com" },
          ].map(({ icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-800 hover:bg-br-gold text-gray-400 hover:text-black transition"
            >
              <Icon size={20} />
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} The Bookie Reaper. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
