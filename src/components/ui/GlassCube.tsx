import { useRef, useEffect, useMemo } from 'react';

interface GlassCubeProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  tiltMax?: number;
  pulse?: boolean;
  wobbleAngle?: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function GlassCube({
  children,
  className = '',
  depth = 36,
  tiltMax = 25,
  pulse = false,
  wobbleAngle = 0,
}: GlassCubeProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);

  const s = useRef({
    rx: 0,
    ry: 0,
    tRx: 0,
    tRy: 0,
    hover: false,
    pulsePhase: 0,
    pulseActive: false,
    wobblePhase: 0,
    wobbleActive: true,
    wobbleAngle: wobbleAngle,
  });

  useEffect(() => {
    if (pulse && !s.current.hover) {
      s.current.pulseActive = true;
      s.current.pulsePhase = 0;
    }
  }, [pulse]);

  const slices = useMemo(() => {
    const count = Math.max(8, Math.round(depth / 3));
    const layers = [];
    for (let i = 0; i <= count; i++) {
      layers.push((i / count) * depth);
    }
    return layers;
  }, [depth]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      s.current.tRy = (nx - 0.5) * 2 * tiltMax;
      s.current.tRx = -(ny - 0.5) * 2 * tiltMax;
    };

    const onEnter = () => {
      s.current.hover = true;
      s.current.pulseActive = false;
    };
    const onLeave = () => {
      s.current.hover = false;
      s.current.tRx = 0;
      s.current.tRy = 0;
    };

    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mouseleave', onLeave);

    const animate = () => {
      const st = s.current;

      if (st.wobbleActive && !st.hover) {
        st.wobblePhase += 0.05;
        const decay = Math.exp(-st.wobblePhase * 0.8);
        const wave = Math.sin(st.wobblePhase * 3) * decay;
        st.tRy = wave * tiltMax * Math.cos(st.wobbleAngle);
        st.tRx = wave * tiltMax * Math.sin(st.wobbleAngle);
        if (decay < 0.01) {
          st.wobbleActive = false;
          st.tRx = 0;
          st.tRy = 0;
        }
      }

      if (st.pulseActive && !st.hover) {
        st.pulsePhase += 0.04;
        if (st.pulsePhase >= Math.PI) {
          st.pulseActive = false;
          st.pulsePhase = 0;
        } else {
          const wave = Math.sin(st.pulsePhase);
          st.tRy = wave * (tiltMax * 0.5);
          st.tRx = wave * (tiltMax * -0.25);
        }
      }

      const speed = st.hover ? 0.12 : 0.08;
      st.rx = lerp(st.rx, st.tRx, speed);
      st.ry = lerp(st.ry, st.tRy, speed);

      if (cubeRef.current) {
        cubeRef.current.style.transform =
          `translateZ(${-depth / 2}px) rotateX(${st.rx}deg) rotateY(${st.ry}deg)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mouseleave', onLeave);
    };
  }, [tiltMax, depth]);

  const r = 16;

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{ perspective: '800px' }}
    >
      <div
        ref={cubeRef}
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          position: 'relative',
          height: '100%',
        }}
      >
        {slices.map((z, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: `${r}px`,
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              transform: `translateZ(${z}px)`,
              backfaceVisibility: 'hidden',
            }}
          />
        ))}

        <div
          style={{
            position: 'relative',
            height: '100%',
            borderRadius: `${r}px`,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(12px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.4)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transform: `translateZ(${depth}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
