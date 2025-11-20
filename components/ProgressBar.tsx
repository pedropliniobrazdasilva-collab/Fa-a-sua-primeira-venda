import React from 'react';

interface ProgressBarProps {
  percentage: number;
  type?: 'linear' | 'circle';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, type = 'linear' }) => {
  if (type === 'circle') {
    const radius = 40;
    const stroke = 4;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <svg height="100%" width="100%" className="transform -rotate-90">
             <circle
              stroke="#1a1a1a"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius + 8} // center adjust
              cy={radius + 8}
              fill="transparent"
            />
            <circle
              stroke="url(#gradient)"
              strokeWidth={stroke}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s ease-in-out' }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius + 8}
              cy={radius + 8}
              fill="transparent"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-bold text-white">{Math.round(percentage)}%</span>
          </div>
        </div>
        <span className="text-xs text-gray-400 mt-2 uppercase tracking-widest">Progresso</span>
      </div>
    );
  }

  return (
    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-white/5">
      <div 
        className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        style={{ width: `${percentage}%`, transition: 'width 0.5s ease-in-out' }}
      />
    </div>
  );
};