// Definisi Skema Data (Acuan: app_context.md Bagian 4)

export type CategoryType = 'Kopi' | 'Non-Kopi' | 'Makanan';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  isPopular?: boolean;
  availableTemperatures?: ('Dingin' | 'Panas')[];
  allowLatteArtRequest?: boolean;
  isAvailable: boolean;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedTemperature?: 'Dingin' | 'Panas';
  specialNote?: string;
  latteArtNote?: string;
  quantity: number;
  itemSubtotal: number;
}

export type OrderStatus = 'Menunggu' | 'Diproses' | 'Siap' | 'Selesai';
export type DiningOption = 'Dine-In' | 'Takeaway';

export interface OrderReview {
  rating: number;
  tags: string[];
  comment: string;
  createdAt: string;
  earnedPoints?: number;
}

export interface Order {
  orderId: string; // Format: TRX-VC-YYYYMMDD-XXX
  createdAt: string;
  userId: string;
  diningOption: DiningOption;
  tableNumber?: string; // Diisi jika Dine-In
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  taxPB1: number; // 10% dari (subtotal - diskon)
  serviceFee: number; // Rp 1.000
  totalPayment: number;
  paymentMethod: 'QRIS';
  paymentStatus: 'Pending' | 'Paid';
  orderStatus: OrderStatus;
  estimatedReadyTime: string; // Misal: "15-20 Menit"
  barcodeValue: string; // Digunakan untuk merender barcode 1D/QR
  review?: OrderReview;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  discountCode?: string;
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  avatarUrl: string;
  tableNumber: string;
  diningOption: DiningOption;
}

