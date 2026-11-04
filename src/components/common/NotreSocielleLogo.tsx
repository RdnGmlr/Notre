import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  color?: string;
  showText?: boolean;
  textColor?: string;
  textSize?: string;
}

export const NotreSocielleIcon: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 48, color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size * 1.12}
      viewBox="0 0 100 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Pillar & Arch */}
      <path
        d="M 16 108 V 52 C 16 32 30 16 47.5 16 V 32.5 C 39 32.5 32.5 39 32.5 52 V 108 H 16 Z"
        fill={color}
      />
      {/* Right Pillar & Arch */}
      <path
        d="M 84 108 V 52 C 84 32 70 16 52.5 16 V 32.5 C 61 32.5 67.5 39 67.5 52 V 108 H 84 Z"
        fill={color}
      />
    </svg>
  );
};

export const NotreSocielleLogo: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  color = '#8C4722',
  showText = true,
  textColor = '#2D241E',
  textSize = 'text-base',
}) => {
  return (
    <div className={`flex flex-col items-center gap-2 select-none ${className}`}>
      <NotreSocielleIcon size={size} color={color} />
      {showText && (
        <span
          className={`font-bold tracking-tight lowercase ${textSize}`}
          style={{ color: textColor }}
        >
          notre socielle
        </span>
      )}
    </div>
  );
};

