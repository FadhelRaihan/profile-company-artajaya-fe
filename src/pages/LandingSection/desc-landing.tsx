import React from "react";
import Navbar from "@/components/navbar-profile";

const DescLanding: React.FC = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden">
            <Navbar />

            <div className="absolute left-56 top-1/2 -translate-y-1/2 max-w-5xl">
                <h2 className="text-4xl text-[#003399] text-justify">
                    <span className="font-bold">Arta Jaya Konstruksi</span> adalah perusahaan konsultan dan penyedia jasa konstruksi yang berfokus pada kualitas, ketepatan, dan inovasi. Bersama para klien, kami membangun proyek yang kokoh, fungsional, serta berdaya guna tinggi dalam menghadapi dinamika kebutuhan modern. Kami memadukan keahlian teknis, pemikiran strategis, dan efisiensi pelaksanaan untuk menghadirkan hasil yang tidak hanya terlihat kuat, tetapi juga nyata memberi dampak.
                </h2>
            </div>
        </div>
    );
};

export default DescLanding;
