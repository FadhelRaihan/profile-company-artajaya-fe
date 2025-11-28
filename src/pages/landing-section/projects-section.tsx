"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import SplitText from "@/components/split-text";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { useProjectList } from "@/stores";
import { getFirstProjectPhotoUrl, getProjectLocation, getProjectCategory } from "@/utils/projectsUtils";

const ProjectKami: React.FC = () => {
  const projects = useProjectList();

  const projectItems = useMemo(() => {
    return projects.map((project) => ({
      id: project.id,
      image: getFirstProjectPhotoUrl(project),
      title: project.project_name,
      location: getProjectLocation(project),
      category: getProjectCategory(project),
    }));
  }, [projects]);

  return (
    <div className="relative w-full min-h-screen flex flex-col py-20 md:py-24 lg:py-28">
      <div className="flex flex-col items-center justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-12 pt-12">
        <div className="max-w-7xl w-full">
          <SplitText
            text="/Project Kami"
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

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
      >
        {/* Tampilkan cards atau pesan kosong, tanpa loading spinner */}
        {projectItems.length > 0 ? (
          <InfiniteMovingCards
            items={projectItems}
            direction="left"
            speed="slow"
            fullWidth={true}
            className="rounded-none"
          />
        ) : (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500 text-lg">Tidak ada project tersedia</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectKami;