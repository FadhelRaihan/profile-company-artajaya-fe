import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { projectsData } from "../assets/data/projects";

interface Project {
  id: string | number;
  image: string;
  title: string;
  description: string;
}

// Remove Scroll indicator while navbar is open
const handleNavClick = () => {
  window.dispatchEvent(new Event("navbar-click"));
};

const getRandomProjects = (arr: Project[], count: number): Project[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random()) as Project[];
  return shuffled.slice(0, count);
};

const menuVariants = {
  closed: {
    y: "-100%",
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut" as const,
    },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const randomProjects = getRandomProjects(projectsData, 2);

  // Deteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll ke section setelah navigasi
  useEffect(() => {
    // Cek apakah ada hash di URL (misalnya #section7)
    if (location.hash) {
      // Tunggu sebentar agar halaman ter-render
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Fungsi untuk navigasi ke landing page dan scroll ke section
  const navigateToSection = (sectionId: string) => {
  closeMenu();
  handleNavClick();
  
  // Cek apakah sudah di halaman landing
  if (location.pathname === '/') {
    // Jika sudah di landing, langsung scroll
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  } else {
    // Jika belum di landing, navigasi ke landing tanpa hash dan scroll ke section
    navigate(`/landing`);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
};

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center md:px-32 md:py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 backdrop-blur-md border border-white/5 rounded-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="p-2 rounded-xl">
        <Menu
          onClick={() => {
            toggleMenu();
            handleNavClick();
          }}
          className="text-[#00297A] size-[30px] focus:outline-none z-50 cursor-pointer"
        />
      </div>

      <div className="flex items-center">
        <Link to="/" onClick={() => {closeMenu(); handleNavClick();}}>
          <div className="w-full h-full px-5 py-2 bg-red-600 text-white flex items-center justify-center font-bold cursor-pointer">
            <img src={Icon} alt="icon" className="w-[30px]" />
          </div>
        </Link>
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
                  onClick={() => {
                    closeMenu();
                    handleNavClick();
                  }}
                  className="text-[#003399] size-[30px] focus:outline-none z-50 cursor-pointer"
                />
              </div>

              <div className="flex items-center">
                <div className="w-full h-full px-5 py-2 bg-red-600 text-white flex items-center justify-center font-bold">
                  <img src={Icon} alt="icon" className="w-[30px]" />
                </div>
              </div>
            </div>

            <div className="flex flex-row px-12 p-4 items-start justify-between gap-8 text-[#00297A] md:px-32 md:mt-8">
              <div className="flex flex-col gap-30">
                <div className="flex flex-col gap-5 m-6">
                  <a
                    href="/project-pages"
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition"
                    onClick={() => {
                      handleNavClick();
                      closeMenu();
                    }}
                  >
                    Projects
                  </a>
                  <button
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition"
                    onClick={() => {
                      navigateToSection('section3')
                      handleNavClick();
                    }}
                  >
                    Tentang Kami
                  </button>
                  <a
                    href="/team-activity-section"
                    onClick={() => { 
                      handleNavClick();
                    }}
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition text-left"
                  >
                    Tim Kami
                  </a>
                  <button
                    onClick={() => navigateToSection('section7')}
                    className="text-2xl md:text-5xl font-semibold hover:text-[#B0C0DF] transition text-left"
                  >
                    Kontak Kami
                  </button>
                </div>

                <div className="flex items-center justify-start gap-10 text-[#000000]">
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <Instagram />
                  </a>
                  <h1 className="text-xl md:text-2xl mt-2">Indonesia Bandung</h1>
                </div>
              </div>

              {/* Project Cards dengan Link ke Detail */}
              <div className="grid grid-cols-2 gap-8">
                {randomProjects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/project/${project.id}`}
                    onClick={closeMenu}
                    className="block"
                  >
                    <Card
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
                        <p className="text-[#000000] text-sm leading-relaxed text-justify">
                          {project.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
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