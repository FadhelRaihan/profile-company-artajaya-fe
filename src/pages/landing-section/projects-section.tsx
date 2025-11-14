"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";
import { projectsData } from "@/assets/data/projects";

// Data proyek dengan gambar
const projects = projectsData.map(project => ({
  id: project.id,
  image: project.image,
  title: project.title,
  location: project.location,
  category: project.category,
}));

const ProjectKami: React.FC = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col py-20 md:py-24 lg:py-28">
      {/* Container untuk text - dengan padding konsisten */}
      <div className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-12 pt-12">
        <div className="max-w-7xl w-full">
          {/* Judul kecil */}
          <SplitText
            text="/ Proyek Kami"
            className="text-2xl font-medium text-center text-blue-900"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
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

      {/* Cards - full width */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        <InfiniteMovingCards 
          items={projects} 
          direction="left" 
          speed="slow" 
          fullWidth={true} 
          className="rounded-none"
        />
      </motion.div>
    </div>
  );
};

export default ProjectKami;