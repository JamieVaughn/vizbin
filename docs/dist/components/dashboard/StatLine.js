import React from "../../../_snowpack/pkg/react.js";
export default function StatLine(props) {
  const {allData, filteredData} = props;
  let allSales = allData.reduce((a, c, i) => {
    return a + (c.data[i] ?? 0);
  }, 0);
  allSales = Math.floor(allSales * 100) / 100;
  let filteredSales = filteredData.reduce((a, c, i) => {
    return a + (c.data[i] ?? 0);
  }, 0);
  filteredSales = Math.floor(filteredSales * 100) / 100;
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, /* @__PURE__ */ React.createElement("div", null, "Stats: ", /* @__PURE__ */ React.createElement("span", null, filteredData.length, "/", allData.length, " countries selected. ")), /* @__PURE__ */ React.createElement("div", null, "Average sales: ", /* @__PURE__ */ React.createElement("span", null, filteredSales, " (", allSales, ")"))));
}
