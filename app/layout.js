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
  title: 'UnitLocker | Daily CS2 & Sports Prop Picks',
  description:
    'Daily player prop picks for CS2, NBA, NHL, MLB and more — with fire pick detection, player history charts, and L5/L10/H2H breakdowns.',
  keywords: [
    'UnitLocker',
    'CS2 props',
    'CS2 player props',
    'CS2 kills props',
    'CS2 headshots props',
    'NBA props',
    'NHL props',
    'MLB props',
    'PrizePicks picks',
    'Underdog picks',
    'daily prop picks',
    'sports props',
    'fire picks',
    'player prop analysis',
  ],
  authors: [{ name: 'UnitLocker' }],
  creator: 'UnitLocker',
  openGraph: {
    title: 'UnitLocker | Daily CS2 & Sports Prop Picks',
    description: 'Daily CS2, NBA, NHL & MLB prop picks with fire pick detection and player history breakdowns.',
    type: 'website',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/tortas-bffc7.appspot.com/o/ogimageunitlocker.png?alt=media&token=a99881d7-92d8-457e-a604-670e720c037e',
        width: 1200,
        height: 630,
        alt: 'UnitLocker — Daily Prop Picks Feed',
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
      <body className="font-sans antialiased" style={{ background: '#07080b', color: '#f5f6f8' }}>
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