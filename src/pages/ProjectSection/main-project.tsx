"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/assets/data/projects";
import type { Project } from "@/assets/data/projects";

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => {
  return (
    <Card
      className="h-full flex flex-col border-none shadow-none bg-transparent mt-2 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        {/* Gambar Proyek */}
        <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Lihat Detail</span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                project.status === "completed"
                  ? "bg-green-500 text-white"
                  : project.status === "ongoing"
                  ? "bg-yellow-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {project.status === "completed"
                ? "Selesai"
                : project.status === "ongoing"
                ? "Berjalan"
                : "Direncanakan"}
            </span>
          </div>
        </div>

        {/* Teks Deskripsi */}
        <div className="mt-4 space-y-2">
          <h3 className="text-blue-900 font-bold text-lg group-hover:text-red-600 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-blue-900 text-sm leading-tight line-clamp-2">
            {project.subtitle}
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-700 mt-2">
            <span className="px-2 py-1 bg-blue-100 rounded">
              {project.category}
            </span>
            <span>{project.year}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MainProject: React.FC = () => {
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleProjectClick = (projectId: number) => {
      navigate(`/project/${projectId}`);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 mt-12">
      {/* Container untuk text - centered */}
      <div className="flex flex-col items-end justify-center px-8 mb-2 pt-20 max-w-7xl w-full">
        <div className="w-full space-y-4">
          {/* Judul kecil */}
          <SplitText
            text="/ Project"
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

      {/* Carousel Proyek */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full max-w-7xl"
      >
        <CarouselContent>
          {projectsData.map((project) => (
            <CarouselItem
              key={project.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default MainProject;