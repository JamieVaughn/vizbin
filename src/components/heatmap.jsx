
const labelCategories= [
  "counts_normalized_by_expected_samples"
  ,"counts_raw"
  ,"negative_value_counts"
  ,"negative_value_counts_daily"
  ,"null_value_counts"
  ,"null_value_counts_daily"
  ,"repeated_timestamp_counts"
  ,"repeated_timestamp_counts_daily"
  ,"repeated_timestamps_normalized_by_sample_counts"
  ,"repeated_value_counts"
  ,"repeated_value_counts_daily"
  ,"zero_value_counts"
  ,"zero_value_counts_daily"
]


const fetchJSON = url => fetch(url).then(r => r.json());

let data = null;
let dataImage = null;
let dataPixels = null;
let dataName = null;
let mips = null;
let numMips = 5;
let mouse = [];
let mouseData;
let loading = true;
let zoom = null;

const minimapWidth = 800;

const metrics = {
  counts_normalized_by_expected_samples: "normalized counts",
  counts_raw: "counts",
  negative_value_counts: "negative values",
  negative_value_counts_daily: "negative values",
  null_value_counts: "null values",
  null_value_counts_daily: "null values",
  repeated_timestamp_counts: "repeated timestamps",
  repeated_timestamp_counts_daily: "repeated timestamps",
  repeated_timestamps_normalized_by_sample_counts:
    "normalized repeated timestamps",
  repeated_value_counts: "repeated values",
  repeated_value_counts_daily: "repeated values",
  zero_value_counts: "zero values",
  zero_value_counts_daily: "zero values"
};

function getDataPixel(x, y) {
  const w = dataImage.width;
  const i = y * (w * 4) + x * 4;
  return {
    r: dataPixels[i],
    g: dataPixels[i + 1],
    b: dataPixels[i + 2],
    a: dataPixels[i + 3]
  };
}

function getStreamValueEstimate(stream, point) {
  const { min, max } = data.streamStats[stream]; // TODO: fix stats to only consider numeric values
  const { r, g, b, a } = getDataPixel(point, stream);

  // interpret red as missing data
  if (r === 255 && g === 0 && b === 0) {
    return null;
  }

  const scale = d3
    .scaleLinear()
    .domain([0, 255])
    .range([max, min]);
  const value = scale(r);

  // keep as floating point
  if (dataName.includes("normalized")) {
    return value;
  }

  // raw counts should be integers
  return isNumeric(value) ? Math.floor(value) : value;
}

let camTransform = d3.zoomIdentity;
let canvas;

const mouseDateFormat = d3.timeFormat("%b %-d, %Y");
const mouseTimeFormat = d3.timeFormat("%I:%M:%S %p");

const floatFormat = d3.format(",.2f");
const intFormat = d3.format(",d");
const isNumeric = x => !isNaN(parseFloat(x)) && isFinite(x);
const mouseValueFormat = x =>
  !isNumeric(x)
    ? "<missing data>"
    : Number.isInteger(x) ? intFormat(x) : floatFormat(x);

const parseDay = d3.timeParse("%Y-%m-%d");
function parseTimestamp(timestamp) {
  if (typeof timestamp === "string") {
    return parseDay(timestamp);
  }
  if (typeof timestamp === "number") {
    return new Date(timestamp / 1e6);
  }
  return timestamp;
}

function switchDataSet(name) {
  dataName = name;
  dataImage = new Image();
  dataImage.src = `/data/${name}.png`;
  data = null;
  return Promise.all([
    fetchJSON(`/data/${name}.json`).then(d => {
      data = d;
      data.dates = data.timestamps.map(parseTimestamp);
      loading = false;
    }),
    new Promise(resolve => {
      dataImage.onload = resolve;
    })
  ]).then(generateMips);
}

function generateMips() {
  mips = [];
  let w = dataImage.width;
  let h = dataImage.height;
  for (let i = 0; i < numMips; i++) {
    const img = document.createElement("canvas");
    const ctx = img.getContext("2d");
    img.width = Math.ceil(w);
    img.height = Math.ceil(h);
    if (i === 0) {
      ctx.drawImage(dataImage, 0, 0);
      dataPixels = ctx.getImageData(0, 0, w, h).data;
    } else {
      ctx.drawImage(mips[i - 1], 0, 0, w * 2, h * 2, 0, 0, w, h);
    }
    mips.push(img);
    w /= 2;
    h /= 2;
  }
}
function getMipLevel(width) {
  let level = Math.floor(Math.log2(dataImage.width / width));
  level = Math.max(0, level);
  level = Math.min(numMips - 1, level);
  return level;
}

function getScreenSize() {
  const { clientWidth, clientHeight } = document.documentElement;
  return { width: clientWidth, height: clientHeight };
}

function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

function setImageSmoothEnabled(ctx, val) {
  ctx.mozImageSmoothingEnabled = val;
  ctx.webkitImageSmoothingEnabled = val;
  ctx.msImageSmoothingEnabled = val;
  ctx.imageSmoothingEnabled = val;
}

function getCursorPosition(e) {
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  return [x, y];
}

function initCanvas() {
  canvas = document.getElementById("canvas");
  window.addEventListener("mousemove", e => {
    mouse = getCursorPosition(e);
    mouseData = dataAtMouse();
    draw();
  });
  window.addEventListener("resize", sizeCanvas);
  zoom = d3.zoom().on("zoom", () => {
    camTransform = d3.event.transform;
    draw();
  });
  d3.select(canvas).call(zoom);
  sizeCanvas();
}

function sizeCanvas() {
  const { width, height } = getScreenSize();
  const pixelRatio = getPixelRatio();
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  draw();
}

function dataAtMouse() {
  if (!mouse || !data) return;
  const [x, y] = camTransform.invert(mouse).map(Math.floor);
  if (0 <= x && x < dataImage.width && 0 <= y && y < dataImage.height) {
    const pointIdx = x;
    const stream = y;
    const streamId = data.streamIds[stream];
    const date = data.dates[pointIdx];

    // To save time/bandwidth/storage, we don't use exact values.
    // const value = data.streamPoints[stream][pointIdx];
    const value = getStreamValueEstimate(stream, pointIdx);

    const { min, max, mean } = data.streamStats[stream];
    return {
      pointIdx,
      stream,
      streamId,
      date,
      value,
      min,
      max,
      mean
    };
  }
}

function drawMouseAnnotation(
  ctx,
  { pointIdx, stream, streamId, date, value, min, max, mean }
) {
  ctx.save();
  ctx.translate(pointIdx, stream);
  const scale = camTransform.k;
  const invScale = 1 / scale;
  ctx.scale(invScale, invScale);

  if (scale > 3) {
    ctx.strokeStyle = "#0FF";
    ctx.strokeRect(0, 0, scale, scale);
  }

  const offset = Math.max(camTransform.k, 20);
  ctx.translate(offset, 0);

  ctx.font = "10px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const light = "#777";
  const dark = "#111";

  const valueString = mouseValueFormat(value);
  // prettier-ignore
  const lines = [
    { color: light, text: `Stream #${intFormat(streamId)}` },
    { color: dark, text: `Value = ${valueString} ${isNumeric(value) ? metrics[dataName] : ""}` },
    { color: light, text: `Range [ ${mouseValueFormat(min)} to ${mouseValueFormat(max)} ]` },
    { color: light, text: "" },
    { color: light, text: `${mouseTimeFormat(date)}` },
    { color: light, text: `on ${mouseDateFormat(date)}` }
  ];

  const textPad = 10;
  const lineHeight = 14;
  const h = lineHeight * lines.length + textPad * 2;
  const w =
    d3.max(lines.map(({ text }) => ctx.measureText(text).width)) + 2 * textPad;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(0, 0, w, h);
  ctx.translate(textPad, textPad);

  for (let { color, text } of lines) {
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.translate(0, lineHeight);
  }

  ctx.restore();
}

function drawLoading(ctx) {
  ctx.save();
  const { width, height } = getScreenSize();
  const fontSize = 10;
  ctx.font = "${fontSize}px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.translate(width / 2, 0);
  const text = "Loading Data...";
  const pad = 10;
  const w = ctx.measureText(text).width + 2 * pad;
  const h = fontSize + 2 * pad;
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.fillRect(-w / 2, 0, w, h);
  ctx.fillStyle = "#555";
  ctx.fillText(text, 0, pad);
  ctx.restore();
}

function getTimeScale() {
  if (!data) return;
  const screenWidth = getScreenSize().width;

  // get the visible time domain
  let leftT = Math.floor(camTransform.invertX(0));
  let rightT = Math.floor(camTransform.invertX(screenWidth));

  // do nothing if no visible time
  if (dataImage.width < leftT || rightT < 0) return;

  // intersect visible range with the actual data range
  leftT = Math.max(0, leftT);
  rightT = Math.min(dataImage.width - 1, rightT);

  // FIXME: off-by-one error since rightT corresponds to the point after the last pixel?

  // get actual dates
  const domain = d3.range(leftT, rightT + 1).map(t => data.dates[t]);

  // get pixel position of bounds
  const range = d3.range(leftT, rightT + 1).map(t => camTransform.applyX(t));

  return d3
    .scaleTime()
    .domain(domain)
    .range(range);
}

function drawTimeAxis(ctx) {
  const timeScale = getTimeScale();
  if (!timeScale) return;

  const xs = timeScale.range();
  const w = xs[xs.length - 1] - xs[0];
  const h = 40;
  const topY = Math.max(0, camTransform.applyY(0) - h);

  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillRect(xs[0], topY, w, h);

  const desiredTickDist = 100;
  const numTicks = Math.floor(w / desiredTickDist);
  const ticks = timeScale.ticks(numTicks);

  ctx.save();
  ctx.font = "10px sans-serif";
  ctx.textBaseline = "bottom";
  ctx.textAlign = "center";
  const formatTick = timeScale.tickFormat();
  const tickSize = 10;
  const textPad = 10;
  ctx.fillStyle = "#555";
  ctx.strokeStyle = "#555";
  ctx.translate(0, topY);
  for (let t of ticks) {
    const x = timeScale(t);
    ctx.fillText(formatTick(t), x, h - tickSize - textPad);
    ctx.beginPath();
    ctx.moveTo(x, h);
    ctx.lineTo(x, h - tickSize);
    ctx.stroke();
  }
  ctx.restore();
}

function drawMinimap(ctx) {
  const screen = getScreenSize();

  const aspectRatio = dataImage.height / dataImage.width;
  const minimapHeight = minimapWidth * aspectRatio;

  const minimapX = 0;
  const minimapY = screen.height - minimapHeight;

  const svg = document.querySelector("#minimap");
  svg.style = "position:absolute; left:0; bottom:0";
  svg.setAttribute("width", minimapWidth);
  svg.setAttribute("height", minimapHeight);

  // outline
  const outline = document.querySelector("#minimapOutline");
  // minimap.setAttribute()
  outline.setAttribute("x", 0);
  outline.setAttribute("y", 0);
  outline.setAttribute("width", "100%");
  outline.setAttribute("height", "100%");
  outline.setAttribute("stroke", "#0FF");
  outline.setAttribute("fill", "none");

  // draw visible window

  const winX = camTransform.invertX(0);
  const winY = camTransform.invertY(0);
  const winRightX = camTransform.invertX(screen.width);
  const winBottomY = camTransform.invertY(screen.height);

  const scaleX = d3
    .scaleLinear()
    .domain([0, dataImage.width])
    .range([0, minimapWidth]);
  const scaleY = d3
    .scaleLinear()
    .domain([0, dataImage.height])
    .range([0, minimapHeight]);

  const win = document.querySelector("#minimapWindow");

  let left0, top0, right0, bottom0;
  const brush = d3
    .brush()
    .on("start", () => {
      if (!d3.event.sourceEvent) return;
      [[left0, top0], [right0, bottom0]] = d3.event.selection;
    })
    .on("brush", () => {
      if (!d3.event.sourceEvent) return;
      if (d3.event.sourceEvent.type === "brush") return;
      if (d3.event.sourceEvent.type === "zoom") return;

      const [[left1, top1], [right1, bottom1]] = d3.event.selection;

      const currW = right1 - left1;
      const currH = bottom1 - top1;
      const currAspect = currW / currH;
      const screenAspect = screen.width / screen.height;
      let finalW, finalH;
      if (currAspect > screenAspect) {
        finalW = currW;
        finalH = currW / screenAspect;
      } else {
        finalH = currH;
        finalW = currH * screenAspect;
      }

      const topFixed = top0 === top1;
      const leftFixed = left0 === left1;
      const x = leftFixed ? left1 : right1 - finalW;
      const y = topFixed ? top1 : bottom1 - finalH;

      d3.select(win).call(brush.move, [[x, y], [x + finalW, y + finalH]]);

      if (finalW > 0) {
        const widthOnImage = scaleX.invert(finalW);
        const ck = screen.width / widthOnImage;
        const cx = scaleX.invert(x);
        const cy = scaleY.invert(y);
        camTransform = d3.zoomIdentity.scale(ck).translate(-cx, -cy);
        d3.select(canvas).call(zoom.transform, camTransform);
      }
    });

  d3
    .select(win)
    .call(brush)
    .call(brush.move, [
      [scaleX(winX), scaleY(winY)],
      [scaleX(winRightX), scaleY(winBottomY)]
    ]);

  if (dataImage) {
    setImageSmoothEnabled(ctx, true);
    const mipLevel = getMipLevel(minimapWidth);
    ctx.drawImage(
      mips[mipLevel],
      minimapX,
      minimapY,
      minimapWidth,
      minimapHeight
    );
  }
}

function draw() {
  const ctx = canvas.getContext("2d");
  setImageSmoothEnabled(ctx, camTransform.k < 1);

  ctx.save();

  // scale for retina screens
  {
    const pixelRatio = getPixelRatio();
    ctx.scale(pixelRatio, pixelRatio);
  }
  // clear screen
  {
    const { width, height } = getScreenSize();
    ctx.clearRect(0, 0, width, height);
  }
  // transform based on camera
  ctx.save();
  {
    const { k, x, y } = camTransform;
    ctx.translate(x, y);
    ctx.scale(k, k);
  }
  // draw image
  if (dataImage) {
    const scale = camTransform.k;
    const mipLevel = getMipLevel(scale * dataImage.width);
    ctx.drawImage(mips[mipLevel], 0, 0, dataImage.width, dataImage.height);
  }
  // draw mouse annotation
  if (mouseData) {
    drawMouseAnnotation(ctx, mouseData);
  }
  ctx.restore();

  // indicate if data is still loading
  if (loading) {
    drawLoading(ctx);
  }

  drawTimeAxis(ctx);
  drawMinimap(ctx);

  ctx.restore();
}

function createDatasetSelector(datasets, choice) {
  const select = document.getElementById("dataset-select");
  select.onchange = () => {
    const name = datasets[select.selectedIndex];
    if (name) {
      // go to the new dataset URL
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("dataset", name);
      window.location.search = searchParams.toString();
    }
  };

  for (let name of datasets) {
    const option = document.createElement("option");
    option.text = name;
    option.selected = name === choice;
    select.appendChild(option);
  }
}

fetchJSON("/dataIndex.json")
  .then(datasets => {
    const params = new URL(document.location).searchParams;
    const choice = params.get("dataset");
    createDatasetSelector(datasets, choice);
    return switchDataSet(choice || datasets[0]);
  })
  .then(initCanvas);

// fetchJSON("/dataIndex.json")
//   .then(dataNames => switchDataSet(dataNames[0]))
//   .then(initCanvas);


export default function Heatmap(props) {

  return (
    <>
      <div class="dataset-container">
        <label>Datasets</label>
        <select id="dataset-select"></select>
      </div>
      <canvas id="canvas"></canvas>
      <svg id="minimap" version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
        <rect id="minimapOutline">
        </rect>
        <g id="minimapWindow">
        </g>
      </svg>
    </>
  )
}
  
 