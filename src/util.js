// Generated by CoffeeScript 1.10.0

/**
 * util
 * @module mcore/util
 * @author vfasky <vfasky@gmail.com>
 */
"use strict";
var _cachePre, _isNumberReg, _localStorage, _memoryStorage;

_isNumberReg = /^-{0,1}\d*\.{0,1}\d+$/;

_cachePre = '__cache_';

_localStorage = window.localStorage;

_memoryStorage = {};

exports.isNumber = function(x) {
  return _isNumberReg.test(x);
};

exports.isObject = function(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
};

exports.isString = function(x) {
  return Object.prototype.toString.call(x) === '[object String]';
};

exports.clone = function(value) {
  return JSON.parse(JSON.stringify(value));
};

exports.cache = {
  set: function(key, value, time) {
    var data;
    if (time == null) {
      time = Infinity;
    }
    if (time !== Infinity) {
      time = (new Date()).getTime() + parseInt(time);
    }
    data = {
      time: time,
      value: value
    };
    return _localStorage.setItem(_cachePre + key, JSON.stringify(data));
  },
  get: function(key, defaultVal) {
    var curTime, data;
    if (defaultVal == null) {
      defaultVal = null;
    }
    data = _localStorage.getItem(_cachePre + key);
    if (!data) {
      return defaultVal;
    }
    data = JSON.parse(data);
    curTime = (new Date()).getTime();
    if (curTime <= data.time) {
      return data.value;
    }
    exports.cache.remove(key);
    return defaultVal;
  },
  remove: function(key) {
    return _localStorage.removeItem(_cachePre + key);
  }
};


/**
 * promise cache
 * @author vfasky <vfasky@gmail.com>
 * @param key 缓存key
 */

exports.promiseCache = function(key, promise, options) {
  var data, dtd;
  data = options.proxy.get(key);
  if (data) {
    dtd = $.Deferred();
    dtd.resolve(exports.clone(data));
    return dtd.promise();
  } else {
    return promise().then(function(res) {
      return options.proxy.set(key, exports.clone(res), options.time);
    });
  }
};


/**
 * 基于本地存放的cache
 * @author vfasky <vfasky@gmail.com>
 *
 */

exports.promiseCacheLocalProxy = {
  set: exports.cache.set,
  get: exports.cache.get,
  remove: exports.cache.remove
};


/**
 * 基于内存的cache
 * @author vfasky <vfasky@gmail.com>
 *
 */

exports.promiseCacheMemoryproxy = {
  set: function(key, value) {
    return _memoryStorage[key] = value;
  },
  get: function(key) {
    return _memoryStorage[key] || null;
  },
  remove: function(key) {
    return delete _memoryStorage[key];
  }
};


/**
 * 遍历数组
 */

exports.each = function(arr, cb) {
  var k, ref, v;
  if (cb == null) {
    cb = function() {};
  }
  if (false === Array.isArray(arr)) {
    return;
  }
  for (k in arr) {
    v = arr[k];
    ref = cb(v, k);
    if (false === ref) {
      break;
    }
  }
};

exports.format = function(format) {
  var arg, argIndex, args, c, escaped, i, n, nextArg, precision, result, slurpNumber;
  argIndex = 1;
  args = [].slice.call(arguments);
  i = 0;
  n = format.length;
  result = '';
  c = void 0;
  escaped = false;
  arg = void 0;
  precision = void 0;
  nextArg = function() {
    return args[argIndex++];
  };
  slurpNumber = function() {
    var digits;
    digits = '';
    while (format[i].match(/\d/)) {
      digits += format[i++];
    }
    if (digits.length > 0) {
      return parseInt(digits);
    } else {
      return null;
    }
  };
  while (i < n) {
    c = format[i];
    if (escaped) {
      escaped = false;
      precision = slurpNumber();
      switch (c) {
        case 'b':
          result += parseInt(nextArg(), 10).toString(2);
          break;
        case 'c':
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String) {
            result += arg;
          } else {
            result += String.fromCharCode(parseInt(arg, 10));
          }
          break;
        case 'd':
          result += parseInt(nextArg(), 10);
          break;
        case 'f':
          result += parseFloat(nextArg()).toFixed(precision || 6);
          break;
        case 'o':
          result += '0' + parseInt(nextArg(), 10).toString(8);
          break;
        case 's':
          result += nextArg();
          break;
        case 'x':
          result += '0x' + parseInt(nextArg(), 10).toString(16);
          break;
        case 'X':
          result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
          break;
        default:
          result += c;
          break;
      }
    } else if (c === '%') {
      escaped = true;
    } else {
      result += c;
    }
    ++i;
  }
  return result;
};
