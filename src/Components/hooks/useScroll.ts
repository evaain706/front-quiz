import { useEffect, useState, useRef } from 'react';
import type { RefObject } from 'react';

interface Args extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

function useScroll(
  options?: Args,
): [RefObject<HTMLDivElement | null>, boolean] {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);

        if (options?.freezeOnceVisible && entry.isIntersecting) {
          observer.unobserve(node);
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px',
        root: options?.root || null,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return [targetRef, isIntersecting];
}

export default useScroll;
