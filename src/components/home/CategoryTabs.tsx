import React from 'react';
import type { CategoryType } from '../../types';
import { Coffee, CupSoda, Utensils, LayoutGrid } from 'lucide-react';

export type SelectedCategory = CategoryType | 'Semua';

interface CategoryTabsProps {
  selectedCategory: SelectedCategory;
  onSelectCategory: (category: SelectedCategory) => void;
}

interface CategoryOption {
  id: SelectedCategory;
  label: string;
  icon: React.FC<{ className?: string }>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categories: CategoryOption[] = [
    { id: 'Semua', label: 'Semua', icon: LayoutGrid },
    { id: 'Kopi', label: 'Kopi', icon: Coffee },
    { id: 'Non-Kopi', label: 'Non-Kopi', icon: CupSoda },
    { id: 'Makanan', label: 'Makanan', icon: Utensils },
  ];

  return (
    <div className="px-5 mt-4">
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-[#4A2E1B] text-white border-[#4A2E1B] shadow-sm shadow-[#4A2E1B]/20 scale-[1.02]'
                  : 'bg-white text-[#7A6E65] border-[#4A2E1B]/15 hover:border-[#965B2D]/40 hover:text-[#2D241E]'
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  isSelected ? 'text-white' : 'text-[#965B2D]'
                }`}
              />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
