# 🏢 Project Company Profile - Frontend ([Nama Perusahaan])

[![Lisensi MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status Build](https://img.shields.io/badge/Build-Success-brightgreen)](#[TAUTAN_CI/CD_ANDA])

Proyek ini adalah implementasi *frontend* untuk situs **Company Profile** yang modern dan berkinerja tinggi. Aplikasi ini dibangun sebagai **Single Page Application (SPA)** menggunakan React dengan fokus pada *maintainability* dan *user experience*.

***



## ✨ Fitur Utama

Aplikasi *Company Profile* ini hadir dengan fitur-fitur kunci:

* **Desain Modular & Responsif:** Menggunakan komponen UI yang modular (Shadcn UI) dan *styling* Tailwind CSS, memastikan tampilan yang konsisten dan responsif di semua perangkat.
* **Struktur Halaman Utama yang Segmented:** Halaman *landing* dibagi menjadi beberapa bagian utama:
    * *Hero Section* (Penyambutan dan CTA)
    * Deskripsi Perusahaan
    * Visi dan Misi (VM)
    * Daftar Proyek atau Portofolio (Berdasarkan data lokal)
* **Navigasi Profil:** Komponen navigasi yang interaktif untuk memandu pengguna.
* **Performa Tinggi:** Dioptimalkan dengan **Vite** untuk *development server* yang cepat dan *production bundle* yang ringkas.
* **Aman Tipe Data:** Menggunakan **TypeScript** untuk meminimalkan *bug* terkait tipe data dan meningkatkan kualitas kode.

***

## 🛠 Teknologi yang Digunakan

| Kategori | Teknologi | Versi Kunci | Keterangan |
| :--- | :--- | :--- | :--- |
| **Framework** | React | ^18.2.0 | Pustaka JavaScript utama untuk membangun UI. |
| **Build Tool** | Vite | ^5.x.x | *Next-generation frontend tooling* untuk performa cepat. |
| **Bahasa** | TypeScript | ^5.2.2 | Superset JavaScript yang menambahkan tipe statis. |
| **Styling** | Tailwind CSS | ^3.x.x | Kerangka kerja CSS *utility-first* yang cepat dan fleksibel. |
| **Komponen UI** | Shadcn UI (Radix UI) | - | Koleksi komponen yang *accessible* dan kustomisasi tinggi. |
| **Linting** | ESLint | - | Digunakan untuk menjaga kualitas dan gaya kode. |

***

## ⚙️ Prasyarat Instalasi

Anda harus menginstal perangkat lunak berikut sebelum menjalankan proyek:

1.  **Node.js**: Wajib memiliki versi LTS (disarankan v18.x atau yang lebih baru).
2.  **npm (Node Package Manager)**: Biasanya terinstal bersama Node.js. Anda juga dapat menggunakan Yarn atau pnpm.
3.  **Git**: Untuk kloning repository.

## 🚀 Instalasi dan Contoh Penggunaan

Ikuti langkah-langkah di bawah ini untuk mengatur dan menjalankan proyek secara lokal:

### 1. Kloning Repository

Buka terminal Anda dan klon proyek:

```bash
git clone [https://github.com/](https://github.com/)[username-anda]/profile-company-artajaya-fe.git
cd profile-company-artajaya-fe

# Tahapan Instalansi
npm install # Install utama jika masih error install yang bawah
# atau yarn install
# atau pnpm install

# Install kalau error
npm install motion
npm install @radix-ui/themes
npm install tailwindcss @tailwindcss/vite

npm run dev

MIT License

Copyright (c) [Tahun Saat Ini] [Nama Anda atau Pemilik Proyek]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.