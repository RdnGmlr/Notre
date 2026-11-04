import React, { useEffect } from 'react';
import { NotreSocielleIcon } from '../components/common/NotreSocielleLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);
    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      onClick={onFinish}
      className="absolute inset-0 z-50 bg-[#A6532B] text-white flex flex-col items-center justify-center p-6 cursor-pointer select-none overflow-hidden animate-in fade-in duration-500"
    >
      {/* Concentric Decorative Rings matching Prototype Image 2 */}
      <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full border-[48px] border-white/[0.04] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[460px] h-[460px] rounded-full border-[54px] border-white/[0.04] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border-[36px] border-white/[0.03] pointer-events-none"></div>

      {/* Center Spotlight & Notre Socielle Logo */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Subtle Light Circle Container */}
        <div className="w-36 h-36 rounded-full bg-white/[0.12] backdrop-blur-xs flex items-center justify-center shadow-inner">
          <NotreSocielleIcon size={64} color="#FFFFFF" />
        </div>

        {/* Brand Name Text: notre socielle */}
        <h1 className="text-2xl font-bold tracking-tight text-white lowercase drop-shadow-xs">
          notre socielle
        </h1>
      </div>

      {/* Subtle Skip hint */}
      <div className="absolute bottom-6 z-10">
        <span className="text-[11px] text-white/50 tracking-wider">
          Ketuk layar untuk lewati &rarr;
        </span>
      </div>
    </div>
  );
};
