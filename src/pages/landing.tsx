import { useEffect } from "react";
import ParallaxPage from "@/components/paralaxPage";
import Landing from "@/pages/LandingSection/main-landing"
import VmLanding from "@/pages/LandingSection/vm-landing"
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";

export default function App() {
  useEffect(() => {
    // Aktifkan scroll snap secara global
    document.documentElement.style.scrollSnapType = "y mandatory";
  }, []);

  return (
    <Loading loadingDuration={2000}>
      <Navbar />
      <ParallaxPage id="section1">
        <Landing />
      </ParallaxPage>

      <ParallaxPage id="section2">
        <VmLanding />
      </ParallaxPage>
    </Loading>
  );
}