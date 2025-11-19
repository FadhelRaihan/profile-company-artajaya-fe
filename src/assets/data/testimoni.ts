
export interface Testimoni {
    id: string,
    namaTester: string,
    testimoni: string,
    isActive: boolean,
    createdBy: string,
    createdAt: string | Date,
    updatedAt: string | Date

    //Detail 
    jabatan: string,
    userInitial: string,
}

export const testimoniData: Testimoni[] = [
  {
    id: "t-001",
    testimoni: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    namaTester: "Achmad Soewardi",
    jabatan: "Ketua yayasan",
    userInitial: "AS",
    isActive: true,
    createdBy: "user-001",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "t-002",
    testimoni: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    namaTester: "Siti Rahayu",
    jabatan: "Ketua hima",
    userInitial: "SR",
    isActive: true,
    createdBy: "user-001",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "t-003",
    testimoni: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    namaTester: "Ahmad Wijaya",
    jabatan: "Direktur",
    userInitial: "AW",
    isActive: true,
    createdBy: "user-001",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "t-004",
    testimoni: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    namaTester: "Linda Permata",
    jabatan: "Manager",
    userInitial: "LP",
    isActive: true,
    createdBy: "user-001",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  },
  {
    id: "t-005",
    testimoni: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    namaTester: "Rudi Hartono",
    jabatan: "Owner",
    userInitial: "RH",
    isActive: true,
    createdBy: "user-001",
    createdAt: "2025-01-01T10:00:00Z",
    updatedAt: "2025-01-01T10:00:00Z"
  }
];

