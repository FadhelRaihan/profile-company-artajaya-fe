import Navbar from "@/components/navbar-profile";

const VmLanding: React.FC = () => {
  return (
    <div className="bg-gray-50 overflow-hidden w-full h-screen relative">
      <Navbar />
      <main className="flex flex-col justify-center h-full px-56 py-20">
        {/* Section: Visi */}
        <section className="flex flex-col w-full max-w-6xl items-start gap-2 mb-16">
          <h2 className="font-bold text-blue-700 text-4xl tracking-wide leading-normal">
            VISI
          </h2>
          <p className="font-normal text-blue-700 text-2xl tracking-wide leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>

        {/* Section: Misi */}
        <section className="flex flex-col w-full max-w-6xl items-end gap-2 ml-auto">
          <h2 className="font-bold text-blue-700 text-4xl text-right tracking-wide leading-normal">
            MISI
          </h2>
          <p className="font-normal text-blue-700 text-2xl text-right tracking-wide leading-relaxed ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </section>
      </main>
    </div>
  );
};

export default VmLanding;