"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate, useParams } from "react-router-dom";
import { projectsData } from "@/assets/data/projects";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Clock,
  DollarSign,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const SubDetailProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);

  // Cari project berdasarkan ID
  const project = projectsData.find((p) => p.id === projectId);

  // Jika project tidak ditemukan
  if (!project) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 text[#003399]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <Building2 className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Project Tidak Ditemukan
          </h1>
          <p className="text-blue-600 mb-8">
            Maaf, project yang Anda cari tidak tersedia.
          </p>
          <Button
            onClick={() => navigate("/project")}
            className="bg-blue-900 hover:bg-blue-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Daftar Project
          </Button>
        </motion.div>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/project");
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white pt-24 pb-12 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Tombol Kembali */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              onClick={handleBack}
              variant="outline"
              className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          </motion.div>

          {/* Header Project */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm ${
                  project.status === "completed"
                    ? "bg-green-500/90 text-white"
                    : project.status === "ongoing"
                    ? "bg-yellow-500/90 text-white"
                    : "bg-blue-500/90 text-white"
                }`}
              >
                {project.status === "completed"
                  ? "✓ Selesai"
                  : project.status === "ongoing"
                  ? "⚡ Sedang Berjalan"
                  : "📋 Direncanakan"}
              </span>
              <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                {project.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6">
              {project.subtitle}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-semibold">{project.value}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="rgb(239 246 255)"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 -mt-8 pb-16">
        {/* Carousel Gambar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <Card className="overflow-hidden shadow-2xl border-none">
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {project.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden">
                        <img
                          src={image}
                          alt={`${project.title} - Image ${index + 1}`}
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                        />
                        {/* Image Counter */}
                        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                          {index + 1} / {project.images.length}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column - Project Info Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {/* Info Card */}
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-600" />
                    Informasi Project
                  </h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3 group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <MapPin className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Lokasi
                        </p>
                        <p className="text-sm text-blue-700">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Tahun Pengerjaan
                        </p>
                        <p className="text-sm text-blue-700">{project.year}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Klien
                        </p>
                        <p className="text-sm text-blue-700">
                          {project.client}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <Clock className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Durasi Pengerjaan
                        </p>
                        <p className="text-sm text-blue-700">
                          {project.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 group">
                      <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          Nilai Project
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          {project.value}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Status Card */}
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4">Status Project</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Progress</span>
                      <span className="font-bold">
                        {project.status === "completed"
                          ? "100%"
                          : project.status === "ongoing"
                          ? "65%"
                          : "0%"}
                      </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            project.status === "completed"
                              ? "100%"
                              : project.status === "ongoing"
                              ? "65%"
                              : "0%",
                        }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-white h-full rounded-full"
                      />
                    </div>
                    <p className="text-sm text-blue-100 mt-4">
                      {project.status === "completed"
                        ? "Project telah selesai dan diserahterimakan kepada klien."
                        : project.status === "ongoing"
                        ? "Project sedang dalam tahap pengerjaan aktif."
                        : "Project sedang dalam tahap perencanaan."}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right Column - Description & Features */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-8"
          >
            {/* Deskripsi */}
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-6">
                    Deskripsi Project
                  </h2>
                  <p className="text-blue-700 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Fitur & Spesifikasi */}
            <motion.div variants={fadeInUp}>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-6">
                    Fitur & Spesifikasi
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
                      >
                        <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-blue-900 leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="border-none shadow-2xl bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden relative">
            <CardContent className="p-12 text-center relative z-10">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="relative z-10"
              >
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Tertarik dengan Project Serupa?
                </h3>
                <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
                  Hubungi kami untuk konsultasi project konstruksi Anda.
                  <br />
                  Tim profesional ArtaJaya siap membantu mewujudkan project
                  impian Anda.
                </p>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Hubungi Kami
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold px-8 py-6 text-lg transition-all duration-300"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Kirim Email
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Projects Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            Project Lainnya
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {projectsData
              .filter((p) => p.id !== projectId)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <Card
                    className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => navigate(`/project/${relatedProject.id}`)}
                  >
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={relatedProject.image}
                          alt={relatedProject.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-bold text-lg mb-1">
                            {relatedProject.title}
                          </h4>
                          <p className="text-sm text-white/90">
                            {relatedProject.subtitle}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubDetailProject;