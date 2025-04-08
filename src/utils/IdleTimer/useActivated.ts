import { fromEvent, throttle, interval, merge } from "rxjs";
import { map } from "rxjs/operators";
import { useEffect } from "react";

export function useActivated(duration: number, fn: (event: string) => void) {
  useEffect(() => {
    const clicks = fromEvent(document, "click");
    const move = fromEvent(window, "mousemove");
    const keys = fromEvent(window, "keypress");

    const merged = merge(
      keys.pipe(map(() => "key")),
      clicks.pipe(map(() => "mouse click")),
      move.pipe(map(() => "mouse move"))
    );

    const final = merged.pipe(throttle(() => interval(duration)));
    const subscription = final.subscribe((x) => fn(x));

    return () => subscription.unsubscribe();
  }, [duration, fn]);
}
