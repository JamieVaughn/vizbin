import React from "../../snowpack/pkg/react.js";
import {XYPlot, ArcSeries, XAxis, YAxis} from "../../snowpack/pkg/react-vis.js";
const COLORS = [
  "#19CDD7",
  "#DDB27C",
  "#88572C",
  "#FF991F",
  "#F15C17",
  "#223F9A",
  "#DA70BF",
  "#125C77",
  "#4DC19C",
  "#776E57",
  "#12939A",
  "#17B8BE",
  "#F6D18A",
  "#B7885E",
  "#FFCB99",
  "#F89570",
  "#829AE3",
  "#E79FD5",
  "#1E96BE",
  "#89DAC1",
  "#B3AD9E"
];
const PI = Math.PI;
function updateData() {
  const divider = Math.floor(Math.random() * 8 + 3);
  const newData = [...new Array(5)].map((row, index) => {
    return {
      color: index,
      radius0: Math.random() > 0.8 ? Math.random() + 1 : 0,
      radius: Math.random() * 3 + 1,
      angle: (index + 1) * PI / divider,
      angle0: index * PI / divider
    };
  });
  return newData.concat([
    {angle0: 0, angle: PI * 2 * Math.random(), radius: 1.1, radius0: 0.8}
  ]);
}
function updateLittleData() {
  const portion = Math.random();
  return [
    {
      angle0: 0,
      angle: portion * PI * 2,
      radius0: 0,
      radius: 10,
      color: COLORS[13]
    },
    {
      angle0: portion * PI * 2,
      angle: 2 * PI,
      radius0: 0,
      radius: 10,
      color: COLORS[12]
    }
  ];
}
export default class PieReactVis extends React.Component {
  state = {
    data: updateData(),
    littleData: updateLittleData(),
    value: false
  };
  render() {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
      style: {margin: "1rem"},
      onClick: () => this.setState({
        data: updateData(),
        littleData: updateLittleData()
      })
    }, "UPDATE"), /* @__PURE__ */ React.createElement(XYPlot, {
      xDomain: [-5, 5],
      yDomain: [-5, 5],
      width: 310,
      height: 310,
      className: "react-vis-pie"
    }, /* @__PURE__ */ React.createElement(XAxis, {
      hideLine: true,
      title: "X"
    }), /* @__PURE__ */ React.createElement(YAxis, {
      title: "Y"
    }), /* @__PURE__ */ React.createElement(ArcSeries, {
      animation: true,
      radiusDomain: [0, 4],
      data: this.state.data.map((row) => {
        if (this.state.value && this.state.value.color === row.color) {
          return {...row, style: {stroke: "black", strokeWidth: "5px"}};
        }
        return row;
      }),
      colorRange: COLORS,
      onValueMouseOver: (row) => this.setState({value: row}),
      onSeriesMouseOut: () => this.setState({value: false}),
      colorType: "category"
    }), /* @__PURE__ */ React.createElement(ArcSeries, {
      animation: true,
      radiusType: "literal",
      center: {x: -2, y: 2},
      data: this.state.littleData,
      colorType: "literal"
    })));
  }
}
