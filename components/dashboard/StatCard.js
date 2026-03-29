'use client';

export default function StatCard({ label, value, sub, color, icon }) {
  return (
    <div
      className="relative p-5 rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
      style={{ background: '#111418', border: '1px solid #1e242c' }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: color }} />
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
        style={{ background: `${color}18`, color }}
      >
        {icon}
      </div>
      <div
        className="text-xs font-medium tracking-widest uppercase mb-1"
        style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </div>
      <div
        className="text-2xl font-bold leading-none"
        style={{ color, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.02em' }}
      >
        {value}
      </div>
      {sub && (
        <div className="text-xs mt-1.5" style={{ color: '#5a6474', fontFamily: "'DM Mono', monospace" }}>
          {sub}
        </div>
      )}
    </div>
  );
}