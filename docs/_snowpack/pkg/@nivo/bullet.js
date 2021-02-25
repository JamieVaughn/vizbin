import { r as react } from '../common/index-abdc4d2d.js';
import { _ as _extends } from '../common/extends-7477639a.js';
import { p as process } from '../common/process-2545f00a.js';
import { r as reactDom } from '../common/index-2be6b7dd.js';
import { p as propTypes } from '../common/index-ad697a84.js';
import { _ as _baseAssignValue, a as _Uint8Array, b as _isPrototype, i as isBuffer_1, c as isTypedArray_1, d as isArray_1, e as isArrayLikeObject_1, f as isArguments_1, g as _baseFor, h as _Stack, l as last_1, j as isString_1, k as get_1 } from '../common/flatten-6e030091.js';
import { e as eq_1, _ as _root, i as isObject_1, a as isFunction_1 } from '../common/memoize-af238e81.js';
import { c as createCommonjsModule } from '../common/_commonjsHelpers-4f955397.js';
import { _ as _getPrototype, a as _copyObject, k as keysIn_1, i as isPlainObject_1, b as _createAssigner, c as _baseSet, w as without_1 } from '../common/pick-a9479e35.js';
import { s as scheme, a as scheme$1, b as scheme$2, c as scheme$3, d as scheme$4, e as scheme$5, f as scheme$6, g as scheme$7, h as scheme$8, i as scheme$9, j as scheme$a, k as scheme$b, l as scheme$c, m as scheme$d, n as scheme$e, o as scheme$f, p as scheme$g, q as scheme$h, r as scheme$i, t as scheme$j, u as scheme$k, v as scheme$l, w as scheme$m, x as scheme$n, y as scheme$o, z as scheme$p, A as schemeCategory10, B as schemeAccent, C as schemeDark2, D as schemePaired, E as schemePastel1, F as schemePastel2, G as schemeSet1, H as schemeSet2, I as schemeSet3, J as scheme$q, K as interpolateBrBG, L as interpolatePRGn, M as interpolatePiYG, N as interpolatePuOr, O as interpolateRdBu, P as interpolateRdGy, Q as interpolateRdYlBu, R as interpolateRdYlGn, S as interpolateSpectral, T as interpolateBlues, U as interpolateGreens, V as interpolateGreys, W as interpolateOranges, X as interpolatePurples, Y as interpolateReds, Z as interpolateViridis, _ as inferno, $ as magma, a0 as plasma, a1 as warm, a2 as cool, a3 as interpolateCubehelixDefault, a4 as interpolateBuGn, a5 as interpolateBuPu, a6 as interpolateGnBu, a7 as interpolateOrRd, a8 as interpolatePuBuGn, a9 as interpolatePuBu, aa as interpolatePuRd, ab as interpolateRdPu, ac as interpolateYlGnBu, ad as interpolateYlGn, ae as interpolateYlOrBr, af as interpolateYlOrRd, ag as interpolateRainbow, ah as interpolateSinebow } from '../common/viridis-c59cbebd.js';
import { o as ordinal } from '../common/ordinal-65ab6804.js';
import { u as utcMonday, a as utcDay, m as monday, d as day, b as utcYear, c as utcSunday, e as utcThursday, y as year, s as sunday, t as thursday, f as tuesday, g as utcTuesday, w as wednesday, h as utcWednesday, i as friday, j as utcFriday, k as saturday, l as utcSaturday } from '../common/utcYear-88153cbb.js';
import { c as curveBasis, a as curveBasisClosed, b as curveBasisOpen, d as curveBundle, e as curveCardinal, f as curveCardinalClosed, g as curveCardinalOpen, h as curveCatmullRom, i as curveCatmullRomClosed, j as curveCatmullRomOpen, k as curveLinearClosed, l as curveNatural, m as curveStep, s as stepAfter, n as stepBefore } from '../common/step-ee54e010.js';
import { c as curveLinear, s as stackOrderAscending, a as stackOrderDescending, b as stackOrderInsideOut, d as stackOrderNone, e as stackOrderReverse, f as stackOffsetExpand, g as stackOffsetDiverging, h as stackOffsetNone, i as stackOffsetSilhouette, j as stackOffsetWiggle } from '../common/reverse-386d2f80.js';
import { m as monotoneX, a as monotoneY } from '../common/monotone-5230af58.js';
import { t as treemapBinary, a as treemapDice, b as treemapSlice, c as treemapSliceDice, d as treemapSquarify, e as treemapResquarify } from '../common/resquarify-82208d26.js';
import { s as sequential } from '../common/sequential-b827d1b6.js';
import { m as millisecond } from '../common/millisecond-22862655.js';
import { s as second, m as minute, u as utcMinute, h as hour, a as utcHour, b as month, c as utcMonth } from '../common/utcMonth-4ccdc574.js';
import { l as linear$1 } from '../common/linear-6238e9df.js';
import '../common/cubehelix-9d1c68c8.js';
import '../common/nice-d5ee0ce3.js';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var useLayoutEffect = typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
    ? react.useLayoutEffect
    : react.useEffect;

// The global `requestAnimationFrame` must be dereferenced to avoid "Illegal invocation" errors
var requestAnimationFrame$1 = function (fn) {
    return (0, requestAnimationFrame$2)(fn);
};
/**
 * FrameLoop executes its animations in order of lowest priority first.
 * Animations are retained until idle.
 */
var FrameLoop = /** @class */ (function () {
    function FrameLoop(raf) {
        if (raf === void 0) { raf = requestAnimationFrame$1; }
        var idle = true;
        var writing = false;
        // The most recent framestamp
        var lastTime = 0;
        // The active animations for the current frame, sorted by lowest priority first
        var animations = [];
        // The priority of the currently advancing animation.
        // To protect against a race condition whenever a frame is being processed,
        // where the filtering of `animations` is corrupted with a shifting index,
        // causing animations to potentially advance 2x faster than intended.
        var priority = 0;
        // Animations starting on the next frame
        var startQueue = new Set();
        // Flushed after all animations are updated.
        // Used to dispatch events to an "onFrame" prop, for example.
        var frameQueue = new Set();
        // Flushed at the very end of each frame.
        // Used to avoid layout thrashing in @react-spring/web, for example.
        var writeQueue = new Set();
        // Add an animation to the frameloop
        var start = function (animation) {
            var index = animations.indexOf(animation);
            if (index < 0) {
                index = animations.findIndex(function (other) { return other.priority > animation.priority; });
                animations.splice(~index ? index : animations.length, 0, animation);
            }
        };
        var loop = function () {
            if (idle)
                return;
            try {
                advance();
                raf(loop);
            }
            catch (e) {
                console.error(e);
            }
        };
        // Start the frameloop
        var kickoff = function () {
            if (idle) {
                idle = false;
                // To minimize frame skips, the frameloop never stops.
                if (lastTime == 0) {
                    lastTime = now();
                    raf(loop);
                }
            }
        };
        var timeoutQueue = [];
        this.setTimeout = function (handler, ms) {
            var time = now() + ms;
            var cancel = function () {
                var index = timeoutQueue.findIndex(function (t) { return t.cancel == cancel; });
                if (index >= 0) {
                    timeoutQueue.splice(index, 1);
                }
            };
            var index = findIndex(timeoutQueue, function (t) { return t.time > time; });
            var timeout = { time: time, handler: handler, cancel: cancel };
            timeoutQueue.splice(index, 0, timeout);
            kickoff();
            return timeout;
        };
        // Process the current frame.
        var advance = (this.advance = function () {
            var time = now();
            // Start animations that were added during last frame.
            if (startQueue.size) {
                startQueue.forEach(start);
                startQueue.clear();
            }
            // Flush the timeout queue.
            if (timeoutQueue.length) {
                batchedUpdates(function () {
                    var count = findIndex(timeoutQueue, function (t) { return t.time > time; });
                    timeoutQueue.splice(0, count).forEach(function (t) { return t.handler(); });
                });
            }
            if (time > lastTime) {
                // http://gafferongames.com/game-physics/fix-your-timestep/
                var dt_1 = Math.min(64, time - lastTime);
                lastTime = time;
                batchedUpdates(function () {
                    // Animations can be added while the frameloop is updating,
                    // but they need a higher priority to be started on this frame.
                    if (animations.length) {
                        willAdvance(animations);
                        animations = animations.filter(function (animation) {
                            priority = animation.priority;
                            // Animations may go idle before the next frame.
                            if (!animation.idle) {
                                animation.advance(dt_1);
                            }
                            // Remove idle animations.
                            return !animation.idle;
                        });
                        priority = 0;
                    }
                    if (frameQueue.size) {
                        frameQueue.forEach(function (onFrame) { return onFrame(time); });
                        frameQueue.clear();
                    }
                    if (writeQueue.size) {
                        writing = true;
                        writeQueue.forEach(function (write) { return write(time); });
                        writeQueue.clear();
                        writing = false;
                    }
                });
            }
        });
        this.start = function (animation) {
            if (priority > animation.priority) {
                startQueue.add(animation);
            }
            else {
                start(animation);
                kickoff();
            }
        };
        this.onFrame = function (cb) {
            frameQueue.add(cb);
            kickoff();
        };
        this.onWrite = function (cb) {
            if (writing)
                cb(lastTime);
            else
                writeQueue.add(cb);
        };
        // Expose internals for testing.
        if (typeof process !== 'undefined' &&
            "production" !== 'production') {
            var dispose_1 = function () {
                idle = true;
                startQueue.clear();
                timeoutQueue.length = 0;
            };
            Object.defineProperties(this, {
                _animations: { get: function () { return animations; } },
                _dispose: { get: function () { return dispose_1; } },
            });
        }
    }
    return FrameLoop;
}());
/** Like `Array.prototype.findIndex` but returns `arr.length` instead of `-1` */
function findIndex(arr, test) {
    var index = arr.findIndex(test);
    return index < 0 ? arr.length : index;
}

var noop = function () { };
var defineHidden = function (obj, key, value) {
    return Object.defineProperty(obj, key, { value: value, writable: true, configurable: true });
};
var is = {
    arr: Array.isArray,
    obj: function (a) {
        return !!a && a.constructor.name === 'Object';
    },
    fun: function (a) { return typeof a === 'function'; },
    str: function (a) { return typeof a === 'string'; },
    num: function (a) { return typeof a === 'number'; },
    und: function (a) { return a === undefined; },
};
/** Compare animatable values */
function isEqual(a, b) {
    if (is.arr(a)) {
        if (!is.arr(b) || a.length !== b.length)
            return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    return a === b;
}
// Not all strings can be animated (eg: {display: "none"})
var isAnimatedString = function (value) {
    return is.str(value) &&
        (value[0] == '#' ||
            /\d/.test(value) ||
            !!(colorNames && colorNames[value]));
};
/** An unsafe object/array/set iterator that allows for better minification */
var each = function (obj, cb, ctx) {
    if (is.fun(obj.forEach)) {
        obj.forEach(cb, ctx);
    }
    else {
        Object.keys(obj).forEach(function (key) {
            return cb.call(ctx, obj[key], key);
        });
    }
};
var toArray = function (a) {
    return is.und(a) ? [] : is.arr(a) ? a : [a];
};
function flush(queue, iterator) {
    if (queue.size) {
        var items = Array.from(queue);
        queue.clear();
        each(items, iterator);
    }
}

//
// Required
//
var createStringInterpolator;
var frameLoop = new FrameLoop();
//
// Optional
//
var to;
var now = function () { return performance.now(); };
var colorNames = null;
var skipAnimation = false;
var requestAnimationFrame$2 = typeof window !== 'undefined' ? window.requestAnimationFrame : function () { return -1; };
var batchedUpdates = function (callback) { return callback(); };
var willAdvance = noop;
var assign = function (globals) {
    var _a;
    return (_a = Object.assign({
        to: to,
        now: now,
        frameLoop: frameLoop,
        colorNames: colorNames,
        skipAnimation: skipAnimation,
        createStringInterpolator: createStringInterpolator,
        requestAnimationFrame: requestAnimationFrame$2,
        batchedUpdates: batchedUpdates,
        willAdvance: willAdvance,
    }, pluckDefined(globals)), to = _a.to, now = _a.now, frameLoop = _a.frameLoop, colorNames = _a.colorNames, skipAnimation = _a.skipAnimation, createStringInterpolator = _a.createStringInterpolator, requestAnimationFrame$2 = _a.requestAnimationFrame, batchedUpdates = _a.batchedUpdates, willAdvance = _a.willAdvance, _a);
};
// Ignore undefined values
function pluckDefined(globals) {
    var defined = {};
    for (var key in globals) {
        if (globals[key] !== undefined)
            defined[key] = globals[key];
    }
    return defined;
}

var useOnce = function (effect) { return react.useEffect(effect, []); };
/** Return a function that re-renders this component, if still mounted */
var useForceUpdate = function () {
    var update = react.useState(0)[1];
    var unmounted = react.useRef(false);
    useOnce(function () { return function () {
        unmounted.current = true;
    }; });
    return function () {
        if (!unmounted.current) {
            update({});
        }
    };
};
/** Use a value from the previous render */
function usePrev(value) {
    var prevRef = react.useRef(undefined);
    react.useEffect(function () {
        prevRef.current = value;
    });
    return prevRef.current;
}

var createInterpolator = function (range, output, extrapolate) {
    if (is.fun(range)) {
        return range;
    }
    if (is.arr(range)) {
        return createInterpolator({
            range: range,
            output: output,
            extrapolate: extrapolate,
        });
    }
    if (is.str(range.output[0])) {
        return createStringInterpolator(range);
    }
    var config = range;
    var outputRange = config.output;
    var inputRange = config.range || [0, 1];
    var extrapolateLeft = config.extrapolateLeft || config.extrapolate || 'extend';
    var extrapolateRight = config.extrapolateRight || config.extrapolate || 'extend';
    var easing = config.easing || (function (t) { return t; });
    return function (input) {
        var range = findRange(input, inputRange);
        return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
    };
};
function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
    var result = map ? map(input) : input;
    // Extrapolate
    if (result < inputMin) {
        if (extrapolateLeft === 'identity')
            return result;
        else if (extrapolateLeft === 'clamp')
            result = inputMin;
    }
    if (result > inputMax) {
        if (extrapolateRight === 'identity')
            return result;
        else if (extrapolateRight === 'clamp')
            result = inputMax;
    }
    if (outputMin === outputMax)
        return outputMin;
    if (inputMin === inputMax)
        return input <= inputMin ? outputMin : outputMax;
    // Input Range
    if (inputMin === -Infinity)
        result = -result;
    else if (inputMax === Infinity)
        result = result - inputMin;
    else
        result = (result - inputMin) / (inputMax - inputMin);
    // Easing
    result = easing(result);
    // Output Range
    if (outputMin === -Infinity)
        result = -result;
    else if (outputMax === Infinity)
        result = result + outputMin;
    else
        result = result * (outputMax - outputMin) + outputMin;
    return result;
}
function findRange(input, inputRange) {
    for (var i = 1; i < inputRange.length - 1; ++i)
        if (inputRange[i] >= input)
            break;
    return i - 1;
}

var $config = Symbol.for('FluidValue:config');
function getFluidValue(arg) {
    var config = getFluidConfig(arg);
    return config ? config.get() : arg;
}
function getFluidConfig(arg) {
    if (arg)
        return arg[$config];
}
/** Set the methods for observing the given object. */
function setFluidConfig(target, config) {
    Object.defineProperty(target, $config, {
        value: config,
        configurable: true,
    });
}
/**
 * This class stores a single dynamic value, which can be observed by multiple `FluidObserver` objects.
 *
 * In order to support non-writable streams, this class doesn't expect a `set` method to exist.
 *
 * It can send *any* event to observers, not only change events.
 */
var FluidValue = /** @class */ (function () {
    function FluidValue() {
        setFluidConfig(this, this);
    }
    return FluidValue;
}());

const $node = Symbol.for('Animated:node');
const isAnimated = value => !!value && value[$node] === value;
/** Get the owner's `Animated` node. */

const getAnimated = owner => owner && owner[$node];
/** Set the owner's `Animated` node. */

const setAnimated = (owner, node) => defineHidden(owner, $node, node);
/** Get every `AnimatedValue` in the owner's `Animated` node. */

const getPayload = owner => owner && owner[$node] && owner[$node].getPayload();
class Animated {
  /** The cache of animated values */
  constructor() {
    this.payload = void 0;
    // This makes "isAnimated" return true.
    setAnimated(this, this);
  }
  /** Get the current value. Pass `true` for only animated values. */


  /** Get every `AnimatedValue` used by this node. */
  getPayload() {
    return this.payload || [];
  }

}

/** An animated number or a native attribute value */

class AnimatedValue extends Animated {
  constructor(_value) {
    super();
    this._value = _value;
    this.done = true;
    this.elapsedTime = void 0;
    this.lastPosition = void 0;
    this.lastVelocity = void 0;
    this.v0 = void 0;

    if (is.num(this._value)) {
      this.lastPosition = this._value;
    }
  }

  static create(from, _to) {
    return new AnimatedValue(from);
  }

  getPayload() {
    return [this];
  }

  getValue() {
    return this._value;
  }
  /**
   * Set the current value and optionally round it.
   *
   * The `step` argument does nothing whenever it equals `undefined` or `0`.
   * It works with fractions and whole numbers. The best use case is (probably)
   * rounding to the pixel grid with a step of:
   *
   *      1 / window.devicePixelRatio
   */


  setValue(value, step) {
    if (is.num(value)) {
      this.lastPosition = value;

      if (step) {
        value = Math.round(value / step) * step;

        if (this.done) {
          this.lastPosition = value;
        }
      }
    }

    if (this._value === value) {
      return false;
    }

    this._value = value;
    return true;
  }

  reset() {
    const {
      done
    } = this;
    this.done = false;

    if (is.num(this._value)) {
      this.elapsedTime = 0;
      this.lastPosition = this._value;
      if (done) this.lastVelocity = null;
      this.v0 = null;
    }
  }

}

class AnimatedString extends AnimatedValue {
  constructor(from, to) {
    super(0);
    this._value = void 0;
    this._string = null;
    this._toString = void 0;
    this._toString = createInterpolator({
      output: [from, to]
    });
  }

  static create(from, to = from) {
    if (is.str(from) && is.str(to)) {
      return new AnimatedString(from, to);
    }

    throw TypeError('Expected "from" and "to" to be strings');
  }

  getValue() {
    let value = this._string;
    return value == null ? this._string = this._toString(this._value) : value;
  }

  setValue(value) {
    if (!is.num(value)) {
      this._string = value;
      this._value = 1;
    } else if (super.setValue(value)) {
      this._string = null;
    } else {
      return false;
    }

    return true;
  }

  reset(goal) {
    if (goal) {
      this._toString = createInterpolator({
        output: [this.getValue(), goal]
      });
    }

    this._value = 0;
    super.reset();
  }

}

const TreeContext = {
  current: null
};

/** An object containing `Animated` nodes */
class AnimatedObject extends Animated {
  constructor(source = null) {
    super();
    this.source = void 0;
    this.setValue(source);
  }

  getValue(animated) {
    if (!this.source) return null;
    const values = {};
    each(this.source, (source, key) => {
      if (isAnimated(source)) {
        values[key] = source.getValue(animated);
      } else {
        const config = getFluidConfig(source);

        if (config) {
          values[key] = config.get();
        } else if (!animated) {
          values[key] = source;
        }
      }
    });
    return values;
  }
  /** Replace the raw object data */


  setValue(source) {
    this.source = source;
    this.payload = this._makePayload(source);
  }

  reset() {
    if (this.payload) {
      each(this.payload, node => node.reset());
    }
  }
  /** Create a payload set. */


  _makePayload(source) {
    if (source) {
      const payload = new Set();
      each(source, this._addToPayload, payload);
      return Array.from(payload);
    }
  }
  /** Add to a payload set. */


  _addToPayload(source) {
    const config = getFluidConfig(source);

    if (config && TreeContext.current) {
      TreeContext.current.dependencies.add(source);
    }

    const payload = getPayload(source);

    if (payload) {
      each(payload, node => this.add(node));
    }
  }

}

/** An array of animated nodes */
class AnimatedArray extends AnimatedObject {
  constructor(from, to) {
    super(null);
    this.source = void 0;
    super.setValue(this._makeAnimated(from, to));
  }

  static create(from, to) {
    return new AnimatedArray(from, to);
  }

  getValue() {
    return this.source.map(node => node.getValue());
  }

  setValue(newValue) {
    const payload = this.getPayload(); // Reuse the payload when lengths are equal.

    if (newValue && newValue.length == payload.length) {
      each(payload, (node, i) => node.setValue(newValue[i]));
    } else {
      // Remake the payload when length changes.
      this.source = this._makeAnimated(newValue);
      this.payload = this._makePayload(this.source);
    }
  }
  /** Convert the `from` and `to` values to an array of `Animated` nodes */


  _makeAnimated(from, to = from) {
    return from ? from.map((from, i) => (isAnimatedString(from) ? AnimatedString : AnimatedValue).create(from, to[i])) : [];
  }

}

class AnimatedProps extends AnimatedObject {
  /** Equals true when an update is scheduled for "end of frame" */
  constructor(update) {
    super(null);
    this.update = update;
    this.dirty = false;
  }

  setValue(props, context) {
    if (!props) return; // The constructor passes null.

    if (context) {
      TreeContext.current = context;

      if (props.style) {
        const {
          createAnimatedStyle
        } = context.host;
        props = _extends(_extends({}, props), {}, {
          style: createAnimatedStyle(props.style)
        });
      }
    }

    super.setValue(props);
    TreeContext.current = null;
  }
  /** @internal */


  onParentChange({
    type
  }) {
    if (!this.dirty && type === 'change') {
      this.dirty = true;
      frameLoop.onFrame(() => {
        this.dirty = false;
        this.update();
      });
    }
  }

}

const withAnimated = (Component, host) => react.forwardRef((rawProps, ref) => {
  const instanceRef = react.useRef(null);
  const hasInstance = // Function components must use "forwardRef" to avoid being
  // re-rendered on every animation frame.
  !is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
  const forceUpdate = useForceUpdate();
  const props = new AnimatedProps(() => {
    const instance = instanceRef.current;

    if (hasInstance && !instance) {
      return; // The wrapped component forgot to forward its ref.
    }

    const didUpdate = instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false; // Re-render the component when native updates fail.

    if (didUpdate === false) {
      forceUpdate();
    }
  });
  const dependencies = new Set();
  props.setValue(rawProps, {
    dependencies,
    host
  });
  useLayoutEffect(() => {
    each(dependencies, dep => dep.addChild(props));
    return () => each(dependencies, dep => dep.removeChild(props));
  });
  return /*#__PURE__*/react.createElement(Component, _extends({}, host.getComponentProps(props.getValue()), {
    ref: hasInstance && (value => {
      instanceRef.current = updateRef(ref, value);
    })
  }));
});

function updateRef(ref, value) {
  if (ref) {
    if (is.fun(ref)) ref(value);else ref.current = value;
  }

  return value;
}

// For storing the animated version on the original component
const cacheKey = Symbol.for('AnimatedComponent');
const createHost = (components, {
  applyAnimatedValues = () => false,
  createAnimatedStyle = style => new AnimatedObject(style),
  getComponentProps = props => props
} = {}) => {
  const hostConfig = {
    applyAnimatedValues,
    createAnimatedStyle,
    getComponentProps
  };

  const animated = Component => {
    const displayName = getDisplayName(Component) || 'Anonymous';

    if (is.str(Component)) {
      Component = withAnimated(Component, hostConfig);
    } else {
      Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
    }

    Component.displayName = "Animated(" + displayName + ")";
    return Component;
  };

  each(components, (Component, key) => {
    if (!is.str(key)) {
      key = getDisplayName(Component);
    }

    animated[key] = animated(Component);
  });
  return {
    animated
  };
};

const getDisplayName = arg => is.str(arg) ? arg : arg && is.str(arg.displayName) ? arg.displayName : is.fun(arg) && arg.name || null;

function areInputsEqual(newInputs, lastInputs) {
  if (newInputs.length !== lastInputs.length) {
    return false;
  }

  for (var i = 0; i < newInputs.length; i++) {
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }

  return true;
}

function useMemoOne(getResult, inputs) {
  var initial = react.useState(function () {
    return {
      inputs: inputs,
      result: getResult()
    };
  })[0];
  var isFirstRun = react.useRef(true);
  var committed = react.useRef(initial);
  var useCache = isFirstRun.current || Boolean(inputs && committed.current.inputs && areInputsEqual(inputs, committed.current.inputs));
  var cache = useCache ? committed.current : {
    inputs: inputs,
    result: getResult()
  };
  react.useEffect(function () {
    isFirstRun.current = false;
    committed.current = cache;
  }, [cache]);
  return cache.result;
}

var prefix = 'react-spring: ';
var flagInterpolate = false;
function deprecateInterpolate() {
    if (!flagInterpolate) {
        flagInterpolate = true;
        console.warn(prefix +
            'The "interpolate" function is deprecated in v10 (use "to" instead)');
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

// const INTEGER = '[-+]?\\d+';
var NUMBER = '[-+]?\\d*\\.?\\d+';
var PERCENTAGE = NUMBER + '%';
function call() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i] = arguments[_i];
    }
    return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
}
var rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
var rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
var hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
var hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
var hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
var hex6 = /^#([0-9a-fA-F]{6})$/;
var hex8 = /^#([0-9a-fA-F]{8})$/;

/*
https://github.com/react-community/normalize-css-color

BSD 3-Clause License

Copyright (c) 2016, React Community
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function normalizeColor(color) {
    var match;
    if (typeof color === 'number') {
        return color >>> 0 === color && color >= 0 && color <= 0xffffffff
            ? color
            : null;
    }
    // Ordered based on occurrences on Facebook codebase
    if ((match = hex6.exec(color)))
        return parseInt(match[1] + 'ff', 16) >>> 0;
    if (colorNames && colorNames[color] !== undefined) {
        return colorNames[color];
    }
    if ((match = rgb.exec(color))) {
        return (((parse255(match[1]) << 24) | // r
            (parse255(match[2]) << 16) | // g
            (parse255(match[3]) << 8) | // b
            0x000000ff) >>> // a
            0);
    }
    if ((match = rgba.exec(color))) {
        return (((parse255(match[1]) << 24) | // r
            (parse255(match[2]) << 16) | // g
            (parse255(match[3]) << 8) | // b
            parse1(match[4])) >>> // a
            0);
    }
    if ((match = hex3.exec(color))) {
        return (parseInt(match[1] +
            match[1] + // r
            match[2] +
            match[2] + // g
            match[3] +
            match[3] + // b
            'ff', // a
        16) >>> 0);
    }
    // https://drafts.csswg.org/css-color-4/#hex-notation
    if ((match = hex8.exec(color)))
        return parseInt(match[1], 16) >>> 0;
    if ((match = hex4.exec(color))) {
        return (parseInt(match[1] +
            match[1] + // r
            match[2] +
            match[2] + // g
            match[3] +
            match[3] + // b
            match[4] +
            match[4], // a
        16) >>> 0);
    }
    if ((match = hsl.exec(color))) {
        return ((hslToRgb(parse360(match[1]), // h
        parsePercentage(match[2]), // s
        parsePercentage(match[3]) // l
        ) |
            0x000000ff) >>> // a
            0);
    }
    if ((match = hsla.exec(color))) {
        return ((hslToRgb(parse360(match[1]), // h
        parsePercentage(match[2]), // s
        parsePercentage(match[3]) // l
        ) |
            parse1(match[4])) >>> // a
            0);
    }
    return null;
}
function hue2rgb(h, c, x) {
    if (h < 60)
        return [c, x, 0];
    if (h < 120)
        return [x, c, 0];
    if (h < 180)
        return [0, c, x];
    if (h < 240)
        return [0, x, c];
    if (h < 300)
        return [x, 0, c];
    return [c, 0, x];
}
function hslToRgb(h, s, l) {
    var C = (1 - Math.abs(2 * l - 1)) * s;
    var X = C * (1 - Math.abs(((h / 60) % 2) - 1));
    var M = l - C / 2;
    var _a = hue2rgb(h, C, X), R1 = _a[0], G1 = _a[1], B1 = _a[2];
    return ((Math.round((R1 + M) * 255) << 24) |
        (Math.round((G1 + M) * 255) << 16) |
        (Math.round((B1 + M) * 255) << 8));
}
function parse255(str) {
    var int = parseInt(str, 10);
    if (int < 0)
        return 0;
    if (int > 255)
        return 255;
    return int;
}
function parse360(str) {
    var int = parseFloat(str);
    return (((int % 360) + 360) % 360) / 360;
}
function parse1(str) {
    var num = parseFloat(str);
    if (num < 0)
        return 0;
    if (num > 1)
        return 255;
    return Math.round(num * 255);
}
function parsePercentage(str) {
    // parseFloat conveniently ignores the final %
    var int = parseFloat(str);
    if (int < 0)
        return 0;
    if (int > 100)
        return 1;
    return int / 100;
}

function colorToRgba(input) {
    var int32Color = normalizeColor(input);
    if (int32Color === null)
        return input;
    int32Color = int32Color || 0;
    var r = (int32Color & 0xff000000) >>> 24;
    var g = (int32Color & 0x00ff0000) >>> 16;
    var b = (int32Color & 0x0000ff00) >>> 8;
    var a = (int32Color & 0x000000ff) / 255;
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

// Problem: https://github.com/animatedjs/animated/pull/102
// Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662
var numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
// Covers rgb, rgba, hsl, hsla
// Taken from https://gist.github.com/olmokramer/82ccce673f86db7cda5e
var colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
// Covers color names (transparent, blue, etc.)
var colorNamesRegex;
// rgba requires that the r,g,b are integers.... so we want to round them,
// but we *dont* want to round the opacity (4th column).
var rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
var rgbaRound = function (_, p1, p2, p3, p4) {
    return "rgba(" + Math.round(p1) + ", " + Math.round(p2) + ", " + Math.round(p3) + ", " + p4 + ")";
};
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *     "rgba(123, 42, 99, 0.36)"           // colors
 *     "-45deg"                            // values with units
 *     "0 2px 2px 0px rgba(0, 0, 0, 0.12)" // CSS box-shadows
 *     "rotate(0deg) translate(2px, 3px)"  // CSS transforms
 */
var createStringInterpolator$1 = function (config) {
    if (!colorNamesRegex)
        colorNamesRegex = colorNames
            ? new RegExp("(" + Object.keys(colorNames).join('|') + ")", 'g')
            : /^\b$/; // never match
    // Convert colors to rgba(...)
    var output = config.output.map(function (value) {
        return getFluidValue(value)
            .replace(colorRegex, colorToRgba)
            .replace(colorNamesRegex, colorToRgba);
    });
    // Convert ["1px 2px", "0px 0px"] into [[1, 2], [0, 0]]
    var keyframes = output.map(function (value) { return value.match(numberRegex).map(Number); });
    // Convert ["1px 2px", "0px 0px"] into [[1, 0], [2, 0]]
    var outputRanges = keyframes[0].map(function (_, i) {
        return keyframes.map(function (values) {
            if (!(i in values)) {
                throw Error('The arity of each "output" value must be equal');
            }
            return values[i];
        });
    });
    // Create an interpolator for each animated number
    var interpolators = outputRanges.map(function (output) {
        return createInterpolator(__assign(__assign({}, config), { output: output }));
    });
    // Use the first `output` as a template for each call
    return function (input) {
        var i = 0;
        return output[0]
            .replace(numberRegex, function () { return String(interpolators[i++](input)); })
            .replace(rgbaRegex, rgbaRound);
    };
};

// The `mass` prop defaults to 1
const config = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
};

const linear = t => t;

const defaults = _extends(_extends({}, config.default), {}, {
  mass: 1,
  damping: 1,
  easing: linear,
  clamp: false
});

class AnimationConfig {
  /**
   * With higher tension, the spring will resist bouncing and try harder to stop at its end value.
   *
   * When tension is zero, no animation occurs.
   */

  /**
   * The damping ratio coefficient, or just the damping ratio when `speed` is defined.
   *
   * When `speed` is defined, this value should be between 0 and 1.
   *
   * Higher friction means the spring will slow down faster.
   */

  /**
   * The natural frequency (in seconds), which dictates the number of bounces
   * per second when no damping exists.
   *
   * When defined, `tension` is derived from this, and `friction` is derived
   * from `tension` and `damping`.
   */

  /**
   * The damping ratio, which dictates how the spring slows down.
   *
   * Set to `0` to never slow down. Set to `1` to slow down without bouncing.
   * Between `0` and `1` is for you to explore.
   *
   * Only works when `frequency` is defined.
   *
   * Defaults to 1
   */

  /**
   * Higher mass means more friction is required to slow down.
   *
   * Defaults to 1, which works fine most of the time.
   */

  /**
   * The initial velocity of one or more values.
   */

  /**
   * The smallest velocity before the animation is considered "not moving".
   *
   * When undefined, `precision` is used instead.
   */

  /**
   * The smallest distance from a value before that distance is essentially zero.
   *
   * This helps in deciding when a spring is "at rest". The spring must be within
   * this distance from its final value, and its velocity must be lower than this
   * value too (unless `restVelocity` is defined).
   */

  /**
   * For `duration` animations only. Note: The `duration` is not affected
   * by this property.
   *
   * Defaults to `0`, which means "start from the beginning".
   *
   * Setting to `1+` makes an immediate animation.
   *
   * Setting to `0.5` means "start from the middle of the easing function".
   *
   * Any number `>= 0` and `<= 1` makes sense here.
   */

  /**
   * Animation length in number of milliseconds.
   */

  /**
   * The animation curve. Only used when `duration` is defined.
   *
   * Defaults to quadratic ease-in-out.
   */

  /**
   * Avoid overshooting by ending abruptly at the goal value.
   */

  /**
   * When above zero, the spring will bounce instead of overshooting when
   * exceeding its goal value. Its velocity is multiplied by `-1 + bounce`
   * whenever its current value equals or exceeds its goal. For example,
   * setting `bounce` to `0.5` chops the velocity in half on each bounce,
   * in addition to any friction.
   */

  /**
   * "Decay animations" decelerate without an explicit goal value.
   * Useful for scrolling animations.
   *
   * Use `true` for the default exponential decay factor (`0.998`).
   *
   * When a `number` between `0` and `1` is given, a lower number makes the
   * animation slow down faster. And setting to `1` would make an unending
   * animation.
   */

  /**
   * While animating, round to the nearest multiple of this number.
   * The `from` and `to` values are never rounded, as well as any value
   * passed to the `set` method of an animated value.
   */
  constructor() {
    this.tension = void 0;
    this.friction = void 0;
    this.frequency = void 0;
    this.damping = void 0;
    this.mass = void 0;
    this.velocity = 0;
    this.restVelocity = void 0;
    this.precision = void 0;
    this.progress = void 0;
    this.duration = void 0;
    this.easing = void 0;
    this.clamp = void 0;
    this.bounce = void 0;
    this.decay = void 0;
    this.round = void 0;
    Object.assign(this, defaults);
  }

}
function mergeConfig(config, newConfig, defaultConfig) {
  if (defaultConfig) {
    defaultConfig = _extends({}, defaultConfig);
    sanitizeConfig(defaultConfig, newConfig);
    newConfig = _extends(_extends({}, defaultConfig), newConfig);
  }

  sanitizeConfig(config, newConfig);
  Object.assign(config, newConfig);

  for (const key in defaults) {
    if (config[key] == null) {
      config[key] = defaults[key];
    }
  }

  let {
    mass,
    frequency,
    damping
  } = config;

  if (!is.und(frequency)) {
    if (frequency < 0.01) frequency = 0.01;
    if (damping < 0) damping = 0;
    config.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
    config.friction = 4 * Math.PI * damping * mass / frequency;
  }

  return config;
} // Prevent a config from accidentally overriding new props.
// This depends on which "config" props take precedence when defined.

function sanitizeConfig(config, props) {
  if (!is.und(props.decay)) {
    config.duration = undefined;
  } else {
    const isTensionConfig = !is.und(props.tension) || !is.und(props.friction);

    if (isTensionConfig || !is.und(props.frequency) || !is.und(props.damping) || !is.und(props.mass)) {
      config.duration = undefined;
      config.decay = undefined;
    }

    if (isTensionConfig) {
      config.frequency = undefined;
    }
  }
}

const emptyArray = [];
/** @internal */

/** An animation being executed by the frameloop */
class Animation {
  constructor() {
    this.changed = false;
    this.values = emptyArray;
    this.toValues = null;
    this.fromValues = emptyArray;
    this.to = void 0;
    this.from = void 0;
    this.config = new AnimationConfig();
    this.immediate = false;
    this.onStart = void 0;
    this.onChange = void 0;
    this.onRest = [];
  }

}

// @see https://github.com/alexreardon/use-memo-one/pull/10
const useMemo = (create, deps) => useMemoOne(create, deps || [{}]);
function callProp(value, ...args) {
  return is.fun(value) ? value(...args) : value;
}
/** Try to coerce the given value into a boolean using the given key */

const matchProp = (value, key) => value === true || !!(key && value && (is.fun(value) ? value(key) : toArray(value).includes(key)));
const getProps = (props, i, arg) => props && (is.fun(props) ? props(i, arg) : is.arr(props) ? props[i] : _extends({}, props));
/** Returns `true` if the given prop is having its default value set. */

const hasDefaultProp = (props, key) => !is.und(getDefaultProp(props, key));
/** Get the default value being set for the given `key` */

const getDefaultProp = (props, key) => props.default === true ? props[key] : props.default ? props.default[key] : undefined;
/**
 * Extract the default props from an update.
 *
 * When the `default` prop is falsy, this function still behaves as if
 * `default: true` was used. The `default` prop is always respected when
 * truthy.
 */

const getDefaultProps = (props, omitKeys = [], defaults = {}) => {
  let keys = DEFAULT_PROPS;

  if (props.default && props.default !== true) {
    props = props.default;
    keys = Object.keys(props);
  }

  for (const key of keys) {
    const value = props[key];

    if (!is.und(value) && !omitKeys.includes(key)) {
      defaults[key] = value;
    }
  }

  return defaults;
};
/** Merge the default props of an update into a props cache. */

const mergeDefaultProps = (defaults, props, omitKeys) => getDefaultProps(props, omitKeys, defaults);
/** These props can have default values */

const DEFAULT_PROPS = ['pause', 'cancel', 'config', 'immediate', 'onDelayEnd', 'onProps', 'onStart', 'onChange', 'onRest'];
const RESERVED_PROPS = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onDelayEnd: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onRest: 1,
  // Transition props
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  // Internal props
  keys: 1,
  callId: 1,
  parentId: 1
};
/**
 * Extract any properties whose keys are *not* reserved for customizing your
 * animations. All hooks use this function, which means `useTransition` props
 * are reserved for `useSpring` calls, etc.
 */

function getForwardProps(props) {
  const forward = {};
  let count = 0;
  each(props, (value, prop) => {
    if (!RESERVED_PROPS[prop]) {
      forward[prop] = value;
      count++;
    }
  });

  if (count) {
    return forward;
  }
}
/**
 * Clone the given `props` and move all non-reserved props
 * into the `to` prop.
 */


function inferTo(props) {
  const to = getForwardProps(props);

  if (to) {
    const out = {
      to
    };
    each(props, (val, key) => key in to || (out[key] = val));
    return out;
  }

  return _extends({}, props);
} // Compute the goal value, converting "red" to "rgba(255, 0, 0, 1)" in the process

function computeGoal(value) {
  const config = getFluidConfig(value);
  return config ? computeGoal(config.get()) : is.arr(value) ? value.map(computeGoal) : isAnimatedString(value) ? createStringInterpolator({
    range: [0, 1],
    output: [value, value]
  })(1) : value;
}

/**
 * This function sets a timeout if both the `delay` prop exists and
 * the `cancel` prop is not `true`.
 *
 * The `actions.start` function must handle the `cancel` prop itself,
 * but the `pause` prop is taken care of.
 */
function scheduleProps(callId, {
  key,
  props,
  state,
  actions
}) {
  return new Promise((resolve, reject) => {
    let delay;
    let timeout;
    let pause = false;
    let cancel = matchProp(props.cancel, key);

    if (cancel) {
      onStart();
    } else {
      delay = callProp(props.delay || 0, key);
      pause = matchProp(props.pause, key);

      if (pause) {
        state.resumeQueue.add(onResume);
        actions.pause();
      } else {
        actions.resume();
        onResume();
      }
    }

    function onPause() {
      state.resumeQueue.add(onResume);
      timeout.cancel(); // Cache the remaining delay.

      delay = timeout.time - now();
    }

    function onResume() {
      if (delay > 0) {
        state.pauseQueue.add(onPause);
        timeout = frameLoop.setTimeout(onStart, delay);
      } else {
        onStart();
      }
    }

    function onStart() {
      state.pauseQueue.delete(onPause); // Maybe cancelled during its delay.

      if (callId <= (state.cancelId || 0)) {
        cancel = true;
      }

      try {
        actions.start(_extends(_extends({}, props), {}, {
          callId,
          delay,
          cancel,
          pause
        }), resolve);
      } catch (err) {
        reject(err);
      }
    }
  });
}

/** @internal */

/** The object given to the `onRest` prop and `start` promise. */

/** The promised result of an animation. */

/** @internal */
const getCombinedResult = (target, results) => results.length == 1 ? results[0] : results.some(result => result.cancelled) ? getCancelledResult(target) : results.every(result => result.noop) ? getNoopResult(target) : getFinishedResult(target, results.every(result => result.finished));
/** No-op results are for updates that never start an animation. */

const getNoopResult = (target, value = target.get()) => ({
  value,
  noop: true,
  finished: true,
  target
});
const getFinishedResult = (target, finished, value = target.get()) => ({
  value,
  finished,
  target
});
const getCancelledResult = (target, value = target.get()) => ({
  value,
  cancelled: true,
  target
});

/**
 * Start an async chain or an async script.
 *
 * Always call `runAsync` in the action callback of a `scheduleProps` call.
 *
 * The `T` parameter can be a set of animated values (as an object type)
 * or a primitive type for a single animated value.
 */
async function runAsync(to, props, state, target) {
  if (props.pause) {
    await new Promise(resume => {
      state.resumeQueue.add(resume);
    });
  }

  const {
    callId,
    parentId,
    onRest
  } = props;
  const {
    asyncTo: prevTo,
    promise: prevPromise
  } = state;

  if (!parentId && to === prevTo && !props.reset) {
    return prevPromise;
  }

  return state.promise = (async () => {
    state.asyncId = callId;
    state.asyncTo = to; // The default props of any `animate` calls.

    const defaultProps = getDefaultProps(props, [// The `onRest` prop is only called when the `runAsync` promise is resolved.
    'onRest']);
    let preventBail;
    let bail; // This promise is rejected when the animation is interrupted.

    const bailPromise = new Promise((resolve, reject) => (preventBail = resolve, bail = reject)); // Stop animating when an error is caught.

    const withBailHandler = fn => (...args) => {
      const onError = err => {
        if (err instanceof BailSignal) {
          bail(err); // Stop animating.
        }

        throw err;
      };

      try {
        return fn(...args).catch(onError);
      } catch (err) {
        onError(err);
      }
    };

    const bailIfEnded = bailSignal => {
      const bailResult = // The `cancel` prop or `stop` method was used.
      callId <= (state.cancelId || 0) && getCancelledResult(target) || // The async `to` prop was replaced.
      callId !== state.asyncId && getFinishedResult(target, false);

      if (bailResult) {
        bailSignal.result = bailResult;
        throw bailSignal;
      }
    }; // Note: This function cannot use the `async` keyword, because we want the
    // `throw` statements to interrupt the caller.


    const animate = withBailHandler((arg1, arg2) => {
      const bailSignal = new BailSignal();
      bailIfEnded(bailSignal);
      const props = is.obj(arg1) ? _extends({}, arg1) : _extends(_extends({}, arg2), {}, {
        to: arg1
      });
      props.parentId = callId;
      each(defaultProps, (value, key) => {
        if (is.und(props[key])) {
          props[key] = value;
        }
      });
      return target.start(props).then(async result => {
        bailIfEnded(bailSignal);

        if (target.is('PAUSED')) {
          await new Promise(resume => {
            state.resumeQueue.add(resume);
          });
        }

        return result;
      });
    });
    let result;

    try {
      let animating; // Async sequence

      if (is.arr(to)) {
        animating = (async queue => {
          for (const props of queue) {
            await animate(props);
          }
        })(to);
      } // Async script
      else if (is.fun(to)) {
          animating = Promise.resolve(to(animate, target.stop.bind(target)));
        }

      await Promise.all([animating.then(preventBail), bailPromise]);
      result = getFinishedResult(target, true); // Bail handling
    } catch (err) {
      if (err instanceof BailSignal) {
        result = err.result;
      } else {
        throw err;
      } // Reset the async state.

    } finally {
      if (callId == state.asyncId) {
        state.asyncId = parentId;
        state.asyncTo = parentId ? prevTo : undefined;
        state.promise = parentId ? prevPromise : undefined;
      }
    }

    if (is.fun(onRest)) {
      batchedUpdates(() => {
        onRest(result);
      });
    }

    return result;
  })();
}
function cancelAsync(state, callId) {
  state.cancelId = callId;
  state.asyncId = state.asyncTo = state.promise = undefined;
}
/** This error is thrown to signal an interrupted async animation. */

class BailSignal extends Error {
  constructor() {
    super('An async animation has been interrupted. You see this error because you ' + 'forgot to use `await` or `.catch(...)` on its returned promise.');
    this.result = void 0;
  }

}

const isFrameValue = value => value instanceof FrameValue;
let nextId = 1;
/**
 * A kind of `FluidValue` that manages an `AnimatedValue` node.
 *
 * Its underlying value can be accessed and even observed.
 */

class FrameValue extends FluidValue {
  constructor(...args) {
    super(...args);
    this.id = nextId++;
    this.key = void 0;
    this._priority = 0;
    this._children = new Set();
  }

  get priority() {
    return this._priority;
  }

  set priority(priority) {
    if (this._priority != priority) {
      this._priority = priority;

      this._onPriorityChange(priority);
    }
  }
  /** Get the current value */


  get() {
    const node = getAnimated(this);
    return node && node.getValue();
  }
  /** Create a spring that maps our value to another value */


  to(...args) {
    return to(this, args);
  }
  /** @deprecated Use the `to` method instead. */


  interpolate(...args) {
    deprecateInterpolate();
    return to(this, args);
  }
  /** @internal */


  /** @internal */
  addChild(child) {
    if (!this._children.size) this._attach();

    this._children.add(child);
  }
  /** @internal */


  removeChild(child) {
    this._children.delete(child);

    if (!this._children.size) this._detach();
  }
  /** @internal */


  onParentChange({
    type
  }) {
    if (this.idle) {
      // Start animating when a parent does.
      if (type == 'start') {
        this._reset();

        this._start();
      }
    } // Reset our animation state when a parent does, but only when
    // our animation is active.
    else if (type == 'reset') {
        this._reset();
      }
  }
  /** Called when the first child is added. */


  _attach() {}
  /** Called when the last child is removed. */


  _detach() {}
  /**
   * Reset our animation state (eg: start values, velocity, etc)
   * and tell our children to do the same.
   *
   * This is called when our goal value is changed during (or before)
   * an animation.
   */


  _reset() {
    this._emit({
      type: 'reset',
      parent: this
    });
  }
  /**
   * Start animating if possible.
   *
   * Note: Be sure to call `_reset` first, or the animation will break.
   * This method would like to call `_reset` for you, but that would
   * interfere with paused animations.
   */


  _start() {
    this._emit({
      type: 'start',
      parent: this
    });
  }
  /** Tell our children about our new value */


  _onChange(value, idle = false) {
    this._emit({
      type: 'change',
      parent: this,
      value,
      idle
    });
  }
  /** Tell our children about our new priority */


  _onPriorityChange(priority) {
    if (!this.idle) {
      // Make the frameloop aware of our new priority.
      frameLoop.start(this);
    }

    this._emit({
      type: 'priority',
      parent: this,
      priority
    });
  }

  _emit(event) {
    // Clone "_children" so it can be safely mutated inside the loop.
    each(Array.from(this._children), child => {
      child.onParentChange(event);
    });
  }

}

// TODO: use "const enum" when Babel supports it

/** The spring has not animated yet */
const CREATED = 'CREATED';
/** The spring has animated before */

const IDLE = 'IDLE';
/** The spring is animating */

const ACTIVE = 'ACTIVE';
/** The spring is frozen in time */

const PAUSED = 'PAUSED';
/** The spring cannot be animated */

const DISPOSED = 'DISPOSED';

/**
 * Only numbers, strings, and arrays of numbers/strings are supported.
 * Non-animatable strings are also supported.
 */
class SpringValue extends FrameValue {
  /** The property name used when `to` or `from` is an object. Useful when debugging too. */

  /** The animation state */

  /** The queue of pending props */

  /** The lifecycle phase of this spring */

  /** The state for `runAsync` calls */

  /** Some props have customizable default values */

  /** The counter for tracking `scheduleProps` calls */

  /** The last `scheduleProps` call that changed the `to` prop */
  constructor(arg1, arg2) {
    super();
    this.key = void 0;
    this.animation = new Animation();
    this.queue = void 0;
    this._phase = CREATED;
    this._state = {
      pauseQueue: new Set(),
      resumeQueue: new Set()
    };
    this._defaultProps = {};
    this._lastCallId = 0;
    this._lastToId = 0;

    if (!is.und(arg1) || !is.und(arg2)) {
      const props = is.obj(arg1) ? _extends({}, arg1) : _extends(_extends({}, arg2), {}, {
        from: arg1
      });
      props.default = true;
      this.start(props);
    }
  }

  get idle() {
    return !this.is(ACTIVE) && !this._state.asyncTo;
  }

  get goal() {
    return getFluidValue(this.animation.to);
  }

  get velocity() {
    const node = getAnimated(this);
    return node instanceof AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map(node => node.lastVelocity || 0);
  }
  /** Advance the current animation by a number of milliseconds */


  advance(dt) {
    let idle = true;
    let changed = false;
    const anim = this.animation;
    let {
      config,
      toValues
    } = anim;
    const payload = getPayload(anim.to);

    if (!payload) {
      const toConfig = getFluidConfig(anim.to);

      if (toConfig) {
        toValues = toArray(toConfig.get());
      }
    }

    anim.values.forEach((node, i) => {
      if (node.done) return; // The "anim.toValues" array must exist when no parent exists.

      let to = payload ? payload[i].lastPosition : toValues[i];
      let finished = anim.immediate;
      let position = to;

      if (!finished) {
        position = node.lastPosition; // Loose springs never move.

        if (config.tension <= 0) {
          node.done = true;
          return;
        }

        const elapsed = node.elapsedTime += dt;
        const from = anim.fromValues[i];
        const v0 = node.v0 != null ? node.v0 : node.v0 = is.arr(config.velocity) ? config.velocity[i] : config.velocity;
        let velocity; // Duration easing

        if (!is.und(config.duration)) {
          let p = config.progress || 0;
          if (config.duration <= 0) p = 1;else p += (1 - p) * Math.min(1, elapsed / config.duration);
          position = from + config.easing(p) * (to - from);
          velocity = (position - node.lastPosition) / dt;
          finished = p == 1;
        } // Decay easing
        else if (config.decay) {
            const decay = config.decay === true ? 0.998 : config.decay;
            const e = Math.exp(-(1 - decay) * elapsed);
            position = from + v0 / (1 - decay) * (1 - e);
            finished = Math.abs(node.lastPosition - position) < 0.1; // derivative of position

            velocity = v0 * e;
          } // Spring easing
          else {
              velocity = node.lastVelocity == null ? v0 : node.lastVelocity;
              /** The smallest distance from a value before being treated like said value. */

              const precision = config.precision || (from == to ? 0.005 : Math.min(1, Math.abs(to - from) * 0.001));
              /** The velocity at which movement is essentially none */

              const restVelocity = config.restVelocity || precision / 10; // Bouncing is opt-in (not to be confused with overshooting)

              const bounceFactor = config.clamp ? 0 : config.bounce;
              const canBounce = !is.und(bounceFactor);
              /** When `true`, the value is increasing over time */

              const isGrowing = from == to ? node.v0 > 0 : from < to;
              /** When `true`, the velocity is considered moving */

              let isMoving;
              /** When `true`, the velocity is being deflected or clamped */

              let isBouncing = false;
              const step = 1; // 1ms

              const numSteps = Math.ceil(dt / step);

              for (let n = 0; n < numSteps; ++n) {
                isMoving = Math.abs(velocity) > restVelocity;

                if (!isMoving) {
                  finished = Math.abs(to - position) <= precision;

                  if (finished) {
                    break;
                  }
                }

                if (canBounce) {
                  isBouncing = position == to || position > to == isGrowing; // Invert the velocity with a magnitude, or clamp it.

                  if (isBouncing) {
                    velocity = -velocity * bounceFactor;
                    position = to;
                  }
                }

                const springForce = -config.tension * 0.000001 * (position - to);
                const dampingForce = -config.friction * 0.001 * velocity;
                const acceleration = (springForce + dampingForce) / config.mass; // pt/ms^2

                velocity = velocity + acceleration * step; // pt/ms

                position = position + velocity * step;
              }
            }

        node.lastVelocity = velocity;

        if (Number.isNaN(position)) {
          console.warn("Got NaN while animating:", this);
          finished = true;
        }
      } // Parent springs must finish before their children can.


      if (payload && !payload[i].done) {
        finished = false;
      }

      if (finished) {
        node.done = true;
      } else {
        idle = false;
      }

      if (node.setValue(position, config.round)) {
        changed = true;
      }
    });

    if (idle) {
      this.finish();
    } else if (changed) {
      this._onChange(this.get());
    }

    return idle;
  }
  /** Check the current phase */


  is(phase) {
    return this._phase == phase;
  }
  /** Set the current value, while stopping the current animation */


  set(value) {
    batchedUpdates(() => {
      this._focus(value);

      if (this._set(value)) {
        // Ensure change observers are notified. When active,
        // the "_stop" method handles this.
        if (!this.is(ACTIVE)) {
          return this._onChange(this.get(), true);
        }
      }

      this._stop();
    });
    return this;
  }
  /**
   * Freeze the active animation in time.
   * This does nothing when not animating.
   */


  pause() {
    checkDisposed(this, 'pause');

    if (!this.is(PAUSED)) {
      this._phase = PAUSED;
      flush(this._state.pauseQueue, onPause => onPause());
    }
  }
  /** Resume the animation if paused. */


  resume() {
    checkDisposed(this, 'resume');

    if (this.is(PAUSED)) {
      this._start();

      flush(this._state.resumeQueue, onResume => onResume());
    }
  }
  /**
   * Skip to the end of the current animation.
   *
   * All `onRest` callbacks are passed `{finished: true}`
   */


  finish(to) {
    this.resume();

    if (this.is(ACTIVE)) {
      const anim = this.animation; // Decay animations have an implicit goal.

      if (!anim.config.decay && is.und(to)) {
        to = anim.to;
      } // Set the value if we can.


      if (!is.und(to)) {
        this._set(to);
      }

      batchedUpdates(() => {
        // Ensure the "onStart" and "onRest" props are called.
        if (!anim.changed) {
          anim.changed = true;

          if (anim.onStart) {
            anim.onStart(this);
          }
        } // Exit the frameloop.


        this._stop();
      });
    }

    return this;
  }
  /** Push props into the pending queue. */


  update(props) {
    checkDisposed(this, 'update');
    const queue = this.queue || (this.queue = []);
    queue.push(props);
    return this;
  }
  /**
   * Update this value's animation using the queue of pending props,
   * and unpause the current animation (if one is frozen).
   *
   * When arguments are passed, a new animation is created, and the
   * queued animations are left alone.
   */


  async start(to, arg2) {
    checkDisposed(this, 'start');
    let queue;

    if (!is.und(to)) {
      queue = [is.obj(to) ? to : _extends(_extends({}, arg2), {}, {
        to
      })];
    } else {
      queue = this.queue || [];
      this.queue = [];
    }

    const results = await Promise.all(queue.map(props => this._update(props)));
    return getCombinedResult(this, results);
  }
  /**
   * Stop the current animation, and cancel any delayed updates.
   *
   * Pass `true` to call `onRest` with `cancelled: true`.
   */


  stop(cancel) {
    if (!this.is(DISPOSED)) {
      cancelAsync(this._state, this._lastCallId); // Ensure the `to` value equals the current value.

      this._focus(this.get()); // Exit the frameloop and notify `onRest` listeners.


      batchedUpdates(() => this._stop(cancel));
    }

    return this;
  }
  /** Restart the animation. */


  reset() {
    this._update({
      reset: true
    });
  }
  /** Prevent future animations, and stop the current animation */


  dispose() {
    if (!this.is(DISPOSED)) {
      if (this.animation) {
        // Prevent "onRest" calls when disposed.
        this.animation.onRest = [];
      }

      this.stop();
      this._phase = DISPOSED;
    }
  }
  /** @internal */


  onParentChange(event) {
    super.onParentChange(event);

    if (event.type == 'change') {
      if (!this.is(ACTIVE)) {
        this._reset();

        if (!this.is(PAUSED)) {
          this._start();
        }
      }
    } else if (event.type == 'priority') {
      this.priority = event.priority + 1;
    }
  }
  /**
   * Parse the `to` and `from` range from the given `props` object.
   *
   * This also ensures the initial value is available to animated components
   * during the render phase.
   */


  _prepareNode({
    to,
    from,
    reverse
  }) {
    const key = this.key || '';
    to = !is.obj(to) || getFluidConfig(to) ? to : to[key];
    from = !is.obj(from) || getFluidConfig(from) ? from : from[key]; // Create the range now to avoid "reverse" logic.

    const range = {
      to,
      from
    }; // Before ever animating, this method ensures an `Animated` node
    // exists and keeps its value in sync with the "from" prop.

    if (this.is(CREATED)) {
      if (reverse) [to, from] = [from, to];
      from = getFluidValue(from);

      const node = this._updateNode(is.und(from) ? getFluidValue(to) : from);

      if (node && !is.und(from)) {
        node.setValue(from);
      }
    }

    return range;
  }
  /**
   * Create an `Animated` node if none exists or the given value has an
   * incompatible type. Do nothing if `value` is undefined.
   *
   * The newest `Animated` node is returned.
   */


  _updateNode(value) {
    let node = getAnimated(this);

    if (!is.und(value)) {
      const nodeType = this._getNodeType(value);

      if (!node || node.constructor !== nodeType) {
        setAnimated(this, node = nodeType.create(value));
      }
    }

    return node;
  }
  /** Return the `Animated` node constructor for a given value */


  _getNodeType(value) {
    const parentNode = getAnimated(value);
    return parentNode ? parentNode.constructor : is.arr(value) ? AnimatedArray : isAnimatedString(value) ? AnimatedString : AnimatedValue;
  }
  /** Schedule an animation to run after an optional delay */


  _update(props, isLoop) {
    const defaultProps = this._defaultProps;

    const mergeDefaultProp = key => {
      const value = getDefaultProp(props, key);

      if (!is.und(value)) {
        defaultProps[key] = value;
      } // For `cancel` and `pause`, a truthy default always wins.


      if (defaultProps[key]) {
        props[key] = defaultProps[key];
      }
    }; // These props are coerced into booleans by the `scheduleProps` function,
    // so they need their default values processed before then.


    mergeDefaultProp('cancel');
    mergeDefaultProp('pause'); // Ensure the initial value can be accessed by animated components.

    const range = this._prepareNode(props);

    return scheduleProps(++this._lastCallId, {
      key: this.key,
      props,
      state: this._state,
      actions: {
        pause: this.pause.bind(this),
        resume: this.resume.bind(this),
        start: this._merge.bind(this, range)
      }
    }).then(result => {
      if (props.loop && result.finished && !(isLoop && result.noop)) {
        const nextProps = createLoopUpdate(props);

        if (nextProps) {
          return this._update(nextProps, true);
        }
      }

      return result;
    });
  }
  /** Merge props into the current animation */


  _merge(range, props, resolve) {
    // The "cancel" prop cancels all pending delays and it forces the
    // active animation to stop where it is.
    if (props.cancel) {
      this.stop(true);
      return resolve(getCancelledResult(this));
    }

    const {
      key,
      animation: anim
    } = this;
    const defaultProps = this._defaultProps;
    /** The "to" prop is defined. */

    const hasToProp = !is.und(range.to);
    /** The "from" prop is defined. */

    const hasFromProp = !is.und(range.from); // Avoid merging other props if implicitly prevented, except
    // when both the "to" and "from" props are undefined.

    if (hasToProp || hasFromProp) {
      if (props.callId > this._lastToId) {
        this._lastToId = props.callId;
      } else {
        return resolve(getCancelledResult(this));
      }
    }
    /** Get the value of a prop, or its default value */


    const get = prop => !is.und(props[prop]) ? props[prop] : defaultProps[prop]; // Call "onDelayEnd" before merging props, but after cancellation checks.


    const onDelayEnd = coerceEventProp(get('onDelayEnd'), key);

    if (onDelayEnd) {
      onDelayEnd(props, this);
    }

    if (props.default) {
      mergeDefaultProps(defaultProps, props, ['pause', 'cancel']);
    }

    const {
      to: prevTo,
      from: prevFrom
    } = anim;
    let {
      to = prevTo,
      from = prevFrom
    } = range; // Focus the "from" value if changing without a "to" value.

    if (hasFromProp && !hasToProp) {
      to = from;
    } // Flip the current range if "reverse" is true.


    if (props.reverse) [to, from] = [from, to];
    /** The "from" value is changing. */

    const hasFromChanged = !isEqual(from, prevFrom);

    if (hasFromChanged) {
      anim.from = from;
    }
    /** The "to" value is changing. */


    const hasToChanged = !isEqual(to, prevTo);

    if (hasToChanged) {
      this._focus(to);
    } // Both "from" and "to" can use a fluid config (thanks to http://npmjs.org/fluids).


    const toConfig = getFluidConfig(to);
    const fromConfig = getFluidConfig(from);

    if (fromConfig) {
      from = fromConfig.get();
    }
    /** The "to" prop is async. */


    const hasAsyncTo = is.arr(props.to) || is.fun(props.to);
    const {
      config
    } = anim;
    const {
      decay,
      velocity
    } = config; // The "runAsync" function treats the "config" prop as a default,
    // so we must avoid merging it when the "to" prop is async.

    if (props.config && !hasAsyncTo) {
      mergeConfig(config, callProp(props.config, key), // Avoid calling the same "config" prop twice.
      props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
    } // This instance might not have its Animated node yet. For example,
    // the constructor can be given props without a "to" or "from" value.


    let node = getAnimated(this);

    if (!node || is.und(to)) {
      return resolve(getFinishedResult(this, true));
    }
    /** When true, start at the "from" value. */


    const reset = // When `reset` is undefined, the `from` prop implies `reset: true`,
    // except for declarative updates. When `reset` is defined, there
    // must exist a value to animate from.
    is.und(props.reset) ? hasFromProp && !props.default : !is.und(from) && matchProp(props.reset, key); // The current value, where the animation starts from.

    const value = reset ? from : this.get(); // The animation ends at this value, unless "to" is fluid.

    const goal = computeGoal(to); // Only specific types can be animated to/from.

    const isAnimatable = is.num(goal) || is.arr(goal) || isAnimatedString(goal); // When true, the value changes instantly on the next frame.

    const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));

    if (hasToChanged) {
      if (immediate) {
        node = this._updateNode(goal);
      } else {
        const nodeType = this._getNodeType(to);

        if (nodeType !== node.constructor) {
          throw Error("Cannot animate between " + node.constructor.name + " and " + nodeType.name + ", as the \"to\" prop suggests");
        }
      }
    } // The type of Animated node for the goal value.


    const goalType = node.constructor; // When the goal value is fluid, we don't know if its value
    // will change before the next animation frame, so it always
    // starts the animation to be safe.

    let started = !!toConfig;
    let finished = false;

    if (!started) {
      // When true, the current value has probably changed.
      const hasValueChanged = reset || this.is(CREATED) && hasFromChanged; // When the "to" value or current value are changed,
      // start animating if not already finished.

      if (hasToChanged || hasValueChanged) {
        finished = isEqual(computeGoal(value), goal);
        started = !finished;
      } // Changing "decay" or "velocity" starts the animation.


      if (!isEqual(config.decay, decay) || !isEqual(config.velocity, velocity)) {
        started = true;
      }
    } // When an active animation changes its goal to its current value:


    if (finished && this.is(ACTIVE)) {
      // Avoid an abrupt stop unless the animation is being reset.
      if (anim.changed && !reset) {
        started = true;
      } // Stop the animation before its first frame.
      else if (!started) {
          this._stop();
        }
    }

    if (!hasAsyncTo) {
      // Make sure our "toValues" are updated even if our previous
      // "to" prop is a fluid value whose current value is also ours.
      if (started || getFluidConfig(prevTo)) {
        anim.values = node.getPayload();
        anim.toValues = toConfig ? null : goalType == AnimatedString ? [1] : toArray(goal);
      }

      anim.immediate = immediate;
      anim.onStart = coerceEventProp(get('onStart'), key);
      anim.onChange = coerceEventProp(get('onChange'), key); // The "reset" prop tries to reuse the old "onRest" prop,
      // unless you defined a new "onRest" prop.

      const onRestQueue = anim.onRest;
      const onRest = reset && !props.onRest ? onRestQueue[0] || noop : checkFinishedOnRest(coerceEventProp(get('onRest'), key), this); // In most cases, the animation after this one won't reuse our
      // "onRest" prop. Instead, the _default_ "onRest" prop is used
      // when the next animation has an undefined "onRest" prop.

      if (started) {
        anim.onRest = [onRest, checkFinishedOnRest(resolve, this)]; // Flush the "onRest" queue for the previous animation.

        let onRestIndex = reset ? 0 : 1;

        if (onRestIndex < onRestQueue.length) {
          batchedUpdates(() => {
            for (; onRestIndex < onRestQueue.length; onRestIndex++) {
              onRestQueue[onRestIndex]();
            }
          });
        }
      } // The "onRest" prop is always first, and it can be updated even
      // if a new animation is not started by this update.
      else if (reset || props.onRest) {
          anim.onRest[0] = onRest;
        }
    } // By this point, every prop has been merged.


    const onProps = coerceEventProp(get('onProps'), key);

    if (onProps) {
      onProps(props, this);
    } // Update our node even if the animation is idle.


    if (reset) {
      node.setValue(value);
    }

    if (hasAsyncTo) {
      resolve(runAsync(props.to, props, this._state, this));
    } // Start an animation
    else if (started) {
        // Must be idle for "onStart" to be called again.
        if (reset) this._phase = IDLE;

        this._reset();

        this._start();
      } // Postpone promise resolution until the animation is finished,
      // so that no-op updates still resolve at the expected time.
      else if (this.is(ACTIVE) && !hasToChanged) {
          anim.onRest.push(checkFinishedOnRest(resolve, this));
        } // Resolve our promise immediately.
        else {
            resolve(getNoopResult(this, value));
          }
  }
  /** Update the `animation.to` value, which might be a `FluidValue` */


  _focus(value) {
    const anim = this.animation;

    if (value !== anim.to) {
      let config = getFluidConfig(anim.to);

      if (config) {
        config.removeChild(this);
      }

      anim.to = value;
      let priority = 0;

      if (config = getFluidConfig(value)) {
        config.addChild(this);

        if (isFrameValue(value)) {
          priority = (value.priority || 0) + 1;
        }
      }

      this.priority = priority;
    }
  }
  /** Set the current value and our `node` if necessary. The `_onChange` method is *not* called. */


  _set(value) {
    const config = getFluidConfig(value);

    if (config) {
      value = config.get();
    }

    const node = getAnimated(this);
    const oldValue = node && node.getValue();

    if (node) {
      node.setValue(value);
    } else {
      this._updateNode(value);
    }

    return !isEqual(value, oldValue);
  }

  _onChange(value, idle = false) {
    const anim = this.animation; // The "onStart" prop is called on the first change after entering the
    // frameloop, but never for immediate animations.

    if (!anim.changed && !idle) {
      anim.changed = true;

      if (anim.onStart) {
        anim.onStart(this);
      }
    }

    if (anim.onChange) {
      anim.onChange(value, this);
    }

    super._onChange(value, idle);
  }

  _reset() {
    const anim = this.animation; // Reset the state of each Animated node.

    getAnimated(this).reset(anim.to); // Ensure the `onStart` prop will be called.

    if (!this.is(ACTIVE)) {
      anim.changed = false;
    } // Use the current values as the from values.


    if (!anim.immediate) {
      anim.fromValues = anim.values.map(node => node.lastPosition);
    }

    super._reset();
  }

  _start() {
    if (!this.is(ACTIVE)) {
      this._phase = ACTIVE;

      super._start(); // The "skipAnimation" global avoids the frameloop.


      if (skipAnimation) {
        this.finish();
      } else {
        frameLoop.start(this);
      }
    }
  }
  /**
   * Exit the frameloop and notify `onRest` listeners.
   *
   * Always wrap `_stop` calls with `batchedUpdates`.
   */


  _stop(cancel) {
    this.resume();

    if (this.is(ACTIVE)) {
      this._phase = IDLE; // Always let change observers know when a spring becomes idle.

      this._onChange(this.get(), true);

      const anim = this.animation;
      each(anim.values, node => {
        node.done = true;
      });
      const onRestQueue = anim.onRest;

      if (onRestQueue.length) {
        // Preserve the "onRest" prop when the goal is dynamic.
        anim.onRest = [anim.toValues ? noop : onRestQueue[0]]; // Never call the "onRest" prop for no-op animations.

        if (!anim.changed) {
          onRestQueue[0] = noop;
        }

        each(onRestQueue, onRest => onRest(cancel));
      }
    }
  }

}

function checkDisposed(spring, name) {
  if (spring.is(DISPOSED)) {
    throw Error("Cannot call \"" + name + "\" of disposed \"" + spring.constructor.name + "\" object");
  }
}
/** Coerce an event prop to an event handler */


function coerceEventProp(prop, key) {
  return is.fun(prop) ? prop : key && prop ? prop[key] : undefined;
}
/**
 * The "finished" value is determined by each "onRest" handler,
 * based on whether the current value equals the goal value that
 * was calculated at the time the "onRest" handler was set.
 */


const checkFinishedOnRest = (onRest, spring) => {
  const {
    to
  } = spring.animation;
  return onRest ? cancel => {
    if (cancel) {
      onRest(getCancelledResult(spring));
    } else {
      const goal = computeGoal(to);
      const value = computeGoal(spring.get());
      const finished = isEqual(value, goal);
      onRest(getFinishedResult(spring, finished));
    }
  } : noop;
};

function createLoopUpdate(props, loop = props.loop, to = props.to) {
  let loopRet = callProp(loop);

  if (loopRet) {
    const overrides = loopRet !== true && inferTo(loopRet);
    const reverse = (overrides || props).reverse;
    const reset = !overrides || overrides.reset;
    return createUpdate(_extends(_extends({}, props), {}, {
      loop,
      // Avoid updating default props when looping.
      default: false,
      // For the "reverse" prop to loop as expected, the "to" prop
      // must be undefined. The "reverse" prop is ignored when the
      // "to" prop is an array or function.
      to: !reverse || is.arr(to) || is.fun(to) ? to : undefined,
      // Avoid defining the "from" prop if a reset is unwanted.
      from: reset ? props.from : undefined,
      reset
    }, overrides));
  }
}
/**
 * Return a new object based on the given `props`.
 *
 * - All unreserved props are moved into the `to` prop object.
 * - The `to` and `from` props are deleted when falsy.
 * - The `keys` prop is set to an array of affected keys,
 *   or `null` if all keys are affected.
 */

function createUpdate(props) {
  const {
    to,
    from
  } = props = inferTo(props); // Collect the keys affected by this update.

  const keys = new Set();

  if (from) {
    findDefined(from, keys);
  } else {
    // Falsy values are deleted to avoid merging issues.
    delete props.from;
  }

  if (is.obj(to)) {
    findDefined(to, keys);
  } else if (!to) {
    // Falsy values are deleted to avoid merging issues.
    delete props.to;
  } // The "keys" prop helps in applying updates to affected keys only.


  props.keys = keys.size ? Array.from(keys) : null;
  return props;
}
/**
 * A modified version of `createUpdate` meant for declarative APIs.
 */

function declareUpdate(props) {
  const update = createUpdate(props);

  if (is.und(update.default)) {
    update.default = getDefaultProps(update, [// Avoid forcing `immediate: true` onto imperative updates.
    update.immediate === true && 'immediate']);
  }

  return update;
}
/** Find keys with defined values */

function findDefined(values, keys) {
  each(values, (value, key) => value != null && keys.add(key));
}

/** Events batched by the `Controller` class */
const BATCHED_EVENTS = ['onStart', 'onChange', 'onRest'];
let nextId$1 = 1;
/** Queue of pending updates for a `Controller` instance. */

class Controller {
  /** The animated values */

  /** The queue of props passed to the `update` method. */

  /** Custom handler for flushing update queues */

  /** These props are used by all future spring values */

  /** The combined phase of our spring values */

  /** The counter for tracking `scheduleProps` calls */

  /** The values currently being animated */

  /** State used by the `runAsync` function */

  /** The event queues that are flushed once per frame maximum */
  constructor(props, flush) {
    this.id = nextId$1++;
    this.springs = {};
    this.queue = [];
    this._flush = void 0;
    this._initialProps = void 0;
    this._phase = CREATED;
    this._lastAsyncId = 0;
    this._active = new Set();
    this._state = {
      pauseQueue: new Set(),
      resumeQueue: new Set()
    };
    this._events = {
      onStart: new Set(),
      onChange: new Set(),
      onRest: new Map()
    };
    this._onFrame = this._onFrame.bind(this);

    if (flush) {
      this._flush = flush;
    }

    if (props) {
      this.start(props);
    }
  }
  /**
   * Equals `true` when no spring values are in the frameloop, and
   * no async animation is currently active.
   */


  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every(spring => spring.idle);
  }
  /** Check the current phase */


  is(phase) {
    return this._phase == phase;
  }
  /** Get the current values of our springs */


  get() {
    const values = {};
    this.each((spring, key) => values[key] = spring.get());
    return values;
  }
  /** Push an update onto the queue of each value. */


  update(props) {
    if (props) this.queue.push(createUpdate(props));
    return this;
  }
  /**
   * Start the queued animations for every spring, and resolve the returned
   * promise once all queued animations have finished or been cancelled.
   *
   * When you pass a queue (instead of nothing), that queue is used instead of
   * the queued animations added with the `update` method, which are left alone.
   */


  start(props) {
    const queue = props ? toArray(props).map(createUpdate) : this.queue;

    if (!props) {
      this.queue = [];
    }

    if (this._flush) {
      return this._flush(this, queue);
    }

    prepareKeys(this, queue);
    return flushUpdateQueue(this, queue);
  }
  /** Stop one animation, some animations, or all animations */


  stop(keys) {
    if (is.und(keys)) {
      this.each(spring => spring.stop());
      cancelAsync(this._state, this._lastAsyncId);
    } else {
      const springs = this.springs;
      each(toArray(keys), key => springs[key].stop());
    }

    return this;
  }
  /** Freeze the active animation in time */


  pause(keys) {
    if (is.und(keys)) {
      this.each(spring => spring.pause());
    } else {
      const springs = this.springs;
      each(toArray(keys), key => springs[key].pause());
    }

    return this;
  }
  /** Resume the animation if paused. */


  resume(keys) {
    if (is.und(keys)) {
      this.each(spring => spring.resume());
    } else {
      const springs = this.springs;
      each(toArray(keys), key => springs[key].resume());
    }

    return this;
  }
  /** Restart every animation. */


  reset() {
    this.each(spring => spring.reset()); // TODO: restart async "to" prop

    return this;
  }
  /** Call a function once per spring value */


  each(iterator) {
    each(this.springs, iterator);
  }
  /** Destroy every spring in this controller */


  dispose() {
    this._state.asyncTo = undefined;
    this.each(spring => spring.dispose());
    this.springs = {};
  }
  /** @internal Called at the end of every animation frame */


  _onFrame() {
    const {
      onStart,
      onChange,
      onRest
    } = this._events;
    const isActive = this._active.size > 0;

    if (isActive && this._phase != ACTIVE) {
      this._phase = ACTIVE;
      flush(onStart, onStart => onStart(this));
    }

    const values = (onChange.size || !isActive && onRest.size) && this.get();
    flush(onChange, onChange => onChange(values)); // The "onRest" queue is only flushed when all springs are idle.

    if (!isActive) {
      this._phase = IDLE;
      flush(onRest, ([onRest, result]) => {
        result.value = values;
        onRest(result);
      });
    }
  }
  /** @internal */


  onParentChange(event) {
    if (event.type == 'change') {
      this._active[event.idle ? 'delete' : 'add'](event.parent);

      frameLoop.onFrame(this._onFrame);
    }
  }

}
/**
 * Warning: Props might be mutated.
 */

function flushUpdateQueue(ctrl, queue) {
  return Promise.all(queue.map(props => flushUpdate(ctrl, props))).then(results => getCombinedResult(ctrl, results));
}
/**
 * Warning: Props might be mutated.
 *
 * Process a single set of props using the given controller.
 *
 * The returned promise resolves to `true` once the update is
 * applied and any animations it starts are finished without being
 * stopped or cancelled.
 */

function flushUpdate(ctrl, props, isLoop) {
  const {
    to,
    loop,
    onRest
  } = props; // Looping must be handled in this function, or else the values
  // would end up looping out-of-sync in many common cases.

  if (loop) {
    props.loop = false;
  }

  const asyncTo = is.arr(to) || is.fun(to) ? to : undefined;

  if (asyncTo) {
    props.to = undefined;
    props.onRest = undefined;
  } else {
    // For certain events, use batching to prevent multiple calls per frame.
    // However, batching is avoided when the `to` prop is async, because any
    // event props are used as default props instead.
    each(BATCHED_EVENTS, key => {
      const handler = props[key];

      if (is.fun(handler)) {
        const queue = ctrl['_events'][key];

        if (queue instanceof Set) {
          props[key] = () => queue.add(handler);
        } else {
          props[key] = ({
            finished,
            cancelled
          }) => {
            const result = queue.get(handler);

            if (result) {
              if (!finished) result.finished = false;
              if (cancelled) result.cancelled = true;
            } else {
              // The "value" is set before the "handler" is called.
              queue.set(handler, {
                value: null,
                finished,
                cancelled
              });
            }
          };
        }
      }
    });
  }

  const keys = props.keys || Object.keys(ctrl.springs);
  const promises = keys.map(key => ctrl.springs[key].start(props)); // Schedule the "asyncTo" if defined.

  const state = ctrl['_state'];

  if (asyncTo) {
    promises.push(scheduleProps(++ctrl['_lastAsyncId'], {
      props,
      state,
      actions: {
        pause: noop,
        resume: noop,

        start(props, resolve) {
          props.onRest = onRest;

          if (!props.cancel) {
            resolve(runAsync(asyncTo, props, state, ctrl));
          } // Prevent `cancel: true` from ending the current `runAsync` call,
          // except when the default `cancel` prop is being set.
          else if (hasDefaultProp(props, 'cancel')) {
              cancelAsync(state, props.callId);
            }
        }

      }
    }));
  } // Respect the `cancel` prop when no keys are affected.
  else if (!props.keys && props.cancel === true) {
      cancelAsync(state, ctrl['_lastAsyncId']);
    }

  return Promise.all(promises).then(results => {
    const result = getCombinedResult(ctrl, results);

    if (loop && result.finished && !(isLoop && result.noop)) {
      const nextProps = createLoopUpdate(props, loop, to);

      if (nextProps) {
        prepareKeys(ctrl, [nextProps]);
        return flushUpdate(ctrl, nextProps, true);
      }
    }

    return result;
  });
}
/**
 * From an array of updates, get the map of `SpringValue` objects
 * by their keys. Springs are created when any update wants to
 * animate a new key.
 *
 * Springs created by `getSprings` are neither cached nor observed
 * until they're given to `setSprings`.
 */

function getSprings(ctrl, props) {
  const springs = _extends({}, ctrl.springs);

  if (props) {
    each(toArray(props), props => {
      if (is.und(props.keys)) {
        props = createUpdate(props);
      }

      if (!is.obj(props.to)) {
        // Avoid passing array/function to each spring.
        props = _extends(_extends({}, props), {}, {
          to: undefined
        });
      }

      prepareSprings(springs, props, key => {
        return createSpring(key);
      });
    });
  }

  return springs;
}
/**
 * Tell a controller to manage the given `SpringValue` objects
 * whose key is not already in use.
 */

function setSprings(ctrl, springs) {
  each(springs, (spring, key) => {
    if (!ctrl.springs[key]) {
      ctrl.springs[key] = spring;
      spring.addChild(ctrl);
    }
  });
}

function createSpring(key, observer) {
  const spring = new SpringValue();
  spring.key = key;

  if (observer) {
    spring.addChild(observer);
  }

  return spring;
}
/**
 * Ensure spring objects exist for each defined key.
 *
 * Using the `props`, the `Animated` node of each `SpringValue` may
 * be created or updated.
 */


function prepareSprings(springs, props, create) {
  if (props.keys) {
    each(props.keys, key => {
      const spring = springs[key] || (springs[key] = create(key));
      spring['_prepareNode'](props);
    });
  }
}
/**
 * Ensure spring objects exist for each defined key, and attach the
 * `ctrl` to them for observation.
 *
 * The queue is expected to contain `createUpdate` results.
 */


function prepareKeys(ctrl, queue) {
  each(queue, props => {
    prepareSprings(ctrl.springs, props, key => {
      return createSpring(key, ctrl);
    });
  });
}

/**
 * This context affects all new and existing `SpringValue` objects
 * created with the hook API or the renderprops API.
 */

const ctx = react.createContext({});
ctx.Provider;
ctx.Consumer;
/** Get the current values of nearest `SpringContext` component. */

const useSpringContext = () => react.useContext(ctx);

/** Create an imperative API for manipulating an array of `Controller` objects. */
const SpringHandle = {
  create: getControllers => ({
    get controllers() {
      return getControllers();
    },

    update(props) {
      each(getControllers(), (ctrl, i) => {
        ctrl.update(getProps(props, i, ctrl));
      });
      return this;
    },

    async start(props) {
      const results = await Promise.all(getControllers().map((ctrl, i) => {
        const update = getProps(props, i, ctrl);
        return ctrl.start(update);
      }));
      return {
        value: results.map(result => result.value),
        finished: results.every(result => result.finished)
      };
    },

    stop: keys => each(getControllers(), ctrl => ctrl.stop(keys)),
    pause: keys => each(getControllers(), ctrl => ctrl.pause(keys)),
    resume: keys => each(getControllers(), ctrl => ctrl.resume(keys))
  })
};

/** @internal */
function useSprings(length, props, deps) {
  const propsFn = is.fun(props) && props;
  if (propsFn && !deps) deps = [];
  // Set to 0 to prevent sync flush.
  const layoutId = react.useRef(0);
  const forceUpdate = useForceUpdate(); // State is updated on commit.

  const [state] = react.useState(() => ({
    ctrls: [],
    queue: [],

    flush(ctrl, updates) {
      const springs = getSprings(ctrl, updates); // Flushing is postponed until the component's commit phase
      // if a spring was created since the last commit.

      const canFlushSync = layoutId.current > 0 && !state.queue.length && !Object.keys(springs).some(key => !ctrl.springs[key]);
      return canFlushSync ? flushUpdateQueue(ctrl, updates) : new Promise(resolve => {
        setSprings(ctrl, springs);
        state.queue.push(() => {
          resolve(flushUpdateQueue(ctrl, updates));
        });
        forceUpdate();
      });
    }

  })); // The imperative API ref from the props of the first controller.

  const refProp = react.useRef();
  const ctrls = [...state.ctrls];
  const updates = []; // Cache old controllers to dispose in the commit phase.

  const prevLength = usePrev(length) || 0;
  const disposed = ctrls.slice(length, prevLength); // Create new controllers when "length" increases, and destroy
  // the affected controllers when "length" decreases.

  useMemo(() => {
    ctrls.length = length;
    declareUpdates(prevLength, length);
  }, [length]); // Update existing controllers when "deps" are changed.

  useMemo(() => {
    declareUpdates(0, Math.min(prevLength, length));
  }, deps);
  /** Fill the `updates` array with declarative updates for the given index range. */

  function declareUpdates(startIndex, endIndex) {
    for (let i = startIndex; i < endIndex; i++) {
      const ctrl = ctrls[i] || (ctrls[i] = new Controller(null, state.flush));
      let update = propsFn ? propsFn(i, ctrl) : props[i];

      if (update) {
        update = updates[i] = declareUpdate(update);

        if (i == 0) {
          refProp.current = update.ref;
          update.ref = undefined;
        }
      }
    }
  }

  const api = react.useMemo(() => {
    return SpringHandle.create(() => state.ctrls);
  }, []); // New springs are created during render so users can pass them to
  // their animated components, but new springs aren't cached until the
  // commit phase (see the `useLayoutEffect` callback below).

  const springs = ctrls.map((ctrl, i) => getSprings(ctrl, updates[i]));
  const context = useSpringContext();
  useLayoutEffect(() => {
    layoutId.current++; // Replace the cached controllers.

    state.ctrls = ctrls; // Update the ref prop.

    if (refProp.current) {
      refProp.current.current = api;
    } // Flush the commit queue.


    const {
      queue
    } = state;

    if (queue.length) {
      state.queue = [];
      each(queue, cb => cb());
    } // Dispose unused controllers.


    each(disposed, ctrl => ctrl.dispose()); // Update existing controllers.

    each(ctrls, (ctrl, i) => {
      const values = springs[i];
      setSprings(ctrl, values); // Update the default props.

      ctrl.start({
        default: context
      }); // Apply updates created during render.

      const update = updates[i];

      if (update) {
        // Start animating unless a ref exists.
        if (refProp.current) {
          ctrl.queue.push(update);
        } else {
          ctrl.start(update);
        }
      }
    });
  }); // Dispose all controllers on unmount.

  useOnce(() => () => {
    each(state.ctrls, ctrl => ctrl.dispose());
  }); // Return a deep copy of the `springs` array so the caller can
  // safely mutate it during render.

  const values = springs.map(x => _extends({}, x));
  return propsFn || arguments.length == 3 ? [values, api.start, api.stop] : values;
}

/**
 * The props that `useSpring` recognizes.
 */

/** @internal */
function useSpring(props, deps) {
  const isFn = is.fun(props);
  const [[values], update, stop] = useSprings(1, isFn ? props : [props], isFn ? deps || [] : deps);
  return isFn || arguments.length == 2 ? [values, update, stop] : values;
}

// TODO: convert to "const enum" once Babel supports it

/** This transition is being mounted */
const MOUNT = 'mount';
/** This transition is entering or has entered */

const ENTER = 'enter';
/** This transition had its animations updated */

const UPDATE = 'update';
/** This transition will expire after animating */

const LEAVE = 'leave';

function useTransition(data, props, deps) {
  const {
    ref,
    reset,
    sort,
    trail = 0,
    expires = true
  } = props; // Every item has its own transition.

  const items = toArray(data);
  const transitions = []; // Keys help with reusing transitions between renders.
  // The `key` prop can be undefined (which means the items themselves are used
  // as keys), or a function (which maps each item to its key), or an array of
  // keys (which are assigned to each item by index).

  const keys = getKeys(items, props); // The "onRest" callbacks need a ref to the latest transitions.

  const usedTransitions = react.useRef(null);
  const prevTransitions = reset ? null : usedTransitions.current;
  useLayoutEffect(() => {
    usedTransitions.current = transitions;
  }); // Destroy all transitions on dismount.

  useOnce(() => () => each(usedTransitions.current, t => {
    if (t.expired) {
      clearTimeout(t.expirationId);
    }

    t.ctrl.dispose();
  })); // Map old indices to new indices.

  const reused = [];
  if (prevTransitions) each(prevTransitions, (t, i) => {
    // Expired transitions are not rendered.
    if (t.expired) {
      clearTimeout(t.expirationId);
    } else {
      i = reused[i] = keys.indexOf(t.key);
      if (~i) transitions[i] = t;
    }
  }); // Mount new items with fresh transitions.

  each(items, (item, i) => {
    transitions[i] || (transitions[i] = {
      key: keys[i],
      item,
      phase: MOUNT,
      ctrl: new Controller()
    });
  }); // Update the item of any transition whose key still exists,
  // and ensure leaving transitions are rendered until they finish.

  if (reused.length) {
    let i = -1;
    each(reused, (keyIndex, prevIndex) => {
      const t = prevTransitions[prevIndex];

      if (~keyIndex) {
        i = transitions.indexOf(t);
        transitions[i] = _extends(_extends({}, t), {}, {
          item: items[keyIndex]
        });
      } else if (props.leave) {
        transitions.splice(++i, 0, t);
      }
    });
  }

  if (is.fun(sort)) {
    transitions.sort((a, b) => sort(a.item, b.item));
  } // Track cumulative delay for the "trail" prop.


  let delay = -trail; // Expired transitions use this to dismount.

  const forceUpdate = useForceUpdate(); // These props are inherited by every phase change.

  const defaultProps = getDefaultProps(props); // Generate changes to apply in useEffect.

  const changes = new Map();
  each(transitions, (t, i) => {
    const key = t.key;
    const prevPhase = t.phase;
    let to;
    let phase;

    if (prevPhase == MOUNT) {
      to = props.enter;
      phase = ENTER;
    } else {
      const isLeave = keys.indexOf(key) < 0;

      if (prevPhase != LEAVE) {
        if (isLeave) {
          to = props.leave;
          phase = LEAVE;
        } else if (to = props.update) {
          phase = UPDATE;
        } else return;
      } else if (!isLeave) {
        to = props.enter;
        phase = ENTER;
      } else return;
    } // When "to" is a function, it can return (1) an array of "useSpring" props,
    // (2) an async function, or (3) an object with any "useSpring" props.


    to = callProp(to, t.item, i);
    to = is.obj(to) ? inferTo(to) : {
      to
    };

    if (!to.config) {
      const config = props.config || defaultProps.config;
      to.config = callProp(config, t.item, i);
    } // The payload is used to update the spring props once the current render is committed.


    const payload = _extends(_extends({}, defaultProps), {}, {
      delay: delay += trail,
      // This prevents implied resets.
      reset: false
    }, to);

    if (phase == ENTER && is.und(payload.from)) {
      // The `initial` prop is used on the first render of our parent component,
      // as well as when `reset: true` is passed. It overrides the `from` prop
      // when defined, and it makes `enter` instant when null.
      const from = is.und(props.initial) || prevTransitions ? props.from : props.initial;
      payload.from = callProp(from, t.item, i);
    }

    const {
      onRest
    } = payload;

    payload.onRest = result => {
      const transitions = usedTransitions.current;
      const t = transitions.find(t => t.key === key);
      if (!t) return;

      if (is.fun(onRest)) {
        onRest(result, t);
      } // Reset the phase of a cancelled enter/leave transition, so it can
      // retry the animation on the next render.


      if (result.cancelled && t.phase != UPDATE) {
        t.phase = prevPhase;
        return;
      }

      if (t.ctrl.idle) {
        const idle = transitions.every(t => t.ctrl.idle);

        if (t.phase == LEAVE) {
          const expiry = callProp(expires, t.item);

          if (expiry !== false) {
            const expiryMs = expiry === true ? 0 : expiry;
            t.expired = true; // Force update once the expiration delay ends.

            if (!idle && expiryMs > 0) {
              // The maximum timeout is 2^31-1
              if (expiryMs <= 0x7fffffff) t.expirationId = setTimeout(forceUpdate, expiryMs);
              return;
            }
          }
        } // Force update once idle and expired items exist.


        if (idle && transitions.some(t => t.expired)) {
          forceUpdate();
        }
      }
    };

    const springs = getSprings(t.ctrl, payload);
    changes.set(t, {
      phase,
      springs,
      payload
    });
  }); // The prop overrides from an ancestor.

  const context = useSpringContext(); // Merge the context into each transition.

  useLayoutEffect(() => {
    each(transitions, t => {
      t.ctrl.start({
        default: context
      });
    });
  }, [context]);
  const api = react.useMemo(() => {
    return SpringHandle.create(() => {
      return usedTransitions.current.map(t => t.ctrl);
    });
  }, []);
  react.useImperativeHandle(ref, () => api);
  useLayoutEffect(() => {
    each(changes, ({
      phase,
      springs,
      payload
    }, t) => {
      setSprings(t.ctrl, springs);

      if (!context.cancel) {
        t.phase = phase;

        if (phase == ENTER) {
          t.ctrl.start({
            default: context
          });
        }

        t.ctrl[ref ? 'update' : 'start'](payload);
      }
    });
  }, reset ? void 0 : deps);

  const renderTransitions = render => /*#__PURE__*/react.createElement(react.Fragment, null, transitions.map((t, i) => {
    const {
      springs
    } = changes.get(t) || t.ctrl;
    const elem = render(_extends({}, springs), t.item, t, i);
    return elem && elem.type ? /*#__PURE__*/react.createElement(elem.type, _extends({}, elem.props, {
      key: is.str(t.key) || is.num(t.key) ? t.key : t.ctrl.id,
      ref: elem.ref
    })) : elem;
  }));

  return arguments.length == 3 ? [renderTransitions, api.start, api.stop] : renderTransitions;
}

function getKeys(items, {
  key,
  keys = key
}) {
  return is.und(keys) ? items : is.fun(keys) ? items.map(keys) : toArray(keys);
}

/**
 * An `Interpolation` is a memoized value that's computed whenever one of its
 * `FluidValue` dependencies has its value changed.
 *
 * Other `FrameValue` objects can depend on this. For example, passing an
 * `Interpolation` as the `to` prop of a `useSpring` call will trigger an
 * animation toward the memoized value.
 */

class Interpolation extends FrameValue {
  /** Useful for debugging. */

  /** Equals false when in the frameloop */

  /** The function that maps inputs values to output */
  constructor(source, args) {
    super();
    this.source = source;
    this.key = void 0;
    this.idle = true;
    this.calc = void 0;
    this.calc = createInterpolator(...args);

    const value = this._get();

    const nodeType = is.arr(value) ? AnimatedArray : AnimatedValue; // Assume the computed value never changes type.

    setAnimated(this, nodeType.create(value));
  }

  advance(_dt) {
    const value = this._get();

    const oldValue = this.get();

    if (!isEqual(value, oldValue)) {
      getAnimated(this).setValue(value);

      this._onChange(value, this.idle);
    }
  }

  _get() {
    const inputs = is.arr(this.source) ? this.source.map(node => node.get()) : toArray(this.source.get());
    return this.calc(...inputs);
  }

  _reset() {
    each(getPayload(this), node => node.reset());

    super._reset();
  }

  _start() {
    this.idle = false;

    super._start();

    if (skipAnimation) {
      this.idle = true;
      this.advance();
    } else {
      frameLoop.start(this);
    }
  }

  _attach() {
    // Start observing our "source" once we have an observer.
    let idle = true;
    let priority = 1;
    each(toArray(this.source), source => {
      if (isFrameValue(source)) {
        if (!source.idle) idle = false;
        priority = Math.max(priority, source.priority + 1);
      }

      source.addChild(this);
    });
    this.priority = priority;

    if (!idle) {
      this._reset();

      this._start();
    }
  }

  _detach() {
    // Stop observing our "source" once we have no observers.
    each(toArray(this.source), source => {
      source.removeChild(this);
    }); // This removes us from the frameloop.

    this.idle = true;
  }
  /** @internal */


  onParentChange(event) {
    // Ensure our start value respects our parent values, in case
    // any of their animations were restarted with the "reset" prop.
    if (event.type == 'start') {
      this.advance();
    } // Change events are useful for (1) reacting to non-animated parents
    // and (2) reacting to the last change in a parent animation.
    else if (event.type == 'change') {
        // If we're idle, we know for sure that this change is *not*
        // caused by an animation.
        if (this.idle) {
          this.advance();
        } // Leave the frameloop when all parents are done animating.
        else if (event.idle) {
            this.idle = toArray(this.source).every(source => source.idle !== false);

            if (this.idle) {
              this.advance();
              each(getPayload(this), node => {
                node.done = true;
              });
            }
          }
      } // Ensure our priority is greater than all parents, which means
      // our value won't be updated until our parents have updated.
      else if (event.type == 'priority') {
          this.priority = toArray(this.source).reduce((max, source) => Math.max(max, (source.priority || 0) + 1), 0);
        }

    super.onParentChange(event);
  }

}

/** Map the value of one or more dependencies */

const to$1 = (source, ...args) => new Interpolation(source, args);
/** Extract the raw value types that are being interpolated */

assign({
  createStringInterpolator: createStringInterpolator$1,
  to: (source, args) => new Interpolation(source, args)
});

// http://www.w3.org/TR/css3-color/#svg-color
var colors = {
    transparent: 0x00000000,
    aliceblue: 0xf0f8ffff,
    antiquewhite: 0xfaebd7ff,
    aqua: 0x00ffffff,
    aquamarine: 0x7fffd4ff,
    azure: 0xf0ffffff,
    beige: 0xf5f5dcff,
    bisque: 0xffe4c4ff,
    black: 0x000000ff,
    blanchedalmond: 0xffebcdff,
    blue: 0x0000ffff,
    blueviolet: 0x8a2be2ff,
    brown: 0xa52a2aff,
    burlywood: 0xdeb887ff,
    burntsienna: 0xea7e5dff,
    cadetblue: 0x5f9ea0ff,
    chartreuse: 0x7fff00ff,
    chocolate: 0xd2691eff,
    coral: 0xff7f50ff,
    cornflowerblue: 0x6495edff,
    cornsilk: 0xfff8dcff,
    crimson: 0xdc143cff,
    cyan: 0x00ffffff,
    darkblue: 0x00008bff,
    darkcyan: 0x008b8bff,
    darkgoldenrod: 0xb8860bff,
    darkgray: 0xa9a9a9ff,
    darkgreen: 0x006400ff,
    darkgrey: 0xa9a9a9ff,
    darkkhaki: 0xbdb76bff,
    darkmagenta: 0x8b008bff,
    darkolivegreen: 0x556b2fff,
    darkorange: 0xff8c00ff,
    darkorchid: 0x9932ccff,
    darkred: 0x8b0000ff,
    darksalmon: 0xe9967aff,
    darkseagreen: 0x8fbc8fff,
    darkslateblue: 0x483d8bff,
    darkslategray: 0x2f4f4fff,
    darkslategrey: 0x2f4f4fff,
    darkturquoise: 0x00ced1ff,
    darkviolet: 0x9400d3ff,
    deeppink: 0xff1493ff,
    deepskyblue: 0x00bfffff,
    dimgray: 0x696969ff,
    dimgrey: 0x696969ff,
    dodgerblue: 0x1e90ffff,
    firebrick: 0xb22222ff,
    floralwhite: 0xfffaf0ff,
    forestgreen: 0x228b22ff,
    fuchsia: 0xff00ffff,
    gainsboro: 0xdcdcdcff,
    ghostwhite: 0xf8f8ffff,
    gold: 0xffd700ff,
    goldenrod: 0xdaa520ff,
    gray: 0x808080ff,
    green: 0x008000ff,
    greenyellow: 0xadff2fff,
    grey: 0x808080ff,
    honeydew: 0xf0fff0ff,
    hotpink: 0xff69b4ff,
    indianred: 0xcd5c5cff,
    indigo: 0x4b0082ff,
    ivory: 0xfffff0ff,
    khaki: 0xf0e68cff,
    lavender: 0xe6e6faff,
    lavenderblush: 0xfff0f5ff,
    lawngreen: 0x7cfc00ff,
    lemonchiffon: 0xfffacdff,
    lightblue: 0xadd8e6ff,
    lightcoral: 0xf08080ff,
    lightcyan: 0xe0ffffff,
    lightgoldenrodyellow: 0xfafad2ff,
    lightgray: 0xd3d3d3ff,
    lightgreen: 0x90ee90ff,
    lightgrey: 0xd3d3d3ff,
    lightpink: 0xffb6c1ff,
    lightsalmon: 0xffa07aff,
    lightseagreen: 0x20b2aaff,
    lightskyblue: 0x87cefaff,
    lightslategray: 0x778899ff,
    lightslategrey: 0x778899ff,
    lightsteelblue: 0xb0c4deff,
    lightyellow: 0xffffe0ff,
    lime: 0x00ff00ff,
    limegreen: 0x32cd32ff,
    linen: 0xfaf0e6ff,
    magenta: 0xff00ffff,
    maroon: 0x800000ff,
    mediumaquamarine: 0x66cdaaff,
    mediumblue: 0x0000cdff,
    mediumorchid: 0xba55d3ff,
    mediumpurple: 0x9370dbff,
    mediumseagreen: 0x3cb371ff,
    mediumslateblue: 0x7b68eeff,
    mediumspringgreen: 0x00fa9aff,
    mediumturquoise: 0x48d1ccff,
    mediumvioletred: 0xc71585ff,
    midnightblue: 0x191970ff,
    mintcream: 0xf5fffaff,
    mistyrose: 0xffe4e1ff,
    moccasin: 0xffe4b5ff,
    navajowhite: 0xffdeadff,
    navy: 0x000080ff,
    oldlace: 0xfdf5e6ff,
    olive: 0x808000ff,
    olivedrab: 0x6b8e23ff,
    orange: 0xffa500ff,
    orangered: 0xff4500ff,
    orchid: 0xda70d6ff,
    palegoldenrod: 0xeee8aaff,
    palegreen: 0x98fb98ff,
    paleturquoise: 0xafeeeeff,
    palevioletred: 0xdb7093ff,
    papayawhip: 0xffefd5ff,
    peachpuff: 0xffdab9ff,
    peru: 0xcd853fff,
    pink: 0xffc0cbff,
    plum: 0xdda0ddff,
    powderblue: 0xb0e0e6ff,
    purple: 0x800080ff,
    rebeccapurple: 0x663399ff,
    red: 0xff0000ff,
    rosybrown: 0xbc8f8fff,
    royalblue: 0x4169e1ff,
    saddlebrown: 0x8b4513ff,
    salmon: 0xfa8072ff,
    sandybrown: 0xf4a460ff,
    seagreen: 0x2e8b57ff,
    seashell: 0xfff5eeff,
    sienna: 0xa0522dff,
    silver: 0xc0c0c0ff,
    skyblue: 0x87ceebff,
    slateblue: 0x6a5acdff,
    slategray: 0x708090ff,
    slategrey: 0x708090ff,
    snow: 0xfffafaff,
    springgreen: 0x00ff7fff,
    steelblue: 0x4682b4ff,
    tan: 0xd2b48cff,
    teal: 0x008080ff,
    thistle: 0xd8bfd8ff,
    tomato: 0xff6347ff,
    turquoise: 0x40e0d0ff,
    violet: 0xee82eeff,
    wheat: 0xf5deb3ff,
    white: 0xffffffff,
    whitesmoke: 0xf5f5f5ff,
    yellow: 0xffff00ff,
    yellowgreen: 0x9acd32ff,
};

const isCustomPropRE = /^--/;

function dangerousStyleValue(name, value) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (typeof value === 'number' && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers

  return ('' + value).trim();
}

const attributeCache = {};
function applyAnimatedValues(instance, props) {
  if (!instance.nodeType || !instance.setAttribute) {
    return false;
  }

  const isFilterElement = instance.nodeName === 'filter' || instance.parentNode && instance.parentNode.nodeName === 'filter';

  const _ref = props,
        {
    style,
    children,
    scrollTop,
    scrollLeft
  } = _ref,
        attributes = _objectWithoutPropertiesLoose(_ref, ["style", "children", "scrollTop", "scrollLeft"]);

  const values = Object.values(attributes);
  const names = Object.keys(attributes).map(name => isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, // Attributes are written in dash case
  n => '-' + n.toLowerCase())));
  frameLoop.onWrite(() => {
    if (children !== void 0) {
      instance.textContent = children;
    } // Apply CSS styles


    for (let name in style) {
      if (style.hasOwnProperty(name)) {
        const value = dangerousStyleValue(name, style[name]);
        if (name === 'float') name = 'cssFloat';else if (isCustomPropRE.test(name)) {
          instance.style.setProperty(name, value);
        } else {
          instance.style[name] = value;
        }
      }
    } // Apply DOM attributes


    names.forEach((name, i) => {
      instance.setAttribute(name, values[i]);
    });

    if (scrollTop !== void 0) {
      instance.scrollTop = scrollTop;
    }

    if (scrollLeft !== void 0) {
      instance.scrollLeft = scrollLeft;
    }
  });
}
let isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

const prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);

const prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach(prefix => acc[prefixKey(prefix, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);

/** The transform-functions
 * (https://developer.mozilla.org/fr/docs/Web/CSS/transform-function)
 * that you can pass as keys to your animated component style and that will be
 * animated. Perspective has been left out as it would conflict with the
 * non-transform perspective style.
 */

const domTransforms = /^(matrix|translate|scale|rotate|skew)/; // These keys have "px" units by default

const pxTransforms = /^(translate)/; // These keys have "deg" units by default

const degTransforms = /^(rotate|skew)/;

/** Add a unit to the value when the value is unit-less (eg: a number) */
const addUnit = (value, unit) => is.num(value) && value !== 0 ? value + unit : value;
/**
 * Checks if the input value matches the identity value.
 *
 *     isValueIdentity(0, 0)              // => true
 *     isValueIdentity('0px', 0)          // => true
 *     isValueIdentity([0, '0px', 0], 0)  // => true
 */


const isValueIdentity = (value, id) => is.arr(value) ? value.every(v => isValueIdentity(v, id)) : is.num(value) ? value === id : parseFloat(value) === id;

/**
 * This AnimatedStyle will simplify animated components transforms by
 * interpolating all transform function passed as keys in the style object
 * including shortcuts such as x, y and z for translateX/Y/Z
 */
class AnimatedStyle extends AnimatedObject {
  constructor(_ref) {
    let {
      x,
      y,
      z
    } = _ref,
        style = _objectWithoutPropertiesLoose(_ref, ["x", "y", "z"]);

    /**
     * An array of arrays that contains the values (static or fluid)
     * used by each transform function.
     */
    const inputs = [];
    /**
     * An array of functions that take a list of values (static or fluid)
     * and returns (1) a CSS transform string and (2) a boolean that's true
     * when the transform has no effect (eg: an identity transform).
     */

    const transforms = []; // Combine x/y/z into translate3d

    if (x || y || z) {
      inputs.push([x || 0, y || 0, z || 0]);
      transforms.push(xyz => ["translate3d(" + xyz.map(v => addUnit(v, 'px')).join(',') + ")", // prettier-ignore
      isValueIdentity(xyz, 0)]);
    } // Pluck any other transform-related props


    each(style, (value, key) => {
      if (key === 'transform') {
        inputs.push([value || '']);
        transforms.push(transform => [transform, transform === '']);
      } else if (domTransforms.test(key)) {
        delete style[key];
        if (is.und(value)) return;
        const unit = pxTransforms.test(key) ? 'px' : degTransforms.test(key) ? 'deg' : '';
        inputs.push(toArray(value));
        transforms.push(key === 'rotate3d' ? ([x, y, z, deg]) => ["rotate3d(" + x + "," + y + "," + z + "," + addUnit(deg, unit) + ")", isValueIdentity(deg, 0)] : input => [key + "(" + input.map(v => addUnit(v, unit)).join(',') + ")", isValueIdentity(input, key.startsWith('scale') ? 1 : 0)]);
      }
    });

    if (inputs.length) {
      style.transform = new FluidTransform(inputs, transforms);
    }

    super(style);
  }

}
/** @internal */

class FluidTransform extends FluidValue {
  constructor(inputs, transforms) {
    super();
    this.inputs = inputs;
    this.transforms = transforms;
    this._value = null;
    this._children = new Set();
  }

  get() {
    return this._value || (this._value = this._get());
  }

  _get() {
    let transform = '';
    let identity = true;
    each(this.inputs, (input, i) => {
      const arg1 = getFluidValue(input[0]);
      const [t, id] = this.transforms[i](is.arr(arg1) ? arg1 : input.map(getFluidValue));
      transform += ' ' + t;
      identity = identity && id;
    });
    return identity ? 'none' : transform;
  }

  addChild(child) {
    if (!this._children.size) {
      // Start observing our inputs once we have an observer.
      each(this.inputs, input => each(input, value => {
        const config = getFluidConfig(value);
        if (config) config.addChild(this);
      }));
    }

    this._children.add(child);
  }

  removeChild(child) {
    this._children.delete(child);

    if (!this._children.size) {
      // Stop observing our inputs once we have no observers.
      each(this.inputs, input => each(input, value => {
        const config = getFluidConfig(value);
        if (config) config.removeChild(this);
      }));
    }
  }

  onParentChange(event) {
    if (event.type == 'change') {
      this._value = null;
    }

    each(this._children, child => {
      child.onParentChange(event);
    });
  }

}

const primitives = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

assign({
  colorNames: colors,
  createStringInterpolator: createStringInterpolator$1,
  batchedUpdates: reactDom.unstable_batchedUpdates
});
const host = createHost(primitives, {
  applyAnimatedValues,
  createAnimatedStyle: style => new AnimatedStyle(style),
  getComponentProps: (_ref) => {
    let props = _objectWithoutPropertiesLoose(_ref, ["scrollTop", "scrollLeft"]);

    return props;
  }
});
const animated = host.animated;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var TOOLTIP_OFFSET = 14;
var tooltipStyle = {
  pointerEvents: 'none',
  position: 'absolute',
  zIndex: 10,
  top: 0,
  left: 0
};

var translate = function translate(x, y) {
  return "translate(".concat(x, "px, ").concat(y, "px)");
};

var TooltipWrapper = react.memo(function (_ref) {
  var _animatedProps$transf;

  var position = _ref.position,
      anchor = _ref.anchor,
      children = _ref.children;
  var theme = useTheme();

  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;

  var _useMeasure = useMeasure(),
      _useMeasure2 = _slicedToArray(_useMeasure, 2),
      measureRef = _useMeasure2[0],
      bounds = _useMeasure2[1];

  var previousPosition = react.useRef(false);
  var to = undefined;
  var immediate = false;
  var hasDimension = bounds.width > 0 && bounds.height > 0;
  var x = Math.round(position[0]);
  var y = Math.round(position[1]);

  if (hasDimension) {
    if (anchor === 'top') {
      x -= bounds.width / 2;
      y -= bounds.height + TOOLTIP_OFFSET;
    } else if (anchor === 'right') {
      x += TOOLTIP_OFFSET;
      y -= bounds.height / 2;
    } else if (anchor === 'bottom') {
      x -= bounds.width / 2;
      y += TOOLTIP_OFFSET;
    } else if (anchor === 'left') {
      x -= bounds.width + TOOLTIP_OFFSET;
      y -= bounds.height / 2;
    } else if (anchor === 'center') {
      x -= bounds.width / 2;
      y -= bounds.height / 2;
    }

    to = {
      transform: translate(x, y)
    };

    if (!previousPosition.current) {
      immediate = true;
    }

    previousPosition.current = [x, y];
  }

  var animatedProps = useSpring({
    to: to,
    config: springConfig,
    immediate: !animate || immediate
  });

  var style = _objectSpread2(_objectSpread2(_objectSpread2({}, tooltipStyle), theme.tooltip), {}, {
    transform: (_animatedProps$transf = animatedProps.transform) !== null && _animatedProps$transf !== void 0 ? _animatedProps$transf : translate(x, y)
  });

  return react.createElement(animated.div, {
    ref: measureRef,
    style: style
  }, children);
});
TooltipWrapper.displayName = 'TooltipWrapper';

var Chip = react.memo(function (_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? 12 : _ref$size,
      color = _ref.color,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;
  return react.createElement("span", {
    style: _objectSpread2({
      display: 'block',
      width: size,
      height: size,
      background: color
    }, style)
  });
});

var BasicTooltip = react.memo(function (_ref) {
  var id = _ref.id,
      _value = _ref.value,
      format = _ref.format,
      _ref$enableChip = _ref.enableChip,
      enableChip = _ref$enableChip === void 0 ? false : _ref$enableChip,
      color = _ref.color,
      renderContent = _ref.renderContent;
  var theme = useTheme();
  var formatValue = useValueFormatter(format);
  var content;

  if (typeof renderContent === 'function') {
    content = renderContent();
  } else {
    var value = _value;

    if (formatValue !== undefined && value !== undefined) {
      value = formatValue(value);
    }

    content = react.createElement("div", {
      style: theme.tooltip.basic
    }, enableChip && react.createElement(Chip, {
      color: color,
      style: theme.tooltip.chip
    }), value !== undefined ? react.createElement("span", null, id, ": ", react.createElement("strong", null, "".concat(value))) : id);
  }

  return react.createElement("div", {
    style: theme.tooltip.container
  }, content);
});

var tableStyle = {
  width: '100%',
  borderCollapse: 'collapse'
};
var TableTooltip = react.memo(function (_ref) {
  var title = _ref.title,
      _ref$rows = _ref.rows,
      rows = _ref$rows === void 0 ? [] : _ref$rows,
      renderContent = _ref.renderContent;
  var theme = useTheme();
  if (!rows.length) return null;
  var content;

  if (typeof renderContent === 'function') {
    content = renderContent();
  } else {
    content = react.createElement("div", null, title && title, react.createElement("table", {
      style: _objectSpread2(_objectSpread2({}, tableStyle), theme.tooltip.table)
    }, react.createElement("tbody", null, rows.map(function (row, i) {
      return react.createElement("tr", {
        key: i
      }, row.map(function (column, j) {
        return react.createElement("td", {
          key: j,
          style: theme.tooltip.tableCell
        }, column);
      }));
    }))));
  }

  return react.createElement("div", {
    style: theme.tooltip.container
  }, content);
});
TableTooltip.displayName = 'TableTooltip';

var CrosshairLine = react.memo(function (_ref) {
  var x0 = _ref.x0,
      x1 = _ref.x1,
      y0 = _ref.y0,
      y1 = _ref.y1;
  var theme = useTheme();

  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;

  var style = react.useMemo(function () {
    return _objectSpread2(_objectSpread2({}, theme.crosshair.line), {}, {
      pointerEvents: 'none'
    });
  }, [theme.crosshair.line]);
  var animatedProps = useSpring({
    x1: x0,
    x2: x1,
    y1: y0,
    y2: y1,
    config: springConfig,
    immediate: !animate
  });
  return react.createElement(animated.line, Object.assign({}, animatedProps, {
    fill: "none",
    style: style
  }));
});
CrosshairLine.displayName = 'CrosshairLine';

var Crosshair = react.memo(function (_ref) {
  var width = _ref.width,
      height = _ref.height,
      type = _ref.type,
      x = _ref.x,
      y = _ref.y;
  var xLine;
  var yLine;

  if (type === 'cross') {
    xLine = {
      x0: x,
      x1: x,
      y0: 0,
      y1: height
    };
    yLine = {
      x0: 0,
      x1: width,
      y0: y,
      y1: y
    };
  } else if (type === 'top-left') {
    xLine = {
      x0: x,
      x1: x,
      y0: 0,
      y1: y
    };
    yLine = {
      x0: 0,
      x1: x,
      y0: y,
      y1: y
    };
  } else if (type === 'top') {
    xLine = {
      x0: x,
      x1: x,
      y0: 0,
      y1: y
    };
  } else if (type === 'top-right') {
    xLine = {
      x0: x,
      x1: x,
      y0: 0,
      y1: y
    };
    yLine = {
      x0: x,
      x1: width,
      y0: y,
      y1: y
    };
  } else if (type === 'right') {
    yLine = {
      x0: x,
      x1: width,
      y0: y,
      y1: y
    };
  } else if (type === 'bottom-right') {
    xLine = {
      x0: x,
      x1: x,
      y0: y,
      y1: height
    };
    yLine = {
      x0: x,
      x1: width,
      y0: y,
      y1: y
    };
  } else if (type === 'bottom') {
    xLine = {
      x0: x,
      x1: x,
      y0: y,
      y1: height
    };
  } else if (type === 'bottom-left') {
    xLine = {
      x0: x,
      x1: x,
      y0: y,
      y1: height
    };
    yLine = {
      x0: 0,
      x1: x,
      y0: y,
      y1: y
    };
  } else if (type === 'left') {
    yLine = {
      x0: 0,
      x1: x,
      y0: y,
      y1: y
    };
  } else if (type === 'x') {
    xLine = {
      x0: x,
      x1: x,
      y0: 0,
      y1: height
    };
  } else if (type === 'y') {
    yLine = {
      x0: 0,
      x1: width,
      y0: y,
      y1: y
    };
  }

  return react.createElement(react.Fragment, null, xLine && react.createElement(CrosshairLine, {
    x0: xLine.x0,
    x1: xLine.x1,
    y0: xLine.y0,
    y1: xLine.y1
  }), yLine && react.createElement(CrosshairLine, {
    x0: yLine.x0,
    x1: yLine.x1,
    y0: yLine.y0,
    y1: yLine.y1
  }));
});
Crosshair.displayName = 'Crosshair';

var defaultActions = {
  showTooltipAt: function showTooltipAt() {},
  showTooltipFromEvent: function showTooltipFromEvent() {},
  hideTooltip: function hideTooltip() {}
};
var TooltipActionsContext = react.createContext(defaultActions);
var hiddenTooltipState = {
  isVisible: false,
  position: [null, null],
  content: null,
  anchor: null
};
var TooltipStateContext = react.createContext(hiddenTooltipState);

var useTooltipHandlers = function useTooltipHandlers(container) {
  var _useState = react.useState(hiddenTooltipState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var showTooltipAt = react.useCallback(function (content, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        x = _ref2[0],
        y = _ref2[1];

    var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top';
    setState({
      isVisible: true,
      position: [x, y],
      anchor: anchor,
      content: content
    });
  }, [setState]);
  var showTooltipFromEvent = react.useCallback(function (content, event) {
    var anchor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'top';
    var bounds = container.current.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;

    if (anchor === 'left' || anchor === 'right') {
      if (x < bounds.width / 2) anchor = 'right';else anchor = 'left';
    }

    setState({
      isVisible: true,
      position: [x, y],
      anchor: anchor,
      content: content
    });
  }, [container, setState]);
  var hideTooltip = react.useCallback(function () {
    setState(hiddenTooltipState);
  }, [setState]);
  var actions = react.useMemo(function () {
    return {
      showTooltipAt: showTooltipAt,
      showTooltipFromEvent: showTooltipFromEvent,
      hideTooltip: hideTooltip
    };
  }, [showTooltipAt, showTooltipFromEvent, hideTooltip]);
  return {
    actions: actions,
    state: state
  };
};
var useTooltip = function useTooltip() {
  var context = react.useContext(TooltipActionsContext);

  if (context === undefined) {
    throw new Error('useTooltip must be used within a TooltipProvider');
  }

  return context;
};
var useTooltipState = function useTooltipState() {
  var context = react.useContext(TooltipStateContext);

  if (context === undefined) {
    throw new Error('useTooltipState must be used within a TooltipProvider');
  }

  return context;
};

var isVisibleTooltipState = function isVisibleTooltipState(state) {
  return state.isVisible === true;
};
var Tooltip = function Tooltip() {
  var state = useTooltipState();

  if (!isVisibleTooltipState(state)) {
    return null;
  }

  return react.createElement(TooltipWrapper, {
    position: state.position,
    anchor: state.anchor
  }, state.content);
};

var TooltipProvider = function TooltipProvider(_ref) {
  var container = _ref.container,
      children = _ref.children;

  var _useTooltipHandlers = useTooltipHandlers(container),
      actions = _useTooltipHandlers.actions,
      state = _useTooltipHandlers.state;

  return react.createElement(TooltipActionsContext.Provider, {
    value: actions
  }, react.createElement(TooltipStateContext.Provider, {
    value: state
  }, children));
};

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq_1(object[key], value)) ||
      (value === undefined && !(key in object))) {
    _baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;
});

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject_1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var _baseCreate = baseCreate;

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !_isPrototype(object))
    ? _baseCreate(_getPrototype(object))
    : {};
}

var _initCloneObject = initCloneObject;

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

var _safeGet = safeGet;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return _copyObject(value, keysIn_1(value));
}

var toPlainObject_1 = toPlainObject;

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key),
      srcValue = _safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    _assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray_1(srcValue),
        isBuff = !isArr && isBuffer_1(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray_1(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject_1(objValue)) {
        newValue = _copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = _cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
      newValue = objValue;
      if (isArguments_1(objValue)) {
        newValue = toPlainObject_1(objValue);
      }
      else if (!isObject_1(objValue) || isFunction_1(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  _assignMergeValue(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep;

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  _baseFor(source, function(srcValue, key) {
    stack || (stack = new _Stack);
    if (isObject_1(srcValue)) {
      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(_safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      _assignMergeValue(object, key, newValue);
    }
  }, keysIn_1);
}

var _baseMerge = baseMerge;

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = _createAssigner(function(object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});

var merge_1 = merge;

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
 * it's created. Arrays are created for missing index properties while objects
 * are created for all other missing properties. Use `_.setWith` to customize
 * `path` creation.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.set(object, 'a[0].b.c', 4);
 * console.log(object.a[0].b.c);
 * // => 4
 *
 * _.set(object, ['x', '0', 'y', 'z'], 5);
 * console.log(object.x[0].y.z);
 * // => 5
 */
function set(object, path, value) {
  return object == null ? object : _baseSet(object, path, value);
}

var set_1 = set;

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": formatDecimal,
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

function identity(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes$1 = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "-" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes$1[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes$1[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  locale.formatPrefix;
  return locale;
}

function localDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$1(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe(locale_periods),
      periodLookup = formatLookup(locale_periods),
      weekdayRe = formatRe(locale_weekdays),
      weekdayLookup = formatLookup(locale_weekdays),
      shortWeekdayRe = formatRe(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup(locale_shortWeekdays),
      monthRe = formatRe(locale_months),
      monthLookup = formatLookup(locale_months),
      shortMonthRe = formatRe(locale_shortMonths),
      shortMonthLookup = formatLookup(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day$1;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate(newDate(d.y, 0, 1)), day$1 = week.getUTCDay();
          week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate(newDate(d.y, 0, 1)), day$1 = week.getDay();
          week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day$1 = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate(d);
      }

      // Otherwise, all fields are in local time.
      return localDate(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads = {"-": "", "_": " ", "0": "0"},
    numberRe = /^\s*\d+/, // note: ignores next directive
    percentRe = /^%/,
    requoteRe = /[\\^$*+?|[\]().{}]/g;

function pad(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote(s) {
  return s.replace(requoteRe, "\\$&");
}

function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}

function formatLookup(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds(d, string, i) {
  var n = numberRe.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent(d, string, i) {
  var n = percentRe.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds(d, string, i) {
  var n = numberRe.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth(d, p) {
  return pad(d.getDate(), p, 2);
}

function formatHour24(d, p) {
  return pad(d.getHours(), p, 2);
}

function formatHour12(d, p) {
  return pad(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear(d, p) {
  return pad(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds(d, p) {
  return pad(d.getMilliseconds(), p, 3);
}

function formatMicroseconds(d, p) {
  return formatMilliseconds(d, p) + "000";
}

function formatMonthNumber(d, p) {
  return pad(d.getMonth() + 1, p, 2);
}

function formatMinutes(d, p) {
  return pad(d.getMinutes(), p, 2);
}

function formatSeconds(d, p) {
  return pad(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday(d, p) {
  return pad(sunday.count(year(d) - 1, d), p, 2);
}

function dISO(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
}

function formatWeekNumberISO(d, p) {
  d = dISO(d);
  return pad(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday(d) {
  return d.getDay();
}

function formatWeekNumberMonday(d, p) {
  return pad(monday.count(year(d) - 1, d), p, 2);
}

function formatYear(d, p) {
  return pad(d.getFullYear() % 100, p, 2);
}

function formatYearISO(d, p) {
  d = dISO(d);
  return pad(d.getFullYear() % 100, p, 2);
}

function formatFullYear(d, p) {
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
  return pad(d.getFullYear() % 10000, p, 4);
}

function formatZone(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad(z / 60 | 0, "0", 2)
      + pad(z % 60, "0", 2);
}

function formatUTCDayOfMonth(d, p) {
  return pad(d.getUTCDate(), p, 2);
}

function formatUTCHour24(d, p) {
  return pad(d.getUTCHours(), p, 2);
}

function formatUTCHour12(d, p) {
  return pad(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear(d, p) {
  return pad(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds(d, p) {
  return pad(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds(d, p) {
  return formatUTCMilliseconds(d, p) + "000";
}

function formatUTCMonthNumber(d, p) {
  return pad(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes(d, p) {
  return pad(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds(d, p) {
  return pad(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday(d, p) {
  return pad(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO(d, p) {
  d = UTCdISO(d);
  return pad(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday(d, p) {
  return pad(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear(d, p) {
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO(d, p) {
  d = UTCdISO(d);
  return pad(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear(d, p) {
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone() {
  return "+0000";
}

function formatLiteralPercent() {
  return "%";
}

function formatUnixTimestamp(d) {
  return +d;
}

function formatUnixTimestampSeconds(d) {
  return Math.floor(+d / 1000);
}

var locale$1;
var timeFormat;

defaultLocale$1({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  timeFormat = locale$1.format;
  locale$1.parse;
  locale$1.utcFormat;
  locale$1.utcParse;
  return locale$1;
}

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var getDisplayName_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

var _default = getDisplayName;
exports.default = _default;
});

var wrapDisplayName_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _getDisplayName = interopRequireDefault(getDisplayName_1);

var wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + "(" + (0, _getDisplayName.default)(BaseComponent) + ")";
};

var _default = wrapDisplayName;
exports.default = _default;
});

var setStatic_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var setStatic = function setStatic(key, value) {
  return function (BaseComponent) {
    /* eslint-disable no-param-reassign */
    BaseComponent[key] = value;
    /* eslint-enable no-param-reassign */

    return BaseComponent;
  };
};

var _default = setStatic;
exports.default = _default;
});

var setDisplayName_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _setStatic = interopRequireDefault(setStatic_1);

var setDisplayName = function setDisplayName(displayName) {
  return (0, _setStatic.default)('displayName', displayName);
};

var _default = setDisplayName;
exports.default = _default;
});

var mapProps_1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;



interopRequireDefault(setDisplayName_1);

interopRequireDefault(wrapDisplayName_1);

var mapProps = function mapProps(propsMapper) {
  return function (BaseComponent) {
    var factory = (0, react.createFactory)(BaseComponent);

    var MapProps = function MapProps(props) {
      return factory(propsMapper(props));
    };

    return MapProps;
  };
};

var _default = mapProps;
exports.default = _default;
});

createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

interopRequireDefault(wrapDisplayName_1);

interopRequireDefault(setDisplayName_1);

var _mapProps = interopRequireDefault(mapProps_1);

var withProps = function withProps(input) {
  var hoc = (0, _mapProps.default)(function (props) {
    return (0, _extends2.default)({}, props, typeof input === 'function' ? input(props) : input);
  });

  return hoc;
};

var _default = withProps;
exports.default = _default;
});

createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  }, function (arg) {
    return arg;
  });
};

var _default = compose;
exports.default = _default;
});

createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _setStatic = interopRequireDefault(setStatic_1);

var setPropTypes = function setPropTypes(propTypes) {
  return (0, _setStatic.default)('propTypes', propTypes);
};

var _default = setPropTypes;
exports.default = _default;
});

createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;



interopRequireDefault(setDisplayName_1);

interopRequireDefault(wrapDisplayName_1);

var defaultProps = function defaultProps(props) {
  return function (BaseComponent) {
    var factory = (0, react.createFactory)(BaseComponent);

    var DefaultProps = function DefaultProps(ownerProps) {
      return factory(ownerProps);
    };

    DefaultProps.defaultProps = props;

    return DefaultProps;
  };
};

var _default = defaultProps;
exports.default = _default;
});

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

var inheritsLoose = _inheritsLoose;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function componentWillMount() {
  // Call this.constructor.gDSFP to support sub-classes.
  var state = this.constructor.getDerivedStateFromProps(this.props, this.state);
  if (state !== null && state !== undefined) {
    this.setState(state);
  }
}

function componentWillReceiveProps(nextProps) {
  // Call this.constructor.gDSFP to support sub-classes.
  // Use the setState() updater to ensure state isn't stale in certain edge cases.
  function updater(prevState) {
    var state = this.constructor.getDerivedStateFromProps(nextProps, prevState);
    return state !== null && state !== undefined ? state : null;
  }
  // Binding "this" is important for shallow renderer support.
  this.setState(updater.bind(this));
}

function componentWillUpdate(nextProps, nextState) {
  try {
    var prevProps = this.props;
    var prevState = this.state;
    this.props = nextProps;
    this.state = nextState;
    this.__reactInternalSnapshotFlag = true;
    this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(
      prevProps,
      prevState
    );
  } finally {
    this.props = prevProps;
    this.state = prevState;
  }
}

// React may warn about cWM/cWRP/cWU methods being deprecated.
// Add a flag to suppress these warnings for this special case.
componentWillMount.__suppressDeprecationWarning = true;
componentWillReceiveProps.__suppressDeprecationWarning = true;
componentWillUpdate.__suppressDeprecationWarning = true;

function polyfill(Component) {
  var prototype = Component.prototype;

  if (!prototype || !prototype.isReactComponent) {
    throw new Error('Can only polyfill class components');
  }

  if (
    typeof Component.getDerivedStateFromProps !== 'function' &&
    typeof prototype.getSnapshotBeforeUpdate !== 'function'
  ) {
    return Component;
  }

  // If new component APIs are defined, "unsafe" lifecycles won't be called.
  // Error if any of these lifecycles are present,
  // Because they would work differently between older and newer (16.3+) versions of React.
  var foundWillMountName = null;
  var foundWillReceivePropsName = null;
  var foundWillUpdateName = null;
  if (typeof prototype.componentWillMount === 'function') {
    foundWillMountName = 'componentWillMount';
  } else if (typeof prototype.UNSAFE_componentWillMount === 'function') {
    foundWillMountName = 'UNSAFE_componentWillMount';
  }
  if (typeof prototype.componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'componentWillReceiveProps';
  } else if (typeof prototype.UNSAFE_componentWillReceiveProps === 'function') {
    foundWillReceivePropsName = 'UNSAFE_componentWillReceiveProps';
  }
  if (typeof prototype.componentWillUpdate === 'function') {
    foundWillUpdateName = 'componentWillUpdate';
  } else if (typeof prototype.UNSAFE_componentWillUpdate === 'function') {
    foundWillUpdateName = 'UNSAFE_componentWillUpdate';
  }
  if (
    foundWillMountName !== null ||
    foundWillReceivePropsName !== null ||
    foundWillUpdateName !== null
  ) {
    var componentName = Component.displayName || Component.name;
    var newApiName =
      typeof Component.getDerivedStateFromProps === 'function'
        ? 'getDerivedStateFromProps()'
        : 'getSnapshotBeforeUpdate()';

    throw Error(
      'Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n' +
        componentName +
        ' uses ' +
        newApiName +
        ' but also contains the following legacy lifecycles:' +
        (foundWillMountName !== null ? '\n  ' + foundWillMountName : '') +
        (foundWillReceivePropsName !== null
          ? '\n  ' + foundWillReceivePropsName
          : '') +
        (foundWillUpdateName !== null ? '\n  ' + foundWillUpdateName : '') +
        '\n\nThe above lifecycles should be removed. Learn more about this warning here:\n' +
        'https://fb.me/react-async-component-lifecycle-hooks'
    );
  }

  // React <= 16.2 does not support static getDerivedStateFromProps.
  // As a workaround, use cWM and cWRP to invoke the new static lifecycle.
  // Newer versions of React will ignore these lifecycles if gDSFP exists.
  if (typeof Component.getDerivedStateFromProps === 'function') {
    prototype.componentWillMount = componentWillMount;
    prototype.componentWillReceiveProps = componentWillReceiveProps;
  }

  // React <= 16.2 does not support getSnapshotBeforeUpdate.
  // As a workaround, use cWU to invoke the new lifecycle.
  // Newer versions of React will ignore that lifecycle if gSBU exists.
  if (typeof prototype.getSnapshotBeforeUpdate === 'function') {
    if (typeof prototype.componentDidUpdate !== 'function') {
      throw new Error(
        'Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype'
      );
    }

    prototype.componentWillUpdate = componentWillUpdate;

    var componentDidUpdate = prototype.componentDidUpdate;

    prototype.componentDidUpdate = function componentDidUpdatePolyfill(
      prevProps,
      prevState,
      maybeSnapshot
    ) {
      // 16.3+ will not execute our will-update method;
      // It will pass a snapshot value to did-update though.
      // Older versions will require our polyfilled will-update value.
      // We need to handle both cases, but can't just check for the presence of "maybeSnapshot",
      // Because for <= 15.x versions this might be a "prevContext" object.
      // We also can't just check "__reactInternalSnapshot",
      // Because get-snapshot might return a falsy value.
      // So check for the explicit __reactInternalSnapshotFlag flag to determine behavior.
      var snapshot = this.__reactInternalSnapshotFlag
        ? this.__reactInternalSnapshot
        : maybeSnapshot;

      componentDidUpdate.call(this, prevProps, prevState, snapshot);
    };
  }

  return Component;
}

var reactLifecyclesCompat_es = /*#__PURE__*/Object.freeze({
  __proto__: null,
  polyfill: polyfill
});

var pick_1 = createCommonjsModule(function (module, exports) {

exports.__esModule = true;
exports.default = void 0;

var pick = function pick(obj, keys) {
  var result = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }

  return result;
};

var _default = pick;
exports.default = _default;
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @typechecks
 * 
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is$1(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is$1(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is$1(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

var shallowEqual_1 = shallowEqual;

var shallowEqual$1 = createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _shallowEqual = interopRequireDefault(shallowEqual_1);

var _default = _shallowEqual.default;
exports.default = _default;
});

createCommonjsModule(function (module, exports) {



exports.__esModule = true;
exports.default = void 0;

var _extends2 = interopRequireDefault(_extends_1);

var _inheritsLoose2 = interopRequireDefault(inheritsLoose);





var _pick = interopRequireDefault(pick_1);

var _shallowEqual = interopRequireDefault(shallowEqual$1);

interopRequireDefault(setDisplayName_1);

interopRequireDefault(wrapDisplayName_1);

var withPropsOnChange = function withPropsOnChange(shouldMapOrKeys, propsMapper) {
  return function (BaseComponent) {
    var factory = (0, react.createFactory)(BaseComponent);
    var shouldMap = typeof shouldMapOrKeys === 'function' ? shouldMapOrKeys : function (props, nextProps) {
      return !(0, _shallowEqual.default)((0, _pick.default)(props, shouldMapOrKeys), (0, _pick.default)(nextProps, shouldMapOrKeys));
    };

    var WithPropsOnChange =
    /*#__PURE__*/
    function (_Component) {
      (0, _inheritsLoose2.default)(WithPropsOnChange, _Component);

      function WithPropsOnChange() {
        var _this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _Component.call.apply(_Component, [this].concat(args)) || this;
        _this.state = {
          computedProps: propsMapper(_this.props),
          prevProps: _this.props
        };
        return _this;
      }

      WithPropsOnChange.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
        if (shouldMap(prevState.prevProps, nextProps)) {
          return {
            computedProps: propsMapper(nextProps),
            prevProps: nextProps
          };
        }

        return {
          prevProps: nextProps
        };
      };

      var _proto = WithPropsOnChange.prototype;

      _proto.render = function render() {
        return factory((0, _extends2.default)({}, this.props, this.state.computedProps));
      };

      return WithPropsOnChange;
    }(react.Component);

    (0, reactLifecyclesCompat_es.polyfill)(WithPropsOnChange);

    return WithPropsOnChange;
  };
};

var _default = withPropsOnChange;
exports.default = _default;
});

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var textProps = {
  fill: propTypes.string,
  fontSize: propTypes.number,
  fontFamily: propTypes.string
};
var axisThemePropType = propTypes.shape({
  domain: propTypes.shape({
    line: propTypes.shape({
      stroke: propTypes.string.isRequired,
      strokeWidth: propTypes.number.isRequired,
      strokeDasharray: propTypes.string
    }).isRequired
  }).isRequired,
  ticks: propTypes.shape({
    line: propTypes.shape({
      stroke: propTypes.string.isRequired,
      strokeWidth: propTypes.number.isRequired,
      strokeDasharray: propTypes.string
    }).isRequired,
    text: propTypes.shape(_objectSpread2$1({}, textProps)).isRequired
  }).isRequired,
  legend: propTypes.shape({
    text: propTypes.shape(_objectSpread2$1({}, textProps)).isRequired
  }).isRequired
});
var gridThemePropType = propTypes.shape({
  line: propTypes.shape({
    stroke: propTypes.string.isRequired,
    strokeWidth: propTypes.number.isRequired,
    strokeDasharray: propTypes.string
  }).isRequired
});
var legendsThemePropType = propTypes.shape({
  text: propTypes.shape(_objectSpread2$1({}, textProps)).isRequired
});
var labelsThemePropType = propTypes.shape({
  text: propTypes.shape(_objectSpread2$1({}, textProps)).isRequired
});
var dotsThemePropType = propTypes.shape({
  text: propTypes.shape(_objectSpread2$1({}, textProps)).isRequired
});
var markersThemePropType = propTypes.shape({
  text: propTypes.shape(_objectSpread2$1({}, textProps)).isRequired
});
var crosshairPropType = propTypes.shape({
  line: propTypes.shape({
    stroke: propTypes.string.isRequired,
    strokeWidth: propTypes.number.isRequired,
    strokeDasharray: propTypes.string
  }).isRequired
});
var annotationsPropType = propTypes.shape({
  text: propTypes.shape(_objectSpread2$1(_objectSpread2$1({}, textProps), {}, {
    outlineWidth: propTypes.number.isRequired,
    outlineColor: propTypes.string.isRequired
  })).isRequired,
  link: propTypes.shape({
    stroke: propTypes.string.isRequired,
    strokeWidth: propTypes.number.isRequired,
    outlineWidth: propTypes.number.isRequired,
    outlineColor: propTypes.string.isRequired
  }).isRequired,
  outline: propTypes.shape({
    stroke: propTypes.string.isRequired,
    strokeWidth: propTypes.number.isRequired,
    outlineWidth: propTypes.number.isRequired,
    outlineColor: propTypes.string.isRequired
  }).isRequired,
  symbol: propTypes.shape({
    fill: propTypes.string.isRequired,
    outlineWidth: propTypes.number.isRequired,
    outlineColor: propTypes.string.isRequired
  }).isRequired
});
propTypes.shape({
  background: propTypes.string.isRequired,
  fontFamily: propTypes.string.isRequired,
  fontSize: propTypes.number.isRequired,
  textColor: propTypes.string.isRequired,
  axis: axisThemePropType.isRequired,
  grid: gridThemePropType.isRequired,
  legends: legendsThemePropType.isRequired,
  labels: labelsThemePropType.isRequired,
  dots: dotsThemePropType.isRequired,
  markers: markersThemePropType,
  crosshair: crosshairPropType.isRequired,
  annotations: annotationsPropType.isRequired
});

var defaultTheme = {
  background: 'transparent',
  fontFamily: 'sans-serif',
  fontSize: 11,
  textColor: '#333333',
  axis: {
    domain: {
      line: {
        stroke: 'transparent',
        strokeWidth: 1
      }
    },
    ticks: {
      line: {
        stroke: '#777777',
        strokeWidth: 1
      },
      text: {}
    },
    legend: {
      text: {
        fontSize: 12
      }
    }
  },
  grid: {
    line: {
      stroke: '#dddddd',
      strokeWidth: 1
    }
  },
  legends: {
    text: {}
  },
  labels: {
    text: {}
  },
  markers: {
    lineColor: '#000000',
    lineStrokeWidth: 1,
    text: {}
  },
  dots: {
    text: {}
  },
  tooltip: {
    container: {
      background: 'white',
      color: 'inherit',
      fontSize: 'inherit',
      borderRadius: '2px',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
      padding: '5px 9px'
    },
    basic: {
      whiteSpace: 'pre',
      display: 'flex',
      alignItems: 'center'
    },
    chip: {
      marginRight: 7
    },
    table: {},
    tableCell: {
      padding: '3px 5px'
    }
  },
  crosshair: {
    line: {
      stroke: '#000000',
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: '6 6'
    }
  },
  annotations: {
    text: {
      fontSize: 13,
      outlineWidth: 2,
      outlineColor: '#ffffff'
    },
    link: {
      stroke: '#000000',
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: '#ffffff'
    },
    outline: {
      fill: 'none',
      stroke: '#000000',
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: '#ffffff'
    },
    symbol: {
      fill: '#000000',
      outlineWidth: 2,
      outlineColor: '#ffffff'
    }
  }
};

var fontProps = ['axis.ticks.text', 'axis.legend.text', 'legends.text', 'labels.text', 'dots.text', 'markers.text', 'annotations.text'];
var extendDefaultTheme = function extendDefaultTheme(defaultTheme, customTheme) {
  var theme = merge_1({}, defaultTheme, customTheme);
  fontProps.forEach(function (prop) {
    if (get_1(theme, "".concat(prop, ".fontFamily")) === undefined) {
      set_1(theme, "".concat(prop, ".fontFamily"), theme.fontFamily);
    }
    if (get_1(theme, "".concat(prop, ".fontSize")) === undefined) {
      set_1(theme, "".concat(prop, ".fontSize"), theme.fontSize);
    }
    if (get_1(theme, "".concat(prop, ".fill")) === undefined) {
      set_1(theme, "".concat(prop, ".fill"), theme.textColor);
    }
  });
  return theme;
};

var motionConfigContext = react.createContext();
var MotionConfigProvider = function MotionConfigProvider(_ref) {
  var children = _ref.children,
      animate = _ref.animate,
      stiffness = _ref.stiffness,
      damping = _ref.damping,
      config$1 = _ref.config;
  var value = react.useMemo(function () {
    var reactSpringConfig = isString_1(config$1) ? config[config$1] : config$1;
    return {
      animate: animate,
      springConfig: {
        stiffness: stiffness,
        damping: damping
      },
      config: reactSpringConfig
    };
  }, [animate, stiffness, damping, config$1]);
  return react.createElement(motionConfigContext.Provider, {
    value: value
  }, children);
};
({
  animate: propTypes.bool,
  motionStiffness: propTypes.number,
  motionDamping: propTypes.number,
  motionConfig: propTypes.oneOfType([propTypes.oneOf(Object.keys(config)), propTypes.shape({
    mass: propTypes.number,
    tension: propTypes.number,
    friction: propTypes.number,
    clamp: propTypes.bool,
    precision: propTypes.number,
    velocity: propTypes.number,
    duration: propTypes.number,
    easing: propTypes.func
  })])
});
var motionDefaultProps = {
  animate: true,
  stiffness: 90,
  damping: 15,
  config: 'default'
};
MotionConfigProvider.defaultProps = motionDefaultProps;

var useMotionConfig = function useMotionConfig() {
  return react.useContext(motionConfigContext);
};

var quantizeColorScales = {
  nivo: ['#d76445', '#f47560', '#e8c1a0', '#97e3d5', '#61cdbb', '#00b0a7'],
  BrBG: last_1(scheme$q),
  PRGn: last_1(scheme),
  PiYG: last_1(scheme$1),
  PuOr: last_1(scheme$2),
  RdBu: last_1(scheme$3),
  RdGy: last_1(scheme$4),
  RdYlBu: last_1(scheme$5),
  RdYlGn: last_1(scheme$6),
  spectral: last_1(scheme$7),
  blues: last_1(scheme$8),
  greens: last_1(scheme$9),
  greys: last_1(scheme$a),
  oranges: last_1(scheme$b),
  purples: last_1(scheme$c),
  reds: last_1(scheme$d),
  BuGn: last_1(scheme$e),
  BuPu: last_1(scheme$f),
  GnBu: last_1(scheme$g),
  OrRd: last_1(scheme$h),
  PuBuGn: last_1(scheme$i),
  PuBu: last_1(scheme$j),
  PuRd: last_1(scheme$k),
  RdPu: last_1(scheme$l),
  YlGnBu: last_1(scheme$m),
  YlGn: last_1(scheme$n),
  YlOrBr: last_1(scheme$o),
  YlOrRd: last_1(scheme$p)
};
var quantizeColorScalesKeys = Object.keys(quantizeColorScales);

var colorSchemes = {
  nivo: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb', '#97e3d5'],
  category10: schemeCategory10,
  accent: schemeAccent,
  dark2: schemeDark2,
  paired: schemePaired,
  pastel1: schemePastel1,
  pastel2: schemePastel2,
  set1: schemeSet1,
  set2: schemeSet2,
  set3: schemeSet3,
  brown_blueGreen: last_1(scheme$q),
  purpleRed_green: last_1(scheme),
  pink_yellowGreen: last_1(scheme$1),
  purple_orange: last_1(scheme$2),
  red_blue: last_1(scheme$3),
  red_grey: last_1(scheme$4),
  red_yellow_blue: last_1(scheme$5),
  red_yellow_green: last_1(scheme$6),
  spectral: last_1(scheme$7),
  blues: last_1(scheme$8),
  greens: last_1(scheme$9),
  greys: last_1(scheme$a),
  oranges: last_1(scheme$b),
  purples: last_1(scheme$c),
  reds: last_1(scheme$d),
  blue_green: last_1(scheme$e),
  blue_purple: last_1(scheme$f),
  green_blue: last_1(scheme$g),
  orange_red: last_1(scheme$h),
  purple_blue_green: last_1(scheme$i),
  purple_blue: last_1(scheme$j),
  purple_red: last_1(scheme$k),
  red_purple: last_1(scheme$l),
  yellow_green_blue: last_1(scheme$m),
  yellow_green: last_1(scheme$n),
  yellow_orange_brown: last_1(scheme$o),
  yellow_orange_red: last_1(scheme$p)
};
var colorInterpolators = {
  brown_blueGreen: interpolateBrBG,
  purpleRed_green: interpolatePRGn,
  pink_yellowGreen: interpolatePiYG,
  purple_orange: interpolatePuOr,
  red_blue: interpolateRdBu,
  red_grey: interpolateRdGy,
  red_yellow_blue: interpolateRdYlBu,
  red_yellow_green: interpolateRdYlGn,
  spectral: interpolateSpectral,
  blues: interpolateBlues,
  greens: interpolateGreens,
  greys: interpolateGreys,
  oranges: interpolateOranges,
  purples: interpolatePurples,
  reds: interpolateReds,
  viridis: interpolateViridis,
  inferno: inferno,
  magma: magma,
  plasma: plasma,
  warm: warm,
  cool: cool,
  cubehelixDefault: interpolateCubehelixDefault,
  blue_green: interpolateBuGn,
  blue_purple: interpolateBuPu,
  green_blue: interpolateGnBu,
  orange_red: interpolateOrRd,
  purple_blue_green: interpolatePuBuGn,
  purple_blue: interpolatePuBu,
  purple_red: interpolatePuRd,
  red_purple: interpolateRdPu,
  yellow_green_blue: interpolateYlGnBu,
  yellow_green: interpolateYlGn,
  yellow_orange_brown: interpolateYlOrBr,
  yellow_orange_red: interpolateYlOrRd,
  rainbow: interpolateRainbow,
  sinebow: interpolateSinebow
};
var getColorScale = function getColorScale(colors, dataScale) {
  if (isString_1(colors)) {
    var scheme = colorSchemes[colors];
    if (scheme !== undefined) {
      var scale = ordinal(scheme);
      scale.type = 'ordinal';
      return scale;
    }
    if (dataScale !== undefined && colors.indexOf('seq:') === 0) {
      var interpolator = colorInterpolators[colors.slice(4)];
      if (interpolator !== undefined) {
        var _scale = sequential(interpolator).domain(dataScale.domain());
        _scale.type = 'sequential';
        return _scale;
      }
    }
  }
  if (isArray_1(colors)) {
    var _scale2 = ordinal(colors);
    _scale2.type = 'ordinal';
    return _scale2;
  }
  return function () {
    return colors;
  };
};

propTypes.oneOfType([propTypes.oneOf(quantizeColorScalesKeys), propTypes.func, propTypes.arrayOf(propTypes.string)]);

var curvePropMapping = {
  basis: curveBasis,
  basisClosed: curveBasisClosed,
  basisOpen: curveBasisOpen,
  bundle: curveBundle,
  cardinal: curveCardinal,
  cardinalClosed: curveCardinalClosed,
  cardinalOpen: curveCardinalOpen,
  catmullRom: curveCatmullRom,
  catmullRomClosed: curveCatmullRomClosed,
  catmullRomOpen: curveCatmullRomOpen,
  linear: curveLinear,
  linearClosed: curveLinearClosed,
  monotoneX: monotoneX,
  monotoneY: monotoneY,
  natural: curveNatural,
  step: curveStep,
  stepAfter: stepAfter,
  stepBefore: stepBefore
};
var curvePropKeys = Object.keys(curvePropMapping);
propTypes.oneOf(curvePropKeys);
var closedCurvePropKeys = curvePropKeys.filter(function (c) {
  return c.endsWith('Closed');
});
propTypes.oneOf(closedCurvePropKeys);
var areaCurvePropKeys = without_1(curvePropKeys, 'bundle', 'basisClosed', 'basisOpen', 'cardinalClosed', 'cardinalOpen', 'catmullRomClosed', 'catmullRomOpen', 'linearClosed');
propTypes.oneOf(areaCurvePropKeys);
var lineCurvePropKeys = without_1(curvePropKeys, 'bundle', 'basisClosed', 'basisOpen', 'cardinalClosed', 'cardinalOpen', 'catmullRomClosed', 'catmullRomOpen', 'linearClosed');
propTypes.oneOf(lineCurvePropKeys);

({
  defs: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string.isRequired
  })).isRequired,
  fill: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string.isRequired,
    match: propTypes.oneOfType([propTypes.oneOf(['*']), propTypes.object, propTypes.func]).isRequired
  })).isRequired
});

var stackOrderPropMapping = {
  ascending: stackOrderAscending,
  descending: stackOrderDescending,
  insideOut: stackOrderInsideOut,
  none: stackOrderNone,
  reverse: stackOrderReverse
};
var stackOrderPropKeys = Object.keys(stackOrderPropMapping);
propTypes.oneOf(stackOrderPropKeys);
var stackOffsetPropMapping = {
  expand: stackOffsetExpand,
  diverging: stackOffsetDiverging,
  none: stackOffsetNone,
  silhouette: stackOffsetSilhouette,
  wiggle: stackOffsetWiggle
};
var stackOffsetPropKeys = Object.keys(stackOffsetPropMapping);
propTypes.oneOf(stackOffsetPropKeys);

var treeMapTilePropMapping = {
  binary: treemapBinary,
  dice: treemapDice,
  slice: treemapSlice,
  sliceDice: treemapSliceDice,
  squarify: treemapSquarify,
  resquarify: treemapResquarify
};
var treeMapTilePropKeys = Object.keys(treeMapTilePropMapping);
propTypes.oneOf(treeMapTilePropKeys);

propTypes.shape({
  top: propTypes.number,
  right: propTypes.number,
  bottom: propTypes.number,
  left: propTypes.number
}).isRequired;
var blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
propTypes.oneOf(blendModes);
ordinal(schemeSet3);
var defaultMargin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};

var useDimensions = function useDimensions(width, height) {
  var partialMargin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return react.useMemo(function () {
    var margin = _objectSpread2$1(_objectSpread2$1({}, defaultMargin), partialMargin);
    return {
      margin: margin,
      innerWidth: width - margin.left - margin.right,
      innerHeight: height - margin.top - margin.bottom,
      outerWidth: width,
      outerHeight: height
    };
  }, [width, height, partialMargin.top, partialMargin.right, partialMargin.bottom, partialMargin.left]);
};

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$1(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}

var MapShim = (function () {
    if (typeof Map !== 'undefined') {
        return Map;
    }
    function getIndex(arr, key) {
        var result = -1;
        arr.some(function (entry, index) {
            if (entry[0] === key) {
                result = index;
                return true;
            }
            return false;
        });
        return result;
    }
    return  (function () {
        function class_1() {
            this.__entries__ = [];
        }
        Object.defineProperty(class_1.prototype, "size", {
            get: function () {
                return this.__entries__.length;
            },
            enumerable: true,
            configurable: true
        });
        class_1.prototype.get = function (key) {
            var index = getIndex(this.__entries__, key);
            var entry = this.__entries__[index];
            return entry && entry[1];
        };
        class_1.prototype.set = function (key, value) {
            var index = getIndex(this.__entries__, key);
            if (~index) {
                this.__entries__[index][1] = value;
            }
            else {
                this.__entries__.push([key, value]);
            }
        };
        class_1.prototype.delete = function (key) {
            var entries = this.__entries__;
            var index = getIndex(entries, key);
            if (~index) {
                entries.splice(index, 1);
            }
        };
        class_1.prototype.has = function (key) {
            return !!~getIndex(this.__entries__, key);
        };
        class_1.prototype.clear = function () {
            this.__entries__.splice(0);
        };
        class_1.prototype.forEach = function (callback, ctx) {
            if (ctx === void 0) { ctx = null; }
            for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                var entry = _a[_i];
                callback.call(ctx, entry[1], entry[0]);
            }
        };
        return class_1;
    }());
})();
var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;
var global$1 = (function () {
    if (typeof global !== 'undefined' && global.Math === Math) {
        return global;
    }
    if (typeof self !== 'undefined' && self.Math === Math) {
        return self;
    }
    if (typeof window !== 'undefined' && window.Math === Math) {
        return window;
    }
    return Function('return this')();
})();
var requestAnimationFrame$1$1 = (function () {
    if (typeof requestAnimationFrame === 'function') {
        return requestAnimationFrame.bind(global$1);
    }
    return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
})();
var trailingTimeout = 2;
function throttle (callback, delay) {
    var leadingCall = false, trailingCall = false, lastCallTime = 0;
    function resolvePending() {
        if (leadingCall) {
            leadingCall = false;
            callback();
        }
        if (trailingCall) {
            proxy();
        }
    }
    function timeoutCallback() {
        requestAnimationFrame$1$1(resolvePending);
    }
    function proxy() {
        var timeStamp = Date.now();
        if (leadingCall) {
            if (timeStamp - lastCallTime < trailingTimeout) {
                return;
            }
            trailingCall = true;
        }
        else {
            leadingCall = true;
            trailingCall = false;
            setTimeout(timeoutCallback, delay);
        }
        lastCallTime = timeStamp;
    }
    return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
var mutationObserverSupported = typeof MutationObserver !== 'undefined';
var ResizeObserverController =  (function () {
    function ResizeObserverController() {
        this.connected_ = false;
        this.mutationEventsAdded_ = false;
        this.mutationsObserver_ = null;
        this.observers_ = [];
        this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
        this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController.prototype.addObserver = function (observer) {
        if (!~this.observers_.indexOf(observer)) {
            this.observers_.push(observer);
        }
        if (!this.connected_) {
            this.connect_();
        }
    };
    ResizeObserverController.prototype.removeObserver = function (observer) {
        var observers = this.observers_;
        var index = observers.indexOf(observer);
        if (~index) {
            observers.splice(index, 1);
        }
        if (!observers.length && this.connected_) {
            this.disconnect_();
        }
    };
    ResizeObserverController.prototype.refresh = function () {
        var changesDetected = this.updateObservers_();
        if (changesDetected) {
            this.refresh();
        }
    };
    ResizeObserverController.prototype.updateObservers_ = function () {
        var activeObservers = this.observers_.filter(function (observer) {
            return observer.gatherActive(), observer.hasActive();
        });
        activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
        return activeObservers.length > 0;
    };
    ResizeObserverController.prototype.connect_ = function () {
        if (!isBrowser || this.connected_) {
            return;
        }
        document.addEventListener('transitionend', this.onTransitionEnd_);
        window.addEventListener('resize', this.refresh);
        if (mutationObserverSupported) {
            this.mutationsObserver_ = new MutationObserver(this.refresh);
            this.mutationsObserver_.observe(document, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
            });
        }
        else {
            document.addEventListener('DOMSubtreeModified', this.refresh);
            this.mutationEventsAdded_ = true;
        }
        this.connected_ = true;
    };
    ResizeObserverController.prototype.disconnect_ = function () {
        if (!isBrowser || !this.connected_) {
            return;
        }
        document.removeEventListener('transitionend', this.onTransitionEnd_);
        window.removeEventListener('resize', this.refresh);
        if (this.mutationsObserver_) {
            this.mutationsObserver_.disconnect();
        }
        if (this.mutationEventsAdded_) {
            document.removeEventListener('DOMSubtreeModified', this.refresh);
        }
        this.mutationsObserver_ = null;
        this.mutationEventsAdded_ = false;
        this.connected_ = false;
    };
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
        var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
        var isReflowProperty = transitionKeys.some(function (key) {
            return !!~propertyName.indexOf(key);
        });
        if (isReflowProperty) {
            this.refresh();
        }
    };
    ResizeObserverController.getInstance = function () {
        if (!this.instance_) {
            this.instance_ = new ResizeObserverController();
        }
        return this.instance_;
    };
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
}());
var defineConfigurable = (function (target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        Object.defineProperty(target, key, {
            value: props[key],
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    return target;
});
var getWindowOf = (function (target) {
    var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
});
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
    return parseFloat(value) || 0;
}
function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
        var value = styles['border-' + position + '-width'];
        return size + toFloat(value);
    }, 0);
}
function getPaddings(styles) {
    var positions = ['top', 'right', 'bottom', 'left'];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
        var position = positions_1[_i];
        var value = styles['padding-' + position];
        paddings[position] = toFloat(value);
    }
    return paddings;
}
function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
    var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
    if (!clientWidth && !clientHeight) {
        return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    var width = toFloat(styles.width), height = toFloat(styles.height);
    if (styles.boxSizing === 'border-box') {
        if (Math.round(width + horizPad) !== clientWidth) {
            width -= getBordersSize(styles, 'left', 'right') + horizPad;
        }
        if (Math.round(height + vertPad) !== clientHeight) {
            height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
        }
    }
    if (!isDocumentElement(target)) {
        var vertScrollbar = Math.round(width + horizPad) - clientWidth;
        var horizScrollbar = Math.round(height + vertPad) - clientHeight;
        if (Math.abs(vertScrollbar) !== 1) {
            width -= vertScrollbar;
        }
        if (Math.abs(horizScrollbar) !== 1) {
            height -= horizScrollbar;
        }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = (function () {
    if (typeof SVGGraphicsElement !== 'undefined') {
        return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
    }
    return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === 'function'); };
})();
function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
    if (!isBrowser) {
        return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
        return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
    var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
    var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
        x: x, y: y, width: width, height: height,
        top: y,
        right: x + width,
        bottom: height + y,
        left: x
    });
    return rect;
}
function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
}
var ResizeObservation =  (function () {
    function ResizeObservation(target) {
        this.broadcastWidth = 0;
        this.broadcastHeight = 0;
        this.contentRect_ = createRectInit(0, 0, 0, 0);
        this.target = target;
    }
    ResizeObservation.prototype.isActive = function () {
        var rect = getContentRect(this.target);
        this.contentRect_ = rect;
        return (rect.width !== this.broadcastWidth ||
            rect.height !== this.broadcastHeight);
    };
    ResizeObservation.prototype.broadcastRect = function () {
        var rect = this.contentRect_;
        this.broadcastWidth = rect.width;
        this.broadcastHeight = rect.height;
        return rect;
    };
    return ResizeObservation;
}());
var ResizeObserverEntry =  (function () {
    function ResizeObserverEntry(target, rectInit) {
        var contentRect = createReadOnlyRect(rectInit);
        defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
}());
var ResizeObserverSPI =  (function () {
    function ResizeObserverSPI(callback, controller, callbackCtx) {
        this.activeObservations_ = [];
        this.observations_ = new MapShim();
        if (typeof callback !== 'function') {
            throw new TypeError('The callback provided as parameter 1 is not a function.');
        }
        this.callback_ = callback;
        this.controller_ = controller;
        this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI.prototype.observe = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        if (observations.has(target)) {
            return;
        }
        observations.set(target, new ResizeObservation(target));
        this.controller_.addObserver(this);
        this.controller_.refresh();
    };
    ResizeObserverSPI.prototype.unobserve = function (target) {
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        if (typeof Element === 'undefined' || !(Element instanceof Object)) {
            return;
        }
        if (!(target instanceof getWindowOf(target).Element)) {
            throw new TypeError('parameter 1 is not of type "Element".');
        }
        var observations = this.observations_;
        if (!observations.has(target)) {
            return;
        }
        observations.delete(target);
        if (!observations.size) {
            this.controller_.removeObserver(this);
        }
    };
    ResizeObserverSPI.prototype.disconnect = function () {
        this.clearActive();
        this.observations_.clear();
        this.controller_.removeObserver(this);
    };
    ResizeObserverSPI.prototype.gatherActive = function () {
        var _this = this;
        this.clearActive();
        this.observations_.forEach(function (observation) {
            if (observation.isActive()) {
                _this.activeObservations_.push(observation);
            }
        });
    };
    ResizeObserverSPI.prototype.broadcastActive = function () {
        if (!this.hasActive()) {
            return;
        }
        var ctx = this.callbackCtx_;
        var entries = this.activeObservations_.map(function (observation) {
            return new ResizeObserverEntry(observation.target, observation.broadcastRect());
        });
        this.callback_.call(ctx, entries, ctx);
        this.clearActive();
    };
    ResizeObserverSPI.prototype.clearActive = function () {
        this.activeObservations_.splice(0);
    };
    ResizeObserverSPI.prototype.hasActive = function () {
        return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
}());
var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
var ResizeObserver =  (function () {
    function ResizeObserver(callback) {
        if (!(this instanceof ResizeObserver)) {
            throw new TypeError('Cannot call a class as a function.');
        }
        if (!arguments.length) {
            throw new TypeError('1 argument required, but only 0 present.');
        }
        var controller = ResizeObserverController.getInstance();
        var observer = new ResizeObserverSPI(callback, controller, this);
        observers.set(this, observer);
    }
    return ResizeObserver;
}());
[
    'observe',
    'unobserve',
    'disconnect'
].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
        var _a;
        return (_a = observers.get(this))[method].apply(_a, arguments);
    };
});
var index = (function () {
    if (typeof global$1.ResizeObserver !== 'undefined') {
        return global$1.ResizeObserver;
    }
    return ResizeObserver;
})();

var useMeasure = function useMeasure() {
  var measureRef = react.useRef(null);
  var _useState = react.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }),
      _useState2 = _slicedToArray$1(_useState, 2),
      bounds = _useState2[0],
      setBounds = _useState2[1];
  var _useState3 = react.useState(function () {
    return new index(function (_ref) {
      var _ref2 = _slicedToArray$1(_ref, 1),
          entry = _ref2[0];
      return setBounds(entry.contentRect);
    });
  }),
      _useState4 = _slicedToArray$1(_useState3, 1),
      observer = _useState4[0];
  react.useEffect(function () {
    if (measureRef.current) {
      observer.observe(measureRef.current);
    }
    return function () {
      return observer.disconnect();
    };
  }, []);
  return [measureRef, bounds];
};

var usePartialTheme = function usePartialTheme(partialTheme) {
  return react.useMemo(function () {
    return extendDefaultTheme(defaultTheme, partialTheme);
  }, [partialTheme]);
};

var getValueFormatter = function getValueFormatter(format$1) {
  if (typeof format$1 === 'function') return format$1;
  if (typeof format$1 === 'string') {
    if (format$1.indexOf('time:') === 0) {
      return timeFormat(format$1.slice('5'));
    }
    return format(format$1);
  }
  return function (v) {
    return v;
  };
};
var useValueFormatter = function useValueFormatter(format) {
  return react.useMemo(function () {
    return getValueFormatter(format);
  }, [format]);
};

var themeContext = react.createContext();
var defaultPartialTheme = {};
var ThemeProvider = function ThemeProvider(_ref) {
  var _ref$theme = _ref.theme,
      partialTheme = _ref$theme === void 0 ? defaultPartialTheme : _ref$theme,
      children = _ref.children;
  var theme = usePartialTheme(partialTheme);
  return react.createElement(themeContext.Provider, {
    value: theme
  }, children);
};
var useTheme = function useTheme() {
  return react.useContext(themeContext);
};

var ConditionalWrapper = function ConditionalWrapper(_ref) {
  var children = _ref.children,
      condition = _ref.condition,
      wrapper = _ref.wrapper;
  if (!condition) return children;
  return react.cloneElement(wrapper, {}, children);
};

var containerStyle = {
  position: 'relative'
};
var Container = function Container(_ref) {
  var children = _ref.children,
      theme = _ref.theme,
      _ref$renderWrapper = _ref.renderWrapper,
      renderWrapper = _ref$renderWrapper === void 0 ? true : _ref$renderWrapper,
      _ref$isInteractive = _ref.isInteractive,
      isInteractive = _ref$isInteractive === void 0 ? true : _ref$isInteractive,
      animate = _ref.animate,
      motionStiffness = _ref.motionStiffness,
      motionDamping = _ref.motionDamping,
      motionConfig = _ref.motionConfig;
  var container = react.useRef(null);
  return react.createElement(ThemeProvider, {
    theme: theme
  }, react.createElement(MotionConfigProvider, {
    animate: animate,
    stiffness: motionStiffness,
    damping: motionDamping,
    config: motionConfig
  }, react.createElement(TooltipProvider, {
    container: container
  }, react.createElement(ConditionalWrapper, {
    condition: renderWrapper,
    wrapper: react.createElement("div", {
      style: containerStyle,
      ref: container
    })
  }, children, isInteractive && react.createElement(Tooltip, null)))));
};

var ResponsiveWrapper = function ResponsiveWrapper(_ref) {
  var children = _ref.children;
  var _useMeasure = useMeasure(),
      _useMeasure2 = _slicedToArray$1(_useMeasure, 2),
      measureRef = _useMeasure2[0],
      bounds = _useMeasure2[1];
  var shouldRender = bounds.width > 0 && bounds.height > 0;
  return react.createElement("div", {
    ref: measureRef,
    style: {
      width: '100%',
      height: '100%'
    }
  }, shouldRender && children({
    width: bounds.width,
    height: bounds.height
  }));
};

var LinearGradient = function LinearGradient(_ref) {
  var id = _ref.id,
      colors = _ref.colors;
  return react.createElement("linearGradient", {
    id: id,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 1
  }, colors.map(function (_ref2) {
    var offset = _ref2.offset,
        color = _ref2.color,
        opacity = _ref2.opacity;
    return react.createElement("stop", {
      key: offset,
      offset: "".concat(offset, "%"),
      stopColor: color,
      stopOpacity: opacity !== undefined ? opacity : 1
    });
  }));
};

var gradientTypes = {
  linearGradient: LinearGradient
};

var PatternDots = react.memo(function (_ref) {
  var id = _ref.id,
      background = _ref.background,
      color = _ref.color,
      size = _ref.size,
      padding = _ref.padding,
      stagger = _ref.stagger;
  var fullSize = size + padding;
  var radius = size / 2;
  var halfPadding = padding / 2;
  if (stagger === true) {
    fullSize = size * 2 + padding * 2;
  }
  return react.createElement("pattern", {
    id: id,
    width: fullSize,
    height: fullSize,
    patternUnits: "userSpaceOnUse"
  }, react.createElement("rect", {
    width: fullSize,
    height: fullSize,
    fill: background
  }), react.createElement("circle", {
    cx: halfPadding + radius,
    cy: halfPadding + radius,
    r: radius,
    fill: color
  }), stagger && react.createElement("circle", {
    cx: padding * 1.5 + size + radius,
    cy: padding * 1.5 + size + radius,
    r: radius,
    fill: color
  }));
});
PatternDots.displayName = 'PatternDots';
PatternDots.defaultProps = {
  color: '#000000',
  background: '#ffffff',
  size: 4,
  padding: 4,
  stagger: false
};
var degreesToRadians = function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
};

var textPropsByEngine = {
  svg: {
    align: {
      left: 'start',
      center: 'middle',
      right: 'end'
    },
    baseline: {
      top: 'text-before-edge',
      center: 'central',
      bottom: 'alphabetic'
    }
  },
  canvas: {
    align: {
      left: 'left',
      center: 'center',
      right: 'right'
    },
    baseline: {
      top: 'top',
      center: 'middle',
      bottom: 'bottom'
    }
  }
};

var PatternLines = react.memo(function (_ref) {
  var id = _ref.id,
      _spacing = _ref.spacing,
      _rotation = _ref.rotation,
      background = _ref.background,
      color = _ref.color,
      lineWidth = _ref.lineWidth;
  var rotation = Math.round(_rotation) % 360;
  var spacing = Math.abs(_spacing);
  if (rotation > 180) rotation = rotation - 360;else if (rotation > 90) rotation = rotation - 180;else if (rotation < -180) rotation = rotation + 360;else if (rotation < -90) rotation = rotation + 180;
  var width = spacing;
  var height = spacing;
  var path;
  if (rotation === 0) {
    path = "\n                M 0 0 L ".concat(width, " 0\n                M 0 ").concat(height, " L ").concat(width, " ").concat(height, "\n            ");
  } else if (rotation === 90) {
    path = "\n                M 0 0 L 0 ".concat(height, "\n                M ").concat(width, " 0 L ").concat(width, " ").concat(height, "\n            ");
  } else {
    width = Math.abs(spacing / Math.sin(degreesToRadians(rotation)));
    height = spacing / Math.sin(degreesToRadians(90 - rotation));
    if (rotation > 0) {
      path = "\n                    M 0 ".concat(-height, " L ").concat(width * 2, " ").concat(height, "\n                    M ").concat(-width, " ").concat(-height, " L ").concat(width, " ").concat(height, "\n                    M ").concat(-width, " 0 L ").concat(width, " ").concat(height * 2, "\n                ");
    } else {
      path = "\n                    M ".concat(-width, " ").concat(height, " L ").concat(width, " ").concat(-height, "\n                    M ").concat(-width, " ").concat(height * 2, " L ").concat(width * 2, " ").concat(-height, "\n                    M 0 ").concat(height * 2, " L ").concat(width * 2, " 0\n                ");
    }
  }
  return react.createElement("pattern", {
    id: id,
    width: width,
    height: height,
    patternUnits: "userSpaceOnUse"
  }, react.createElement("rect", {
    width: width,
    height: height,
    fill: background,
    stroke: "rgba(255, 0, 0, 0.1)",
    strokeWidth: 0
  }), react.createElement("path", {
    d: path,
    strokeWidth: lineWidth,
    stroke: color,
    strokeLinecap: "square"
  }));
});
PatternLines.displayName = 'PatternLines';
PatternLines.defaultProps = {
  spacing: 5,
  rotation: 0,
  color: '#000000',
  background: '#ffffff',
  lineWidth: 2
};

var PatternSquares = react.memo(function (_ref) {
  var id = _ref.id,
      background = _ref.background,
      color = _ref.color,
      size = _ref.size,
      padding = _ref.padding,
      stagger = _ref.stagger;
  var fullSize = size + padding;
  var halfPadding = padding / 2;
  if (stagger === true) {
    fullSize = size * 2 + padding * 2;
  }
  return react.createElement("pattern", {
    id: id,
    width: fullSize,
    height: fullSize,
    patternUnits: "userSpaceOnUse"
  }, react.createElement("rect", {
    width: fullSize,
    height: fullSize,
    fill: background
  }), react.createElement("rect", {
    x: halfPadding,
    y: halfPadding,
    width: size,
    height: size,
    fill: color
  }), stagger && react.createElement("rect", {
    x: padding * 1.5 + size,
    y: padding * 1.5 + size,
    width: size,
    height: size,
    fill: color
  }));
});
PatternSquares.displayName = 'PatternSquares';
PatternSquares.defaultProps = {
  color: '#000000',
  background: '#ffffff',
  size: 4,
  padding: 4,
  stagger: false
};

var patternTypes = {
  patternDots: PatternDots,
  patternLines: PatternLines,
  patternSquares: PatternSquares
};

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

var defsMapping = _objectSpread2$1(_objectSpread2$1({}, gradientTypes), patternTypes);
var Defs = function Defs(_ref) {
  var definitions = _ref.defs;
  if (!definitions || definitions.length < 1) return null;
  return react.createElement("defs", null, definitions.map(function (_ref2) {
    var type = _ref2.type,
        def = _objectWithoutProperties(_ref2, ["type"]);
    if (defsMapping[type]) return react.createElement(defsMapping[type], _objectSpread2$1({
      key: def.id
    }, def));
    return null;
  }));
};
var Defs$1 = react.memo(Defs);

var SvgWrapper = function SvgWrapper(_ref) {
  var width = _ref.width,
      height = _ref.height,
      margin = _ref.margin,
      defs = _ref.defs,
      children = _ref.children,
      role = _ref.role;
  var theme = useTheme();
  return react.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    role: role,
    width: width,
    height: height
  }, react.createElement(Defs$1, {
    defs: defs
  }), react.createElement("rect", {
    width: width,
    height: height,
    fill: theme.background
  }), react.createElement("g", {
    transform: "translate(".concat(margin.left, ",").concat(margin.top, ")")
  }, children));
};

var DotsItemSymbol = function DotsItemSymbol(_ref) {
  var size = _ref.size,
      color = _ref.color,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor;
  return react.createElement("circle", {
    r: size / 2,
    fill: color,
    stroke: borderColor,
    strokeWidth: borderWidth,
    style: {
      pointerEvents: 'none'
    }
  });
};
var DotsItemSymbol$1 = react.memo(DotsItemSymbol);

var DotsItem = function DotsItem(_ref) {
  var x = _ref.x,
      y = _ref.y,
      symbol = _ref.symbol,
      size = _ref.size,
      datum = _ref.datum,
      color = _ref.color,
      borderWidth = _ref.borderWidth,
      borderColor = _ref.borderColor,
      label = _ref.label,
      labelTextAnchor = _ref.labelTextAnchor,
      labelYOffset = _ref.labelYOffset,
      theme = _ref.theme;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    transform: "translate(".concat(x, ", ").concat(y, ")"),
    config: springConfig,
    immediate: !animate
  });
  return react.createElement(animated.g, {
    transform: animatedProps.transform,
    style: {
      pointerEvents: 'none'
    }
  }, react.createElement(symbol, {
    size: size,
    color: color,
    datum: datum,
    borderWidth: borderWidth,
    borderColor: borderColor
  }), label && react.createElement("text", {
    textAnchor: labelTextAnchor,
    y: labelYOffset,
    style: theme.dots.text
  }, label));
};
var DotsItemDefaultProps = {
  symbol: DotsItemSymbol$1,
  labelTextAnchor: 'middle',
  labelYOffset: -12
};
DotsItem.defaultProps = DotsItemDefaultProps;
react.memo(DotsItem);

var computeLabel = function computeLabel(_ref) {
  var axis = _ref.axis,
      width = _ref.width,
      height = _ref.height,
      position = _ref.position,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      orientation = _ref.orientation;
  var x = 0;
  var y = 0;
  var rotation = orientation === 'vertical' ? -90 : 0;
  var textAnchor = 'start';
  if (axis === 'x') {
    switch (position) {
      case 'top-left':
        x = -offsetX;
        y = offsetY;
        textAnchor = 'end';
        break;
      case 'top':
        y = -offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'middle';
        } else {
          textAnchor = 'start';
        }
        break;
      case 'top-right':
        x = offsetX;
        y = offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'start';
        } else {
          textAnchor = 'end';
        }
        break;
      case 'right':
        x = offsetX;
        y = height / 2;
        if (orientation === 'horizontal') {
          textAnchor = 'start';
        } else {
          textAnchor = 'middle';
        }
        break;
      case 'bottom-right':
        x = offsetX;
        y = height - offsetY;
        textAnchor = 'start';
        break;
      case 'bottom':
        y = height + offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'middle';
        } else {
          textAnchor = 'end';
        }
        break;
      case 'bottom-left':
        y = height - offsetY;
        x = -offsetX;
        if (orientation === 'horizontal') {
          textAnchor = 'end';
        } else {
          textAnchor = 'start';
        }
        break;
      case 'left':
        x = -offsetX;
        y = height / 2;
        if (orientation === 'horizontal') {
          textAnchor = 'end';
        } else {
          textAnchor = 'middle';
        }
        break;
    }
  } else {
    switch (position) {
      case 'top-left':
        x = offsetX;
        y = -offsetY;
        textAnchor = 'start';
        break;
      case 'top':
        x = width / 2;
        y = -offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'middle';
        } else {
          textAnchor = 'start';
        }
        break;
      case 'top-right':
        x = width - offsetX;
        y = -offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'end';
        } else {
          textAnchor = 'start';
        }
        break;
      case 'right':
        x = width + offsetX;
        if (orientation === 'horizontal') {
          textAnchor = 'start';
        } else {
          textAnchor = 'middle';
        }
        break;
      case 'bottom-right':
        x = width - offsetX;
        y = offsetY;
        textAnchor = 'end';
        break;
      case 'bottom':
        x = width / 2;
        y = offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'middle';
        } else {
          textAnchor = 'end';
        }
        break;
      case 'bottom-left':
        x = offsetX;
        y = offsetY;
        if (orientation === 'horizontal') {
          textAnchor = 'start';
        } else {
          textAnchor = 'end';
        }
        break;
      case 'left':
        x = -offsetX;
        if (orientation === 'horizontal') {
          textAnchor = 'end';
        } else {
          textAnchor = 'middle';
        }
        break;
    }
  }
  return {
    x: x,
    y: y,
    rotation: rotation,
    textAnchor: textAnchor
  };
};
var CartesianMarkersItem = function CartesianMarkersItem(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      axis = _ref2.axis,
      scale = _ref2.scale,
      value = _ref2.value,
      lineStyle = _ref2.lineStyle,
      textStyle = _ref2.textStyle,
      legend = _ref2.legend,
      legendPosition = _ref2.legendPosition,
      legendOffsetX = _ref2.legendOffsetX,
      legendOffsetY = _ref2.legendOffsetY,
      legendOrientation = _ref2.legendOrientation;
  var theme = useTheme();
  var x = 0;
  var x2 = 0;
  var y = 0;
  var y2 = 0;
  if (axis === 'y') {
    y = scale(value);
    x2 = width;
  } else {
    x = scale(value);
    y2 = height;
  }
  var legendNode = null;
  if (legend) {
    var legendProps = computeLabel({
      axis: axis,
      width: width,
      height: height,
      position: legendPosition,
      offsetX: legendOffsetX,
      offsetY: legendOffsetY,
      orientation: legendOrientation
    });
    legendNode = react.createElement("text", {
      transform: "translate(".concat(legendProps.x, ", ").concat(legendProps.y, ") rotate(").concat(legendProps.rotation, ")"),
      textAnchor: legendProps.textAnchor,
      dominantBaseline: "central",
      style: textStyle
    }, legend);
  }
  return react.createElement("g", {
    transform: "translate(".concat(x, ", ").concat(y, ")")
  }, react.createElement("line", {
    x1: 0,
    x2: x2,
    y1: 0,
    y2: y2,
    stroke: theme.markers.lineColor,
    strokeWidth: theme.markers.lineStrokeWidth,
    style: lineStyle
  }), legendNode);
};
CartesianMarkersItem.defaultProps = {
  legendPosition: 'top-right',
  legendOffsetX: 14,
  legendOffsetY: 14,
  legendOrientation: 'horizontal'
};
var CartesianMarkersItem$1 = react.memo(CartesianMarkersItem);

var CartesianMarkers = function CartesianMarkers(_ref) {
  var markers = _ref.markers,
      width = _ref.width,
      height = _ref.height,
      xScale = _ref.xScale,
      yScale = _ref.yScale;
  if (!markers || markers.length === 0) return null;
  return markers.map(function (marker, i) {
    return react.createElement(CartesianMarkersItem$1, Object.assign({
      key: i
    }, marker, {
      width: width,
      height: height,
      scale: marker.axis === 'y' ? yScale : xScale
    }));
  });
};
react.memo(CartesianMarkers);

function localDate$1(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
    date.setFullYear(d.y);
    return date;
  }
  return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}

function utcDate$1(d) {
  if (0 <= d.y && d.y < 100) {
    var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
    date.setUTCFullYear(d.y);
    return date;
  }
  return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}

function newDate$1(y, m, d) {
  return {y: y, m: m, d: d, H: 0, M: 0, S: 0, L: 0};
}

function formatLocale$2(locale) {
  var locale_dateTime = locale.dateTime,
      locale_date = locale.date,
      locale_time = locale.time,
      locale_periods = locale.periods,
      locale_weekdays = locale.days,
      locale_shortWeekdays = locale.shortDays,
      locale_months = locale.months,
      locale_shortMonths = locale.shortMonths;

  var periodRe = formatRe$1(locale_periods),
      periodLookup = formatLookup$1(locale_periods),
      weekdayRe = formatRe$1(locale_weekdays),
      weekdayLookup = formatLookup$1(locale_weekdays),
      shortWeekdayRe = formatRe$1(locale_shortWeekdays),
      shortWeekdayLookup = formatLookup$1(locale_shortWeekdays),
      monthRe = formatRe$1(locale_months),
      monthLookup = formatLookup$1(locale_months),
      shortMonthRe = formatRe$1(locale_shortMonths),
      shortMonthLookup = formatLookup$1(locale_shortMonths);

  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth$1,
    "e": formatDayOfMonth$1,
    "f": formatMicroseconds$1,
    "g": formatYearISO$1,
    "G": formatFullYearISO$1,
    "H": formatHour24$1,
    "I": formatHour12$1,
    "j": formatDayOfYear$1,
    "L": formatMilliseconds$1,
    "m": formatMonthNumber$1,
    "M": formatMinutes$1,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp$1,
    "s": formatUnixTimestampSeconds$1,
    "S": formatSeconds$1,
    "u": formatWeekdayNumberMonday$1,
    "U": formatWeekNumberSunday$1,
    "V": formatWeekNumberISO$1,
    "w": formatWeekdayNumberSunday$1,
    "W": formatWeekNumberMonday$1,
    "x": null,
    "X": null,
    "y": formatYear$1,
    "Y": formatFullYear$1,
    "Z": formatZone$1,
    "%": formatLiteralPercent$1
  };

  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth$1,
    "e": formatUTCDayOfMonth$1,
    "f": formatUTCMicroseconds$1,
    "g": formatUTCYearISO$1,
    "G": formatUTCFullYearISO$1,
    "H": formatUTCHour24$1,
    "I": formatUTCHour12$1,
    "j": formatUTCDayOfYear$1,
    "L": formatUTCMilliseconds$1,
    "m": formatUTCMonthNumber$1,
    "M": formatUTCMinutes$1,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp$1,
    "s": formatUnixTimestampSeconds$1,
    "S": formatUTCSeconds$1,
    "u": formatUTCWeekdayNumberMonday$1,
    "U": formatUTCWeekNumberSunday$1,
    "V": formatUTCWeekNumberISO$1,
    "w": formatUTCWeekdayNumberSunday$1,
    "W": formatUTCWeekNumberMonday$1,
    "x": null,
    "X": null,
    "y": formatUTCYear$1,
    "Y": formatUTCFullYear$1,
    "Z": formatUTCZone$1,
    "%": formatLiteralPercent$1
  };

  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth$1,
    "e": parseDayOfMonth$1,
    "f": parseMicroseconds$1,
    "g": parseYear$1,
    "G": parseFullYear$1,
    "H": parseHour24$1,
    "I": parseHour24$1,
    "j": parseDayOfYear$1,
    "L": parseMilliseconds$1,
    "m": parseMonthNumber$1,
    "M": parseMinutes$1,
    "p": parsePeriod,
    "q": parseQuarter$1,
    "Q": parseUnixTimestamp$1,
    "s": parseUnixTimestampSeconds$1,
    "S": parseSeconds$1,
    "u": parseWeekdayNumberMonday$1,
    "U": parseWeekNumberSunday$1,
    "V": parseWeekNumberISO$1,
    "w": parseWeekdayNumberSunday$1,
    "W": parseWeekNumberMonday$1,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear$1,
    "Y": parseFullYear$1,
    "Z": parseZone$1,
    "%": parseLiteralPercent$1
  };

  // These recursive directive definitions must be deferred.
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);

  function newFormat(specifier, formats) {
    return function(date) {
      var string = [],
          i = -1,
          j = 0,
          n = specifier.length,
          c,
          pad,
          format;

      if (!(date instanceof Date)) date = new Date(+date);

      while (++i < n) {
        if (specifier.charCodeAt(i) === 37) {
          string.push(specifier.slice(j, i));
          if ((pad = pads$1[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
          else pad = c === "e" ? " " : "0";
          if (format = formats[c]) c = format(date, pad);
          string.push(c);
          j = i + 1;
        }
      }

      string.push(specifier.slice(j, i));
      return string.join("");
    };
  }

  function newParse(specifier, Z) {
    return function(string) {
      var d = newDate$1(1900, undefined, 1),
          i = parseSpecifier(d, specifier, string += "", 0),
          week, day$1;
      if (i != string.length) return null;

      // If a UNIX timestamp is specified, return it.
      if ("Q" in d) return new Date(d.Q);
      if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));

      // If this is utcParse, never use the local timezone.
      if (Z && !("Z" in d)) d.Z = 0;

      // The am-pm flag is 0 for AM, and 1 for PM.
      if ("p" in d) d.H = d.H % 12 + d.p * 12;

      // If the month was not specified, inherit from the quarter.
      if (d.m === undefined) d.m = "q" in d ? d.q : 0;

      // Convert day-of-week and week-of-year to day-of-year.
      if ("V" in d) {
        if (d.V < 1 || d.V > 53) return null;
        if (!("w" in d)) d.w = 1;
        if ("Z" in d) {
          week = utcDate$1(newDate$1(d.y, 0, 1)), day$1 = week.getUTCDay();
          week = day$1 > 4 || day$1 === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d.V - 1) * 7);
          d.y = week.getUTCFullYear();
          d.m = week.getUTCMonth();
          d.d = week.getUTCDate() + (d.w + 6) % 7;
        } else {
          week = localDate$1(newDate$1(d.y, 0, 1)), day$1 = week.getDay();
          week = day$1 > 4 || day$1 === 0 ? monday.ceil(week) : monday(week);
          week = day.offset(week, (d.V - 1) * 7);
          d.y = week.getFullYear();
          d.m = week.getMonth();
          d.d = week.getDate() + (d.w + 6) % 7;
        }
      } else if ("W" in d || "U" in d) {
        if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
        day$1 = "Z" in d ? utcDate$1(newDate$1(d.y, 0, 1)).getUTCDay() : localDate$1(newDate$1(d.y, 0, 1)).getDay();
        d.m = 0;
        d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day$1 + 5) % 7 : d.w + d.U * 7 - (day$1 + 6) % 7;
      }

      // If a time zone is specified, all fields are interpreted as UTC and then
      // offset according to the specified time zone.
      if ("Z" in d) {
        d.H += d.Z / 100 | 0;
        d.M += d.Z % 100;
        return utcDate$1(d);
      }

      // Otherwise, all fields are in local time.
      return localDate$1(d);
    };
  }

  function parseSpecifier(d, specifier, string, j) {
    var i = 0,
        n = specifier.length,
        m = string.length,
        c,
        parse;

    while (i < n) {
      if (j >= m) return -1;
      c = specifier.charCodeAt(i++);
      if (c === 37) {
        c = specifier.charAt(i++);
        parse = parses[c in pads$1 ? specifier.charAt(i++) : c];
        if (!parse || ((j = parse(d, string, j)) < 0)) return -1;
      } else if (c != string.charCodeAt(j++)) {
        return -1;
      }
    }

    return j;
  }

  function parsePeriod(d, string, i) {
    var n = periodRe.exec(string.slice(i));
    return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortWeekday(d, string, i) {
    var n = shortWeekdayRe.exec(string.slice(i));
    return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseWeekday(d, string, i) {
    var n = weekdayRe.exec(string.slice(i));
    return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseShortMonth(d, string, i) {
    var n = shortMonthRe.exec(string.slice(i));
    return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseMonth(d, string, i) {
    var n = monthRe.exec(string.slice(i));
    return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
  }

  function parseLocaleDateTime(d, string, i) {
    return parseSpecifier(d, locale_dateTime, string, i);
  }

  function parseLocaleDate(d, string, i) {
    return parseSpecifier(d, locale_date, string, i);
  }

  function parseLocaleTime(d, string, i) {
    return parseSpecifier(d, locale_time, string, i);
  }

  function formatShortWeekday(d) {
    return locale_shortWeekdays[d.getDay()];
  }

  function formatWeekday(d) {
    return locale_weekdays[d.getDay()];
  }

  function formatShortMonth(d) {
    return locale_shortMonths[d.getMonth()];
  }

  function formatMonth(d) {
    return locale_months[d.getMonth()];
  }

  function formatPeriod(d) {
    return locale_periods[+(d.getHours() >= 12)];
  }

  function formatQuarter(d) {
    return 1 + ~~(d.getMonth() / 3);
  }

  function formatUTCShortWeekday(d) {
    return locale_shortWeekdays[d.getUTCDay()];
  }

  function formatUTCWeekday(d) {
    return locale_weekdays[d.getUTCDay()];
  }

  function formatUTCShortMonth(d) {
    return locale_shortMonths[d.getUTCMonth()];
  }

  function formatUTCMonth(d) {
    return locale_months[d.getUTCMonth()];
  }

  function formatUTCPeriod(d) {
    return locale_periods[+(d.getUTCHours() >= 12)];
  }

  function formatUTCQuarter(d) {
    return 1 + ~~(d.getUTCMonth() / 3);
  }

  return {
    format: function(specifier) {
      var f = newFormat(specifier += "", formats);
      f.toString = function() { return specifier; };
      return f;
    },
    parse: function(specifier) {
      var p = newParse(specifier += "", false);
      p.toString = function() { return specifier; };
      return p;
    },
    utcFormat: function(specifier) {
      var f = newFormat(specifier += "", utcFormats);
      f.toString = function() { return specifier; };
      return f;
    },
    utcParse: function(specifier) {
      var p = newParse(specifier += "", true);
      p.toString = function() { return specifier; };
      return p;
    }
  };
}

var pads$1 = {"-": "", "_": " ", "0": "0"},
    numberRe$1 = /^\s*\d+/, // note: ignores next directive
    percentRe$1 = /^%/,
    requoteRe$1 = /[\\^$*+?|[\]().{}]/g;

function pad$1(value, fill, width) {
  var sign = value < 0 ? "-" : "",
      string = (sign ? -value : value) + "",
      length = string.length;
  return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}

function requote$1(s) {
  return s.replace(requoteRe$1, "\\$&");
}

function formatRe$1(names) {
  return new RegExp("^(?:" + names.map(requote$1).join("|") + ")", "i");
}

function formatLookup$1(names) {
  var map = {}, i = -1, n = names.length;
  while (++i < n) map[names[i].toLowerCase()] = i;
  return map;
}

function parseWeekdayNumberSunday$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 1));
  return n ? (d.w = +n[0], i + n[0].length) : -1;
}

function parseWeekdayNumberMonday$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 1));
  return n ? (d.u = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberSunday$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.U = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberISO$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.V = +n[0], i + n[0].length) : -1;
}

function parseWeekNumberMonday$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.W = +n[0], i + n[0].length) : -1;
}

function parseFullYear$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 4));
  return n ? (d.y = +n[0], i + n[0].length) : -1;
}

function parseYear$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}

function parseZone$1(d, string, i) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
  return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}

function parseQuarter$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 1));
  return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}

function parseMonthNumber$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}

function parseDayOfMonth$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.d = +n[0], i + n[0].length) : -1;
}

function parseDayOfYear$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 3));
  return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}

function parseHour24$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.H = +n[0], i + n[0].length) : -1;
}

function parseMinutes$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.M = +n[0], i + n[0].length) : -1;
}

function parseSeconds$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 2));
  return n ? (d.S = +n[0], i + n[0].length) : -1;
}

function parseMilliseconds$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 3));
  return n ? (d.L = +n[0], i + n[0].length) : -1;
}

function parseMicroseconds$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i, i + 6));
  return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}

function parseLiteralPercent$1(d, string, i) {
  var n = percentRe$1.exec(string.slice(i, i + 1));
  return n ? i + n[0].length : -1;
}

function parseUnixTimestamp$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i));
  return n ? (d.Q = +n[0], i + n[0].length) : -1;
}

function parseUnixTimestampSeconds$1(d, string, i) {
  var n = numberRe$1.exec(string.slice(i));
  return n ? (d.s = +n[0], i + n[0].length) : -1;
}

function formatDayOfMonth$1(d, p) {
  return pad$1(d.getDate(), p, 2);
}

function formatHour24$1(d, p) {
  return pad$1(d.getHours(), p, 2);
}

function formatHour12$1(d, p) {
  return pad$1(d.getHours() % 12 || 12, p, 2);
}

function formatDayOfYear$1(d, p) {
  return pad$1(1 + day.count(year(d), d), p, 3);
}

function formatMilliseconds$1(d, p) {
  return pad$1(d.getMilliseconds(), p, 3);
}

function formatMicroseconds$1(d, p) {
  return formatMilliseconds$1(d, p) + "000";
}

function formatMonthNumber$1(d, p) {
  return pad$1(d.getMonth() + 1, p, 2);
}

function formatMinutes$1(d, p) {
  return pad$1(d.getMinutes(), p, 2);
}

function formatSeconds$1(d, p) {
  return pad$1(d.getSeconds(), p, 2);
}

function formatWeekdayNumberMonday$1(d) {
  var day = d.getDay();
  return day === 0 ? 7 : day;
}

function formatWeekNumberSunday$1(d, p) {
  return pad$1(sunday.count(year(d) - 1, d), p, 2);
}

function dISO$1(d) {
  var day = d.getDay();
  return (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
}

function formatWeekNumberISO$1(d, p) {
  d = dISO$1(d);
  return pad$1(thursday.count(year(d), d) + (year(d).getDay() === 4), p, 2);
}

function formatWeekdayNumberSunday$1(d) {
  return d.getDay();
}

function formatWeekNumberMonday$1(d, p) {
  return pad$1(monday.count(year(d) - 1, d), p, 2);
}

function formatYear$1(d, p) {
  return pad$1(d.getFullYear() % 100, p, 2);
}

function formatYearISO$1(d, p) {
  d = dISO$1(d);
  return pad$1(d.getFullYear() % 100, p, 2);
}

function formatFullYear$1(d, p) {
  return pad$1(d.getFullYear() % 10000, p, 4);
}

function formatFullYearISO$1(d, p) {
  var day = d.getDay();
  d = (day >= 4 || day === 0) ? thursday(d) : thursday.ceil(d);
  return pad$1(d.getFullYear() % 10000, p, 4);
}

function formatZone$1(d) {
  var z = d.getTimezoneOffset();
  return (z > 0 ? "-" : (z *= -1, "+"))
      + pad$1(z / 60 | 0, "0", 2)
      + pad$1(z % 60, "0", 2);
}

function formatUTCDayOfMonth$1(d, p) {
  return pad$1(d.getUTCDate(), p, 2);
}

function formatUTCHour24$1(d, p) {
  return pad$1(d.getUTCHours(), p, 2);
}

function formatUTCHour12$1(d, p) {
  return pad$1(d.getUTCHours() % 12 || 12, p, 2);
}

function formatUTCDayOfYear$1(d, p) {
  return pad$1(1 + utcDay.count(utcYear(d), d), p, 3);
}

function formatUTCMilliseconds$1(d, p) {
  return pad$1(d.getUTCMilliseconds(), p, 3);
}

function formatUTCMicroseconds$1(d, p) {
  return formatUTCMilliseconds$1(d, p) + "000";
}

function formatUTCMonthNumber$1(d, p) {
  return pad$1(d.getUTCMonth() + 1, p, 2);
}

function formatUTCMinutes$1(d, p) {
  return pad$1(d.getUTCMinutes(), p, 2);
}

function formatUTCSeconds$1(d, p) {
  return pad$1(d.getUTCSeconds(), p, 2);
}

function formatUTCWeekdayNumberMonday$1(d) {
  var dow = d.getUTCDay();
  return dow === 0 ? 7 : dow;
}

function formatUTCWeekNumberSunday$1(d, p) {
  return pad$1(utcSunday.count(utcYear(d) - 1, d), p, 2);
}

function UTCdISO$1(d) {
  var day = d.getUTCDay();
  return (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
}

function formatUTCWeekNumberISO$1(d, p) {
  d = UTCdISO$1(d);
  return pad$1(utcThursday.count(utcYear(d), d) + (utcYear(d).getUTCDay() === 4), p, 2);
}

function formatUTCWeekdayNumberSunday$1(d) {
  return d.getUTCDay();
}

function formatUTCWeekNumberMonday$1(d, p) {
  return pad$1(utcMonday.count(utcYear(d) - 1, d), p, 2);
}

function formatUTCYear$1(d, p) {
  return pad$1(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCYearISO$1(d, p) {
  d = UTCdISO$1(d);
  return pad$1(d.getUTCFullYear() % 100, p, 2);
}

function formatUTCFullYear$1(d, p) {
  return pad$1(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCFullYearISO$1(d, p) {
  var day = d.getUTCDay();
  d = (day >= 4 || day === 0) ? utcThursday(d) : utcThursday.ceil(d);
  return pad$1(d.getUTCFullYear() % 10000, p, 4);
}

function formatUTCZone$1() {
  return "+0000";
}

function formatLiteralPercent$1() {
  return "%";
}

function formatUnixTimestamp$1(d) {
  return +d;
}

function formatUnixTimestampSeconds$1(d) {
  return Math.floor(+d / 1000);
}

var locale$2;
var timeFormat$1;

defaultLocale$2({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});

function defaultLocale$2(definition) {
  locale$2 = formatLocale$2(definition);
  timeFormat$1 = locale$2.format;
  locale$2.parse;
  locale$2.utcFormat;
  locale$2.utcParse;
  return locale$2;
}

function formatDecimal$1(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts$1(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent$1(x) {
  return x = formatDecimalParts$1(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup$1(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals$1(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re$1 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier$1(specifier) {
  if (!(match = re$1.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier$1({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier$1.prototype = FormatSpecifier$1.prototype; // instanceof

function FormatSpecifier$1(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier$1.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim$1(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent$1;

function formatPrefixAuto$1(x, p) {
  var d = formatDecimalParts$1(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent$1 = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts$1(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded$1(x, p) {
  var d = formatDecimalParts$1(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes$1 = {
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": formatDecimal$1,
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded$1(x * 100, p); },
  "r": formatRounded$1,
  "s": formatPrefixAuto$1,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
};

function identity$1(x) {
  return x;
}

var map$1 = Array.prototype.map,
    prefixes$2 = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale$3(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup$1(map$1.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$1 : formatNumerals$1(map$1.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "-" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier$1(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes$1[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes$1[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim$1(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes$2[8 + prefixExponent$1 / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier$1(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent$1(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes$2[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale$3;
var format$1;

defaultLocale$3({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});

function defaultLocale$3(definition) {
  locale$3 = formatLocale$3(definition);
  format$1 = locale$3.format;
  locale$3.formatPrefix;
  return locale$3;
}

function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$2(Object(source), true).forEach(function (key) {
        _defineProperty$2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var centerScale = function centerScale(scale) {
  var bandwidth = scale.bandwidth();
  if (bandwidth === 0) return scale;
  var offset = bandwidth / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return function (d) {
    return scale(d) + offset;
  };
};
var timeByType = {
  millisecond: [millisecond, millisecond],
  second: [second, second],
  minute: [minute, utcMinute],
  hour: [hour, utcHour],
  day: [day, utcDay],
  week: [sunday, utcSunday],
  sunday: [sunday, utcSunday],
  monday: [monday, utcMonday],
  tuesday: [tuesday, utcTuesday],
  wednesday: [wednesday, utcWednesday],
  thursday: [thursday, utcThursday],
  friday: [friday, utcFriday],
  saturday: [saturday, utcSaturday],
  month: [month, utcMonth],
  year: [year, utcYear]
};
var timeTypes = Object.keys(timeByType);
var timeIntervalRegexp = new RegExp("^every\\s*(\\d+)?\\s*(".concat(timeTypes.join('|'), ")s?$"), 'i');
var isInteger = function isInteger(value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};
var getScaleTicks = function getScaleTicks(scale, spec) {
  if (Array.isArray(spec)) {
    return spec;
  }
  if (scale.ticks) {
    if (spec === undefined) {
      return scale.ticks();
    }
    if (isInteger(spec)) {
      return scale.ticks(spec);
    }
    if (typeof spec === 'string') {
      var matches = spec.match(timeIntervalRegexp);
      if (matches) {
        var timeType = timeByType[matches[2]][scale.useUTC ? 1 : 0];
        if (matches[1] === undefined) {
          return scale.ticks(timeType);
        }
        return scale.ticks(timeType.every(Number(matches[1])));
      }
      throw new Error("Invalid tickValues: ".concat(spec));
    }
  }
  return scale.domain();
};
var computeCartesianTicks = function computeCartesianTicks(_ref) {
  var axis = _ref.axis,
      scale = _ref.scale,
      ticksPosition = _ref.ticksPosition,
      tickValues = _ref.tickValues,
      tickSize = _ref.tickSize,
      tickPadding = _ref.tickPadding,
      tickRotation = _ref.tickRotation,
      _ref$engine = _ref.engine,
      engine = _ref$engine === void 0 ? 'svg' : _ref$engine;
  var values = getScaleTicks(scale, tickValues);
  var textProps = textPropsByEngine[engine];
  var position = scale.bandwidth ? centerScale(scale) : scale;
  var line = {
    lineX: 0,
    lineY: 0
  };
  var text = {
    textX: 0,
    textY: 0
  };
  var translate;
  var textAlign = textProps.align.center;
  var textBaseline = textProps.baseline.center;
  if (axis === 'x') {
    translate = function translate(d) {
      return {
        x: position(d),
        y: 0
      };
    };
    line.lineY = tickSize * (ticksPosition === 'after' ? 1 : -1);
    text.textY = (tickSize + tickPadding) * (ticksPosition === 'after' ? 1 : -1);
    if (ticksPosition === 'after') {
      textBaseline = textProps.baseline.top;
    } else {
      textBaseline = textProps.baseline.bottom;
    }
    if (tickRotation === 0) {
      textAlign = textProps.align.center;
    } else if (ticksPosition === 'after' && tickRotation < 0 || ticksPosition === 'before' && tickRotation > 0) {
      textAlign = textProps.align.right;
      textBaseline = textProps.baseline.center;
    } else if (ticksPosition === 'after' && tickRotation > 0 || ticksPosition === 'before' && tickRotation < 0) {
      textAlign = textProps.align.left;
      textBaseline = textProps.baseline.center;
    }
  } else {
    translate = function translate(d) {
      return {
        x: 0,
        y: position(d)
      };
    };
    line.lineX = tickSize * (ticksPosition === 'after' ? 1 : -1);
    text.textX = (tickSize + tickPadding) * (ticksPosition === 'after' ? 1 : -1);
    if (ticksPosition === 'after') {
      textAlign = textProps.align.left;
    } else {
      textAlign = textProps.align.right;
    }
  }
  var ticks = values.map(function (value) {
    return _objectSpread2$2(_objectSpread2$2(_objectSpread2$2({
      key: value,
      value: value
    }, translate(value)), line), text);
  });
  return {
    ticks: ticks,
    textAlign: textAlign,
    textBaseline: textBaseline
  };
};
var getFormatter = function getFormatter(format$1$1, scale) {
  if (!format$1$1 || typeof format$1$1 === 'function') return format$1$1;
  if (scale.type === 'time') {
    var f = timeFormat$1(format$1$1);
    return function (d) {
      return f(new Date(d));
    };
  }
  return format$1(format$1$1);
};
var computeGridLines = function computeGridLines(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      scale = _ref2.scale,
      axis = _ref2.axis,
      _values = _ref2.values;
  var lineValues = Array.isArray(_values) ? _values : undefined;
  var lineCount = isInteger(_values) ? _values : undefined;
  var values = lineValues || getScaleTicks(scale, lineCount);
  var position = scale.bandwidth ? centerScale(scale) : scale;
  var lines;
  if (axis === 'x') {
    lines = values.map(function (v) {
      return {
        key: "".concat(v),
        x1: position(v),
        x2: position(v),
        y1: 0,
        y2: height
      };
    });
  } else if (axis === 'y') {
    lines = values.map(function (v) {
      return {
        key: "".concat(v),
        x1: 0,
        x2: width,
        y1: position(v),
        y2: position(v)
      };
    });
  }
  return lines;
};

var axisPropTypes = {
  ticksPosition: propTypes.oneOf(['before', 'after']),
  tickValues: propTypes.oneOfType([propTypes.number, propTypes.arrayOf(propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.instanceOf(Date)])), propTypes.string]),
  tickSize: propTypes.number,
  tickPadding: propTypes.number,
  tickRotation: propTypes.number,
  format: propTypes.oneOfType([propTypes.func, propTypes.string]),
  renderTick: propTypes.func,
  legend: propTypes.node,
  legendPosition: propTypes.oneOf(['start', 'middle', 'end']),
  legendOffset: propTypes.number,
  ariaHidden: propTypes.bool
};
propTypes.shape(axisPropTypes);

var AxisTick = function AxisTick(_ref) {
  var _value = _ref.value,
      format = _ref.format,
      lineX = _ref.lineX,
      lineY = _ref.lineY,
      _onClick = _ref.onClick,
      textBaseline = _ref.textBaseline,
      textAnchor = _ref.textAnchor,
      animatedProps = _ref.animatedProps;
  var theme = useTheme();
  var value = _value;
  if (format !== undefined) {
    value = format(value);
  }
  var gStyle = {
    opacity: animatedProps.opacity
  };
  if (_onClick) {
    gStyle['cursor'] = 'pointer';
  }
  return react.createElement(animated.g, Object.assign({
    transform: animatedProps.transform
  }, _onClick ? {
    onClick: function onClick(e) {
      return _onClick(e, value);
    }
  } : {}, {
    style: gStyle
  }), react.createElement("line", {
    x1: 0,
    x2: lineX,
    y1: 0,
    y2: lineY,
    style: theme.axis.ticks.line
  }), react.createElement(animated.text, {
    dominantBaseline: textBaseline,
    textAnchor: textAnchor,
    transform: animatedProps.textTransform,
    style: theme.axis.ticks.text
  }, value));
};
AxisTick.defaultProps = {
  opacity: 1,
  rotate: 0
};
var AxisTick$1 = react.memo(AxisTick);

var defaultTickRenderer = function defaultTickRenderer(props) {
  return react.createElement(AxisTick$1, props);
};
var Axis = function Axis(_ref) {
  var axis = _ref.axis,
      scale = _ref.scale,
      x = _ref.x,
      y = _ref.y,
      length = _ref.length,
      ticksPosition = _ref.ticksPosition,
      tickValues = _ref.tickValues,
      tickSize = _ref.tickSize,
      tickPadding = _ref.tickPadding,
      tickRotation = _ref.tickRotation,
      format = _ref.format,
      renderTick = _ref.renderTick,
      legend = _ref.legend,
      legendPosition = _ref.legendPosition,
      legendOffset = _ref.legendOffset,
      onClick = _ref.onClick,
      ariaHidden = _ref.ariaHidden;
  var theme = useTheme();
  var formatValue = react.useMemo(function () {
    return getFormatter(format, scale);
  }, [format, scale]);
  var _computeCartesianTick = computeCartesianTicks({
    axis: axis,
    scale: scale,
    ticksPosition: ticksPosition,
    tickValues: tickValues,
    tickSize: tickSize,
    tickPadding: tickPadding,
    tickRotation: tickRotation
  }),
      ticks = _computeCartesianTick.ticks,
      textAlign = _computeCartesianTick.textAlign,
      textBaseline = _computeCartesianTick.textBaseline;
  var legendNode = null;
  if (legend !== undefined) {
    var legendX = 0;
    var legendY = 0;
    var legendRotation = 0;
    var textAnchor;
    if (axis === 'y') {
      legendRotation = -90;
      legendX = legendOffset;
      if (legendPosition === 'start') {
        textAnchor = 'start';
        legendY = length;
      } else if (legendPosition === 'middle') {
        textAnchor = 'middle';
        legendY = length / 2;
      } else if (legendPosition === 'end') {
        textAnchor = 'end';
      }
    } else {
      legendY = legendOffset;
      if (legendPosition === 'start') {
        textAnchor = 'start';
      } else if (legendPosition === 'middle') {
        textAnchor = 'middle';
        legendX = length / 2;
      } else if (legendPosition === 'end') {
        textAnchor = 'end';
        legendX = length;
      }
    }
    legendNode = react.createElement("text", {
      transform: "translate(".concat(legendX, ", ").concat(legendY, ") rotate(").concat(legendRotation, ")"),
      textAnchor: textAnchor,
      style: _objectSpread2$2({
        dominantBaseline: 'central'
      }, theme.axis.legend.text)
    }, legend);
  }
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var animatedProps = useSpring({
    transform: "translate(".concat(x, ",").concat(y, ")"),
    lineX2: axis === 'x' ? length : 0,
    lineY2: axis === 'x' ? 0 : length,
    config: springConfig,
    immediate: !animate
  });
  var transition = useTransition(ticks, {
    key: function key(tick) {
      return tick.key;
    },
    initial: function initial(tick) {
      return {
        opacity: 1,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    from: function from(tick) {
      return {
        opacity: 0,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    enter: function enter(tick) {
      return {
        opacity: 1,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    update: function update(tick) {
      return {
        opacity: 1,
        transform: "translate(".concat(tick.x, ",").concat(tick.y, ")"),
        textTransform: "translate(".concat(tick.textX, ",").concat(tick.textY, ") rotate(").concat(tickRotation, ")")
      };
    },
    leave: {
      opacity: 0
    },
    config: springConfig,
    immediate: !animate
  });
  return react.createElement(animated.g, {
    transform: animatedProps.transform,
    "aria-hidden": ariaHidden
  }, transition(function (transitionProps, tick, state, tickIndex) {
    return react.createElement(renderTick, _objectSpread2$2(_objectSpread2$2(_objectSpread2$2({
      tickIndex: tickIndex,
      format: formatValue,
      rotate: tickRotation,
      textBaseline: textBaseline,
      textAnchor: textAlign,
      animatedProps: transitionProps
    }, tick), onClick ? {
      onClick: onClick
    } : {}), {}, {
      key: tick.key
    }));
  }), react.createElement(animated.line, {
    style: theme.axis.domain.line,
    x1: 0,
    x2: animatedProps.lineX2,
    y1: 0,
    y2: animatedProps.lineY2
  }), legendNode);
};
Axis.defaultProps = {
  x: 0,
  y: 0,
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  renderTick: defaultTickRenderer,
  legendPosition: 'end',
  legendOffset: 0
};
var Axis$1 = react.memo(Axis);

var positions = ['top', 'right', 'bottom', 'left'];
var Axes = function Axes(_ref) {
  var xScale = _ref.xScale,
      yScale = _ref.yScale,
      width = _ref.width,
      height = _ref.height,
      top = _ref.top,
      right = _ref.right,
      bottom = _ref.bottom,
      left = _ref.left;
  var axes = {
    top: top,
    right: right,
    bottom: bottom,
    left: left
  };
  return positions.map(function (position) {
    var axis = axes[position];
    if (!axis) return null;
    var isXAxis = position === 'top' || position === 'bottom';
    var ticksPosition = position === 'top' || position === 'left' ? 'before' : 'after';
    return react.createElement(Axis$1, Object.assign({
      key: position
    }, axis, {
      axis: isXAxis ? 'x' : 'y',
      x: position === 'right' ? width : 0,
      y: position === 'bottom' ? height : 0,
      scale: isXAxis ? xScale : yScale,
      length: isXAxis ? width : height,
      ticksPosition: ticksPosition
    }));
  });
};
react.memo(Axes);

var GridLine = function GridLine(_ref) {
  var animatedProps = _ref.animatedProps;
  var theme = useTheme();
  return react.createElement(animated.line, Object.assign({}, animatedProps, theme.grid.line));
};
GridLine.defaultProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0
};
var GridLine$1 = react.memo(GridLine);

var GridLines = function GridLines(_ref) {
  var lines = _ref.lines;
  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;
  var transition = useTransition(lines, {
    key: function key(line) {
      return line.key;
    },
    initial: function initial(line) {
      return {
        opacity: 1,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    from: function from(line) {
      return {
        opacity: 0,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    enter: function enter(line) {
      return {
        opacity: 1,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    update: function update(line) {
      return {
        opacity: 1,
        x1: line.x1,
        x2: line.x2,
        y1: line.y1,
        y2: line.y2
      };
    },
    leave: {
      opacity: 0
    },
    config: springConfig,
    immediate: !animate
  });
  return react.createElement("g", null, transition(function (animatedProps, line) {
    return react.createElement(GridLine$1, Object.assign({}, line, {
      key: line.key,
      animatedProps: animatedProps
    }));
  }));
};
var GridLines$1 = react.memo(GridLines);

var Grid = function Grid(_ref) {
  var width = _ref.width,
      height = _ref.height,
      xScale = _ref.xScale,
      yScale = _ref.yScale,
      xValues = _ref.xValues,
      yValues = _ref.yValues;
  var xLines = react.useMemo(function () {
    if (!xScale) return false;
    return computeGridLines({
      width: width,
      height: height,
      scale: xScale,
      axis: 'x',
      values: xValues
    });
  }, [xScale, xValues, width, height]);
  var yLines = yScale ? computeGridLines({
    width: width,
    height: height,
    scale: yScale,
    axis: 'y',
    values: yValues
  }) : false;
  return react.createElement(react.Fragment, null, xLines && react.createElement(GridLines$1, {
    type: "x",
    lines: xLines
  }), yLines && react.createElement(GridLines$1, {
    type: "y",
    lines: yLines
  }));
};
react.memo(Grid);

function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$3(Object(source), true).forEach(function (key) {
        _defineProperty$3(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var BulletMarkersItem = function BulletMarkersItem(_ref) {
  var _ref$animatedProps = _ref.animatedProps,
      color = _ref$animatedProps.color,
      transform = _ref$animatedProps.transform,
      x = _ref$animatedProps.x,
      y1 = _ref$animatedProps.y1,
      y2 = _ref$animatedProps.y2,
      data = _ref.data,
      _onMouseEnter = _ref.onMouseEnter,
      _onMouseMove = _ref.onMouseMove,
      _onMouseLeave = _ref.onMouseLeave,
      _onClick = _ref.onClick;
  return react.createElement(animated.line, {
    transform: transform,
    x1: x,
    x2: x,
    y1: y1,
    y2: y2,
    fill: "none",
    stroke: color,
    strokeWidth: "5",
    onMouseMove: function onMouseMove(event) {
      return _onMouseMove(data, event);
    },
    onMouseEnter: function onMouseEnter(event) {
      return _onMouseEnter(data, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return _onMouseLeave(data, event);
    },
    onClick: function onClick(event) {
      return _onClick(data, event);
    }
  });
};

var BulletRectsItem = function BulletRectsItem(_ref) {
  var _ref$animatedProps = _ref.animatedProps,
      x = _ref$animatedProps.x,
      y = _ref$animatedProps.y,
      width = _ref$animatedProps.width,
      height = _ref$animatedProps.height,
      color = _ref$animatedProps.color,
      data = _ref.data,
      _onMouseEnter = _ref.onMouseEnter,
      _onMouseMove = _ref.onMouseMove,
      _onMouseLeave = _ref.onMouseLeave,
      _onClick = _ref.onClick;
  return react.createElement(animated.rect, {
    x: x,
    y: y,
    width: to$1(width, function (value) {
      return Math.max(value, 0);
    }),
    height: to$1(height, function (value) {
      return Math.max(value, 0);
    }),
    fill: color,
    onMouseMove: function onMouseMove(event) {
      return _onMouseMove(data, event);
    },
    onMouseEnter: function onMouseEnter(event) {
      return _onMouseEnter(data, event);
    },
    onMouseLeave: function onMouseLeave(event) {
      return _onMouseLeave(data, event);
    },
    onClick: function onClick(event) {
      return _onClick(data, event);
    }
  });
};

var defaultProps = {
  layout: 'horizontal',
  reverse: false,
  spacing: 30,
  axisPosition: 'after',
  titlePosition: 'before',
  titleAlign: 'middle',
  titleRotation: 0,
  titleOffsetX: 0,
  titleOffsetY: 0,
  rangeComponent: BulletRectsItem,
  rangeColors: 'seq:cool',
  measureComponent: BulletRectsItem,
  measureColors: 'seq:red_purple',
  markers: [],
  markerComponent: BulletMarkersItem,
  markerColors: 'seq:red_purple',
  rangeBorderWidth: 0,
  rangeBorderColor: {
    from: 'color'
  },
  measureSize: 0.4,
  measureBorderWidth: 0,
  measureBorderColor: {
    from: 'color'
  },
  markerSize: 0.6,
  isInteractive: true,
  animate: motionDefaultProps.animate,
  motionConfig: motionDefaultProps.config,
  margin: defaultMargin,
  role: 'img'
};

function _arrayWithHoles$2(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit$2(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayLikeToArray$2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _unsupportedIterableToArray$2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
}

function _nonIterableRest$2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$2(arr, i) {
  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
}

var stackValues = function stackValues(values, colorScale) {
  var useAverage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var normalized = _toConsumableArray(values).filter(function (v) {
    return v !== 0;
  }).sort(function (a, b) {
    return a - b;
  });

  return normalized.reduce(function (acc, v1, index) {
    var _last$v;

    var _acc$slice = acc.slice(-1),
        _acc$slice2 = _slicedToArray$2(_acc$slice, 1),
        last = _acc$slice2[0];

    var v0 = (_last$v = last === null || last === void 0 ? void 0 : last.v1) !== null && _last$v !== void 0 ? _last$v : 0;
    var sequentialValue = useAverage === true ? v0 + (v1 - v0) / 2 : v1;
    return [].concat(_toConsumableArray(acc), [{
      index: index,
      v0: v0,
      v1: v1,
      color: colorScale(colorScale.type === 'sequential' ? sequentialValue : index)
    }]);
  }, []);
};
var getComputeRect = function getComputeRect(_ref) {
  var layout = _ref.layout,
      reverse = _ref.reverse,
      scale = _ref.scale,
      height = _ref.height;

  if (layout === 'horizontal') {
    if (reverse === true) {
      return function (d) {
        var x = scale(d.v1);
        var w = scale(d.v0) - x;
        return {
          x: x,
          y: 0,
          width: w,
          height: height
        };
      };
    }

    return function (d) {
      var x = scale(d.v0);
      var w = scale(d.v1) - x;
      return {
        x: x,
        y: 0,
        width: w,
        height: height
      };
    };
  }

  if (reverse === true) {
    return function (d) {
      var y = scale(d.v0);
      var h = scale(d.v1) - y;
      return {
        x: 0,
        y: y,
        width: height,
        height: h
      };
    };
  }

  return function (d) {
    var y = scale(d.v1);
    var h = scale(d.v0) - y;
    return {
      x: 0,
      y: y,
      width: height,
      height: h
    };
  };
};
var computeRects = function computeRects(_ref2) {
  var data = _ref2.data,
      layout = _ref2.layout,
      reverse = _ref2.reverse,
      scale = _ref2.scale,
      height = _ref2.height;
  var computeRect = getComputeRect({
    layout: layout,
    reverse: reverse,
    scale: scale,
    height: height
  });
  return data.map(function (d) {
    return _objectSpread2$3({
      data: d
    }, computeRect(d));
  });
};

function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

var getPositionGenerator = function getPositionGenerator(_ref) {
  var layout = _ref.layout,
      reverse = _ref.reverse,
      scale = _ref.scale,
      height = _ref.height,
      markerSize = _ref.markerSize;

  if (layout === 'horizontal') {
    return function (marker) {
      var x = scale(marker.value);
      var y = height / 2;
      var rotation = reverse === true ? 180 : 0;
      return {
        x: x,
        y: y,
        size: markerSize,
        rotation: rotation
      };
    };
  }

  return function (marker) {
    var x = height / 2;
    var y = scale(marker.value);
    var rotation = reverse === true ? 270 : 90;
    return {
      x: x,
      y: y,
      size: markerSize,
      rotation: rotation
    };
  };
};

var BulletMarkers = function BulletMarkers(_ref2) {
  var scale = _ref2.scale,
      layout = _ref2.layout,
      reverse = _ref2.reverse,
      markers = _ref2.markers,
      height = _ref2.height,
      markerSize = _ref2.markerSize,
      component = _ref2.component,
      onMouseEnter = _ref2.onMouseEnter,
      onMouseLeave = _ref2.onMouseLeave,
      onClick = _ref2.onClick;
  var getPosition = react.useMemo(function () {
    return getPositionGenerator({
      layout: layout,
      reverse: reverse,
      scale: scale,
      height: height,
      markerSize: markerSize
    });
  }, [layout, reverse, scale, height, markerSize]);

  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;

  var transition = useTransition(markers.map(function (marker) {
    return _objectSpread2$3(_objectSpread2$3({}, marker), {}, {
      position: getPosition(marker)
    });
  }), {
    key: function key(marker) {
      return "".concat(marker.index);
    },
    enter: function enter(_ref3) {
      var color = _ref3.color,
          position = _ref3.position;
      return {
        color: color,
        transform: "rotate(".concat(position.rotation, ", ").concat(position.x, ", ").concat(position.y, ")"),
        x: position.x,
        y1: position.y - position.size / 2,
        y2: position.y + position.size / 2
      };
    },
    update: function update(_ref4) {
      var color = _ref4.color,
          position = _ref4.position;
      return {
        color: color,
        transform: "rotate(".concat(position.rotation, ", ").concat(position.x, ", ").concat(position.y, ")"),
        x: position.x,
        y1: position.y - position.size / 2,
        y2: position.y + position.size / 2
      };
    },
    config: springConfig,
    immediate: !animate
  });
  return react.createElement(react.Fragment, null, transition(function (props, _ref5) {
    var position = _ref5.position,
        marker = _objectWithoutProperties$1(_ref5, ["position"]);

    return react.createElement(component, _objectSpread2$3(_objectSpread2$3(_objectSpread2$3({
      key: marker.index
    }, marker), position), {}, {
      animatedProps: props,
      data: marker,
      onMouseEnter: onMouseEnter,
      onMouseMove: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick
    }));
  }));
};

var BulletRects = function BulletRects(_ref) {
  var animatedProps = _ref.animatedProps,
      data = _ref.data,
      layout = _ref.layout,
      y = _ref.y,
      component = _ref.component,
      reverse = _ref.reverse,
      scale = _ref.scale,
      height = _ref.height,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      onClick = _ref.onClick;
  var rects = react.useMemo(function () {
    return computeRects({
      data: data,
      layout: layout,
      reverse: reverse,
      scale: scale,
      height: height
    });
  }, [data, layout, reverse, scale, height]);

  var getTransform = function getTransform(value) {
    return "translate(".concat(layout === 'horizontal' ? 0 : value, ",").concat(layout === 'horizontal' ? value : 0, ")");
  };

  var transform = animatedProps ? to$1(animatedProps.measuresY, getTransform) : getTransform(y);

  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;

  var transition = useTransition(rects, {
    key: function key(rect) {
      return "".concat(rect.data.index);
    },
    enter: function enter(rect) {
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        color: rect.data.color
      };
    },
    update: function update(rect) {
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        color: rect.data.color
      };
    },
    config: springConfig,
    immediate: !animate
  });
  return react.createElement(animated.g, {
    transform: transform
  }, transition(function (props, rect) {
    return react.createElement(component, {
      key: rect.data.index,
      index: rect.data.index,
      animatedProps: props,
      data: rect.data,
      x: props.x.get(),
      y: props.y.get(),
      width: to$1(props.width, function (value) {
        return Math.max(value, 0);
      }).get(),
      height: to$1(props.height, function (value) {
        return Math.max(value, 0);
      }).get(),
      color: props.color.get(),
      onMouseEnter: onMouseEnter,
      onMouseMove: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onClick: onClick
    });
  }));
};

var BulletItem = function BulletItem(_ref) {
  var _theme$labels;

  var id = _ref.id,
      scale = _ref.scale,
      layout = _ref.layout,
      reverse = _ref.reverse,
      axisPosition = _ref.axisPosition,
      x = _ref.x,
      y = _ref.y,
      width = _ref.width,
      height = _ref.height,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? id : _ref$title,
      titlePosition = _ref.titlePosition,
      titleAlign = _ref.titleAlign,
      titleOffsetX = _ref.titleOffsetX,
      titleOffsetY = _ref.titleOffsetY,
      titleRotation = _ref.titleRotation,
      rangeComponent = _ref.rangeComponent,
      rangeColors = _ref.rangeColors,
      ranges = _ref.ranges,
      measureComponent = _ref.measureComponent,
      measureHeight = _ref.measureHeight,
      measureColors = _ref.measureColors,
      measures = _ref.measures,
      markerComponent = _ref.markerComponent,
      markerColors = _ref.markerColors,
      markerHeight = _ref.markerHeight,
      _ref$markers = _ref.markers,
      markers = _ref$markers === void 0 ? [] : _ref$markers,
      onRangeClick = _ref.onRangeClick,
      onMeasureClick = _ref.onMeasureClick,
      onMarkerClick = _ref.onMarkerClick;
  var theme = useTheme();

  var _useTooltip = useTooltip(),
      showTooltipFromEvent = _useTooltip.showTooltipFromEvent,
      hideTooltip = _useTooltip.hideTooltip;

  var computedRanges = react.useMemo(function () {
    var rangeColorScale = getColorScale(rangeColors, scale);
    return stackValues(ranges, rangeColorScale);
  }, [rangeColors, ranges, scale]);
  var computedMeasures = react.useMemo(function () {
    var measureColorScale = getColorScale(measureColors, scale);
    return stackValues(measures, measureColorScale);
  }, [measureColors, measures, scale]);
  var computedMarkers = react.useMemo(function () {
    var markerColorScale = getColorScale(markerColors, scale);
    return markers.map(function (marker, index) {
      return {
        value: marker,
        index: index,
        color: markerColorScale(markerColorScale.type === 'sequential' ? marker : index)
      };
    });
  }, [markerColors, markers, scale]);
  var rangeNodes = react.createElement(BulletRects, {
    data: computedRanges,
    scale: scale,
    layout: layout,
    reverse: reverse,
    x: 0,
    y: 0,
    width: width,
    height: height,
    component: rangeComponent,
    onMouseEnter: function onMouseEnter(range, event) {
      showTooltipFromEvent(react.createElement(BasicTooltip, {
        id: react.createElement("span", null, react.createElement("strong", null, range.v0), " to ", react.createElement("strong", null, range.v1)),
        enableChip: true,
        color: range.color
      }), event);
    },
    onMouseLeave: hideTooltip,
    onClick: function onClick(range, event) {
      onRangeClick === null || onRangeClick === void 0 ? void 0 : onRangeClick(_objectSpread2$3({
        id: id
      }, range), event);
    }
  });
  var markerNodes = react.createElement(BulletMarkers, {
    markers: computedMarkers,
    scale: scale,
    layout: layout,
    reverse: reverse,
    height: height,
    markerSize: markerHeight,
    component: markerComponent,
    onMouseEnter: function onMouseEnter(marker, event) {
      showTooltipFromEvent(react.createElement(BasicTooltip, {
        id: react.createElement("strong", null, marker.value),
        enableChip: true,
        color: marker.color
      }), event);
    },
    onMouseLeave: hideTooltip,
    onClick: function onClick(marker, event) {
      onMarkerClick === null || onMarkerClick === void 0 ? void 0 : onMarkerClick(_objectSpread2$3({
        id: id
      }, marker), event);
    }
  });
  var axisX = layout === 'vertical' && axisPosition === 'after' ? height : 0;
  var axisY = layout === 'horizontal' && axisPosition === 'after' ? height : 0;
  var axis = react.createElement("g", {
    transform: "translate(".concat(axisX, ",").concat(axisY, ")")
  }, react.createElement(Axis$1, {
    axis: layout === 'horizontal' ? 'x' : 'y',
    length: layout === 'horizontal' ? width : height,
    scale: scale,
    ticksPosition: axisPosition
  }));
  var titleX = layout === 'horizontal' ? titlePosition === 'before' ? titleOffsetX : width + titleOffsetX : height / 2 + titleOffsetX;
  var titleY = layout === 'horizontal' ? height / 2 + titleOffsetY : titlePosition === 'before' ? titleOffsetY : width + titleOffsetY;
  var titleNode = react.createElement("g", {
    transform: "translate(".concat(titleX, ",").concat(titleY, ") rotate(").concat(titleRotation, ")")
  }, typeof title === 'string' ? react.createElement("text", {
    style: _objectSpread2$3(_objectSpread2$3({}, theme === null || theme === void 0 ? void 0 : (_theme$labels = theme.labels) === null || _theme$labels === void 0 ? void 0 : _theme$labels.text), {}, {
      dominantBaseline: 'central',
      textAnchor: titleAlign
    })
  }, title) : title);

  var _useMotionConfig = useMotionConfig(),
      animate = _useMotionConfig.animate,
      springConfig = _useMotionConfig.config;

  var animatedProps = useSpring({
    measuresY: (height - measureHeight) / 2,
    transform: "translate(".concat(x, ",").concat(y, ")"),
    config: springConfig,
    immediate: !animate
  });
  return react.createElement(animated.g, {
    transform: animatedProps.transform
  }, rangeNodes, react.createElement(BulletRects, {
    animatedProps: animatedProps,
    data: computedMeasures,
    scale: scale,
    layout: layout,
    reverse: reverse,
    x: 0,
    y: 0,
    width: width,
    height: measureHeight,
    component: measureComponent,
    onMouseEnter: function onMouseEnter(measure, event) {
      showTooltipFromEvent(react.createElement(BasicTooltip, {
        id: react.createElement("strong", null, measure.v1),
        enableChip: true,
        color: measure.color
      }), event);
    },
    onMouseLeave: hideTooltip,
    onClick: function onClick(measure, event) {
      onMeasureClick === null || onMeasureClick === void 0 ? void 0 : onMeasureClick(_objectSpread2$3({
        id: id
      }, measure), event);
    }
  }), axis, markerNodes, titleNode);
};

var useEnhancedData = function useEnhancedData(data, _ref) {
  var layout = _ref.layout,
      reverse = _ref.reverse,
      height = _ref.height,
      width = _ref.width;
  return react.useMemo(function () {
    return data.map(function (d) {
      var _d$markers;

      var all = [].concat(_toConsumableArray(d.ranges), _toConsumableArray(d.measures), _toConsumableArray((_d$markers = d.markers) !== null && _d$markers !== void 0 ? _d$markers : []));
      var max = Math.max.apply(Math, _toConsumableArray(all));
      var min = Math.min.apply(Math, _toConsumableArray(all).concat([0]));
      var scale = linear$1().domain([min, max]);

      if (layout === 'horizontal') {
        scale.range(reverse === true ? [width, 0] : [0, width]);
      } else {
        scale.range(reverse === true ? [0, height] : [height, 0]);
      }

      return _objectSpread2$3(_objectSpread2$3({}, d), {}, {
        scale: scale
      });
    });
  }, [data, height, layout, reverse, width]);
};

var Bullet = function Bullet(props) {
  var _defaultProps$props = _objectSpread2$3(_objectSpread2$3({}, defaultProps), props),
      data = _defaultProps$props.data,
      layout = _defaultProps$props.layout,
      spacing = _defaultProps$props.spacing,
      measureSize = _defaultProps$props.measureSize,
      markerSize = _defaultProps$props.markerSize,
      reverse = _defaultProps$props.reverse,
      axisPosition = _defaultProps$props.axisPosition,
      partialMargin = _defaultProps$props.margin,
      width = _defaultProps$props.width,
      height = _defaultProps$props.height,
      titlePosition = _defaultProps$props.titlePosition,
      titleAlign = _defaultProps$props.titleAlign,
      titleOffsetX = _defaultProps$props.titleOffsetX,
      titleOffsetY = _defaultProps$props.titleOffsetY,
      titleRotation = _defaultProps$props.titleRotation,
      rangeComponent = _defaultProps$props.rangeComponent,
      rangeColors = _defaultProps$props.rangeColors,
      measureComponent = _defaultProps$props.measureComponent,
      measureColors = _defaultProps$props.measureColors,
      markerComponent = _defaultProps$props.markerComponent,
      markerColors = _defaultProps$props.markerColors,
      theme = _defaultProps$props.theme,
      animate = _defaultProps$props.animate,
      motionConfig = _defaultProps$props.motionConfig,
      isInteractive = _defaultProps$props.isInteractive,
      onRangeClick = _defaultProps$props.onRangeClick,
      onMeasureClick = _defaultProps$props.onMeasureClick,
      onMarkerClick = _defaultProps$props.onMarkerClick,
      role = _defaultProps$props.role;

  var _useDimensions = useDimensions(width, height, partialMargin),
      margin = _useDimensions.margin,
      innerWidth = _useDimensions.innerWidth,
      innerHeight = _useDimensions.innerHeight;

  var itemHeight = layout === 'horizontal' ? (innerHeight - spacing * (data.length - 1)) / data.length : (innerWidth - spacing * (data.length - 1)) / data.length;
  var measureHeight = itemHeight * measureSize;
  var markerHeight = itemHeight * markerSize;
  var enhancedData = useEnhancedData(data, {
    layout: layout,
    reverse: reverse,
    width: innerWidth,
    height: innerHeight
  });
  return react.createElement(Container, {
    isInteractive: isInteractive,
    theme: theme,
    animate: animate,
    motionConfig: motionConfig
  }, react.createElement(SvgWrapper, {
    width: width,
    height: height,
    margin: margin,
    role: role
  }, enhancedData.map(function (d, i) {
    return react.createElement(BulletItem, Object.assign({
      key: d.id
    }, d, {
      layout: layout,
      reverse: reverse,
      x: layout === 'vertical' ? itemHeight * i + spacing * i : 0,
      y: layout === 'horizontal' ? itemHeight * i + spacing * i : 0,
      width: innerWidth,
      height: itemHeight,
      titlePosition: titlePosition,
      titleAlign: titleAlign,
      titleOffsetX: titleOffsetX,
      titleOffsetY: titleOffsetY,
      titleRotation: titleRotation,
      measureHeight: measureHeight,
      markerHeight: markerHeight,
      rangeComponent: rangeComponent,
      rangeColors: rangeColors,
      measureComponent: measureComponent,
      measureColors: measureColors,
      markerComponent: markerComponent,
      markerColors: markerColors,
      axisPosition: axisPosition,
      onRangeClick: onRangeClick,
      onMeasureClick: onMeasureClick,
      onMarkerClick: onMarkerClick
    }));
  })));
};

var ResponsiveBullet = function ResponsiveBullet(props) {
  return react.createElement(ResponsiveWrapper, null, function (_ref) {
    var width = _ref.width,
        height = _ref.height;
    return react.createElement(Bullet, Object.assign({
      width: width,
      height: height
    }, props));
  });
};

export { ResponsiveBullet };
