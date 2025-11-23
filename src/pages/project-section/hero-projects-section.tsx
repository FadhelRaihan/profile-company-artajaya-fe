"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";
import React from "react";

const MainProject: React.FC = () => {

  return (
    <div className="relative w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Container untuk text - centered */}
      <div className="flex flex-col items-end justify-center px-8 mb-2 max-w-7xl w-full">
        <div className="w-full space-y-4">
          {/* Judul kecil */}
          <SplitText
            text="/ Project"
            className="text-2xl font-medium text-blue-900"
            delay={300}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="leading-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-semibold text-blue-900">
                Dibangun Oleh
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-semibold text-red-600">
                ArtaJaya
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainProject;