import React from 'react';
import { X, CreditCard, ShieldCheck, Check } from 'lucide-react';
import { NotreSocielleIcon } from '../common/NotreSocielleLogo';
import { useCart } from '../../context/CartContext';

interface PaymentCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentCardModal: React.FC<PaymentCardModalProps> = ({ isOpen, onClose }) => {
  const { user } = useCart();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-[390px] bg-white rounded-3xl p-5 shadow-2xl border border-[#4A2E1B]/15 flex flex-col gap-4 animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#4A2E1B]/10">
          <div>
            <h3 className="text-base font-bold text-[#1E1E1E]">Electronic Payment Card</h3>
            <p className="text-[11px] text-[#7A6E65]">Kartu Pembayaran & QRIS Digital</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Virtual Card Graphic */}
        <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#8C4722] via-[#663116] to-[#381B0C] p-5 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
          {/* Subtle logo watermark */}
          <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none">
            <NotreSocielleIcon size={140} color="#FFFFFF" />
          </div>

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5">
              <NotreSocielleIcon size={18} color="#FFFFFF" />
              <span className="text-xs font-bold tracking-wider lowercase">notre socielle</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
              MEMBER GOLD
            </span>
          </div>

          <div className="z-10">
            <p className="text-[10px] text-white/70 uppercase tracking-widest">Nomor Anggota</p>
            <p className="text-sm font-mono tracking-widest font-bold">
              8829 •••• •••• 4910
            </p>
          </div>

          <div className="flex items-center justify-between z-10 pt-1 border-t border-white/20 text-[11px]">
            <span className="font-semibold uppercase">{user.name}</span>
            <span className="text-white/80 font-mono">EXP 12/28</span>
          </div>
        </div>

        {/* Linked Payment Methods */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
            Metode Pembayaran Terhubung
          </span>

          <div className="flex flex-col gap-2">
            <div className="p-3 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#4A2E1B]/10 flex items-center justify-center font-black text-xs text-[#8C4722]">
                  QR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1E1E1E]">QRIS Nasional (GPN)</h4>
                  <p className="text-[10px] text-[#2E7D32] flex items-center gap-1">
                    <Check className="w-3 h-3" /> Terhubung Otomatis
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#8C4722]">Default</span>
            </div>

            <div className="p-3 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-[#8C4722]" />
                <div>
                  <h4 className="text-xs font-bold text-[#1E1E1E]">e-Wallet & m-Banking</h4>
                  <p className="text-[10px] text-[#7A6E65]">GoPay, OVO, Dana, ShopeePay, BCA</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-[#2E7D32]">Aktif</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-[#7A6E65] text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          Transaksi terenkripsi aman standar Bank Indonesia
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#8C4722] hover:bg-[#733819] text-white font-bold text-xs rounded-xl transition-all shadow-md"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};

