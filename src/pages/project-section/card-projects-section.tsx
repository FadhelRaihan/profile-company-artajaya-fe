import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/loading"; 

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchAllKegiatan, clearError } from "@/redux/kegiatan/kegiatanSlice";
import { showErrorAlert } from "@/utils/errorHandling";
import type { Activities } from "@/types/index";

interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
}

/**
 * ✅ MAPPING YANG BENAR - Sesuai dengan Backend Entity
 * Backend mengirim:
 * - kegiatanId (bukan id)
 * - photos (array of PhotoKegiatan)
 * - photos[0].url (foto pertama)
 */
const mapActivitiesToProject = (activities: Activities[]): Activity[] => {
  return activities.map((activity) => {
    // ✅ Ambil foto pertama dari array photos
    const firstPhoto = activity.photos && activity.photos.length > 0 
      ? activity.photos[0].url 
      : "/placeholder-image.jpg";

    return {
      id: activity.kegiatanId, // ✅ BENAR: gunakan kegiatanId
      title: activity.nama_kegiatan,
      description: activity.deskripsi_singkat,
      image: firstPhoto, // ✅ BENAR: ambil foto pertama
    };
  });
};

export default function CardProject() {
  const dispatch = useAppDispatch();
  const { kegiatan, loading: initialLoading, error } = useAppSelector(
    (state) => state.kegiatan
  );

  const [visibleCount, setVisibleCount] = useState(3);
  const [data, setData] = useState<Activity[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ✅ Initial fetch kegiatan dari backend
  useEffect(() => {
    dispatch(fetchAllKegiatan({ is_active: true }));
  }, [dispatch]);

  // ✅ Update data ketika kegiatan berubah
  useEffect(() => {
    if (kegiatan && kegiatan.length > 0) {
      const mappedData = mapActivitiesToProject(kegiatan);
      setData(mappedData);
      
      // ✅ Debug log untuk memastikan data benar
      console.log("📊 Kegiatan dari Redux:", kegiatan);
      console.log("🔄 Mapped Data:", mappedData);
    }
  }, [kegiatan]);

  // ✅ Error Handling
  useEffect(() => {
    if (error) {
      showErrorAlert(error, 'Gagal Memuat Kegiatan');
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // ✅ Infinite scroll
  useEffect(() => {
    if (inView && !isLoadingMore && visibleCount < data.length) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setVisibleCount((prev) => prev + 3);
        setIsLoadingMore(false);
      }, 800);
    }
  }, [inView, isLoadingMore, data.length, visibleCount]);

  const visibleProjects = data.slice(0, visibleCount);

  // ✅ Loading state
  if (initialLoading) {
    return (
      <Loading loadingDuration={800}>
        <div className="text-center py-12">
          <p className="text-gray-600">Memuat kegiatan...</p>
        </div>
      </Loading>
    );
  }

  // ✅ Empty state
  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada kegiatan yang tersedia saat ini</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="text-center lg:text-left"
    >
      <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-6 mt-8">
        {visibleProjects.map((project, index) => {
          // ✅ Layout logic
          let widthClass = "basis-[calc(25%-1rem)]";
          let heightClass = "h-[200px]";

          if (index % 6 === 1 || index % 6 === 3) {
            widthClass = "basis-[calc(50%-1rem)]";
            heightClass = "h-[400px]";
          }

          // ✅ BENAR: Gunakan kegiatanId untuk URL
          const detailUrl = `/project/${project.id}`;

          return (
            <div key={project.id} className={`${widthClass} mb-2`}>
              <Link to={detailUrl} className="block h-full">
                <Card className="rounded-none overflow-hidden pt-0 shadow-none border-none h-full flex flex-col group">
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full object-cover ${heightClass} transition-transform duration-300 hover:scale-110`}
                      loading="lazy"
                      onError={(e) => {
                        // ✅ Fallback jika gambar gagal load
                        e.currentTarget.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>

                  <CardHeader>
                    <CardTitle className="px-2 text-blue-900">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-[16px] text-blue-900 px-2 pt-3 text-ellipsis overflow-hidden h-16">
                      {project.description}
                    </CardDescription>
                    <MoveRight
                      size={24}
                      className="text-blue-900 opacity-100 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 group-active:scale-110 transition-all duration-300 ml-2 inline-block"
                    />
                  </CardHeader>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>

      {/* ✅ Infinite scroll sentinel */}
      {visibleCount < data.length && (
        <div ref={ref} className="flex justify-center items-center py-6">
          {isLoadingMore ? (
            <span className="text-gray-600 animate-pulse">
              Memuat kegiatan lain...
            </span>
          ) : (
            <span className="text-blue-500">
              Scroll untuk melihat lebih banyak ↓
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}