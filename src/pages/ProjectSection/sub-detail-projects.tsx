"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { projectsData } from "@/assets/data/projects";
import { ArrowLeft, Phone } from "lucide-react";
import Navbar from "@/components/navbar-profile";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

const SubDetailProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Variants for animation
  const fadeInUp= {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0,
    transition: { 
      type: "spring",
       stiffness: 60,
       damping: 12,
       duration: 0.7, 
       delay: 0.1,
       },
      },
  } as any

  // Refs for lazy-load + animation
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [carouselRef, carouselInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [navRef, navInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [relatedRef, relatedInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const project = projectsData.find((p) => p.id === projectId);

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

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Back Button - separate from Navbar, hidden on mobile */}
        <button
          onClick={() => {
            console.log("Back clicked");
            navigate("/ProjectPages");
          }}
          className="hidden md:block fixed top-8 left-[55px] z-[60] p-2 rounded-xl hover:bg-gray-100/60 transition-colors cursor-pointer"
          aria-label="Kembali ke Projects"
        >
          <ArrowLeft className="text-[#00297A] size-[30px]" />
        </button>

      {/* Main Content with top padding to avoid overlap with fixed navbar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 pt-[72px] mr-8 mt-12">
        
        {/* Title */}
        <div ref={titleRef}>
          {titleInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#003399] mb-8 mt-8 leading-tight">
                {project.title}
              </h1>
              <Separator className="my-4 h-1 bg-gray-700" />
            </motion.div>
          )}
        </div>

        {/* Carousel */}
        <div ref={carouselRef} className="relative mb-12">
          {carouselInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Carousel
                opts={{ align: "start" }}
                className="w-full"
              >
                <CarouselContent className="-ml-0">
                  {project.images.map((image, index) => (
                    <CarouselItem key={index} className="pl-0 basis-full">
                      <div className="relative w-full h-[350px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
                          {index + 1} / {project.images.length}
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
                  { label: "Klien", value: project.client },
                  { label: "Industri", value: project.category },
                  { label: "Pelayanan", value: project.category },
                  { label: "Lokasi", value: project.location }
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
        <div ref={aboutRef} className="mb-16">
          {aboutInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <h2 className="text-2xl md:text-3xl font-medium text-[#003399] mb-6">
                About
              </h2>
              <Separator className="my-10 h-1 bg-gray-700" />
              <div className="text-gray-600 leading-relaxed text-justify">
                {project.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              <Separator className="my-8 h-1 bg-gray-700" />
            </motion.div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div ref={navRef} className="mb-16 py-8">
          {navInView && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex justify-between items-center"
            >
              <button
                onClick={() => {
                  const prevId = projectId > 1 ? projectId - 1 : projectsData.length;
                  navigate(`/project/${prevId}`);
                }}
                className="text-[#003399] hover:text-[#002266] font-semibold text-lg flex items-center gap-2 transition-colors underline"
              >
                ← Project Sebelumnya
              </button>
              <button
                onClick={() => {
                  const nextId = projectId < projectsData.length ? projectId + 1 : 1;
                  navigate(`/project/${nextId}`);
                }}
                className="text-[#003399] hover:text-[#002266] font-semibold text-lg flex items-center gap-2 transition-colors underline"
              >
                Project Selanjutnya →
              </button>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mb-16 py-16 rounded-3xl">
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
                onClick={() => navigate("/Kontak")}
                variant={"outline"}
              >
                Hubungi Kami <Phone/>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Related Projects */}
        <div ref={relatedRef} className="mb-12">
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
                {projectsData
                  .filter((p) => p.id !== projectId)
                  .slice(0, 2)
                  .map((relatedProject) => (
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
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                      <h3 className="text-xl font-medium text-[#003399] group-hover:text-[#002266] transition-colors">
                        {relatedProject.title}
                      </h3>
                    </div>
                  ))}
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
              className="bg-[#003399] text-white p-3 rounded-full shadow-lg hover:bg-[#002266] transition-colors"
              aria-label="Scroll to top"
            >
              ↑
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubDetailProject;