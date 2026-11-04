import React, { useState } from 'react';
import { X, ShieldCheck, Smartphone, Key, Check } from 'lucide-react';

interface AccountSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountSecurityModal: React.FC<AccountSecurityModalProps> = ({ isOpen, onClose }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

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
            <h3 className="text-base font-bold text-[#1E1E1E]">Account Security</h3>
            <p className="text-[11px] text-[#7A6E65]">Pengaturan Keamanan & Sandi</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Checklist */}
        <div className="flex flex-col gap-2.5">
          {/* Biometrics */}
          <div className="p-3.5 bg-[#FCFBF9] rounded-2xl border border-[#4A2E1B]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C4722]">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E1E1E]">Fingerprint / Face ID</h4>
                <p className="text-[10px] text-[#7A6E65]">Masuk cepat menggunakan biometrik</p>
              </div>
            </div>
            <button
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                biometricsEnabled ? 'bg-[#8C4722] justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-xs"></div>
            </button>
          </div>

          {/* 2FA WhatsApp OTP */}
          <div className="p-3.5 bg-[#FCFBF9] rounded-2xl border border-[#4A2E1B]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C4722]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E1E1E]">Verifikasi 2 Langkah (OTP)</h4>
                <p className="text-[10px] text-[#7A6E65]">Kode keamanan via WhatsApp</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 flex items-center ${
                twoFactorEnabled ? 'bg-[#8C4722] justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-xs"></div>
            </button>
          </div>

          {/* Change Password */}
          <div className="p-3.5 bg-[#FCFBF9] rounded-2xl border border-[#4A2E1B]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C4722]">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1E1E1E]">Kata Sandi Akun</h4>
                <p className="text-[10px] text-[#7A6E65]">Terakhir diubah 3 minggu lalu</p>
              </div>
            </div>
            <button
              onClick={() => {
                setPasswordChanged(true);
                setTimeout(() => setPasswordChanged(false), 2500);
              }}
              className="px-3 py-1.5 rounded-xl border border-[#8C4722]/20 text-[11px] font-bold text-[#8C4722] hover:bg-[#FAF0E6] transition-colors"
            >
              {passwordChanged ? 'Terkirim!' : 'Ubah'}
            </button>
          </div>
        </div>

        {/* Security Status Box */}
        <div className="p-3 bg-[#F0FDF4] border border-[#2E7D32]/20 rounded-2xl flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-[#2E7D32] text-white flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
          <p className="text-[11px] text-[#2E7D32] font-semibold leading-tight">
            Status Keamanan Akun Anda Sangat Baik (Level Proteksi Maksimal)
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#8C4722] hover:bg-[#733819] text-white font-bold text-xs rounded-xl transition-all shadow-md mt-1"
        >
          Selesai
        </button>
      </div>
    </div>
  );
};
