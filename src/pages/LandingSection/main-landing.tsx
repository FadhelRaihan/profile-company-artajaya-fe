import React from "react";
import Loading from "@/components/loading";
import Navbar from "@/components/navbar-profile";

const Landing: React.FC = () => {
  return (
    <Loading loadingDuration={2000}>
      <div className="relative h-screen w-full overflow-hidden">
        <Navbar />

        {/* Content Container - Centered Left */}
        <div className="absolute left-56 top-1/2 -translate-y-1/2 max-w-5xl">
          {/* Section: Welcome */}
          <div className="text-blue-900 text-3xl font-medium mb-8">
            / Selamat Datang di ArtaJaya
          </div>

          {/* Section: Headline */}
          <div>
            <span className="text-blue-900 text-9xl font-semibold leading-tight">
              Konsultan{" "}
            </span>
            <span className="text-red-600 text-9xl font-semibold leading-tight">
              Arsitektur
            </span>
            <span className="text-blue-900 text-9xl font-semibold leading-tight">
              {" "}
              dan{" "}
            </span>
            <span className="text-red-600 text-9xl font-semibold leading-tight">
              Konstruksi
            </span>
            <span className="text-blue-900 text-9xl font-semibold leading-tight">
              .
            </span>
          </div>
        </div>

        {/* Section: Scroll Indicator */}
        <div className="absolute right-8 bottom-16 -translate-y-1/2 -rotate-90 text-blue-900 text-base font-medium">
          SCROLL
        </div>
      </div>
    </Loading>
  );
};

export default Landing;