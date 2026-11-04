import React, { useState } from 'react';
import type { MenuItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatRupiah } from '../../utils/formatters';
import { X, Star, Flame, Snowflake, Sparkles, Plus, Minus, Check } from 'lucide-react';

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({ item, isOpen, onClose }) => {
  const { addToCart } = useCart();

  const [selectedTemperature, setSelectedTemperature] = useState<'Dingin' | 'Panas'>('Panas');
  const [latteArtNote, setLatteArtNote] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Reset state when opening a new item
  React.useEffect(() => {
    if (item) {
      if (item.availableTemperatures && item.availableTemperatures.length > 0) {
        setSelectedTemperature(item.availableTemperatures[0]);
      }
      setLatteArtNote('');
      setSpecialNote('');
      setQuantity(1);
      setIsAddedSuccess(false);
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleAddToCart = () => {
    addToCart(
      item,
      quantity,
      item.availableTemperatures ? selectedTemperature : undefined,
      specialNote.trim() || undefined,
      item.allowLatteArtRequest && latteArtNote.trim() ? latteArtNote.trim() : undefined
    );

    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 600);
  };

  const totalPrice = item.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl border border-[#4A2E1B]/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Product Image Header with Close Button */}
        <div className="relative w-full h-56 sm:h-64 bg-[#F5EDE6]">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all shadow-md"
          >
            <X className="w-4 h-4" />
          </button>

          {item.isPopular && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#965B2D] text-white text-[11px] font-bold shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Menu Favorit
            </span>
          )}

          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-medium text-[#F5EDE6] uppercase tracking-wider">
              {item.category}
            </span>
            <h2 className="text-xl font-bold leading-tight">{item.name}</h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex flex-col gap-5">
          {/* Rating, Reviews, and Price */}
          <div className="flex items-center justify-between pb-3 border-b border-[#4A2E1B]/10">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-[#FFF9E6] px-2 py-0.5 rounded-lg border border-[#FFE17D]">
                <Star className="w-3.5 h-3.5 fill-[#E5A500] text-[#E5A500]" />
                <span className="text-xs font-bold text-[#6B4B00]">{item.rating}</span>
              </div>
              <span className="text-xs text-[#7A6E65]">({item.reviewCount} ulasan)</span>
            </div>
            <div className="text-right">
              <span className="text-lg font-extrabold text-[#4A2E1B]">
                {formatRupiah(item.price)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider mb-1">
              Deskripsi Menu
            </h4>
            <p className="text-xs leading-relaxed text-[#2D241E]/90">
              {item.description}
            </p>
          </div>

          {/* Temperature Switcher (Dingin / Panas) if available */}
          {item.availableTemperatures && item.availableTemperatures.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
                Pilihan Suhu Minuman
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {item.availableTemperatures.includes('Panas') && (
                  <button
                    type="button"
                    onClick={() => setSelectedTemperature('Panas')}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                      selectedTemperature === 'Panas'
                        ? 'bg-[#4A2E1B] text-white border-[#4A2E1B] shadow-xs'
                        : 'bg-[#FCFBF9] text-[#7A6E65] border-[#4A2E1B]/15 hover:border-[#4A2E1B]/40'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5 text-[#ED6C02]" />
                    Panas (Hot)
                  </button>
                )}
                {item.availableTemperatures.includes('Dingin') && (
                  <button
                    type="button"
                    onClick={() => setSelectedTemperature('Dingin')}
                    className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                      selectedTemperature === 'Dingin'
                        ? 'bg-[#4A2E1B] text-white border-[#4A2E1B] shadow-xs'
                        : 'bg-[#FCFBF9] text-[#7A6E65] border-[#4A2E1B]/15 hover:border-[#4A2E1B]/40'
                    }`}
                  >
                    <Snowflake className="w-3.5 h-3.5 text-[#0288D1]" />
                    Dingin (Iced)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Latte Art Request (if applicable) */}
          {item.allowLatteArtRequest && (
            <div className="flex flex-col gap-1.5 bg-[#FAF7F2] p-3 rounded-2xl border border-[#4A2E1B]/10">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4A2E1B]">
                <Sparkles className="w-3.5 h-3.5 text-[#965B2D]" />
                <span>Request Latte Art (Gratis)</span>
              </div>
              <input
                type="text"
                value={latteArtNote}
                onChange={(e) => setLatteArtNote(e.target.value)}
                placeholder="Contoh: Pola Angsa (Swan) / Tulang Daun / Hati"
                className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#4A2E1B]/15 focus:outline-none focus:border-[#965B2D]"
              />
            </div>
          )}

          {/* Special Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
              Catatan untuk Barista / Dapur
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="Contoh: Less sugar / Pisahkan saus / Jangan pedas"
              className="w-full text-xs px-3 py-2 bg-white rounded-xl border border-[#4A2E1B]/15 focus:outline-none focus:border-[#965B2D]"
            />
          </div>

          {/* Quantity Stepper & Add to Cart Button */}
          <div className="pt-2 flex items-center gap-3">
            <div className="flex items-center border border-[#4A2E1B]/20 rounded-xl bg-[#FCFBF9] p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A2E1B] hover:bg-white active:scale-95 transition-all"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#2D241E]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A2E1B] hover:bg-white active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white flex items-center justify-between transition-all shadow-md ${
                isAddedSuccess
                  ? 'bg-[#2E7D32]'
                  : 'bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.98]'
              }`}
            >
              <div className="flex items-center gap-1.5">
                {isAddedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Ditambahkan!</span>
                  </>
                ) : (
                  <span>Tambah Pesanan</span>
                )}
              </div>
              <span className="font-bold">{formatRupiah(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
