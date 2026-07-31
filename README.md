# Flash Xtra — Web Tutorial & Kebijakan

Website statis GitHub Pages untuk tutorial QRIS, transaksi, deposit, dan kebijakan Flash Xtra.

## Struktur
- `index.html` — beranda + pencarian/filter panduan
- `panduan.html` — seluruh artikel panduan
- `kebijakan.html` — halaman kebijakan
- `style.css` — desain biru responsif
- `script.js` — pencarian/filter
- `assets/images/` — folder gambar tutorial

## Menambahkan gambar tutorial
1. Upload gambar ke `assets/images/`.
2. Buka `panduan.html`.
3. Cari artikel berdasarkan judul.
4. Ganti blok placeholder dengan contoh:
   `<img src="assets/images/cara-pendaftaran.jpg" alt="Cara Pendaftaran">`

## GitHub Pages
Upload semua file ke repository → Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

Catatan: isi biaya, waktu proses, dan kebijakan masih berupa placeholder agar dapat diisi sesuai ketentuan resmi Flash Xtra.
