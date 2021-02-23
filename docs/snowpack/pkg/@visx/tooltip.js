import { r as react } from '../common/index-abdc4d2d.js';
import { p as propTypes } from '../common/index-ad697a84.js';
import { r as reactDom } from '../common/index-2be6b7dd.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';
import '../common/_commonjsHelpers-4f955397.js';

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function useTooltip(
/** Optional initial TooltipState. */
initialTooltipState) {
  var _useState = react.useState(_extends({
    tooltipOpen: false
  }, initialTooltipState)),
      tooltipState = _useState[0],
      setTooltipState = _useState[1];

  var showTooltip = react.useCallback(function (showArgs) {
    return setTooltipState(typeof showArgs === 'function' ? function (_ref) {
      _ref.tooltipOpen;
          var show = _objectWithoutPropertiesLoose(_ref, ["tooltipOpen"]);

      return _extends({}, showArgs(show), {
        tooltipOpen: true
      });
    } : {
      tooltipOpen: true,
      tooltipLeft: showArgs.tooltipLeft,
      tooltipTop: showArgs.tooltipTop,
      tooltipData: showArgs.tooltipData
    });
  }, [setTooltipState]);
  var hideTooltip = react.useCallback(function () {
    return setTooltipState({
      tooltipOpen: false,
      tooltipLeft: undefined,
      tooltipTop: undefined,
      tooltipData: undefined
    });
  }, [setTooltipState]);
  return {
    tooltipOpen: tooltipState.tooltipOpen,
    tooltipLeft: tooltipState.tooltipLeft,
    tooltipTop: tooltipState.tooltipTop,
    tooltipData: tooltipState.tooltipData,
    updateTooltip: setTooltipState,
    showTooltip: showTooltip,
    hideTooltip: hideTooltip
  };
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  }
  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
// Adds compatibility for ES modules
debounce.debounce = debounce;

var debounce_1 = debounce;

function useMeasure({
  debounce: debounce$1,
  scroll,
  polyfill
} = {
  debounce: 0,
  scroll: false
}) {
  const ResizeObserver = polyfill || (typeof window === 'undefined' ? class ResizeObserver {} : window.ResizeObserver);

  if (!ResizeObserver) {
    throw new Error('This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills');
  }

  const [bounds, set] = react.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    bottom: 0,
    right: 0,
    x: 0,
    y: 0
  }); // keep all state in a ref

  const state = react.useRef({
    element: null,
    scrollContainers: null,
    resizeObserver: null,
    lastBounds: bounds
  }); // set actual debounce values early, so effects know if they should react accordingly

  const scrollDebounce = debounce$1 ? typeof debounce$1 === 'number' ? debounce$1 : debounce$1.scroll : null;
  const resizeDebounce = debounce$1 ? typeof debounce$1 === 'number' ? debounce$1 : debounce$1.resize : null; // memoize handlers, so event-listeners know when they should update

  const [forceRefresh, resizeChange, scrollChange] = react.useMemo(() => {
    const callback = () => {
      if (!state.current.element) return;
      const {
        left,
        top,
        width,
        height,
        bottom,
        right,
        x,
        y
      } = state.current.element.getBoundingClientRect();
      const size = {
        left,
        top,
        width,
        height,
        bottom,
        right,
        x,
        y
      };
      Object.freeze(size);
      if (!areBoundsEqual(state.current.lastBounds, size)) set(state.current.lastBounds = size);
    };

    return [callback, resizeDebounce ? debounce_1.debounce(callback, resizeDebounce) : callback, scrollDebounce ? debounce_1.debounce(callback, scrollDebounce) : callback];
  }, [set, scrollDebounce, resizeDebounce]); // cleanup current scroll-listeners / observers

  function removeListeners() {
    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach(element => element.removeEventListener('scroll', scrollChange, true));
      state.current.scrollContainers = null;
    }

    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect();
      state.current.resizeObserver = null;
    }
  } // add scroll-listeners / observers


  function addListeners() {
    if (!state.current.element) return;
    state.current.resizeObserver = new ResizeObserver(scrollChange);
    state.current.resizeObserver.observe(state.current.element);

    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach(scrollContainer => scrollContainer.addEventListener('scroll', scrollChange, {
        capture: true,
        passive: true
      }));
    }
  } // the ref we expose to the user


  const ref = node => {
    if (!node || node === state.current.element) return;
    removeListeners();
    state.current.element = node;
    state.current.scrollContainers = findScrollContainers(node);
    addListeners();
  }; // add general event listeners


  useOnWindowScroll(scrollChange, Boolean(scroll));
  useOnWindowResize(resizeChange); // respond to changes that are relevant for the listeners

  react.useEffect(() => {
    removeListeners();
    addListeners();
  }, [scroll, scrollChange, resizeChange]); // remove all listeners when the components unmounts

  react.useEffect(() => removeListeners, []);
  return [ref, bounds, forceRefresh];
} // Adds native resize listener to window


function useOnWindowResize(onWindowResize) {
  react.useEffect(() => {
    const cb = onWindowResize;
    window.addEventListener('resize', cb);
    return () => void window.removeEventListener('resize', cb);
  }, [onWindowResize]);
}

function useOnWindowScroll(onScroll, enabled) {
  react.useEffect(() => {
    if (enabled) {
      const cb = onScroll;
      window.addEventListener('scroll', cb, {
        capture: true,
        passive: true
      });
      return () => void window.removeEventListener('scroll', cb, true);
    }
  }, [onScroll, enabled]);
} // Returns a list of scroll offsets


function findScrollContainers(element) {
  const result = [];
  if (!element || element === document.body) return result;
  const {
    overflow,
    overflowX,
    overflowY
  } = window.getComputedStyle(element);
  if ([overflow, overflowX, overflowY].some(prop => prop === 'auto' || prop === 'scroll')) result.push(element);
  return [...result, ...findScrollContainers(element.parentElement)];
} // Checks if element boundaries are equal


const keys = ['x', 'y', 'top', 'bottom', 'left', 'right', 'width', 'height'];

const areBoundsEqual = (a, b) => keys.every(key => a[key] === b[key]);

if (typeof module !== 'undefined' && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(module, 'exports').writable) {
  module.exports = useMeasure;
}

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** Render within a portal using a declarative component API. */
var Portal = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Portal, _React$PureComponent);

  function Portal() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    return _this;
  }

  var _proto = Portal.prototype;

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.node && document.body) {
      document.body.removeChild(this.node);
      delete this.node;
    }
  };

  _proto.render = function render() {
    // SSR check
    if (!this.node && typeof document !== 'undefined') {
      this.node = document.createElement('div');
      if (this.props.zIndex != null) this.node.style.zIndex = "" + this.props.zIndex;
      document.body.append(this.node);
    }

    if (!this.node) {
      return null;
    }

    return /*#__PURE__*/reactDom.createPortal(this.props.children, this.node);
  };

  return Portal;
}(react.PureComponent);

_defineProperty(Portal, "propTypes", {
  zIndex: propTypes.number
});

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var defaultStyles = {
  position: 'absolute',
  backgroundColor: 'white',
  color: '#666666',
  padding: '.3rem .5rem',
  borderRadius: '3px',
  fontSize: '14px',
  boxShadow: '0 1px 2px rgba(33,33,33,0.2)',
  lineHeight: '1em',
  pointerEvents: 'none'
};
function Tooltip(_ref) {
  var className = _ref.className,
      top = _ref.top,
      left = _ref.left,
      _ref$offsetLeft = _ref.offsetLeft,
      offsetLeft = _ref$offsetLeft === void 0 ? 10 : _ref$offsetLeft,
      _ref$offsetTop = _ref.offsetTop,
      offsetTop = _ref$offsetTop === void 0 ? 10 : _ref$offsetTop,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? defaultStyles : _ref$style,
      children = _ref.children,
      _ref$unstyled = _ref.unstyled,
      unstyled = _ref$unstyled === void 0 ? false : _ref$unstyled,
      _ref$applyPositionSty = _ref.applyPositionStyle,
      applyPositionStyle = _ref$applyPositionSty === void 0 ? false : _ref$applyPositionSty,
      restProps = _objectWithoutPropertiesLoose$1(_ref, ["className", "top", "left", "offsetLeft", "offsetTop", "style", "children", "unstyled", "applyPositionStyle"]);

  return /*#__PURE__*/react.createElement("div", _extends$1({
    className: classnames('visx-tooltip', className),
    style: _extends$1({
      top: top == null || offsetTop == null ? top : top + offsetTop,
      left: left == null || offsetLeft == null ? left : left + offsetLeft
    }, applyPositionStyle && {
      position: 'absolute'
    }, !unstyled && style)
  }, restProps), children);
}
Tooltip.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  left: propTypes.number,
  offsetLeft: propTypes.number,
  offsetTop: propTypes.number,
  top: propTypes.number,
  applyPositionStyle: propTypes.bool,
  unstyled: propTypes.bool
};

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }

function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose$1(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var emptyRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0
};
function withBoundingRects(BaseComponent) {
  var _class, _temp;

  return _temp = _class = /*#__PURE__*/function (_React$PureComponent) {
    _inheritsLoose$1(WrappedComponent, _React$PureComponent);

    function WrappedComponent(props) {
      var _this;

      _this = _React$PureComponent.call(this, props) || this;

      _defineProperty$1(_assertThisInitialized$1(_this), "node", void 0);

      _this.state = {
        rect: undefined,
        parentRect: undefined
      };
      _this.getRects = _this.getRects.bind(_assertThisInitialized$1(_this));
      return _this;
    }

    var _proto = WrappedComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.node = reactDom.findDOMNode(this);
      this.setState(function () {
        return _this2.getRects();
      });
    };

    _proto.getRects = function getRects() {
      if (!this.node) return this.state;
      var node = this.node;
      var parentNode = node.parentNode;
      var rect = node.getBoundingClientRect ? node.getBoundingClientRect() : emptyRect;
      var parentRect = parentNode && parentNode.getBoundingClientRect ? parentNode.getBoundingClientRect() : emptyRect;
      return {
        rect: rect,
        parentRect: parentRect
      };
    };

    _proto.render = function render() {
      return /*#__PURE__*/react.createElement(BaseComponent, _extends$2({
        getRects: this.getRects
      }, this.state, this.props));
    };

    return WrappedComponent;
  }(react.PureComponent), _defineProperty$1(_class, "displayName", "withBoundingRects(" + (BaseComponent.displayName || '') + ")"), _temp;
}

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function TooltipWithBounds(_ref) {
  var children = _ref.children;
      _ref.getRects;
      var _ref$left = _ref.left,
      initialLeft = _ref$left === void 0 ? 0 : _ref$left,
      _ref$offsetLeft = _ref.offsetLeft,
      offsetLeft = _ref$offsetLeft === void 0 ? 10 : _ref$offsetLeft,
      _ref$offsetTop = _ref.offsetTop,
      offsetTop = _ref$offsetTop === void 0 ? 10 : _ref$offsetTop,
      parentBounds = _ref.parentRect,
      ownBounds = _ref.rect,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? defaultStyles : _ref$style,
      _ref$top = _ref.top,
      initialTop = _ref$top === void 0 ? 0 : _ref$top,
      _ref$unstyled = _ref.unstyled,
      unstyled = _ref$unstyled === void 0 ? false : _ref$unstyled,
      otherProps = _objectWithoutPropertiesLoose$2(_ref, ["children", "getRects", "left", "offsetLeft", "offsetTop", "parentRect", "rect", "style", "top", "unstyled"]);

  var left = initialLeft;
  var top = initialTop;

  if (ownBounds && parentBounds) {
    var placeTooltipLeft = false;
    var placeTooltipUp = false;

    if (parentBounds.width) {
      var rightPlacementClippedPx = left + offsetLeft + ownBounds.width - parentBounds.width;
      var leftPlacementClippedPx = ownBounds.width - left - offsetLeft;
      placeTooltipLeft = rightPlacementClippedPx > 0 && rightPlacementClippedPx > leftPlacementClippedPx;
    } else {
      var _rightPlacementClippedPx = left + offsetLeft + ownBounds.width - window.innerWidth;

      var _leftPlacementClippedPx = ownBounds.width - left - offsetLeft;

      placeTooltipLeft = _rightPlacementClippedPx > 0 && _rightPlacementClippedPx > _leftPlacementClippedPx;
    }

    if (parentBounds.height) {
      var bottomPlacementClippedPx = top + offsetTop + ownBounds.height - parentBounds.height;
      var topPlacementClippedPx = ownBounds.height - top - offsetTop;
      placeTooltipUp = bottomPlacementClippedPx > 0 && bottomPlacementClippedPx > topPlacementClippedPx;
    } else {
      placeTooltipUp = top + offsetTop + ownBounds.height > window.innerHeight;
    }

    left = placeTooltipLeft ? left - ownBounds.width - offsetLeft : left + offsetLeft;
    top = placeTooltipUp ? top - ownBounds.height - offsetTop : top + offsetTop;
  }

  left = Math.round(left);
  top = Math.round(top);
  return /*#__PURE__*/react.createElement(Tooltip, _extends$3({
    style: _extends$3({
      left: 0,
      top: 0,
      transform: "translate(" + left + "px, " + top + "px)"
    }, !unstyled && style)
  }, otherProps), children);
}

var TooltipWithBounds$1 = withBoundingRects(TooltipWithBounds);

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Hook that handles rendering of a Tooltip or TooltipWithBounds in a Portal.
 * Handles conversion of container coordinates to page coordinates using the container bounds.
 */
function useTooltipInPortal(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$detectBounds = _ref.detectBounds,
      detectBoundsOption = _ref$detectBounds === void 0 ? true : _ref$detectBounds,
      useMeasureOptions = _objectWithoutPropertiesLoose$3(_ref, ["detectBounds"]);

  var _useMeasure = useMeasure(useMeasureOptions),
      containerRef = _useMeasure[0],
      containerBounds = _useMeasure[1];

  var TooltipInPortal = react.useMemo(function () {
    return function (_ref2) {
      var _ref2$left = _ref2.left,
          containerLeft = _ref2$left === void 0 ? 0 : _ref2$left,
          _ref2$top = _ref2.top,
          containerTop = _ref2$top === void 0 ? 0 : _ref2$top,
          detectBoundsProp = _ref2.detectBounds,
          tooltipProps = _objectWithoutPropertiesLoose$3(_ref2, ["left", "top", "detectBounds"]);

      var detectBounds = detectBoundsProp == null ? detectBoundsOption : detectBoundsProp;
      var TooltipComponent = detectBounds ? TooltipWithBounds$1 : Tooltip; // convert container coordinates to page coordinates

      var portalLeft = containerLeft + (containerBounds.left || 0) + window.scrollX;
      var portalTop = containerTop + (containerBounds.top || 0) + window.scrollY;
      return /*#__PURE__*/react.createElement(Portal, null, /*#__PURE__*/react.createElement(TooltipComponent, _extends$4({
        left: portalLeft,
        top: portalTop
      }, tooltipProps)));
    };
  }, [detectBoundsOption, containerBounds.left, containerBounds.top]);
  return {
    // react-use-measure doesn't currently accept SVGElement refs
    // @ts-ignore fixed here https://github.com/react-spring/react-use-measure/pull/17
    containerRef: containerRef,
    containerBounds: containerBounds,
    TooltipInPortal: TooltipInPortal
  };
}

export { defaultStyles, useTooltip, useTooltipInPortal };
