import React, {useState} from "../../snowpack/pkg/react.js";
import {VictoryArea, VictoryChart, VictoryStack, VictoryVoronoiContainer, Area} from "../../snowpack/pkg/victory.js";
const CustomArea = (props) => {
  if (!props.active) {
    return /* @__PURE__ */ React.createElement(Area, {
      ...props
    });
  } else {
    const {data, activeX, scale, style} = props;
    const index = data.findIndex((val) => val._x.getTime() === activeX.getTime());
    const previousPoint = index === 0 ? activeX : data[index - 1]._x;
    const nextPoint = index === data.length - 1 ? activeX : data[index + 1]._x;
    const percentScale = scale.x.copy().range([0, 100]);
    const currentPercent = percentScale(activeX);
    const previousPercent = percentScale(previousPoint);
    const nextPercent = percentScale(nextPoint);
    const minPercent = currentPercent - (currentPercent - previousPercent) / 2;
    const maxPercent = currentPercent + (nextPercent - currentPercent) / 2;
    const gradientId = Math.random();
    const isBrowser = typeof window !== "undefined" && window.__STATIC_GENERATOR !== true;
    const loc = isBrowser ? window.location.href : "";
    const newStyle = Object.assign({}, style, {
      fill: `url(${loc}#${gradientId})`,
      stroke: "none"
    });
    return /* @__PURE__ */ React.createElement("g", null, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("linearGradient", {
      id: gradientId
    }, /* @__PURE__ */ React.createElement("stop", {
      offset: "0%",
      stopColor: style.fill
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: `${minPercent}%`,
      stopColor: style.fill
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: `${minPercent}%`,
      stopColor: "tomato"
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: `${maxPercent}%`,
      stopColor: "tomato"
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: `${maxPercent}%`,
      stopColor: style.fill
    }), /* @__PURE__ */ React.createElement("stop", {
      offset: "100%",
      stopColor: style.fill
    }))), /* @__PURE__ */ React.createElement(Area, {
      ...props,
      style: newStyle
    }));
  }
};
export default function StackedArea() {
  const [state, setState] = useState({
    activeX: null
  });
  const onActivated = (points, props) => {
    setState({activeX: points[0]._x});
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Victory Stacked Area Chart"), /* @__PURE__ */ React.createElement(VictoryChart, {
    height: 200,
    width: 300,
    scale: {x: "time"},
    containerComponent: /* @__PURE__ */ React.createElement(VictoryVoronoiContainer, {
      onActivated
    })
  }, /* @__PURE__ */ React.createElement(VictoryStack, {
    colorScale: "blue"
  }, /* @__PURE__ */ React.createElement(VictoryArea, {
    data: [
      {x: new Date(2001, 1, 1), y: 5},
      {x: new Date(2006, 1, 1), y: 3},
      {x: new Date(2011, 1, 1), y: 2.2},
      {x: new Date(2016, 1, 1), y: 2},
      {x: new Date(2021, 1, 1), y: 0.5}
    ],
    dataComponent: /* @__PURE__ */ React.createElement(CustomArea, {
      activeX: state.activeX
    })
  }), /* @__PURE__ */ React.createElement(VictoryArea, {
    data: [
      {x: new Date(2001, 1, 1), y: 3},
      {x: new Date(2006, 1, 1), y: 2},
      {x: new Date(2011, 1, 1), y: 1.3},
      {x: new Date(2016, 1, 1), y: 1},
      {x: new Date(2021, 1, 1), y: 0.1}
    ],
    dataComponent: /* @__PURE__ */ React.createElement(CustomArea, {
      activeX: state.activeX
    })
  }), /* @__PURE__ */ React.createElement(VictoryArea, {
    data: [
      {x: new Date(2001, 1, 1), y: 4},
      {x: new Date(2006, 1, 1), y: 3},
      {x: new Date(2011, 1, 1), y: 1.2},
      {x: new Date(2016, 1, 1), y: 1},
      {x: new Date(2021, 1, 1), y: 0.2}
    ],
    dataComponent: /* @__PURE__ */ React.createElement(CustomArea, {
      activeX: state.activeX
    })
  }))));
}
