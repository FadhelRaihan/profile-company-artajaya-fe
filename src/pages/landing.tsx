import React from "react";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";

const Landing: React.FC = () => {
  return (
    <Loading loadingDuration={2000}>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold">Welcome to Home</h1>
        <p>Ini adalah halaman home</p> */}
      </div>
    </Loading>
  );
};

export default Landing;
