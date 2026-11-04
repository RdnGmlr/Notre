import React, { useState } from 'react';
import { Bell, MapPin, Search, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { TableSelectorModal } from '../home/TableSelectorModal';
import { NotificationModal } from './NotificationModal';
import { NotreSocielleIcon } from '../common/NotreSocielleLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const { user } = useCart();
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  const handleOpenNotification = () => {
    setHasUnreadNotification(false);
    setIsNotifModalOpen(true);
  };

  return (
    <>
      <header className="px-5 pt-3 pb-2 flex flex-col gap-3.5 bg-[#FCFBF9]">
        {/* Top Bar: Brand Logo & User Greeting + Dining Badge + Notification */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF0E6] flex items-center justify-center border border-[#8C4722]/20 flex-shrink-0 shadow-xs">
              <NotreSocielleIcon size={20} color="#8C4722" />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#8C4722] tracking-wider lowercase leading-none mb-0.5">
                notre socielle
              </p>
              <h2 className="text-sm font-bold text-[#2D241E] leading-tight flex items-center gap-1">
                Halo, {user.name} 👋
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Dining Badge Button */}
            <button
              onClick={() => setIsTableModalOpen(true)}
              className="px-2.5 py-1.5 bg-[#F5EDE6] hover:bg-[#EFE3D8] active:scale-95 transition-all rounded-full flex items-center gap-1 text-[11px] font-semibold text-[#8C4722] border border-[#8C4722]/20 shadow-xs"
              title="Ganti Meja / Opsi Santap"
            >
              <MapPin className="w-3.5 h-3.5 text-[#8C4722]" />
              <span>
                {user.diningOption === 'Dine-In' ? user.tableNumber : 'Takeaway'}
              </span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={handleOpenNotification}
              className="w-9 h-9 rounded-full bg-white border border-[#4A2E1B]/10 flex items-center justify-center text-[#4A2E1B] hover:bg-[#FAF7F2] relative transition-all shadow-xs"
              aria-label="Notifikasi"
            >
              <Bell className="w-4 h-4" />
              {hasUnreadNotification && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ED6C02] rounded-full ring-2 ring-white"></span>
              )}
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-[#7A6E65] pointer-events-none">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari kopi, pastry, makanan..."
            className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#4A2E1B]/15 rounded-2xl text-xs sm:text-sm text-[#2D241E] placeholder:text-[#7A6E65]/70 focus:outline-none focus:border-[#8C4722] focus:ring-2 focus:ring-[#8C4722]/20 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 text-[#7A6E65] hover:text-[#2D241E] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* Table Selector Modal */}
      <TableSelectorModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotifModalOpen}
        onClose={() => setIsNotifModalOpen(false)}
      />
    </>
  );
};
