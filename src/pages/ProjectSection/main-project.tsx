import React from "react";
import SplitText from "@/components/SplitText"; // Pastikan path benar
import { motion } from "framer-motion";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const MainProject: React.FC = () => {
    return(
        <div className="max-w-5xl">
        <div className="text-blue-900 text-3xl font-medium">
            <SplitText
                text="/ Project Kami"
                className="text-2xl font-semibold text-center text-blue-900"
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
            >
            </SplitText>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center lg:text-left"
            >
                <div className="mb-6">
                    <span className="text-blue-900 text-8xl font-semibold leading-tight">Dibangun Oleh {" "}</span>
                    <span className="text-red-600 text-8xl font-semibold leading-tight">ArtaJaya</span>
                </div>
            </motion.div>
        </div>
    )
}

export default MainProject;