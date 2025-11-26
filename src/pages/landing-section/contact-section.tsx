import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import SplitText from "@/components/split-text";
import { useState } from "react";

const Kontak: React.FC = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: ""
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: ""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {  
    if (!formData.nama || !formData.email || !formData.pesan) {
      setStatus({
        type: "error",
        message: "Mohon lengkapi semua field"
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const SERVICE_ID = "service_s3lqfk9";
      const TEMPLATE_ID = "template_qujyyzx";
      const PUBLIC_KEY = "uA5CF3lHeEOGVfqGc";

      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: {
            from_name: formData.nama,
            from_email: formData.email,
            message: formData.pesan,
          }
        })
      });

      // EmailJS mengembalikan "OK" sebagai text jika sukses
      const responseText = await response.text();
      
      if (response.ok && responseText === "OK") {
        setStatus({
          type: "success",
          message: "Pesan berhasil dikirim! Kami akan segera menghubungi Anda."
        });
        setFormData({ nama: "", email: "", pesan: "" });
      } else {
        // Jika bukan "OK", coba parse sebagai JSON untuk error message
        let errorMessage = "Gagal mengirim pesan";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung."
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full py-20 md:py-24 lg:py-28 px-6 md:px-12 lg:px-16 xl:px-12">
      {/* Headline */}
      <div className="flex flex-col items-start justify-start mb-16 md:mb-20 lg:mb-6 max-w-7xl w-full mt-24 lg:mt-26">
        <SplitText
          text="/ Kontak Kami"
          className="text-xl md:text-2xl font-medium text-blue-900"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-2"
        >
          <div className="leading-tight">
            <span className="block text-4xl md:text-5xl lg:text-6xl font-medium text-blue-900">
              Hubungi Kami Untuk{" "}
              <span className="text-red-600">Kerjasama</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bagian bawah: Info Kontak + Form sejajar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16 md:mb-8">
          {/* Informasi Kontak */}
          <div className="flex flex-col space-y-6 lg:w-1/2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <p className="text-blue-900 font-medium">example@gmail.com</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <p className="text-blue-900 font-medium">(+62) 878902790123</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <p className="text-blue-900 font-medium">Jl. Bandung 119</p>
            </div>
          </div>

          {/* Form Kontak */}
          <div className="flex flex-col lg:w-1/2">
            <div className="space-y-8 p-8 bg-white rounded-lg shadow-sm">
              {/* Status Message */}
              {status.message && (
                <div
                  className={`p-4 rounded-md ${
                    status.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-0 py-2 border-b border-gray-300 focus:outline-none focus:border-red-600 transition-colors text-gray-700 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Nama"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="w-full px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors text-gray-700 placeholder-gray-400 disabled:opacity-50"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="text"
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  disabled={loading}
                  className="flex-grow px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-red-600 transition-colors text-gray-700 placeholder-gray-400 disabled:opacity-50"
                  placeholder="Tuliskan pesan anda"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-red-600 text-white font-medium py-2 px-8 rounded hover:bg-red-700 transition-colors duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Mengirim..." : "Kirim"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section - Full Width */}
        <div className="-mx-[calc((100vw-100%)/2)] w-screen mt-10 lg:mt-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311651640625!3d-6.903444400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
            width="100%"
            height="270"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kantor"
            className="md:h-80"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Kontak;