"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "@/components/split-text";
import { Progress } from "@/components/ui/progress";
import { TestimonialInfiniteCards } from "@/components/infinite-moving-cardsTestimonials";
import {
  useTestimoniActions,
  useTestimoniError,
  useTestimoniList,
  useTestimoniSubmitting,
} from "@/stores";
import { MessageSquarePlus, X } from "lucide-react";
import type { CreateTestimonials } from "@/stores/testimoni/testimoniStore";
import { showErrorAlert } from "@/utils/errorHandling";
import Swal from "sweetalert2";

const Testimoni: React.FC = () => {
  const testimonials = useTestimoniList();
  const error = useTestimoniError();
  const { createTestimoni, clearSubmitSuccess, resetSubmitState } = useTestimoniActions();
  const { submitting, submitSuccess } = useTestimoniSubmitting();
  const [currentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<CreateTestimonials>({
    nama_tester: "",
    testimoni: "",
    createdBy: 'public',
  })

  const ref = React.useRef(null);
  const isInview = useInView(ref, { amount: 0.6 });

  useEffect(() => {
    if (submitSuccess) {
      Swal.fire({
        icon: 'success',
        title: 'Terima Kasih!',
        text: "Testimoni anda telah dikirim!",
        showConfirmButton: true,
        timer: 3000,
      }).then(() => {
        clearSubmitSuccess();
        resetForm();
        setIsModalOpen(false);
      });
    }
  }, [submitSuccess, clearSubmitSuccess]);

  const resetForm = () => {
    setFormData({
      nama_tester: '',
      testimoni: '',
      createdBy: 'public',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nama_tester.trim()) {
      showErrorAlert('Nama tidak boleh kosong', 'Validasi Error');
      return;
    }

    if (!formData.testimoni.trim()) {
      showErrorAlert('Testimoni tidak boleh kosong', 'Validasi Error');
      return;
    }

    if (formData.testimoni.trim().length < 10) {
      showErrorAlert('Testimoni minimal 10 karakter', 'Validasi Error');
      return;
    }

    try {
      await createTestimoni({
        nama_tester: formData.nama_tester,
        testimoni: formData.testimoni,
        createdBy: 'guest',
      });
    } catch (error: any) {
      showErrorAlert(error.message || 'Gagal mengirim testimoni');
    }
  };

  const handleClose = () => {
    if (!submitting) {
      resetSubmitState();
      resetForm();
      setIsModalOpen(false);
    }
  };

  const transformedTestimonials = testimonials.map((t, index) => ({
    id: Number(t.id) || index + 1,
    testerName: t.nama_tester,
    testimoni: t.testimoni,
  }));

  const totalTestimonials = transformedTestimonials.length;
  const progressValue =
    totalTestimonials > 0
      ? ((currentIndex + 1) / totalTestimonials) * 100
      : 0;

  return (
    <>
      <div
        ref={ref}
        className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden py-20 md:py-24 lg:py-28"
      >
        <div className="flex flex-col items-start justify-center px-6 md:px-12 lg:px-16 xl:px-20 mb-2 max-w-7xl w-full pt-8">
          <div className="w-full space-y-2">
            <SplitText
              key={isInview ? "visible" : "hidden"}
              text="/ Testimoni"
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
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-left relative"
            >
              <span className="block text-5xl md:text-6xl lg:text-7xl font-medium text-blue-900">
                Mengapa Klien <span className="text-red-600">Percaya</span> Kami
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full flex justify-center mt-8"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <MessageSquarePlus size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Bagikan Testimoni Anda</span>
            </button>
          </motion.div>
        </div>

        {/* Tampilkan cards atau pesan error */}
        <div className="relative w-full overflow-hidden">
          {error ? (
            <div className="flex justify-center items-center py-20">
              <p className="text-red-600 text-lg">Error: {error}</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {transformedTestimonials.length > 0 ? (
                <TestimonialInfiniteCards
                  items={transformedTestimonials}
                  direction="left"
                  speed="normal"
                  pauseOnHover={true}
                />
              ) : (
                <div className="flex justify-center items-center py-20">
                  <p className="text-gray-500 text-lg">Belum ada testimoni tersedia</p>
                </div>
              )}
            </motion.div>
          )}
        </div>

        <div className="w-full flex justify-start mt-20 px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="w-full max-w-7xl">
              <Progress value={progressValue} className="h-2 bg-gray-100" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900">
                Bagikan Testimoni Anda
              </h3>
              <button
                onClick={handleClose}
                disabled={submitting}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="testerName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  id="testerName"
                  type="text"
                  value={formData.nama_tester}
                  onChange={(e) => setFormData({ ...formData, nama_tester: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  disabled={submitting}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Testimoni <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  value={formData.testimoni}
                  onChange={(e) => setFormData({ ...formData, testimoni: e.target.value })}
                  placeholder="Ceritakan pengalaman Anda..."
                  disabled={submitting}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  maxLength={500}
                />
                <p className="mt-2 text-xs text-gray-500 text-right">
                  {formData.testimoni.length}/500 karakter
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Catatan:</strong> Testimoni Anda akan ditinjau oleh admin sebelum ditampilkan.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={submitting}
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Mengirim...
                    </>
                  ) : (
                    'Kirim Testimoni'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Testimoni;