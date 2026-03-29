'use client';

import { Crosshair, Flame, Zap, Layers, TrendingUp, Trophy } from 'lucide-react';

const ICONS = {
  target:   <Crosshair size={16} />,
  flame:    <Flame size={16} />,
  zap:      <Zap size={16} />,
  layers:   <Layers size={16} />,
  trending: <TrendingUp size={16} />,
  trophy:   <Trophy size={16} />,
};

export default function AchievementIcon({ type, unlocked, size = 16 }) {
  const color = unlocked ? '#f5c842' : '#2a3240';
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{
        background: unlocked ? 'rgba(245,200,66,0.1)' : '#181c22',
        border: `1px solid ${unlocked ? 'rgba(245,200,66,0.2)' : '#1e242c'}`,
        color,
      }}
    >
      {ICONS[type]}
    </div>
  );
}