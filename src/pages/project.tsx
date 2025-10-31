import { useEffect, useState } from "react"; // Import useState dan useEffect
import Navbar from "@/components/navbar-profile";
import MainProject from "@/pages/ProjectSection/main-project";
import CardProject from "./ProjectSection/card-project";

// Definisikan aturan animasi CSS di dalam komponen (atau gunakan file CSS eksternal)
const animationStyles = `
  @keyframes slideUp {
    from {
      transform: translateY(100vh); /* Mulai dari bawah layar */
      opacity: 0; /* Mulai transparan */
    }
    to {
      transform: translateY(0); /* Ke posisi normal */
      opacity: 1; /* Akhirnya terlihat */
    }
  }

  .animate-slide-up {
    animation: slideUp 1000ms cubic-bezier(0.53, 0.02, 0.03, 0.99) forwards; /* Gunakan durasi 1000ms dan timing function baru */
  }

  .opacity-0 {
    opacity: 0;
  }

  .opacity-100 {
    opacity: 1;
  }

  /* Anda mungkin tidak lagi memerlukan transition-opacity karena animasi sekarang diatur oleh @keyframes */
  /* .transition-opacity {
    transition: opacity 0.3s ease-out;
  } */
`;

export default function Project() {
  const [isLoaded, setIsLoaded] = useState(false); // Tambahkan state isLoaded

  useEffect(() => {
    // Aktifkan scroll snap secara global
    document.documentElement.style.scrollSnapType = "y mandatory";

    // Set state menjadi true setelah komponen selesai dimuat
    setIsLoaded(true);

    // Opsional: Fungsi cleanup jika perlu menghapus style saat unmount
    // return () => {
    //   document.documentElement.style.removeProperty('scroll-snap-type');
    // };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Sisipkan aturan CSS animasi */}
      <style>{animationStyles}</style>

      <Navbar />
      {/* Terapkan kelas animasi berdasarkan state isLoaded */}
      <div
        className={`
          px-56 py-25
          ${isLoaded ? 'animate-slide-up' : 'opacity-0'} // Terapkan animasi atau hanya sembunyikan
          // transition-opacity duration-300 // Komentari atau hapus jika tidak digunakan
        `}
      >
        <MainProject />
        <CardProject />
      </div>
    </div>
  );
}