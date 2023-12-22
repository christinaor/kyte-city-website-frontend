import { useEffect, useRef } from 'react';

const useFocusOnMount = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};

export default useFocusOnMount;
