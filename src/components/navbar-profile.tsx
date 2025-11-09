// src/components/navbar.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Instagram } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import Icon from '@/assets/icons/logo.png';
import { projects } from "../assets/data/projects";

// Fungsi untuk mengambil 2 item acak dari array
interface Project {
  id: string | number;
  image: string;
  title: string;
  description: string;
}

const getRandomProjects = (arr: Project[], count: number): Project[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random()) as Project[];
  return shuffled.slice(0, count);
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const randomProjects = getRandomProjects(projects, 2);

  const menuVariants = {
    closed: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeInOut" as const,
      },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center md:px-32 md:py-8">
      <div className="bg-white p-2 rounded-xl">
        <Menu
          onClick={toggleMenu}
          className="text-[#00297A] size-[30px] focus:outline-none z-50 cursor-pointer"
        />
      </div>

      <div className="flex items-center">
        <div className="w-full h-full px-5 py-2 bg-red-600 text-white flex items-center justify-center font-bold">
          <img src={Icon} alt="icon" className="w-[30px]" />
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 z-40"
          onClick={closeMenu}
        ></div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 w-full h-screen bg-white z-50 overflow-y-auto flex flex-col"
          >
            <div className="top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center md:px-32 md:py-8">
              <div className="p-2 rounded-xl">
                <X
                  onClick={closeMenu}
                  className="text-[#00297A] size-[30px] focus:outline-none z-50 cursor-pointer"
                />
              </div>

              <div className="flex items-center">
                <div className="w-full h-full px-5 py-2 bg-red-600 text-white flex items-center justify-center font-bold">
                  <img src={Icon} alt="icon" className="w-[30px]" />
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-row px-8 ml-15 items-center justify-between gap-8 text-[#00297A] md:px-32">
              <div className="flex flex-col gap-30">
                <div className="flex flex-col gap-5">
                  <a
                    href="/project"
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition"
                    onClick={closeMenu}
                  >
                    Projects
                  </a>
                  <a
                    href="#about"
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition"
                    onClick={closeMenu}
                  >
                    Tentang Kami
                  </a>
                  <a
                    href="#team"
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition"
                    onClick={closeMenu}
                  >
                    Tim Kami
                  </a>
                  <a
                    href="#contact"
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition"
                    onClick={closeMenu}
                  >
                    Kontak Kami
                  </a>
                </div>

                <div className="flex items-center justify-start gap-10 text-[#000000]">
                  <a href="www.instagram.com">
                    <Instagram />
                  </a>
                  <h1 className="text-xl md:text-2xl">Indonesia Bandung</h1>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {randomProjects.map((project) => (
                  <Card
                    key={project.id}
                    className="w-72 max-w-sm overflow-hidden hidden bg-transparent border-none shadow-none md:block"
                  >
                    {/* Gambar */}
                    <div className="w-72 overflow-hidden mb-5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full object-cover transition-transform duration-300 hover:scale-125"
                      />
                    </div>

                    {/* Header */}
                    <CardHeader className="flex flex-col gap-0">
                      <CardDescription className="text-xs font-medium uppercase tracking-wide text-[#000000]">
                        Project Terbaru
                      </CardDescription>
                      <CardTitle className="text-xl font-bold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>

                    {/* Content */}
                    <CardContent>
                      <p className="text-[#000000] text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
