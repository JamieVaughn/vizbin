import { p as propTypes } from './index-ad697a84.js';
import { r as react } from './index-abdc4d2d.js';
import { c as classnames } from './index-d4b0dc1b.js';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Group(_ref) {
  var _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      transform = _ref.transform,
      className = _ref.className,
      children = _ref.children,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose(_ref, ["top", "left", "transform", "className", "children", "innerRef"]);

  return /*#__PURE__*/react.createElement("g", _extends({
    ref: innerRef,
    className: classnames('visx-group', className),
    transform: transform || "translate(" + left + ", " + top + ")"
  }, restProps), children);
}
Group.propTypes = {
  top: propTypes.number,
  left: propTypes.number,
  transform: propTypes.string,
  className: propTypes.string,
  children: propTypes.node,
  innerRef: propTypes.oneOfType([propTypes.string, propTypes.func, propTypes.object])
};

export { Group as G };
