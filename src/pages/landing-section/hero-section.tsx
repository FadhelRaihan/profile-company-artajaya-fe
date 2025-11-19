
import { motion } from "framer-motion";
import SplitText from "@/components/split-text";

const MainLanding = () => (
  <div className="relative h-screen w-full flex items-center justify-center px-6 md:px-12 lg:px-16 xl:px-20">
    {/* Content Container */}
    <div className="max-w-7xl w-full">
      {/* Welcome Text */}
      <SplitText
        text="/ Selamat Datang di ArtaJaya Konstruksi"
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
      >
      </SplitText>

      {/* Headline - Responsive Typography */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-center lg:text-left"
      >
        <h1 className="leading-tight">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-blue-900">
            Konsultan{" "}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-red-600">
            Arsitektur
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-blue-900">
            dan{" "}
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-red-600">
            Konstruksi
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-blue-900">
              .
            </span>
          </span>
        </h1>
      </motion.div>
    </div>
  </div>
);


export default MainLanding;