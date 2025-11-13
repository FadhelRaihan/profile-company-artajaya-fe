"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";

// Data proyek dengan gambar
const projects = [
  {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    title: "Prama Toserba",
    location: "Jl. Siliwangi Kecamatan Bala Endah Kabupaten Bandung",
    category: "Retail & Commercial",
  },
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    title: "Office Tower Jakarta",
    location: "Jl. Sudirman Jakarta Pusat",
    category: "Commercial Building",
  },
  {
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    title: "Residential Complex",
    location: "Jl. Gatot Subroto Bandung",
    category: "Residential",
  },
  {
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
    title: "Shopping Mall",
    location: "Jl. Asia Afrika Bandung",
    category: "Retail & Entertainment",
  },
  {
    image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80",
    title: "Hotel & Resort",
    location: "Jl. Raya Lembang Bandung Barat",
    category: "Hospitality",
  },
];

const ProjectKami: React.FC = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Container untuk text - dengan padding */}
      <div className="flex flex-col items-center justify-center px-4 pt-32 md:pt-48">
        <div className="max-w-7xl w-full  mb-16 md:mb-24 lg:mb-2 pt-8">
          {/* Judul kecil */}
          <SplitText
            text="/ Proyek Kami"
            className="text-2xl font-medium text-center text-blue-900"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50,}}
            whileInView={{ opacity: 1, y: 0,}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="leading-tight">
              <span className="block text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-blue-900">
                Dibalik <span className="text-red-600">Proyek</span>
              </span>
              <span className="block text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-blue-900">
                Kami
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cards KELUAR dari semua container - benar-benar full width */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-36 pt-16"
      >
        <InfiniteMovingCards 
          items={projects} 
          direction="left" 
          speed="slow" 
          fullWidth={true} 
        />
      </motion.div>
    </div>
  );
};

export default ProjectKami;