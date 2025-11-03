export interface Project {
  id: number;
  title: string;
  description: string;
  image: string; // URL gambar placeholder
  tipe : string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pembuatan Halte Bis",
    tipe: "Pembangunan",
    description: "Lorem ipsum eu ultricies scelerisque feugiat semper cursus massa elit quis pulvinar ut libero urna lorem convallis amet in convallis. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://picsum.photos/seed/halte/400/300"
  },
  {
    id: 2,
    title: "Renovasi Taman Kota",
    tipe: "Pemeliharaan",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "https://picsum.photos/seed/taman/400/300"
  },
  {
    id: 3,
    title: "Pembangunan Jembatan",
    tipe: "Pembelanjaan",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://picsum.photos/seed/jembatan/400/300"
  },
  {
    id: 4,
    title: "Pengaspalan Jalan Lingkungan",
    tipe: "Pembelanjaan",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl felis, tincidunt eu tellus vel, finibus placerat orci. Donec sit amet pellentesque est, sit amet sodales nulla. In scelerisque, risus a sodales convallis, nisl justo ultrices nisl, eget tempor odio massa quis nulla. Aliquam dictum gravida molestie. Aenean eu suscipit leo, vel gravida odio. Morbi est urna, consequat in velit eget, pulvinar accumsan mi. Suspendisse id lorem ac ipsum tristique condimentum quis posuere augue. Duis sit amet pulvinar augue. Praesent condimentum dui diam, eget mollis velit porttitor quis. Vestibulum hendrerit laoreet mi scelerisque tincidunt. Duis fermentum, leo eu rhoncus molestie, lorem velit sodales nisi, vitae varius erat tellus ac odio. Quisque enim sapien, commodo a elementum sit amet, pellentesque at nulla. Praesent eu erat aliquam, interdum ante eget, ultricies erat. Duis malesuada turpis eu lacus pellentesque molestie. Pellentesque non ornare odio. Mauris mauris sapien, pharetra non tincidunt id, ultrices a sem.",
    image: "https://picsum.photos/seed/jalan/400/300"
  },
  {
    id: 5,
    title: "Instalasi Penerangan Jalan Umum",
    tipe: "Pembangunan",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "https://picsum.photos/seed/lampu/400/300"
  },
  {
    id: 6,
    title: "Instalasi Penerangan Jalan Umum",
    tipe: "Pemeliharaan",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    image: "https://picsum.photos/seed/lampu/400/300"
  }
];