// Generated by CoffeeScript 1.9.3

/**
 * react template
 * @module mcore/rtemplate
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  var slice = [].slice;

  define('mcore/rtemplate', ['jquery', 'react', 'mcore/class'], function($, React, EventClass) {
    "use strict";
    var Template;
    Template = EventClass.extend({
      initialize: function(tagName, proto1) {
        this.tagName = tagName;
        this.proto = proto1 != null ? proto1 : {};
        if (this.proto.hasOwnProperty('init')) {
          this.proto.init.call(this);
        }
      }
    });
    Template.prototype.render = function(uri, data) {
      if (data == null) {
        data = {};
      }
      this.emit('beforeRender');
      if (this.View) {
        return Template.loadPromise(data).then((function(_this) {
          return function(data) {
            var res;
            res = {
              View: _this.View,
              data: data
            };
            _this.emit('render', res);
            return res;
          };
        })(this));
      } else {
        return Template.loadTpl(uri).then((function(_this) {
          return function(jsxDom) {
            _this.jsxDom = jsxDom;
            return Template.loadPromise(data);
          };
        })(this)).then((function(_this) {
          return function(data) {
            var jsxDom, proto, res;
            jsxDom = _this.jsxDom;
            proto = $.extend({}, _this.proto);
            proto.displayName = _this.tagName;
            proto.render = function() {
              return jsxDom;
            };
            _this.View = React.createClass(proto);
            res = {
              View: _this.View,
              data: data
            };
            _this.emit('render', res);
            return res;
          };
        })(this));
      }
    };
    Template.loadPromise = function(data) {
      var dtd, keys, promises;
      dtd = $.Deferred();
      keys = Object.keys(data);
      if (keys.length === 0) {
        dtd.resolve({});
      } else {
        promises = [];
        keys.forEach((function(_this) {
          return function(v) {
            return promises.push(data[v]);
          };
        })(this));
        $.when.apply(null, promises).done(function() {
          var args, vData;
          args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
          vData = {};
          args.forEach((function(_this) {
            return function(v, k) {
              var key;
              key = keys[k];
              if (key) {
                if (Array.isArray(v) && v.length === 3 && v[2].promise) {
                  v = v[0];
                }
                return vData[key] = v;
              }
            };
          })(this));
          return dtd.resolve(vData);
        }).fail(function(err) {
          console.log(err);
          return dtd.reject(err);
        });
      }
      return dtd.promise();
    };

    /**
     * 加载amd规范的模板，
     * 包名必须为 tpl/ 前缀
     */
    Template.loadTpl = function(uri) {
      var dtd, info;
      dtd = $.Deferred();
      info = String(uri).split('/');
      if (info.length === 2) {
        requirejs(["tpl/" + info[0]], function(tpl) {
          var html;
          html = tpl[info[1]];
          if (html) {
            return dtd.resolve(html);
          } else {
            return dtd.reject('url data map error');
          }
        });
      } else {
        dtd.reject('uri error: ' + uri);
      }
      return dtd.promise();
    };
    Template.render = function(View, data, mountNode) {
      return React.render(React.createElement(View, data), mountNode);
    };
    return Template;
  });

}).call(this);
