"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";
import ExpandedCard from "@/components/expanded-card";

interface TeamMember {
  name: string;
  position: string;
  image: string;
}

const TimKami: React.FC = () => {
  // Dummy data - nanti bisa diganti dengan fetch dari backend
  const teamMembers: TeamMember[] = [
    {
      name: "Pham Hanni S.apalah",
      position: "Direktur", 
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop",
    },
    {
      name: "Sarah Johnson",
      position: "Manager Operasional",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
    },
    {
      name: "Lisa Anderson",
      position: "Head of Design",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
    },
    {
      name: "Emma Wilson",
      position: "Lead Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=1000&fit=crop",
    },
    {
      name: "Maria Garcia",
      position: "Marketing Director",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1000&fit=crop",
    },
  ];

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28">
      {/* Container untuk text - centered */}
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-12 max-w-7xl w-full pt-12">
        <div className="w-full space-y-2">
          {/* Judul kecil */}
          <SplitText
            text="/ Tim Kami"
            className="text-xl md:text-2xl font-medium text-blue-900"
            onLetterAnimationComplete={handleAnimationComplete}
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="leading-tight">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-blue-900">
                Temui <span className="text-red-600">Tim</span> Kami
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ExpandedCard dengan animasi fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 0.4,
          ease: "easeOut",
        }}
        viewport={{ once: true }} 
        className="w-full flex justify-center px-6 md:px-12 lg:px-16 xl:px-20"
      >
        <ExpandedCard
          members={teamMembers}
          emptyMessage="Belum ada data tim tersedia"
          cardHeight="50vh"
          minCardHeight="350px"
          gap="3"
          className="max-w-7xl w-full"
        />
      </motion.div>
    </div>
  );
};

export default TimKami;