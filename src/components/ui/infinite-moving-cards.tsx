"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  fullWidth = false, // 🔥 Prop opsional
}: {
  items: {
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
       if (scrollerRef.current.children.length === scrollerContent.length) {
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
      });
    }

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current?.appendChild(duplicatedItem);
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
          start && "animate-scroll",
          pauseOnHover && "hover:paused"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[350px] md:w-[450px] shrink-0 overflow-hidden rounded-none"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-gray-300">
                {item.location}
              </p>
              <p className="text-xs text-red-600 mt-1">{item.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
