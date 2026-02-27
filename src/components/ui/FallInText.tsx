import { useEffect, useState } from 'react';

interface FallInTextProps {
  text: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FallInText({ text, duration = 800, delay = 0, className = '' }: FallInTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay + 50);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-40px)',
        transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1), transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
      }}
    >
      {text}
    </span>
  );
}
