import React from 'react';
import * as d3 from 'd3'
import { D3HBars, D3VBars }  from './d3examples/barchart'

// type Props = {
//   data: any,
//   height: number,
//   margin: Object | number,
//   selectX: (datum: any) => any,
//   selectY: (datum: any) => any,
//   width: number,
// };

function getMarginObjectForNumber(number) {
    return {
      top: number,
      right: number,
      bottom: number,
      left: number,
    };
  }
  
function getMarginObject(
    margin
  ) {
    if (!margin) {
      return getMarginObjectForNumber(0);
    }
  
    if (typeof margin === 'number') {
      return getMarginObjectForNumber(margin);
    }
  
    const {
      top,
      right,
      bottom,
      left,
  
      vertical,
      horizontal,
    } = margin;
  
    return {
      top: top || vertical || 0,
      right: right || horizontal || 0,
      bottom: bottom || vertical || 0,
      left: left || horizontal || 0,
    };
  }
//   type Params = {
//     margin: Object | number,
//   };
function getContentContainerStyle({
    margin,
  }) {
    const marginObject = getMarginObject(margin);
  
    return {
      transform: `translate(${marginObject.left}px, ${marginObject.top}px)`,
    };
  };
// type Params = {
//   height: number,
//   margin: Object | number,
//   width: number,
// };

function getSVGDimensions({
  height,
  margin,
  width,
}) {
  const marginObject = getMarginObject(margin);
  const heightWithMargin = height
    + marginObject.top
    + marginObject.bottom;
  const widthWithMargin = width
    + marginObject.left
    + marginObject.right;

  return {
    height: heightWithMargin,
    width: widthWithMargin,
  };
};

// type Props = {
//   children: React$Element | React$Element[],
//   contentContainerBackgroundRectClassName: ?string,
//   contentContainerGroupClassName: ?string,
//   height: number,
//   margin: Object | number,
//   width: number,
// };

const SVGWithMargin = ({
  children,
  contentContainerBackgroundRectClassName,
  contentContainerGroupClassName,
  height,
  margin,
  renderContentContainerBackground,
  width,
  ...rest
}) => (
  <svg
    {...rest}
    {...getSVGDimensions({
      height,
      margin,
      width,
    })}
  >
    <g
      className={contentContainerGroupClassName}
      style={getContentContainerStyle({ margin })}
    >
      {!!contentContainerBackgroundRectClassName && (
        <rect
          className={contentContainerBackgroundRectClassName}
          height={height}
          width={width}
          x={0}
          y={0}
        />
      )}
      {children}
    </g>
  </svg>
);

const D3react = ({
  data,
  height,
  width,
  margin,
  selectX,
  selectY,
}) => {
  const xScale = d3.scaleTime()
    .domain(d3.extent(data, selectX))
    .range([0, width]);
  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, selectY))
    .range([height, 0]);

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(data.length / 2);
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(3);

  const selectScaledX = datum => xScale(selectX(datum));
  const selectScaledY = datum => yScale(selectY(datum));

  const sparkLine = d3.line()
    .x(selectScaledX)
    .y(selectScaledY);

  const linePath = sparkLine(data);
  const circlePoints = data.map(datum => ({
    x: selectScaledX(datum),
    y: selectScaledY(datum),
  }));

  return (
      <>
    <SVGWithMargin
      className="container"
      contentContainerBackgroundRectClassName="contentContainerBackgroundRect"
      contentContainerGroupClassName="contentContainer"
      height={height}
      margin={margin}
      width={width}
    >
      <g
        className="xAxis"
        ref={node => d3.select(node).call(xAxis)}
        style={{
          transform: `translateY(${height}px)`,
        }}
      />
      <g className="yAxis" ref={node => d3.select(node).call(yAxis)} />
      <g className="line">
        <path d={linePath} />
      </g>
      <g className="scatter">
        {circlePoints.map(circlePoint => (
          <circle
            cx={circlePoint.x}
            cy={circlePoint.y}
            key={`${circlePoint.x},${circlePoint.y}`}
            r={4}
          />
        ))}
      </g>
    </SVGWithMargin>

    <D3HBars />
    <D3VBars />
    </>
  );
};

export default D3react