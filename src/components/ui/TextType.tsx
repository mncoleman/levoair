import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextTypeProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TextType({ text, className, delay = 0, speed = 50 }: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <span className={cn(className)}>
      {displayedText}
      {started && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
