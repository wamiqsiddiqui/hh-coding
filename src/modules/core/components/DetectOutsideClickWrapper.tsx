import { useRef, useEffect, useCallback, RefObject } from "react";

type ClickOutsideProps = {
  children: React.ReactNode;
  disallowOutsideClick?: boolean;
  onClick: () => void;
  className?: string;
};
export default function DetectOutsideClickWrapper({
  children,
  disallowOutsideClick,
  onClick,
  className,
}: ClickOutsideProps) {
  const wrapperRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  const handleClickListener = useCallback(
    (event: MouseEvent) => {
      let isClickedInside;
      isClickedInside =
        wrapperRef &&
        wrapperRef.current &&
        wrapperRef.current.contains(event.target as Node);
      if (isClickedInside) return;
      else if (!disallowOutsideClick) onClick();
    },
    [onClick, disallowOutsideClick]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);
    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [handleClickListener]);
  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
}
