// Generated by CoffeeScript 1.9.3

/**
 * 启动
 * @module cnode/bootstrap
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  "use strict";
  var $, init, mcore, middleware;

  $ = require('jquery');

  mcore = require('mcoreExt');

  middleware = require('middleware');

  require('tag');

  require('attr');

  init = false;

  module.exports = function(select, loadSelect) {
    var app;
    app = new mcore.App($(select));
    app.use(middleware.loader);
    app.route('/topic/:id', require('./topic')).route('/user/:userName', require('./user')).route('*', require('./index'));
    app.on('runView', function() {
      if (init === false) {
        init = true;
        return $(loadSelect).remove();
      }
    });
    return app.run();
  };

}).call(this);