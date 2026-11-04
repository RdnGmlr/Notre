# Notre Socielle - Customer Self-Service Ordering App

Aplikasi Web Mobile & PWA pemesanan mandiri (Self-Service Order) eksklusif untuk **Café Notre Socielle**.

---

## ☕ Fitur Utama
- **Desain Khusus Mobile & PWA**: Dioptimalkan untuk tampilan smartphone (390px - 430px) dengan transisi mulus dan responsif.
- **Identitas Visual Autentik**: Mengadopsi palet warna hangat Notre Socielle (Espresso `#4A2E1B`, Terracotta `#8C4722`, Warm Linen `#FCFBF9`) dan logo split-arch khas Notre Socielle.
- **Alur Pemesanan Lengkap**:
  - **Splash Screen & Autentikasi**: Logo animasi dan halaman "Mulailah sekarang" (Masuk / Daftar).
  - **Beranda & Katalog Menu**: Promo carousel, rekomendasi terpopuler, filter kategori, pencarian cerdas, dan modal kustomisasi minuman (opsi suhu & *latte art note*).
  - **Pilihan Santap & Nomor Meja**: Pilihan *Dine-In* atau *Takeaway* dengan pemilihan meja interaktif.
  - **Keranjang & Checkout**: Sistem voucher diskon, rincian biaya transparan (PB1 10% & biaya layanan).
  - **Pembayaran QRIS Simultan**: Simulasi scan QRIS interaktif dengan status pembayaran real-time.
  - **Tiket Barcode Pengambilan**: Barcode resi otomatis dengan pelacakan status pesanan (*Menunggu*, *Diproses*, *Siap Diambil*, *Selesai*).
  - **Rating & Ulasan Barista**: Modal ulasan bintang 5 dengan feedback cepat dan bonus poin loyalitas.
  - **Profil Anggota**: Kartu identitas, Bukti Pengambilan, Riwayat Pesanan, Kartu Member Virtual, dan Pengaturan Keamanan Akun.

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PWA & Mobile Native**: Service Worker PWA + [Capacitor](https://capacitorjs.com/) (Android)

---

## 🚀 Menjalankan Proyek Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Sinkronisasi aset ke Android (Capacitor)
npm run cap:sync
```
