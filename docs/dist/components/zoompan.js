import React, {useLayoutEffect, useEffect, useState, useRef} from "../../_snowpack/pkg/react.js";
import usePan from "../hooks/usePan.js";
import useScale from "../hooks/useScale.js";
import styled from "../../_snowpack/pkg/styled-components.js";
import useEventListener from "../hooks/useEventListener.js";
const Hud = styled.span`
    z-index: 99;
`;
const HEIGHT = 400;
const WIDTH = 700;
const styles = {
  position: "relative",
  margin: "1rem auto",
  background: "black",
  color: "white",
  width: `${WIDTH}px`,
  height: `${HEIGHT}px`,
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "flex-end",
  userSelect: "none",
  overflow: "hidden",
  padding: "4px"
};
const cursor = {
  cursor: "all-scroll"
};
const ptOps = {
  "+": (p1, p2) => ({x: p1.x + p2.x, y: p1.y + p2.y}),
  "-": (p1, p2) => ({x: p1.x - p2.x, y: p1.y - p2.y}),
  "-+": (p1, p2) => ({x: p1.x - p2.x, y: p1.y + p2.y}),
  x: (p1, p2) => ({x: p1.x * p2.x, y: p1.y * p2.y}),
  "*": (p1, p2) => ({x: p1.x * p2.x, y: p1.y * p2.y}),
  "/": (p1, p2) => ({x: p1.x / p2.x, y: p1.y / p2.y}),
  "==": (p1, p2) => p1.x === p2.x && p1.y === p2.y ? true : false,
  anchor: (p1) => Math.abs(p1.x) < 0.2 * HEIGHT && Math.abs(p1.y) < 0.2 * HEIGHT ? {x: 0, y: 0} : p1,
  cap: (p1) => ({x: Math.sign(p1.x) * Math.min(Math.abs(p1.x), WIDTH), y: Math.sign(p1.y) * Math.min(Math.abs(p1.y), HEIGHT)}),
  max: (p1) => Math.abs(p1.x) > Math.abs(p1.y) ? {x: p1.x, y: 0} : {x: 0, y: p1.y},
  scale: (p1, factor) => ({x: p1.x / factor, y: p1.y / factor}),
  translate: (p1, factor) => ({x: p1.x + factor, y: p1.y + factor})
};
const infixPts = (p1, operator, p2 = {x: 0, y: 0}) => ptOps[operator]?.(p1, p2) ?? console.error("Point Operation not found: " + operator);
var center = null;
var adjust = {x: 0, y: 0};
export const ZoomPan = () => {
  const [freeZoom, setFreeZoom] = useState(true);
  const ref = useRef(null);
  const [inset, setInset] = useState({x: 0, y: 0});
  const [offset, startPan] = usePan();
  const [scale, mousePos] = useScale(ref);
  useLayoutEffect(() => {
    const height = ref.current?.clientHeight ?? 0;
    const width = ref.current?.clientWidth ?? 0;
    const marginTop = ref.current.offsetTop;
    const marginLeft = ref.current.offsetLeft;
    if (center === null) {
      center = {x: width / 2 + marginLeft, y: height / 2 + marginTop};
    } else {
      const focal = infixPts(mousePos, "-", center);
      const anchored = infixPts(focal, "anchor");
      const maxOrd = infixPts(anchored, "max");
      const scaleFocal = infixPts(freeZoom ? anchored : maxOrd, "scale", scale);
      adjust = infixPts(infixPts(adjust, "+", freeZoom ? scaleFocal : maxOrd), "cap");
    }
    setInset({
      x: (width - width / scale) / 2,
      y: (height - height / scale) / 2
    });
  }, [scale, setInset]);
  const [interaction, setInteraction] = useState(null);
  useEventListener("mousedown", () => setInteraction("Panning"), ref.current);
  useEventListener("mouseup", () => setInteraction(null), ref.current);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    onMouseDown: startPan,
    style: {...styles, ...cursor},
    ref
  }, /* @__PURE__ */ React.createElement("div", {
    className: "zoompan",
    style: {
      transition: `transform .2s ${interaction === "Panning" ? "" : ", background-position .45s"}`,
      inset: `${inset.y}px ${inset.x}px`,
      transform: `scale(${scale})`,
      backgroundPosition: `${-adjust.x - offset.x}px ${-adjust.y - offset.y}px`
    }
  }), /* @__PURE__ */ React.createElement(Hud, null, "Scale: ", scale.toFixed(1), " ", interaction ?? ""), /* @__PURE__ */ React.createElement(Hud, null, "Inset: ", `{x: ${inset.x.toFixed(0)}, y: ${inset.y.toFixed(0)}}`), /* @__PURE__ */ React.createElement(Hud, null, "Offset: ", `{x: ${offset.x}, y: ${offset.y}}`), /* @__PURE__ */ React.createElement(Hud, null, "Adjustment: ", `{x: ${adjust.x.toFixed(0)}, y: ${adjust.y.toFixed(0)}}`), /* @__PURE__ */ React.createElement(Hud, null, "Mouse: ", `{x: ${(mousePos.x - (center?.x ?? 0)).toFixed(0)}, y: ${(mousePos.y - (center?.y ?? 0)).toFixed(0)}}`)), /* @__PURE__ */ React.createElement("button", {
    onClick: () => setFreeZoom(!freeZoom)
  }, "Cardinal Zooming: ", freeZoom ? "Off" : "On"));
};
