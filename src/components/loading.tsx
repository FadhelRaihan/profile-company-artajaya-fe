import { useState, useEffect, type ReactNode } from "react";
import { Progress } from "@/components/ui/progress";

interface LoadingProps {
  children: ReactNode;
  loadingDuration?: number;
  isDataReady?: boolean; // Tambahan prop untuk check data ready
}

// Komponen Loading Screen Internal
const LoadingScreen = ({ progress }: { progress: number }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-8">
          {/* Persentase Display */}
          <div className="text-center mb-2">
            <span className="text-4xl font-bold text-[#003399]">
              {Math.round(progress)}
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
  isDataReady = true, // Default true jika tidak ada data fetching
}: LoadingProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 20; // Update setiap 20ms untuk animasi smooth
    const steps = loadingDuration / interval;
    const increment = 100 / steps;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;

      // Loading selesai jika progress 100% DAN data sudah ready
      if (currentProgress >= 100 && isDataReady) {
        setProgress(100);
        clearInterval(timer);
        // Delay sedikit sebelum menampilkan konten
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      } else {
        // Max 90% jika data belum ready, untuk menghindari loading selesai terlalu cepat
        setProgress(Math.min(currentProgress, isDataReady ? 100 : 90));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [loadingDuration, isDataReady]);

  // Jika masih loading, tampilkan loading screen
  if (isLoading) {
    return <LoadingScreen progress={progress} />;
  }

  // Jika loading selesai, tampilkan konten
  return <>{children}</>;
};

export default Loading;