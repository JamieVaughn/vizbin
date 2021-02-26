import { useEffect, useRef } from "../../snowpack/pkg/react.js";

export default function useScrollPos(el) {
//   const top = useRef(el);
  let pos = localStorage.getItem('scrollPosition')
  useEffect(() => {
    pos ? el.scrollTop = pos : null
    const saveScroll = () =>  localStorage.setItem('scrollPosition', el.scrollTop)
    el.addEventListener("beforeunload", saveScroll);
    return () => {
      el.removeEventListener("beforeunload", saveScroll);
    };
  }, []);

  return pos;
};