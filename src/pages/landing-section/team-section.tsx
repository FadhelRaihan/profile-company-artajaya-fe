"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";
import ExpandedCard from "@/components/expanded-card";
import { useEffect } from "react";
import { useTeamActions, useTeamError, useTeamList, useTeamLoading } from "@/stores";

const TimKami: React.FC = () => {
  const teams = useTeamList();
  const loading = useTeamLoading();
  const error = useTeamError();
  const { fetchActiveTeam } = useTeamActions();

useEffect(() => {
  if (!teams.length) {
    fetchActiveTeam();
  }
}, []);

 if (loading) {
    return (
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <div className="text-blue-900 text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
        <div className="text-red-600 text-xl font-semibold">Gagal Mengambil data: {error}</div>
      </div>
    );
  }

  //Transform data untuk Component card
  const transformedMembers = teams.map(member => ({
    name: member.fullName,
    position: member.position,
    image: member.imageUrl,
  }));



  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28">
      {/* Container untuk text - centered */}
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-12 max-w-7xl w-full pt-12">
        <div className="w-full space-y-2">
          {/* Judul kecil */}
          <SplitText
            text="/ Tim Kami"
            className="text-xl md:text-2xl font-medium text-blue-900"
          />

          {/* Headline utama */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="leading-tight">
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-blue-900">
                Kenali <span className="text-red-600">Tim</span> Kami
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
          members={transformedMembers}
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