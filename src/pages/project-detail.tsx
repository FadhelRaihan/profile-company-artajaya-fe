// src/pages/project-detail.tsx
import { useParams } from 'react-router-dom'; // Import useParams untuk mendapatkan id dari URL
import { projects } from '@/assets/data/projects'; // Import array project Anda
import Navbar from "@/components/navbar-profile";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoveRight } from 'lucide-react';
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

// Definisikan tipe untuk project jika belum
interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  tipe: string;
  // tambahkan properti lain sesuai kebutuhan
}

export default function ProjectDetail() {
  // Ambil id dari URL parameter
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);

if (isNaN(numericId)) {
  // Tangani kasus di mana id bukan angka
  return <div>Invalid ID</div>;
}
const project: Project | undefined = projects.find(p => p.id === numericId);

  const getRandomProjects = (arr: Project[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomProjects = getRandomProjects(projects, 4);

  // detailUrl will be computed per project item below to avoid referencing a possibly undefined `project`


  if (!project) {
    // Tampilkan pesan jika project tidak ditemukan
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Project Tidak Ditemukan</h1>
          <p className="text-gray-500">Project dengan ID <span className="font-mono">{id}</span> tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  // Tampilkan detail project
  return (
    <div className="max-w-7xl mx-auto p-4 mt-8">
        <Navbar />
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
        >
            <Button variant="outline" className="mt-20 mb-10 rounded-full px-4 py-2 border border-blue-900 text-blue-900 shadow-none hover:bg-blue-900 hover:text-white" onClick={() => window.history.back()} >
                Kembali
            </Button>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
        
        
        >
            <div className='flex flex-row gap-8'>
                {/* foto */}
                <div className='w-full'>
                    <img src={project.image} alt={project.title} className="w-full h-auto" />
                </div>
                {/* deskripsi */}
                <div className='max-w-2/4'>
                    <h1 className='text-blue-900 font-medium mb-1'>{project.tipe}</h1>
                    <h1 className="text-3xl font-bold mb-2 text-blue-900">{project.title}</h1>
                    <p className="text-gray-700">{project.description}</p>
                    <Button variant="default" className="mt-4 rounded-full px-6 py-3 bg-blue-900 text-white shadow-none hover:bg-blue-800" > Detail </Button>
                </div>
            </div>

            {/* project lainnya */}
            <div className='grid grid-cols-2 gap-4'>
                {randomProjects.map((rp)=>(
                    <Link key={rp.id} to={`/projects/${rp.id}`} className="block h-full">
                        <Card className="my-8 pt-0 rounded-none shadow-none border-none text-blue-900 group">
                            <div className='overflow-hidden'>
                                <img src={rp.image} alt={rp.title} className="w-full h-auto transition-transform duration-300 hover:scale-110" />
                            </div>
                            <CardHeader>
                                <CardTitle>{rp.title}</CardTitle>
                                <CardDescription className='text-wrap text-gray-700'>{rp.description}</CardDescription>
                            </CardHeader>
                            <MoveRight size={24} className='text-blue-900 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 group-active:scale-110 transition-all duration-300 ml-2 inline-block' />
                        </Card>
                    </Link>
                ))}
            </div>
        </motion.div>
    </div>
  );
}