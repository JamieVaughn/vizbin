import React, {useEffect, useRef} from 'react'
// https://observablehq.com/@shaunlebron/minimal-d3-zoom-replacement
function draw(ctx) {
  ctx.save();

  // draw background
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, w, h);

  // apply pan/zoom transform to the canvas
  ctx.translate(transform.x, transform.y);
  ctx.scale(transform.k, transform.k);

  // draw a box
  ctx.fillStyle = "#fff";
  const pad = 50;
  ctx.beginPath();
  ctx.rect(pad, pad, w - pad * 2, h - pad * 2);
  ctx.fill();
  ctx.stroke();

  // draw text inside box
  ctx.font = "64px helvetica";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#333";
  ctx.fillText("pan/zoom", w / 2, h / 2);

  ctx.restore();
}


export default function CanvasZoom ({h=500, w=700}) {
  const [zoom, setZoom] = useState({ x: 0, y: 0, k: 1 })
  const canvas = useRef(null)
  let ctx;

  useEffect(() => {
    if(canvas.current) {
      const ctx = canvas.current.context2d(w, h);
      const { canvas } = ctx;
      draw(ctx)
    }
  }, [zoom])
    
  
    // state
    let dragOffset = null;
  
    // mouse and wheel coordinates
    const wheelDelta = e => (-e.deltaY * (e.deltaMode ? 120 : 1)) / 500; // from d3-zoom
    const mousePos = e => ({ x: e.layerX, y: e.layerY });
  
    const initPan = e => {
      const { x, y } = mousePos(e);
      setZoom(state => {
        k: state.k,
        x: x - state.x,
        y: y - state.y
      });
    };
    const endPan = e => {
      dragOffset = null;
    };
    const pan = e => {
      const { x, y } = mousePos(e);
      setZoom(state => {
        k: state.k,
        x: x - state.x;
        y: y - state.y;
      })
    };
    const wheel = e => {
      const { x, y } = mousePos(e);
  
      // get current inverted mouse coordinate
      const sx = (x - zoom.x) / zoom.k;
      const sy = (y - zoom.y) / zoom.k;
  
      // change scale
      // (converts linear wheel delta to exponential scale delta)
      zoom.k *= 2 ** wheelDelta(e);
  
      // keep inverted mouse coordinate at same pixel
      zoom.x = x - sx * zoom.k;
      zoom.y = y - sy * zoom.k;
  
      e.preventDefault();
    };
  
  return (
    <div>
      <canvas 
      ref={canvas} 
      onScroll={wheel}
      onMouseDown={initPan}
      onMouseMove={pan}
      onMouseUp={endPan}
      />
    </div>
  )
}