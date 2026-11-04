import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Star, X, Check, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { Order, OrderReview } from '../../types';

interface ReviewModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onSubmitted?: () => void;
}

const REVIEW_TAGS = [
  'Rasa Kopi Mantap ☕',
  'Latte Art Cantik ✨',
  'Penyajian Cepat ⚡',
  'Pastry Hangat & Renyah 🥐',
  'Barista Ramah 😊',
  'Kemasan Rapi & Higienis 📦',
  'Porsi & Suhu Pas 🌡️',
];

const RATING_LABELS = [
  '',
  'Kurang Puas 😞',
  'Cukup Biasa 😐',
  'Rasa Enak & Puas 🙂',
  'Sangat Puas & Lezat! 😋',
  'Luar Biasa Sempurna! ☕🌟',
];

export const ReviewModal: React.FC<ReviewModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const { submitOrderReview } = useCart();

  const [rating, setRating] = useState<number>(order.review?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    order.review?.tags || ['Rasa Kopi Mantap ☕', 'Penyajian Cepat ⚡']
  );
  const [comment, setComment] = useState<string>(order.review?.comment || '');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reviewData: OrderReview = {
      rating,
      tags: selectedTags,
      comment: comment.trim() || 'Pelayanan dan rasa kopi sangat memuaskan!',
      createdAt: new Date().toISOString(),
      earnedPoints: 25,
    };

    submitOrderReview(order.orderId, reviewData);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#4A2E1B', '#965B2D', '#D49B55', '#2E7D32'],
      });
    } catch (err) {
      console.error(err);
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      if (onSubmitted) onSubmitted();
    }, 1200);
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#4A2E1B]/15 flex flex-col gap-4 max-h-[90vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4A2E1B]/10">
          <div>
            <span className="text-[10px] font-bold text-[#965B2D] uppercase tracking-wider">
              Café Notre Socielle
            </span>
            <h3 className="text-base font-extrabold text-[#2D241E]">
              Beri Ulasan Pesanan
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h4 className="text-lg font-extrabold text-[#2D241E]">
              Terima Kasih atas Ulasan Anda!
            </h4>
            <p className="text-xs text-[#7A6E65] max-w-[260px]">
              Ulasan Anda sangat berarti untuk barista & kemajuan sajian Café Notre Socielle.
            </p>
            <div className="mt-2 px-3 py-1.5 rounded-full bg-[#FAF0E6] text-[#965B2D] text-xs font-bold flex items-center gap-1.5 border border-[#965B2D]/20">
              <Award className="w-4 h-4" />
              <span>+25 Poin Member Berhasil Ditambahkan</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Order Items Snapshot */}
            <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#4A2E1B]/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#4A2E1B]/10 flex-shrink-0">
                <img
                  src={order.items[0]?.menuItem.imageUrl}
                  alt={order.items[0]?.menuItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xs font-bold text-[#2D241E] line-clamp-1">
                  {order.items.map((i) => i.menuItem.name).join(', ')}
                </h4>
                <p className="text-[10px] text-[#7A6E65] font-mono">
                  {order.orderId} • {order.diningOption}
                </p>
              </div>
            </div>

            {/* Star Rating Selector */}
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <span className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
                Bagaimana Pengalaman Rasa & Pelayanan?
              </span>

              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 transition-transform hover:scale-125 active:scale-95"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= activeRating
                          ? 'fill-[#E5A500] text-[#E5A500]'
                          : 'fill-transparent text-[#7A6E65]/30'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span className="text-xs font-extrabold text-[#965B2D] min-h-[18px]">
                {RATING_LABELS[activeRating]}
              </span>
            </div>

            {/* Quick Chips Tags */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
                Hal yang Paling Anda Sukai:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {REVIEW_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all ${
                        isSelected
                          ? 'bg-[#4A2E1B] text-white border-[#4A2E1B] shadow-xs'
                          : 'bg-[#FCFBF9] text-[#7A6E65] border-[#4A2E1B]/15 hover:border-[#965B2D]/40'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Comment Box */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
                Catatan atau Pujian untuk Barista:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                placeholder="Contoh: Rasa kopi sangat pas, aroma caramel harum, dan latte art angsanya sangat rapi!"
                className="w-full p-3 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/15 text-xs text-[#2D241E] focus:outline-none focus:border-[#965B2D] resize-none"
              ></textarea>
            </div>

            {/* Loyalty Points Incentive Banner */}
            <div className="p-3 bg-[#FAF0E6] rounded-2xl border border-[#965B2D]/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#965B2D] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#4A2E1B]">Hadiah Ulasan</p>
                  <p className="text-[10px] text-[#7A6E65]">
                    Dapatkan +25 Poin Member Socielle
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-[#965B2D]">+25 Poin</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Check className="w-4 h-4" />
              <span>Kirim Ulasan Sekarang</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

