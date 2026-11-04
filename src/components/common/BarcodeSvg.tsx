import React from 'react';

interface BarcodeSvgProps {
  value: string;
  height?: number;
  className?: string;
}

export const BarcodeSvg: React.FC<BarcodeSvgProps> = ({ value, height = 54, className = '' }) => {
  // Generate pseudo Code-128 bar pattern based on input string
  const bars: { width: number; isSpace: boolean }[] = [];

  // Quiet zone
  bars.push({ width: 3, isSpace: true });
  // Start pattern
  bars.push({ width: 2, isSpace: false });
  bars.push({ width: 1, isSpace: true });
  bars.push({ width: 2, isSpace: false });
  bars.push({ width: 3, isSpace: true });

  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    const pattern = [
      (code % 3) + 1,
      ((code >> 1) % 2) + 1,
      ((code >> 2) % 3) + 1,
      ((code >> 3) % 2) + 1,
    ];

    pattern.forEach((w, idx) => {
      bars.push({ width: w, isSpace: idx % 2 === 1 });
    });
  }

  // Stop pattern
  bars.push({ width: 3, isSpace: false });
  bars.push({ width: 1, isSpace: true });
  bars.push({ width: 2, isSpace: false });
  bars.push({ width: 2, isSpace: true });

  const totalWidth = bars.reduce((sum, b) => sum + b.width, 0);

  let currentX = 0;

  return (
    <div className={`flex flex-col items-center bg-white p-3 rounded-xl border border-[#4A2E1B]/10 ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full max-h-14 block"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {bars.map((bar, index) => {
          const x = currentX;
          currentX += bar.width;
          if (bar.isSpace) return null;
          return (
            <rect
              key={index}
              x={x}
              y={0}
              width={bar.width}
              height={height}
              fill="#2D241E"
            />
          );
        })}
      </svg>
      <span className="text-[11px] font-mono tracking-widest text-[#2D241E] font-bold mt-1.5 select-all">
        {value}
      </span>
    </div>
  );
};

