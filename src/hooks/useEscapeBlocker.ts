import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

interface EscapeBlockerResult {
  isBlocked: boolean;
  proceed: () => void;
  reset: () => void;
}

const useEscapeBlocker = (when: boolean): EscapeBlockerResult => {
  const blocker = useBlocker(() => when);

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when]);

  return {
    isBlocked: blocker.state === 'blocked',
    proceed: blocker.proceed ?? (() => {}),
    reset: blocker.reset ?? (() => {}),
  };
};

export default useEscapeBlocker;
