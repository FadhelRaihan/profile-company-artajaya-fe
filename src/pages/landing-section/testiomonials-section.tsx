"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useInView, useAnimationControls } from "framer-motion";
import SplitText from "@/components/split-text";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useTestimoniActions, useTestimoniError, useTestimoniList, useTestimoniLoading } from "@/stores";

const Testimoni: React.FC = () => {
  const testimonials = useTestimoniList();
  const loading = useTestimoniLoading();
  const error = useTestimoniError();
  const { fetchActiveTestimoni } = useTestimoniActions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = React.useRef(null);
  const isInview = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    if (!testimonials.length) {
      fetchActiveTestimoni();
    }
  }, []);

  if (loading) {
    return (
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <div className="text-blue-900 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <div className="text-red-600 text-xl font-semibold">Gagal mengambil data: {error}</div>
      </div>
    );
  }

  // Normalize testimonials data
  const normalizedTestimonials = testimonials.map((t) => {
    const testerName = t.testerName?.trim() || "Client";
    const userInitial = testerName.charAt(0).toUpperCase();

    return {
      ...t,
      displayName: testerName,
      userInitial: userInitial,
      jabatan: "Client",
      message: t.testimoni,
    };
  });

  // Duplicate untuk infinite loop effect - 3x untuk memastikan seamless loop
  const duplicatedTestimonials = [
    ...normalizedTestimonials,
    ...normalizedTestimonials,
    ...normalizedTestimonials,
  ];

  const totalTestimonials = normalizedTestimonials.length;
  const progressValue = ((currentIndex + 1) / totalTestimonials) * 100;

  // Hitung total width untuk animasi
  const cardWidth = 500 + 32; // 500px + 32px gap
  const totalWidth = cardWidth * normalizedTestimonials.length;

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28">
      {/* Container untuk text */}
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-8 max-w-7xl w-full pt-8">
        <div className="w-full space-y-4">
          {/* Judul kecil */}
          <SplitText
            key={isInview ? "visible" : "hidden"}
            text="/ Testimoni"
            className="text-2xl font-medium text-center text-blue-900"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.6}
            rootMargin="-100px"
            textAlign="center"
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left relative"
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
          style={{ width: "max-content" }}
          animate={{
            x: [0, -totalWidth],
          }}
          transition={{
            duration: totalTestimonials * 5, // 5 detik per card
            ease: "linear",
            repeat: Infinity,
          }}
          onUpdate={(latest) => {
            const translateX = Math.abs(latest.x as number);
            const newIndex = Math.floor((translateX / cardWidth) % totalTestimonials);
            setCurrentIndex(newIndex);
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.id}-${index}`}
              className="flex-shrink-0 w-[500px] bg-white shadow-lg rounded-none border-none transition-all duration-300 hover:bg-blue-900 group"
            >
              <CardContent className="p-10 space-y-8">
                {/* Comment */}
                <p className="text-blue-900 text-xl leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                  {testimonial.testimoni}
                </p>

                {/* User Info - Horizontal Layout */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={testimonial.userInitial} alt={testimonial.displayName} />
                    <AvatarFallback className="bg-blue-900 text-white font-semibold text-lg group-hover:bg-white group-hover:text-blue-900 transition-colors duration-300">
                      {testimonial.userInitial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-bold text-red-600 text-lg group-hover:text-white transition-colors duration-300">
                      {testimonial.displayName}
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
      
      <div className="w-full flex justify-start mt-20 px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-7xl">
          <Progress value={progressValue} className="h-2 bg-gray-100" />
        </div>
      </div>
    </div>
  );
};

export default Testimoni;