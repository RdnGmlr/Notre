import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/formatters';
import { BarcodeSvg } from '../components/common/BarcodeSvg';
import { ReviewModal } from '../components/home/ReviewModal';
import { NotreSocielleIcon } from '../components/common/NotreSocielleLogo';
import {
  Clock,
  ArrowRight,
  Sparkles,
  Home,
  Check,
  Bell,
  Star,
  Coffee,
  CheckCircle2,
  Utensils,
  MapPin,
  RefreshCw,
} from 'lucide-react';
import type { OrderStatus, CartItem } from '../types';

interface OrderTicketScreenProps {
  orderId?: string;
  onBackToHome: () => void;
}

export const OrderTicketScreen: React.FC<OrderTicketScreenProps> = ({
  orderId,
  onBackToHome,
}) => {
  const { activeOrder, orders, advanceOrderStatus, setSpecificOrderStatus } = useCart();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const currentOrder = orderId
    ? orders.find((o) => o.orderId === orderId) || activeOrder
    : activeOrder || orders[0];

  if (!currentOrder) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-full">
        <p className="text-sm text-[#7A6E65]">Tiket pesanan tidak ditemukan.</p>
        <button
          onClick={onBackToHome}
          className="mt-4 px-4 py-2 bg-[#4A2E1B] text-white text-xs font-bold rounded-xl"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const statusSteps: OrderStatus[] = ['Menunggu', 'Diproses', 'Siap', 'Selesai'];
  const currentStepIndex = statusSteps.indexOf(currentOrder.orderStatus);

  const formattedDate = new Date(currentOrder.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Handle advancing status (for barista simulation or confirmation)
  const handleNextStatus = () => {
    advanceOrderStatus(currentOrder.orderId);
  };

  const handleMarkAsReceived = () => {
    setSpecificOrderStatus(currentOrder.orderId, 'Selesai');
    setIsReviewModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#FCFBF9] pb-10">
      {/* Dynamic Top Banner Based on Status */}
      {currentOrder.orderStatus === 'Siap' ? (
        /* Halaman Keterangan Pesanan Siap Banner */
        <div className="bg-[#2E7D32] text-white px-5 pt-5 pb-6 flex flex-col items-center text-center animate-in fade-in">
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full bg-white text-[#2E7D32] flex items-center justify-center shadow-lg animate-bounce">
              <Bell className="w-8 h-8 fill-current" />
            </div>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ED6C02] rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white">
              !
            </span>
          </div>
          <h2 className="text-lg font-black tracking-wide text-white drop-shadow-sm flex items-center gap-1.5">
            Pesananmu Sudah Siap! ☕✨
          </h2>
          <p className="text-xs text-white/90 mt-1 max-w-[280px] leading-relaxed">
            {currentOrder.diningOption === 'Dine-In'
              ? `Silakan bersiap di ${currentOrder.tableNumber || 'mejamu'}, barista kami segera mengantarkan pesanan!`
              : `Pesanan takeaway siap diambil di Pick-up Counter (Meja Bar Depan).`}
          </p>
        </div>
      ) : currentOrder.orderStatus === 'Selesai' ? (
        /* Status Selesai Banner */
        <div className="bg-[#4A2E1B] text-white px-5 pt-5 pb-6 flex flex-col items-center text-center animate-in fade-in">
          <div className="w-13 h-13 rounded-full bg-[#965B2D] text-white flex items-center justify-center mb-2 shadow-lg">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-black tracking-wide text-white">
            Pesanan Selesai Diserahkan 🎉
          </h2>
          <p className="text-xs text-[#F5EDE6]/85 mt-1 max-w-[280px]">
            Terima kasih telah memesan di Café Notre Socielle. Selamat menikmati sajian kami!
          </p>
        </div>
      ) : currentOrder.orderStatus === 'Diproses' ? (
        /* Status Sedang Diproses Banner */
        <div className="bg-[#965B2D] text-white px-5 pt-4 pb-5 flex flex-col items-center text-center animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 animate-pulse">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-base font-extrabold tracking-wide">
            Sedang Diracik oleh Barista ☕
          </h2>
          <p className="text-xs text-white/85 mt-0.5">
            Biji kopi pilihan sedang digiling & diseduh dengan standar terbaik
          </p>
        </div>
      ) : (
        /* Status Menunggu Banner */
        <div className="bg-[#ED6C02] text-white px-5 pt-4 pb-5 flex flex-col items-center text-center animate-in fade-in">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2 animate-bounce">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-base font-extrabold tracking-wide">
            Pesanan Masuk Antrean Barista
          </h2>
          <p className="text-xs text-white/85 mt-0.5">
            Pesanan telah tercatat di sistem kasir & antrean dapur
          </p>
        </div>
      )}

      <div className="p-5 flex flex-col gap-4 -mt-3">
        {/* Callout Khusus jika Pesanan SIAP */}
        {currentOrder.orderStatus === 'Siap' && (
          <div className="p-4 bg-[#E8F5E9] rounded-2xl border-2 border-[#2E7D32] shadow-socielle-lg flex flex-col gap-3 animate-in zoom-in-95">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center flex-shrink-0">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#2E7D32] uppercase tracking-wider">
                  Pengambilan Pesanan
                </h4>
                <p className="text-xs font-bold text-[#2D241E]">
                  {currentOrder.diningOption === 'Dine-In'
                    ? `Antaran ke ${currentOrder.tableNumber || 'Meja'}`
                    : 'Pick-Up Counter Kasir Bar'}
                </p>
              </div>
            </div>

            <p className="text-[11px] text-[#2D241E]/80 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-[#2E7D32]/20">
              💡 Tunjukkan barcode tiket di bawah ini kepada barista kami saat menerima pesanan untuk verifikasi serah terima.
            </p>

            <button
              onClick={handleMarkAsReceived}
              className="w-full py-3 bg-[#2E7D32] hover:bg-[#256828] active:scale-[0.98] text-white font-black text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Konfirmasi Pesanan Telah Diterima</span>
            </button>
          </div>
        )}

        {/* Callout Khusus jika Pesanan SELESAI -> Ajak Beri Ulasan */}
        {currentOrder.orderStatus === 'Selesai' && (
          <div className="p-4 bg-gradient-to-r from-[#FAF0E6] to-[#F5EDE6] rounded-2xl border border-[#965B2D]/30 shadow-socielle flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#965B2D] text-white flex items-center justify-center">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#4A2E1B]">
                    {currentOrder.review ? 'Ulasan Anda' : 'Beri Ulasan Produk'}
                  </h4>
                  <p className="text-[10px] text-[#7A6E65]">
                    {currentOrder.review
                      ? 'Terima kasih atas ulasan Anda!'
                      : 'Dapatkan +25 Poin Member Socielle'}
                  </p>
                </div>
              </div>

              {currentOrder.review ? (
                <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-[#965B2D]/20">
                  <Star className="w-3.5 h-3.5 fill-[#E5A500] text-[#E5A500]" />
                  <span className="text-xs font-bold text-[#4A2E1B]">
                    {currentOrder.review.rating}/5
                  </span>
                </div>
              ) : (
                <span className="text-[10px] font-black text-[#965B2D] bg-white px-2 py-0.5 rounded-md border border-[#965B2D]/20">
                  +25 Poin
                </span>
              )}
            </div>

            {currentOrder.review ? (
              <div className="bg-white p-3 rounded-xl border border-[#965B2D]/15 flex flex-col gap-1.5">
                <div className="flex flex-wrap gap-1">
                  {currentOrder.review.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[9px] font-semibold bg-[#FAF7F2] text-[#965B2D] px-2 py-0.5 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xs italic text-[#2D241E]">
                  "{currentOrder.review.comment}"
                </p>
              </div>
            ) : (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full py-2.5 bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.98] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D49B55]" />
                <span>Beri Ulasan Produk Sekarang</span>
              </button>
            )}
          </div>
        )}

        {/* Receipt Container */}
        <div className="bg-white rounded-3xl border border-[#4A2E1B]/15 shadow-socielle-lg p-5 flex flex-col gap-4 relative">
          {/* Header Ticket */}
          <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#4A2E1B]/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center border border-[#8C4722]/20 flex-shrink-0">
                <NotreSocielleIcon size={18} color="#8C4722" />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#8C4722] lowercase leading-none mb-0.5">
                  notre socielle
                </p>
                <h3 className="text-sm font-extrabold text-[#2D241E]">
                  Tiket Pengambilan Pesanan
                </h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#7A6E65]">{formattedDate}</span>
              <p className="text-xs font-bold text-[#965B2D] flex items-center justify-end gap-1">
                <MapPin className="w-3 h-3 text-[#965B2D]" />
                {currentOrder.diningOption === 'Dine-In'
                  ? currentOrder.tableNumber
                  : 'Takeaway'}
              </p>
            </div>
          </div>

          {/* Live Order Status Tracker */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#4A2E1B]/10 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4A2E1B] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#965B2D]" />
                {currentOrder.orderStatus === 'Siap'
                  ? 'Status: SIAP DIAMBIL'
                  : currentOrder.orderStatus === 'Selesai'
                  ? 'Status: SELESAI'
                  : `Estimasi Waktu: ${currentOrder.estimatedReadyTime}`}
              </span>
              <span
                className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                  currentOrder.orderStatus === 'Siap'
                    ? 'bg-[#2E7D32] text-white animate-pulse'
                    : currentOrder.orderStatus === 'Selesai'
                    ? 'bg-[#4A2E1B] text-white'
                    : 'bg-[#965B2D] text-white'
                }`}
              >
                {currentOrder.orderStatus}
              </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="relative flex items-center justify-between pt-2 px-2">
              {/* Connector line */}
              <div className="absolute top-5 left-4 right-4 h-0.5 bg-[#4A2E1B]/20 -z-0">
                <div
                  className="h-full bg-[#2E7D32] transition-all duration-500"
                  style={{
                    width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>

              {statusSteps.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step} className="flex flex-col items-center gap-1 z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isCurrent
                          ? 'bg-[#965B2D] text-white ring-4 ring-[#965B2D]/20 scale-110'
                          : isPassed
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-white border border-[#4A2E1B]/20 text-[#7A6E65]'
                      }`}
                    >
                      {isPassed ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[9px] font-bold ${
                        isPassed ? 'text-[#2D241E]' : 'text-[#7A6E65]/60'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Advance Status Demo Tool */}
            {currentOrder.orderStatus !== 'Selesai' && (
              <button
                onClick={handleNextStatus}
                className="mt-2 text-[11px] font-bold text-[#965B2D] hover:underline self-center flex items-center gap-1.5 py-1 px-3 rounded-lg bg-white border border-[#965B2D]/20 shadow-2xs"
                title="Simulasikan langkah pesanan berikutnya"
              >
                <RefreshCw className="w-3 h-3" />
                <span>
                  {currentOrder.orderStatus === 'Diproses'
                    ? '☕ Simulasikan Pesanan Sudah Siap (Barista)'
                    : '🔄 Simulasikan Progres Status Selanjutnya'}
                </span>
              </button>
            )}
          </div>

          {/* Barcode 1D Graphic */}
          <div className="flex flex-col items-center pt-1 pb-2">
            <div
              className={`w-full p-2 rounded-2xl transition-all ${
                currentOrder.orderStatus === 'Siap'
                  ? 'ring-4 ring-[#2E7D32]/30 bg-[#E8F5E9]/30'
                  : ''
              }`}
            >
              <BarcodeSvg value={currentOrder.barcodeValue} height={50} />
            </div>
            <p className="text-[10px] text-[#7A6E65] text-center mt-2 max-w-[240px]">
              Tunjukkan barcode ini langsung di meja kasir/bar untuk konfirmasi serah terima.
            </p>
          </div>

          {/* Order Item List */}
          <div className="pt-3 border-t border-dashed border-[#4A2E1B]/20 flex flex-col gap-2">
            <h4 className="text-xs font-bold text-[#7A6E65] uppercase tracking-wider">
              Daftar Pesanan ({currentOrder.items.length})
            </h4>

            <div className="flex flex-col gap-2">
              {currentOrder.items.map((item: CartItem, i) => (
                <div
                  key={`${item.cartItemId}-${i}`}
                  className="flex justify-between items-start text-xs"
                >
                  <div>
                    <span className="font-bold text-[#2D241E]">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    {item.selectedTemperature && (
                      <span className="text-[10px] text-[#7A6E65] ml-1.5">
                        ({item.selectedTemperature})
                      </span>
                    )}
                    {item.latteArtNote && (
                      <p className="text-[10px] text-[#965B2D] flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> Art: {item.latteArtNote}
                      </p>
                    )}
                    {item.specialNote && (
                      <p className="text-[10px] text-[#7A6E65] italic">
                        "{item.specialNote}"
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-[#4A2E1B]">
                    {formatRupiah(item.itemSubtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="pt-3 border-t border-dashed border-[#4A2E1B]/20 flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-[#7A6E65]">
              <span>Subtotal</span>
              <span>{formatRupiah(currentOrder.subtotal)}</span>
            </div>

            {currentOrder.discountAmount > 0 && (
              <div className="flex justify-between text-[#2E7D32]">
                <span>Diskon Kupon</span>
                <span>- {formatRupiah(currentOrder.discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#7A6E65]">
              <span>Pajak Restoran PB1 (10%)</span>
              <span>{formatRupiah(currentOrder.taxPB1)}</span>
            </div>

            <div className="flex justify-between text-[#7A6E65]">
              <span>Biaya Layanan</span>
              <span>{formatRupiah(currentOrder.serviceFee)}</span>
            </div>

            <div className="pt-2 border-t border-[#4A2E1B]/10 flex justify-between items-center text-sm font-extrabold text-[#2D241E]">
              <span>Total Terbayar (LUNAS via QRIS)</span>
              <span className="text-[#4A2E1B]">
                {formatRupiah(currentOrder.totalPayment)}
              </span>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <button
          onClick={onBackToHome}
          className="w-full py-3.5 bg-[#4A2E1B] hover:bg-[#372113] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all mt-1"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda Utama</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        order={currentOrder}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </div>
  );
};
