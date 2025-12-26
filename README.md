# Profile Company Artajaya - Frontend

Website profile perusahaan Artajaya yang dibangun dengan teknologi modern untuk performa optimal dan pengalaman pengguna yang responsif.

## 🚀 Tech Stack

- **React** - Library JavaScript untuk membangun user interface
- **TypeScript** - Superset JavaScript dengan static typing
- **Vite** - Build tool dan development server yang cepat
- **[Tambahkan library lain yang Anda gunakan, misalnya: React Router, Axios, Tailwind CSS, dll]**

## 📋 Prerequisites

Sebelum menjalankan proyek ini, pastikan Anda telah menginstall:

- Node.js (versi 16.x atau lebih tinggi)
- npm (versi 8.x atau lebih tinggi) atau yarn

Untuk mengecek versi yang terinstall:
-   node --version
-   npm --version

## 🛠️ Installation & Setup

1. **Clone repository**
- git clone https://github.com/FadhelRaihan/profile-company-artajaya-fe.git
- cd profile-company-artajaya-fe

2. **Install dependencies**
- npm install
-atau jika menggunakan yarn: yarn install

3. **Setup environment variables**
Copy file `.env.example` menjadi `.env`:


## 🚀 Running the Application

### Development Mode

Jalankan aplikasi dalam mode development dengan hot-reload: npm run dev

Aplikasi akan berjalan di `http://localhost:5174` (port default Vite)

### Build untuk Production

Untuk membuat build production-ready: npm run build

File hasil build akan tersimpan di folder `dist/`

### Preview Production Build

Untuk preview hasil build production secara lokal: npm run preview

## 📁 Project Structure

profile-company-artajaya-fe/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, fonts, dll
│ ├── components/ # Reusable components
│ ├── pages/ # Page components
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── vite-env.d.ts # Vite type declarations
├── .gitignore
├── index.html # HTML entry point
├── package.json
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
└── README.md


## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Menjalankan development server |
| `npm run build` | Build aplikasi untuk production |
| `npm run preview` | Preview production build |
| `npm run lint` | Menjalankan linter (jika dikonfigurasi) |

## 🌐 Environment Variables

Proyek ini menggunakan environment variables dengan prefix `VITE_`:

- `VITE_API_BASE_URL` - Base URL untuk API backend
- `VITE_APP_TITLE` - Judul aplikasi

**Note:** File `.env` tidak di-commit ke repository. Pastikan membuat file ini secara lokal.

## 🤝 Contributing

Jika ingin berkontribusi pada proyek ini:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 Notes

- Pastikan semua dependencies terinstall dengan benar sebelum menjalankan aplikasi
- Jika mengalami error saat `npm install`, coba hapus folder `node_modules` dan file `package-lock.json`, lalu install ulang
- Untuk troubleshooting port yang sudah digunakan, Vite akan otomatis menggunakan port alternatif

## 👤 Author

**Fadhel Raihan**

- GitHub: [@FadhelRaihan](https://github.com/FadhelRaihan)

## 📄 License

[Tambahkan informasi lisensi jika ada]







