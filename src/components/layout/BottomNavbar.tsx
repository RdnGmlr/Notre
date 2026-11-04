import React from 'react';
import { Home, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export type TabType = 'home' | 'cart' | 'profile';

interface BottomNavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavbar: React.FC<BottomNavbarProps> = ({ activeTab, onTabChange }) => {
  const { totalItemsCount } = useCart();

  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cart', label: 'Keranjang', icon: ShoppingCart },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <nav className="w-full px-6 py-2 sm:py-2.5 flex items-center justify-around select-none bg-white border-t border-gray-100">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-4 transition-all duration-200 ${
              isActive ? 'text-[#8C4722]' : 'text-[#7A6E65] hover:text-[#8C4722]/80'
            }`}
          >
            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'stroke-[2.2px] text-[#8C4722]' : 'stroke-[1.6px]'
                }`}
              />

              {/* Cart badge */}
              {tab.id === 'cart' && totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#8C4722] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {totalItemsCount > 99 ? '99+' : totalItemsCount}
                </span>
              )}
            </div>

            <span
              className={`text-[11px] mt-1 transition-colors ${
                isActive ? 'text-[#8C4722] font-bold' : 'text-[#7A6E65] font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
