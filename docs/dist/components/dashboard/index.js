import React, {useEffect, useState} from "../../../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import WorldMap from "./WorldMap.js";
import BarChart from "./BarChart.js";
import StreamGraph from "./StreamGraph.js";
import Brush from "./Brush.js";
import StatLine from "./StatLine.js";
import worlddata from "../../../data/americas.js";
import * as d3 from "../../../_snowpack/pkg/d3.js";
const appdata = worlddata.features.filter((d) => d3.geoPath().centroid(d)[0] < -20);
appdata.forEach((d, i) => {
  const offset = Math.random();
  d.launchday = i;
  d.data = Array(30).fill(1).map((p, q) => q < i ? 0 : Math.random() * 2 + offset);
});
const colorScale = d3.scaleThreshold().domain([5, 10, 20, 30]).range(["#75739F", "#5EAFC6", "#41A368", "#93C464"]);
function Dashboard() {
  const [state, setState] = useState({screenWidth: 600, screenHeight: 300, hover: "none", brushExtent: [0, 40]});
  const [filteredAppdata, setFilteredAppdata] = useState(appdata);
  const onHover = (d) => {
    setState((state2) => ({...state2, hover: d.id}));
  };
  const onBrush = (d) => {
    setState((state2) => ({...state2, brushExtent: d}));
  };
  useEffect(() => {
    if (appdata.length) {
      setFilteredAppdata(appdata.filter((d) => d.launchday >= state.brushExtent[0] && d.launchday <= state.brushExtent[1]));
    }
  }, [state.brushExtent]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "App",
    style: {maxWidth: "100vw"}
  }, /* @__PURE__ */ React.createElement("h2", null, "D3 Dashboard"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(StatLine, {
    allData: appdata,
    filteredData: filteredAppdata
  }), /* @__PURE__ */ React.createElement(StreamGraph, {
    hoverElement: state.hover,
    onHover,
    colorScale,
    data: filteredAppdata,
    size: [state.screenWidth, state.screenHeight / 2]
  }), /* @__PURE__ */ React.createElement(Brush, {
    changeBrush: onBrush,
    size: [state.screenWidth, 50]
  }), /* @__PURE__ */ React.createElement(WorldMap, {
    hoverElement: state.hover,
    onHover,
    colorScale,
    data: filteredAppdata,
    size: [state.screenWidth / 2, state.screenHeight / 2]
  }), /* @__PURE__ */ React.createElement(BarChart, {
    hoverElement: state.hover,
    onHover,
    colorScale,
    data: filteredAppdata,
    size: [state.screenWidth / 2, state.screenHeight / 2]
  })));
}
export default Dashboard;
