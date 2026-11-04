import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/formatters';
import { TableSelectorModal } from '../components/home/TableSelectorModal';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  Tag,
  Check,
  X,
  MapPin,
  Flame,
  Snowflake,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import type { CartItem } from '../types';

interface CartScreenProps {
  onBackToHome: () => void;
  onProceedToPayment: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  onBackToHome,
  onProceedToPayment,
}) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    user,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    subtotal,
    discountAmount,
    taxPB1,
    serviceFee,
    totalPayment,
    createCheckoutOrder,
  } = useCart();

  const [voucherInput, setVoucherInput] = useState('');
  const [voucherError, setVoucherError] = useState<string | null>(null);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);

  const handleApplyVoucher = (codeToApply?: string) => {
    const code = codeToApply || voucherInput;
    if (!code) return;
    const res = applyVoucher(code);
    if (!res.success) {
      setVoucherError(res.message);
      setTimeout(() => setVoucherError(null), 3000);
    } else {
      setVoucherInput('');
      setVoucherError(null);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    createCheckoutOrder();
    onProceedToPayment();
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-full bg-[#FCFBF9]">
        {/* Header */}
        <div className="px-5 py-4 flex items-center gap-3 border-b border-[#4A2E1B]/10 bg-white">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#2D241E] hover:bg-[#FAF7F2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#2D241E]">Keranjang Belanja</h2>
            <p className="text-[11px] text-[#7A6E65]">Café Notre Socielle</p>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 px-5 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#965B2D] mb-4">
            <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-[#2D241E]">Keranjang Masih Kosong</h3>
          <p className="text-xs text-[#7A6E65] mt-1.5 max-w-[240px] leading-relaxed">
            Yuk pilih minuman segar atau camilan lezat dari menu untuk mulai memesan!
          </p>
          <button
            onClick={onBackToHome}
            className="mt-6 px-6 py-3 bg-[#4A2E1B] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-md hover:bg-[#372113] active:scale-95 transition-all"
          >
            <span>Jelajahi Menu Sekarang</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full bg-[#FCFBF9]">
      {/* Header */}
      <div className="sticky top-0 z-20 px-5 py-3.5 flex items-center justify-between border-b border-[#4A2E1B]/10 bg-white/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-9 h-9 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#2D241E] hover:bg-[#FAF7F2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#2D241E]">Keranjang Belanja</h2>
            <p className="text-[11px] text-[#7A6E65]">{cart.length} item dipilih</p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-[#ED6C02] hover:text-[#C55700] font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Kosongkan</span>
        </button>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* Dining Option & Table Card */}
        <div className="p-3.5 bg-white rounded-2xl border border-[#4A2E1B]/10 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#965B2D]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#7A6E65] uppercase tracking-wider">
                Opsi Pemesanan
              </span>
              <p className="text-xs font-bold text-[#2D241E]">
                {user.diningOption === 'Dine-In'
                  ? `Makan di Tempat (${user.tableNumber})`
                  : 'Bawa Pulang (Takeaway)'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsTableModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#F5EDE6] text-[#965B2D] text-xs font-bold hover:bg-[#EFE3D8] transition-all"
          >
            Ganti
          </button>
        </div>

        {/* List of Cart Items */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
            Rincian Menu Pesanan
          </h3>

          {cart.map((item: CartItem) => (
            <div
              key={item.cartItemId}
              className="p-3.5 bg-white rounded-2xl border border-[#4A2E1B]/10 flex flex-col gap-2.5 shadow-socielle"
            >
              <div className="flex gap-3">
                <img
                  src={item.menuItem.imageUrl}
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#4A2E1B]/10 flex-shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#2D241E]">
                      {item.menuItem.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#965B2D]">
                      {formatRupiah(item.menuItem.price)}
                    </p>
                  </div>

                  {/* Temperature badge if present */}
                  {item.selectedTemperature && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[10px] font-semibold text-[#4A2E1B] border border-[#4A2E1B]/10">
                        {item.selectedTemperature === 'Panas' ? (
                          <Flame className="w-2.5 h-2.5 text-[#ED6C02]" />
                        ) : (
                          <Snowflake className="w-2.5 h-2.5 text-[#0288D1]" />
                        )}
                        {item.selectedTemperature}
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right flex flex-col justify-between items-end">
                  <span className="text-xs font-extrabold text-[#4A2E1B]">
                    {formatRupiah(item.itemSubtotal)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1 text-[#7A6E65] hover:text-[#ED6C02] transition-colors"
                    title="Hapus Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Latte Art & Special Notes preview */}
              {(item.latteArtNote || item.specialNote) && (
                <div className="pt-2 border-t border-[#4A2E1B]/5 flex flex-col gap-1 text-[11px]">
                  {item.latteArtNote && (
                    <div className="flex items-center gap-1.5 text-[#965B2D] font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Art: {item.latteArtNote}</span>
                    </div>
                  )}
                  {item.specialNote && (
                    <p className="text-[#7A6E65] italic">
                      Catatan: "{item.specialNote}"
                    </p>
                  )}
                </div>
              )}

              {/* Stepper Quantity */}
              <div className="pt-1.5 flex items-center justify-end">
                <div className="flex items-center border border-[#4A2E1B]/20 rounded-xl bg-[#FCFBF9] p-0.5">
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4A2E1B] hover:bg-white active:scale-95 transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-7 text-center text-xs font-bold text-[#2D241E]">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-[#4A2E1B] hover:bg-white active:scale-95 transition-all"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voucher Promo Section */}
        <div className="p-4 bg-white rounded-2xl border border-[#4A2E1B]/10 flex flex-col gap-3 shadow-socielle">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D241E]">
            <Tag className="w-4 h-4 text-[#965B2D]" />
            <span>Kupon & Voucher Diskon</span>
          </div>

          {appliedVoucher ? (
            <div className="p-3 bg-[#F0FDF4] border border-[#2E7D32]/20 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center text-[#2E7D32]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2E7D32]">
                    {appliedVoucher.code} ({formatRupiah(appliedVoucher.discountAmount)})
                  </p>
                  <p className="text-[10px] text-[#2E7D32]/80">
                    {appliedVoucher.description}
                  </p>
                </div>
              </div>
              <button
                onClick={removeVoucher}
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E] shadow-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={voucherInput}
                  onChange={(e) => setVoucherInput(e.target.value)}
                  placeholder="Masukkan kode promo..."
                  className="flex-1 uppercase text-xs px-3 py-2 bg-[#FCFBF9] rounded-xl border border-[#4A2E1B]/15 focus:outline-none focus:border-[#965B2D]"
                />
                <button
                  type="button"
                  onClick={() => handleApplyVoucher()}
                  className="px-4 py-2 bg-[#4A2E1B] text-white text-xs font-bold rounded-xl hover:bg-[#372113] active:scale-95 transition-all"
                >
                  Pakai
                </button>
              </div>

              {voucherError && (
                <p className="text-[10px] text-red-600 font-medium">{voucherError}</p>
              )}

              {/* Clickable Quick Promo Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-[#7A6E65]">Tersedia:</span>
                {['SOCIELLE20', 'FREELATTE', 'BOOST8K'].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleApplyVoucher(code)}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF0E6] text-[#965B2D] border border-[#965B2D]/20 hover:bg-[#F5E2D0] transition-colors"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ringkasan Biaya (Section 5 app_context.md) */}
        <div className="p-4 bg-white rounded-2xl border border-[#4A2E1B]/10 flex flex-col gap-2.5 shadow-socielle">
          <h4 className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider mb-0.5">
            Rincian Pembayaran
          </h4>

          <div className="flex justify-between text-xs text-[#2D241E]">
            <span className="text-[#7A6E65]">Subtotal Item ({cart.length})</span>
            <span className="font-semibold">{formatRupiah(subtotal)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-xs text-[#2E7D32]">
              <span>Diskon Voucher ({appliedVoucher?.code})</span>
              <span className="font-semibold">- {formatRupiah(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between text-xs text-[#2D241E]">
            <div className="flex items-center gap-1">
              <span className="text-[#7A6E65]">Pajak Restoran (PB1 10%)</span>
            </div>
            <span className="font-semibold">{formatRupiah(taxPB1)}</span>
          </div>

          <div className="flex justify-between text-xs text-[#2D241E]">
            <span className="text-[#7A6E65]">Biaya Layanan Aplikasi</span>
            <span className="font-semibold">{formatRupiah(serviceFee)}</span>
          </div>

          <div className="pt-2 border-t border-[#4A2E1B]/10 flex justify-between items-center text-sm">
            <span className="font-bold text-[#2D241E]">Total Tagihan</span>
            <span className="text-base font-extrabold text-[#4A2E1B]">
              {formatRupiah(totalPayment)}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Floating Bar CTA */}
      <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#4A2E1B]/10 p-4 flex items-center justify-between gap-4 shadow-socielle mt-auto">
        <div>
          <span className="text-[10px] text-[#7A6E65] uppercase font-semibold">
            Total Pembayaran
          </span>
          <p className="text-base font-extrabold text-[#4A2E1B] leading-tight">
            {formatRupiah(totalPayment)}
          </p>
        </div>

        <button
          onClick={handleCheckout}
          className="flex-1 py-3 px-5 bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.98] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          <ShieldCheck className="w-4 h-4 text-[#965B2D]" />
          <span>Bayar Sekarang (QRIS)</span>
        </button>
      </div>

      {/* Table Selector Modal */}
      <TableSelectorModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
      />
    </div>
  );
};

