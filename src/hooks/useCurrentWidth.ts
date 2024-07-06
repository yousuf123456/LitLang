import { useEffect, useState } from "react";

const useCurrentWidth = () => {
  const [windowSize, setWindowSize] = useState<{
    height: undefined | number;
    width: undefined | number;
  }>({
    width: undefined,
    height: undefined,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize.width;
};

export default useCurrentWidth;
