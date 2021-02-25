import React, {useEffect, useRef} from "../../../_snowpack/pkg/react.js";
import * as d3 from "../../../_snowpack/pkg/d3.js";
const barData = [
  {key: "0", value: 59},
  {key: "1", value: 78},
  {key: "2", value: 49},
  {key: "3", value: 73},
  {key: "4", value: 76},
  {key: "5", value: 71}
];
function D3HBars({data = barData, width = 400, height = 25}) {
  const h = barData.length * height;
  const margin = 10;
  const scaleX = d3.scaleLinear().domain([0, d3.max(barData, (d) => d.value)]).range([0, width]);
  const color = d3.scaleSequential(d3.interpolatePlasma).domain(barData.map((d) => d.value));
  const scaleY = d3.scaleBand().domain(data.map((d) => d.key)).range([h, 0]);
  const xMargin = scaleX.copy().range([margin, width - margin]);
  const yMargin = scaleY.copy().range([h - margin, margin]);
  const bars = data.map((d, i) => /* @__PURE__ */ React.createElement("g", {
    key: i,
    style: {transform: `translate(${margin}px, ${yMargin(d.key)}px)`}
  }, /* @__PURE__ */ React.createElement("rect", {
    width: xMargin(d.value) - xMargin(0),
    height: yMargin.bandwidth(),
    stroke: "white",
    fill: color(d.value)
  }), /* @__PURE__ */ React.createElement("text", {
    x: xMargin(d.value) - xMargin(0),
    dx: "-20",
    dy: "1.2em",
    fill: "white",
    fontSize: "small"
  }, d.value)));
  const xAxis = d3.axisBottom(xMargin);
  const yAxis = d3.axisLeft(yMargin);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Horizontal Bar chart"), /* @__PURE__ */ React.createElement("svg", {
    width,
    height: h,
    style: {border: "1px dotted grey"}
  }, bars, /* @__PURE__ */ React.createElement("g", {
    style: {transform: `translate(0, ${h - margin}px)`}
  }, xAxis), /* @__PURE__ */ React.createElement("g", {
    style: {transform: `translate(${margin}px, 0)`}
  }, yAxis)));
}
function D3VBars({data = barData, width = 30, height = 200}) {
  const chart = useRef();
  const w = barData.length * width;
  const margin = 20;
  const scaleX = d3.scaleBand().domain(data.map((d) => d.key)).range([0, w]);
  const color = d3.scaleSequential(d3.interpolateRdYlBu).domain(barData.map((d) => d.value));
  const scaleY = d3.scaleLinear().domain([d3.max(data, (d) => d.value), 0]).range([0, height]);
  const xMargin = scaleX.copy().range([w - margin, margin]);
  const yMargin = scaleY.copy().range([margin, height - margin]);
  useEffect(() => {
    const container = d3.select(chart.current);
    container.append("g").attr("transform", `translate(0, ${height - margin})`).call(d3.axisBottom(xMargin));
    container.append("g").attr("transform", `translate(${margin}, 0)`).call(d3.axisLeft(yMargin));
  }, []);
  const bars = data.map((d, i) => /* @__PURE__ */ React.createElement("g", {
    key: i,
    style: {transform: `translate(${xMargin(d.key)}px, ${margin}px)`}
  }, /* @__PURE__ */ React.createElement("rect", {
    y: yMargin(d.value) - margin,
    width: xMargin.bandwidth(),
    height: height - yMargin(d.value) - margin,
    stroke: "white",
    fill: color(d.value)
  }), /* @__PURE__ */ React.createElement("text", {
    y: yMargin(d.value) - margin,
    dx: "4",
    dy: "-0.25em",
    fill: "white",
    stroke: "black",
    fontSize: "small"
  }, d.value)));
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Vertical Bar chart"), /* @__PURE__ */ React.createElement("svg", {
    width: w,
    height,
    ref: chart
  }, bars));
}
export {D3HBars, D3VBars};
