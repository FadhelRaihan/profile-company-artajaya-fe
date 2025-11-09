import { motion } from "framer-motion";

const VmLanding = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col gap-12 items-center justify-center mt-10 px-4 py-12 md:px-8 lg:px-16 xl:px-24">
      {/* Visi - Slide from Left to Right */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center lg:text-left"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003399] mb-4">
          Visi
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#003399] leading-relaxed md:leading-loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </motion.div>

      {/* Misi - Slide from Right to Left */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl text-center lg:text-left"
      >
        <h3 className="text-right text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#003399] mb-4">
          Misi
        </h3>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#003399] leading-relaxed md:leading-loose">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est mauris placerat eleifend leo.
        </p>
      </motion.div>
    </div>
  );
};

export default VmLanding;