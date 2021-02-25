import { p as propTypes } from '../common/index-ad697a84.js';
import { r as react } from '../common/index-abdc4d2d.js';
import '../common/_commonjsHelpers-4f955397.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function LinearGradient(_ref) {
  var children = _ref.children,
      id = _ref.id,
      from = _ref.from,
      to = _ref.to,
      _x1 = _ref.x1,
      _y1 = _ref.y1,
      _x2 = _ref.x2,
      _y2 = _ref.y2,
      _ref$fromOffset = _ref.fromOffset,
      fromOffset = _ref$fromOffset === void 0 ? '0%' : _ref$fromOffset,
      _ref$fromOpacity = _ref.fromOpacity,
      fromOpacity = _ref$fromOpacity === void 0 ? 1 : _ref$fromOpacity,
      _ref$toOffset = _ref.toOffset,
      toOffset = _ref$toOffset === void 0 ? '100%' : _ref$toOffset,
      _ref$toOpacity = _ref.toOpacity,
      toOpacity = _ref$toOpacity === void 0 ? 1 : _ref$toOpacity,
      rotate = _ref.rotate,
      transform = _ref.transform,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? true : _ref$vertical,
      restProps = _objectWithoutPropertiesLoose(_ref, ["children", "id", "from", "to", "x1", "y1", "x2", "y2", "fromOffset", "fromOpacity", "toOffset", "toOpacity", "rotate", "transform", "vertical"]);

  var x1 = _x1;
  var x2 = _x2;
  var y1 = _y1;
  var y2 = _y2;

  if (vertical && !x1 && !x2 && !y1 && !y2) {
    x1 = '0';
    x2 = '0';
    y1 = '0';
    y2 = '1';
  }

  return /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("linearGradient", _extends({
    id: id,
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    gradientTransform: rotate ? "rotate(" + rotate + ")" : transform
  }, restProps), !!children && children, !children && /*#__PURE__*/react.createElement("stop", {
    offset: fromOffset,
    stopColor: from,
    stopOpacity: fromOpacity
  }), !children && /*#__PURE__*/react.createElement("stop", {
    offset: toOffset,
    stopColor: to,
    stopOpacity: toOpacity
  })));
}
LinearGradient.propTypes = {
  id: propTypes.string.isRequired,
  from: propTypes.string,
  to: propTypes.string,
  x1: propTypes.oneOfType([propTypes.string, propTypes.number]),
  x2: propTypes.oneOfType([propTypes.string, propTypes.number]),
  y1: propTypes.oneOfType([propTypes.string, propTypes.number]),
  y2: propTypes.oneOfType([propTypes.string, propTypes.number]),
  fromOffset: propTypes.oneOfType([propTypes.string, propTypes.number]),
  fromOpacity: propTypes.oneOfType([propTypes.string, propTypes.number]),
  toOffset: propTypes.oneOfType([propTypes.string, propTypes.number]),
  toOpacity: propTypes.oneOfType([propTypes.string, propTypes.number]),
  rotate: propTypes.oneOfType([propTypes.string, propTypes.number]),
  transform: propTypes.string,
  children: propTypes.node,
  vertical: propTypes.bool
};

export { LinearGradient };
