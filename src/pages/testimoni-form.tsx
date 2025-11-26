import Navbar from "@/components/navbar-profile";
import SplitText from "@/components/split-text";
import { motion } from "framer-motion";

const TestimoniForm: React.FC = () => {
    
    return (

        <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-22">
            <Navbar />
            <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-16 md:mb-20 lg:mb-12 max-w-7xl w-full pt-12">
                <div className="w-full space-y-2">
                    <SplitText
                        text="/ Proyek Kami"
                        className="text-2xl font-medium text-center text-blue-900"
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
        </div>

    )
}

export default TestimoniForm;