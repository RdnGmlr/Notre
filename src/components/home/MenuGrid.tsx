import React from 'react';
import type { MenuItem } from '../../types';
import { formatRupiah } from '../../utils/formatters';
import { Star, Plus, Coffee, SearchX } from 'lucide-react';

interface MenuGridProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  categoryTitle: string;
}

export const MenuGrid: React.FC<MenuGridProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
  categoryTitle,
}) => {
  if (items.length === 0) {
    return (
      <div className="px-5 py-12 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#965B2D] mb-3">
          <SearchX className="w-7 h-7" />
        </div>
        <h4 className="text-sm font-bold text-[#2D241E]">Menu Tidak Ditemukan</h4>
        <p className="text-xs text-[#7A6E65] mt-1 max-w-[240px]">
          Coba cari dengan kata kunci lain atau pilih kategori yang tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 px-5 flex flex-col gap-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#F5EDE6] flex items-center justify-center text-[#4A2E1B]">
            <Coffee className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-sm font-bold text-[#2D241E]">
            {categoryTitle} ({items.length})
          </h3>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-2 gap-3 pb-6">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white rounded-2xl border border-[#4A2E1B]/10 overflow-hidden shadow-socielle hover:shadow-socielle-lg transition-all duration-200 cursor-pointer flex flex-col group"
          >
            {/* Image */}
            <div className="relative w-full h-32 bg-[#F5EDE6] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-[#4A2E1B]/10 shadow-xs">
                <Star className="w-3 h-3 fill-[#E5A500] text-[#E5A500]" />
                <span className="text-[10px] font-bold text-[#2D241E]">
                  {item.rating}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col justify-between flex-1 gap-2.5">
              <div>
                <span className="text-[9px] font-semibold text-[#965B2D] uppercase tracking-wide">
                  {item.category}
                </span>
                <h4 className="text-xs font-bold text-[#2D241E] line-clamp-1 group-hover:text-[#965B2D] transition-colors mt-0.5">
                  {item.name}
                </h4>
                <p className="text-[10px] text-[#7A6E65] line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-[#4A2E1B]/5">
                <span className="text-xs font-extrabold text-[#4A2E1B]">
                  {formatRupiah(item.price)}
                </span>
                <button
                  type="button"
                  onClick={(e) => onQuickAdd(item, e)}
                  className="w-7 h-7 rounded-xl bg-[#4A2E1B] text-white flex items-center justify-center hover:bg-[#372113] active:scale-90 transition-all shadow-xs"
                  title="Tambah ke Keranjang"
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
