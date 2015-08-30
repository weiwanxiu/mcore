// Generated by CoffeeScript 1.9.3

/**
 * util
 * @module mcore/util
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('mcore/util', function() {
    "use strict";
    var _isNumberReg, exports;
    exports = {};
    _isNumberReg = /^-{0,1}\d*\.{0,1}\d+$/;
    exports.isNumber = function(x) {
      return _isNumberReg.test(x);
    };
    exports.isObject = function(x) {
      return Object.prototype.toString.call(x) === '[object Object]';
    };
    exports.clone = function(value) {
      return JSON.parse(JSON.stringify(value));
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
    return exports;
  });

}).call(this);
