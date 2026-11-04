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
    /** Surfaces the click started inside; the particle passes through these. */
    ignore: Set<Element>;
}

const BOUNCE_SELECTOR = "[data-burst-bounce]";
const RESTITUTION = 0.6; // fraction of speed kept after a bounce
const FRICTION = 0.92; // horizontal slowdown when skidding along a card top
const MAX_LIFE_FRAMES = 240; // ~4s at 60fps, so dots resting on a card don't linger
const FADE_FRAMES = 30;
const DOT = 8; // particle size in px (w-2 h-2); x/y is its top-left corner

const ClickBurst = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const spawnParticles = (x: number, y: number) => {
            const particleCount = 12; // Mini white dots
            const ignore = new Set<Element>(
                Array.from(document.querySelectorAll(BOUNCE_SELECTOR)).filter((el) => {
                    const r = el.getBoundingClientRect();
                    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
                })
            );

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
                    life: 0, // frames alive
                    element: el,
                    color: "white",
                    ignore,
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
            if (particlesRef.current.length === 0) return;

            // Glass cards on screen this frame. Their unrotated box is close
            // enough to the tilted card for a bounce to read correctly.
            const surfaces = Array.from(document.querySelectorAll(BOUNCE_SELECTOR))
                .map((el) => ({ el, r: el.getBoundingClientRect() }))
                .filter(({ r }) => r.bottom > 0 && r.top < height && r.width > 0);

            // Filter out particles that have fallen off screen
            particlesRef.current = particlesRef.current.filter((p) => {
                // Apply physics
                p.vy += gravity; // Gravity
                const prevX = p.x;
                const prevY = p.y;
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off glass cards, resolved by which side the dot came from.
                for (const { el, r: box } of surfaces) {
                    if (p.ignore.has(el)) continue;
                    // Grow the box by the dot size so the whole dot stops at the edge.
                    const r = { left: box.left - DOT, top: box.top - DOT, right: box.right, bottom: box.bottom };
                    const inside = p.x > r.left && p.x < r.right && p.y > r.top && p.y < r.bottom;
                    if (!inside) continue;
                    const wasInside = prevX > r.left && prevX < r.right && prevY > r.top && prevY < r.bottom;
                    if (wasInside) continue; // the card scrolled onto the dot; let it fall through
                    if (prevY <= r.top) {
                        p.y = r.top;
                        p.vy = -Math.abs(p.vy) * RESTITUTION;
                        p.vx *= FRICTION;
                    } else if (prevY >= r.bottom) {
                        p.y = r.bottom;
                        p.vy = Math.abs(p.vy) * RESTITUTION;
                    } else if (prevX <= r.left) {
                        p.x = r.left;
                        p.vx = -Math.abs(p.vx) * RESTITUTION;
                    } else {
                        p.x = r.right;
                        p.vx = Math.abs(p.vx) * RESTITUTION;
                    }
                }
                p.life += 1;

                // Collision with walls (hitting side of screen)
                if (p.x <= 0 || p.x >= width) {
                    p.vx *= -0.6; // Bounce with dampening
                    p.x = Math.max(0, Math.min(width, p.x));
                }


                // Update DOM
                // Keep them visible until they fall past the bottom
                if (p.y < height + 50 && p.life < MAX_LIFE_FRAMES) {
                    const fade = Math.min(1, (MAX_LIFE_FRAMES - p.life) / FADE_FRAMES);
                    gsap.set(p.element, {
                        x: p.x,
                        y: p.y,
                        opacity: fade,
                        scale: 1
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
