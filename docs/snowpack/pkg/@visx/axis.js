import { r as react } from '../common/index-abdc4d2d.js';
import { c as classnames } from '../common/index-d4b0dc1b.js';
import '../common/index-ad697a84.js';
import { G as Group } from '../common/Group-1bab4bbd.js';
import { m as memoize_1 } from '../common/memoize-af238e81.js';
import { P as Point, g as getTicks, c as coerceNumber } from '../common/Point-b58cb484.js';
import '../common/_commonjsHelpers-4f955397.js';

function toString(x) {
  return x == null ? void 0 : x.toString();
}

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
  return /*#__PURE__*/react.createElement("line", _extends({
    ref: innerRef,
    className: classnames('visx-line', className),
    x1: from.x,
    y1: from.y,
    x2: to.x,
    y2: to.y,
    fill: fill,
    shapeRendering: isRectilinear ? 'crispEdges' : 'auto'
  }, restProps));
}

var balancedMatch = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  var r = range(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

var balancedMatch$1 = balanced$1;
function balanced$1(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch$1(a, str);
  if (b instanceof RegExp) b = maybeMatch$1(b, str);

  var r = range$1(a, b, str);

  return r && {
    start: r[0],
    end: r[1],
    pre: str.slice(0, r[0]),
    body: str.slice(r[0] + a.length, r[1]),
    post: str.slice(r[1] + b.length)
  };
}

function maybeMatch$1(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced$1.range = range$1;
function range$1(a, b, str) {
  var begs, beg, left, right, result;
  var ai = str.indexOf(a);
  var bi = str.indexOf(b, ai + 1);
  var i = ai;

  if (ai >= 0 && bi > 0) {
    begs = [];
    left = str.length;

    while (i >= 0 && !result) {
      if (i == ai) {
        begs.push(i);
        ai = str.indexOf(a, i + 1);
      } else if (begs.length == 1) {
        result = [ begs.pop(), bi ];
      } else {
        beg = begs.pop();
        if (beg < left) {
          left = beg;
          right = bi;
        }

        bi = str.indexOf(b, i + 1);
      }

      i = ai < bi && ai >= 0 ? ai : bi;
    }

    if (begs.length) {
      result = [ left, right ];
    }
  }

  return result;
}

/*
 * Module dependencies
 */


/**
 * Expose `reduceFunctionCall`
 *
 * @type {Function}
 */
var reduceFunctionCall_1 = reduceFunctionCall;

/**
 * Walkthrough all expressions, evaluate them and insert them into the declaration
 *
 * @param {Array} expressions
 * @param {Object} declaration
 */

function reduceFunctionCall(string, functionRE, callback) {
  var call = string;
  return getFunctionCalls(string, functionRE).reduce(function(string, obj) {
    return string.replace(obj.functionIdentifier + "(" + obj.matches.body + ")", evalFunctionCall(obj.matches.body, obj.functionIdentifier, callback, call, functionRE))
  }, string)
}

/**
 * Parses expressions in a value
 *
 * @param {String} value
 * @returns {Array}
 * @api private
 */

function getFunctionCalls(call, functionRE) {
  var expressions = [];

  var fnRE = typeof functionRE === "string" ? new RegExp("\\b(" + functionRE + ")\\(") : functionRE;
  do {
    var searchMatch = fnRE.exec(call);
    if (!searchMatch) {
      return expressions
    }
    if (searchMatch[1] === undefined) {
      throw new Error("Missing the first couple of parenthesis to get the function identifier in " + functionRE)
    }
    var fn = searchMatch[1];
    var startIndex = searchMatch.index;
    var matches = balancedMatch$1("(", ")", call.substring(startIndex));

    if (!matches || matches.start !== searchMatch[0].length - 1) {
      throw new SyntaxError(fn + "(): missing closing ')' in the value '" + call + "'")
    }

    expressions.push({matches: matches, functionIdentifier: fn});
    call = matches.post;
  }
  while (fnRE.test(call))

  return expressions
}

/**
 * Evaluates an expression
 *
 * @param {String} expression
 * @returns {String}
 * @api private
 */

function evalFunctionCall (string, functionIdentifier, callback, call, functionRE) {
  // allow recursivity
  return callback(reduceFunctionCall(string, functionRE, callback), functionIdentifier, call)
}

var Mexp = function (parsed) {
  this.value = parsed;
};

Mexp.math = {
  isDegree: true, // mode of calculator
  acos: function (x) {
    return (Mexp.math.isDegree ? 180 / Math.PI * Math.acos(x) : Math.acos(x))
  },
  add: function (a, b) {
    return a + b
  },
  asin: function (x) {
    return (Mexp.math.isDegree ? 180 / Math.PI * Math.asin(x) : Math.asin(x))
  },
  atan: function (x) {
    return (Mexp.math.isDegree ? 180 / Math.PI * Math.atan(x) : Math.atan(x))
  },
  acosh: function (x) {
    return Math.log(x + Math.sqrt(x * x - 1))
  },
  asinh: function (x) {
    return Math.log(x + Math.sqrt(x * x + 1))
  },
  atanh: function (x) {
    return Math.log((1 + x) / (1 - x))
  },
  C: function (n, r) {
    var pro = 1;
    var other = n - r;
    var choice = r;
    if (choice < other) {
      choice = other;
      other = r;
    }
    for (var i = choice + 1; i <= n; i++) {
      pro *= i;
    }
    return pro / Mexp.math.fact(other)
  },
  changeSign: function (x) {
    return -x
  },
  cos: function (x) {
    if (Mexp.math.isDegree) x = Mexp.math.toRadian(x);
    return Math.cos(x)
  },
  cosh: function (x) {
    return (Math.pow(Math.E, x) + Math.pow(Math.E, -1 * x)) / 2
  },
  div: function (a, b) {
    return a / b
  },
  fact: function (n) {
    if (n % 1 !== 0) return 'NaN'
    var pro = 1;
    for (var i = 2; i <= n; i++) {
      pro *= i;
    }
    return pro
  },
  inverse: function (x) {
    return 1 / x
  },
  log: function (i) {
    return Math.log(i) / Math.log(10)
  },
  mod: function (a, b) {
    return a % b
  },
  mul: function (a, b) {
    return a * b
  },
  P: function (n, r) {
    var pro = 1;
    for (var i = Math.floor(n) - Math.floor(r) + 1; i <= Math.floor(n); i++) {
      pro *= i;
    }
    return pro
  },
  Pi: function (low, high, ex) {
    var pro = 1;
    for (var i = low; i <= high; i++) {
      pro *= Number(ex.postfixEval({
        n: i
      }));
    }
    return pro
  },
  pow10x: function (e) {
    var x = 1;
    while (e--) {
      x *= 10;
    }
    return x
  },
  sigma: function (low, high, ex) {
    var sum = 0;
    for (var i = low; i <= high; i++) {
      sum += Number(ex.postfixEval({
        n: i
      }));
    }
    return sum
  },
  sin: function (x) {
    if (Mexp.math.isDegree) x = Mexp.math.toRadian(x);
    return Math.sin(x)
  },
  sinh: function (x) {
    return (Math.pow(Math.E, x) - Math.pow(Math.E, -1 * x)) / 2
  },
  sub: function (a, b) {
    return a - b
  },
  tan: function (x) {
    if (Mexp.math.isDegree) x = Mexp.math.toRadian(x);
    return Math.tan(x)
  },
  tanh: function (x) {
    return Mexp.sinha(x) / Mexp.cosha(x)
  },
  toRadian: function (x) {
    return x * Math.PI / 180
  }
};
Mexp.Exception = function (message) {
  this.message = message;
};
var math_function = Mexp;

function inc(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    arr[i] += val;
  }
  return arr
}
var token = ['sin', 'cos', 'tan', 'pi', '(', ')', 'P', 'C', ' ',
  'asin', 'acos', 'atan', '7', '8', '9', 'int',
  'cosh', 'acosh', 'ln', '^', 'root', '4', '5', '6', '/', '!',
  'tanh', 'atanh', 'Mod', '1', '2', '3', '*',
  'sinh', 'asinh', 'e', 'log', '0', '.', '+', '-', ',', 'Sigma', 'n', 'Pi', 'pow'];
var show = ['sin', 'cos', 'tan', '&pi;', '(', ')', 'P', 'C', ' ',
  'asin', 'acos', 'atan', '7', '8', '9', 'Int',
  'cosh', 'acosh', ' ln', '^', 'root', '4', '5', '6', '&divide;', '!',
  'tanh', 'atanh', ' Mod ', '1', '2', '3', '&times;',
  'sinh', 'asinh', 'e', ' log', '0', '.', '+', '-', ',', '&Sigma;', 'n', '&Pi;', 'pow'];
var eva = [math_function.math.sin, math_function.math.cos, math_function.math.tan, 'PI', '(', ')', math_function.math.P, math_function.math.C, ' '.anchor,
math_function.math.asin, math_function.math.acos, math_function.math.atan, '7', '8', '9', Math.floor,
math_function.math.cosh, math_function.math.acosh, Math.log, Math.pow, Math.sqrt, '4', '5', '6', math_function.math.div, math_function.math.fact,
math_function.math.tanh, math_function.math.atanh, math_function.math.mod, '1', '2', '3', math_function.math.mul,
math_function.math.sinh, math_function.math.asinh, 'E', math_function.math.log, '0', '.', math_function.math.add, math_function.math.sub, ',', math_function.math.sigma, 'n', math_function.math.Pi, Math.pow];
var preced = {
  0: 11,
  1: 0,
  2: 3,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 11,
  8: 11,
  9: 1,
  10: 10,
  11: 0,
  12: 11,
  13: 0,
  14: -1 // will be filtered after lexer
}; // stores precedence by types
var type = [0, 0, 0, 3, 4, 5, 10, 10, 14,
  0, 0, 0, 1, 1, 1, 0,
  0, 0, 0, 10, 0, 1, 1, 1, 2, 7,
  0, 0, 2, 1, 1, 1, 2,
  0, 0, 3, 0, 1, 6, 9, 9, 11, 12, 13, 12, 8];
/*
0 : function with syntax function_name(Maths_exp)
1 : numbers
2 : binary operators like * / Mod left associate and same precedence
3 : Math constant values like e,pi,Cruncher ans
4 : opening bracket
5 : closing bracket
6 : decimal
7 : function with syntax (Math_exp)function_name
8: function with syntax function_name(Math_exp1,Math_exp2)
9 : binary operator like +,-
10: binary operator like P C or ^
11: ,
12: function with , seperated three parameters and third parameter is a string that will be mexp string
13: variable of Sigma function
*/
var type0 = {
  0: true,
  1: true,
  3: true,
  4: true,
  6: true,
  8: true,
  9: true,
  12: true,
  13: true,
  14: true
}; // type2:true,type4:true,type9:true,type11:true,type21:true,type22
var type1 = {
  0: true,
  1: true,
  2: true,
  3: true,
  4: true,
  5: true,
  6: true,
  7: true,
  8: true,
  9: true,
  10: true,
  11: true,
  12: true,
  13: true
}; // type3:true,type5:true,type7:true,type23
var type1Asterick = {
  0: true,
  3: true,
  4: true,
  8: true,
  12: true,
  13: true
};
var empty = {};
var type3Asterick = {
  0: true,
  1: true,
  3: true,
  4: true,
  6: true,
  8: true,
  12: true,
  13: true
}; // type_5:true,type_7:true,type_23
var type6 = {
  1: true
};
var newAr = [
  [],
  ['1', '2', '3', '7', '8', '9', '4', '5', '6', '+', '-', '*', '/', '(', ')', '^', '!', 'P', 'C', 'e', '0', '.', ',', 'n', ' '],
  ['pi', 'ln', 'Pi'],
  ['sin', 'cos', 'tan', 'Del', 'int', 'Mod', 'log', 'pow'],
  ['asin', 'acos', 'atan', 'cosh', 'root', 'tanh', 'sinh'],
  ['acosh', 'atanh', 'asinh', 'Sigma']
];

function match(str1, str2, i, x) {
  for (var f = 0; f < x; f++) {
    if (str1[i + f] !== str2[f]) {
      return false
    }
  }
  return true
}
math_function.addToken = function (tokens) {
  for (var i = 0; i < tokens.length; i++) {
    var x = tokens[i].token.length;
    var temp = -1;

    // newAr is a specially designed data structure index of 1d array = length of tokens
    newAr[x] = newAr[x] || [];
    for (var y = 0; y < newAr[x].length; y++) {
      if (tokens[i].token === newAr[x][y]) {
        temp = token.indexOf(newAr[x][y]);
        break
      }
    }
    if (temp === -1) {
      token.push(tokens[i].token);
      type.push(tokens[i].type);
      if (newAr.length <= tokens[i].token.length) {
        newAr[tokens[i].token.length] = [];
      }
      newAr[tokens[i].token.length].push(tokens[i].token);
      eva.push(tokens[i].value);
      show.push(tokens[i].show);
    } else { // overwrite
      token[temp] = tokens[i].token;
      type[temp] = tokens[i].type;
      eva[temp] = tokens[i].value;
      show[temp] = tokens[i].show;
    }
  }
};

function tokenize(string) {
  var nodes = [];
  var length = string.length;
  var key, x, y;
  for (var i = 0; i < length; i++) {
    if (i < length - 1 && string[i] === ' ' && string[i + 1] === ' ') {
      continue
    }
    key = '';
    for (x = (string.length - i > (newAr.length - 2) ? newAr.length - 1 : string.length - i); x > 0; x--) {
      if (newAr[x] === undefined) continue;
      for (y = 0; y < newAr[x].length; y++) {
        if (match(string, newAr[x][y], i, x)) {
          key = newAr[x][y];
          y = newAr[x].length;
          x = 0;
        }
      }
    }
    i += key.length - 1;
    if (key === '') {
      throw (new math_function.Exception('Can\'t understand after ' + string.slice(i)))
    }
    var index = token.indexOf(key);
    nodes.push({
      index: index,
      token: key,
      type: type[index],
      eval: eva[index],
      precedence: preced[type[index]],
      show: show[index]
    });
  }
  return nodes;
}

math_function.lex = function (inp, tokens) {


  var changeSignObj = {
    value: math_function.math.changeSign,
    type: 0,
    pre: 21,
    show: '-'
  };
  var closingParObj = {
    value: ')',
    show: ')',
    type: 5,
    pre: 0
  };
  var openingParObj = {
    value: '(',
    type: 4,
    pre: 0,
    show: '('
  };
  var str = [openingParObj];

  var ptc = []; // Parenthesis to close at the beginning is after one token
  var inpStr = inp;
  var allowed = type0;
  var bracToClose = 0;
  var asterick = empty;
  var prevKey = '';
  var i;
  if (typeof tokens !== 'undefined') {
    math_function.addToken(tokens);
  }
  var obj = {};
  var nodes = tokenize(inpStr);
  for (i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.type === 14) {
      if (i > 0 &&
        i < nodes.length - 1 &&
        nodes[i + 1].type === 1 &&
        (nodes[i - 1].type === 1 || nodes[i - 1].type === 6))
        throw new math_function.Exception('Unexpected Space')
      continue
    }

    node.index;
    var cToken = node.token;
    var cType = node.type;
    var cEv = node.eval;
    var cPre = node.precedence;
    var cShow = node.show;
    var pre = str[str.length - 1];
    var j;
    for (j = ptc.length; j--;) { // loop over ptc
      if (ptc[j] === 0) {
        if ([0, 2, 3, 4, 5, 9, 11, 12, 13].indexOf(cType) !== -1) {
          if (allowed[cType] !== true) {
            console.log(inp, node, nodes, allowed);
            throw (new math_function.Exception(cToken + ' is not allowed after ' + prevKey))
          }
          str.push(closingParObj);
          allowed = type1;
          asterick = type3Asterick;
          inc(ptc, -1).pop();
        }
      } else break
    }
    if (allowed[cType] !== true) {
      throw (new math_function.Exception(cToken + ' is not allowed after ' + prevKey))
    }
    if (asterick[cType] === true) {
      cType = 2;
      cEv = math_function.math.mul;
      cShow = '&times;';
      cPre = 3;
      i = i - cToken.length;
    }
    obj = {
      value: cEv,
      type: cType,
      pre: cPre,
      show: cShow
    };
    if (cType === 0) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 2).push(2);
      str.push(obj);
      str.push(openingParObj);
    } else if (cType === 1) {
      if (pre.type === 1) {
        pre.value += cEv;
        inc(ptc, 1);
      } else {
        str.push(obj);
      }
      allowed = type1;
      asterick = type1Asterick;
    } else if (cType === 2) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 2);
      str.push(obj);
    } else if (cType === 3) { // constant
      str.push(obj);
      allowed = type1;
      asterick = type3Asterick;
    } else if (cType === 4) {
      inc(ptc, 1);
      bracToClose++;
      allowed = type0;
      asterick = empty;
      str.push(obj);
    } else if (cType === 5) {
      if (!bracToClose) {
        throw (new math_function.Exception('Closing parenthesis are more than opening one, wait What!!!'))
      }
      bracToClose--;
      allowed = type1;
      asterick = type3Asterick;
      str.push(obj);
      inc(ptc, 1);
    } else if (cType === 6) {
      if (pre.hasDec) {
        throw (new math_function.Exception('Two decimals are not allowed in one number'))
      }
      if (pre.type !== 1) {
        pre = {
          value: 0,
          type: 1,
          pre: 0
        }; // pre needs to be changed as it will the last value now to be safe in later code
        str.push(pre);
        inc(ptc, -1);
      }
      allowed = type6;
      inc(ptc, 1);
      asterick = empty;
      pre.value += cEv;
      pre.hasDec = true;
    } else if (cType === 7) {
      allowed = type1;
      asterick = type3Asterick;
      inc(ptc, 1);
      str.push(obj);
    }
    if (cType === 8) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 4).push(4);
      str.push(obj);
      str.push(openingParObj);
    } else if (cType === 9) {
      if (pre.type === 9) {
        if (pre.value === math_function.math.add) {
          pre.value = cEv;
          pre.show = cShow;
          inc(ptc, 1);
        } else if (pre.value === math_function.math.sub && cShow === '-') {
          pre.value = math_function.math.add;
          pre.show = '+';
          inc(ptc, 1);
        }
      } else if (pre.type !== 5 && pre.type !== 7 && pre.type !== 1 && pre.type !== 3 && pre.type !== 13) { // changesign only when negative is found
        if (cToken === '-') { // do nothing for + token
          // don't add with the above if statement as that will run the else statement of parent if on Ctoken +
          allowed = type0;
          asterick = empty;
          inc(ptc, 2).push(2);
          str.push(changeSignObj);
          str.push(openingParObj);
        }
      } else {
        str.push(obj);
        inc(ptc, 2);
      }
      allowed = type0;
      asterick = empty;
    } else if (cType === 10) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 2);
      str.push(obj);
    } else if (cType === 11) {
      allowed = type0;
      asterick = empty;
      str.push(obj);
    } else if (cType === 12) {
      allowed = type0;
      asterick = empty;
      inc(ptc, 6).push(6);
      str.push(obj);
      str.push(openingParObj);
    } else if (cType === 13) {
      allowed = type1;
      asterick = type3Asterick;
      str.push(obj);
    }
    inc(ptc, -1);
    prevKey = cToken;
  }
  for (j = ptc.length; j--;) { // loop over ptc
    if (ptc[j] === 0) {
      str.push(closingParObj);
      inc(ptc, -1).pop();
    } else break  // if it is not zero so before ptc also cant be zero
  }
  if (allowed[5] !== true) {
    throw (new math_function.Exception('complete the expression'))
  }
  while (bracToClose--) {
    str.push(closingParObj);
  }

  str.push(closingParObj);
  //        console.log(str);
  return new math_function(str)
};
var lexer = math_function;

lexer.prototype.toPostfix = function () {
	var post = [], elem, popped, prep, pre, ele;
	var stack = [{ value: "(", type: 4, pre: 0 }];
	var arr = this.value;
	for (var i = 1; i < arr.length; i++) {
		if (arr[i].type === 1 || arr[i].type === 3 || arr[i].type === 13) {	//if token is number,constant,or n(which is also a special constant in our case)
			if (arr[i].type === 1)
				arr[i].value = Number(arr[i].value);
			post.push(arr[i]);
		}
		else if (arr[i].type === 4) {
			stack.push(arr[i]);
		}
		else if (arr[i].type === 5) {
			while ((popped = stack.pop()).type !== 4) {
				post.push(popped);
			}
		}
		else if (arr[i].type === 11) {
			while ((popped = stack.pop()).type !== 4) {
				post.push(popped);
			}
			stack.push(popped);
		}
		else {
			elem = arr[i];
			pre = elem.pre;
			ele = stack[stack.length - 1];
			prep = ele.pre;
			var flag = ele.value == 'Math.pow' && elem.value == 'Math.pow';
			if (pre > prep) stack.push(elem);
			else {
				while (prep >= pre && !flag || flag && pre < prep) {
					popped = stack.pop();
					ele = stack[stack.length - 1];
					post.push(popped);
					prep = ele.pre;
					flag = elem.value == 'Math.pow' && ele.value == 'Math.pow';
				}
				stack.push(elem);
			}
		}
	}
	return new lexer(post);
};
var postfix = lexer;

postfix.prototype.postfixEval = function (UserDefined) {
	UserDefined=UserDefined||{};
	UserDefined.PI=Math.PI;
	UserDefined.E=Math.E;
	var stack=[],pop1,pop2,pop3;
	var arr=this.value;
	var bool=(typeof UserDefined.n!=="undefined");
	for(var i=0;i<arr.length;i++){
		if(arr[i].type===1){
			stack.push({value:arr[i].value,type:1});
		}
		else if(arr[i].type===3){
			stack.push({value:UserDefined[arr[i].value],type:1});
		}
		else if(arr[i].type===0){
			if(typeof stack[stack.length-1].type==="undefined"){
				stack[stack.length-1].value.push(arr[i]);
			}
			else stack[stack.length-1].value=arr[i].value(stack[stack.length-1].value);
		}
		else if(arr[i].type===7){
			if(typeof stack[stack.length-1].type==="undefined"){
				stack[stack.length-1].value.push(arr[i]);
			}
			else stack[stack.length-1].value=arr[i].value(stack[stack.length-1].value);
		}
		else if(arr[i].type===8){
			pop1=stack.pop();
			pop2=stack.pop();
			stack.push({type:1,value:arr[i].value(pop2.value,pop1.value)});
		}
		else if(arr[i].type===10){
			pop1=stack.pop();
			pop2=stack.pop();
			if(typeof pop2.type==="undefined"){
				pop2.value=pop2.concat(pop1);
				pop2.value.push(arr[i]);
				stack.push(pop2);
			}
			else if (typeof pop1.type==="undefined") {
				pop1.unshift(pop2);
				pop1.push(arr[i]);
				stack.push(pop1);
			}
			else {
				stack.push({type:1,value:arr[i].value(pop2.value,pop1.value)});
            }
		}
		else if(arr[i].type===2||arr[i].type===9){
			pop1=stack.pop();
			pop2=stack.pop();
			if(typeof pop2.type==="undefined"){
				pop2=pop2.concat(pop1);
				pop2.push(arr[i]);
				stack.push(pop2);
			}
			else if (typeof pop1.type==="undefined") {
				pop1.unshift(pop2);
				pop1.push(arr[i]);
				stack.push(pop1);
			}
			else {
				stack.push({type:1,value:arr[i].value(pop2.value,pop1.value)});
			}
		}
		else if(arr[i].type===12){
			pop1=stack.pop();
			if (typeof pop1.type!=="undefined") {
				pop1=[pop1];
			}
			pop2=stack.pop();
			pop3=stack.pop();
			stack.push({type:1,value:arr[i].value(pop3.value,pop2.value,new postfix(pop1))});
		}
		else if(arr[i].type===13){
			if(bool){
				stack.push({value:UserDefined[arr[i].value],type:3});
			}
			else stack.push([arr[i]]);
		}
	}
	if (stack.length>1) {
		throw(new postfix.Exception("Uncaught Syntax error"));
	}
	return stack[0].value>1000000000000000?"Infinity":parseFloat(stack[0].value.toFixed(15));
};
postfix.eval=function(str,tokens,obj){
	if (typeof tokens==="undefined") {
		return this.lex(str).toPostfix().postfixEval();
	}
	else if (typeof obj==="undefined") {
		if (typeof tokens.length!=="undefined") 
			return this.lex(str,tokens).toPostfix().postfixEval();
		else
			return this.lex(str).toPostfix().postfixEval(tokens);
	}
	else
		return this.lex(str,tokens).toPostfix().postfixEval(obj);
};
var postfix_evaluator=postfix;

postfix_evaluator.prototype.formulaEval = function () {
	var pop1,pop2,pop3;
	var disp=[];
	var arr=this.value;
	for(var i=0;i<arr.length;i++){
		if(arr[i].type===1||arr[i].type===3){
			disp.push({value:arr[i].type===3?arr[i].show:arr[i].value,type:1});
		}
		else if(arr[i].type===13){
			disp.push({value:arr[i].show,type:1});
		}
		else if(arr[i].type===0){
			disp[disp.length-1]={value:arr[i].show+(arr[i].show!="-"?"(":"")+disp[disp.length-1].value+(arr[i].show!="-"?")":""),type:0};
		}
		else if(arr[i].type===7){
			disp[disp.length-1]={value:(disp[disp.length-1].type!=1?"(":"")+disp[disp.length-1].value+(disp[disp.length-1].type!=1?")":"")+arr[i].show,type:7};
		}
		else if(arr[i].type===10){
			pop1=disp.pop();
			pop2=disp.pop();
			if(arr[i].show==='P'||arr[i].show==='C')disp.push({value:"<sup>"+pop2.value+"</sup>"+arr[i].show+"<sub>"+pop1.value+"</sub>",type:10});
			else disp.push({value:(pop2.type!=1?"(":"")+pop2.value+(pop2.type!=1?")":"")+"<sup>"+pop1.value+"</sup>",type:1});
		}
		else if(arr[i].type===2||arr[i].type===9){
			pop1=disp.pop();
			pop2=disp.pop();
			disp.push({value:(pop2.type!=1?"(":"")+pop2.value+(pop2.type!=1?")":"")+arr[i].show+(pop1.type!=1?"(":"")+pop1.value+(pop1.type!=1?")":""),type:arr[i].type});
		}
		else if(arr[i].type===12){
			pop1=disp.pop();
			pop2=disp.pop();
			pop3=disp.pop();
			disp.push({value:arr[i].show+"("+pop3.value+","+pop2.value+","+pop1.value+")",type:12});
		}
	}
	return disp[0].value;
};
var formula_evaluator=postfix_evaluator;

/**
 * Module dependencies
 */




/**
 * Constantes
 */
var MAX_STACK = 100; // should be enough for a single calc()...
var NESTED_CALC_RE = /(\+|\-|\*|\\|[^a-z]|)(\s*)(\()/g;

/**
 * Global variables
 */
var stack;

/**
 * Expose reduceCSSCalc plugin
 *
 * @type {Function}
 */
var reduceCssCalc = reduceCSSCalc;

/**
 * Reduce CSS calc() in a string, whenever it's possible
 *
 * @param {String} value css input
 */
function reduceCSSCalc(value, decimalPrecision) {
  stack = 0;
  decimalPrecision = Math.pow(10, decimalPrecision === undefined ? 5 : decimalPrecision);

  // Allow calc() on multiple lines
  value = value.replace(/\n+/g, " ");

  /**
   * Evaluates an expression
   *
   * @param {String} expression
   * @returns {String}
   */
  function evaluateExpression (expression, functionIdentifier, call) {
    if (stack++ > MAX_STACK) {
      stack = 0;
      throw new Error("Call stack overflow for " + call)
    }

    if (expression === "") {
      throw new Error(functionIdentifier + "(): '" + call + "' must contain a non-whitespace string")
    }

    expression = evaluateNestedExpression(expression, call);

    var units = getUnitsInExpression(expression);

    // If the expression contains multiple units or CSS variables,
    // then let the expression be (i.e. browser calc())
    if (units.length > 1 || expression.indexOf("var(") > -1) {
      return functionIdentifier + "(" + expression + ")"
    }

    var unit = units[0] || "";

    if (unit === "%") {
      // Convert percentages to numbers, to handle expressions like: 50% * 50% (will become: 25%):
      // console.log(expression)
      expression = expression.replace(/\b[0-9\.]+%/g, function(percent) {
        return parseFloat(percent.slice(0, -1)) * 0.01
      });
    }

    // Remove units in expression:
    var toEvaluate = expression.replace(new RegExp(unit, "gi"), "");
    var result;

    try {
      result = formula_evaluator.eval(toEvaluate);
    }
    catch (e) {
      return functionIdentifier + "(" + expression + ")"
    }

    // Transform back to a percentage result:
    if (unit === "%") {
      result *= 100;
    }

    // adjust rounding shit
    // (0.1 * 0.2 === 0.020000000000000004)
    if (functionIdentifier.length || unit === "%") {
      result = Math.round(result * decimalPrecision) / decimalPrecision;
    }

    // Add unit
    result += unit;

    return result
  }

  /**
   * Evaluates nested expressions
   *
   * @param {String} expression
   * @returns {String}
   */
  function evaluateNestedExpression(expression, call) {
    // Remove the calc part from nested expressions to ensure
    // better browser compatibility
    expression = expression.replace(/((?:\-[a-z]+\-)?calc)/g, "");
    var evaluatedPart = "";
    var nonEvaluatedPart = expression;
    var matches;
    while ((matches = NESTED_CALC_RE.exec(nonEvaluatedPart))) {
      if (matches[0].index > 0) {
        evaluatedPart += nonEvaluatedPart.substring(0, matches[0].index);
      }

      var balancedExpr = balancedMatch("(", ")", nonEvaluatedPart.substring([0].index));
      if (balancedExpr.body === "") {
        throw new Error("'" + expression + "' must contain a non-whitespace string")
      }

      var evaluated = evaluateExpression(balancedExpr.body, "", call);

      evaluatedPart += balancedExpr.pre + evaluated;
      nonEvaluatedPart = balancedExpr.post;
    }

    return evaluatedPart + nonEvaluatedPart
  }

  return reduceFunctionCall_1(value, /((?:\-[a-z]+\-)?calc)\(/, evaluateExpression)
}

/**
 * Checks what units are used in an expression
 *
 * @param {String} expression
 * @returns {Array}
 */

function getUnitsInExpression(expression) {
  var uniqueUnits = [];
  var uniqueLowerCaseUnits = [];
  var unitRegEx = /[\.0-9]([%a-z]+)/gi;
  var matches = unitRegEx.exec(expression);

  while (matches) {
    if (!matches || !matches[1]) {
      continue
    }

    if (uniqueLowerCaseUnits.indexOf(matches[1].toLowerCase()) === -1) {
      uniqueUnits.push(matches[1]);
      uniqueLowerCaseUnits.push(matches[1].toLowerCase());
    }

    matches = unitRegEx.exec(expression);
  }

  return uniqueUnits
}

var MEASUREMENT_ELEMENT_ID = '__react_svg_text_measurement_id';

function getStringWidth(str, style) {
  try {
    // Calculate length of each word to be used to determine number of words per line
    var textEl = document.getElementById(MEASUREMENT_ELEMENT_ID);

    if (!textEl) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.style.width = '0';
      svg.style.height = '0';
      svg.style.position = 'absolute';
      svg.style.top = '-100%';
      svg.style.left = '-100%';
      textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      textEl.setAttribute('id', MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }

    Object.assign(textEl.style, style);
    textEl.textContent = str;
    return textEl.getComputedTextLength();
  } catch (e) {
    return null;
  }
}

var getStringWidth$1 = memoize_1(getStringWidth, function (str, style) {
  return str + "_" + JSON.stringify(style);
});

function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function isNumber(val) {
  return typeof val === 'number';
}

function isXOrYInValid(xOrY) {
  return (// number that is not NaN or Infinity
    typeof xOrY === 'number' && Number.isFinite(xOrY) || // for percentage
    typeof xOrY === 'string'
  );
}

function useText(props) {
  var _props$verticalAnchor = props.verticalAnchor,
      verticalAnchor = _props$verticalAnchor === void 0 ? 'end' : _props$verticalAnchor,
      _props$scaleToFit = props.scaleToFit,
      scaleToFit = _props$scaleToFit === void 0 ? false : _props$scaleToFit,
      angle = props.angle,
      width = props.width,
      _props$lineHeight = props.lineHeight,
      lineHeight = _props$lineHeight === void 0 ? '1em' : _props$lineHeight,
      _props$capHeight = props.capHeight,
      capHeight = _props$capHeight === void 0 ? '0.71em' : _props$capHeight,
      children = props.children,
      style = props.style,
      textProps = _objectWithoutPropertiesLoose$1(props, ["verticalAnchor", "scaleToFit", "angle", "width", "lineHeight", "capHeight", "children", "style"]);

  var _textProps$x = textProps.x,
      x = _textProps$x === void 0 ? 0 : _textProps$x,
      _textProps$y = textProps.y,
      y = _textProps$y === void 0 ? 0 : _textProps$y;
  var isXOrYNotValid = !isXOrYInValid(x) || !isXOrYInValid(y);

  var _useMemo = react.useMemo(function () {
    var words = children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/);
    return {
      wordsWithWidth: words.map(function (word) {
        return {
          word: word,
          wordWidth: getStringWidth$1(word, style) || 0
        };
      }),
      spaceWidth: getStringWidth$1("\xA0", style) || 0
    };
  }, [children, style]),
      wordsWithWidth = _useMemo.wordsWithWidth,
      spaceWidth = _useMemo.spaceWidth;

  var wordsByLines = react.useMemo(function () {
    if (isXOrYNotValid) {
      return [];
    } // Only perform calculations if using features that require them (multiline, scaleToFit)


    if (width || scaleToFit) {
      return wordsWithWidth.reduce(function (result, _ref) {
        var word = _ref.word,
            wordWidth = _ref.wordWidth;
        var currentLine = result[result.length - 1];

        if (currentLine && (width == null || scaleToFit || (currentLine.width || 0) + wordWidth + spaceWidth < width)) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width = currentLine.width || 0;
          currentLine.width += wordWidth + spaceWidth;
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          var newLine = {
            words: [word],
            width: wordWidth
          };
          result.push(newLine);
        }

        return result;
      }, []);
    }

    return [{
      words: children == null ? [] : children.toString().split(/(?:(?!\u00A0+)\s+)/)
    }];
  }, [isXOrYNotValid, width, scaleToFit, children, wordsWithWidth, spaceWidth]);
  var startDy = react.useMemo(function () {
    var startDyStr = isXOrYNotValid ? '' : verticalAnchor === 'start' ? reduceCssCalc("calc(" + capHeight + ")") : verticalAnchor === 'middle' ? reduceCssCalc("calc(" + (wordsByLines.length - 1) / 2 + " * -" + lineHeight + " + (" + capHeight + " / 2))") : reduceCssCalc("calc(" + (wordsByLines.length - 1) + " * -" + lineHeight + ")");
    return startDyStr;
  }, [isXOrYNotValid, verticalAnchor, capHeight, wordsByLines.length, lineHeight]);
  var transform = react.useMemo(function () {
    var transforms = [];

    if (isXOrYNotValid) {
      return '';
    }

    if (isNumber(x) && isNumber(y) && isNumber(width) && scaleToFit && wordsByLines.length > 0) {
      var lineWidth = wordsByLines[0].width || 1;
      var sx = width / lineWidth;
      var sy = sx;
      var originX = x - sx * x;
      var originY = y - sy * y;
      transforms.push("matrix(" + sx + ", 0, 0, " + sy + ", " + originX + ", " + originY + ")");
    }

    if (angle) {
      transforms.push("rotate(" + angle + ", " + x + ", " + y + ")");
    }

    return transforms.length > 0 ? transforms.join(' ') : '';
  }, [isXOrYNotValid, x, y, width, scaleToFit, wordsByLines, angle]);
  return {
    wordsByLines: wordsByLines,
    startDy: startDy,
    transform: transform
  };
}

function _extends$1() { _extends$1 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$1.apply(this, arguments); }

function _objectWithoutPropertiesLoose$2(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var SVG_STYLE = {
  overflow: 'visible'
};
function Text(props) {
  var _props$dx = props.dx,
      dx = _props$dx === void 0 ? 0 : _props$dx,
      _props$dy = props.dy,
      dy = _props$dy === void 0 ? 0 : _props$dy,
      _props$textAnchor = props.textAnchor,
      textAnchor = _props$textAnchor === void 0 ? 'start' : _props$textAnchor,
      innerRef = props.innerRef;
      props.verticalAnchor;
      props.angle;
      var _props$lineHeight = props.lineHeight,
      lineHeight = _props$lineHeight === void 0 ? '1em' : _props$lineHeight;
      props.scaleToFit;
      props.capHeight;
      props.width;
      var textProps = _objectWithoutPropertiesLoose$2(props, ["dx", "dy", "textAnchor", "innerRef", "verticalAnchor", "angle", "lineHeight", "scaleToFit", "capHeight", "width"]);

  var _textProps$x = textProps.x,
      x = _textProps$x === void 0 ? 0 : _textProps$x,
      fontSize = textProps.fontSize;

  var _useText = useText(props),
      wordsByLines = _useText.wordsByLines,
      startDy = _useText.startDy,
      transform = _useText.transform;

  return /*#__PURE__*/react.createElement("svg", {
    ref: innerRef,
    x: dx,
    y: dy,
    fontSize: fontSize,
    style: SVG_STYLE
  }, wordsByLines.length > 0 ? /*#__PURE__*/react.createElement("text", _extends$1({
    transform: transform
  }, textProps, {
    textAnchor: textAnchor
  }), wordsByLines.map(function (line, index) {
    return /*#__PURE__*/react.createElement("tspan", {
      key: index,
      x: x,
      dy: index === 0 ? startDy : lineHeight
    }, line.words.join(' '));
  })) : null);
}

var Orientation = {
  top: 'top',
  left: 'left',
  right: 'right',
  bottom: 'bottom'
};

function getLabelTransform(_ref) {
  var labelOffset = _ref.labelOffset,
      labelProps = _ref.labelProps,
      orientation = _ref.orientation,
      range = _ref.range,
      tickLabelFontSize = _ref.tickLabelFontSize,
      tickLength = _ref.tickLength;
  var sign = orientation === Orientation.left || orientation === Orientation.top ? -1 : 1;
  var x;
  var y;
  var transform;

  if (orientation === Orientation.top || orientation === Orientation.bottom) {
    var yBottomOffset = orientation === Orientation.bottom && typeof labelProps.fontSize === 'number' ? labelProps.fontSize : 0;
    x = (Number(range[0]) + Number(range[range.length - 1])) / 2;
    y = sign * (tickLength + labelOffset + tickLabelFontSize + yBottomOffset);
  } else {
    x = sign * ((Number(range[0]) + Number(range[range.length - 1])) / 2);
    y = -(tickLength + labelOffset);
    transform = "rotate(" + sign * 90 + ")";
  }

  return {
    x: x,
    y: y,
    transform: transform
  };
}

function _extends$2() { _extends$2 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$2.apply(this, arguments); }
function Ticks(_ref) {
  var hideTicks = _ref.hideTicks,
      horizontal = _ref.horizontal,
      orientation = _ref.orientation,
      tickClassName = _ref.tickClassName,
      tickComponent = _ref.tickComponent,
      allTickLabelProps = _ref.tickLabelProps,
      _ref$tickStroke = _ref.tickStroke,
      tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
      tickTransform = _ref.tickTransform,
      ticks = _ref.ticks;
  return ticks.map(function (_ref2) {
    var _allTickLabelProps$in;

    var value = _ref2.value,
        index = _ref2.index,
        from = _ref2.from,
        to = _ref2.to,
        formattedValue = _ref2.formattedValue;
    var tickLabelProps = (_allTickLabelProps$in = allTickLabelProps[index]) != null ? _allTickLabelProps$in : {};
    var tickLabelFontSize = Math.max(10, typeof tickLabelProps.fontSize === 'number' && tickLabelProps.fontSize || 0);
    var tickYCoord = to.y + (horizontal && orientation !== Orientation.top ? tickLabelFontSize : 0);
    return /*#__PURE__*/react.createElement(Group, {
      key: "visx-tick-" + value + "-" + index,
      className: classnames('visx-axis-tick', tickClassName),
      transform: tickTransform
    }, !hideTicks && /*#__PURE__*/react.createElement(Line, {
      from: from,
      to: to,
      stroke: tickStroke,
      strokeLinecap: "square"
    }), tickComponent ? tickComponent(_extends$2({}, tickLabelProps, {
      x: to.x,
      y: tickYCoord,
      formattedValue: formattedValue
    })) : /*#__PURE__*/react.createElement(Text, _extends$2({
      x: to.x,
      y: tickYCoord
    }, tickLabelProps), formattedValue));
  });
}

function _extends$3() { _extends$3 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$3.apply(this, arguments); }
var defaultTextProps = {
  textAnchor: 'middle',
  fontFamily: 'Arial',
  fontSize: 10,
  fill: '#222'
};
function AxisRenderer(_ref) {
  var axisFromPoint = _ref.axisFromPoint,
      axisLineClassName = _ref.axisLineClassName,
      axisToPoint = _ref.axisToPoint,
      hideAxisLine = _ref.hideAxisLine,
      hideTicks = _ref.hideTicks,
      horizontal = _ref.horizontal,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '' : _ref$label,
      labelClassName = _ref.labelClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 14 : _ref$labelOffset,
      _ref$labelProps = _ref.labelProps,
      labelProps = _ref$labelProps === void 0 ? defaultTextProps : _ref$labelProps,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? Orientation.bottom : _ref$orientation,
      scale = _ref.scale,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#222' : _ref$stroke,
      strokeDasharray = _ref.strokeDasharray,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? 1 : _ref$strokeWidth,
      tickClassName = _ref.tickClassName,
      tickComponent = _ref.tickComponent,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? function () {
    return (
      /** tickValue, index */
      defaultTextProps
    );
  } : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      _ref$tickStroke = _ref.tickStroke,
      tickStroke = _ref$tickStroke === void 0 ? '#222' : _ref$tickStroke,
      tickTransform = _ref.tickTransform,
      ticks = _ref.ticks,
      _ref$ticksComponent = _ref.ticksComponent,
      ticksComponent = _ref$ticksComponent === void 0 ? Ticks : _ref$ticksComponent;
  // compute the max tick label size to compute label offset
  var allTickLabelProps = ticks.map(function (_ref2) {
    var value = _ref2.value,
        index = _ref2.index;
    return tickLabelProps(value, index);
  });
  var maxTickLabelFontSize = Math.max.apply(Math, [10].concat(allTickLabelProps.map(function (props) {
    return typeof props.fontSize === 'number' ? props.fontSize : 0;
  })));
  return /*#__PURE__*/react.createElement(react.Fragment, null, ticksComponent({
    hideTicks: hideTicks,
    horizontal: horizontal,
    orientation: orientation,
    scale: scale,
    tickClassName: tickClassName,
    tickComponent: tickComponent,
    tickLabelProps: allTickLabelProps,
    tickStroke: tickStroke,
    tickTransform: tickTransform,
    ticks: ticks
  }), !hideAxisLine && /*#__PURE__*/react.createElement(Line, {
    className: classnames('visx-axis-line', axisLineClassName),
    from: axisFromPoint,
    to: axisToPoint,
    stroke: stroke,
    strokeWidth: strokeWidth,
    strokeDasharray: strokeDasharray
  }), label && /*#__PURE__*/react.createElement(Text, _extends$3({
    className: classnames('visx-axis-label', labelClassName)
  }, getLabelTransform({
    labelOffset: labelOffset,
    labelProps: labelProps,
    orientation: orientation,
    range: scale.range(),
    tickLabelFontSize: maxTickLabelFontSize,
    tickLength: tickLength
  }), labelProps), label));
}

/**
 * Create a function that returns a tick position for the given tick value
 */
function getTickPosition(scale, align) {
  if (align === void 0) {
    align = 'center';
  }

  // Broaden type before using 'xxx' in s as typeguard.
  var s = scale; // For point or band scales,
  // have to add offset to make the tick at center or end.

  if (align !== 'start' && 'bandwidth' in s) {
    var offset = s.bandwidth();
    if (align === 'center') offset /= 2;
    if (s.round()) offset = Math.round(offset);
    return function (d) {
      var scaledValue = s(d);
      return typeof scaledValue === 'number' ? scaledValue + offset : scaledValue;
    };
  }

  return scale;
}

/**
 * Returns a tick position for the given tick value
 */
function getTickFormatter(scale) {
  // Broaden type before using 'xxx' in s as typeguard.
  var s = scale; // For point or band scales,
  // have to add offset to make the tick centered.

  if ('tickFormat' in s) {
    return s.tickFormat();
  }

  return toString;
}

function createPoint(_ref, horizontal) {
  var x = _ref.x,
      y = _ref.y;
  return new Point(horizontal ? {
    x: x,
    y: y
  } : {
    x: y,
    y: x
  });
}

function _extends$4() { _extends$4 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$4.apply(this, arguments); }

function _objectWithoutPropertiesLoose$3(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function Axis(_ref) {
  var _ref$children = _ref.children,
      children = _ref$children === void 0 ? AxisRenderer : _ref$children,
      axisClassName = _ref.axisClassName,
      _ref$hideAxisLine = _ref.hideAxisLine,
      hideAxisLine = _ref$hideAxisLine === void 0 ? false : _ref$hideAxisLine,
      _ref$hideTicks = _ref.hideTicks,
      hideTicks = _ref$hideTicks === void 0 ? false : _ref$hideTicks,
      _ref$hideZero = _ref.hideZero,
      hideZero = _ref$hideZero === void 0 ? false : _ref$hideZero,
      _ref$left = _ref.left,
      left = _ref$left === void 0 ? 0 : _ref$left,
      _ref$numTicks = _ref.numTicks,
      numTicks = _ref$numTicks === void 0 ? 10 : _ref$numTicks,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? Orientation.bottom : _ref$orientation,
      _ref$rangePadding = _ref.rangePadding,
      rangePadding = _ref$rangePadding === void 0 ? 0 : _ref$rangePadding,
      scale = _ref.scale,
      tickFormat = _ref.tickFormat,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      tickValues = _ref.tickValues,
      _ref$top = _ref.top,
      top = _ref$top === void 0 ? 0 : _ref$top,
      restProps = _objectWithoutPropertiesLoose$3(_ref, ["children", "axisClassName", "hideAxisLine", "hideTicks", "hideZero", "left", "numTicks", "orientation", "rangePadding", "scale", "tickFormat", "tickLength", "tickValues", "top"]);

  var format = tickFormat != null ? tickFormat : getTickFormatter(scale);
  var isLeft = orientation === Orientation.left;
  var isTop = orientation === Orientation.top;
  var horizontal = isTop || orientation === Orientation.bottom;
  var tickPosition = getTickPosition(scale);
  var tickSign = isLeft || isTop ? -1 : 1;
  var range = scale.range();
  var axisFromPoint = createPoint({
    x: Number(range[0]) + 0.5 - rangePadding,
    y: 0
  }, horizontal);
  var axisToPoint = createPoint({
    x: Number(range[range.length - 1]) + 0.5 + rangePadding,
    y: 0
  }, horizontal);
  var filteredTickValues = (tickValues != null ? tickValues : getTicks(scale, numTicks)).filter(function (value) {
    return !hideZero || value !== 0 && value !== '0';
  }).map(function (value, index) {
    return {
      value: value,
      index: index
    };
  });
  var ticks = filteredTickValues.map(function (_ref2) {
    var value = _ref2.value,
        index = _ref2.index;
    var scaledValue = coerceNumber(tickPosition(value));
    return {
      value: value,
      index: index,
      from: createPoint({
        x: scaledValue,
        y: 0
      }, horizontal),
      to: createPoint({
        x: scaledValue,
        y: tickLength * tickSign
      }, horizontal),
      formattedValue: format(value, index, filteredTickValues)
    };
  });
  return /*#__PURE__*/react.createElement(Group, {
    className: classnames('visx-axis', axisClassName),
    top: top,
    left: left
  }, children(_extends$4({}, restProps, {
    axisFromPoint: axisFromPoint,
    axisToPoint: axisToPoint,
    hideAxisLine: hideAxisLine,
    hideTicks: hideTicks,
    hideZero: hideZero,
    horizontal: horizontal,
    numTicks: numTicks,
    orientation: orientation,
    rangePadding: rangePadding,
    scale: scale,
    tickFormat: format,
    tickLength: tickLength,
    tickPosition: tickPosition,
    tickSign: tickSign,
    ticks: ticks
  })));
}

function _extends$5() { _extends$5 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$5.apply(this, arguments); }

function _objectWithoutPropertiesLoose$4(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var leftTickLabelProps = function leftTickLabelProps() {
  return (
    /** tickValue, index */
    {
      dx: '-0.25em',
      dy: '0.25em',
      fill: '#222',
      fontFamily: 'Arial',
      fontSize: 10,
      textAnchor: 'end'
    }
  );
};
function AxisLeft(_ref) {
  var axisClassName = _ref.axisClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 36 : _ref$labelOffset,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? leftTickLabelProps : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      restProps = _objectWithoutPropertiesLoose$4(_ref, ["axisClassName", "labelOffset", "tickLabelProps", "tickLength"]);

  return /*#__PURE__*/react.createElement(Axis, _extends$5({
    axisClassName: classnames('visx-axis-left', axisClassName),
    labelOffset: labelOffset,
    orientation: Orientation.left,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength
  }, restProps));
}

function _extends$6() { _extends$6 = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends$6.apply(this, arguments); }

function _objectWithoutPropertiesLoose$5(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var bottomTickLabelProps = function bottomTickLabelProps() {
  return (
    /** tickValue, index */
    {
      dy: '0.25em',
      fill: '#222',
      fontFamily: 'Arial',
      fontSize: 10,
      textAnchor: 'middle'
    }
  );
};
function AxisBottom(_ref) {
  var axisClassName = _ref.axisClassName,
      _ref$labelOffset = _ref.labelOffset,
      labelOffset = _ref$labelOffset === void 0 ? 8 : _ref$labelOffset,
      _ref$tickLabelProps = _ref.tickLabelProps,
      tickLabelProps = _ref$tickLabelProps === void 0 ? bottomTickLabelProps : _ref$tickLabelProps,
      _ref$tickLength = _ref.tickLength,
      tickLength = _ref$tickLength === void 0 ? 8 : _ref$tickLength,
      restProps = _objectWithoutPropertiesLoose$5(_ref, ["axisClassName", "labelOffset", "tickLabelProps", "tickLength"]);

  return /*#__PURE__*/react.createElement(Axis, _extends$6({
    axisClassName: classnames('visx-axis-bottom', axisClassName),
    labelOffset: labelOffset,
    orientation: Orientation.bottom,
    tickLabelProps: tickLabelProps,
    tickLength: tickLength
  }, restProps));
}

export { AxisBottom, AxisLeft };
