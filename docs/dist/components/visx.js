import React from "../../_snowpack/pkg/react.js";
import {BarStack} from "../../_snowpack/pkg/@visx/shape.js";
import {Group} from "../../_snowpack/pkg/@visx/group.js";
import {Grid} from "../../_snowpack/pkg/@visx/grid.js";
import {AxisBottom, AxisLeft} from "../../_snowpack/pkg/@visx/axis.js";
import {scaleBand, scaleLinear, scaleOrdinal} from "../../_snowpack/pkg/@visx/scale.js";
import {timeFormat, timeParse} from "../../_snowpack/pkg/d3-time-format.js";
import {useTooltip, useTooltipInPortal, defaultStyles} from "../../_snowpack/pkg/@visx/tooltip.js";
import {LegendOrdinal} from "../../_snowpack/pkg/@visx/legend.js";
const purple1 = "#6c5efb";
const purple2 = "#c998ff";
const purple3 = "#a44afe";
const background = "#eaedff";
const defaultMargin = {top: 40, right: 0, bottom: 0, left: 0};
const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
};
const data = [
  {
    date: "2020-10-01",
    London: "60",
    Paris: "68",
    Berlin: "61"
  },
  {
    date: "2020-10-02",
    London: "57",
    Paris: "58",
    Berlin: "62"
  },
  {
    date: "2020-10-03",
    London: "59",
    Paris: "57",
    Berlin: "72"
  },
  {
    date: "2020-10-04",
    London: "52",
    Paris: "59",
    Berlin: "68"
  },
  {
    date: "2020-10-05",
    London: "63",
    Paris: "57",
    Berlin: "63"
  },
  {
    date: "2020-10-06",
    London: "61",
    Paris: "62",
    Berlin: "61"
  },
  {
    date: "2020-10-07",
    London: "61",
    Paris: "64",
    Berlin: "61"
  },
  {
    date: "2020-10-08",
    London: "64",
    Paris: "66",
    Berlin: "60"
  },
  {
    date: "2020-10-09",
    London: "58",
    Paris: "62",
    Berlin: "60"
  },
  {
    date: "2020-10-10",
    London: "56",
    Paris: "59",
    Berlin: "55"
  },
  {
    date: "2020-10-11",
    London: "57",
    Paris: "58",
    Berlin: "52"
  },
  {
    date: "2020-10-12",
    London: "56",
    Paris: "58",
    Berlin: "54"
  },
  {
    date: "2020-10-13",
    London: "52",
    Paris: "56",
    Berlin: "55"
  },
  {
    date: "2020-10-14",
    London: "58",
    Paris: "57",
    Berlin: "51"
  }
];
const keys = ["London", "Paris", "Berlin"];
const temperatureTotals = data.reduce((allTotals, currentDate) => {
  const totalTemperature = keys.reduce((dailyTotal, k) => {
    dailyTotal += Number(currentDate[k]);
    return dailyTotal;
  }, 0);
  allTotals.push(totalTemperature);
  return allTotals;
}, []);
const parseDate = timeParse("%Y-%m-%d");
const format = timeFormat("%b %d");
const formatDate = (date) => format(parseDate(date));
const getDate = (d) => d.date;
const dateScale = scaleBand({domain: data.map(getDate), padding: 0.2});
const temperatureScale = scaleLinear({
  domain: [0, Math.max(...temperatureTotals)],
  nice: true
});
const colorScale = scaleOrdinal({
  domain: keys,
  range: [purple1, purple2, purple3]
});
let tooltipTimeout;
function TemperatureBarStack(props) {
  const {
    width,
    height,
    event,
    margin
  } = props.settings;
  const {
    tooltipOpen,
    tooltipTop,
    tooltipLeft,
    hideTooltip,
    showTooltip,
    tooltipData
  } = useTooltip();
  const {containerRef, TooltipInPortal} = useTooltipInPortal();
  if (width < 10)
    return null;
  const xMax = width;
  const yMax = height - margin.top - 100;
  dateScale.rangeRound([0, xMax]);
  temperatureScale.range([yMax, 0]);
  return width < 10 ? null : /* @__PURE__ */ React.createElement("div", {
    style: {position: "relative"}
  }, /* @__PURE__ */ React.createElement("svg", {
    ref: containerRef,
    width,
    height
  }, /* @__PURE__ */ React.createElement("rect", {
    x: 0,
    y: 0,
    width,
    height,
    fill: background,
    rx: 14
  }), /* @__PURE__ */ React.createElement(Grid, {
    top: margin.top,
    left: margin.left,
    xScale: dateScale,
    yScale: temperatureScale,
    width: xMax,
    height: yMax,
    stroke: "black",
    strokeOpacity: 0.1,
    xOffset: dateScale.bandwidth() / 2
  }), /* @__PURE__ */ React.createElement(Group, {
    top: margin.top
  }, /* @__PURE__ */ React.createElement(BarStack, {
    data,
    keys,
    x: getDate,
    xScale: dateScale,
    yScale: temperatureScale,
    color: colorScale
  }, (barStacks) => barStacks.map((barStack) => barStack.bars.map((bar) => /* @__PURE__ */ React.createElement("rect", {
    key: `bar-stack-${barStack.index}-${bar.index}`,
    x: bar.x,
    y: bar.y,
    height: bar.height,
    width: bar.width,
    fill: bar.color,
    onClick: () => {
      if (event)
        alert(`Clicked: ${JSON.stringify(bar)}`);
    },
    onMouseLeave: () => {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    },
    onMouseMove: (event2) => {
      if (tooltipTimeout)
        clearTimeout(tooltipTimeout);
      const top = event2.clientY - margin.top - bar.height;
      const left = bar.x + bar.width / 2;
      showTooltip({
        tooltipData: bar,
        tooltipTop: top,
        tooltipLeft: left
      });
    }
  }))))), /* @__PURE__ */ React.createElement(AxisBottom, {
    top: yMax + margin.top,
    scale: dateScale,
    tickFormat: formatDate,
    stroke: purple3,
    tickStroke: purple3,
    tickLabelProps: () => ({
      fill: purple3,
      fontSize: 11,
      textAnchor: "middle"
    })
  })), /* @__PURE__ */ React.createElement("div", {
    style: {
      position: "absolute",
      top: margin.top / 2 - 10,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      fontSize: 14
    }
  }, /* @__PURE__ */ React.createElement(LegendOrdinal, {
    scale: colorScale,
    direction: "row",
    labelMargin: "0 15px 0 0"
  })), tooltipOpen && tooltipData && /* @__PURE__ */ React.createElement(TooltipInPortal, {
    key: Math.random(),
    top: tooltipTop,
    left: tooltipLeft,
    style: tooltipStyles
  }, /* @__PURE__ */ React.createElement("div", {
    style: {color: colorScale(tooltipData.key)}
  }, /* @__PURE__ */ React.createElement("strong", null, tooltipData.key)), /* @__PURE__ */ React.createElement("div", null, tooltipData.bar.data[tooltipData.key], "\u2109"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("small", null, formatDate(getDate(tooltipData.bar.data))))));
}
export default function Visx() {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "VisX Temp Bar Chart"), /* @__PURE__ */ React.createElement(TemperatureBarStack, {
    settings: {width: 600, height: 550, event: false, margin: defaultMargin}
  }));
}
