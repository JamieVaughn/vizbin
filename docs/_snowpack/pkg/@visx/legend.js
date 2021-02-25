import { r as react } from '../common/index-abdc4d2d.js';
import { p as propTypes } from '../common/index-ad697a84.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';
import { G as Group } from '../common/Group-1bab4bbd.js';
import '../common/_commonjsHelpers-4f955397.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LegendItem(_ref) {
  var _ref$flexDirection = _ref.flexDirection,
      flexDirection = _ref$flexDirection === void 0 ? 'row' : _ref$flexDirection,
      _ref$alignItems = _ref.alignItems,
      alignItems = _ref$alignItems === void 0 ? 'center' : _ref$alignItems,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? '0' : _ref$margin,
      _ref$display = _ref.display,
      display = _ref$display === void 0 ? 'flex' : _ref$display,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["flexDirection", "alignItems", "margin", "display", "children"]);

  return /*#__PURE__*/react.createElement("div", _extends({
    className: "visx-legend-item",
    style: {
      display: display,
      alignItems: alignItems,
      flexDirection: flexDirection,
      margin: margin
    }
  }, restProps), children);
}
LegendItem.propTypes = {
  alignItems: propTypes.string,
  margin: propTypes.oneOfType([propTypes.string, propTypes.number]),
  children: propTypes.node,
  display: propTypes.string
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LegendLabel(_ref) {
  var _ref$flex = _ref.flex,
      flex = _ref$flex === void 0 ? '1' : _ref$flex,
      label = _ref.label,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? '5px 0' : _ref$margin,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'left' : _ref$align,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$1(_ref, ["flex", "label", "margin", "align", "children"]);

  return /*#__PURE__*/react.createElement("div", _extends$1({
    className: "visx-legend-label",
    style: {
      justifyContent: align,
      display: 'flex',
      flex: flex,
      margin: margin
    }
  }, restProps), children || label);
}
LegendLabel.propTypes = {
  align: propTypes.string,
  label: propTypes.node,
  flex: propTypes.oneOfType([propTypes.string, propTypes.number]),
  margin: propTypes.oneOfType([propTypes.string, propTypes.number]),
  children: propTypes.node
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
function ShapeRect(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  return /*#__PURE__*/react.createElement("div", {
    style: _extends$2({
      width: width,
      height: height,
      background: fill
    }, style)
  });
}
ShapeRect.propTypes = {
  fill: propTypes.string,
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number])
};

function ShapeCircle(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  var cleanWidth = typeof width === 'string' || typeof width === 'undefined' ? 0 : width;
  var cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  var size = Math.max(cleanWidth, cleanHeight);
  var radius = size / 2;
  return /*#__PURE__*/react.createElement("svg", {
    width: size,
    height: size
  }, /*#__PURE__*/react.createElement(Group, {
    top: radius,
    left: radius
  }, /*#__PURE__*/react.createElement("circle", {
    r: radius,
    fill: fill,
    style: style
  })));
}
ShapeCircle.propTypes = {
  fill: propTypes.string,
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number])
};

function ShapeLine(_ref) {
  var fill = _ref.fill,
      width = _ref.width,
      height = _ref.height,
      style = _ref.style;
  var cleanHeight = typeof height === 'string' || typeof height === 'undefined' ? 0 : height;
  var lineThickness = typeof (style == null ? void 0 : style.strokeWidth) === 'number' ? style == null ? void 0 : style.strokeWidth : 2;
  return /*#__PURE__*/react.createElement("svg", {
    width: width,
    height: height
  }, /*#__PURE__*/react.createElement(Group, {
    top: cleanHeight / 2 - lineThickness / 2
  }, /*#__PURE__*/react.createElement("line", {
    x1: 0,
    x2: width,
    y1: 0,
    y2: 0,
    stroke: fill,
    strokeWidth: lineThickness,
    style: style
  })));
}
ShapeLine.propTypes = {
  fill: propTypes.string,
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number])
};

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

var NO_OP = function NO_OP() {
  return undefined;
};

function renderShape(_ref) {
  var _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? 'rect' : _ref$shape,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? NO_OP : _ref$fill,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? NO_OP : _ref$size,
      width = _ref.width,
      height = _ref.height,
      label = _ref.label,
      item = _ref.item,
      itemIndex = _ref.itemIndex,
      _ref$shapeStyle = _ref.shapeStyle,
      shapeStyle = _ref$shapeStyle === void 0 ? NO_OP : _ref$shapeStyle;
  var props = {
    width: width,
    height: height,
    item: item,
    itemIndex: itemIndex,
    label: label,
    fill: fill(_extends$3({}, label)),
    size: size(_extends$3({}, label)),
    style: shapeStyle(_extends$3({}, label))
  };

  if (typeof shape === 'string') {
    if (shape === 'circle') {
      return /*#__PURE__*/react.createElement(ShapeCircle, props);
    }

    if (shape === 'line') {
      return /*#__PURE__*/react.createElement(ShapeLine, props);
    }

    return /*#__PURE__*/react.createElement(ShapeRect, props);
  }

  if ( /*#__PURE__*/react.isValidElement(shape)) {
    return /*#__PURE__*/react.cloneElement(shape, props);
  }

  if (shape) {
    return /*#__PURE__*/react.createElement(shape, props);
  }

  return null;
}

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }
function LegendShape(_ref) {
  var _ref$shape = _ref.shape,
      shape = _ref$shape === void 0 ? ShapeRect : _ref$shape,
      width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      label = _ref.label,
      item = _ref.item,
      itemIndex = _ref.itemIndex,
      fill = _ref.fill,
      size = _ref.size,
      shapeStyle = _ref.shapeStyle;
  return /*#__PURE__*/react.createElement("div", {
    className: "visx-legend-shape",
    style: {
      display: 'flex',
      width: size ? size(_extends$4({}, label)) : width,
      height: size ? size(_extends$4({}, label)) : height,
      margin: margin
    }
  }, renderShape({
    shape: shape,
    item: item,
    itemIndex: itemIndex,
    label: label,
    width: width,
    height: height,
    fill: fill,
    shapeStyle: shapeStyle
  }));
}
LegendShape.propTypes = {
  itemIndex: propTypes.number.isRequired,
  margin: propTypes.oneOfType([propTypes.string, propTypes.number]),
  fill: propTypes.func,
  size: propTypes.func,
  shapeStyle: propTypes.func,
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number])
};

/** Returns an object's value if defined, or the object. */
function valueOrIdentity(_) {
  if (_ && typeof _ === 'object' && 'value' in _ && typeof _.value !== 'undefined') return _.value;
  return _;
}
/** Returns an object's value if defined, or the object, coerced to a string. */

function valueOrIdentityString(_) {
  return String(valueOrIdentity(_));
}

/** Returns a function which takes a Datum and index as input, and returns a formatted label object. */
function labelTransformFactory(_ref) {
  var scale = _ref.scale,
      labelFormat = _ref.labelFormat;
  return function (d, i) {
    return {
      datum: d,
      index: i,
      text: "" + labelFormat(d, i),
      // @ts-ignore
      value: scale(d)
    };
  };
}

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultStyle = {
  display: 'flex'
};
function Legend(_ref) {
  var className = _ref.className,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? defaultStyle : _ref$style,
      scale = _ref.scale,
      shape = _ref.shape,
      inputDomain = _ref.domain,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? valueOrIdentityString : _ref$fill,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? valueOrIdentityString : _ref$size,
      _ref$labelFormat = _ref.labelFormat,
      labelFormat = _ref$labelFormat === void 0 ? valueOrIdentity : _ref$labelFormat,
      _ref$labelTransform = _ref.labelTransform,
      labelTransform = _ref$labelTransform === void 0 ? labelTransformFactory : _ref$labelTransform,
      _ref$shapeWidth = _ref.shapeWidth,
      shapeWidth = _ref$shapeWidth === void 0 ? 15 : _ref$shapeWidth,
      _ref$shapeHeight = _ref.shapeHeight,
      shapeHeight = _ref$shapeHeight === void 0 ? 15 : _ref$shapeHeight,
      _ref$shapeMargin = _ref.shapeMargin,
      shapeMargin = _ref$shapeMargin === void 0 ? '2px 4px 2px 0' : _ref$shapeMargin,
      shapeStyle = _ref.shapeStyle,
      _ref$labelAlign = _ref.labelAlign,
      labelAlign = _ref$labelAlign === void 0 ? 'left' : _ref$labelAlign,
      _ref$labelFlex = _ref.labelFlex,
      labelFlex = _ref$labelFlex === void 0 ? '1' : _ref$labelFlex,
      _ref$labelMargin = _ref.labelMargin,
      labelMargin = _ref$labelMargin === void 0 ? '0 4px' : _ref$labelMargin,
      _ref$itemMargin = _ref.itemMargin,
      itemMargin = _ref$itemMargin === void 0 ? '0' : _ref$itemMargin,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'column' : _ref$direction,
      _ref$itemDirection = _ref.itemDirection,
      itemDirection = _ref$itemDirection === void 0 ? 'row' : _ref$itemDirection,
      legendLabelProps = _ref.legendLabelProps,
      children = _ref.children,
      legendItemProps = _objectWithoutPropertiesLoose$2(_ref, ["className", "style", "scale", "shape", "domain", "fill", "size", "labelFormat", "labelTransform", "shapeWidth", "shapeHeight", "shapeMargin", "shapeStyle", "labelAlign", "labelFlex", "labelMargin", "itemMargin", "direction", "itemDirection", "legendLabelProps", "children"]);

  // `Scale extends ScaleType` constraint is tricky
  //  could consider removing `scale` altogether in the future and making `domain: Datum[]` required
  // @ts-ignore doesn't like `.domain()`
  var domain = inputDomain || ('domain' in scale ? scale.domain() : []);
  var labelFormatter = labelTransform({
    scale: scale,
    labelFormat: labelFormat
  });
  var labels = domain.map(labelFormatter); // eslint-disable-next-line react/jsx-no-useless-fragment

  if (children) return /*#__PURE__*/react.createElement(react.Fragment, null, children(labels));
  return /*#__PURE__*/react.createElement("div", {
    className: classnames('visx-legend', className),
    style: _extends$5({}, style, {
      flexDirection: direction
    })
  }, labels.map(function (label, i) {
    return /*#__PURE__*/react.createElement(LegendItem, _extends$5({
      key: "legend-" + label.text + "-" + i,
      margin: itemMargin,
      flexDirection: itemDirection
    }, legendItemProps), /*#__PURE__*/react.createElement(LegendShape, {
      shape: shape,
      height: shapeHeight,
      width: shapeWidth,
      margin: shapeMargin,
      item: domain[i],
      itemIndex: i,
      label: label,
      fill: fill,
      size: size,
      shapeStyle: shapeStyle
    }), /*#__PURE__*/react.createElement(LegendLabel, _extends$5({
      label: label.text,
      flex: labelFlex,
      margin: labelMargin,
      align: labelAlign
    }, legendLabelProps)));
  }));
}
Legend.propTypes = {
  children: propTypes.func,
  className: propTypes.string,
  domain: propTypes.array,
  shapeWidth: propTypes.oneOfType([propTypes.string, propTypes.number]),
  shapeHeight: propTypes.oneOfType([propTypes.string, propTypes.number]),
  shapeMargin: propTypes.oneOfType([propTypes.string, propTypes.number]),
  labelAlign: propTypes.string,
  labelFlex: propTypes.oneOfType([propTypes.string, propTypes.number]),
  labelMargin: propTypes.oneOfType([propTypes.string, propTypes.number]),
  itemMargin: propTypes.oneOfType([propTypes.string, propTypes.number]),
  fill: propTypes.func,
  size: propTypes.func,
  shapeStyle: propTypes.func
};

/** Ordinal scales map from strings to an Output type. */
function Ordinal(props) {
  return /*#__PURE__*/react.createElement(Legend, props);
}

export { Ordinal as LegendOrdinal };
