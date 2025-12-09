"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUp, Phone } from "lucide-react";
import Navbar from "@/components/navbar-profile";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectList, useProjectActions, useProjectLoading } from '@/stores';
import { getAllProjectPhotoUrls, getProjectLocation, getProjectCategory } from '@/utils/projectsUtils';
import { handleApiError } from '@/utils/errorHandling';

const SubDetailProject: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [ _, setIsTransitioning] = useState(false);

  // Get data from store
  const projects = useProjectList();
  const loading = useProjectLoading();
  const { fetchActiveProjects } = useProjectActions();

  // Fetch projects on mount if not loaded
  useEffect(() => {
    if (projects.length === 0) {
      fetchActiveProjects().catch(handleApiError);
    }
  }, []);

  // Find current project
  const project = projects.find((p) => p.id === projectId);

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: 0.7, 
        delay: 0.1,
      },
    },
  } as any;

  // Refs for lazy-load + animation
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [navRef, navInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [relatedRef, relatedInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Carousel autoplay effect
  useEffect(() => {
    if (!api || !project) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [api, project]);

  // Tracking current slide
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigate pages
  const handleNavigate = (targetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(`/project/${targetId}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsTransitioning(false);
    }, 400);
  };

  // Get project images
  const projectImages = project ? getAllProjectPhotoUrls(project) : [];
  
  // Get project details
  const projectDetail = project?.details?.[0];
  const projectLocation = project ? getProjectLocation(project) : '';
  const projectCategory = project ? getProjectCategory(project) : '';

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003399] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data project...</p>
        </div>
      </div>
    );
  }

  // Project not found
  if (!project) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#003399] mb-4">
            Project Tidak Ditemukan
          </h1>
          <Button
            onClick={() => navigate("/project")}
            className="bg-[#003399] hover:bg-[#002266]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Project
          </Button>
        </div>
      </div>
    );
  }

  // Get current project index
  const currentIndex = projects.findIndex((p) => p.id === projectId);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Get related projects (exclude current)
  const relatedProjects = projects
    .filter((p) => p.id !== projectId)
    .slice(0, 2);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content with top padding to avoid overlap with fixed navbar */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-10 pt-[78px] mt-4">

        {/* Title with Back Button */}
        <div ref={titleRef} className="mb-8">
          {titleInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mt-8 mb-8"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <button
                  onClick={() => navigate("/project-pages")}
                  className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100/60 transition-colors cursor-pointer mt-1"
                  aria-label="Kembali ke Projects"
                >
                  <ArrowLeft className="text-[#00297A] size-6 md:size-7 lg:size-8" />
                </button>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003399] leading-tight">
                  {project.project_name}
                </h1>
              </div>
              <Separator className="my-4 h-1 bg-gray-700"/>
            </motion.div>
          )}
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative w-full h-[260px] md:h-[360px] lg:h-[420px] rounded-none overflow-hidden shadow-md mb-8">
          {carouselInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Carousel
                setApi={setApi}
                opts={{ align: "start", loop: true }}
                className="w-full"
              >
                <CarouselContent className="-ml-0">
                  {projectImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-0 basis-full">
                      <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] rounded-none overflow-hidden shadow-lg">
                        <AnimatePresence mode="wait">
                          {current === index && (
                            <motion.img
                              key={index}
                              src={image}
                              alt={`${project.project_name} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5 }}
                            />
                          )}
                        </AnimatePresence>
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {index + 1} / {projectImages.length}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </motion.div>
          )}
        </div>

        {/* Info Section */}
        <div ref={infoRef} className="mb-12">
          {infoInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#003399] mb-6">
                Info
              </h2>
              <div className="space-y-4 border-t border-gray-200">
                {[
                  { label: "Klien", value: projectDetail?.client || "N/A" },
                  { label: "Industri", value: projectDetail?.industry || projectCategory },
                  { label: "Pelayanan", value: projectDetail?.service || projectCategory },
                  { label: "Lokasi", value: projectDetail?.location || projectLocation },
                  ...(projectDetail?.start_date ? [{ 
                    label: "Periode", 
                    value: `${formatDate(projectDetail.start_date)} - ${formatDate(projectDetail.end_date)}` 
                  }] : [])
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row border-b border-gray-200 py-4"
                  >
                    <div className="w-full md:w-1/3 text-[#003399] font-semibold mb-2 md:mb-0">
                      {item.label}
                    </div>
                    <div className="w-full md:w-2/3 text-gray-700 text-right">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* About Section */}
        <div ref={aboutRef}>
          {aboutInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#003399] mb-2">
                About
              </h2>
              <Separator className="my-4 h-1 bg-gray-700" />
              
              <div className="flex justify-end">
                <div className="w-full md:w-4/5 lg:w-3/4 text-gray-600 leading-relaxed text-justify">
                  {/* Main description */}
                  {project.description.split('\n\n').map((paragraph, index) => (
                    <p key={`desc-${index}`} className="mb-4">{paragraph}</p>
                  ))}
                  
                  {/* Detail description if exists */}
                  {projectDetail?.detail_description && (
                    <>
                      <p className="mb-4 mt-6 font-semibold text-[#003399]">Detail Project:</p>
                      {projectDetail.detail_description.split('\n\n').map((paragraph, index) => (
                        <p key={`detail-${index}`} className="mb-4">{paragraph}</p>
                      ))}
                    </>
                  )}
                </div>
              </div>
              
              <Separator className="my-2 h-1 bg-gray-700" />
            </motion.div>
          )}
        </div>

        {/* Navigation buttons */}
        <div ref={navRef} className="mb-2 py-8">
          {navInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex justify-between items-center"
            >
              <button
                onClick={() => handleNavigate(prevProject.id)}
                className="text-[#003399] hover:text-[#002266] font-semibold text-lg flex items-center gap-2 transition-colors underline"
              >
                ← Project Sebelumnya
              </button>
              <button
                onClick={() => handleNavigate(nextProject.id)}
                className="text-[#003399] hover:text-[#002266] font-semibold text-lg flex items-center gap-2 transition-colors underline"
              >
                Project Selanjutnya →
              </button>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-end mb-4 py-8 rounded-3xl">
          {ctaInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-[#003399]">Mulai Membuat</span>
                <br />
                <span className="text-[#DC2626]">Project?</span>
              </h2>
              <Button
                size="lg"
                className="mt-6 text-[#003399] font-semibold px-8 py-6 text-lg 
                items-center
                hover:bg-[#003399] hover:text-white
                transition-colors duration-300"
                onClick={() => navigate("/", { state: { scrollTo: "section7" } })}
                variant={"outline"}
              >
                Hubungi Kami <Phone/>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Related Projects */}
        <div ref={relatedRef} className="mb-4">
          {relatedInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#003399] mb-2">
                Related Project
              </h2>
              <Separator className="my-4 h-1 bg-gray-700" />
              <div className="grid md:grid-cols-2 gap-6">
                {relatedProjects.map((relatedProject) => {
                  const relatedImages = getAllProjectPhotoUrls(relatedProject);
                  return (
                    <div
                      key={relatedProject.id}
                      className="group cursor-pointer"
                      onClick={() => {
                        navigate(`/project/${relatedProject.id}`);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="relative h-[300px] md:h-[400px] rounded-none overflow-hidden shadow-lg mb-4">
                        <img
                          src={relatedImages[0]}
                          alt={relatedProject.project_name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <h3 className="text-xl font-medium text-[#003399] group-hover:text-[#002266] transition-colors">
                        {relatedProject.project_name}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#003399] text-white p-3 rounded-xl shadow-lg hover:bg-[#002266] transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp strokeWidth={4}/>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubDetailProject;