import { useEffect } from 'preact/hooks';

const useKeyPress = (keyHandler: (e: KeyboardEvent) => void, dependencies: any[]) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      keyHandler(e);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, dependencies);
};

export default useKeyPress;
