"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionEyebrow } from "@/components/regent/ui/primitives";

const GALLERY_IMAGES = [
  { src: "/regent/about/gallery-01.jpg", alt: "Regent Technologies workspace" },
  { src: "/regent/about/gallery-02.jpg", alt: "Precision sharpening tools" },
  { src: "/regent/about/gallery-03.jpg", alt: "Industrial equipment setup" },
  { src: "/regent/about/gallery-04.jpg", alt: "Advanced machinery" },
  { src: "/regent/about/gallery-05.jpg", alt: "Quality control process" },
  { src: "/regent/about/gallery-06.jpg", alt: "Expert technician at work" },
];

const BASE_RATE = 0.8;
const CONTROL_RATE = 6;
const CONTROL_DURATION = 1200;

export function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);
  const currentRateRef = useRef(BASE_RATE);
  const targetRateRef = useRef(BASE_RATE);
  const boostTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstGroup = track?.firstElementChild;

    if (
      !(track instanceof HTMLDivElement) ||
      !(firstGroup instanceof HTMLElement)
    ) {
      return;
    }

    let rateFrame = 0;

    const createAnimation = () => {
      const groupWidth = firstGroup.offsetWidth;
      const previousAnimation = animationRef.current;
      const previousTime = previousAnimation?.currentTime ?? 0;

      previousAnimation?.cancel();

      const duration = Math.max((groupWidth / 25) * 1000, 18000);
      const nextAnimation = track.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(-${groupWidth}px, 0, 0)` },
        ],
        {
          duration,
          easing: "linear",
          iterations: Infinity,
        },
      );

      nextAnimation.currentTime =
        typeof previousTime === "number" ? previousTime % duration : 0;
      nextAnimation.playbackRate = currentRateRef.current;
      animationRef.current = nextAnimation;
    };

    const easeRate = () => {
      const animation = animationRef.current;

      if (animation) {
        currentRateRef.current +=
          (targetRateRef.current - currentRateRef.current) * 0.12;
        animation.playbackRate = currentRateRef.current;
      }

      rateFrame = window.requestAnimationFrame(easeRate);
    };

    createAnimation();

    const resizeObserver = new ResizeObserver(createAnimation);
    resizeObserver.observe(firstGroup);
    rateFrame = window.requestAnimationFrame(easeRate);

    return () => {
      window.cancelAnimationFrame(rateFrame);
      resizeObserver.disconnect();
      animationRef.current?.cancel();
      animationRef.current = null;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (boostTimerRef.current !== null) {
        window.clearTimeout(boostTimerRef.current);
      }
    };
  }, []);

  function moveCarousel(direction: "previous" | "next") {
    targetRateRef.current =
      direction === "previous" ? -CONTROL_RATE : CONTROL_RATE;

    if (boostTimerRef.current !== null) {
      window.clearTimeout(boostTimerRef.current);
    }

    boostTimerRef.current = window.setTimeout(() => {
      targetRateRef.current = BASE_RATE;
    }, CONTROL_DURATION);
  }

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 md:px-12 md:py-[104px]">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <SectionEyebrow label="Gallery" />
          <h2 className="mt-3 text-3xl font-bold leading-tight md:text-[40px]">
            Our Facilities & Operations
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            Explore our state-of-the-art sharpening equipment, advanced
            machinery, and expert team in action delivering precision solutions
            for industrial cutting tools.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => moveCarousel("previous")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-[var(--regent-red)] hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => moveCarousel("next")}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white hover:bg-[var(--regent-red)] hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="gallery-carousel-mask overflow-hidden rounded-2xl">
        <div className="gallery-carousel-track" ref={trackRef}>
          <div className="gallery-carousel-group">
            {GALLERY_IMAGES.map((image) => (
              <div
                key={image.src}
                className="relative h-[320px] w-[560px] shrink-0 overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 560px"
                />
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="gallery-carousel-group">
            {GALLERY_IMAGES.map((image) => (
              <div
                key={`${image.src}-duplicate`}
                className="relative h-[320px] w-[560px] shrink-0 overflow-hidden rounded-xl"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 560px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
