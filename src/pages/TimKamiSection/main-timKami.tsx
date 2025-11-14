import SplitText from "@/components/SplitText"; // Pastikan path benar
import { motion } from "framer-motion";

const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

const MainTimKami = () => {
  return (
    <div className="relative flex items-center justify-center mt-30 ml-10  px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl w-full">
        <div className="leading-tight">
          <div className="text-blue-900 text-3xl font-medium text-center">
            <SplitText
              text="/ Tim Kami"
              className="text-[18px] font-semibold text-center text-blue-900"
              delay={100} // Delay antar karakter dalam stagger
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              // Hapus threshold dan rootMargin karena tidak digunakan jika triggerOnMount=true
              triggerOnMount={true} // Tambahkan prop ini
              mountDelay={0} // Delay sebelum animasi mulai (opsional)
              textAlign="center"
              onLetterAnimationComplete={handleAnimationComplete}
            ></SplitText>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6">
              <h1 className="block text-5xl font-semibold text-blue-900 text-center" >
                Kenali <span className=" text-red-500">Tim Hebat</span> Kami
              </h1>
            </div>
            <div className="mb-6">
              <p className="block font-medium text-gray-600 text-center" >
                Di balik setiap proyek luar biasa, ada tim yang bekerja dengan dedikasi dan keahlian. Kami adalah kombinasi dari desainer, developer, dan inovator yang berkomitmen menghadirkan solusi digital terbaik untuk setiap klien.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainTimKami;
