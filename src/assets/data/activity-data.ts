// Foto kegiatan dari tb_photo_kegiatan
export interface KegiatanPhoto {
  id: string;          // UUID
  id_kegiatan: string; // UUID — relasi ke tb_kegiatan
  photo_url: string;
  created_at: string;  // ISO string (misal: "2025-03-10T08:00:00Z")
}

// Kegiatan utama dari tb_kegiatan
export interface Kegiatan {
  id: string;                    // UUID
  nama_kegiatan: string;
  deskripsi_singkat: string;
  lokasi_kegiatan: string;
  tanggal_kegiatan: string;      // Format ISO date: "2024-12-05" atau timestamp
  is_active: boolean;
  created_at: string;            // ISO timestamp
  created_by: string;            // UUID dari user
  updated_at: string;            // ISO timestamp

  // Relasi opsional — biasanya diisi saat fetch dari backend
  photos?: KegiatanPhoto[];      // Array foto dari tb_photo_kegiatan
}

export const activitesData: Kegiatan[] = [
  {
    id: "a3f4d8c1-5b9e-4b4f-912a-8f12e67c91ab",
    nama_kegiatan: "Pelatihan Digital Marketing",
    deskripsi_singkat: "Workshop intensif untuk meningkatkan kemampuan pemasaran digital.",
    lokasi_kegiatan: "Jakarta",
    tanggal_kegiatan: "2025-01-15",
    is_active: true,
    created_at: "2025-01-01T10:00:00Z",
    created_by: "user-1234-uuid",
    updated_at: "2025-01-10T12:00:00Z",
    photos: [
      {
        id: "photo-01-uuid",
        id_kegiatan: "a3f4d8c1-5b9e-4b4f-912a-8f12e67c91ab",
        photo_url: "https://picsum.photos/seed/kegiatan1a/800/600",
        created_at: "2025-01-01T10:30:00Z"
      },
      {
        id: "photo-02-uuid",
        id_kegiatan: "a3f4d8c1-5b9e-4b4f-912a-8f12e67c91ab",
        photo_url: "https://picsum.photos/seed/kegiatan1b/800/600",
        created_at: "2025-01-01T10:31:00Z"
      }
    ]
  },

  {
    id: "b81f1e9e-d2bd-44cf-9637-1ac22d35a9ea",
    nama_kegiatan: "Program Penghijauan Kota",
    deskripsi_singkat: "Aksi penanaman pohon di area publik sebagai upaya peduli lingkungan.",
    lokasi_kegiatan: "Bandung",
    tanggal_kegiatan: "2024-11-20",
    is_active: false,
    created_at: "2024-10-01T09:00:00Z",
    created_by: "user-5678-uuid",
    updated_at: "2024-11-25T14:00:00Z",
    photos: [
      {
        id: "photo-03-uuid",
        id_kegiatan: "b81f1e9e-d2bd-44cf-9637-1ac22d35a9ea",
        photo_url: "https://picsum.photos/seed/kegiatan2a/800/600",
        created_at: "2024-10-01T09:15:00Z"
      }
    ]
  },

  {
    id: "c45a62e1-2689-4b3b-a39a-3c77dc8cd677",
    nama_kegiatan: "Sosialisasi Literasi Keuangan",
    deskripsi_singkat: "Pengenalan dasar keuangan untuk remaja usia sekolah.",
    lokasi_kegiatan: "Surabaya",
    tanggal_kegiatan: "2025-03-02",
    is_active: true,
    created_at: "2025-02-10T11:00:00Z",
    created_by: "user-9999-uuid",
    updated_at: "2025-02-20T13:00:00Z",
    photos: []
  },

  // ⭐ NEW DATA 4
  {
    id: "d88ae99b-9e34-4bb9-8bcf-7188763fd201",
    nama_kegiatan: "Pelatihan Kewirausahaan UMKM",
    deskripsi_singkat: "Pembinaan UMKM untuk meningkatkan daya saing dan branding produk.",
    lokasi_kegiatan: "Depok",
    tanggal_kegiatan: "2025-04-12",
    is_active: true,
    created_at: "2025-03-20T09:00:00Z",
    created_by: "user-2233-uuid",
    updated_at: "2025-03-25T12:30:00Z",
    photos: [
      {
        id: "photo-04-uuid",
        id_kegiatan: "d88ae99b-9e34-4bb9-8bcf-7188763fd201",
        photo_url: "https://picsum.photos/seed/kegiatan4a/800/600",
        created_at: "2025-03-20T09:10:00Z"
      }
    ]
  },

  // ⭐ NEW DATA 5
  {
    id: "e912ab44-4231-4a20-a6ba-f4030ae7310a",
    nama_kegiatan: "Pelatihan Desain Grafis",
    deskripsi_singkat: "Dasar-dasar desain untuk anak muda menggunakan tools modern.",
    lokasi_kegiatan: "Yogyakarta",
    tanggal_kegiatan: "2024-12-10",
    is_active: false,
    created_at: "2024-11-05T10:30:00Z",
    created_by: "user-6754-uuid",
    updated_at: "2024-12-15T15:00:00Z",
    photos: [
      {
        id: "photo-05-uuid",
        id_kegiatan: "e912ab44-4231-4a20-a6ba-f4030ae7310a",
        photo_url: "https://picsum.photos/seed/kegiatan5a/800/600",
        created_at: "2024-11-05T10:40:00Z"
      },
      {
        id: "photo-06-uuid",
        id_kegiatan: "e912ab44-4231-4a20-a6ba-f4030ae7310a",
        photo_url: "https://picsum.photos/seed/kegiatan5b/800/600",
        created_at: "2024-11-05T10:45:00Z"
      }
    ]
  },

  // ⭐ NEW DATA 6
  {
    id: "f123bcde-7f91-4f90-8e87-213ff9087c22",
    nama_kegiatan: "Seminar Karir & Personal Branding",
    deskripsi_singkat: "Pembekalan siswa untuk mempersiapkan dunia kerja modern.",
    lokasi_kegiatan: "Bogor",
    tanggal_kegiatan: "2025-02-18",
    is_active: true,
    created_at: "2025-02-01T08:15:00Z",
    created_by: "user-4444-uuid",
    updated_at: "2025-02-10T09:00:00Z",
    photos: [
      {
        id: "photo-07-uuid",
        id_kegiatan: "f123bcde-7f91-4f90-8e87-213ff9087c22",
        photo_url: "https://picsum.photos/seed/kegiatan6a/800/600",
        created_at: "2025-02-01T08:20:00Z"
      }
    ]
  },

  // ⭐ NEW DATA 7
  {
    id: "g678afee-9216-4a5b-b321-d08a3c2fbee1",
    nama_kegiatan: "Pelatihan Public Speaking",
    deskripsi_singkat: "Meningkatkan kemampuan komunikasi dan kepercayaan diri.",
    lokasi_kegiatan: "Semarang",
    tanggal_kegiatan: "2024-09-14",
    is_active: false,
    created_at: "2024-08-01T09:00:00Z",
    created_by: "user-8888-uuid",
    updated_at: "2024-09-20T11:40:00Z",
    photos: [
      {
        id: "photo-08-uuid",
        id_kegiatan: "g678afee-9216-4a5b-b321-d08a3c2fbee1",
        photo_url: "https://picsum.photos/seed/kegiatan7a/800/600",
        created_at: "2024-08-01T09:15:00Z"
      }
    ]
  },

  // ⭐ NEW DATA 8
  {
    id: "h891cc20-31fa-4d37-a9f6-e00c6170e77f",
    nama_kegiatan: "Workshop Fotografi",
    deskripsi_singkat: "Belajar komposisi dan teknik kamera dasar.",
    lokasi_kegiatan: "Makassar",
    tanggal_kegiatan: "2025-05-01",
    is_active: true,
    created_at: "2025-04-15T12:00:00Z",
    created_by: "user-1010-uuid",
    updated_at: "2025-04-20T13:00:00Z",
    photos: [
      {
        id: "photo-09-uuid",
        id_kegiatan: "h891cc20-31fa-4d37-a9f6-e00c6170e77f",
        photo_url: "https://picsum.photos/seed/kegiatan8a/800/600",
        created_at: "2025-04-15T12:10:00Z"
      }
    ]
  }
];

