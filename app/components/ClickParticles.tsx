"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ClickParticles = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const x = e.clientX;
            const y = e.clientY;
            const particleCount = 15;

            // Tạo particles
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                particle.className = "particle";

                // Random size
                const size = Math.random() * 6 + 4;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;

                // Position tại điểm click
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.position = "fixed";
                particle.style.borderRadius = "50%";
                particle.style.pointerEvents = "none";
                particle.style.zIndex = "999999";

                // Random colors - cyan/blue theme
                const colors = [
                    "#00d9ff",
                    "#00b4d8",
                    "#0096c7",
                    "#0077b6",
                    "#48cae4",
                    "#90e0ef",
                ];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.boxShadow = `0 0 ${size}px ${particle.style.background}`;

                containerRef.current.appendChild(particle);

                // Random direction và distance
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = Math.random() * 100 + 50;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                // GSAP animation với physics
                gsap.to(particle, {
                    x: tx,
                    y: ty,
                    opacity: 0,
                    scale: 0,
                    duration: 0.8 + Math.random() * 0.4,
                    ease: "power2.out",
                    onComplete: () => {
                        particle.remove();
                    },
                });
            }

            // Ripple effect tại điểm click
            const ripple = document.createElement("div");
            ripple.style.position = "fixed";
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.width = "10px";
            ripple.style.height = "10px";
            ripple.style.borderRadius = "50%";
            ripple.style.border = "2px solid #00d9ff";
            ripple.style.transform = "translate(-50%, -50%)";
            ripple.style.pointerEvents = "none";
            ripple.style.zIndex = "999999";

            containerRef.current.appendChild(ripple);

            gsap.to(ripple, {
                width: 80,
                height: 80,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                onComplete: () => {
                    ripple.remove();
                },
            });
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-[999999]"
            style={{ isolation: 'isolate' }}
        />
    );
};

export default ClickParticles;
