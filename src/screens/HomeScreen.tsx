import React, { useState, useMemo } from 'react';
import { Header } from '../components/layout/Header';
import { PromoCarousel } from '../components/home/PromoCarousel';
import { CategoryTabs } from '../components/home/CategoryTabs';
import type { SelectedCategory } from '../components/home/CategoryTabs';
import { PopularSection } from '../components/home/PopularSection';
import { MenuGrid } from '../components/home/MenuGrid';
import { MenuDetailModal } from '../components/home/MenuDetailModal';
import { PROMO_BANNERS, MENU_ITEMS } from '../data/mockData';
import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { Check } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory>('Semua');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        selectedCategory === 'Semua' ? true : item.category === selectedCategory;

      const matchSearch =
        searchQuery.trim() === ''
          ? true
          : item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Quick add from card (+) button
  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();

    // If item has temperatures or latte art, opening modal is better for customization
    if (item.availableTemperatures && item.availableTemperatures.length > 1) {
      setSelectedItemForModal(item);
      return;
    }

    addToCart(
      item,
      1,
      item.availableTemperatures ? item.availableTemperatures[0] : undefined
    );

    // Show toast
    setToastMessage(`${item.name} berhasil ditambahkan!`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const categoryDisplayTitle =
    selectedCategory === 'Semua' ? 'Semua Menu' : `Kategori: ${selectedCategory}`;

  return (
    <div className="flex flex-col min-h-full bg-[#FCFBF9]">
      {/* Header */}
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Only show carousel & popular section when no search is active */}
      {searchQuery.trim() === '' && (
        <>
          <PromoCarousel banners={PROMO_BANNERS} />
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          {selectedCategory === 'Semua' && (
            <PopularSection
              items={MENU_ITEMS}
              onSelectItem={(item) => setSelectedItemForModal(item)}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </>
      )}

      {/* When search is active, show category tabs for quick refinement */}
      {searchQuery.trim() !== '' && (
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      {/* Main Menu Grid */}
      <MenuGrid
        items={filteredItems}
        onSelectItem={(item) => setSelectedItemForModal(item)}
        onQuickAdd={handleQuickAdd}
        categoryTitle={categoryDisplayTitle}
      />

      {/* Product Detail Modal */}
      <MenuDetailModal
        item={selectedItemForModal}
        isOpen={Boolean(selectedItemForModal)}
        onClose={() => setSelectedItemForModal(null)}
      />

      {/* Quick Add Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#2E7D32] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-3.5 h-3.5" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
