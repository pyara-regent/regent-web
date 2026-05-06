"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const safeImages = images.slice(0, 3);
  const [active, setActive] = useState(0);
  const image = safeImages[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-black/8 bg-white">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-contain p-6"
            fetchPriority="high"
            loading="eager"
          />
        ) : (
          <span className="text-sm font-semibold text-[var(--muted)]">Image coming soon</span>
        )}
      </div>
      {safeImages.length > 1 ? (
        <div className="flex gap-3">
          {safeImages.map((item, index) => (
            <button
              key={item}
              className={`relative size-20 overflow-hidden rounded-lg border bg-white transition-colors ${
                active === index ? "border-[var(--regent-red)]" : "border-black/10"
              }`}
              onClick={() => setActive(index)}
              type="button"
            >
              <Image src={item} alt="" fill sizes="80px" className="object-contain p-2" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
