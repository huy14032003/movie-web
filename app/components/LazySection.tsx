"use client";
import { useEffect, useRef, useState, ReactNode } from "react";
import { gsap } from "gsap";

interface LazySectionProps {
    children: ReactNode;
    threshold?: number;
    animationType?: "fade" | "slideUp" | "slideLeft" | "scale";
}

const LazySection = ({
    children,
    threshold = 0.1,
    animationType = "slideUp"
}: LazySectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasLoaded) {
                    setIsVisible(true);
                    setHasLoaded(true);
                }
            },
            {
                threshold,
                rootMargin: "50px",
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [threshold, hasLoaded]);

    useEffect(() => {
        if (isVisible && sectionRef.current) {
            const element = sectionRef.current;

            switch (animationType) {
                case "fade":
                    gsap.fromTo(
                        element,
                        { opacity: 0 },
                        { opacity: 1, duration: 0.8, ease: "power2.out" }
                    );
                    break;
                case "slideUp":
                    gsap.fromTo(
                        element,
                        { opacity: 0, y: 50 },
                        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
                    );
                    break;
                case "slideLeft":
                    gsap.fromTo(
                        element,
                        { opacity: 0, x: 50 },
                        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
                    );
                    break;
                case "scale":
                    gsap.fromTo(
                        element,
                        { opacity: 0, scale: 0.9 },
                        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" }
                    );
                    break;
            }
        }
    }, [isVisible, animationType]);

    return (
        <div ref={sectionRef} className="will-change-transform">
            {hasLoaded ? children : <div className="h-64 bg-transparent" />}
        </div>
    );
};

export default LazySection;
