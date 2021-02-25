import { useEffect, useState } from "../../_snowpack/pkg/react.js";

export default function useMousePosition(el) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const element = el ?? window

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    element.addEventListener("mousemove", setFromEvent);

    return () => {
      element.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

  return position;
};