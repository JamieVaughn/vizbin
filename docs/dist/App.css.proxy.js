// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".App {\n  text-align: center;\n}\n.App code {\n  background: #FFF3;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n.App p {\n  margin: 0.4rem;\n}\n.App-logo {\n  pointer-events: none;\n}\n.logo-box {\n  display: flex;\n\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  .App-logo {\n    animation: App-logo-spin infinite 20s linear;\n  }\n}\n\n.App-header {\n  background-color: #282c34;\n  display: flex;\n  align-items: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n  padding: 1rem;\n}\n\n.App-link {\n  color: #61dafb;\n}\nnav {\n  margin-left: auto;\n}\nnav a {\n  margin: 0 0.5rem;\n}\nnav a {\n  margin: 0 0.5rem;\n}\nnav a:visited {\n  color: coral;\n}\n\n@keyframes App-logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.react-vis-pie {\n  margin: 0 auto;\n}\n\n.wythe {\n  margin: 1rem auto;\n  display: flex;\n  flex-direction: column;\n}\ncanvas {\n  border-bottom: 1px solid white;\n  /* border-right: 2px solid chartreuse; */\n  overflow: visible;\n  margin: 0;\n  padding: 0;\n}\n\n/* d3react */\n\n.container > .contentContainer > .contentContainerBackgroundRect {\n  fill: #fafafa;\n}\n\n.container > .contentContainer .xAxis text {\n  font-size: 8px;\n}\n\n.container > .contentContainer .line path {\n  fill: transparent;\n  stroke: #29b6f6;\n  stroke-width: 2;\n}\n\n.container > .contentContainer .scatter circle {\n  fill: #5c6bc0;\n  stroke: #fafafa;\n  stroke-width: 2;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}