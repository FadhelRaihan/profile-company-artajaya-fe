import { useEffect } from "react";
// import ParallaxPage from "@/components/paralaxPage";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";
import MainProject from "./ProjectSection/main-project";
import CardProject from "./ProjectSection/card-project";

const ProjectPages: React.FC = () => {
  useEffect(() => {
    // Hapus scroll snap atau sesuaikan
    document.documentElement.style.scrollSnapType = "none"; // Atau "y proximity" untuk lebih smooth
  }, []);

  return (
    <Loading loadingDuration={1000}>
      <div className="min-h-screen mt-12">
      <Navbar />
      <div className="px-56 py-25">
        <MainProject />
        <CardProject />
      </div>
      </div>
    
    </Loading>
  );
}

export default ProjectPages;