import { p as propTypes } from '../common/index-ad697a84.js';
import { r as react } from '../common/index-abdc4d2d.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';
import '../common/_commonjsHelpers-4f955397.js';

function Pattern(_ref) {
  var id = _ref.id,
      width = _ref.width,
      height = _ref.height,
      children = _ref.children;
  return /*#__PURE__*/react.createElement("defs", null, /*#__PURE__*/react.createElement("pattern", {
    id: id,
    width: width,
    height: height,
    patternUnits: "userSpaceOnUse"
  }, children));
}
Pattern.propTypes = {
  id: propTypes.string.isRequired,
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  children: propTypes.node.isRequired
};

var PatternOrientation = {
  horizontal: 'horizontal',
  vertical: 'vertical',
  diagonal: 'diagonal',
  diagonalRightToLeft: 'diagonalRightToLeft'
};

function pathForOrientation(_ref) {
  var height = _ref.height,
      orientation = _ref.orientation;

  switch (orientation) {
    case PatternOrientation.vertical:
      return "M " + height / 2 + ", 0 l 0, " + height;

    case PatternOrientation.horizontal:
      return "M 0," + height / 2 + " l " + height + ",0";

    case PatternOrientation.diagonal:
      return "M 0," + height + " l " + height + "," + -height + " M " + -height / 4 + "," + height / 4 + " l " + height / 2 + "," + -height / 2 + "\n             M " + 3 / 4 * height + "," + 5 / 4 * height + " l " + height / 2 + "," + -height / 2;

    case PatternOrientation.diagonalRightToLeft:
      return "M 0,0 l " + height + "," + height + "\n        M " + -height / 4 + "," + 3 / 4 * height + " l " + height / 2 + "," + height / 2 + "\n        M " + 3 / 4 * height + "," + -height / 4 + " l " + height / 2 + "," + height / 2;

    default:
      return "M " + height / 2 + ", 0 l 0, " + height;
  }
}
function Lines(_ref2) {
  var id = _ref2.id,
      width = _ref2.width,
      height = _ref2.height,
      stroke = _ref2.stroke,
      strokeWidth = _ref2.strokeWidth,
      strokeDasharray = _ref2.strokeDasharray,
      _ref2$strokeLinecap = _ref2.strokeLinecap,
      strokeLinecap = _ref2$strokeLinecap === void 0 ? 'square' : _ref2$strokeLinecap,
      _ref2$shapeRendering = _ref2.shapeRendering,
      shapeRendering = _ref2$shapeRendering === void 0 ? 'auto' : _ref2$shapeRendering,
      _ref2$orientation = _ref2.orientation,
      orientation = _ref2$orientation === void 0 ? ['vertical'] : _ref2$orientation,
      background = _ref2.background,
      className = _ref2.className;
  var orientations = Array.isArray(orientation) ? orientation : [orientation];
  return /*#__PURE__*/react.createElement(Pattern, {
    id: id,
    width: width,
    height: height
  }, !!background && /*#__PURE__*/react.createElement("rect", {
    className: classnames('vx-pattern-line-background'),
    width: width,
    height: height,
    fill: background
  }), orientations.map(function (o, i) {
    return /*#__PURE__*/react.createElement("path", {
      key: "vx-" + id + "-line-" + o + "-" + i,
      className: classnames('vx-pattern-line', className),
      d: pathForOrientation({
        orientation: o,
        height: height
      }),
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      strokeLinecap: strokeLinecap,
      shapeRendering: shapeRendering
    });
  }));
}
Lines.propTypes = {
  id: propTypes.string.isRequired,
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  className: propTypes.string,
  background: propTypes.string,
  stroke: propTypes.string,
  strokeWidth: propTypes.oneOfType([propTypes.number, propTypes.string]),
  strokeDasharray: propTypes.oneOfType([propTypes.string, propTypes.number]),
  strokeLinecap: propTypes.oneOf(['square', 'butt', 'round', 'inherit']),
  shapeRendering: propTypes.oneOfType([propTypes.string, propTypes.number]),
  orientation: propTypes.array
};

export { Lines as PatternLines };
