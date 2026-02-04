"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CursorTrail = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: mousePosition.current.x,
          y: mousePosition.current.y,
          duration: 0.1,
          ease: "power2.out",
        });
      }

      trailsRef.current.forEach((trail, index) => {
        if (trail) {
          gsap.to(trail, {
            x: mousePosition.current.x,
            y: mousePosition.current.y,
            duration: 0.3 + index * 0.05,
            ease: "power2.out",
          });
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-999999">
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-60 blur-[2px]" />
      </div>

      {/* Trail particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: 0, top: 0 }}
        >
          <div
            className="rounded-full bg-gradient-to-r from-orange-400 to-red-400"
            style={{
              width: `${8 - i}px`,
              height: `${8 - i}px`,
              opacity: 0.4 - i * 0.04,
              filter: `blur(${i * 0.5}px)`,
            }}
          />
        </div>
      ))}

      {/* Glow effect */}
      <div
        ref={(el) => {
          if (el) trailsRef.current[8] = el;
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: 0, top: 0 }}
      >
        <div className="w-12 h-12 bg-red-500 rounded-full opacity-10 blur-xl" />
      </div>
    </div>
  );
};

export default CursorTrail;
