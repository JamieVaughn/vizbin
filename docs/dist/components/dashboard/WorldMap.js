import React from "../../../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import {geoMercator, geoPath} from "../../../_snowpack/pkg/d3-geo.js";
function WorldMap(props) {
  const {onHover, hoverElement, colorScale, size, data} = props;
  const projection = geoMercator().scale(100).translate([350, 300]);
  const pathGenerator = geoPath().projection(projection);
  const countries = data.map((d, i) => /* @__PURE__ */ React.createElement("path", {
    key: "path" + i,
    d: pathGenerator(d),
    onMouseEnter: () => {
      onHover(d);
    },
    style: {fill: hoverElement === d.id ? "#FCBC34" : colorScale(d.launchday), stroke: "black", strokeOpacity: 0.5},
    className: "countries"
  }));
  return /* @__PURE__ */ React.createElement("svg", {
    width: size[0] * 2,
    height: size[1] * 3
  }, countries);
}
export default WorldMap;
