import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, MenuItem, DiningOption, UserProfile, Order, OrderStatus, OrderReview } from '../types';
import { INITIAL_USER } from '../data/mockData';

export interface AppliedVoucher {
  code: string;
  discountAmount: number;
  description: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: MenuItem,
    quantity?: number,
    selectedTemperature?: 'Dingin' | 'Panas',
    specialNote?: string,
    latteArtNote?: string
  ) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  user: UserProfile;
  setDiningOption: (option: DiningOption) => void;
  setTableNumber: (table: string) => void;

  // Voucher & Calculations
  appliedVoucher: AppliedVoucher | null;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
  subtotal: number;
  discountAmount: number;
  taxPB1: number;
  serviceFee: number;
  totalPayment: number;

  // Orders Management
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  createCheckoutOrder: () => Order;
  confirmPaymentSuccess: (orderId: string) => Order | null;
  advanceOrderStatus: (orderId: string) => OrderStatus | null;
  setSpecificOrderStatus: (orderId: string, status: OrderStatus) => void;
  submitOrderReview: (orderId: string, review: OrderReview) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('order_socielle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('order_socielle_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('order_socielle_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [appliedVoucher, setAppliedVoucher] = useState<AppliedVoucher | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('order_socielle_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('order_socielle_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('order_socielle_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    selectedTemperature?: 'Dingin' | 'Panas',
    specialNote?: string,
    latteArtNote?: string
  ) => {
    const existingIndex = cart.findIndex(
      (c) =>
        c.menuItem.id === item.id &&
        c.selectedTemperature === selectedTemperature &&
        c.latteArtNote === latteArtNote &&
        c.specialNote === specialNote
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      const newQty = updated[existingIndex].quantity + quantity;
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: newQty,
        itemSubtotal: newQty * item.price,
      };
      setCart(updated);
    } else {
      const newItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        menuItem: item,
        selectedTemperature,
        specialNote,
        latteArtNote,
        quantity,
        itemSubtotal: item.price * quantity,
      };
      setCart([...cart, newItem]);
    }
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity, itemSubtotal: item.menuItem.price * newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Financial Rules (Section 5 app_context.md)
  const subtotal = cart.reduce((sum, item) => sum + item.itemSubtotal, 0);
  const discountAmount = appliedVoucher ? appliedVoucher.discountAmount : 0;
  // PB1 10% dihitung dari (subtotal - diskon)
  const baseForTax = Math.max(0, subtotal - discountAmount);
  const taxPB1 = Math.round(0.10 * baseForTax);
  // Biaya Layanan Aplikasi flat Rp 1.000
  const serviceFee = cart.length > 0 ? 1000 : 0;
  // Total Bayar = (Subtotal - Diskon) + Pajak PB1 + Biaya Layanan
  const totalPayment = baseForTax + taxPB1 + serviceFee;

  const applyVoucher = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (subtotal <= 0) {
      return { success: false, message: 'Keranjang belanja masih kosong' };
    }

    if (cleanCode === 'SOCIELLE20') {
      const discount = Math.min(10000, Math.round(subtotal * 0.20));
      setAppliedVoucher({
        code: cleanCode,
        discountAmount: discount,
        description: 'Diskon 20% Pembelian Pertama',
      });
      return { success: true, message: 'Kupon SOCIELLE20 berhasil digunakan!' };
    }

    if (cleanCode === 'FREELATTE') {
      const discount = 5000;
      setAppliedVoucher({
        code: cleanCode,
        discountAmount: discount,
        description: 'Potongan Request Latte Art Rp 5.000',
      });
      return { success: true, message: 'Kupon FREELATTE berhasil digunakan!' };
    }

    if (cleanCode === 'BOOST8K') {
      const discount = Math.min(8000, subtotal);
      setAppliedVoucher({
        code: cleanCode,
        discountAmount: discount,
        description: 'Potongan Paket Morning Boost Rp 8.000',
      });
      return { success: true, message: 'Kupon BOOST8K berhasil digunakan!' };
    }

    return { success: false, message: 'Kode voucher tidak valid atau sudah kedaluwarsa' };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
  };

  const setDiningOption = (option: DiningOption) => {
    setUser((prev) => ({ ...prev, diningOption: option }));
  };

  const setTableNumber = (table: string) => {
    setUser((prev) => ({ ...prev, tableNumber: table }));
  };

  // Format Order ID: TRX-VC-{YYYYMMDD}-{INDEX}
  const createCheckoutOrder = (): Order => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const orderIndex = String(orders.length + 1).padStart(3, '0');
    const orderId = `TRX-VC-${yyyy}${mm}${dd}-${orderIndex}`;

    const newOrder: Order = {
      orderId,
      createdAt: now.toISOString(),
      userId: user.phone || 'GUEST',
      diningOption: user.diningOption,
      tableNumber: user.diningOption === 'Dine-In' ? user.tableNumber : undefined,
      items: [...cart],
      subtotal,
      discountAmount,
      taxPB1,
      serviceFee,
      totalPayment,
      paymentMethod: 'QRIS',
      paymentStatus: 'Pending',
      orderStatus: 'Menunggu',
      estimatedReadyTime: '15-20 Menit',
      barcodeValue: orderId,
    };

    setActiveOrder(newOrder);
    return newOrder;
  };

  const confirmPaymentSuccess = (orderId: string): Order | null => {
    let updatedOrder: Order | null = null;

    setOrders((prev) => {
      const existing = prev.find((o) => o.orderId === orderId);
      if (existing) {
        return prev.map((o) =>
          o.orderId === orderId
            ? { ...o, paymentStatus: 'Paid', orderStatus: 'Diproses' }
            : o
        );
      } else if (activeOrder && activeOrder.orderId === orderId) {
        updatedOrder = {
          ...activeOrder,
          paymentStatus: 'Paid',
          orderStatus: 'Diproses',
        };
        return [updatedOrder, ...prev];
      }
      return prev;
    });

    if (activeOrder && activeOrder.orderId === orderId) {
      updatedOrder = {
        ...activeOrder,
        paymentStatus: 'Paid',
        orderStatus: 'Diproses',
      };
      setActiveOrder(updatedOrder);
    }

    // Clear cart once paid
    clearCart();

    return updatedOrder;
  };

  const advanceOrderStatus = (orderId: string): OrderStatus | null => {
    const statusFlow: OrderStatus[] = ['Menunggu', 'Diproses', 'Siap', 'Selesai'];
    let nextStatus: OrderStatus | null = null;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId) {
          const currentIndex = statusFlow.indexOf(o.orderStatus);
          const nextIndex = Math.min(statusFlow.length - 1, currentIndex + 1);
          nextStatus = statusFlow[nextIndex];
          return { ...o, orderStatus: nextStatus };
        }
        return o;
      })
    );

    if (activeOrder && activeOrder.orderId === orderId) {
      const currentIndex = statusFlow.indexOf(activeOrder.orderStatus);
      const nextIndex = Math.min(statusFlow.length - 1, currentIndex + 1);
      nextStatus = statusFlow[nextIndex];
      setActiveOrder({ ...activeOrder, orderStatus: nextStatus });
    }

    return nextStatus;
  };

  const setSpecificOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o))
    );
    if (activeOrder && activeOrder.orderId === orderId) {
      setActiveOrder({ ...activeOrder, orderStatus: status });
    }
  };

  const submitOrderReview = (orderId: string, review: OrderReview) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, review } : o))
    );
    if (activeOrder && activeOrder.orderId === orderId) {
      setActiveOrder({ ...activeOrder, review });
    }
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.orderId === orderId) || (activeOrder?.orderId === orderId ? activeOrder : undefined);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        user,
        setDiningOption,
        setTableNumber,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        subtotal,
        discountAmount,
        taxPB1,
        serviceFee,
        totalPayment,
        orders,
        activeOrder,
        setActiveOrder,
        createCheckoutOrder,
        confirmPaymentSuccess,
        advanceOrderStatus,
        setSpecificOrderStatus,
        submitOrderReview,
        getOrderById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
