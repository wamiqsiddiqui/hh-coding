import { useRef } from "react";
import { useActivated } from "./useActivated";
import { useIdle } from "./useIdle";

export function useIdleTimeout(duration: number, fn: () => void) {
  const handle = useRef<NodeJS.Timeout | null>(null);
  const { user } = useIdle(2000, () => {
    if (!handle.current) {
      const t1 = setTimeout(() => {
        fn();
        clearTimeout(t1);
      }, duration);
      handle.current = t1;
    }
  });

  useActivated(2000, () => {
    if (handle.current !== null) clearTimeout(handle.current);
    handle.current = null;
  });

  return { user };
}
