"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  {
    src: "/regent/about/gallery-02.jpg",
    alt: "Precision sharpening tools in operation",
  },
  {
    src: "/regent/about.png",
    alt: "Industrial blade sharpening",
  },
  {
    src: "/regent/about/gallery-06.jpg",
    alt: "Expert technician at work",
  },
];

const AUTO_PLAY_INTERVAL = 2000; // 2 seconds
const TRANSITION_DURATION = 800; // 800ms

export function AboutImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlay]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(true);

    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const handleMouseEnter = () => {
    setIsAutoPlay(false);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlay(true);
  };

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={image.src}
            className="absolute inset-0 transition-opacity duration-800"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              pointerEvents: index === currentIndex ? "auto" : "none",
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-5"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>

      {/* Slide Counter (for accessibility/UX) */}
      <div className="absolute top-4 right-4 z-20 text-white text-xs font-medium">
        <span className="sr-only">Slide</span>
        {currentIndex + 1} / {HERO_IMAGES.length}
      </div>
    </div>
  );
}
