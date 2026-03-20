import Navbar from '@/components/Navbar';
import './globals.css';
import { AuthProvider } from "@/context/AuthContext";
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'The Bookie Reaper | Crush the Spread, Reap the Bookie',
  description: 'Join The Bookie Reaper — a premium sports picks experience where the bookie meets his fate. Get deadly-accurate bets and dominate the line.',
  keywords: ['sports betting', 'VIP picks', 'sports handicapping', 'The Bookie Reaper', 'betting picks', 'reaper picks'],
  authors: [{ name: 'The Bookie Reaper' }],
  creator: 'The Bookie Reaper',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className='font.sans'>
         <AuthProvider>
        <Navbar />
        {children}
         <SpeedInsights /> {/* Vercel Tracking Script */}
        <Footer />
        </AuthProvider>
       
      </body>
    </html>
  );
}