// CardProject Component
// import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { projects } from "@/assets/data/projects";
import { MoveRight } from 'lucide-react';

interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

export default function CardProject() {
  const getRandomProjects = (arr: Project[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Ambil cukup banyak project untuk melihat pola (misalnya 12 untuk 2 set pola 6)
  const randomProjects = getRandomProjects(projects, 6);

  return (
    // Gunakan flexbox seperti .ce_projects
    <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-6" style={{ '--base': '1rem' } as React.CSSProperties}> 
      {randomProjects.map((project, index) => {
        // Tentukan lebar berdasarkan pola 6n dari CSS
        let widthClass = "basis-[calc(25%-var(--base))]"; // Default 1/4 lebar (menyesuaikan gap)
        let heightClass = "h-[200px]"; // Default tinggi kecil

        // Cocokkan dengan pola CSS: 6n+1, 6n+3, 6n+5, 6n+6 -> 1/4 (kecil), 6n+2, 6n+4 -> 1/2 (besar)
        if (index % 6 === 1 || index % 6 === 3) { 
          widthClass = "basis-[calc(50%-var(--base))]"; 
          heightClass = "h-[400px]"; 
        }


        return (
          <div key={project.id} className={`${widthClass} mb-2`}>
            <a href="#" className="block h-full">
              <Card className="rounded-none overflow-hidden pt-0 shadow-none border-none h-full flex flex-col group">
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full object-cover ${heightClass} transition-transform duration-300 hover:scale-110`}
                  />
                </div>

                <CardHeader>
                  <CardTitle className="px-2 text-blue-900">{project.title}</CardTitle>
                  <CardDescription className="text-[16px] text-blue-900 px-2 pt-3">
                    {project.description}
                  </CardDescription>
                  <MoveRight size={24} className="text-blue-900/50 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-active:scale-110 transition-all duration-300 ml-2 inline-block" />
                </CardHeader>
              </Card>
            </a>
          </div>
        );
      })}
    </div>
  );
}