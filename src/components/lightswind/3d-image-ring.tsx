"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, easeOut, animate } from "framer-motion";
import { cn } from "../lib/utils";

export interface ThreeDImageRingProps {
  images: string[];
  width?: number;
  perspective?: number;
  imageDistance?: number;
  initialRotation?: number;
  animationDuration?: number;
  staggerDelay?: number;
  hoverOpacity?: number;
  containerClassName?: string;
  ringClassName?: string;
  imageClassName?: string;
  backgroundColor?: string;
  draggable?: boolean;
  ease?: string;
  mobileBreakpoint?: number;
  mobileScaleFactor?: number;
  inertiaPower?: number;
  inertiaTimeConstant?: number;
  inertiaVelocityMultiplier?: number;
  imageGap?: number;
  gapOffset?: number;
}

export function ThreeDImageRing({
  images,
  width = 300,
  perspective = 2000,
  imageDistance = 500,
  initialRotation = 180,
  animationDuration = 1.5,
  staggerDelay = 0.1,
  hoverOpacity = 0.5,
  containerClassName,
  ringClassName,
  imageClassName,
  backgroundColor,
  draggable = true,
  mobileBreakpoint = 768,
  mobileScaleFactor = 0.8,
  inertiaPower = 0.8,
  inertiaTimeConstant = 300,
  inertiaVelocityMultiplier = 20,
  gapOffset = 0,
}: ThreeDImageRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const rotationY = useMotionValue(initialRotation);
  const startX = useRef<number>(0);
  const currentRotationY = useRef<number>(initialRotation);
  const isDragging = useRef<boolean>(false);
  const velocity = useRef<number>(0);

  const [currentScale, setCurrentScale] = useState(1);
  const [showImages, setShowImages] = useState(false);

  const angle = useMemo(() => {
    const effectiveAngle = 360 - gapOffset;
    return effectiveAngle / images.length;
  }, [images.length, gapOffset]);

  const getBgPos = (imageIndex: number, currentRot: number, scale: number) => {
    const scaledImageDistance = imageDistance * scale;
    const effectiveRotation = currentRot - 180 - imageIndex * angle;
    const parallaxOffset = ((effectiveRotation % 360 + 360) % 360) / 360;
    return `${-(parallaxOffset * (scaledImageDistance / 1.5))}px 0px`;
  };

  useEffect(() => {
    const unsubscribe = rotationY.on("change", (latestRotation) => {
      if (ringRef.current) {
        Array.from(ringRef.current.children).forEach((imgElement, i) => {
          (imgElement as HTMLElement).style.backgroundPosition = getBgPos(
            i,
            latestRotation,
            currentScale
          );
        });
      }
      currentRotationY.current = latestRotation;
    });
    return () => unsubscribe();
  }, [rotationY, images.length, imageDistance, currentScale, angle]);

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const newScale = viewportWidth <= mobileBreakpoint ? mobileScaleFactor : 1;
      setCurrentScale(newScale);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileBreakpoint, mobileScaleFactor]);

  useEffect(() => {
    setShowImages(true);
  }, []);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (!draggable) return;
    isDragging.current = true;
    const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
    startX.current = clientX;
    rotationY.stop();
    velocity.current = 0;
    if (ringRef.current) {
      (ringRef.current as HTMLElement).style.cursor = "grabbing";
    }
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!draggable || !isDragging.current) return;
    const clientX =
      "touches" in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;
    const deltaX = clientX - startX.current;
    velocity.current = -deltaX * 0.5;
    rotationY.set(currentRotationY.current + velocity.current);
    startX.current = clientX;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (ringRef.current) {
      ringRef.current.style.cursor = "grab";
      currentRotationY.current = rotationY.get();
    }
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);

    const initial = rotationY.get();
    const velocityBoost = velocity.current * inertiaVelocityMultiplier;
    const target = initial + velocityBoost;

    animate(initial, target, {
      type: "inertia",
      velocity: velocityBoost,
      power: inertiaPower,
      timeConstant: inertiaTimeConstant,
      restDelta: 0.5,
      modifyTarget: (target) => Math.round(target / angle) * angle,
      onUpdate: (latest) => rotationY.set(latest),
    });

    velocity.current = 0;
  };

  const imageVariants = {
    hidden: { y: 200, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-full overflow-hidden select-none relative", // ✅ overflow-hidden biar gak bisa geser
        containerClassName
      )}
      style={{
        backgroundColor,
        transform: `scale(${currentScale})`,
        transformOrigin: "center center",
        clipPath: "inset(0 0 0 0)", // ✅ DITAMBAHKAN — memastikan elemen yang keluar viewport dipotong
      }}
      onMouseDown={draggable ? handleDragStart : undefined}
      onTouchStart={draggable ? handleDragStart : undefined}
    >
      {/* ✅ DITAMBAHKAN WRAPPER BARU: scene container */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-hidden" // ✅ overflow-hidden lagi untuk layer 3D
        style={{ perspective: `${perspective}px` }}
      >
        <div
          className="relative"
          style={{
            width: `${width}px`,
            height: `${width * 1.33}px`,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            ref={ringRef}
            className={cn("absolute inset-0", ringClassName)}
            style={{
              transformStyle: "preserve-3d",
              rotateY: rotationY,
              cursor: draggable ? "grab" : "default",
            }}
          >
            <AnimatePresence>
              {showImages &&
                images.map((imageUrl, index) => (
                  <motion.div
                    key={index}
                    className={cn("w-full h-full absolute", imageClassName)}
                    style={{
                      transformStyle: "preserve-3d",
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: "fill",
                      backgroundRepeat: "no-repeat",
                      backfaceVisibility: "hidden",
                      rotateY: index * -angle,
                      z: -imageDistance * currentScale,
                      transformOrigin: `50% 50% ${imageDistance * currentScale}px`,
                      backgroundPosition: getBgPos(index, currentRotationY.current, currentScale),
                    }}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={imageVariants}
                    custom={index}
                    transition={{
                      delay: index * staggerDelay,
                      duration: animationDuration,
                      ease: easeOut,
                    }}
                    whileHover={{ opacity: 1, transition: { duration: 0.15 } }}
                    onHoverStart={() => {
                      if (isDragging.current) return;
                      if (ringRef.current) {
                        Array.from(ringRef.current.children).forEach((imgEl, i) => {
                          if (i !== index) {
                            (imgEl as HTMLElement).style.opacity = `${hoverOpacity}`;
                          }
                        });
                      }
                    }}
                    onHoverEnd={() => {
                      if (isDragging.current) return;
                      if (ringRef.current) {
                        Array.from(ringRef.current.children).forEach((imgEl) => {
                          (imgEl as HTMLElement).style.opacity = `1`;
                        });
                      }
                    }}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ThreeDImageRing;
