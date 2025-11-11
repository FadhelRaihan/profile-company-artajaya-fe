import { useEffect, } from "react";
import ParallaxPage from "@/components/paralaxPage";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";
import MainProject from "./ProjectSection/main-project";



const ProjectPages: React.FC = () => {
  useEffect(() => {
    // Aktifkan scroll snap secara global
    document.documentElement.style.scrollSnapType = "y mandatory";
  }, []);

  return (
    <Loading loadingDuration={1000}>
      <Navbar />
      
      <ParallaxPage id="section1">
        <MainProject />
      </ParallaxPage>
    
    </Loading>
  );
}

export default ProjectPages;