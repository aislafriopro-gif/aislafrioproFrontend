"use client";

import { useEffect, useState } from "react";

export interface IWindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): IWindowSize {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function updateWindowSize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const animationFrameId =
      window.requestAnimationFrame(updateWindowSize);

    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return windowSize;
}