import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
  navbar?: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, navbar }) => {
  return (
    <div className="min-h-screen bg-[#EDE7DE] flex justify-center items-center p-0 sm:py-6 sm:px-4 selection:bg-[#965B2D]/20">
      {/* Phone container */}
      <div className="w-full max-w-[430px] h-[100dvh] sm:h-[860px] bg-[#FCFBF9] text-[#2D241E] sm:rounded-[44px] shadow-2xl relative flex flex-col overflow-hidden sm:border-[8px] sm:border-[#2D241E] sm:ring-1 sm:ring-black/10">
        {/* App Main Viewport Scroll Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative overscroll-contain no-scrollbar flex flex-col pt-[env(safe-area-inset-top,0px)]">
          {children}
        </main>

        {/* Pinned Bottom Navbar (Always anchored at bottom of phone frame) */}
        {navbar && (
          <div className="flex-shrink-0 z-40 w-full bg-white/95 backdrop-blur-md border-t border-[#4A2E1B]/10 shadow-socielle pb-[env(safe-area-inset-bottom,0px)]">
            {navbar}
          </div>
        )}
      </div>
    </div>
  );
};
