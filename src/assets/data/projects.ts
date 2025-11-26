// src/data/project-data.ts

export interface Project {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  // Detail lengkap untuk halaman detail
  description: string;
  location: string;
  year: string;
  client: string;
  category: string;
  duration: string;
  value: string;
  images: string[]; // Multiple images untuk carousel detail
  features: string[];
  status: "completed" | "ongoing" | "planned";
}

export const projectsData: Project[] = [
  {
    id: 1,
    image: "https://picsum.photos/seed/project1/400/300",
    title: "Pembangunan Jembatan Layang",
    subtitle: "Jembatan Penghubung Kota Bandung - Cimahi",
    description:
      "Proyek pembangunan jembatan layang sepanjang 2.5 km yang menghubungkan Kota Bandung dengan Cimahi. Jembatan ini dirancang dengan teknologi modern untuk mengatasi kemacetan dan meningkatkan mobilitas masyarakat.",
    location: "Bandung - Cimahi, Jawa Barat",
    year: "2023 - 2024",
    client: "Dinas Pekerjaan Umum Jawa Barat",
    category: "Infrastruktur Jalan",
    duration: "18 Bulan",
    value: "Rp 125 Miliar",
    images: [
      "https://picsum.photos/seed/project1-1/800/600",
      "https://picsum.photos/seed/project1-2/800/600",
      "https://picsum.photos/seed/project1-3/800/600",
      "https://picsum.photos/seed/project1-4/800/600",
    ],
    features: [
      "Kapasitas 4 lajur dengan lebar total 15 meter",
      "Sistem drainase terintegrasi",
      "Penerangan LED hemat energi",
      "Struktur tahan gempa",
      "CCTV monitoring 24/7",
    ],
    status: "completed",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/project2/400/300",
    title: "Pembangunan Gedung Perkantoran",
    subtitle: "Gedung Kantor Dinas Lingkungan Hidup Kota Bandung",
    description:
      "Pembangunan gedung perkantoran modern berlantai 8 dengan konsep green building. Dilengkapi dengan fasilitas ramah lingkungan dan teknologi smart building untuk efisiensi energi.",
    location: "Jl. Soekarno Hatta, Bandung",
    year: "2022 - 2024",
    client: "Pemerintah Kota Bandung",
    category: "Bangunan Gedung",  
    duration: "24 Bulan",
    value: "Rp 85 Miliar",
    images: [
      "https://picsum.photos/seed/project2-1/800/600",
      "https://picsum.photos/seed/project2-2/800/600",
      "https://picsum.photos/seed/project2-3/800/600",
      "https://picsum.photos/seed/project2-4/800/600",
    ],
    features: [
      "8 lantai dengan total luas 5000 m²",
      "Sertifikasi Green Building",
      "Solar panel untuk energi alternatif",
      "Sistem pengolahan air daur ulang",
      "Ruang meeting dan auditorium modern",
      "Parkir basement 200 kendaraan",
    ],
    status: "ongoing",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/project3/400/300",
    title: "Renovasi Jalan Raya",
    subtitle: "Jalan Raya Cipularang KM 10 - KM 25",
    description:
      "Proyek renovasi dan pelebaran jalan raya Cipularang untuk meningkatkan kelancaran arus lalu lintas. Termasuk perbaikan drainase dan pemasangan median jalan.",
    location: "Cipularang, Jawa Barat",
    year: "2023",
    client: "Kementerian PUPR",
    category: "Infrastruktur Jalan",
    duration: "12 Bulan",
    value: "Rp 45 Miliar",
    images: [
      "https://picsum.photos/seed/project3-1/800/600",
      "https://picsum.photos/seed/project3-2/800/600",
      "https://picsum.photos/seed/project3-3/800/600",
    ],
    features: [
      "Pelebaran jalan dari 2 lajur menjadi 4 lajur",
      "Perbaikan sistem drainase sepanjang 15 km",
      "Pemasangan marka jalan thermoplastic",
      "Penerangan jalan LED",
      "Guard rail pengaman",
    ],
    status: "completed",
  },
  {
    id: 4,
    image: "https://picsum.photos/seed/project4/400/300",
    title: "Pembangunan Rumah Sakit",
    subtitle: "Rumah Sakit Umum Daerah Type B",
    description:
      "Konstruksi rumah sakit modern type B dengan kapasitas 300 tempat tidur. Dilengkapi dengan fasilitas medis terkini dan standar internasional.",
    location: "Kabupaten Bandung Barat",
    year: "2024 - 2026",
    client: "Pemerintah Kabupaten Bandung Barat",
    category: "Bangunan Kesehatan",
    duration: "30 Bulan",
    value: "Rp 250 Miliar",
    images: [
      "https://picsum.photos/seed/project4-1/800/600",
      "https://picsum.photos/seed/project4-2/800/600",
      "https://picsum.photos/seed/project4-3/800/600",
      "https://picsum.photos/seed/project4-4/800/600",
    ],
    features: [
      "300 tempat tidur dengan berbagai kelas",
      "IGD 24 jam dengan helipad",
      "10 ruang operasi dengan standar ISO",
      "Medical center dan laboratorium lengkap",
      "Sistem HVAC khusus rumah sakit",
      "Genset backup dan UPS",
    ],
    status: "ongoing",
  },
  {
    id: 5,
    image: "https://picsum.photos/seed/project5/400/300",
    title: "Pembangunan Waduk",
    subtitle: "Waduk Jatigede Extension",
    description:
      "Proyek perluasan dan penguatan struktur waduk untuk meningkatkan kapasitas tampung air dan irigasi pertanian di wilayah sekitar.",
    location: "Sumedang, Jawa Barat",
    year: "2023 - 2025",
    client: "Kementerian PUPR",
    category: "Infrastruktur Air",
    duration: "24 Bulan",
    value: "Rp 180 Miliar",
    images: [
      "https://picsum.photos/seed/project5-1/800/600",
      "https://picsum.photos/seed/project5-2/800/600",
      "https://picsum.photos/seed/project5-3/800/600",
    ],
    features: [
      "Peningkatan kapasitas tampung 50%",
      "Sistem irigasi modern untuk 10.000 Ha",
      "Pembangunan spillway tambahan",
      "Monitoring sistem water level otomatis",
      "Struktur bendung tahan gempa",
    ],
    status: "ongoing",
  },
  {
    id: 6,
    image: "https://picsum.photos/seed/project6/400/300",
    title: "Pembangunan Apartemen",
    subtitle: "Apartemen The Royal Residence Tower A & B",
    description:
      "Proyek pembangunan apartemen premium dengan 2 tower masing-masing 25 lantai. Konsep modern living dengan fasilitas lengkap dan lokasi strategis.",
    location: "Jl. Pasteur, Bandung",
    year: "2022 - 2024",
    client: "PT Royal Property Indonesia",
    category: "Bangunan Hunian",
    duration: "28 Bulan",
    value: "Rp 320 Miliar",
    images: [
      "https://picsum.photos/seed/project6-1/800/600",
      "https://picsum.photos/seed/project6-2/800/600",
      "https://picsum.photos/seed/project6-3/800/600",
      "https://picsum.photos/seed/project6-4/800/600",
    ],
    features: [
      "500 unit apartemen type studio hingga 3 bedroom",
      "Swimming pool, gym, dan sky garden",
      "Retail area dan food court",
      "Smart home system",
      "Keamanan 24/7 dengan access card",
      "Parking area 3 basement",
    ],
    status: "completed",
  },
];