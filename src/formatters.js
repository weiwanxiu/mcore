// Generated by CoffeeScript 1.10.0

/**
 * 过滤函数
 * @date 2016-01-13 18:07:10
 * @author vfasky <vfasky@gmail.com>
 * @link http://vfasky.com
 */
'use strict';
var Template, util;

Template = require('./template');

util = require('./util');

exports['toNumber'] = function(x) {
  if (false === util.isNumber(x)) {
    return 0;
  }
  return Number(x);
};

exports['toFixed'] = function(x, len) {
  if (len == null) {
    len = 1;
  }
  return Number(x).toFixed(len);
};
