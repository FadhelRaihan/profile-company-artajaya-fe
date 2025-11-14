"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Data testimoni
const testimonis = [
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Achmad Soewardi",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    jabatan: "Ketua yayasan",
    userInitial: "AS"
  },
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Siti Rahayu",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    jabatan: "Ketua hima",
    userInitial: "SR"
  },
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Ahmad Wijaya",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    jabatan: "Direktur",
    userInitial: "AW"
  },
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Linda Permata",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    jabatan: "Manager",
    userInitial: "LP"
  },
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Rudi Hartono",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    jabatan: "Owner",
    userInitial: "RH"
  },
];

const Testimoni: React.FC = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  // Duplikasi data untuk infinite loop yang smooth
  const duplicatedTestimonis = [...testimonis, ...testimonis, ...testimonis];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28">
      {/* Container untuk text */}
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-8 max-w-7xl w-full pt-12">
        <div className="w-full space-y-4">
          {/* Judul kecil */}
          <SplitText
            text="/ Testimoni"
            className="text-2xl font-medium text-blue-900"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="leading-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-medium text-blue-900">
                Mengapa Klien <span className="text-red-600">Percaya</span> Kami
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Card Looping Section */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{
            x: [0, -100 * testimonis.length + "%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35, 
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonis.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[500px] bg-white shadow-lg rounded-none border-none transition-all duration-300 hover:bg-blue-900 group"
            >
              <CardContent className="p-10 space-y-8">
                {/* Comment */}
                <p className="text-blue-900 text-xl leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                  {testimonial.comment}
                </p>

                {/* User Info - Horizontal Layout */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={testimonial.userImage} alt={testimonial.userName} />
                    <AvatarFallback className="bg-blue-900 text-white font-semibold text-lg group-hover:bg-white group-hover:text-blue-900 transition-colors duration-300">
                      {testimonial.userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-bold text-red-600 text-lg group-hover:text-white transition-colors duration-300">
                      {testimonial.userName}
                    </p>
                    <span className="font-normal text-blue-900 text-base group-hover:text-white transition-colors duration-300">
                      {testimonial.jabatan}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimoni;