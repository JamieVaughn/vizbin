import React, {useEffect, useRef, useState} from "../../snowpack/pkg/react.js";
import * as d3 from "../../snowpack/pkg/d3.js";
import {stream} from "../../data/snr_data.js";
const CoursePlot = (props) => {
  const {height, width, scale} = props;
  const interval = width / scale;
  const canvas = useRef();
  const [cursor, setCursor] = useState(0);
  const colorScheme = ["royalblue", "wheat", "crimson"];
  const interp = d3.piecewise(d3.interpolateRgb.gamma(2.2), colorScheme);
  useEffect(() => {
    const c = canvas.current.getContext("2d");
    clearBricks(c);
    for (let i = 0; i < scale; i++)
      layBrick(c, i * interval, i / scale);
  }, [interval, scale, layBrick]);
  function layBrick(ctx, tick, value) {
    ctx.beginPath();
    ctx.moveTo(tick, 10);
    ctx.lineWidth = 20;
    ctx.strokeStyle = interp(value);
    ctx.lineTo(tick + interval - 0.5, 10);
    ctx.stroke();
  }
  function clearBricks(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.strokeStyle = "linen";
    ctx.lineTo(width, 10);
    ctx.stroke();
  }
  const handleMouseMove = (e) => {
    setCursor("X: " + (e.clientX - e.target.offsetLeft));
  };
  return /* @__PURE__ */ React.createElement("canvas", {
    onMouseMove: handleMouseMove,
    ref: canvas,
    width,
    height
  });
};
export default function WythePlot(props) {
  const width = 900;
  const height = 10;
  const scale = 40;
  const streams = 20;
  const length = streams;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Heatmap"), /* @__PURE__ */ React.createElement("div", {
    className: "wythe"
  }, Array.from({length}, (_, index) => ({id: index})).map((s) => /* @__PURE__ */ React.createElement(CoursePlot, {
    key: s.id,
    width,
    height,
    scale
  }))));
}
