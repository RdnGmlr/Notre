import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/formatters';
import { QRCodeSvg } from '../components/common/QRCodeSvg';
import { ArrowLeft, Clock, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentQRISScreenProps {
  onBack: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentQRISScreen: React.FC<PaymentQRISScreenProps> = ({
  onBack,
  onPaymentSuccess,
}) => {
  const { activeOrder, confirmPaymentSuccess } = useCart();
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 15-minute countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const order = activeOrder;
  if (!order) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-full">
        <p className="text-sm text-[#7A6E65]">Data transaksi tidak ditemukan.</p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-[#4A2E1B] text-white text-xs font-bold rounded-xl"
        >
          Kembali
        </button>
      </div>
    );
  }

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(String(order.totalPayment));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate instant successful payment
  const handleSimulatePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4A2E1B', '#965B2D', '#2E7D32', '#F5EDE6', '#ED6C02'],
        });
      } catch (e) {
        console.error(e);
      }

      confirmPaymentSuccess(order.orderId);
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#FCFBF9] pb-8">
      {/* Top Header */}
      <div className="px-5 py-4 flex items-center justify-between border-b border-[#4A2E1B]/10 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#2D241E] hover:bg-[#FAF7F2] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#2D241E]">Pembayaran QRIS</h2>
            <p className="text-[11px] text-[#7A6E65]">Transaksi Mandiri Instan</p>
          </div>
        </div>

        {/* 15 Minutes Countdown Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF3E0] border border-[#ED6C02]/20 text-[#ED6C02] text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatTimer(timeLeft)}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* QRIS Official Container Card */}
        <div className="p-5 bg-white rounded-3xl border border-[#4A2E1B]/15 shadow-socielle-lg flex flex-col items-center text-center gap-3 relative overflow-hidden">
          {/* Top National Header */}
          <div className="w-full pb-3 border-b border-[#4A2E1B]/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-widest text-[#4A2E1B]">
                QRIS
              </span>
              <span className="text-[9px] font-semibold text-[#7A6E65] uppercase">
                Standar Pembayaran Nasional
              </span>
            </div>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#F5EDE6] text-[#965B2D]">
              GPN
            </span>
          </div>

          {/* Merchant Info */}
          <div>
            <h3 className="text-base font-extrabold text-[#2D241E] uppercase tracking-wide">
              CAFÉ NOTRE SOCIELLE
            </h3>
            <p className="text-[10px] text-[#7A6E65] font-mono mt-0.5">
              NMID: ID1020039482910
            </p>
          </div>

          {/* QR Code Graphic */}
          <div className="my-1 p-2 bg-[#FAF7F2] rounded-2xl border border-[#4A2E1B]/10">
            <QRCodeSvg value={order.barcodeValue} size={210} />
          </div>

          {/* Instructions & Supported Wallets */}
          <p className="text-xs text-[#7A6E65] max-w-[270px] leading-relaxed">
            Pindai QR ini melalui aplikasi m-Banking (BCA, Mandiri, BRI, BNI) atau e-Wallet (GoPay, OVO, Dana, ShopeePay).
          </p>

          <div className="pt-2 border-t border-[#4A2E1B]/10 w-full flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[9px] text-[#7A6E65] font-medium">Didukung oleh:</span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#4A2E1B]">
              <span className="bg-[#FAF0E6] px-1.5 py-0.5 rounded">BCA</span>
              <span className="bg-[#FAF0E6] px-1.5 py-0.5 rounded">GoPay</span>
              <span className="bg-[#FAF0E6] px-1.5 py-0.5 rounded">OVO</span>
              <span className="bg-[#FAF0E6] px-1.5 py-0.5 rounded">Dana</span>
            </div>
          </div>
        </div>

        {/* Bill Details Card */}
        <div className="p-4 bg-white rounded-2xl border border-[#4A2E1B]/10 flex flex-col gap-2.5 shadow-socielle">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7A6E65]">Nomor Tagihan</span>
            <span className="font-mono font-bold text-[#2D241E]">{order.orderId}</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#7A6E65]">Pilihan Santap</span>
            <span className="font-bold text-[#2D241E]">
              {order.diningOption === 'Dine-In'
                ? `Makan di Tempat (${order.tableNumber})`
                : 'Bawa Pulang (Takeaway)'}
            </span>
          </div>

          <div className="pt-2 border-t border-[#4A2E1B]/10 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#7A6E65]">Total Tagihan QRIS</span>
              <h4 className="text-lg font-extrabold text-[#4A2E1B]">
                {formatRupiah(order.totalPayment)}
              </h4>
            </div>
            <button
              onClick={handleCopyAmount}
              className="px-3 py-1.5 rounded-xl border border-[#4A2E1B]/15 bg-[#FCFBF9] text-xs font-semibold text-[#4A2E1B] flex items-center gap-1.5 hover:bg-[#FAF7F2] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span className="text-[#2E7D32]">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Total</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Simulation CTA for Reviewer */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-3.5 px-4 bg-[#2E7D32] hover:bg-[#256828] active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Simulasikan Pembayaran Berhasil</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-[#7A6E65] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#2E7D32]" />
            Verifikasi otomatis tanpa perlu upload bukti transfer fisik
          </p>
        </div>
      </div>
    </div>
  );
};

