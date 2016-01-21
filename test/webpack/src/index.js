// Generated by CoffeeScript 1.10.0

/**
 * 
 * @date 2016-01-09 14:12:49
 * @author vfasky <vfasky@gmail.com>
 * @link http://vfasky.com
 */
'use strict';
var Template;

Template = require('mcore').Template;

exports.test = function() {
  var tpl;
  tpl = new Template;
  return tpl.render(require('./tpl/test.html'), {
    id: 'test2',
    list: [
      {
        name: 'ok1'
      }, {
        name: 'ok2'
      }
    ],
    isShow: false,
    books: {
      '1': {
        id: 0,
        name: 'book1'
      },
      '2': {
        id: 1,
        name: 'book2'
      }
    }
  }, function() {
    document.body.appendChild(tpl.refs);
    return setTimeout(function() {
      tpl.set('time', (new Date()).getTime());
      return setTimeout(function() {
        return tpl.set('isShow', true);
      }, 1000);
    }, 1000);
  });
};
