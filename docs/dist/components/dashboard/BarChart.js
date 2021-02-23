import React from "../../../snowpack/pkg/react.js";
import "./App.css.proxy.js";
import * as d3 from "../../../snowpack/pkg/d3.js";
function BarChart(props) {
  const {data, size, onHover, hoverElement, colorScale} = props;
  const barWidth = size[0] / data.length;
  const dataMax = data.reduce((a, c, i) => Math.max(a, c.data[i] ?? 0), 0);
  const yScale = d3.scaleLinear().domain([0, dataMax]).range([0, size[1]]);
  const legendColors = ["rgb(117,115,159)", "rgb(94,175,198)", "rgb(65,163,104)", "rgb(147,196,100)"];
  const legendEl = /* @__PURE__ */ React.createElement("g", {
    className: "legend",
    transform: `translate(${size[0]}, 50)`
  }, /* @__PURE__ */ React.createElement("g", {
    className: "legendCells"
  }, ["Wave 1", "Wave 2", "Wave 3", "Wave 4"].map((text, i) => /* @__PURE__ */ React.createElement("g", {
    key: i,
    className: "cell",
    transform: `translate(0, ${i * 20})`
  }, /* @__PURE__ */ React.createElement("rect", {
    className: "swatch",
    height: "15",
    width: "15",
    fill: legendColors[i]
  }), /* @__PURE__ */ React.createElement("text", {
    className: "label",
    transform: `translate(25, 12.5)`
  }, text)))));
  const bars = data.map((d, i) => {
    return /* @__PURE__ */ React.createElement("rect", {
      key: i,
      className: "bar",
      onMouseOver: onHover,
      x: i * barWidth,
      y: size[1] - yScale(d.data[i] ?? 0),
      height: yScale(d.data[i] ?? 0),
      width: barWidth,
      fill: hoverElement === d.id ? "#FCBC34" : colorScale(d.launchday),
      stroke: "black",
      strokeOpacity: "0.25"
    });
  });
  return /* @__PURE__ */ React.createElement("svg", {
    width: size[0] + 100,
    height: size[1] * 2
  }, /* @__PURE__ */ React.createElement("g", null, bars), legendEl);
}
export default BarChart;
