import { p as propTypes } from '../common/index-ad697a84.js';
import { r as react } from '../common/index-abdc4d2d.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';
import { g as getDefaultExportFromCjs, c as createCommonjsModule } from '../common/_commonjsHelpers-4f955397.js';
import { g as getTicks, c as coerceNumber, P as Point } from '../common/Point-b58cb484.js';
import { G as Group } from '../common/Group-1bab4bbd.js';

var Line_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = Line;

var _react = _interopRequireDefault(react);

var _classnames = _interopRequireDefault(classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function Line(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === void 0 ? {
    x: 0,
    y: 0
  } : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === void 0 ? {
    x: 1,
    y: 1
  } : _ref$to,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? 'transparent' : _ref$fill,
      className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose(_ref, ["from", "to", "fill", "className", "innerRef"]);

  var isRectilinear = from.x === to.x || from.y === to.y;
  return /*#__PURE__*/_react.default.createElement("line", _extends({
    ref: innerRef,
    className: (0, _classnames.default)('visx-line', className),
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    fill: fill,
    shapeRendering: isRectilinear ? 'crispEdges' : 'auto'
  }, restProps));
}
});

var Line = /*@__PURE__*/getDefaultExportFromCjs(Line_1);

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GridRows(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      scale = _ref.scale,
      width = _ref.width,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      className = _ref.className,
      children = _ref.children,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      lineStyle = _ref.lineStyle,
      offset = _ref.offset,
      tickValues = _ref.tickValues,
      restProps = _objectWithoutPropertiesLoose(_ref, ["top", "left", "scale", "width", "stroke", "strokeWidth", "strokeDasharray", "className", "children", "numTicks", "lineStyle", "offset", "tickValues"]);

  var ticks = tickValues != null ? tickValues : getTicks(scale, numTicks);
  var tickLines = ticks.map(function (d) {
    var y = offset ? (coerceNumber(scale(d)) || 0) + offset : coerceNumber(scale(d)) || 0;
    return {
      from: new Point({
        x: 0,
        y: y
      }),
      to: new Point({
        x: width,
        y: y
      })
    };
  });
  return /*#__PURE__*/react.createElement(Group, {
    className: classnames('visx-rows', className),
    top: top,
    left: left
  }, children ? children({
    lines: tickLines
  }) : tickLines.map(function (_ref2, i) {
    var from = _ref2.from,
        to = _ref2.to;
    return /*#__PURE__*/react.createElement(Line, _extends({
      key: "row-line-" + i,
      from: from,
      to: to,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridRows.propTypes = {
  tickValues: propTypes.array,
  width: propTypes.number.isRequired
};

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function GridColumns(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      scale = _ref.scale,
      height = _ref.height,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#eaf0f6' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      className = _ref.className,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      lineStyle = _ref.lineStyle,
      offset = _ref.offset,
      tickValues = _ref.tickValues,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$1(_ref, ["top", "left", "scale", "height", "stroke", "strokeWidth", "strokeDasharray", "className", "numTicks", "lineStyle", "offset", "tickValues", "children"]);

  var ticks = tickValues != null ? tickValues : getTicks(scale, numTicks);
  var tickLines = ticks.map(function (d) {
    var x = offset ? (coerceNumber(scale(d)) || 0) + offset : coerceNumber(scale(d)) || 0;
    return {
      from: new Point({
        x: x,
        y: 0
      }),
      to: new Point({
        x: x,
        y: height
      })
    };
  });
  return /*#__PURE__*/react.createElement(Group, {
    className: classnames('visx-columns', className),
    top: top,
    left: left
  }, children ? children({
    lines: tickLines
  }) : tickLines.map(function (_ref2, i) {
    var from = _ref2.from,
        to = _ref2.to;
    return /*#__PURE__*/react.createElement(Line, _extends$1({
      key: "column-line-" + i,
      from: from,
      to: to,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      style: lineStyle
    }, restProps));
  }));
}
GridColumns.propTypes = {
  tickValues: propTypes.array,
  height: propTypes.number.isRequired
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Grid(_ref) {
  var top = _ref.top,
      left = _ref.left,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      width = _ref.width,
      height = _ref.height,
      className = _ref.className,
      stroke = _ref.stroke,
      strokeWidth = _ref.strokeWidth,
      strokeDasharray = _ref.strokeDasharray,
      numTicksRows = _ref.numTicksRows,
      numTicksColumns = _ref.numTicksColumns,
      rowLineStyle = _ref.rowLineStyle,
      columnLineStyle = _ref.columnLineStyle,
      xOffset = _ref.xOffset,
      yOffset = _ref.yOffset,
      rowTickValues = _ref.rowTickValues,
      columnTickValues = _ref.columnTickValues,
      restProps = _objectWithoutPropertiesLoose$2(_ref, ["top", "left", "xScale", "yScale", "width", "height", "className", "stroke", "strokeWidth", "strokeDasharray", "numTicksRows", "numTicksColumns", "rowLineStyle", "columnLineStyle", "xOffset", "yOffset", "rowTickValues", "columnTickValues"]);

  return /*#__PURE__*/react.createElement(Group, {
    className: classnames('visx-grid', className),
    top: top,
    left: left
  }, /*#__PURE__*/react.createElement(GridRows, _extends$2({
    className: className,
    scale: yScale,
    width: width,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    numTicks: numTicksRows,
    lineStyle: rowLineStyle,
    offset: yOffset,
    tickValues: rowTickValues
  }, restProps)), /*#__PURE__*/react.createElement(GridColumns, _extends$2({
    className: className,
    scale: xScale,
    height: height,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray,
    numTicks: numTicksColumns,
    lineStyle: columnLineStyle,
    offset: xOffset,
    tickValues: columnTickValues
  }, restProps)));
}
Grid.propTypes = {
  rowTickValues: propTypes.array,
  columnTickValues: propTypes.array
};

export { Grid };
