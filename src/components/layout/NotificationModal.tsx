import React from 'react';
import { X, Bell, Coffee, Tag, Award, Check } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: React.FC<{ className?: string }>;
  isUnread?: boolean;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Promo Spesial Hari Ini',
      message: 'Gunakan kode promo SOCIELLE20 untuk potongan 20% pemesanan meja Dine-In.',
      time: '10 menit yang lalu',
      icon: Tag,
      isUnread: true,
    },
    {
      id: 'notif-2',
      title: 'Free Custom Latte Art',
      message: 'Request pola seni latte (Angsa, Daun, Hati) kini tersedia gratis pada menu Cappuccino & Caramel Macchiato.',
      time: '1 jam yang lalu',
      icon: Coffee,
      isUnread: false,
    },
    {
      id: 'notif-3',
      title: 'Bonus Poin Member Socielle',
      message: 'Selamat! Akun Anda berstatus Member Gold dan berhak mendapatkan reward reguler.',
      time: 'Kemarin',
      icon: Award,
      isUnread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-[400px] mt-12 bg-white rounded-3xl p-5 shadow-2xl border border-[#4A2E1B]/15 flex flex-col gap-4 animate-in slide-in-from-top-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4A2E1B]/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#965B2D]">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2D241E]">Notifikasi</h3>
              <p className="text-[10px] text-[#7A6E65]">Kabar terbaru dari Café Notre Socielle</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List of notifications */}
        <div className="flex flex-col gap-2.5 max-h-[320px] overflow-y-auto no-scrollbar">
          {notifications.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                className={`p-3 rounded-2xl border transition-all flex gap-3 ${
                  notif.isUnread
                    ? 'bg-[#FAF7F2] border-[#965B2D]/20 shadow-xs'
                    : 'bg-white border-[#4A2E1B]/5'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-white border border-[#4A2E1B]/10 flex items-center justify-center text-[#4A2E1B] flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#965B2D]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#2D241E]">{notif.title}</h4>
                    <span className="text-[9px] text-[#7A6E65]">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-[#7A6E65] mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#4A2E1B] text-white text-xs font-bold rounded-xl hover:bg-[#372113] transition-colors flex items-center justify-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Tutup</span>
        </button>
      </div>
    </div>
  );
};

