import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatRupiah } from '../../utils/formatters';
import { X, History, Receipt, ChevronRight } from 'lucide-react';
import type { Order } from '../../types';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOrder: (orderId: string) => void;
  onGoToHome: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  onSelectOrder,
  onGoToHome,
}) => {
  const { orders, activeOrder } = useCart();
  if (!isOpen) return null;

  const allOrders = [...orders];
  if (activeOrder && !allOrders.some((o) => o.orderId === activeOrder.orderId)) {
    allOrders.unshift(activeOrder);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-[#FFF3E0] text-[#ED6C02] border-[#ED6C02]/20';
      case 'Diproses':
        return 'bg-[#E3F2FD] text-[#0288D1] border-[#0288D1]/20';
      case 'Siap':
        return 'bg-[#E8F5E9] text-[#2E7D32] border-[#2E7D32]/20';
      case 'Selesai':
        return 'bg-[#F5EDE6] text-[#4A2E1B] border-[#4A2E1B]/20';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-[430px] bg-white rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-[#4A2E1B]/15 flex flex-col gap-4 max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#4A2E1B]/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#8C4722]">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1E1E1E]">Riwayat Transaksi</h3>
              <p className="text-[10px] text-[#7A6E65]">Daftar seluruh pesanan Anda</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCFBF9] border border-[#4A2E1B]/10 flex items-center justify-center text-[#7A6E65] hover:text-[#2D241E]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {allOrders.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center p-4">
            <div className="w-14 h-14 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#8C4722] mb-3">
              <History className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-[#1E1E1E]">Belum Ada Riwayat Pesanan</h4>
            <p className="text-xs text-[#7A6E65] mt-1 max-w-[200px]">
              Pesanan kopi atau makanan Anda akan tercatat di sini.
            </p>
            <button
              onClick={() => {
                onClose();
                onGoToHome();
              }}
              className="mt-4 px-4 py-2 bg-[#8C4722] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Mulai Pesan Sekarang
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {allOrders.map((order: Order) => (
              <div
                key={order.orderId}
                onClick={() => {
                  onClose();
                  onSelectOrder(order.orderId);
                }}
                className="p-3.5 bg-white rounded-2xl border border-[#4A2E1B]/10 hover:border-[#8C4722]/40 transition-all cursor-pointer shadow-xs flex flex-col gap-2 group"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#4A2E1B]/5">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#1E1E1E] group-hover:text-[#8C4722] transition-colors">
                      {order.orderId}
                    </span>
                    <p className="text-[10px] text-[#7A6E65]">
                      {new Date(order.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                <div className="text-xs text-[#7A6E65] line-clamp-1">
                  {order.items.map((it) => `${it.quantity}x ${it.menuItem.name}`).join(', ')}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[#4A2E1B]/5">
                  <span className="text-xs font-bold text-[#4A2E1B]">
                    {formatRupiah(order.totalPayment)}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#8C4722]">
                    <Receipt className="w-3.5 h-3.5" />
                    <span>Lihat Tiket</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

