import Link from 'next/link';
import { PenLine } from 'lucide-react';

export const metadata = {
  title: 'Blog — UnitLocker',
  description: 'Picks breakdowns, strategy, and CS2 prop insights from the UnitLocker team.',
};

export default function BlogPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#07080b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px' }}>
      <div style={{ textAlign: 'center', maxWidth: 400 }}>
        <div style={{
          width: 52, height: 52, borderRadius: 16, margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.2)',
        }}>
          <PenLine size={22} color="#ff6b35" />
        </div>
        <h1 style={{
          margin: '0 0 10px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em',
          color: '#f5f6f8', fontFamily: "'Inter', sans-serif",
        }}>
          Blog coming soon
        </h1>
        <p style={{
          margin: '0 0 28px', fontSize: 13, lineHeight: 1.6,
          color: 'rgba(245,246,248,0.45)', fontFamily: "'DM Sans', sans-serif",
        }}>
          Picks breakdowns, prop strategy, and CS2 insights from the UnitLocker team. Check back soon.
        </p>
        <Link href="/picks" style={{
          display: 'inline-block', padding: '11px 24px', borderRadius: 10,
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
          color: '#f5f6f8', fontSize: 13, fontWeight: 600, textDecoration: 'none',
          fontFamily: "'Inter', sans-serif",
        }}>
          Back to picks
        </Link>
      </div>
    </main>
  );
}
