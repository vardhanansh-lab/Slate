"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

const NUDGE_STEP = 5;

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
}: {
  beforeSrc: string;
  afterSrc: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);
  const [aspect, setAspect] = useState(4 / 3);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    function handleMove(event: MouseEvent | TouchEvent) {
      if (!draggingRef.current) return;
      const clientX = "touches" in event ? event.touches[0]?.clientX : event.clientX;
      if (typeof clientX === "number") updateFromClientX(clientX);
    }
    function handleUp() {
      draggingRef.current = false;
    }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [updateFromClientX]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((p) => Math.max(0, p - NUDGE_STEP));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((p) => Math.min(100, p + NUDGE_STEP));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  }

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label="Before/after comparison position"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      onKeyDown={handleKeyDown}
      className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-xl border border-border bg-tint/30 outline-none focus-visible:ring-4 focus-visible:ring-accent/25"
      style={{ aspectRatio: aspect }}
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        const touch = e.touches[0];
        if (touch) updateFromClientX(touch.clientX);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterSrc}
        alt="Enhanced"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setAspect(img.naturalWidth / img.naturalHeight);
          }
        }}
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt="Original"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="h-full w-0.5 -translate-x-1/2 bg-white shadow" />
        <div className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent shadow-md">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 7 4 12l4 5M16 7l4 5-4 5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-micro font-medium text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-micro font-medium text-white">
        After
      </span>
    </div>
  );
}
