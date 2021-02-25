import { p as propTypes } from '../common/index-ad697a84.js';
import { r as react } from '../common/index-abdc4d2d.js';
import { g as getDefaultExportFromCjs, c as createCommonjsModule } from '../common/_commonjsHelpers-4f955397.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';

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
    className: classnames('vx-group', className),
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

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Bar(_ref) {
  var className = _ref.className,
      innerRef = _ref.innerRef,
      restProps = _objectWithoutPropertiesLoose$1(_ref, ["className", "innerRef"]);

  return /*#__PURE__*/react.createElement("rect", _extends$1({
    ref: innerRef,
    className: classnames('vx-bar', className)
  }, restProps));
}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Point = /*#__PURE__*/function () {
  function Point(_ref) {
    var _ref$x = _ref.x,
        x = _ref$x === void 0 ? 0 : _ref$x,
        _ref$y = _ref.y,
        y = _ref$y === void 0 ? 0 : _ref$y;

    _defineProperty(this, "x", 0);

    _defineProperty(this, "y", 0);

    this.x = x;
    this.y = y;
  }

  var _proto = Point.prototype;

  _proto.value = function value() {
    return {
      x: this.x,
      y: this.y
    };
  };

  _proto.toArray = function toArray() {
    return [this.x, this.y];
  };

  return Point;
}();

function isElement(elem) {
  return !!elem && elem instanceof Element;
} // functional definition of isSVGElement. Note that SVGSVGElements are HTMLElements

function isSVGElement(elem) {
  return !!elem && (elem instanceof SVGElement || 'ownerSVGElement' in elem);
} // functional definition of SVGGElement

function isSVGSVGElement(elem) {
  return !!elem && 'createSVGPoint' in elem;
}
function isSVGGraphicsElement(elem) {
  return !!elem && 'getScreenCTM' in elem;
} // functional definition of TouchEvent

function isTouchEvent(event) {
  return !!event && 'changedTouches' in event;
} // functional definition of event

function isEvent(event) {
  return !!event && (event instanceof Event || 'nativeEvent' in event && event.nativeEvent instanceof Event);
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
var DEFAULT_POINT = {
  x: 0,
  y: 0
};
function getXAndYFromEvent(event) {
  if (!event) return _extends$2({}, DEFAULT_POINT);

  if (isTouchEvent(event)) {
    return event.changedTouches.length > 0 ? {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY
    } : _extends$2({}, DEFAULT_POINT);
  }

  return {
    x: event.clientX,
    y: event.clientY
  };
}

function localPoint(node, event) {
  if (!node || !event) return null;
  var coords = getXAndYFromEvent(event); // find top-most SVG

  var svg = isSVGElement(node) ? node.ownerSVGElement : node;
  var screenCTM = isSVGGraphicsElement(svg) ? svg.getScreenCTM() : null;

  if (isSVGSVGElement(svg) && screenCTM) {
    var point = svg.createSVGPoint();
    point.x = coords.x;
    point.y = coords.y;
    point = point.matrixTransform(screenCTM.inverse());
    return new Point({
      x: point.x,
      y: point.y
    });
  } // fall back to bounding box


  var rect = node.getBoundingClientRect();
  return new Point({
    x: coords.x - rect.left - node.clientLeft,
    y: coords.y - rect.top - node.clientTop
  });
}

/** Handles two signatures for backwards compatibility. */

function localPoint$1(nodeOrEvent, maybeEvent) {
  // localPoint(node, event)
  if (isElement(nodeOrEvent) && maybeEvent) {
    return localPoint(nodeOrEvent, maybeEvent);
  } // localPoint(event)


  if (isEvent(nodeOrEvent)) {
    var event = nodeOrEvent;
    var node = event.target;
    if (node) return localPoint(node, event);
  }

  return null;
}

var esm = /*#__PURE__*/Object.freeze({
  __proto__: null,
  localPoint: localPoint$1,
  touchPoint: localPoint
});

var Drag_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var _propTypes = _interopRequireDefault(propTypes);

var _react = _interopRequireDefault(react);



function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Drag = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Drag, _React$Component);

  function Drag() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      x: undefined,
      y: undefined,
      dx: 0,
      dy: 0,
      isDragging: false
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragStart", function (event) {
      var _this$props = _this.props,
          onDragStart = _this$props.onDragStart,
          resetOnStart = _this$props.resetOnStart;
      event.persist();

      _this.setState(function (_ref) {
        var dx = _ref.dx,
            dy = _ref.dy;
        var point = (0, esm.localPoint)(event) || {
          x: 0,
          y: 0
        };
        return {
          isDragging: true,
          dx: resetOnStart ? 0 : dx,
          dy: resetOnStart ? 0 : dy,
          x: resetOnStart ? point.x : point.x - dx,
          y: resetOnStart ? point.y : point.y - dy
        };
      }, onDragStart && function () {
        onDragStart(_extends({}, _this.state, {
          event: event
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragMove", function (event) {
      var onDragMove = _this.props.onDragMove;
      event.persist();

      _this.setState(function (_ref2) {
        var x = _ref2.x,
            y = _ref2.y,
            isDragging = _ref2.isDragging;
        var point = (0, esm.localPoint)(event) || {
          x: 0,
          y: 0
        };
        return isDragging ? {
          isDragging: true,
          dx: point.x - (x || 0),
          dy: point.y - (y || 0)
        } : null;
      }, onDragMove && function () {
        if (_this.state.isDragging) onDragMove(_extends({}, _this.state, {
          event: event
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDragEnd", function (event) {
      var onDragEnd = _this.props.onDragEnd;
      event.persist();

      _this.setState({
        isDragging: false
      }, onDragEnd && function () {
        onDragEnd(_extends({}, _this.state, {
          event: event
        }));
      });
    });

    return _this;
  }

  var _proto = Drag.prototype;

  _proto.render = function render() {
    var _this$state = this.state,
        x = _this$state.x,
        y = _this$state.y,
        dx = _this$state.dx,
        dy = _this$state.dy,
        isDragging = _this$state.isDragging;
    var _this$props2 = this.props,
        children = _this$props2.children,
        width = _this$props2.width,
        height = _this$props2.height,
        captureDragArea = _this$props2.captureDragArea;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isDragging && captureDragArea && /*#__PURE__*/_react.default.createElement("rect", {
      width: width,
      height: height,
      onMouseMove: this.handleDragMove,
      onMouseUp: this.handleDragEnd,
      fill: "transparent"
    }), children({
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      isDragging: isDragging,
      dragEnd: this.handleDragEnd,
      dragMove: this.handleDragMove,
      dragStart: this.handleDragStart
    }));
  };

  return Drag;
}(_react.default.Component);

exports.default = Drag;

_defineProperty(Drag, "propTypes", {
  children: _propTypes.default.func.isRequired,
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  captureDragArea: _propTypes.default.bool,
  resetOnStart: _propTypes.default.bool,
  onDragEnd: _propTypes.default.func,
  onDragMove: _propTypes.default.func,
  onDragStart: _propTypes.default.func
});

_defineProperty(Drag, "defaultProps", {
  captureDragArea: true,
  resetOnStart: false
});
});

var Drag = /*@__PURE__*/getDefaultExportFromCjs(Drag_1);

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** BrushHandle's are placed along the bounds of the brush and handle Drag events which update the passed brush. */
var BrushHandle = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BrushHandle, _React$Component);

  function BrushHandle() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$1(_assertThisInitialized(_this), "handleDragMove", function (drag) {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          type = _this$props.type;
      if (!drag.isDragging) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end;
        var move = 0;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);

        switch (type) {
          case 'right':
            move = xMax + drag.dx;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                x0: Math.max(Math.min(move, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(move, start.x), prevBrush.bounds.x1)
              })
            });

          case 'left':
            move = xMin + drag.dx;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                x0: Math.min(move, end.x),
                x1: Math.max(move, end.x)
              })
            });

          case 'bottom':
            move = yMax + drag.dy;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                y0: Math.min(move, start.y),
                y1: Math.max(move, start.y)
              })
            });

          case 'top':
            move = yMin + drag.dy;
            return _extends$3({}, prevBrush, {
              activeHandle: type,
              extent: _extends$3({}, prevBrush.extent, {
                y0: Math.min(move, end.y),
                y1: Math.max(move, end.y)
              })
            });

          default:
            return prevBrush;
        }
      });
    });

    _defineProperty$1(_assertThisInitialized(_this), "handleDragEnd", function () {
      var _this$props2 = _this.props,
          updateBrush = _this$props2.updateBrush,
          onBrushEnd = _this$props2.onBrushEnd;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end,
            extent = prevBrush.extent;
        start.x = Math.min(extent.x0, extent.x1);
        start.y = Math.min(extent.y0, extent.y0);
        end.x = Math.max(extent.x0, extent.x1);
        end.y = Math.max(extent.y0, extent.y1);

        var nextBrush = _extends$3({}, prevBrush, {
          start: start,
          end: end,
          activeHandle: null,
          isBrushing: false,
          extent: {
            x0: Math.min(start.x, end.x),
            x1: Math.max(start.x, end.x),
            y0: Math.min(start.y, end.y),
            y1: Math.max(start.y, end.y)
          }
        });

        if (onBrushEnd) {
          onBrushEnd(nextBrush);
        }

        return nextBrush;
      });
    });

    return _this;
  }

  var _proto = BrushHandle.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        stageWidth = _this$props3.stageWidth,
        stageHeight = _this$props3.stageHeight,
        brush = _this$props3.brush,
        type = _this$props3.type,
        handle = _this$props3.handle;
    var x = handle.x,
        y = handle.y,
        width = handle.width,
        height = handle.height;
    var cursor = type === 'right' || type === 'left' ? 'ew-resize' : 'ns-resize';
    return /*#__PURE__*/react.createElement(Drag, {
      width: stageWidth,
      height: stageHeight,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd,
      resetOnStart: true
    }, function (_ref) {
      var dragStart = _ref.dragStart,
          dragEnd = _ref.dragEnd,
          dragMove = _ref.dragMove,
          isDragging = _ref.isDragging;
      return /*#__PURE__*/react.createElement("g", null, isDragging && /*#__PURE__*/react.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        onMouseLeave: dragEnd
      }), /*#__PURE__*/react.createElement("rect", {
        x: x,
        y: y,
        width: width,
        height: height,
        fill: "transparent",
        className: "vx-brush-handle-" + type,
        onMouseDown: dragStart,
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        style: {
          cursor: cursor,
          pointerEvents: !!brush.activeHandle || !!brush.isBrushing ? 'none' : 'all'
        }
      }));
    });
  };

  return BrushHandle;
}(react.Component);

_defineProperty$1(BrushHandle, "propTypes", {
  stageWidth: propTypes.number.isRequired,
  stageHeight: propTypes.number.isRequired,
  updateBrush: propTypes.func.isRequired,
  onBrushEnd: propTypes.func,
  handle: propTypes.shape({
    x: propTypes.number.isRequired,
    y: propTypes.number.isRequired,
    width: propTypes.number.isRequired,
    height: propTypes.number.isRequired
  }).isRequired
});

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BrushCorner = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$1(BrushCorner, _React$Component);

  function BrushCorner() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$2(_assertThisInitialized$1(_this), "cornerDragMove", function (drag) {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          type = _this$props.type;
      if (!drag.isDragging) return;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end;
        var xMax = Math.max(start.x, end.x);
        var xMin = Math.min(start.x, end.x);
        var yMax = Math.max(start.y, end.y);
        var yMin = Math.min(start.y, end.y);
        var moveX = 0;
        var moveY = 0;

        switch (type) {
          case 'topRight':
            moveX = xMax + drag.dx;
            moveY = yMin + drag.dy;
            return _extends$4({}, prevBrush, {
              activeHandle: type,
              extent: _extends$4({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1)
              })
            });

          case 'topLeft':
            moveX = xMin + drag.dx;
            moveY = yMin + drag.dy;
            return _extends$4({}, prevBrush, {
              activeHandle: type,
              extent: _extends$4({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, end.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, end.y), prevBrush.bounds.y1)
              })
            });

          case 'bottomLeft':
            moveX = xMin + drag.dx;
            moveY = yMax + drag.dy;
            return _extends$4({}, prevBrush, {
              activeHandle: type,
              extent: _extends$4({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, end.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, end.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1)
              })
            });

          case 'bottomRight':
            moveX = xMax + drag.dx;
            moveY = yMax + drag.dy;
            return _extends$4({}, prevBrush, {
              activeHandle: type,
              extent: _extends$4({}, prevBrush.extent, {
                x0: Math.max(Math.min(moveX, start.x), prevBrush.bounds.x0),
                x1: Math.min(Math.max(moveX, start.x), prevBrush.bounds.x1),
                y0: Math.max(Math.min(moveY, start.y), prevBrush.bounds.y0),
                y1: Math.min(Math.max(moveY, start.y), prevBrush.bounds.y1)
              })
            });

          default:
            return prevBrush;
        }
      });
    });

    _defineProperty$2(_assertThisInitialized$1(_this), "cornerDragEnd", function () {
      var _this$props2 = _this.props,
          updateBrush = _this$props2.updateBrush,
          onBrushEnd = _this$props2.onBrushEnd;
      updateBrush(function (prevBrush) {
        var start = prevBrush.start,
            end = prevBrush.end,
            extent = prevBrush.extent;
        start.x = Math.min(extent.x0, extent.x1);
        start.y = Math.min(extent.y0, extent.y0);
        end.x = Math.max(extent.x0, extent.x1);
        end.y = Math.max(extent.y0, extent.y1);

        var nextBrush = _extends$4({}, prevBrush, {
          start: start,
          end: end,
          activeHandle: null,
          domain: {
            x0: Math.min(start.x, end.x),
            x1: Math.max(start.x, end.x),
            y0: Math.min(start.y, end.y),
            y1: Math.max(start.y, end.y)
          }
        });

        if (onBrushEnd) {
          onBrushEnd(nextBrush);
        }

        return nextBrush;
      });
    });

    return _this;
  }

  var _proto = BrushCorner.prototype;

  _proto.render = function render() {
    var _this$props3 = this.props,
        type = _this$props3.type,
        brush = _this$props3.brush,
        stageWidth = _this$props3.stageWidth,
        stageHeight = _this$props3.stageHeight,
        styleProp = _this$props3.style,
        corner = _this$props3.corner;
    var cursor = styleProp && styleProp.cursor || (type === 'topLeft' || type === 'bottomRight' ? 'nwse-resize' : 'nesw-resize');
    var pointerEvents = brush.activeHandle || brush.isBrushing ? 'none' : 'all';
    return /*#__PURE__*/react.createElement(Drag, {
      width: stageWidth,
      height: stageHeight,
      onDragMove: this.cornerDragMove,
      onDragEnd: this.cornerDragEnd,
      resetOnStart: true
    }, function (_ref) {
      var dragMove = _ref.dragMove,
          dragEnd = _ref.dragEnd,
          dragStart = _ref.dragStart,
          isDragging = _ref.isDragging;
      return /*#__PURE__*/react.createElement("g", null, isDragging && /*#__PURE__*/react.createElement("rect", {
        fill: "transparent",
        width: stageWidth,
        height: stageHeight,
        style: {
          cursor: cursor
        },
        onMouseMove: dragMove,
        onMouseUp: dragEnd
      }), /*#__PURE__*/react.createElement("rect", _extends$4({
        fill: "transparent",
        onMouseDown: dragStart,
        onMouseMove: dragMove,
        onMouseUp: dragEnd,
        className: "vx-brush-corner-" + type,
        style: _extends$4({
          cursor: cursor,
          pointerEvents: pointerEvents
        }, styleProp)
      }, corner)));
    });
  };

  return BrushCorner;
}(react.Component);

_defineProperty$2(BrushCorner, "propTypes", {
  stageWidth: propTypes.number.isRequired,
  stageHeight: propTypes.number.isRequired,
  updateBrush: propTypes.func.isRequired,
  onBrushEnd: propTypes.func,
  corner: propTypes.shape({
    x: propTypes.number.isRequired,
    y: propTypes.number.isRequired,
    width: propTypes.number.isRequired,
    height: propTypes.number.isRequired
  }).isRequired
});

_defineProperty$2(BrushCorner, "defaultProps", {
  style: {}
});

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$2(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var DRAGGING_OVERLAY_STYLES = {
  cursor: 'move'
};

var BrushSelection = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$2(BrushSelection, _React$Component);

  function BrushSelection() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _defineProperty$3(_assertThisInitialized$2(_this), "selectionDragMove", function (drag) {
      var updateBrush = _this.props.updateBrush;
      updateBrush(function (prevBrush) {
        var _prevBrush$start = prevBrush.start,
            x0 = _prevBrush$start.x,
            y0 = _prevBrush$start.y;
        var _prevBrush$end = prevBrush.end,
            x1 = _prevBrush$end.x,
            y1 = _prevBrush$end.y;
        var validDx = drag.dx > 0 ? Math.min(drag.dx, prevBrush.bounds.x1 - x1) : Math.max(drag.dx, prevBrush.bounds.x0 - x0);
        var validDy = drag.dy > 0 ? Math.min(drag.dy, prevBrush.bounds.y1 - y1) : Math.max(drag.dy, prevBrush.bounds.y0 - y0);
        return _extends$5({}, prevBrush, {
          isBrushing: true,
          extent: _extends$5({}, prevBrush.extent, {
            x0: x0 + validDx,
            x1: x1 + validDx,
            y0: y0 + validDy,
            y1: y1 + validDy
          })
        });
      });
    });

    _defineProperty$3(_assertThisInitialized$2(_this), "selectionDragEnd", function () {
      var _this$props = _this.props,
          updateBrush = _this$props.updateBrush,
          onBrushEnd = _this$props.onBrushEnd;
      updateBrush(function (prevBrush) {
        var nextBrush = _extends$5({}, prevBrush, {
          isBrushing: false,
          start: _extends$5({}, prevBrush.start, {
            x: Math.min(prevBrush.extent.x0, prevBrush.extent.x1),
            y: Math.min(prevBrush.extent.y0, prevBrush.extent.y1)
          }),
          end: _extends$5({}, prevBrush.end, {
            x: Math.max(prevBrush.extent.x0, prevBrush.extent.x1),
            y: Math.max(prevBrush.extent.y0, prevBrush.extent.y1)
          })
        });

        if (onBrushEnd) {
          onBrushEnd(nextBrush);
        }

        return nextBrush;
      });
    });

    return _this;
  }

  var _proto = BrushSelection.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        width = _this$props2.width,
        height = _this$props2.height,
        stageWidth = _this$props2.stageWidth,
        stageHeight = _this$props2.stageHeight,
        brush = _this$props2.brush,
        disableDraggingSelection = _this$props2.disableDraggingSelection,
        _onMouseLeave = _this$props2.onMouseLeave,
        _onMouseMove = _this$props2.onMouseMove,
        _onMouseUp = _this$props2.onMouseUp,
        _onClick = _this$props2.onClick,
        selectedBoxStyle = _this$props2.selectedBoxStyle;
    return /*#__PURE__*/react.createElement(Drag, {
      width: width,
      height: height,
      resetOnStart: true,
      onDragMove: this.selectionDragMove,
      onDragEnd: this.selectionDragEnd
    }, function (_ref) {
      var isDragging = _ref.isDragging,
          dragStart = _ref.dragStart,
          dragEnd = _ref.dragEnd,
          dragMove = _ref.dragMove;
      return /*#__PURE__*/react.createElement("g", null, isDragging && /*#__PURE__*/react.createElement("rect", {
        width: stageWidth,
        height: stageHeight,
        fill: "transparent",
        onMouseUp: dragEnd,
        onMouseMove: dragMove,
        onMouseLeave: dragEnd,
        style: DRAGGING_OVERLAY_STYLES
      }), /*#__PURE__*/react.createElement("rect", _extends$5({
        x: Math.min(brush.extent.x0, brush.extent.x1),
        y: Math.min(brush.extent.y0, brush.extent.y1),
        width: width,
        height: height,
        className: "vx-brush-selection",
        onMouseDown: disableDraggingSelection ? undefined : dragStart,
        onMouseLeave: function onMouseLeave(event) {
          if (_onMouseLeave) _onMouseLeave(event);
        },
        onMouseMove: function onMouseMove(event) {
          dragMove(event);
          if (_onMouseMove) _onMouseMove(event);
        },
        onMouseUp: function onMouseUp(event) {
          dragEnd(event);
          if (_onMouseUp) _onMouseUp(event);
        },
        onClick: function onClick(event) {
          if (_onClick) _onClick(event);
        },
        style: {
          pointerEvents: brush.isBrushing || brush.activeHandle ? 'none' : 'all',
          cursor: disableDraggingSelection ? undefined : 'move'
        }
      }, selectedBoxStyle)));
    });
  };

  return BrushSelection;
}(react.Component);

_defineProperty$3(BrushSelection, "propTypes", {
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  stageWidth: propTypes.number.isRequired,
  stageHeight: propTypes.number.isRequired,
  updateBrush: propTypes.func.isRequired,
  onBrushEnd: propTypes.func,
  disableDraggingSelection: propTypes.bool.isRequired,
  onMouseLeave: propTypes.func,
  onMouseMove: propTypes.func,
  onMouseUp: propTypes.func,
  onClick: propTypes.func
});

_defineProperty$3(BrushSelection, "defaultProps", {
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null
});

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$3(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var BRUSH_OVERLAY_STYLES = {
  cursor: 'crosshair'
};

var BaseBrush = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose$3(BaseBrush, _React$Component);

  function BaseBrush(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    _defineProperty$4(_assertThisInitialized$3(_this), "mouseUpTime", 0);

    _defineProperty$4(_assertThisInitialized$3(_this), "mouseDownTime", 0);

    _defineProperty$4(_assertThisInitialized$3(_this), "getExtent", function (start, end) {
      var _this$props = _this.props,
          brushDirection = _this$props.brushDirection,
          width = _this$props.width,
          height = _this$props.height;
      var x0 = brushDirection === 'vertical' ? 0 : Math.min(start.x || 0, end.x || 0);
      var x1 = brushDirection === 'vertical' ? width : Math.max(start.x || 0, end.x || 0);
      var y0 = brushDirection === 'horizontal' ? 0 : Math.min(start.y || 0, end.y || 0);
      var y1 = brushDirection === 'horizontal' ? height : Math.max(start.y || 0, end.y || 0);
      return {
        x0: x0,
        x1: x1,
        y0: y0,
        y1: y1
      };
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "handleDragStart", function (draw) {
      var _this$props2 = _this.props,
          onBrushStart = _this$props2.onBrushStart,
          left = _this$props2.left,
          top = _this$props2.top,
          inheritedMargin = _this$props2.inheritedMargin;
      var marginLeft = inheritedMargin && inheritedMargin.left ? inheritedMargin.left : 0;
      var marginTop = inheritedMargin && inheritedMargin.top ? inheritedMargin.top : 0;
      var start = {
        x: (draw.x || 0) + draw.dx - left - marginLeft,
        y: (draw.y || 0) + draw.dy - top - marginTop
      };

      var end = _extends$6({}, start);

      if (onBrushStart) {
        onBrushStart(start);
      }

      _this.updateBrush(function (prevBrush) {
        return _extends$6({}, prevBrush, {
          start: start,
          end: end,
          extent: {
            x0: -1,
            x1: -1,
            y0: -1,
            y1: -1
          },
          isBrushing: true
        });
      });
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "handleDragMove", function (drag) {
      var _this$props3 = _this.props,
          left = _this$props3.left,
          top = _this$props3.top,
          inheritedMargin = _this$props3.inheritedMargin;
      if (!drag.isDragging) return;
      var marginLeft = inheritedMargin && inheritedMargin.left || 0;
      var marginTop = inheritedMargin && inheritedMargin.top || 0;
      var end = {
        x: (drag.x || 0) + drag.dx - left - marginLeft,
        y: (drag.y || 0) + drag.dy - top - marginTop
      };

      _this.updateBrush(function (prevBrush) {
        var start = prevBrush.start;

        var extent = _this.getExtent(start, end);

        return _extends$6({}, prevBrush, {
          end: end,
          extent: extent
        });
      });
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "handleDragEnd", function () {
      var _this$props4 = _this.props,
          onBrushEnd = _this$props4.onBrushEnd,
          resetOnEnd = _this$props4.resetOnEnd;

      _this.updateBrush(function (prevBrush) {
        var extent = prevBrush.extent;

        var newState = _extends$6({}, prevBrush, {
          start: {
            x: extent.x0,
            y: extent.y0
          },
          end: {
            x: extent.x1,
            y: extent.y1
          },
          isBrushing: false,
          activeHandle: null
        });

        if (onBrushEnd) {
          onBrushEnd(newState);
        }

        if (resetOnEnd) {
          _this.reset();
        }

        return newState;
      });
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "getBrushWidth", function () {
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1;
      return Math.max(Math.max(x0, x1) - Math.min(x0, x1), 0);
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "getBrushHeight", function () {
      var extent = _this.state.extent;
      var y1 = extent.y1,
          y0 = extent.y0;
      return Math.max(Math.max(y0, y1) - Math.min(y0, y1), 0);
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "handles", function () {
      var handleSize = _this.props.handleSize;
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1,
          y0 = extent.y0,
          y1 = extent.y1;
      var offset = handleSize / 2;

      var width = _this.getBrushWidth();

      var height = _this.getBrushHeight();

      return {
        top: {
          x: x0 - offset,
          y: y0 - offset,
          height: handleSize,
          width: width + handleSize
        },
        bottom: {
          x: x0 - offset,
          y: y1 - offset,
          height: handleSize,
          width: width + handleSize
        },
        right: {
          x: x1 - offset,
          y: y0 - offset,
          height: height + handleSize,
          width: handleSize
        },
        left: {
          x: x0 - offset,
          y: y0 - offset,
          height: height + handleSize,
          width: handleSize
        }
      };
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "corners", function () {
      var handleSize = _this.props.handleSize;
      var extent = _this.state.extent;
      var x0 = extent.x0,
          x1 = extent.x1,
          y0 = extent.y0,
          y1 = extent.y1;
      var offset = handleSize / 2;
      var width = handleSize;
      var height = handleSize;
      return {
        topLeft: {
          x: Math.min(x0, x1) - offset,
          y: Math.min(y0, y1) - offset,
          width: width,
          height: height
        },
        topRight: {
          x: Math.max(x0, x1) - offset,
          y: Math.min(y0, y1) - offset,
          width: width,
          height: height
        },
        bottomLeft: {
          x: Math.min(x0, x1) - offset,
          y: Math.max(y0, y1) - offset,
          width: width,
          height: height
        },
        bottomRight: {
          x: Math.max(x0, x1) - offset,
          y: Math.max(y0, y1) - offset,
          width: width,
          height: height
        }
      };
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "updateBrush", function (updater) {
      var onChange = _this.props.onChange;

      _this.setState(updater, function () {
        if (onChange) {
          onChange(_this.state);
        }
      });
    });

    _defineProperty$4(_assertThisInitialized$3(_this), "reset", function () {
      var _this$props5 = _this.props,
          width = _this$props5.width,
          height = _this$props5.height;

      _this.updateBrush(function () {
        return {
          start: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          },
          extent: {
            x0: -1,
            x1: -1,
            y0: -1,
            y1: -1
          },
          bounds: {
            x0: 0,
            x1: width,
            y0: 0,
            y1: height
          },
          isBrushing: false,
          activeHandle: null
        };
      });
    });

    var initialBrushPosition = props.initialBrushPosition;

    var _extent = initialBrushPosition ? _this.getExtent(initialBrushPosition.start, initialBrushPosition.end) : {
      x0: -1,
      x1: -1,
      y0: -1,
      y1: -1
    };

    _this.state = {
      start: {
        x: Math.max(0, _extent.x0),
        y: Math.max(0, _extent.y0)
      },
      end: {
        x: Math.max(0, _extent.x1),
        y: Math.max(0, _extent.y1)
      },
      extent: _extent,
      bounds: {
        x0: 0,
        x1: _this.props.width,
        y0: 0,
        y1: _this.props.height
      },
      isBrushing: false,
      activeHandle: null
    };
    return _this;
  }

  var _proto = BaseBrush.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this2 = this;

    if (this.props.width !== prevProps.width || this.props.height !== prevProps.height) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(function () {
        return {
          bounds: {
            x0: 0,
            x1: _this2.props.width,
            y0: 0,
            y1: _this2.props.height
          }
        };
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$state = this.state,
        start = _this$state.start,
        end = _this$state.end;
    var _this$props6 = this.props,
        top = _this$props6.top,
        left = _this$props6.left,
        stageWidth = _this$props6.width,
        stageHeight = _this$props6.height,
        _onMouseLeave = _this$props6.onMouseLeave,
        _onMouseUp = _this$props6.onMouseUp,
        _onMouseMove = _this$props6.onMouseMove,
        onBrushEnd = _this$props6.onBrushEnd,
        _onClick = _this$props6.onClick,
        resizeTriggerAreas = _this$props6.resizeTriggerAreas,
        selectedBoxStyle = _this$props6.selectedBoxStyle,
        disableDraggingSelection = _this$props6.disableDraggingSelection,
        clickSensitivity = _this$props6.clickSensitivity;
    var handles = this.handles();
    var corners = this.corners();
    var width = this.getBrushWidth();
    var height = this.getBrushHeight();
    var resizeTriggerAreaSet = new Set(resizeTriggerAreas);
    return /*#__PURE__*/react.createElement(Group, {
      className: "vx-brush",
      top: top,
      left: left
    }, /*#__PURE__*/react.createElement(Drag, {
      width: stageWidth,
      height: stageHeight,
      resetOnStart: true,
      onDragStart: this.handleDragStart,
      onDragMove: this.handleDragMove,
      onDragEnd: this.handleDragEnd
    }, function (_ref) {
      var dragStart = _ref.dragStart,
          isDragging = _ref.isDragging,
          dragMove = _ref.dragMove,
          dragEnd = _ref.dragEnd;
      return /*#__PURE__*/react.createElement(Bar, {
        className: "vx-brush-overlay",
        fill: "transparent",
        x: 0,
        y: 0,
        width: stageWidth,
        height: stageHeight,
        onDoubleClick: function onDoubleClick() {
          return _this3.reset();
        },
        onClick: function onClick(event) {
          var duration = _this3.mouseUpTime - _this3.mouseDownTime;
          if (_onClick && duration < clickSensitivity) _onClick(event);
        },
        onMouseDown: function onMouseDown(event) {
          _this3.mouseDownTime = Date.now();
          dragStart(event);
        },
        onMouseLeave: function onMouseLeave(event) {
          if (_onMouseLeave) _onMouseLeave(event);
        },
        onMouseMove: function onMouseMove(event) {
          if (!isDragging && _onMouseMove) _onMouseMove(event);
          if (isDragging) dragMove(event);
        },
        onMouseUp: function onMouseUp(event) {
          _this3.mouseUpTime = Date.now();
          if (_onMouseUp) _onMouseUp(event);
          dragEnd(event);
        },
        style: BRUSH_OVERLAY_STYLES
      });
    }), start && end && /*#__PURE__*/react.createElement(BrushSelection, {
      updateBrush: this.updateBrush,
      width: width,
      height: height,
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      brush: _extends$6({}, this.state),
      disableDraggingSelection: disableDraggingSelection,
      onBrushEnd: onBrushEnd,
      onMouseLeave: _onMouseLeave,
      onMouseMove: _onMouseMove,
      onMouseUp: _onMouseUp,
      onClick: _onClick,
      selectedBoxStyle: selectedBoxStyle
    }), start && end && Object.keys(handles).filter(function (handleKey) {
      return resizeTriggerAreaSet.has(handleKey);
    }).map(function (handleKey) {
      var handle = handles[handleKey];
      return handle && /*#__PURE__*/react.createElement(BrushHandle, {
        key: "handle-" + handleKey,
        type: handleKey,
        handle: handle,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        updateBrush: _this3.updateBrush,
        brush: _this3.state,
        onBrushEnd: onBrushEnd
      });
    }), start && end && Object.keys(corners).filter(function (cornerKey) {
      return resizeTriggerAreaSet.has(cornerKey);
    }).map(function (cornerKey) {
      var corner = corners[cornerKey];
      return corner && /*#__PURE__*/react.createElement(BrushCorner, {
        key: "corner-" + cornerKey,
        type: cornerKey,
        brush: _this3.state,
        updateBrush: _this3.updateBrush,
        stageWidth: stageWidth,
        stageHeight: stageHeight,
        corner: corner,
        onBrushEnd: onBrushEnd
      });
    }));
  };

  return BaseBrush;
}(react.Component);

_defineProperty$4(BaseBrush, "propTypes", {
  brushDirection: propTypes.oneOf(['horizontal', 'vertical', 'both']),
  width: propTypes.number.isRequired,
  height: propTypes.number.isRequired,
  left: propTypes.number.isRequired,
  top: propTypes.number.isRequired,
  onChange: propTypes.func,
  handleSize: propTypes.number,
  resizeTriggerAreas: propTypes.array,
  onBrushStart: propTypes.func,
  onBrushEnd: propTypes.func,
  onMouseLeave: propTypes.func,
  onMouseUp: propTypes.func,
  onMouseMove: propTypes.func,
  onClick: propTypes.func,
  clickSensitivity: propTypes.number,
  disableDraggingSelection: propTypes.bool,
  resetOnEnd: propTypes.bool
});

_defineProperty$4(BaseBrush, "defaultProps", {
  brushDirection: 'both',
  inheritedMargin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  onChange: null,
  handleSize: 4,
  resizeTriggerAreas: ['left', 'right'],
  onBrushStart: null,
  onBrushEnd: null,
  onMouseLeave: null,
  onMouseUp: null,
  onMouseMove: null,
  onClick: null,
  disableDraggingSelection: false,
  clickSensitivity: 200,
  resetOnEnd: false,
  initialBrushPosition: null
});

function scaleInvert(scale, value) {
  // Test if the scale is an ordinalScale or not,
  // Since an ordinalScale doesn't support invert function.
  if (!scale.invert) {
    var _scale$range = scale.range(),
        start = _scale$range[0],
        end = _scale$range[1];

    var i = 0; // ordinal should have step

    var width = scale.step() * (end - start) / Math.abs(end - start);

    if (width > 0) {
      while (value > start + width * (i + 1)) {
        i += 1;
      }
    } else {
      while (value < start + width * (i + 1)) {
        i += 1;
      }
    }

    return i;
  }

  return scale.invert(value);
}
function getDomainFromExtent(scale, start, end, tolerentDelta) {
  var domain;
  var invertedStart = scaleInvert(scale, start + (start < end ? -tolerentDelta : tolerentDelta));
  var invertedEnd = scaleInvert(scale, end + (end < start ? -tolerentDelta : tolerentDelta));
  var minValue = Math.min(invertedStart, invertedEnd);
  var maxValue = Math.max(invertedStart, invertedEnd);

  if (scale.invert) {
    domain = {
      start: minValue,
      end: maxValue
    };
  } else {
    var values = [];
    var scaleDomain = scale.domain();

    for (var i = minValue; i <= maxValue; i += 1) {
      values.push(scaleDomain[i]);
    }

    domain = {
      values: values
    };
  }

  return domain;
}

function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$4(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var SAFE_PIXEL = 2;
var DEFAULT_COLOR = 'steelblue';

var Brush = /*#__PURE__*/function (_Component) {
  _inheritsLoose$4(Brush, _Component);

  function Brush() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty$5(_assertThisInitialized$4(_this), "handleChange", function (brush) {
      var onChange = _this.props.onChange;
      if (!onChange) return;
      var x0 = brush.extent.x0;

      if (typeof x0 === 'undefined' || x0 < 0) {
        onChange(null);
        return;
      }

      var domain = _this.convertRangeToDomain(brush);

      onChange(domain);
    });

    _defineProperty$5(_assertThisInitialized$4(_this), "handleBrushStart", function (point) {
      var onBrushStart = _this.props.onBrushStart;
      if (!onBrushStart) return;
      var x = point.x,
          y = point.y;
      var _this$props = _this.props,
          xScale = _this$props.xScale,
          yScale = _this$props.yScale;
      var invertedX = scaleInvert(xScale, x);
      var invertedY = scaleInvert(yScale, y);
      onBrushStart({
        x: xScale.invert ? invertedX : xScale.domain()[invertedX],
        y: yScale.invert ? invertedY : yScale.domain()[invertedY]
      });
    });

    _defineProperty$5(_assertThisInitialized$4(_this), "handleBrushEnd", function (brush) {
      var onBrushEnd = _this.props.onBrushEnd;
      if (!onBrushEnd) return;
      var x0 = brush.extent.x0;

      if (typeof x0 === 'undefined' || x0 < 0) {
        onBrushEnd(null);
        return;
      }

      var domain = _this.convertRangeToDomain(brush);

      onBrushEnd(domain);
    });

    return _this;
  }

  var _proto = Brush.prototype;

  _proto.convertRangeToDomain = function convertRangeToDomain(brush) {
    var _this$props2 = this.props,
        xScale = _this$props2.xScale,
        yScale = _this$props2.yScale;
    var _brush$extent = brush.extent,
        x0 = _brush$extent.x0,
        x1 = _brush$extent.x1,
        y0 = _brush$extent.y0,
        y1 = _brush$extent.y1;
    var xDomain = getDomainFromExtent(xScale, x0 || 0, x1 || 0, SAFE_PIXEL);
    var yDomain = getDomainFromExtent(yScale, y0 || 0, y1 || 0, SAFE_PIXEL);
    var domain = {
      x0: xDomain.start || 0,
      x1: xDomain.end || 0,
      xValues: xDomain.values,
      y0: yDomain.start || 0,
      y1: yDomain.end || 0,
      yValues: yDomain.values
    };
    return domain;
  };

  _proto.render = function render() {
    var _this$props3 = this.props,
        xScale = _this$props3.xScale,
        yScale = _this$props3.yScale,
        height = _this$props3.height,
        width = _this$props3.width,
        margin = _this$props3.margin,
        brushDirection = _this$props3.brushDirection,
        initialBrushPosition = _this$props3.initialBrushPosition,
        resizeTriggerAreas = _this$props3.resizeTriggerAreas,
        brushRegion = _this$props3.brushRegion,
        yAxisOrientation = _this$props3.yAxisOrientation,
        xAxisOrientation = _this$props3.xAxisOrientation,
        selectedBoxStyle = _this$props3.selectedBoxStyle,
        disableDraggingSelection = _this$props3.disableDraggingSelection,
        resetOnEnd = _this$props3.resetOnEnd,
        onMouseLeave = _this$props3.onMouseLeave,
        onMouseMove = _this$props3.onMouseMove,
        onClick = _this$props3.onClick,
        handleSize = _this$props3.handleSize;
    if (!xScale || !yScale) return null;
    var brushRegionWidth;
    var brushRegionHeight;
    var left;
    var top;
    var marginLeft = margin && margin.left ? margin.left : 0;
    var marginTop = margin && margin.top ? margin.top : 0;
    var marginRight = margin && margin.right ? margin.right : 0;
    var marginBottom = margin && margin.bottom ? margin.bottom : 0;

    if (brushRegion === 'chart') {
      left = 0;
      top = 0;
      brushRegionWidth = width;
      brushRegionHeight = height;
    } else if (brushRegion === 'yAxis') {
      top = 0;
      brushRegionHeight = height;

      if (yAxisOrientation === 'right') {
        left = width;
        brushRegionWidth = marginRight;
      } else {
        left = -marginLeft;
        brushRegionWidth = marginLeft;
      }
    } else {
      left = 0;
      brushRegionWidth = width;

      if (xAxisOrientation === 'bottom') {
        top = height;
        brushRegionHeight = marginBottom;
      } else {
        top = -marginTop;
        brushRegionHeight = marginTop;
      }
    }

    return /*#__PURE__*/react.createElement(BaseBrush, {
      width: brushRegionWidth,
      height: brushRegionHeight,
      left: left,
      top: top,
      inheritedMargin: margin,
      initialBrushPosition: initialBrushPosition,
      onChange: this.handleChange,
      onBrushEnd: this.handleBrushEnd,
      onBrushStart: this.handleBrushStart,
      handleSize: handleSize,
      resizeTriggerAreas: resizeTriggerAreas,
      brushDirection: brushDirection,
      selectedBoxStyle: selectedBoxStyle,
      disableDraggingSelection: disableDraggingSelection,
      resetOnEnd: resetOnEnd,
      onMouseLeave: onMouseLeave,
      onMouseMove: onMouseMove,
      onClick: onClick
    });
  };

  return Brush;
}(react.Component);

_defineProperty$5(Brush, "propTypes", {
  height: propTypes.number,
  width: propTypes.number,
  onChange: propTypes.func,
  onBrushEnd: propTypes.func,
  brushDirection: propTypes.oneOf(['vertical', 'horizontal', 'both']),
  resizeTriggerAreas: propTypes.array,
  brushRegion: propTypes.oneOf(['xAxis', 'yAxis', 'chart']),
  yAxisOrientation: propTypes.oneOf(['left', 'right']),
  xAxisOrientation: propTypes.oneOf(['top', 'bottom']),
  disableDraggingSelection: propTypes.bool,
  resetOnEnd: propTypes.bool,
  handleSize: propTypes.number
});

_defineProperty$5(Brush, "defaultProps", {
  xScale: null,
  yScale: null,
  onChange: null,
  height: 0,
  width: 0,
  selectedBoxStyle: {
    fill: DEFAULT_COLOR,
    fillOpacity: 0.2,
    stroke: DEFAULT_COLOR,
    strokeWidth: 1,
    strokeOpacity: 0.8
  },
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  handleSize: 4,
  brushDirection: 'horizontal',
  initialBrushPosition: null,
  resizeTriggerAreas: ['left', 'right'],
  brushRegion: 'chart',
  yAxisOrientation: 'right',
  xAxisOrientation: 'bottom',
  onBrushStart: null,
  onBrushEnd: null,
  disableDraggingSelection: false,
  resetOnEnd: false,
  onMouseMove: null,
  onMouseLeave: null,
  onClick: null
});

export { Brush };
