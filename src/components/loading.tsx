import { useState, useEffect, type ReactNode } from "react";
import { Progress } from "@/components/ui/progress";

interface Loading {
  children: ReactNode;
  loadingDuration?: number;
}

// Komponen Loading Screen Internal
const LoadingScreen = ({ progress }: { progress: number }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-8">
          {/* Persentase Display */}
          <div className="text-center mb-2">
            <span className="text-4xl font-bold text-[#003399]">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

// Komponen Utama: PageWithLoading
const Loading = ({
  children,
  loadingDuration = 2000,
}: {
  children: React.ReactNode;
  loadingDuration?: number;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 20; // Update setiap 20ms untuk animasi smooth
    const steps = loadingDuration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;

      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(timer);
        // Delay sedikit sebelum menampilkan konten
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [loadingDuration]);

  // Jika masih loading, tampilkan loading screen
  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  // Jika loading selesai, tampilkan konten
  return <>{children}</>;
};

export default Loading;
