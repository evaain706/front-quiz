import { useEffect, useRef } from 'react';

interface useInfiniteScrollType {
  loading: boolean;
  hasNextPage: boolean;
  threshold?: number;

  onLoadMore: () => void;
}

const useInfiniteScroll = ({
  loading,
  hasNextPage,
  threshold = 150,
  onLoadMore,
}: useInfiniteScrollType) => {
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !hasNextPage) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        onLoadMore();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: `0px 0px ${threshold}px 0px`,
      threshold: 0,
    });

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [loading, hasNextPage, onLoadMore, threshold]);

  return targetRef;
};

export default useInfiniteScroll;
