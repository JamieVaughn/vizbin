import React, {useState, PureComponent} from "../../_snowpack/pkg/react.js";
import {
  Label,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from "../../_snowpack/pkg/recharts.js";
const data = [
  {name: 1, cost: 4.11, impression: 100},
  {name: 2, cost: 2.39, impression: 120},
  {name: 3, cost: 1.37, impression: 150},
  {name: 4, cost: 1.16, impression: 180},
  {name: 5, cost: 2.29, impression: 200},
  {name: 6, cost: 3, impression: 499},
  {name: 7, cost: 0.53, impression: 50},
  {name: 8, cost: 2.52, impression: 100},
  {name: 9, cost: 1.79, impression: 200},
  {name: 10, cost: 2.94, impression: 222},
  {name: 11, cost: 4.3, impression: 210},
  {name: 12, cost: 4.41, impression: 300},
  {name: 13, cost: 2.1, impression: 50},
  {name: 14, cost: 8, impression: 190},
  {name: 15, cost: 0, impression: 300},
  {name: 16, cost: 9, impression: 400},
  {name: 17, cost: 3, impression: 200},
  {name: 18, cost: 2, impression: 50},
  {name: 19, cost: 3, impression: 100},
  {name: 20, cost: 7, impression: 100}
];
const getAxisYDomain = (from, to, ref, offset) => {
  const refData = data.slice(from - 1, to);
  let [bottom, top] = [refData[0][ref], refData[0][ref]];
  refData.forEach((d) => {
    if (d[ref] > top)
      top = d[ref];
    if (d[ref] < bottom)
      bottom = d[ref];
  });
  return [(bottom | 0) - offset, (top | 0) + offset];
};
const initialState = {
  data,
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: "",
  refAreaRight: "",
  top: "dataMax+1",
  bottom: "dataMin-1",
  top2: "dataMax+20",
  bottom2: "dataMin-20",
  animation: true
};
export default function LineRecharts() {
  const [state, setState] = useState(initialState);
  const zoom = () => {
    let {refAreaLeft: refAreaLeft2, refAreaRight: refAreaRight2, data: data3} = state;
    if (refAreaLeft2 === refAreaRight2 || refAreaRight2 === "") {
      setState(() => ({
        refAreaLeft: "",
        refAreaRight: ""
      }));
      return;
    }
    if (refAreaLeft2 > refAreaRight2)
      [refAreaLeft2, refAreaRight2] = [refAreaRight2, refAreaLeft2];
    const [bottom3, top3] = getAxisYDomain(refAreaLeft2, refAreaRight2, "cost", 1);
    const [bottom22, top22] = getAxisYDomain(refAreaLeft2, refAreaRight2, "impression", 50);
    setState(() => ({
      refAreaLeft: "",
      refAreaRight: "",
      data: [...data3],
      left: refAreaLeft2,
      right: refAreaRight2,
      bottom: bottom3,
      top: top3,
      bottom2: bottom22,
      top2: top22
    }));
  };
  const zoomOut = () => {
    const {data: data3} = state;
    setState(() => ({
      data: [...data3],
      refAreaLeft: "",
      refAreaRight: "",
      left: "dataMin",
      right: "dataMax",
      top: "dataMax+1",
      bottom: "dataMin",
      top2: "dataMax+50",
      bottom2: "dataMin+50"
    }));
  };
  const {
    data: data2,
    barIndex,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    top,
    bottom,
    top2,
    bottom2
  } = state;
  return /* @__PURE__ */ React.createElement("div", {
    className: "highlight-bar-charts",
    style: {userSelect: "none"}
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn update",
    onClick: zoomOut
  }, "Zoom Out"), /* @__PURE__ */ React.createElement(LineChart, {
    width: 800,
    height: 400,
    data: data2,
    onMouseDown: (e) => setState({...state, refAreaLeft: e?.activeLabel}),
    onMouseMove: (e) => state.refAreaLeft && setState({...state, refAreaRight: e?.activeLabel}),
    onMouseUp: zoom
  }, /* @__PURE__ */ React.createElement(CartesianGrid, {
    strokeDasharray: "3 3"
  }), /* @__PURE__ */ React.createElement(XAxis, {
    allowDataOverflow: true,
    dataKey: "name",
    domain: [left, right],
    type: "number"
  }), /* @__PURE__ */ React.createElement(YAxis, {
    allowDataOverflow: true,
    domain: [bottom, top],
    type: "number",
    yAxisId: "1"
  }), /* @__PURE__ */ React.createElement(YAxis, {
    orientation: "right",
    allowDataOverflow: true,
    domain: [bottom2, top2],
    type: "number",
    yAxisId: "2"
  }), /* @__PURE__ */ React.createElement(Tooltip, null), /* @__PURE__ */ React.createElement(Line, {
    yAxisId: "1",
    type: "natural",
    dataKey: "cost",
    stroke: "#8884d8",
    animationDuration: 300
  }), /* @__PURE__ */ React.createElement(Line, {
    yAxisId: "2",
    type: "natural",
    dataKey: "impression",
    stroke: "#82ca9d",
    animationDuration: 300
  }), refAreaLeft && refAreaRight ? /* @__PURE__ */ React.createElement(ReferenceArea, {
    yAxisId: "1",
    x1: refAreaLeft,
    x2: refAreaRight,
    strokeOpacity: 0.3
  }) : null));
}
