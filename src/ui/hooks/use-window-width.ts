import * as React from "react";
import debounce from "lodash.debounce";

const getWindowWidth = () => window.innerWidth;
const breakpoints = {
  "x-small": 320, // 320px small devices
  small: 480, // 480px main phone devices
  medium: 768, // 768px main tablet portrait
  large: 1024, // 1024px main tablet landscape
  "x-large": 1280, // 1280px main laptop screen
};

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = React.useState(getWindowWidth);

  React.useEffect(() => {
    const handler = debounce(() => {
      setWindowWidth(getWindowWidth());
    }, 0);
    window.addEventListener("resize", handler, { passive: true });
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return windowWidth;
}

export function useIsMobile() {
  const windowWidth = useWindowWidth();

  return windowWidth < breakpoints.large;
}

export function useBreakpoints() {
  const width = useWindowWidth();
  return {
    isXSmall: width <= breakpoints["x-small"],
    isSmall: width <= breakpoints.small,
    isMedium: width <= breakpoints.medium,
    isLarge: width <= breakpoints.large,
    isXLarge: width <= breakpoints["x-large"],
  };
}
