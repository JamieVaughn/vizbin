import React from "../../snowpack/pkg/react.js";
import * as d3 from "../../snowpack/pkg/d3.js";
import {D3HBars, D3VBars} from "./d3examples/barchart.js";
function getMarginObjectForNumber(number) {
  return {
    top: number,
    right: number,
    bottom: number,
    left: number
  };
}
function getMarginObject(margin) {
  if (!margin) {
    return getMarginObjectForNumber(0);
  }
  if (typeof margin === "number") {
    return getMarginObjectForNumber(margin);
  }
  const {
    top,
    right,
    bottom,
    left,
    vertical,
    horizontal
  } = margin;
  return {
    top: top || vertical || 0,
    right: right || horizontal || 0,
    bottom: bottom || vertical || 0,
    left: left || horizontal || 0
  };
}
function getContentContainerStyle({
  margin
}) {
  const marginObject = getMarginObject(margin);
  return {
    transform: `translate(${marginObject.left}px, ${marginObject.top}px)`
  };
}
;
function getSVGDimensions({
  height,
  margin,
  width
}) {
  const marginObject = getMarginObject(margin);
  const heightWithMargin = height + marginObject.top + marginObject.bottom;
  const widthWithMargin = width + marginObject.left + marginObject.right;
  return {
    height: heightWithMargin,
    width: widthWithMargin
  };
}
;
const SVGWithMargin = ({
  children,
  contentContainerBackgroundRectClassName,
  contentContainerGroupClassName,
  height,
  margin,
  renderContentContainerBackground,
  width,
  ...rest
}) => /* @__PURE__ */ React.createElement("svg", {
  ...rest,
  ...getSVGDimensions({
    height,
    margin,
    width
  })
}, /* @__PURE__ */ React.createElement("g", {
  className: contentContainerGroupClassName,
  style: getContentContainerStyle({margin})
}, !!contentContainerBackgroundRectClassName && /* @__PURE__ */ React.createElement("rect", {
  className: contentContainerBackgroundRectClassName,
  height,
  width,
  x: 0,
  y: 0
}), children));
const D3react = ({
  data,
  height,
  width,
  margin,
  selectX,
  selectY
}) => {
  const xScale = d3.scaleTime().domain(d3.extent(data, selectX)).range([0, width]);
  const yScale = d3.scaleLinear().domain(d3.extent(data, selectY)).range([height, 0]);
  const xAxis = d3.axisBottom().scale(xScale).ticks(data.length / 2);
  const yAxis = d3.axisLeft().scale(yScale).ticks(3);
  const selectScaledX = (datum) => xScale(selectX(datum));
  const selectScaledY = (datum) => yScale(selectY(datum));
  const sparkLine = d3.line().x(selectScaledX).y(selectScaledY);
  const linePath = sparkLine(data);
  const circlePoints = data.map((datum) => ({
    x: selectScaledX(datum),
    y: selectScaledY(datum)
  }));
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SVGWithMargin, {
    className: "container",
    contentContainerBackgroundRectClassName: "contentContainerBackgroundRect",
    contentContainerGroupClassName: "contentContainer",
    height,
    margin,
    width
  }, /* @__PURE__ */ React.createElement("g", {
    className: "xAxis",
    ref: (node) => d3.select(node).call(xAxis),
    style: {
      transform: `translateY(${height}px)`
    }
  }), /* @__PURE__ */ React.createElement("g", {
    className: "yAxis",
    ref: (node) => d3.select(node).call(yAxis)
  }), /* @__PURE__ */ React.createElement("g", {
    className: "line"
  }, /* @__PURE__ */ React.createElement("path", {
    d: linePath
  })), /* @__PURE__ */ React.createElement("g", {
    className: "scatter"
  }, circlePoints.map((circlePoint) => /* @__PURE__ */ React.createElement("circle", {
    cx: circlePoint.x,
    cy: circlePoint.y,
    key: `${circlePoint.x},${circlePoint.y}`,
    r: 4
  })))), /* @__PURE__ */ React.createElement(D3HBars, null), /* @__PURE__ */ React.createElement(D3VBars, null));
};
export default D3react;
