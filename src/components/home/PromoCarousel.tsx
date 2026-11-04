import React, { useState, useEffect } from 'react';
import type { PromoBanner } from '../../types';
import { Tag, Sparkles } from 'lucide-react';

interface PromoCarouselProps {
  banners: PromoBanner[];
}

export const PromoCarousel: React.FC<PromoCarouselProps> = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate banner every 5 seconds
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="px-5 mt-2 flex flex-col gap-2">
      {/* Banner Container */}
      <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden shadow-socielle group">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Dark & Warm Coffee Overlay */}
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover brightness-[0.78]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/95 via-[#2D241E]/40 to-transparent"></div>

              {/* Banner Content */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#965B2D] text-white text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-2.5 h-2.5" />
                    {banner.badge}
                  </span>
                  {banner.discountCode && (
                    <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-[10px] font-semibold flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {banner.discountCode}
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold leading-snug drop-shadow-xs">
                  {banner.title}
                </h3>
                <p className="text-xs text-white/85 line-clamp-1 mt-0.5">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-1.5 pt-0.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-5 bg-[#4A2E1B]'
                : 'w-1.5 bg-[#4A2E1B]/20 hover:bg-[#4A2E1B]/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
