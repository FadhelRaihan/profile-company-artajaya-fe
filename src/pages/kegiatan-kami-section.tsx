"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/navbar-profile";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { projectsData } from "@/assets/data/projects";

interface BentoItem {
  title: string;
  description: string;
  header: React.ReactNode;
  icon?: React.ReactNode;
}

const KegiatanKami: React.FC = () => {
  const [items, setItems] = useState<BentoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Setup Intersection Observer untuk lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        rootMargin: "100px", // Load sedikit sebelum masuk viewport
        threshold: 0.01,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const mappedItems: BentoItem[] = projectsData.map((project, index) => ({
        title: project.title,
        description: project.subtitle,
        header: (
          <div
            data-index={index}
            className="relative h-full w-full overflow-hidden bg-gray-100"
          >
            {visibleItems.has(index) ? (
              <>
                <img
                  src={project.image.trim()}
                  alt={project.title}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                {/* Gradient overlay dengan warna #FFFFFF00 (transparent) ke #003399 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#003399] via-[#003399]/70 to-transparent" />
                
                {/* Title dan Description di dalam gambar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm opacity-90 line-clamp-2">
                    {project.subtitle}
                  </p>
                </div>
              </>
            ) : (
              // Placeholder saat belum di-load
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            )}
          </div>
        ),
      }));
      setItems(mappedItems);
      setIsLoading(false);
    }, 400);
  }, [visibleItems]);

  // Observe items setelah render
  useEffect(() => {
    if (!isLoading && observerRef.current) {
      const elements = document.querySelectorAll("[data-index]");
      elements.forEach((el) => {
        observerRef.current?.observe(el);
      });
    }
  }, [isLoading, items]);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center overflow-hidden py-12 md:py-20">
      <Navbar />
      <div className="flex flex-col items-end justify-start px-4 md:px-24 mb-8 md:mb-12 max-w-7xl w-full mt-8">
        <div className="w-full space-y-4">
          <SplitText
            text="/ Kegiatan Kami"
            className="text-xl md:text-2xl font-medium text-blue-900"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="leading-tight">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-blue-900">
                Kegiatan <span className="text-red-600">Kami</span>
              </span>
            </div>
          </motion.div>
        </div>

        <BentoGrid className="max-w-6xl mx-auto mt-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.1,
                ease: "easeOut" 
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <BentoGridItem
                title={null}
                description={null}
                header={item.header}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
              />
            </motion.div>
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default KegiatanKami;