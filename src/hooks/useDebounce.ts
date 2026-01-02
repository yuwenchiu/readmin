import { useEffect, useState } from "react";

export function useDebounce<T>(deps: T, delay = 300) {
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    setIsPending(true);
    const timeout = setTimeout(() => setIsPending(false), delay);

    return () => clearTimeout(timeout);
  }, [delay, deps]);

  return isPending;
}