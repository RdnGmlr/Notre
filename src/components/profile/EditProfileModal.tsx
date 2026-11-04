import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, User, Phone, Check } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, setTableNumber } = useCart();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [table, setTable] = useState(user.tableNumber);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    user.name = name;
    user.phone = phone;
    setTableNumber(table);
    try {
      localStorage.setItem('order_socielle_user', JSON.stringify({ ...user, name, phone, tableNumber: table }));
    } catch (err) {
      console.error(err);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-[390px] bg-white rounded-3xl p-5 shadow-2xl border border-[#4A2E1B]/15 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#4A2E1B]/10">
          <div>
            <h3 className="text-base font-bold text-[#2D241E]">Ubah Data Profil</h3>
            <p className="text-[11px] text-[#7A6E65]">Perbarui identitas akun pemesan</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#7A6E65] uppercase">Nama Lengkap</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-[#7A6E65] absolute left-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/15 text-xs text-[#2D241E] focus:outline-none focus:border-[#965B2D]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#7A6E65] uppercase">Nomor WhatsApp</label>
            <div className="relative flex items-center">
              <Phone className="w-4 h-4 text-[#7A6E65] absolute left-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/15 text-xs text-[#2D241E] focus:outline-none focus:border-[#965B2D]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-[#7A6E65] uppercase">Nomor Meja Default</label>
            <input
              type="text"
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/15 text-xs text-[#2D241E] focus:outline-none focus:border-[#965B2D]"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full py-3 bg-[#4A2E1B] hover:bg-[#372113] active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Simpan Perubahan</span>
          </button>
        </form>
      </div>
    </div>
  );
};

