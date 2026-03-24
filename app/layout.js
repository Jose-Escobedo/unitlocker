import Navbar from '@/components/Navbar';
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins, Manrope, Inter, DM_Sans, DM_Mono } from 'next/font/google';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

export const metadata = {
  title: 'UnitLocker | Bankroll Management for Smart Bettors',
  description:
    'Track your units, manage your bankroll, and stay disciplined with UnitLocker. Built for serious bettors who want long-term profitability.',
  keywords: [
    'bankroll management',
    'sports betting tracker',
    'unit tracking',
    'bet tracking app',
    'sports betting analytics',
    'UnitLocker',
  ],
  authors: [{ name: 'UnitLocker' }],
  creator: 'UnitLocker',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${manrope.variable} ${inter.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body className="font-sans">
        <AuthProvider>
          <Navbar />
          {children}
          <SpeedInsights />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}