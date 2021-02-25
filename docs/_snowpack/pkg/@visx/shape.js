import { r as react } from '../common/index-abdc4d2d.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';
import { d as d3Area, a as d3stack } from '../common/stack-ccc07bb1.js';
import { s as stackOrderAscending, a as stackOrderDescending, b as stackOrderInsideOut, d as stackOrderNone, e as stackOrderReverse, f as stackOffsetExpand, g as stackOffsetDiverging, h as stackOffsetNone, i as stackOffsetSilhouette, j as stackOffsetWiggle } from '../common/reverse-386d2f80.js';
import { G as Group } from '../common/Group-1bab4bbd.js';
import '../common/_commonjsHelpers-4f955397.js';
import '../common/path-ebc45f0e.js';
import '../common/index-ad697a84.js';

/**
 * This is a workaround for TypeScript not inferring the correct
 * method overload/signature for some d3 shape methods.
 */
function setNumberOrNumberAccessor(func, value) {
  if (typeof value === 'number') func(value);else func(value);
}

var STACK_ORDERS = {
  ascending: stackOrderAscending,
  descending: stackOrderDescending,
  insideout: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse
};
function stackOrder(order) {
  return order && STACK_ORDERS[order] || STACK_ORDERS.none;
}

var STACK_OFFSETS = {
  expand: stackOffsetExpand,
  diverging: stackOffsetDiverging,
  none: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle
};
function stackOffset(offset) {
  return offset && STACK_OFFSETS[offset] || STACK_OFFSETS.none;
}

function area(_temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      x = _ref2.x,
      x0 = _ref2.x0,
      x1 = _ref2.x1,
      y = _ref2.y,
      y0 = _ref2.y0,
      y1 = _ref2.y1,
      defined = _ref2.defined,
      curve = _ref2.curve;

  var path = d3Area();
  if (x) setNumberOrNumberAccessor(path.x, x);
  if (x0) setNumberOrNumberAccessor(path.x0, x0);
  if (x1) setNumberOrNumberAccessor(path.x1, x1);
  if (y) setNumberOrNumberAccessor(path.y, y);
  if (y0) setNumberOrNumberAccessor(path.y0, y0);
  if (y1) setNumberOrNumberAccessor(path.y1, y1);
  if (defined) path.defined(defined);
  if (curve) path.curve(curve);
  return path;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function AreaClosed(_ref) {
  var x = _ref.x,
      x0 = _ref.x0,
      x1 = _ref.x1,
      y = _ref.y,
      y1 = _ref.y1,
      y0 = _ref.y0,
      yScale = _ref.yScale,
      _ref$data = _ref.data,
      data = _ref$data === void 0 ? [] : _ref$data,
      _ref$defined = _ref.defined,
      defined = _ref$defined === void 0 ? function () {
    return true;
  } : _ref$defined,
      className = _ref.className,
      curve = _ref.curve,
      innerRef = _ref.innerRef,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, ["x", "x0", "x1", "y", "y1", "y0", "yScale", "data", "defined", "className", "curve", "innerRef", "children"]);

  var path = area({
    x: x,
    x0: x0,
    x1: x1,
    defined: defined,
    curve: curve
  });

  if (y0 == null) {
    /**
     * by default set the baseline to the first element of the yRange
     * @TODO take the minimum instead?
     */
    path.y0(yScale.range()[0]);
  } else {
    setNumberOrNumberAccessor(path.y0, y0);
  }

  if (y && !y1) setNumberOrNumberAccessor(path.y1, y);
  if (y1 && !y) setNumberOrNumberAccessor(path.y1, y1); // eslint-disable-next-line react/jsx-no-useless-fragment

  if (children) return /*#__PURE__*/react.createElement(react.Fragment, null, children({
    path: path
  }));
  return /*#__PURE__*/react.createElement("path", _extends({
    ref: innerRef,
    className: classnames('visx-area-closed', className),
    d: path(data) || ''
  }, restProps));
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Bar(_ref) {
  var className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$1(_ref, ["className", "innerRef"]);

  return /*#__PURE__*/react.createElement("rect", _extends$1({
    ref: innerRef,
    className: classnames('visx-bar', className)
  }, restProps));
}

function getBandwidth(scale) {
  if ('bandwidth' in scale) {
    return scale.bandwidth();
  }

  var range = scale.range();
  var domain = scale.domain();
  return Math.abs(range[range.length - 1] - range[0]) / domain.length;
}

function getFirstItem(d) {
  return d == null ? void 0 : d[0];
}
function getSecondItem(d) {
  return d == null ? void 0 : d[1];
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function BarStackComponent(_ref) {
  var data = _ref.data,
      className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      x = _ref.x,
      _ref$y = _ref.y0,
      y0 = _ref$y === void 0 ? getFirstItem : _ref$y,
      _ref$y2 = _ref.y1,
      y1 = _ref$y2 === void 0 ? getSecondItem : _ref$y2,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      color = _ref.color,
      keys = _ref.keys,
      value = _ref.value,
      order = _ref.order,
      offset = _ref.offset,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose$2(_ref, ["data", "className", "top", "left", "x", "y0", "y1", "xScale", "yScale", "color", "keys", "value", "order", "offset", "children"]);

  var stack = d3stack();
  if (keys) stack.keys(keys);
  if (value) setNumberOrNumberAccessor(stack.value, value);
  if (order) stack.order(stackOrder(order));
  if (offset) stack.offset(stackOffset(offset));
  var stacks = stack(data);
  var barWidth = getBandwidth(xScale);
  var barStacks = stacks.map(function (barStack, i) {
    var key = barStack.key;
    return {
      index: i,
      key: key,
      bars: barStack.map(function (bar, j) {
        var barHeight = (yScale(y0(bar)) || 0) - (yScale(y1(bar)) || 0);
        var barY = yScale(y1(bar));
        var barX = 'bandwidth' in xScale ? xScale(x(bar.data)) : Math.max((xScale(x(bar.data)) || 0) - barWidth / 2);
        return {
          bar: bar,
          key: key,
          index: j,
          height: barHeight,
          width: barWidth,
          x: barX || 0,
          y: barY || 0,
          color: color(barStack.key, j)
        };
      })
    };
  }); // eslint-disable-next-line react/jsx-no-useless-fragment

  if (children) return /*#__PURE__*/react.createElement(react.Fragment, null, children(barStacks));
  return /*#__PURE__*/react.createElement(Group, {
    className: classnames('visx-bar-stack', className),
    top: top,
    left: left
  }, barStacks.map(function (barStack) {
    return barStack.bars.map(function (bar) {
      return /*#__PURE__*/react.createElement(Bar, _extends$2({
        key: "bar-stack-" + barStack.index + "-" + bar.index,
        x: bar.x,
        y: bar.y,
        height: bar.height,
        width: bar.width,
        fill: bar.color
      }, restProps));
    });
  }));
}

export { AreaClosed, BarStackComponent as BarStack };
