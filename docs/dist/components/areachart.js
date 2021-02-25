import React from "../../_snowpack/pkg/react.js";
import {Group} from "../../_snowpack/pkg/@visx/group.js";
import {AreaClosed} from "../../_snowpack/pkg/@visx/shape.js";
import {AxisLeft, AxisBottom} from "../../_snowpack/pkg/@visx/axis.js";
import {LinearGradient} from "../../_snowpack/pkg/@visx/gradient.js";
import {curveMonotoneX} from "../../_snowpack/pkg/@visx/curve.js";
const axisColor = "#fff";
const axisBottomTickLabelProps = {
  textAnchor: "middle",
  fontFamily: "Arial",
  fontSize: 10,
  fill: axisColor
};
const axisLeftTickLabelProps = {
  dx: "-0.25em",
  dy: "0.25em",
  fontFamily: "Arial",
  fontSize: 10,
  textAnchor: "end",
  fill: axisColor
};
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;
export default function AreaChart({
  data,
  gradientColor,
  width,
  yMax,
  margin,
  xScale,
  yScale,
  hideBottomAxis = false,
  hideLeftAxis = false,
  top,
  left,
  children
}) {
  if (width < 10)
    return null;
  return /* @__PURE__ */ React.createElement(Group, {
    left: left || margin.left,
    top: top || margin.top
  }, /* @__PURE__ */ React.createElement(LinearGradient, {
    id: "gradient",
    from: gradientColor,
    fromOpacity: 1,
    to: gradientColor,
    toOpacity: 0.2
  }), /* @__PURE__ */ React.createElement(AreaClosed, {
    data,
    x: (d) => xScale(getDate(d)) || 0,
    y: (d) => yScale(getStockValue(d)) || 0,
    yScale,
    strokeWidth: 1,
    stroke: "url(#gradient)",
    fill: "url(#gradient)",
    curve: curveMonotoneX
  }), !hideBottomAxis && /* @__PURE__ */ React.createElement(AxisBottom, {
    top: yMax,
    scale: xScale,
    numTicks: width > 520 ? 10 : 5,
    stroke: axisColor,
    tickStroke: axisColor,
    tickLabelProps: () => axisBottomTickLabelProps
  }), !hideLeftAxis && /* @__PURE__ */ React.createElement(AxisLeft, {
    scale: yScale,
    numTicks: 5,
    stroke: axisColor,
    tickStroke: axisColor,
    tickLabelProps: () => axisLeftTickLabelProps
  }), children);
}
