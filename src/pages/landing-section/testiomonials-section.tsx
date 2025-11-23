"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react"; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Tipe data untuk Testimoni
interface TestimonialData {
  comment: string;
  userName: string;
  userImage?: string;
  jabatan: string;
  userInitial: string;
  service?: string;
  rating?: string;
}

// Data awal
const initialTestimonials: TestimonialData[] = [
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Achmad Soewardi",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    jabatan: "Ketua yayasan",
    userInitial: "AS",
    rating: "5"
  },
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Siti Rahayu",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    jabatan: "Ketua hima",
    userInitial: "SR",
    rating: "5"
  },
  {
    comment: "ArchiCore selalu menjadi rekan andal dalam menavigasi setiap tahap pembangunan dengan kualitas dan ketepatan waktu yang luar biasa.",
    userName: "Ahmad Wijaya",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    jabatan: "Direktur",
    userInitial: "AW",
    rating: "4"
  },
];

const Testimoni: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialData[]>(initialTestimonials);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    jabatan: "",
    layanan: "",
    rating: "0", 
    pesan: ""
  });

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (ratingValue: number) => {
    setFormData((prev) => ({ ...prev, rating: ratingValue.toString() }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTestimonial: TestimonialData = {
      comment: formData.pesan,
      userName: formData.nama,
      jabatan: formData.jabatan,
      userInitial: formData.nama.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2),
      userImage: "", 
      service: formData.layanan,
      rating: formData.rating
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({ nama: "", jabatan: "", layanan: "", rating: "0", pesan: "" });
    setIsOpen(false);
  };

  const duplicatedTestimonis = [...testimonials, ...testimonials, ...testimonials];

  // --- STYLE DEFINITIONS ---
  const inputStyle = "h-10 border-0 border-b border-gray-300 rounded-none px-0 py-2 focus-visible:ring-0 focus-visible:border-red-600 focus-visible:border-b-2 text-blue-900 text-lg placeholder:text-gray-300 transition-all duration-200 bg-transparent font-medium";
  const labelStyle = "text-red-600 text-xs font-semibold uppercase tracking-wider mb-2 block";
  const selectTriggerStyle = "h-10 border-0 border-b border-gray-300 rounded-none px-0 focus:ring-0 focus:border-red-600 text-left flex justify-between items-center text-lg text-blue-900 font-medium";

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-start items-center overflow-hidden pt-44 md:pt-56 lg:pt-64 pb-40 bg-white">
      
      {/* Container Header */}
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-8 max-w-7xl w-full">
        <div className="w-full space-y-4">
          <SplitText
            text="/ Testimoni"
            className="text-2xl font-medium text-blue-900"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-3xl"
            >
              <div className="leading-tight">
                <span className="block text-5xl md:text-6xl lg:text-7xl font-medium text-blue-900">
                  Mengapa Klien <span className="text-red-600">Percaya</span> Kami
                </span>
              </div>
            </motion.div>

            {/* BUTTON TRIGGER */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg font-medium rounded-none shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  Tulis Testimoni
                </Button>
              </DialogTrigger>
              
              {/* --- MODAL FORM CONTENT --- */}
              <DialogContent 
                // PERUBAHAN TOMBOL EXIT (VERSI JUMBO):
                // scale-150: Ukuran tombol jadi 1.5x lipat
                // svg:w-8 svg:h-8: Ukuran icon X jadi 32px (sangat jelas)
                // bg-gray-50: Sedikit background abu tipis agar terlihat seperti tombol bulat
                className="
                  sm:max-w-[800px] bg-white p-0 overflow-hidden border-none shadow-2xl rounded-sm gap-0 
                  
                  [&>button]:top-8 [&>button]:right-8 
                  [&>button]:scale-150 
                  [&>button]:p-2
                  [&>button]:rounded-full
                  [&>button]:bg-gray-50/50 [&>button]:hover:bg-red-50
                  
                  [&>button>svg]:w-8 [&>button>svg]:h-8
                  [&>button>svg]:text-gray-400 [&>button>svg]:hover:text-red-600 
                  [&>button>svg]:transition-colors
                "
              >
                
                <DialogHeader className="px-10 pt-10 pb-0 bg-white">
                   <DialogTitle className="text-gray-400 text-sm font-normal tracking-[0.2em] uppercase">
                    / Form Input
                  </DialogTitle>
                </DialogHeader>

                <div className="p-10 pt-8">
                  <form onSubmit={handleSubmit} className="space-y-12">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                      
                      {/* Nama */}
                      <div className="group">
                        <Label htmlFor="nama" className={labelStyle}>nama lengkap</Label>
                        <Input
                          id="nama"
                          name="nama"
                          placeholder="Masukkan nama anda"
                          value={formData.nama}
                          onChange={handleInputChange}
                          required
                          className={inputStyle}
                        />
                      </div>

                      {/* Layanan */}
                      <div className="group">
                        <Label className={labelStyle}>jenis layanan</Label>
                        <Select onValueChange={(val) => handleSelectChange("layanan", val)}>
                          <SelectTrigger className={selectTriggerStyle}>
                            <SelectValue placeholder="Pilih layanan" className="text-gray-300" />
                          </SelectTrigger>
                          <SelectContent className="bg-white rounded-none border border-gray-100 shadow-xl">
                            <SelectItem value="Konstruksi">Konstruksi</SelectItem>
                            <SelectItem value="Renovasi">Renovasi</SelectItem>
                            <SelectItem value="Desain Interior">Desain Interior</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Jabatan */}
                      <div className="group">
                        <Label htmlFor="jabatan" className={labelStyle}>jabatan</Label>
                        <Input
                          id="jabatan"
                          name="jabatan"
                          placeholder="Contoh: CEO, Manager"
                          value={formData.jabatan}
                          onChange={handleInputChange}
                          required
                          className={inputStyle}
                        />
                      </div>

                      {/* --- RATING BINTANG --- */}
                      <div className="group">
                        <Label className={labelStyle}>rating</Label>
                        <div className="flex items-center gap-2 h-10 border-b border-gray-300">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleStarClick(star)}
                              className="focus:outline-none transition-transform active:scale-90 hover:scale-110"
                            >
                              <Star
                                className={`w-8 h-8 transition-colors duration-200 ${
                                  parseInt(formData.rating) >= star
                                    ? "fill-yellow-400 text-yellow-400" 
                                    : "fill-transparent text-gray-300 hover:text-yellow-200" 
                                }`}
                                strokeWidth={1.5}
                              />
                            </button>
                          ))}
                          <span className="ml-4 text-sm text-gray-400 font-medium">
                             {parseInt(formData.rating) > 0 ? `${formData.rating}.0 dari 5` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="w-full pt-2">
                        <div className="relative group">
                             <div className="flex justify-center mb-4">
                                <Label htmlFor="pesan" className="text-red-600 text-xs font-semibold uppercase tracking-wider">
                                    tuliskan pesan anda
                                </Label>
                             </div>
                            
                            <Textarea
                              id="pesan"
                              name="pesan"
                              placeholder="Ceritakan pengalaman anda bekerja sama dengan kami..."
                              value={formData.pesan}
                              onChange={handleInputChange}
                              required
                              className="w-full min-h-[80px] bg-transparent border-0 border-b border-gray-300 rounded-none resize-none text-center focus-visible:ring-0 focus-visible:border-red-600 focus-visible:border-b-2 text-blue-900 text-xl font-light placeholder:text-gray-300 placeholder:font-light py-2 px-4 leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Button Kirim */}
                    <div className="pt-4">
                      <Button 
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold rounded-sm shadow-md transition-all active:scale-[0.99] tracking-wide uppercase"
                      >
                        Kirim Testimoni
                      </Button>
                    </div>

                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="relative w-full overflow-hidden mt-0">
        <motion.div
          className="flex gap-8"
          key={testimonials.length}
          animate={{ x: [0, -100 * testimonials.length + "%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: Math.max(20, testimonials.length * 8), 
              ease: "linear",
            },
          }}
        >
          {duplicatedTestimonis.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-shrink-0 w-[450px] md:w-[500px] bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-sm border border-gray-100 transition-all duration-500 hover:bg-blue-900 group cursor-default"
            >
              <CardContent className="p-10 flex flex-col justify-between h-full min-h-[320px]">
                <div className="flex justify-between items-start">
                   <div className="text-6xl text-red-100 group-hover:text-white/10 font-serif leading-none mb-4">
                       &ldquo;
                   </div>
                   <div className="flex gap-0.5 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                         <Star 
                           key={star} 
                           className={`w-4 h-4 ${parseInt(testimonial.rating || "5") >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-200 group-hover:text-white/20"}`} 
                         />
                      ))}
                   </div>
                </div>

                <p className="text-blue-900 text-lg leading-relaxed font-normal group-hover:text-white transition-colors duration-300">
                  {testimonial.comment}
                </p>
                <div className="flex items-center gap-5 mt-8 border-t border-gray-100 group-hover:border-white/20 pt-6 transition-colors">
                  <Avatar className="h-12 w-12 border border-gray-200 group-hover:border-white/20">
                    <AvatarImage src={testimonial.userImage} alt={testimonial.userName} />
                    <AvatarFallback className="bg-red-50 text-red-600 font-bold group-hover:bg-white/10 group-hover:text-white transition-colors">
                      {testimonial.userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-bold text-blue-950 text-lg group-hover:text-white transition-colors">
                      {testimonial.userName}
                    </p>
                    <div className="flex items-center gap-3">
                         <span className="text-sm text-gray-500 group-hover:text-gray-300 font-light tracking-wide transition-colors uppercase">
                            {testimonial.jabatan}
                         </span>
                    </div>
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