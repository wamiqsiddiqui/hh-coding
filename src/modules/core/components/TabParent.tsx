import { CSSProperties } from "react";
import { PaddingType } from "../../../types/generalTypes";

/**
 * A TabParent component that renders its children and applies a CSS transform
 * property to move the tab component to the left by the selectedSection number
 * of times the width of the tab component.
 *
 * @param {React.ReactNode} children
 * @param {number} index
 * @param {number} selectedSection
 * @param {boolean} fullHeight
 * @param {boolean} noPadding
 * @param {PaddingType} customPadding
 * @param {boolean} disAllowHeightReduce
 * @param {boolean} overflow
 * @param {(event: React.UIEvent<HTMLDivElement, UIEvent>) => void} onScroll
 * @param {boolean} noTranslateX
 * @param {boolean} addStepsToDOM
 * @returns {React.ReactElement}
 */
export const TabParent = ({
  children,
  index,
  selectedSection,
  fullHeight,
  noPadding,
  customPadding,
  disAllowHeightReduce,
  overflow,
  onScroll,
  noTranslateX = true,
  addStepsToDOM = false,
  customCSS = {},
  noPaddingX = false,
}: {
  index?: number;
  fullHeight?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
  customPadding?: PaddingType;
  selectedSection: number;
  disAllowHeightReduce?: boolean;
  overflow?: boolean;
  noTranslateX?: boolean;
  onScroll?: (event: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  addStepsToDOM?: boolean;
  customCSS?: CSSProperties;
  noPaddingX?: boolean;
}) => {
  /**
   * Returns the translateX CSS property value to move the tab component
   * to the left by the selectedSection number of times the width of the
   * tab component.
   * @returns {string} translateX CSS property value
   */
  const getTranslateX = () => {
    return `-${selectedSection}00%`;
  };
  // if activeStep is equal to index, then remove hidden property from the next tab parent
  const divStyle: React.CSSProperties = {
    transform: !noTranslateX ? `translateX(${getTranslateX()}) ` : "",
  };
  if (!addStepsToDOM) {
    divStyle.display = selectedSection === index ? "block" : "none";
  }

  return (
    <div
      style={{ ...divStyle, ...customCSS }}
      className={`${
        selectedSection !== index && !disAllowHeightReduce && "h-24"
      } ${
        !noPadding &&
        (customPadding
          ? customPadding
          : `max-md:px-6 ${!noPaddingX ? "px-10" : "px-[1px]"} py-5`)
      } ${
        selectedSection === index && fullHeight && "h-full"
      } shrink-0 w-full transition-transform ${
        overflow &&
        selectedSection === index &&
        "overflow-y-auto overflow-x-hidden"
      }  duration-1000`}
      onScroll={overflow ? onScroll : undefined}
    >
      {children}
    </div>
  );
};
