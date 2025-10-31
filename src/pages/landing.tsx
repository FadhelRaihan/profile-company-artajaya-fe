import { useEffect, useState } from "react";
import ParallaxPage from "@/components/paralaxPage";
import MainLanding from "@/pages/LandingSection/main-landing"
import VmLanding from "@/pages/LandingSection/vm-landing"
import DescLanding from "./LandingSection/desc-landing";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";
import ProjectKami from "./project-kami"; 
// Pindahkan ScrollIndicator ke sini
const ScrollIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {  
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Optional: hide indicator when scrolled past first section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition < windowHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 md:right-8 lg:right-12 flex flex-col items-center gap-2 md:gap-3 lg:gap-4 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span className="text-xs md:text-sm font-thin text-blue-900 -rotate-90 mb-6 md:mb-8 lg:mb-12">
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

export default function App() {
  useEffect(() => {
    // Aktifkan scroll snap secara global
    document.documentElement.style.scrollSnapType = "y mandatory";
  }, []);

  return (
    <Loading loadingDuration={1000}>
      <Navbar />
      <ScrollIndicator /> {/* Fixed position - tidak terpengaruh parallax */}
      
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
    </Loading>
  );
}