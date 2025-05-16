import { useRef, useEffect, useCallback, RefObject } from "react";

type ClickOutsideProps = {
  children: React.ReactNode;
  disallowOutsideClick?: boolean;
  onClick: () => void;
  className?: string;
  toggleButtonRef?: RefObject<HTMLDivElement | null>;
};
export default function DetectOutsideClickWrapper({
  children,
  disallowOutsideClick,
  onClick,
  toggleButtonRef,
  className,
}: ClickOutsideProps) {
  const wrapperRef: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const handleClickListener = useCallback(
    (event: MouseEvent) => {
      const clickedNode = event.target as Node;

      const isInsideWrapper =
        wrapperRef?.current?.contains(clickedNode) ?? false;

      const isInsideToggleButton =
        toggleButtonRef?.current?.contains(clickedNode) ?? false;
      const isClickedInside = isInsideWrapper || isInsideToggleButton;
      if (isClickedInside) return;
      if (!disallowOutsideClick) onClick();
    },
    [onClick, disallowOutsideClick, toggleButtonRef]
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
