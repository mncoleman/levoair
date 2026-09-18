import { useEffect, useMemo, useRef, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';

interface ScrollFloatProps {
  children: ReactNode;
  triggerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  stagger?: number;
  threshold?: number;
}

const ScrollFloat = ({
  children,
  triggerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  stagger = 0.03,
  threshold = 0.01,
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const hasPlayedRef = useRef(false);

  // Characters are animated individually, but grouped per word so that
  // line wrapping only happens at spaces (never mid-word on narrow screens).
  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(' ').map((word, wordIndex, words) => (
      <span className="inline-block whitespace-nowrap" key={wordIndex}>
        {word.split('').map((char, charIndex) => (
          <span className="inline-block sf-char" key={charIndex}>
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span className="inline-block sf-char">{'\u00A0'}</span>
        )}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const charElements = el.querySelectorAll('.sf-char');

    gsap.set(charElements, {
      opacity: 0,
      yPercent: 120,
      scaleY: 2.3,
      scaleX: 0.7,
      transformOrigin: '50% 0%',
    });

    const animateIn = () => {
      if (hasPlayedRef.current) return;
      tweenRef.current?.kill();
      hasPlayedRef.current = true;
      tweenRef.current = gsap.to(charElements, {
        duration: animationDuration,
        ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger,
      });
      observer.disconnect();
    };

    const observeTarget = triggerRef?.current || el;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateIn();
          }
        });
      },
      { threshold }
    );

    observer.observe(observeTarget);

    return () => {
      observer.disconnect();
      tweenRef.current?.kill();
    };
  }, [triggerRef, animationDuration, ease, stagger, threshold]);

  return (
    <h2 ref={containerRef} className={`overflow-hidden pb-2 ${containerClassName}`}>
      <span className={`inline-block leading-[1.3] ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;
