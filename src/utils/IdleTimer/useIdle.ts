import { useEffect } from "react";
import { bufferTime, filter, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export function useIdle(duration: number, fn: (event: string) => void) {
  const user = useSelector(
    (state: RootState) => state?.centeralizedStateData?.user
  );
  useEffect(() => {
    const clicks = fromEvent(document, "click");
    const move = fromEvent(window, "mousemove");
    const keys = fromEvent(window, "keypress");

    const merged = merge(
      keys.pipe(map(() => "key")),
      clicks.pipe(map(() => "mouse click")),
      move.pipe(map(() => "mouse move"))
    );

    const final = merged.pipe(
      // buffer the notifications of merged observable over an interval
      bufferTime(duration),
      // if the buffer is empty, then the system has been idle
      filter((vals) => vals.length === 0),
      map(() => "idle")
    );
    const subscription = final.subscribe((x) => fn(x));

    return () => subscription.unsubscribe();
  }, [user, duration, fn]);

  return { user };
}
