import SplitText from "@/components/split-text";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ThreeDImageRing } from "@/components/lightswind/3d-image-ring";
import Navbar from "@/components/navbar-profile";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import React, { useEffect, useState, useRef, type ReactElement } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { ourTeamImage } from "@/assets/data/our-team";
import { 
  useKegiatanList, 
  useKegiatanLoading, 
  useKegiatanError, 
  useKegiatanActions 
} from "@/stores";
import { errorHandling } from "@/utils/index";
import type { Activities } from "@/stores/kegiatan/kegiatanStore";

// Helper function untuk fix dan validasi URL
const fixPhotoUrl = (url: string | undefined, photoName: string | undefined, baseUrl: string): string => {
  // Jika tidak ada URL sama sekali
  if (!url && photoName) {
    return `${baseUrl}/uploads/${photoName}`;
  }
  
  if (!url) return '';

  // Jika sudah absolute URL
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Fix relative URLs
  if (url.startsWith('/uploads/') || url.startsWith('uploads/')) {
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${cleanPath}`;
  }

  // Jika hanya filename
  if (!url.includes('/')) {
    return `${baseUrl}/uploads/${url}`;
  }

  // Default
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${cleanUrl}`;
};

const isValidPhotoUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

interface BentoItem {
  title: string;
  description: string;
  header: React.ReactNode;
  icon?: React.ReactNode;
  location?: string;
  date?: string;
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
  const kegiatan = useKegiatanList();
  const loading = useKegiatanLoading();
  const error = useKegiatanError();
  const { fetchActiveKegiatan, clearError } = useKegiatanActions();

  const [items, setItems] = useState<BentoItem[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fetch data from backend on mount
  useEffect(() => {
    console.log('🔄 Fetching active kegiatan...');
    fetchActiveKegiatan();
  }, [fetchActiveKegiatan]);

  // Handle error from store
  useEffect(() => {
    if (error) {
      console.error('❌ Kegiatan error:', error);
      errorHandling.handleApiError({ message: error });
      clearError();
    }
  }, [error, clearError]);

  // Debug: Log kegiatan data when it changes
  useEffect(() => {
    if (kegiatan && kegiatan.length > 0) {
      console.log('✅ Kegiatan data loaded:', kegiatan.length);
      console.log('📸 Sample kegiatan with photos:', kegiatan[0]);
    }
  }, [kegiatan]);

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
      // Get base URL from env or default
      const baseUrl = import.meta.env.VITE_API_URL?.replace('/api/v1', '') || 'http://localhost:3000';
      
      const mappedItems: BentoItem[] = kegiatan.map((activity: Activities, index: number) => {
        const placeholderUrl = `https://picsum.photos/seed/${activity.kegiatanId}/800/600`;
        let photoUrl = placeholderUrl;
        
        if (activity.photos && activity.photos.length > 0) {
          const firstPhoto = activity.photos[0];
          
          // Try to fix URL
          const fixedUrl = fixPhotoUrl(firstPhoto.url, firstPhoto.photo_name, baseUrl);
          
          // Debug log
          if (import.meta.env.DEV) {
            console.group(`📸 ${activity.nama_kegiatan}`);
            console.log('Photos count:', activity.photos.length);
            console.log('Original URL:', firstPhoto.url);
            console.log('Photo name:', firstPhoto.photo_name);
            console.log('Fixed URL:', fixedUrl);
            console.log('Is valid:', isValidPhotoUrl(fixedUrl));
            console.groupEnd();
          }
          
          // Use fixed URL if valid
          if (fixedUrl && isValidPhotoUrl(fixedUrl)) {
            photoUrl = fixedUrl;
          } else {
            console.warn(`⚠️ Invalid photo URL for "${activity.nama_kegiatan}":`, {
              original: firstPhoto.url,
              fixed: fixedUrl
            });
          }
        } else {
          console.warn(`⚠️ Kegiatan "${activity.nama_kegiatan}" has no photos, using placeholder`);
        }

        // Format tanggal
        const formattedDate = new Date(activity.tanggal_kegiatan).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });

        return {
          title: activity.nama_kegiatan,
          description: activity.deskripsi_singkat,
          location: activity.lokasi_kegiatan,
          date: formattedDate,
          header: (
            <div
              data-index={index}
              className="relative h-full w-full overflow-hidden group"
            >
              {visibleItems.has(index) ? (
                <>
                  <img
                    src={photoUrl}
                    alt={activity.nama_kegiatan}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      const fallbackUrl = `https://picsum.photos/seed/${activity.kegiatanId}/800/600`;
                      
                      // Prevent infinite loop
                      if (target.src !== fallbackUrl) {
                        console.error(`❌ Failed to load image for: ${activity.nama_kegiatan}`);
                        console.error(`   Original URL: ${photoUrl}`);
                        console.error(`   Falling back to: ${fallbackUrl}`);
                        target.src = fallbackUrl;
                      }
                    }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003399]/90 via-[#003399]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 drop-shadow-lg">
                      {activity.nama_kegiatan}
                    </h3>
                    <p className="text-sm opacity-90 line-clamp-2 mb-3 drop-shadow-md">
                      {activity.deskripsi_singkat}
                    </p>
                    
                    {/* Info Meta */}
                    <div className="flex flex-col gap-1 text-xs opacity-80">
                      {activity.lokasi_kegiatan && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{activity.lokasi_kegiatan}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </div>
                    </div>
                    
                    {/* Photo Count Badge */}
                    {activity.photos && activity.photos.length > 1 && (
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
                        📸 {activity.photos.length} Foto
                      </div>
                    )}
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
      console.log('✅ Bento items generated:', mappedItems.length);
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-900 border-t-transparent mb-4"></div>
          <p className="text-blue-900 text-xl font-semibold">Memuat Kegiatan...</p>
        </div>
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
            className="relative w-full min-h-[80vh] flex flex-col justify-center items-center overflow-hidden py-12 md:py-12 lg:py-12"
          > 
            <div className="max-w-7xl w-full mt-12">  
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <button
                  onClick={() => window.history.back()}
                  className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100/60 transition-colors cursor-pointer -translate-y-2 ml-[-12px] md:ml-0 md:-translate-y-3"
                  aria-label="Kembali ke halaman sebelumnya"
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
            imageDistance={600}  // Jarak lebih dekat
            width={280}          // Lebar card
            height={360}         // Tinggi card
            perspective={1200}
            animationDuration={2}
            hoverOpacity={0.6}
            imageClassName="rounded-2xl"
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
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-12 text-center text-gray-600 bg-gray-50 rounded-2xl p-12"
                >
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-xl font-medium">Belum ada kegiatan yang tersedia</p>
                  <p className="text-sm mt-2 opacity-75">Kegiatan akan ditampilkan di sini setelah ditambahkan</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </ScrollContainer>
  );
};

export default TeamActivitySection;