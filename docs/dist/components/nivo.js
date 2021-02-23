import React from "../../snowpack/pkg/react.js";
import {ResponsiveBullet} from "../../snowpack/pkg/@nivo/bullet.js";
export default function NivoBullet({data}) {
  return /* @__PURE__ */ React.createElement("div", {
    style: {height: "500px"}
  }, /* @__PURE__ */ React.createElement(ResponsiveBullet, {
    data,
    margin: {top: 50, right: 90, bottom: 50, left: 90},
    spacing: 46,
    titleAlign: "start",
    titleOffsetX: -70,
    measureSize: 0.2
  }));
}
