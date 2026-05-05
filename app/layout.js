import Navbar from '@/components/Navbar';
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins, Manrope, Inter, DM_Sans, DM_Mono } from 'next/font/google';
import Footer from '@/components/Footer';
import Script from 'next/script';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-poppins', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-manrope', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700', '900'], variable: '--font-inter', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-dm-sans', display: 'swap' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono', display: 'swap' });

export const metadata = {
  // Broadened Title to include "Sports"
  title: 'UnitLocker | Hot CS2 & Sports Picks | Tactical Bankroll Management',
  description:
    'Get high-value player props for CS2, MLB, NFL, NHL, and more. Lock your units and track your edge with the UnitLocker vault.',
  keywords: [
    'CS2 player props',
    'Sleeper picks',
    'PrizePicks data',
    'MLB props',
    'NFL betting lines',
    'NHL player props',
    'bankroll management',
    'UnitLocker',
    'sports betting tracker',
  ],
  authors: [{ name: 'UnitLocker' }],
  creator: 'UnitLocker',
  openGraph: {
    title: 'UnitLocker | Tactical Sports & CS2 Picks',
    description: 'The Vault for high-value CS2, MLB, NHL, NFL, Tennis, and major sports lines.',
    type: 'website',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/og-image%20unit%20locker.png?alt=media&token=723747e5-2d4f-4e1b-b799-6757eb2ce6d1',
        width: 1200,
        height: 630,
        alt: 'UnitLocker Dashboard',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${manrope.variable} ${inter.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="font-sans bg-[#202228] text-white antialiased">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <SpeedInsights />
          <Footer />
        </AuthProvider>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C15BWB800H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C15BWB800H');
          `}
        </Script>
      </body>
    </html>
  );
}