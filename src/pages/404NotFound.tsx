import SplitText from "@/components/split-text";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-4">

      {/* 404 LOOPING */}
      <SplitText
        text="404"
        splitType="chars"
        triggerOnMount={true}
        loop={true}
        loopDelay={0.5}
        yoyo={true}
        className="text-5xl font-semibold text-center text-blue-900"
        />

        <div className="flex gap-3 items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold">

        {/* NOT — biru */}
        <SplitText
            text="NOT"
            splitType="chars"
            triggerOnMount={true}
            loop={true}
            loopDelay={0.5}
            yoyo={true}
            className="text-blue-900"
        />

        {/* FOUND — merah */}
        <SplitText
            text="FOUND."
            splitType="chars"
            triggerOnMount={true}
            loop={true}
            loopDelay={0.5}
            yoyo={true}
            className="text-red-600"
        />

        </div>

        <p className="text-black text-2xl text-center mt-4">
        The page you're looking for may be removed or temporarily unavailable.
        </p>


       {/* BACK TO HOME BUTTON */}
      <Link
        to="/"
        className="
          flex items-center gap-2 mt-6 text-blue-900 text-xl font-medium
          underline hover:text-red-500 transition-colors
        "
      >
        <ArrowLeft size={22} />
        Back To Home
      </Link>
    </div>
  );
};

export default Page404;
