
import Navbar from "@/components/navbar-profile";
import MainProject from "@/pages/ProjectSection/main-project";
import CardProject from "./ProjectSection/card-project";


export default function Project() {



  return (
    <div className="min-h-screen mt-12">
      <Navbar />
      <div className="px-56 py-25">
        <MainProject />
        <CardProject />
      </div>
    </div>
  );
}