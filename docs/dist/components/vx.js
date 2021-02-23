import React, {useState, useMemo} from "../../snowpack/pkg/react.js";
import {scaleTime, scaleLinear} from "../../snowpack/pkg/@vx/scale.js";
import appleStock from "../../snowpack/pkg/@vx/mock-data/lib/mocks/appleStock.js";
import {Brush} from "../../snowpack/pkg/@vx/brush.js";
import {PatternLines} from "../../snowpack/pkg/@vx/pattern.js";
import {LinearGradient} from "../../snowpack/pkg/@vx/gradient.js";
import {max, extent} from "../../snowpack/pkg/d3-array.js";
import AreaChart from "./areachart.js";
const stock = appleStock.slice(1e3);
const brushMargin = {top: 10, bottom: 15, left: 50, right: 20};
const chartSeparation = 30;
const PATTERN_ID = "brush_pattern";
const GRADIENT_ID = "brush_gradient";
export const accentColor = "#f6acc8";
export const background = "#584153";
export const background2 = "#af8baf";
const selectedBrushStyle = {
  fill: `url(#${PATTERN_ID})`,
  stroke: "white"
};
const getDate = (d) => new Date(d.date);
const getStockValue = (d) => d.close;
function BrushChart({
  compact = false,
  width,
  height,
  margin = {
    top: 20,
    left: 50,
    bottom: 20,
    right: 20
  }
}) {
  const [filteredStock, setFilteredStock] = useState(stock);
  const onBrushChange = (domain) => {
    if (!domain)
      return;
    const {x0, x1, y0, y1} = domain;
    const stockCopy = stock.filter((s) => {
      const x = getDate(s).getTime();
      const y = getStockValue(s);
      return x > x0 && x < x1 && y > y0 && y < y1;
    });
    setFilteredStock(stockCopy);
  };
  const innerHeight = height - margin.top - margin.bottom;
  const topChartBottomMargin = compact ? chartSeparation / 2 : chartSeparation + 10;
  const topChartHeight = 0.8 * innerHeight - topChartBottomMargin;
  const bottomChartHeight = innerHeight - topChartHeight - chartSeparation;
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(topChartHeight, 0);
  const xBrushMax = Math.max(width - brushMargin.left - brushMargin.right, 0);
  const yBrushMax = Math.max(bottomChartHeight - brushMargin.top - brushMargin.bottom, 0);
  const dateScale = useMemo(() => scaleTime({
    range: [0, xMax],
    domain: extent(filteredStock, getDate)
  }), [xMax, filteredStock]);
  const stockScale = useMemo(() => scaleLinear({
    range: [yMax, 0],
    domain: [0, max(filteredStock, getStockValue) || 0],
    nice: true
  }), [yMax, filteredStock]);
  const brushDateScale = useMemo(() => scaleTime({
    range: [0, xBrushMax],
    domain: extent(stock, getDate)
  }), [xBrushMax]);
  const brushStockScale = useMemo(() => scaleLinear({
    range: [yBrushMax, 0],
    domain: [0, max(stock, getStockValue) || 0],
    nice: true
  }), [yBrushMax]);
  const initialBrushPosition = useMemo(() => ({
    start: {x: brushDateScale(getDate(stock[50]))},
    end: {x: brushDateScale(getDate(stock[100]))}
  }), [brushDateScale]);
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "Brush Chart"), /* @__PURE__ */ React.createElement("svg", {
    width,
    height
  }, /* @__PURE__ */ React.createElement(LinearGradient, {
    id: GRADIENT_ID,
    from: background,
    to: background2,
    rotate: 45
  }), /* @__PURE__ */ React.createElement("rect", {
    x: 0,
    y: 0,
    width,
    height,
    fill: `url(#${GRADIENT_ID})`,
    rx: 14
  }), /* @__PURE__ */ React.createElement(AreaChart, {
    hideBottomAxis: compact,
    data: filteredStock,
    width,
    margin: {...margin, bottom: topChartBottomMargin},
    yMax,
    xScale: dateScale,
    yScale: stockScale,
    gradientColor: background2
  }), /* @__PURE__ */ React.createElement(AreaChart, {
    hideBottomAxis: true,
    hideLeftAxis: true,
    data: stock,
    width,
    yMax: yBrushMax,
    xScale: brushDateScale,
    yScale: brushStockScale,
    margin: brushMargin,
    top: topChartHeight + topChartBottomMargin + margin.top,
    gradientColor: background2
  }, /* @__PURE__ */ React.createElement(PatternLines, {
    id: PATTERN_ID,
    height: 8,
    width: 8,
    stroke: accentColor,
    strokeWidth: 1,
    orientation: ["diagonal"]
  }), /* @__PURE__ */ React.createElement(Brush, {
    xScale: brushDateScale,
    yScale: brushStockScale,
    width: xBrushMax,
    height: yBrushMax,
    margin: brushMargin,
    handleSize: 8,
    resizeTriggerAreas: ["left", "right"],
    brushDirection: "horizontal",
    initialBrushPosition,
    onChange: onBrushChange,
    onClick: () => setFilteredStock(stock),
    selectedBoxStyle: selectedBrushStyle
  }))));
}
export default BrushChart;
