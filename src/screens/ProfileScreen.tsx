import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { PaymentCardModal } from '../components/profile/PaymentCardModal';
import { AccountSecurityModal } from '../components/profile/AccountSecurityModal';
import { OrderHistoryModal } from '../components/profile/OrderHistoryModal';
import {
  User,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react';

// Electronic Payment Card icon matching prototype
const ElectronicPaymentIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9.5" strokeDasharray="2.5 2" />
    <rect x="7.5" y="9.5" width="9" height="6" rx="1.2" />
    <line x1="7.5" y1="11.5" x2="16.5" y2="11.5" />
    <circle cx="9.5" cy="13.5" r="0.5" fill="currentColor" />
  </svg>
);

interface ProfileScreenProps {
  onSelectOrderTicket: (orderId: string) => void;
  onGoToHome: () => void;
  onLogout?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onSelectOrderTicket,
  onGoToHome,
  onLogout,
}) => {
  const { user, orders, activeOrder } = useCart();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isPaymentCardOpen, setIsPaymentCardOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Latest active or completed order
  const latestOrder = activeOrder || orders[0];

  const handleBuktiPengambilan = () => {
    if (latestOrder) {
      onSelectOrderTicket(latestOrder.orderId);
    } else {
      setIsHistoryOpen(true);
    }
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari akun?')) {
      if (onLogout) onLogout();
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#FCFBF9] pb-8">
      {/* Top Header: Centered "Profile" matching prototype */}
      <div className="pt-4 pb-2 text-center bg-transparent">
        <h2 className="text-base font-bold text-[#1E1E1E]">Profile</h2>
      </div>

      <div className="p-5 flex flex-col gap-3.5">
        {/* Main User Card matching Prototype Screenshot */}
        <div className="p-6 bg-white rounded-3xl border border-gray-100/80 shadow-socielle flex flex-col items-center text-center gap-3.5">
          {/* Avatar Image */}
          <div className="relative">
            <img
              src={user.avatarUrl || '/avatar_nanang.png'}
              alt={user.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/avatar_nanang.png';
              }}
              className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-gray-100"
            />
          </div>

          {/* User Name */}
          <h3 className="text-base font-extrabold text-[#1E1E1E] tracking-tight">
            {user.name}
          </h3>

          {/* Action Buttons: Bukti Pengambilan & Riwayat */}
          <div className="w-full flex items-center gap-3 pt-1">
            <button
              onClick={handleBuktiPengambilan}
              className="flex-1 py-2.5 px-3 bg-[#8C4722] hover:bg-[#733819] active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center"
            >
              Bukti Pengambilan
            </button>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="flex-1 py-2.5 px-3 bg-[#8C4722] hover:bg-[#733819] active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center"
            >
              Riwayat
            </button>
          </div>
        </div>

        {/* 4 Separate Menu Cards matching Prototype Screenshot */}
        <div className="flex flex-col gap-2.5 mt-1">
          {/* 1. Edit Profile */}
          <div
            onClick={() => setIsEditProfileOpen(true)}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-[#8C4722]/30 active:bg-gray-50/70 flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3 text-xs font-semibold text-[#2D241E]">
              <div className="w-6 h-6 flex items-center justify-center text-[#7A6E65] group-hover:text-[#8C4722] transition-colors">
                <User className="w-4 h-4 stroke-[1.8]" />
              </div>
              <span>Edit Profile</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#8C4722] transition-colors" />
          </div>

          {/* 2. Electronic Payment Card */}
          <div
            onClick={() => setIsPaymentCardOpen(true)}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-[#8C4722]/30 active:bg-gray-50/70 flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3 text-xs font-semibold text-[#2D241E]">
              <div className="w-6 h-6 flex items-center justify-center text-[#7A6E65] group-hover:text-[#8C4722] transition-colors">
                <ElectronicPaymentIcon className="w-4 h-4 text-[#7A6E65] group-hover:text-[#8C4722] transition-colors" />
              </div>
              <span>Electronic Payment Card</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#8C4722] transition-colors" />
          </div>

          {/* 3. Account Security */}
          <div
            onClick={() => setIsSecurityOpen(true)}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-[#8C4722]/30 active:bg-gray-50/70 flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3 text-xs font-semibold text-[#2D241E]">
              <div className="w-6 h-6 flex items-center justify-center text-[#7A6E65] group-hover:text-[#8C4722] transition-colors">
                <Shield className="w-4 h-4 stroke-[1.8]" />
              </div>
              <span>Account Security</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#8C4722] transition-colors" />
          </div>

          {/* 4. Logout matching prototype styling */}
          <div
            onClick={handleLogout}
            className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs hover:border-[#8C4722]/30 active:bg-gray-50/70 flex items-center justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center gap-3 text-xs font-semibold text-[#2D241E]">
              <div className="w-6 h-6 flex items-center justify-center text-[#7A6E65] group-hover:text-[#8C4722] transition-colors">
                <LogOut className="w-4 h-4 stroke-[1.8]" />
              </div>
              <span>Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#8C4722] transition-colors" />
          </div>
        </div>
      </div>

      {/* Supporting Modals */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />

      <PaymentCardModal
        isOpen={isPaymentCardOpen}
        onClose={() => setIsPaymentCardOpen(false)}
      />

      <AccountSecurityModal
        isOpen={isSecurityOpen}
        onClose={() => setIsSecurityOpen(false)}
      />

      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectOrder={onSelectOrderTicket}
        onGoToHome={onGoToHome}
      />
    </div>
  );
};
