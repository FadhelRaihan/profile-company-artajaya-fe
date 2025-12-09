"use client";

import React, { useEffect, useState, useRef } from "react";

interface TestimonialItem {
  id: number;
  testerName: string;
  testimoni: string;
}

interface TestimonialCardsProps {
  items: TestimonialItem[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
}

export const TestimonialInfiniteCards: React.FC<TestimonialCardsProps> = ({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "60s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 w-full overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
      }}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap ${
          start && "animate-scroll"
        } ${pauseOnHover && "hover:[animation-play-state:paused]"}`}
      >
        {items.map((item) => (
            <li
            key={item.id}
            className="min-h-[250px] w-[500px] md:w-[450px] max-w-full relative rounded-none 
                        flex-shrink-0 px-12 py-18 
                        bg-white transition-all duration-300 hover:bg-blue-900 group shadow-xl shadow-blue-200/40 border"
            >

            <blockquote>
              <div className="relative z-20 flex flex-col gap-4">
                {/* Testimoni Text */}
                <p className="text-base leading-relaxed text-blue-900 group-hover:text-white transition-colors duration-300">
                  "{item.testimoni}"
                </p>
                
                {/* Tester Name */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-blue-900 group-hover:text-white transition-colors duration-300">
                    — {item.testerName}
                  </span>
                </div>
              </div>

              {/* Decorative Quote Icon */}
              <div className="absolute top-4 right-4 text-6xl text-blue-100 group-hover:text-blue-700 transition-colors duration-300 opacity-20">
                "
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};