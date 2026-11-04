import React from 'react';
import type { MenuItem } from '../../types';
import { formatRupiah } from '../../utils/formatters';
import { Star, Plus, Flame } from 'lucide-react';

interface PopularSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

export const PopularSection: React.FC<PopularSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const popularItems = items.filter((item) => item.isPopular);

  if (popularItems.length === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-3">
      {/* Section Header */}
      <div className="px-5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#FAF0E6] flex items-center justify-center text-[#965B2D]">
            <Flame className="w-3.5 h-3.5 fill-[#965B2D]" />
          </div>
          <h3 className="text-sm font-bold text-[#2D241E] tracking-tight">
            Menu Terlaris
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-[#965B2D] hover:underline cursor-pointer">
          Rekomendasi Barista
        </span>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar px-5 pb-1">
        {popularItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="flex-shrink-0 w-44 bg-white rounded-2xl border border-[#4A2E1B]/10 overflow-hidden shadow-socielle hover:shadow-socielle-lg transition-all duration-200 cursor-pointer flex flex-col group"
          >
            {/* Image & Badges */}
            <div className="relative w-full h-28 bg-[#F5EDE6] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-[#4A2E1B]/10">
                <Star className="w-3 h-3 fill-[#E5A500] text-[#E5A500]" />
                <span className="text-[10px] font-bold text-[#2D241E]">
                  {item.rating}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col justify-between flex-1 gap-2">
              <div>
                <span className="text-[10px] font-medium text-[#7A6E65] uppercase">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-[#2D241E] line-clamp-1 group-hover:text-[#965B2D] transition-colors">
                  {item.name}
                </h4>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-extrabold text-[#4A2E1B]">
                  {formatRupiah(item.price)}
                </span>
                <button
                  type="button"
                  onClick={(e) => onQuickAdd(item, e)}
                  className="w-7 h-7 rounded-xl bg-[#4A2E1B] text-white flex items-center justify-center hover:bg-[#372113] active:scale-90 transition-all shadow-xs"
                  title="Tambah Langsung"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
