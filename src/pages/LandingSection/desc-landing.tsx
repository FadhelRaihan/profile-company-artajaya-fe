import { motion } from "framer-motion";

const DescLanding = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center px-4 md:px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="max-w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl text-center lg:text-justify"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-2xl lg:text-3xl xl:text-4xl text-[#003399] leading-relaxed"
        >
          <span className="font-bold">Arta Jaya Konstruksi</span> adalah perusahaan konsultan dan penyedia jasa konstruksi yang berfokus pada kualitas, ketepatan, dan inovasi. Bersama para klien, kami membangun proyek yang kokoh, fungsional, serta berdaya guna tinggi dalam menghadapi dinamika kebutuhan modern. Kami memadukan keahlian teknis, pemikiran strategis, dan efisiensi pelaksanaan untuk menghadirkan hasil yang tidak hanya terlihat kuat, tetapi juga nyata memberi dampak.
        </motion.h2>
      </motion.div>
    </div>
  );
};

export default DescLanding;