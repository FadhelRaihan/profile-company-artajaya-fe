export interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // URL gambar placeholder
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pembuatan Halte Bis",
    description: "Lorem ipsum eu ultricies scelerisque feugiat semper cursus massa elit quis pulvinar ut libero urna lorem convallis amet in convallis.",
    image: "https://picsum.photos/seed/halte/400/300"
  },
  {
    id: 2,
    title: "Renovasi Taman Kota",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://picsum.photos/seed/taman/400/300"
  },
  {
    id: 3,
    title: "Pembangunan Jembatan",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://picsum.photos/seed/jembatan/400/300"
  },
  {
    id: 4,
    title: "Pengaspalan Jalan Lingkungan",
    description: "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "https://picsum.photos/seed/jalan/400/300"
  },
  {
    id: 5,
    title: "Instalasi Penerangan Jalan Umum",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "https://picsum.photos/seed/lampu/400/300"
  }
];