function coerceNumber(val) {
  if ((typeof val === 'function' || typeof val === 'object' && !!val) && 'valueOf' in val) {
    var num = val.valueOf();
    if (typeof num === 'number') return num;
  }

  return val;
}

function getTicks(scale, numTicks) {
  // Because `Scale` is generic type which maybe a subset of AnyD3Scale
  // that may not have `ticks` field,
  // TypeScript will not let us do the `'ticks' in scale` check directly.
  // Have to manually cast and expand type first.
  var s = scale;

  if ('ticks' in s) {
    return s.ticks(numTicks);
  }

  return s.domain().filter(function (_, index, arr) {
    return numTicks == null || arr.length <= numTicks || index % Math.round((arr.length - 1) / numTicks) === 0;
  });
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

export { Point as P, coerceNumber as c, getTicks as g };
