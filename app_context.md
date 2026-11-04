# CONTEXT DOKUMEN: ORDER SOCIELLE (CAFÉ NOTRE SOCIELLE)
> Panduan Konteks & Spesifikasi Teknis untuk AI Coding Agent (Google Antigravity / Cursor / Windsurf)

---

## 1. Ringkasan Produk & Visi Aplikasi
* **Nama Aplikasi**: Order Socielle
* **Klien / Brand**: Café Notre Socielle
* **Tujuan Utama**: Aplikasi pemesanan mandiri (*customer self-service*) untuk mengatasi antrean kasir, memfasilitasi pemesanan langsung dari meja melalui pemindaian QR Code (*Dine-In*) maupun *Takeaway*, menyediakan transparansi menu & estimasi waktu penyajian, serta pembayaran non-tunai instan melalui QRIS.
* **Tautan Prototipe Figma**: [Figma Mockup Socielle Order (Node 0-1)](https://www.figma.com/design/3U94hCWU4zb62bV52A8KSB/Mockup-Socielle-Order?node-id=0-1&p=f&t=frgNfvfuVig0Olgy-0)
* **Target Antarmuka**: Mobile-First Web App (PWA) atau Mobile Native (viewport optimal: 390px – 430px lebar layar smartphone).

---

## 2. Design System & Token UI (Khas Café Notre Socielle)
Aplikasi mengusung estetika kafe modern bernuansa *warm coffee & latte*:

* **Color Palette**:
  * **Primary (Espresso Roast)**: `#4A2E1B` (Tombol utama, header teks, ikon aktif)
  * **Accent / Secondary (Caramel Latte)**: `#965B2D` (Badge promo, tab aktif, aksen harga)
  * **Background (Warm Linen)**: `#FCFBF9` (Latar belakang utama aplikasi)
  * **Surface / Cards**: `#FFFFFF` (Kartu menu, kontainer form, modal pop-up)
  * **Text Primary**: `#2D241E` (Judul & isi teks utama)
  * **Text Muted**: `#7A6E65` (Deskripsi menu sekunder, tanggal, label pembantu)
  * **Border & Dividers**: `rgba(74, 46, 27, 0.12)`
  * **Status Success**: `#2E7D32` (Centang sukses pembayaran & pesanan siap)
  * **Status Warning**: `#ED6C02` (Status pesanan sedang diproses)
* **Typography**:
  * Family: `Inter`, `Plus Jakarta Sans`, atau `-apple-system, BlinkMacSystemFont, sans-serif`.
  * Heading 1 (22px - 26px, Bold), Heading 2 (18px - 20px, Bold), Body (14px, Regular), Caption/Small (11px - 12px).
* **Corner Radius & Shadows**:
  * Cards: `rounded-2xl` (16px)
  * Buttons: `rounded-xl` (12px) atau `rounded-full`
  * Shadows: `shadow-sm` lembut bernuansa hangat (`rgba(74, 46, 27, 0.06)`).

---

## 3. Peta Navigasi & Alur Layar (Screen-by-Screen Routing)

```
[Splash Screen] ──> [Onboarding (3 Slides)] ──> [Auth: Login / Register / OTP]
                                                        │
┌───────────────────────────────────────────────────────┴───────────────────────────────────────────────────────┐
│                                                 MAIN APP                                                      │
├───────────────────────────────┬───────────────────────────────┬───────────────────────────────────────────────┤
│         TAB 1: HOME           │       TAB 2: KERANJANG        │                TAB 3: PROFIL                  │
├───────────────────────────────┼───────────────────────────────┼───────────────────────────────────────────────┤
│ • Greeting & User Avatar      │ • Daftar Item & Stepper Qty   │ • Info Profil Pengguna                        │
│ • Search Bar & Notifikasi     │ • Nomor Meja & Opsi Dine-In   │ • Tab Cepat: Tiket Aktif & Riwayat            │
│ • Banner Promo Carousel       │ • Catatan Khusus Barista      │ • Edit Profil & Keamanan Akun                 │
│ • Kategori (Kopi, Non-Kopi,   │ • Input Voucher Diskon        │ • Riwayat Transaksi & Ulasan                  │
│   Makanan)                    │ • Rincian PB1 10% & Layanan   │ • Logout & Hapus Akun                         │
│ • Grid Produk Terlaris        │ • CTA: "Bayar Sekarang"       │                                               │
│       │                       │       │                       │                                               │
│       ▼                       │       ▼                       │                                               │
│ [Detail Menu Modal]           │ [Layar Pembayaran QRIS]       │                                               │
│ • Foto & Deskripsi Rasa       │ • QR Code Nasional            │                                               │
│ • Switcher Suhu Dingin/Panas  │ • Timer 15 Menit & Total Tagihan                                              │
│ • Kustomisasi Latte Art       │       │                                                                       │
│ • Tombol "Beli Sekarang"      │       ▼                                                                       │
│                               │ [Konfirmasi Pembayaran Sukses]                                                │
│                               │       │                                                                       │
│                               │       ▼                                                                       │
│                               │ [Bukti Pengambilan / Tiket Barcode (TRX-VC-...)]                              │
│                               │ • Barcode Pengambilan & Estimasi Waktu                                        │
│                               │ • Pelacak Status: Menunggu ──> Diproses ──> Siap ──> Selesai                  │
└───────────────────────────────┴───────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Definisi Skema Data (TypeScript Interfaces)

Gunakan tipe data berikut untuk state management dan mock API:

```typescript
// 1. Data Produk Menu
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

// 2. Item di Dalam Keranjang Belanja
export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  selectedTemperature?: 'Dingin' | 'Panas';
  specialNote?: string;
  latteArtNote?: string;
  quantity: number;
  itemSubtotal: number;
}

// 3. Status Pesanan
export type OrderStatus = 'Menunggu' | 'Diproses' | 'Siap' | 'Selesai';
export type DiningOption = 'Dine-In' | 'Takeaway';

// 4. Struktur Pesanan Lengkap
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
}
```

---

## 5. Logika Bisnis & Perhitungan Finansial

Seluruh transaksi wajib mematuhi aturan kalkulasi berikut:

1. **Subtotal Item**:
   $$\text{Subtotal} = \sum (\text{Harga Produk} \times \text{Kuantitas})$$
2. **Diskon Voucher**:
   $$\text{Diskon} = \text{Nilai Promo Kupon (jika valid)}$$
3. **Pajak Restoran (PB1 10%)**:
   Wajib dikenakan sebesar 10% dari nilai belanja setelah diskon:
   $$\text{Pajak PB1} = 0.10 \times (\text{Subtotal} - \text{Diskon})$$
4. **Biaya Layanan Aplikasi**:
   Biaya tetap (*flat service fee*):
   $$\text{Biaya Layanan} = \text{Rp } 1.000$$
5. **Total Pembayaran**:
   $$\text{Total Bayar} = (\text{Subtotal} - \text{Diskon}) + \text{Pajak PB1} + \text{Biaya Layanan}$$
6. **Format Nomor Transaksi & Barcode**:
   Format identitas tiket pengambilan adalah: `TRX-VC-{YYYYMMDD}-{INDEX}`, contoh: `TRX-VC-20261104-001`.

---

## 6. Contoh Mock Data Awal (Katalog Menu Café Notre Socielle)

```json
[
  {
    "id": "prod-1",
    "name": "Cappuccino",
    "category": "Kopi",
    "price": 18000,
    "rating": 4.8,
    "reviewCount": 128,
    "imageUrl": "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80",
    "description": "Espresso kuat berpadu susu steam creamy dan busa tebal khas Notre Socielle.",
    "isPopular": true,
    "availableTemperatures": ["Panas", "Dingin"],
    "allowLatteArtRequest": true,
    "isAvailable": true
  },
  {
    "id": "prod-2",
    "name": "Milkshake Strawberry",
    "category": "Non-Kopi",
    "price": 20000,
    "rating": 4.8,
    "reviewCount": 94,
    "imageUrl": "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
    "description": "Perpaduan stroberi segar manis dengan es krim vanilla lembut dan susu dingin.",
    "isPopular": true,
    "availableTemperatures": ["Dingin"],
    "allowLatteArtRequest": false,
    "isAvailable": true
  },
  {
    "id": "prod-3",
    "name": "Nasi Goreng Ayam Spesial",
    "category": "Makanan",
    "price": 25000,
    "rating": 4.7,
    "reviewCount": 85,
    "imageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&auto=format&fit=crop&q=80",
    "description": "Nasi goreng bumbu rempah tradisional dengan suwiran ayam gurih dan telur mata sapi.",
    "isPopular": false,
    "isAvailable": true
  },
  {
    "id": "prod-4",
    "name": "Butter Croissant",
    "category": "Makanan",
    "price": 26000,
    "rating": 4.9,
    "reviewCount": 112,
    "imageUrl": "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80",
    "description": "Pastry renyah berlapis dengan aroma butter Prancis yang harum dan gurih.",
    "isPopular": true,
    "isAvailable": true
  }
]
```

---

## 7. Instruksi Kerja untuk AI Coding Agent (Execution Plan)

Jika Anda adalah agen pengembang (Antigravity):
1. **Langkah 1**: Baca dokumen ini secara menyeluruh untuk memahami domain kafe dan palet warna.
2. **Langkah 2**: Buat kerangka proyek (Next.js / Vite React / React Native Expo) dengan Tailwind CSS. Pastikan ukuran kontainer dibatasi pada rasio layar ponsel (*mobile viewport max 430px*) saat dijalankan di browser desktop.
3. **Langkah 3**: Buat komponen `BottomNavbar` (Home, Keranjang, Profil) yang persisten di bagian bawah layar.
4. **Langkah 4**: Bangun halaman Beranda dengan Banner Carousel, filter Kategori, dan Kartu Menu Terlaris.
5. **Langkah 5**: Bangun Modal / Layar Detail Produk dengan pengatur varian (Dingin/Panas) dan penambah kuantitas.
6. **Langkah 6**: Bangun Alur Checkout yang menghitung pajak PB1 10% dan biaya layanan Rp 1.000 secara otomatis.
7. **Langkah 7**: Implementasikan layar QRIS Dinamis dan halaman Tiket Pengambilan (*E-Receipt*) ber-barcode.
