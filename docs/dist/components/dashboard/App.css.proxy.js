// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "rect.overlay {\n  /* opacity: 0; */\n}\n\nrect.selection {\n  fill: #FE9922;\n  opacity: 0.5;\n}\n\nrect.handle {\n  fill: #FE9922;\n  opacity: 0.25;\n}\n\npath.countries {\n  stroke-width: 1;\n  stroke: #75739F;\n  fill: #5EAFC6;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}