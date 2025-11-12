import { useEffect, useState } from "react";
import ParallaxPage from "@/components/paralaxPage";
import MainLanding from "@/pages/LandingSection/main-landing";
import VmLanding from "@/pages/LandingSection/vm-landing";
import DescLanding from "./LandingSection/desc-landing";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";
import ProjectKami from "./LandingSection/project-kami";
import Testimoni from "./LandingSection/testimoni";
import TimKami from "./LandingSection/tim-kami";
import Kontak from "./LandingSection/kontak";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// ===================== ScrollIndicator =====================
const ScrollIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Hide indicator when scrolled past first section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition < windowHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-1 right-6 md:right-8 lg:right-8 flex flex-col items-center gap-2 md:gap-3 lg:gap-4 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-xs md:text-sm font-thin text-blue-900 -rotate-90 mb-6 md:mb-8 lg:mb-2">
        Scroll
      </span>
      <div className="h-16 md:h-24 lg:h-32 w-1 bg-gray-200 rounded-full overflow-hidden -rotate-180 mb-8 md:mb-12 lg:mb-16">
        <div
          className="h-full bg-red-600 transition-all duration-100"
          style={{ height: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// ===================== LandingPage =====================
const LandingPage: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Aktifkan scroll snap secara global
    document.documentElement.style.scrollSnapType = "y mandatory";

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600); // muncul setelah scroll agak jauh
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Loading loadingDuration={1000}>
      <Navbar />
      <ScrollIndicator />

      {/* Parallax Sections */}
      <ParallaxPage id="section1">
        <MainLanding />
      </ParallaxPage>

      <ParallaxPage id="section2">
        <VmLanding />
      </ParallaxPage>

      <ParallaxPage id="section3">
        <DescLanding />
      </ParallaxPage>

      <ParallaxPage id="section4">
        <ProjectKami />
      </ParallaxPage>

      <ParallaxPage id="section5">
        <Testimoni />
      </ParallaxPage>

      <ParallaxPage id="section6">
        <TimKami />
      </ParallaxPage>

      <ParallaxPage id="section7">
        <Kontak />
      </ParallaxPage>

      {/* ================= Scroll to Top Button ================= */}
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
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-[#003399] text-white p-3 rounded-full shadow-lg hover:bg-[#002266] transition-colors"
              aria-label="Scroll to top"
            >
              ↑
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Loading>
  );
};

export default LandingPage;
