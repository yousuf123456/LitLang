import { useEffect, useRef, useState } from "react";

// Define a type for the position
interface Position {
  top: number;
  left: number;
}

// Custom hook to calculate logo position
const useLogoPosition = () => {
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const textRef = useRef<HTMLParagraphElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (textRef.current && logoRef.current) {
        const textElement = textRef.current;
        const logoElement = logoRef.current;

        // Get the height of the text element
        const textHeight = textElement.clientHeight;
        const lineHeight = parseInt(
          window.getComputedStyle(textElement).lineHeight,
          10
        );
        const logoHeight = logoElement.clientHeight;

        // Calculate the position of the end of the second line
        const range = document.createRange();
        range.setStart(textElement.firstChild as Node, 0);
        range.setEnd(textElement.firstChild as Node, 1);
        const { left, top } = range.getBoundingClientRect();

        // Update logo position
        setPosition({
          top: top + window.scrollY + lineHeight,
          left: left + window.scrollX,
        });
      }
    };

    // Update position on mount and when content changes
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return { position, textRef, logoRef };
};

export default useLogoPosition;
