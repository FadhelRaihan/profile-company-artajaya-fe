"use client";
import { motion, useInView } from "framer-motion";
import SplitText from "@/components/split-text";
import ExpandedCard from "@/components/expanded-card";
import { useEmployeeError, useEmployeeList } from "@/stores";
import { getImageUrl } from "@/utils/getImageUrl";
import React from "react";

const TimKami: React.FC = () => {
  const employees = useEmployeeList();
  const error = useEmployeeError();
  const ref = React.useRef(null);
  const isInview = useInView(ref, { amount: 0.6 })

  const transformedMembers = employees
    .map((member) => {
      let positionName = "Staff";
      let positionOrder = 999;

      if (member.position) {
        if (typeof member.position === "string") {
          positionName = member.position;
        } else if (typeof member.position === "object") {
          positionName = member.position.name || "staff";
          positionOrder = member.position.sort_order ?? 999;
        }
      }

      const imageUrl = getImageUrl(member.photo_url);

      return {
        name : member.full_name,
        position: positionName,
        order: positionOrder,
        image: imageUrl,
      };
    })
    .filter((member) => member.order >= 1 && member.order <= 5)
    .sort((a, b) => a.order - b.order)
  
  return (
    <div ref={ref} className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28">
      <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-12 max-w-7xl w-full pt-12">
        <div className="w-full space-y-2">
          <SplitText
            key={isInview ? "visible" : "hidden"}
            text="/ Kenali Tim Kami"
            className="text-2xl font-medium text-center text-blue-900"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.6}
            rootMargin="-100px"
            textAlign="center"
          />                                                
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInview ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInview ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
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
          emptyMessage={error ? `Error: ${error}` : "Belum ada data tim tersedia"}
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