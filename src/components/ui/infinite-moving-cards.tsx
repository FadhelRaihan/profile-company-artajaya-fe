import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  className,
  fullWidth = false,
}: {
  items: {
    id: string; // ✅ UBAH dari number ke string (untuk UUID)
    image?: string | null;
    title: string;
    location?: string;
    category: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
  fullWidth?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicated = item.cloneNode(true) as HTMLElement;

        const link = duplicated.querySelector("a");
        if (link) {
          const id = link.getAttribute("data-project-id");
          link.addEventListener("click", (e) => {
            e.preventDefault();
            if (id) window.location.href = `/project/${id}`;
          });
        }

        scrollerRef.current?.appendChild(duplicated);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  };

  const getSpeed = () => {
    if (!containerRef.current) return;

    const speedMap = {
      fast: "20s",
      normal: "40s",
      slow: "80s",
    };

    containerRef.current.style.setProperty(
      "--animation-duration",
      speedMap[speed]
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        fullWidth
          ? "relative z-20 w-full overflow-x-hidden py-4"
          : "relative z-20 max-w-7xl overflow-hidden py-4",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-screen shrink-0 flex-nowrap gap-6",
          start && "animate-scroll"
        )}
      >
        {items.map((item) => ( // ✅ HAPUS idx, gunakan item.id sebagai key
          <li
            key={item.id} // ✅ UBAH dari idx ke item.id
            className="relative w-[350px] md:w-[450px] shrink-0 overflow-hidden bg-white dark:bg-card shadow-sm group border"
          >
            <Link
              to={`/project/${item.id}`}
              className="block h-full"
              data-project-id={item.id}
            >

              {/* Image Placeholder or Title Text */}
              <div className="relative h-48 w-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-center px-4">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.category}
                    </p>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Info Section */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-white group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-gray-300">
                  {item.location || ''}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  {item.category}
                </p>
              </div>

            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};