import React, { useState } from 'react';
import { ChevronRight, Sparkles, QrCode, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { NotreSocielleIcon } from '../components/common/NotreSocielleLogo';

interface OnboardingScreenProps {
  onComplete: () => void;
}

interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  icon: React.FC<{ className?: string }>;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'Self-Order Cepat',
    title: 'Pesan Kopi Tanpa Perlu Antre di Kasir',
    subtitle:
      'Duduk santai di mejamu, telusuri seluruh katalog menu Café Notre Socielle, dan pesan langsung dari ponsel.',
    imageUrl:
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80',
    icon: UtensilsCrossed,
  },
  {
    id: 2,
    badge: 'Kustomisasi Barista',
    title: 'Pilih Suhu & Kreasikan Latte Art Favoritmu',
    subtitle:
      'Bebas atur varian Panas atau Dingin, request pola seni latte unik (Swan/Heart/Rosetta), dan beri catatan khusus racikan.',
    imageUrl:
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
    icon: Sparkles,
  },
  {
    id: 3,
    badge: 'Pembayaran & Tiket',
    title: 'QRIS Instan & Pantau Tiket Barcode Digital',
    subtitle:
      'Bayar mudah dengan QRIS, nikmati perhitungan PB1 10% transparan, dan pantau status pesananmu hingga siap dijemput.',
    imageUrl:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80',
    icon: QrCode,
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handleNext = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const slide = SLIDES[currentSlideIndex];
  const IconComponent = slide.icon;

  return (
    <div className="absolute inset-0 z-40 bg-[#FCFBF9] flex flex-col justify-between overflow-hidden animate-in fade-in duration-300">
      {/* Top Bar: Logo & Skip button */}
      <div className="px-6 pt-5 pb-2 flex justify-between items-center z-10">
        <div className="flex items-center gap-1.5">
          <NotreSocielleIcon size={20} color="#8C4722" />
          <span className="text-xs font-black text-[#8C4722] lowercase tracking-tight">
            notre socielle
          </span>
        </div>
        <button
          onClick={onComplete}
          className="text-xs font-semibold text-[#7A6E65] hover:text-[#2D241E] px-3 py-1 rounded-full hover:bg-black/5 transition-colors"
        >
          Lewati
        </button>
      </div>

      {/* Main Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Rounded Image with Soft Warm Frame */}
        <div className="relative w-full max-w-[320px] h-64 sm:h-72 rounded-3xl overflow-hidden shadow-socielle-lg border-2 border-[#4A2E1B]/10">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D241E]/80 via-transparent to-transparent"></div>

          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <IconComponent className="w-3.5 h-3.5 text-[#965B2D]" />
            <span className="text-[11px] font-bold text-[#2D241E]">
              {slide.badge}
            </span>
          </div>
        </div>

        {/* Text Information */}
        <div className="text-center mt-6 flex flex-col items-center gap-2 max-w-[320px]">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#2D241E] leading-tight drop-shadow-xs">
            {slide.title}
          </h2>
          <p className="text-xs text-[#7A6E65] leading-relaxed mt-1">
            {slide.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Controls: Dots Indicator & CTA */}
      <div className="px-6 pb-8 pt-3 flex flex-col gap-5 z-10">
        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Ke slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlideIndex === idx
                  ? 'w-7 bg-[#4A2E1B]'
                  : 'w-2 bg-[#4A2E1B]/20 hover:bg-[#4A2E1B]/40'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-4 bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.98] text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-socielle-lg transition-all"
        >
          {currentSlideIndex === SLIDES.length - 1 ? (
            <>
              <span>Mulai Memesan Sekarang</span>
              <ArrowRight className="w-4 h-4 text-[#F5EDE6]" />
            </>
          ) : (
            <>
              <span>Lanjutkan</span>
              <ChevronRight className="w-4 h-4 text-[#F5EDE6]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

