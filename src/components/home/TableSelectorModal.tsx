import React, { useState } from 'react';
import { X, Utensils, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { DiningOption } from '../../types';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABLE_LIST = Array.from({ length: 16 }, (_, i) => `Meja ${String(i + 1).padStart(2, '0')}`);

export const TableSelectorModal: React.FC<TableSelectorModalProps> = ({ isOpen, onClose }) => {
  const { user, setDiningOption, setTableNumber } = useCart();
  const [selectedOption, setSelectedOption] = useState<DiningOption>(user.diningOption);
  const [selectedTable, setSelectedTable] = useState<string>(user.tableNumber);

  if (!isOpen) return null;

  const handleSave = () => {
    setDiningOption(selectedOption);
    if (selectedOption === 'Dine-In') {
      setTableNumber(selectedTable);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div 
        className="w-full max-w-[430px] bg-[#FFFFFF] rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl flex flex-col gap-5 border border-[#4A2E1B]/10 max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#4A2E1B]/10">
          <div>
            <h3 className="text-lg font-bold text-[#2D241E]">Pilihan Santap</h3>
            <p className="text-xs text-[#7A6E65]">Tentukan metode pemesanan & posisi mejamu</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Option Toggle */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSelectedOption('Dine-In')}
            className={`p-3.5 rounded-2xl flex flex-col items-center gap-2 border transition-all ${
              selectedOption === 'Dine-In'
                ? 'bg-[#4A2E1B] text-white border-[#4A2E1B] shadow-md'
                : 'bg-[#FCFBF9] text-[#2D241E] border-[#4A2E1B]/15 hover:bg-[#FAF7F2]'
            }`}
          >
            <Utensils className="w-5 h-5" />
            <span className="text-sm font-semibold">Makan di Tempat (Dine-In)</span>
          </button>

          <button
            onClick={() => setSelectedOption('Takeaway')}
            className={`p-3.5 rounded-2xl flex flex-col items-center gap-2 border transition-all ${
              selectedOption === 'Takeaway'
                ? 'bg-[#4A2E1B] text-white border-[#4A2E1B] shadow-md'
                : 'bg-[#FCFBF9] text-[#2D241E] border-[#4A2E1B]/15 hover:bg-[#FAF7F2]'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm font-semibold">Bawa Pulang (Takeaway)</span>
          </button>
        </div>

        {/* Table Selector (If Dine-In) */}
        {selectedOption === 'Dine-In' && (
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-[#7A6E65] uppercase tracking-wider">
              Pilih Nomor Meja
            </label>
            <div className="grid grid-cols-4 gap-2">
              {TABLE_LIST.map((table) => {
                const isSelected = selectedTable === table;
                return (
                  <button
                    key={table}
                    onClick={() => setSelectedTable(table)}
                    className={`py-2 px-1 text-xs font-medium rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-[#965B2D] text-white border-[#965B2D] font-bold shadow-xs'
                        : 'bg-[#FCFBF9] text-[#2D241E] border-[#4A2E1B]/10 hover:border-[#965B2D]/40'
                    }`}
                  >
                    {table}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.99] text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
        >
          <Check className="w-4 h-4" />
          Simpan Pilihan
        </button>
      </div>
    </div>
  );
};
