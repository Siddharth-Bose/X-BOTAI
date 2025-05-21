import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < breakpoint
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleResize = (e) => setIsMobile(e.matches);

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Listen to changes
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
