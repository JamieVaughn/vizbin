import { l as lab, i as interpolateHcl, h as hclLong, a as interpolateHsl, b as hslLong } from '../common/hcl-198a11e3.js';
import { i as interpolateCubehelix, c as cubehelixLong } from '../common/cubehelix-9d1c68c8.js';
import { q as interpolateRgb, h as hour, m as minute, b as month, s as second, a as utcHour, u as utcMinute, c as utcMonth, d as interpolateRound } from '../common/utcMonth-4ccdc574.js';
import { d as day, s as sunday, y as year, a as utcDay, c as utcSunday, b as utcYear } from '../common/utcYear-88153cbb.js';
import { t as time } from '../common/time-fb11ae4c.js';
import { l as linear } from '../common/linear-6238e9df.js';
import '../common/nice-d5ee0ce3.js';
import '../common/defaultLocale-8f6062a7.js';
import '../common/millisecond-22862655.js';

function applyDomain(scale, config) {
  if (config.domain) {
    if ('nice' in scale || 'quantiles' in scale) {
      // continuous input scales
      scale.domain(config.domain);
    } else if ('padding' in scale) {
      // point and band scales
      scale.domain(config.domain);
    } else {
      // ordinal and threshold scale
      scale.domain(config.domain);
    }
  }
}

function applyRange(scale, config) {
  if (config.range) {
    if ('padding' in scale) {
      // point and band scales
      scale.range(config.range);
    } else {
      // the rest
      scale.range(config.range);
    }
  }
}

function applyAlign(scale, config) {
  if ('align' in scale && 'align' in config && typeof config.align !== 'undefined') {
    scale.align(config.align);
  }
}

function applyBase(scale, config) {
  if ('base' in scale && 'base' in config && typeof config.base !== 'undefined') {
    scale.base(config.base);
  }
}

function applyClamp(scale, config) {
  if ('clamp' in scale && 'clamp' in config && typeof config.clamp !== 'undefined') {
    scale.clamp(config.clamp);
  }
}

function applyConstant(scale, config) {
  if ('constant' in scale && 'constant' in config && typeof config.constant !== 'undefined') {
    scale.constant(config.constant);
  }
}

function applyExponent(scale, config) {
  if ('exponent' in scale && 'exponent' in config && typeof config.exponent !== 'undefined') {
    scale.exponent(config.exponent);
  }
}

var interpolatorMap = {
  lab: lab,
  hcl: interpolateHcl,
  'hcl-long': hclLong,
  hsl: interpolateHsl,
  'hsl-long': hslLong,
  cubehelix: interpolateCubehelix,
  'cubehelix-long': cubehelixLong,
  rgb: interpolateRgb
};
function createColorInterpolator(interpolate) {
  switch (interpolate) {
    case 'lab':
    case 'hcl':
    case 'hcl-long':
    case 'hsl':
    case 'hsl-long':
    case 'cubehelix':
    case 'cubehelix-long':
    case 'rgb':
      return interpolatorMap[interpolate];
  }

  var type = interpolate.type,
      gamma = interpolate.gamma;
  var interpolator = interpolatorMap[type];
  return typeof gamma === 'undefined' ? interpolator : interpolator.gamma(gamma);
}

function applyInterpolate(scale, config) {
  if ('interpolate' in config && 'interpolate' in scale && typeof config.interpolate !== 'undefined') {
    var interpolator = createColorInterpolator(config.interpolate);
    scale.interpolate(interpolator);
  }
}

var TEST_TIME = new Date(Date.UTC(2020, 1, 2, 3, 4, 5));
var TEST_FORMAT = '%Y-%m-%d %H:%M';
/**
 * Check if the scale is UTC or Time scale
 * When local time is equal to UTC, always return true
 * @param scale time or utc scale
 */

function isUtcScale(scale) {
  // The only difference between time and utc scale is
  // whether the tick format function is utcFormat or timeFormat
  var output = scale.tickFormat(1, TEST_FORMAT)(TEST_TIME);
  return output === '2020-02-02 03:04';
}

var localTimeIntervals = {
  day: day,
  hour: hour,
  minute: minute,
  month: month,
  second: second,
  week: sunday,
  year: year
};
var utcIntervals = {
  day: utcDay,
  hour: utcHour,
  minute: utcMinute,
  month: utcMonth,
  second: second,
  week: utcSunday,
  year: utcYear
};
function applyNice(scale, config) {
  if ('nice' in config && typeof config.nice !== 'undefined' && 'nice' in scale) {
    var nice = config.nice;

    if (typeof nice === 'boolean') {
      if (nice) {
        scale.nice();
      }
    } else if (typeof nice === 'number') {
      scale.nice(nice);
    } else {
      var timeScale = scale;
      var isUtc = isUtcScale(timeScale);

      if (typeof nice === 'string') {
        timeScale.nice(isUtc ? utcIntervals[nice] : localTimeIntervals[nice]);
      } else {
        var interval = nice.interval,
            step = nice.step;
        var parsedInterval = (isUtc ? utcIntervals[interval] : localTimeIntervals[interval]).every(step);

        if (parsedInterval != null) {
          timeScale.nice(parsedInterval);
        }
      }
    }
  }
}

function applyPadding(scale, config) {
  if ('padding' in scale && 'padding' in config && typeof config.padding !== 'undefined') {
    scale.padding(config.padding);
  }

  if ('paddingInner' in scale && 'paddingInner' in config && typeof config.paddingInner !== 'undefined') {
    scale.paddingInner(config.paddingInner);
  }

  if ('paddingOuter' in scale && 'paddingOuter' in config && typeof config.paddingOuter !== 'undefined') {
    scale.paddingOuter(config.paddingOuter);
  }
}

function applyReverse(scale, config) {
  if (config.reverse) {
    var reversedRange = scale.range().slice().reverse();

    if ('padding' in scale) {
      // point and band scales
      scale.range(reversedRange);
    } else {
      // the rest
      scale.range(reversedRange);
    }
  }
}

function applyRound(scale, config) {
  if ('round' in config && typeof config.round !== 'undefined') {
    if (config.round && 'interpolate' in config && typeof config.interpolate !== 'undefined') {
      console.warn("[vx/scale/applyRound] ignoring round: scale config contains round and interpolate. only applying interpolate. config:", config);
    } else if ('round' in scale) {
      // for point and band scales
      scale.round(config.round);
    } else if ('interpolate' in scale && config.round) {
      // for continuous output scales
      // setting config.round = true
      // is actually setting interpolator to interpolateRound
      // as these scales do not have scale.round() function
      scale.interpolate(interpolateRound);
    }
  }
}

function applyUnknown(scale, config) {
  if ('unknown' in scale && 'unknown' in config && typeof config.unknown !== 'undefined') {
    scale.unknown(config.unknown);
  }
}

function applyZero(scale, config) {
  if ('zero' in config && config.zero === true) {
    var domain = scale.domain();
    var a = domain[0],
        b = domain[1];
    var isDescending = b < a;

    var _ref = isDescending ? [b, a] : [a, b],
        min = _ref[0],
        max = _ref[1];

    var domainWithZero = [Math.min(0, min), Math.max(0, max)];
    scale.domain(isDescending ? domainWithZero.reverse() : domainWithZero);
  }
}

/**
 * List of all operators, in order of execution
 */

var ALL_OPERATORS = [// domain => nice => zero
'domain', 'nice', 'zero', // interpolate before round
'interpolate', 'round', // set range then reverse
'range', 'reverse', // Order does not matter for these operators
'align', 'base', 'clamp', 'constant', 'exponent', 'padding', 'unknown'];
// Use Record to enforce that all keys in OperatorType must exist.
var operators = {
  domain: applyDomain,
  nice: applyNice,
  zero: applyZero,
  interpolate: applyInterpolate,
  round: applyRound,
  align: applyAlign,
  base: applyBase,
  clamp: applyClamp,
  constant: applyConstant,
  exponent: applyExponent,
  padding: applyPadding,
  range: applyRange,
  reverse: applyReverse,
  unknown: applyUnknown
};
function scaleOperator() {
  for (var _len = arguments.length, ops = new Array(_len), _key = 0; _key < _len; _key++) {
    ops[_key] = arguments[_key];
  }

  var selection = new Set(ops);
  var selectedOps = ALL_OPERATORS.filter(function (o) {
    return selection.has(o);
  });
  return function applyOperators(scale, config) {
    if (typeof config !== 'undefined') {
      selectedOps.forEach(function (op) {
        operators[op](scale, config);
      });
    }

    return scale;
  };
}

var updateLinearScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round', 'zero');
function createLinearScale(config) {
  return updateLinearScale(linear(), config);
}

var updateTimeScale = scaleOperator('domain', 'range', 'reverse', 'clamp', 'interpolate', 'nice', 'round');
function createTimeScale(config) {
  return updateTimeScale(time(), config);
}

export { createLinearScale as scaleLinear, createTimeScale as scaleTime };
