import { useEffect, useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/loading"; 
import { useProjectList, useProjectLoading, useProjectActions } from "@/stores";
import { getFirstProjectPhotoUrl, getProjectLocation, getProjectCategory } from "@/utils/projectsUtils";

export default function CardProject() {

  const projects = useProjectList();
  const loading = useProjectLoading();
  const { fetchActiveProjects } = useProjectActions();

  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // ✅ Fetch data dari backend
  useEffect(() => {
    fetchActiveProjects();
  }, [fetchActiveProjects]);

  // ✅ Transform data project
  const projectItems = useMemo(() => {
    return projects.map((project) => ({
      id: project.id,
      image: getFirstProjectPhotoUrl(project),
      title: project.project_name,
      description: project.description, // pastikan ini memang ada
      location: getProjectLocation(project),
      category: getProjectCategory(project),
    }));
  }, [projects]);

  // ✅ Infinite scroll
  useEffect(() => {
    if (inView && !isLoadingMore && visibleCount < projectItems.length) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setVisibleCount((prev) => prev + 3);
        setIsLoadingMore(false);
      }, 800);
    }
  }, [inView, isLoadingMore, projectItems.length, visibleCount]);

  const visibleProjects = projectItems.slice(0, visibleCount);

  // ✅ Loading state
  if (loading) {
    return (
      <Loading loadingDuration={800}>
        <div className="text-center py-12">
          <p className="text-gray-600">Memuat kegiatan...</p>
        </div>
      </Loading>
    );
  }

  // ✅ Empty state
  if (projectItems.length === 0) {
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

          let widthClass = "basis-[calc(25%-1rem)]";
          let heightClass = "h-[200px]";

          if (index % 6 === 1 || index % 6 === 3) {
            widthClass = "basis-[calc(50%-1rem)]";
            heightClass = "h-[400px]";
          }

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
                      className="text-blue-900 opacity-100 -translate-x-10 
                               group-hover:translate-x-0 
                               group-active:scale-110 
                               transition-all duration-300 ml-2 inline-block"
                    />
                  </CardHeader>
                </Card>
              </Link>
            </div>
          );
        })}
      </div>

      {/* ✅ Infinite scroll sentinel */}
      {visibleCount < projectItems.length && (
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
