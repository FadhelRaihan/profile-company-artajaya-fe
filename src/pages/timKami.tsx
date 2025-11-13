import MainTimKami from "./TimKamiSection/main-timKami";
import Navbar from "@/components/navbar-profile";
import { ThreeDImageRing } from '@/components/lightswind/3d-image-ring';
import "../index.css";

const imageUrls = [
  "https://images.pexels.com/photos/1704120/pexels-photo-1704120.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/912110/pexels-photo-912110.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/698808/pexels-photo-698808.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2449540/pexels-photo-2449540.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/2449540/pexels-photo-2449540.jpeg?auto=compress&cs=tinysrgb&w=1200",
];
<ThreeDImageRing images={imageUrls} />;

const TimKami = () => {
  return (
    <div>
      <Navbar />
      <MainTimKami />
        <ThreeDImageRing
          images={imageUrls}
          containerClassName="overflow-visible relative "
          imageDistance={800}
          width={300}
          animationDuration={2}
          hoverOpacity={1}
          perspective={1400}
          imageClassName="w-[400px] h-[400px] object-fill shadow-lg  hover:scale-105 transition-transform duration-300"
          gapOffset={0} 
        />
    </div>
  );
};

export default TimKami;
