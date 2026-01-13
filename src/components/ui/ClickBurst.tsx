import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    element: HTMLDivElement;
    color: string;
}

const ClickBurst = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spawnParticles = (x: number, y: number) => {
            const particleCount = 12; // Mini white dots

            for (let i = 0; i < particleCount; i++) {
                const el = document.createElement("div");
                // Adjusted size: w-2 h-2 is 8px (smaller than 12px, larger than original 6px)
                el.className = "fixed pointer-events-none w-2 h-2 bg-white rounded-full z-[10000]";
                container.appendChild(el);

                // Random angle and velocity for "shooting out"
                const angle = Math.random() * Math.PI * 2;
                // Increased speed: 4 to 10 range
                const velocity = 4 + Math.random() * 6;

                particlesRef.current.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    life: 1.0, // Used for scale optionally, but not for removal
                    element: el,
                    color: "white"
                });
            }
        };

        const handleInteraction = (e: MouseEvent | TouchEvent) => {
            const target = e.target as HTMLElement;
            // Don't trigger if clicking a button or link
            if (target.closest("button") || target.closest("a") || target.closest("[role='button']")) {
                return;
            }

            let clientX, clientY;
            if (window.TouchEvent && e instanceof TouchEvent) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else if (e instanceof MouseEvent) {
                clientX = e.clientX;
                clientY = e.clientY;
            } else {
                return;
            }

            spawnParticles(clientX, clientY);
        };

        const updateParticles = () => {
            const gravity = 0.5;
            const width = window.innerWidth;
            const height = window.innerHeight;

            // Filter out particles that have fallen off screen
            particlesRef.current = particlesRef.current.filter((p) => {
                // Apply physics
                p.vy += gravity; // Gravity
                p.x += p.vx;
                p.y += p.vy;

                // Collision with walls (hitting side of screen)
                if (p.x <= 0 || p.x >= width) {
                    p.vx *= -0.6; // Bounce with dampening
                    p.x = Math.max(0, Math.min(width, p.x));
                }

                // Removed life decay logic so they stay visible
                // p.life -= 0.015;

                // Update DOM
                // Keep them visible until they fall past the bottom
                if (p.y < height + 50) {
                    gsap.set(p.element, {
                        x: p.x,
                        y: p.y,
                        opacity: 1, // Stay full opacity
                        scale: 1 // Stay full size
                    });
                    return true;
                } else {
                    // Cleanup when off screen
                    if (p.element.parentNode === container) {
                        container.removeChild(p.element);
                    }
                    return false;
                }
            });
        };

        gsap.ticker.add(updateParticles);

        // Use click for desktop, touchend for mobile to capture the "tap"
        window.addEventListener("click", handleInteraction);
        // We might want to use pointerup to handle both, but click is safer for "ignoring clicks on buttons" which consume events? 
        // Actually, simple click is fine for desktop. For mobile, click also fires after tap.
        // Let's rely on 'click' bubbling up.

        return () => {
            gsap.ticker.remove(updateParticles);
            window.removeEventListener("click", handleInteraction);
            // Cleanup remaining particles
            particlesRef.current.forEach(p => {
                if (p.element.parentNode === container) container.removeChild(p.element);
            });
        };
    }, []);

    return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" />;
};

export default ClickBurst;
