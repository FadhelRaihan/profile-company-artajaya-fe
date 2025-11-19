import SplitText from "@/components/split-text";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ThreeDImageRing } from "@/components/lightswind/3d-image-ring";
import Navbar from "@/components/navbar-profile";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState, useRef, type ReactElement } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ourTeamImage } from "@/assets/data/our-team";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchActiveKegiatan, clearError } from "@/redux/kegiatan/kegiatanSlice";
import { errorHandling } from "@/utils/index";

interface BentoItem {
  title: string;
  description: string;
  header: React.ReactNode;
  icon?: React.ReactNode;
}

type ScrollValues = {
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  activitiesY: MotionValue<number>;
};

const ScrollContainer = ({
  children,
}: {
  children: (values: ScrollValues) => ReactElement;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const activitiesY = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <div ref={containerRef} className="relative w-full bg-white">
      {children({ heroY, heroOpacity, activitiesY })}
    </div>
  );
};

const TeamActivitySection = () => {
  const dispatch = useAppDispatch();
  const { kegiatan, loading, error } = useAppSelector((state) => state.kegiatan);
  
  const [items, setItems] = useState<BentoItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch data from backend on mount
  useEffect(() => {
    dispatch(fetchActiveKegiatan());
  }, [dispatch]);

  // Handle error from Redux
  useEffect(() => {
    if (error) {
      errorHandling.handleApiError({ message: error });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Setup Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { rootMargin: "100px", threshold: 0.01 }
    );

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  // Generate items from backend data
  useEffect(() => {
    if (kegiatan && kegiatan.length > 0) {
      const mappedItems: BentoItem[] = kegiatan.map((activity, index) => {
        // Ambil foto pertama dari array photos, atau gunakan default placeholder
        const firstPhoto = activity.photos?.[0]?.url || 
                          `https://picsum.photos/seed/${activity.kegiatanId}/800/600`;

        return {
          title: activity.nama_kegiatan,
          description: activity.deskripsi_singkat,
          header: (
            <div 
              data-index={index} 
              className="relative h-full w-full overflow-hidden"
            >
              {visibleItems.has(index) ? (
                <>
                  <img
                    src={firstPhoto}
                    alt={activity.nama_kegiatan}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover/bento:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback jika image gagal
                      (e.target as HTMLImageElement).src = 
                        `https://picsum.photos/seed/${activity.kegiatanId}/800/600`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003399] via-[#003399]/5 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">
                      {activity.nama_kegiatan}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2">
                      {activity.deskripsi_singkat}
                    </p>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              )}
            </div>
          ),
        };
      });

      setItems(mappedItems);
    }
  }, [kegiatan, visibleItems]);

  // Observe items after mount
  useEffect(() => {
    if (!loading && observerRef.current && items.length > 0) {
      const elements = document.querySelectorAll("[data-index]");
      elements.forEach((el) => observerRef.current!.observe(el));
    }
  }, [loading, items]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-900 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <ScrollContainer>
      {({ heroY, heroOpacity, activitiesY }) => (
        <>
          <Navbar />

          {/* Hero Section - Team */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative w-full min-h-[80vh] flex flex-col justify-center items-center overflow-hidden py-12  md:py-12 lg:py-12"
          >
            <div className="max-w-7xl w-full mt-12">
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.history.back()}
                  className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100/60 transition-colors cursor-pointer -translate-y-2 ml-[-12px] md:ml-0 md:-translate-y-3"
                  aria-label="Kembali ke Projects"
                >
                  <ArrowLeft className="text-[#00297A] size-6 md:size-7 lg:size-8" />
                </button>

                <div className="leading-tight">
                  <div className="text-blue-900 text-3xl font-medium text-center">
                    <SplitText
                      text="/ Tim Kami"
                      className="text-[18px] font-semibold text-center text-blue-900"
                      delay={100}
                      duration={0.6}
                      ease="power3.out"
                      splitType="chars"
                      from={{ opacity: 0, y: 40 }}
                      to={{ opacity: 1, y: 0 }}
                      triggerOnMount={true}
                      mountDelay={0}
                      textAlign="center"
                    />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center lg:text-left"
                  >
                    <div className="mb-6">
                      <h1 className="block text-5xl font-semibold text-blue-900 text-center">
                        Kenali <span className="text-red-500">Tim Hebat</span> Kami
                      </h1>
                    </div>
                    <div className="mb-6">
                      <p className="block font-medium text-gray-600 text-center">
                        Di balik setiap proyek luar biasa, ada tim yang bekerja
                        dengan dedikasi dan keahlian. Kami adalah kombinasi dari
                        desainer, developer, dan inovator yang berkomitmen
                        menghadirkan solusi digital terbaik untuk setiap klien.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <ThreeDImageRing
              images={ourTeamImage}
              containerClassName="overflow-visible relative"
              imageDistance={800}
              width={300}
              animationDuration={2}
              hoverOpacity={1}
              perspective={1400}
              imageClassName="w-[400px] h-[400px] object-fill shadow-lg hover:scale-105 transition-transform duration-300"
              gapOffset={0}
            />
          </motion.div>

          {/* Activities Section */}
          <motion.div
            style={{ y: activitiesY }}
            className="relative w-full flex flex-col items-center overflow-hidden py-12 md:py-2 pl-8"
          >
            <div className="flex flex-col items-end justify-start px-4 md:px-24 mb-8 md:mb-12 max-w-7xl w-full">
              <div className="w-full space-y-4">
                <SplitText
                  text="/ Kegiatan Kami"
                  className="text-xl md:text-2xl font-medium text-blue-900"
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

              {items.length > 0 ? (
                <BentoGrid className="max-w-6xl mx-auto mt-12">
                  {items.map((item, i) => (
                    <BentoGridItem
                      key={i}
                      header={item.header}
                      className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                    />
                  ))}
                </BentoGrid>
              ) : (
                <div className="mt-12 text-center text-gray-600">
                  <p>Belum ada kegiatan yang tersedia</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </ScrollContainer>
  );
};

export default TeamActivitySection;