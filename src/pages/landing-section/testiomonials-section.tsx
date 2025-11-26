"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "@/components/split-text";
import { Progress } from "@/components/ui/progress";
import { TestimonialInfiniteCards } from "@/components/infinite-moving-cardsTestimonials";
import {
  useTestimoniActions,
  useTestimoniError,
  useTestimoniList,
  useTestimoniLoading,
} from "@/stores";

const Testimoni: React.FC = () => {
  const testimonials = useTestimoniList();
  const loading = useTestimoniLoading();
  const error = useTestimoniError();
  const { fetchActiveTestimoni } = useTestimoniActions();
  const [currentIndex] = useState(0);

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
        <div className="text-red-600 text-xl font-semibold">
          Gagal mengambil data: {error}
        </div>
      </div>
    );
  }

  // Transform Data to fit the testimonial card structure
  const transformedTestimonials = testimonials.map((t, index) => ({
    id: Number(t.id) || index + 1,
    testerName: t.nama_tester, // Nama tester dari database
    testimoni: t.testimoni,   // Isi testimoni dari database
  }));

  const totalTestimonials = transformedTestimonials.length;
  const progressValue =
    totalTestimonials > 0
      ? ((currentIndex + 1) / totalTestimonials) * 100
      : 0;

  return (
    <div
      ref={ref}
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28"
    >
      {/* Header Section */}
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-2 max-w-7xl w-full pt-8">
        <div className="w-full space-y-2">
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left relative"
          >
            <span className="block text-5xl md:text-6xl lg:text-7xl font-medium text-blue-900">
              Mengapa Klien <span className="text-red-600">Percaya</span> Kami
            </span>
          </motion.div>
        </div>
      </div>

      {/* Testimonial Infinite Cards */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TestimonialInfiniteCards
            items={transformedTestimonials}
            direction="left"
            speed="normal"
            pauseOnHover={true}
          />
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="w-full flex justify-start mt-20 px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
        <div className="w-full max-w-7xl">
          <Progress value={progressValue} className="h-2 bg-gray-100" />
        </div>
      </motion.div>
      </div>
    </div>
  );
};

export default Testimoni;