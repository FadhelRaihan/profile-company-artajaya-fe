"use client";

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
    id: number;
    image: string;
    title: string;
    location: string;
    category: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
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

      // Gandakan konten untuk efek infinite scroll
      scrollerContent.forEach((item) => {
        const duplicated = item.cloneNode(true) as HTMLElement;
        
        // Re-attach event handlers untuk cloned items
        const link = duplicated.querySelector('a');
        if (link) {
          const id = link.getAttribute('data-project-id');
          link.onclick = (e) => {
            e.preventDefault();
            window.location.href = `/sub-detail-project/${id}`;
          };
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
      speedMap[speed] || "40s"
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
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] md:w-[450px] shrink-0 overflow-hidden rounded-none bg-white dark:bg-card shadow-sm group"
          >
            <Link 
              to={`/project/${item.id}`} 
              className="block h-full"
              data-project-id={item.id}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-white group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-gray-300">
                  {item.location}
                </p>
                <p className="text-xs text-red-600 mt-1">{item.category}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};