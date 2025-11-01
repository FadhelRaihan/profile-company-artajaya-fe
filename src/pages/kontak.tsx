"use client";
import { motion } from "framer-motion";
import SplitText from "@/components/SplitText";
import { Mail, Phone, MapPin } from "lucide-react";

const Kontak: React.FC = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");
    // Handle form submission logic here
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-12 md:py-20">
      {/* Container untuk text - centered */}
      <div className="flex flex-col items-start justify-center px-8 mb-12 md:mb-16 max-w-7xl w-full">
        <div className="w-full space-y-4">
          {/* Judul kecil */}
          <SplitText
            text="/Kontak"
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
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-medium text-blue-900">
                Hubungi Kami Untuk <span className="text-red-600">Kerjasama</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Container untuk informasi kontak dan form */}
      <div className="w-full max-w-7xl px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* Div 1: Informasi Kontak */}
          <div className="lg:w-1/3 space-y-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-blue-900 font-medium">example@gmail.com</p>
              </div>
            </div>

            {/* No Telepon */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-blue-900 font-medium">(+62) 878902790123</p>
              </div>
            </div>

            {/* Alamat */}
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-blue-900 font-medium">Jl. Bandung 119</p>
              </div>
            </div>
          </div>

          {/* Div 2: Form Kontak */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Nama */}
                <div className="flex-1">
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    required
                    className="w-full px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors text-gray-400"
                    placeholder="nama"
                  />
                </div>

                {/* Email */}
                <div className="flex-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors text-gray-400"
                    placeholder="email"
                  />
                </div>
              </div>

              {/* Pesan */}
              <div>
                <input
                  type="text"
                  id="pesan"
                  name="pesan"
                  required
                  className="w-full px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors text-gray-400"
                  placeholder="tuliskan pesan anda"
                />
              </div>

              {/* Tombol Kirim */}
              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-red-600 text-white font-medium py-2 px-8 rounded hover:bg-red-700 transition-colors duration-300"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Google Maps */}
      <div className="w-full max-w-7xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full h-64 md:h-80 rounded-lg overflow-hidden"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311651640625!3d-6.903444400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kantor"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Kontak;