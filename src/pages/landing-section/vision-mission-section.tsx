import { motion } from "framer-motion";

const VissionMissionLanding = () => {
  const missionList = [
    "Berpartisipasi dalam pembangunan melalui jasa di bidang General Contractor, Trading, Supplier, Civil Work.",
    "Menyediakan jasa di bidang General Contractor, Trading, Supplier, Civil Work yang dapat memberikan nilai tambah bagi stakeholder.",
    "Memberikan pelayanan dengan sikap profesional dan memenuhi standar kesehatan, keselamatan kerja dan perlindungan lingkungan.",
    "Menjalin hubungan yang berkelanjutan (kontinuitas) dan bekerja sama untuk meningkatkan kinerja dan pelayanan terbaik.",
    "Meningkatkan mutu dan kualitas SDM untuk menjadi perusahaan yang mampu memberikan pelayanan jasa terbaik."
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col gap-16 md:gap-20 lg:gap-4 items-center justify-center py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-16 xl:px-20 mt-12">
      
      {/* Visi */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-7xl w-full text-center lg:text-left"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003399] mb-2">
          Visi
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-lg text-[#003399] leading-relaxed md:leading-loose">
          "Menjadi perusahaan jasa di bidang General Contractor, Trading, Supplier, Civil Work  
          yang terpercaya dan dapat diandalkan".
        </p>
      </motion.div>

      {/* Misi */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-7xl w-full text-center lg:text-left"
      >
        <h3 className="text-right text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003399] mb-2">
          Misi
        </h3>

        <ul className="space-y-4 text-sm sm:text-base md:text-lg lg:text-lg text-[#003399] leading-relaxed md:leading-loose text-left">
          {missionList.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-bold text-[#003399]">❖</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
};

export default VissionMissionLanding;
