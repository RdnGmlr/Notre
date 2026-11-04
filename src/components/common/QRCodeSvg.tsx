import React from 'react';

interface QRCodeSvgProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeSvg: React.FC<QRCodeSvgProps> = ({ value, size = 180, className = '' }) => {
  // Generate deterministic grid pattern based on string hash
  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  };

  const seed = getHash(value);
  const matrixSize = 25; // 25x25 grid
  const cells: boolean[][] = [];

  for (let r = 0; r < matrixSize; r++) {
    cells[r] = [];
    for (let c = 0; c < matrixSize; c++) {
      // 3 Corner Finder Patterns (7x7)
      const isTopLeft = r < 7 && c < 7;
      const isTopRight = r < 7 && c >= matrixSize - 7;
      const isBottomLeft = r >= matrixSize - 7 && c < 7;

      if (isTopLeft || isTopRight || isBottomLeft) {
        // Outer ring 7x7
        const lr = isTopLeft ? r : isTopRight ? r : r - (matrixSize - 7);
        const lc = isTopLeft ? c : isTopRight ? c - (matrixSize - 7) : c;
        if (lr === 0 || lr === 6 || lc === 0 || lc === 6) {
          cells[r][c] = true;
        } else if (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4) {
          cells[r][c] = true;
        } else {
          cells[r][c] = false;
        }
      } else if (r >= 10 && r <= 14 && c >= 10 && c <= 14) {
        // Center area reserved for Socielle Coffee Logo
        cells[r][c] = false;
      } else if (r === 6 || c === 6) {
        // Timing patterns
        cells[r][c] = (r + c) % 2 === 0;
      } else {
        // Deterministic pseudo-random data bits
        const val = (seed * (r + 1) * 31 + (c + 1) * 17) % 100;
        cells[r][c] = val > 45;
      }
    }
  }

  const cellSize = size / matrixSize;

  return (
    <div className={`relative inline-block bg-white p-2.5 rounded-2xl shadow-xs ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={size} height={size} fill="#FFFFFF" />
        {cells.map((row, r) =>
          row.map((filled, c) =>
            filled ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.3}
                height={cellSize + 0.3}
                fill="#2D241E"
                rx={cellSize > 8 ? 1.5 : 0.8}
              />
            ) : null
          )
        )}
      </svg>

      {/* Center Cafe Notre Socielle Badge */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-1 shadow-sm border border-[#4A2E1B]/20 flex items-center justify-center pointer-events-none"
        style={{ width: size * 0.22, height: size * 0.22 }}
      >
        <div className="w-full h-full bg-[#4A2E1B] rounded-md flex items-center justify-center text-white">
          <svg
            className="w-4 h-4 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 21h18v-2H2M20 8h-2V5h2m0-2H4v10a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-3h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

