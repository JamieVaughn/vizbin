import React, {useState, useEffect} from "../snowpack/pkg/react.js";
import {Routes, Route, Link} from "../snowpack/pkg/react-router-dom.js";
import logo from "./logo.svg.proxy.js";
import "./App.css.proxy.js";
import Navigate from "./components/navigate.js";
import Home from "./components/home.js";
import Visx from "./components/visx.js";
import D3react from "./components/D3react.js";
import Dashboard from "./components/dashboard/index.js";
import StackedArea from "./components/victory.js";
import LineRecharts from "./components/recharts.js";
import PieReactVis from "./components/reactvis.js";
import NivoBullet from "./components/nivo.js";
import BrushChart from "./components/vx.js";
import WythePlot from "./components/wythe.js";
import {ZoomPan} from "./components/zoompan.js";
import {nivoData} from "../data/nivo.js";
import {quality} from "../data/quality.js";
function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1e3);
    return () => clearTimeout(timer);
  }, [count, setCount]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "App"
  }, /* @__PURE__ */ React.createElement("header", {
    className: "App-header"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "logo-box"
  }, /* @__PURE__ */ React.createElement("code", null, count), /* @__PURE__ */ React.createElement(Link, {
    to: "/",
    style: {width: "50px"}
  }, /* @__PURE__ */ React.createElement("img", {
    src: logo,
    className: "App-logo",
    alt: "logo"
  }))), /* @__PURE__ */ React.createElement(Navigate, null)), /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, {
    path: "/",
    element: /* @__PURE__ */ React.createElement(Home, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/d3",
    element: /* @__PURE__ */ React.createElement(D3react, {
      data: quality,
      height: 40,
      width: 200,
      margin: 20,
      selectX: (datum) => new Date(datum.day).setHours(0, 0, 0, 0),
      selectY: (datum) => datum.productPerceivedQuality
    })
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/dashboard",
    element: /* @__PURE__ */ React.createElement(Dashboard, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/visx",
    element: /* @__PURE__ */ React.createElement(Visx, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/victory",
    element: /* @__PURE__ */ React.createElement(StackedArea, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/recharts",
    element: /* @__PURE__ */ React.createElement(LineRecharts, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/reactvis",
    element: /* @__PURE__ */ React.createElement(PieReactVis, null)
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/nivo",
    element: /* @__PURE__ */ React.createElement(NivoBullet, {
      data: nivoData
    })
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/vx",
    element: /* @__PURE__ */ React.createElement(BrushChart, {
      height: 400,
      width: 600
    })
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/wythe",
    element: /* @__PURE__ */ React.createElement("div", {
      style: {margin: "1rem"}
    }, /* @__PURE__ */ React.createElement(WythePlot, null))
  }), /* @__PURE__ */ React.createElement(Route, {
    path: "/zoompan",
    element: /* @__PURE__ */ React.createElement(ZoomPan, null)
  })));
}
export default App;
