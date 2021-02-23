import React from "../../snowpack/pkg/react.js";
import {Link} from "../../snowpack/pkg/react-router-dom.js";
export default function Navigate(props) {
  return /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement(Link, {
    to: "/d3"
  }, "D3"), /* @__PURE__ */ React.createElement(Link, {
    to: "/dashboard"
  }, "Dashboard"), /* @__PURE__ */ React.createElement(Link, {
    to: "/visx"
  }, "VisX"), /* @__PURE__ */ React.createElement(Link, {
    to: "/victory"
  }, "Victory"), /* @__PURE__ */ React.createElement(Link, {
    to: "/recharts"
  }, "Recharts"), /* @__PURE__ */ React.createElement(Link, {
    to: "/reactvis"
  }, "React-Vis"), /* @__PURE__ */ React.createElement(Link, {
    to: "/nivo"
  }, "Nivo"), /* @__PURE__ */ React.createElement(Link, {
    to: "/vx"
  }, "VX"), /* @__PURE__ */ React.createElement(Link, {
    to: "/wythe"
  }, "Wythe"), /* @__PURE__ */ React.createElement(Link, {
    to: "/zoompan"
  }, "ZoomPan"));
}
