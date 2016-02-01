(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mcore"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["mcore", "jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("mcore"), require("jquery")) : factory(root["mcore"], root["jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_16__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * 
	 * @date 2016-01-26 11:37:47
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 */
	'use strict';
	var mcore;

	mcore = __webpack_require__(14);

	mcore.App = __webpack_require__(15);

	mcore.Route = __webpack_require__(17);

	mcore.BaseClass = __webpack_require__(18);

	mcore.View = __webpack_require__(19);

	mcore.http = __webpack_require__(20);

	module.exports = mcore;


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * app
	 * @module mcore/app
	 * @author vfasky <vfasky@gmail.com>
	 */
	"use strict";
	var $, App, EventEmitter, ref, route, util,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	$ = __webpack_require__(16);

	route = __webpack_require__(17);

	ref = __webpack_require__(14), util = ref.util, EventEmitter = ref.EventEmitter;

	App = (function(superClass) {
	  extend(App, superClass);

	  function App($el1, options) {
	    this.$el = $el1;
	    if (options == null) {
	      options = {};
	    }
	    this.options = $.extend({
	      viewClass: 'mcore-app-view',
	      routeChange: route.Route.changeByLocationHash
	    }, options);
	    this.router = new route.Route(this.options.routeChange);
	    this.curView = null;
	    this._onLoadViw = false;
	    this._middlewares = [];
	    return;
	  }

	  App.prototype.route = function(path, viewName) {
	    var self;
	    self = this;
	    this.router.add(path, function() {
	      return self.runView(viewName, this, arguments);
	    });
	    return this;
	  };

	  App.prototype.use = function(middleware) {
	    this._middlewares.push(middleware);
	    return this;
	  };

	  App.prototype._runView = function(done) {
	    if (done == null) {
	      done = function() {};
	    }
	    this.curView.instantiate.route = this.env.route;
	    this.curView.instantiate.context = this.env.context;
	    this.curView.instantiate.run.apply(this.curView.instantiate, this.env.args);
	    this.emit('runView', this.curView);
	    return done(this.curView.instantiate);
	  };

	  App.prototype.stack = function(ix, err, done) {
	    var middleware, next, nextIx;
	    if (ix == null) {
	      ix = 0;
	    }
	    if (err == null) {
	      err = null;
	    }
	    if (done == null) {
	      done = function() {};
	    }
	    if (ix === this._middlewares.length) {
	      return this._runView(done);
	    }
	    middleware = this._middlewares[ix];
	    nextIx = ix + 1;
	    next = (function(_this) {
	      return function(err) {
	        return _this.stack(nextIx, err, done);
	      };
	    })(this);
	    this.env.view = this.curView.instantiate;
	    return middleware.call(this.env, err, next);
	  };

	  App.prototype.runMiddlewares = function(done) {
	    if (done == null) {
	      done = function() {};
	    }
	    if (this._middlewares.length === 0) {
	      return this._runView(done);
	    }
	    return this.stack(0, null, done);
	  };

	  App.prototype._initView = function(View, viewName) {
	    var $el;
	    $el = $("<div class='" + this.options.viewClass + "' />");
	    this.curView = {
	      name: viewName,
	      instantiate: new View($el, this)
	    };
	    return this.runMiddlewares((function(_this) {
	      return function() {
	        _this.curView.instantiate.$el.appendTo(_this.$el);
	        _this.curView.instantiate.afterRun();
	        return _this._onLoadViw = false;
	      };
	    })(this));
	  };

	  App.prototype.runView = function(View, route, args) {
	    var viewName;
	    if (this._onLoadViw) {
	      return;
	    }
	    viewName = View.viewName;
	    this.env = {
	      route: route,
	      context: route.context,
	      args: args,
	      viewName: viewName,
	      app: this
	    };
	    if (this.curView) {
	      if (this.curView.name === viewName) {
	        this.runMiddlewares((function(_this) {
	          return function() {
	            return _this.curView.instantiate.afterRun();
	          };
	        })(this));
	        return;
	      } else {
	        this.emit('destroyView', this.curView);
	        this.curView.instantiate.destroy();
	        this.curView = null;
	      }
	    }
	    this._onLoadViw = true;
	    return this._initView(View, viewName);
	  };

	  App.prototype.run = function() {
	    return this.router.run();
	  };

	  return App;

	})(EventEmitter);

	module.exports = App;


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * 路由
	 * @module mcore/route
	 * @author vfasky <vfasky@gmail.com>
	 * @example 
	 * route = new mcore.Route()
	 *
	 * route.add '/index/:id', (id)->
	 *     console.log id
	 *
	 * route.add '/show/*', (name)->
	 *     console.log name
	 * 
	 * route.add '/get/:id?', (id)->
	 *     console.log id # or undefined
	 * 
	 * route.add 'user user/:id', (id)->
	 *     console.log route.lookup('user', id:1) #/user/1
	 *
	 * route.run()
	 */
	"use strict";
	var Route, exports, pathToObject, pathToRegexp, util;

	util = __webpack_require__(14).util;


	/**
	 * 将路径转化为正则 
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	pathToRegexp = function(path, keys, sensitive, strict) {
	  var toKeys;
	  if (keys == null) {
	    keys = [];
	  }
	  if (sensitive == null) {
	    sensitive = false;
	  }
	  if (strict == null) {
	    strict = false;
	  }
	  if (path instanceof RegExp) {
	    return path;
	  }
	  toKeys = function(_, slash, format, key, capture, optional) {
	    keys.push({
	      name: key,
	      optional: !!optional
	    });
	    slash = slash || '';
	    return '' + (optional && '' || slash) + '(?:' + (optional && slash || '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
	  };
	  path = path.concat(strict && '' || '/?').replace(/\/\(/g, '(?:/').replace(/\+/g, '__plus__').replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, toKeys).replace(/([\/.])/g, '\\$1').replace(/__plus__/g, '(.+)').replace(/\*/g, '(.*)');
	  return new RegExp('^' + path + '$', sensitive && '' || 'i');
	};


	/**
	 * 将 url 的参数转换为对象
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	pathToObject = function(url) {
	  var argStr, args, attr, data, keys;
	  url = String(url);
	  argStr = '';
	  attr = [];
	  if (url.indexOf('?') !== -1) {
	    argStr = url.split('?').pop();
	  } else if (url.indexOf('&') !== -1) {
	    argStr = url;
	  }
	  if (argStr === '') {
	    return {};
	  }
	  args = argStr.split('&');
	  data = {};
	  keys = [];
	  util.each(args, function(v) {
	    var key, value;
	    if (v.indexOf('=') === -1) {
	      return;
	    }
	    v = v.split('=');
	    if (v.length !== 2) {
	      return;
	    }
	    key = v[0].trim();
	    value = v[1];
	    if (util.isNumber(value) && String(value).length < 14) {
	      value = Number(value);
	    } else {
	      value = decodeURIComponent(value);
	    }
	    data[key] = value;
	  });
	  return data;
	};


	/**
	 * 路由
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	Route = function(hashchange, sensitive1, strict1) {
	  this.hashchange = hashchange != null ? hashchange : Route.changeByLocationHash;
	  this.sensitive = sensitive1 != null ? sensitive1 : false;
	  this.strict = strict1 != null ? strict1 : false;
	  this.rule = [];
	};


	/**
	 * 开始监听路由
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	Route.prototype.run = function() {
	  this.hashchange((function(_this) {
	    return function(url) {
	      _this.match(url);
	    };
	  })(this));
	};


	/**
	 * 添加规则
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	Route.prototype.add = function(path, fn) {
	  var keys, reg;
	  keys = [];
	  reg = pathToRegexp(path, keys, this.sensitive, this.strict);
	  this.rule.push({
	    path: path,
	    reg: reg,
	    keys: keys,
	    fn: fn
	  });
	  return this;
	};


	/**
	 * 配对 url
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	Route.prototype.match = function(url) {
	  var argStr, fullPath, getIx, isMatch, path;
	  path = String(url);
	  fullPath = path;
	  argStr = '';
	  getIx = path.indexOf('?');
	  if (getIx === -1) {
	    getIx = path.indexOf('&');
	  }
	  isMatch = false;
	  if (getIx !== -1) {
	    argStr = path.substring(getIx);
	    path = path.substring(0, getIx);
	  }
	  util.each(this.rule, function(v) {
	    var args, context, data, env, i, j, k, ref, ref1, value;
	    if (isMatch) {
	      return false;
	    }
	    ref = v.reg.exec(path);
	    if (null === ref) {
	      return;
	    }
	    isMatch = true;
	    context = pathToObject(argStr);
	    data = {};
	    args = [];
	    for (i = j = 1, ref1 = ref.length; 1 <= ref1 ? j < ref1 : j > ref1; i = 1 <= ref1 ? ++j : --j) {
	      k = v.keys[i - 1];
	      value = ref[i];
	      if (util.isNumber(value) && String(value).length < 14) {
	        value = Number(value);
	      } else if (value) {
	        value = decodeURIComponent(value);
	      }
	      if (k && k.name) {
	        data[k.name] = value;
	      }
	      args.push(value || null);
	    }
	    env = {
	      url: fullPath,
	      path: path,
	      args: argStr,
	      rule: v.path,
	      context: context,
	      keys: v.keys,
	      data: data
	    };
	    v.fn.apply(env, args);
	  });
	  return this;
	};


	/**
	 * 通过 hashchange 触发
	 * @author vfasky <vfasky@gmail.com>
	 *
	 */

	Route.changeByLocationHash = function(emit) {
	  var hashChanged;
	  hashChanged = function() {
	    return emit(window.location.hash.substring(1));
	  };
	  if (window.addEventListener) {
	    window.addEventListener('hashchange', hashChanged, false);
	  } else {
	    window.attachEvent('onhashchange', hashChanged);
	  }
	  return hashChanged();
	};


	/*
	    通过 history api 触发
	    @author jackieLin <dashi_lin@163.com>
	 */

	Route.changeByHistory = function(emit) {
	  var historyChange;
	  if (!window.history) {
	    Route.changeByLocationHash(emit);
	  }
	  historyChange = function() {
	    return emit(window.location.hash.substring(1));
	  };
	  window.onpopstate = function(event) {
	    return historyChange();
	  };
	  return historyChange();
	};

	exports = module.exports = {
	  pathToRegexp: pathToRegexp,
	  pathToObject: pathToObject,
	  Route: Route
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * 
	 * @date 2016-01-26 15:20:09
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 */
	'use strict';
	var $, $body, $win, BaseClass, Component, EventEmitter, Template, _id, _isIOS, _isWeixinBrowser, _keyCode, each, loadPromise, ref, util,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  slice = [].slice,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	ref = __webpack_require__(14), EventEmitter = ref.EventEmitter, Template = ref.Template, Component = ref.Component, util = ref.util;

	$ = __webpack_require__(16);

	each = util.each;

	$win = $(window);

	$body = $('body');

	_isWeixinBrowser = /MicroMessenger/i.test(window.navigator.userAgent);

	_isIOS = /iphone|ipad/gi.test(window.navigator.appVersion);

	_id = 0;

	_keyCode = {
	  keyenter: 13,
	  keyesc: 27
	};

	Template.prototype.addEventListener = function(event) {
	  var $refa;
	  if (!this.refs) {
	    this._initTask.push((function(_this) {
	      return function() {
	        return _this.addEventListener(event);
	      };
	    })(this));
	    return;
	  }
	  if (indexOf.call(this._eventReged, event) < 0) {
	    this.regEventCallback(event);
	    $refa = $(this.refs);
	    if (event !== 'blur' && event !== 'focus') {
	      if (_keyCode.hasOwnProperty(event)) {
	        return $refa.on('keyup', (function(_this) {
	          return function(e) {
	            if (e.keyCode === _keyCode[event]) {
	              return _this._eventListener[event].apply(_this, arguments);
	            }
	          };
	        })(this));
	      } else {
	        return $refa.on(event, (function(_this) {
	          return function() {
	            return _this._eventListener[event].apply(_this, arguments);
	          };
	        })(this));
	      }
	    } else {
	      return $refa.on(event, 'input, textarea', (function(_this) {
	        return function() {
	          return _this._eventListener[event].apply(_this, arguments);
	        };
	      })(this));
	    }
	  }
	};

	Template.prototype.removeEvent = function(event, el, id) {
	  if (!this.refs) {
	    return;
	  }
	  event = event.toLowerCase();
	  if (false === this._events.hasOwnProperty(event)) {
	    return;
	  }
	  util.each(this._events[event], (function(_this) {
	    return function(e, i) {
	      if (e.id === id) {
	        _this._events[event].splice(i, 1);
	        return false;
	      }
	    };
	  })(this));
	  if (this._events[event].length === 0) {
	    return $(this.refs).off(event);
	  }
	};

	Component.prototype.emitEvent = function() {
	  var args, eventName, pEventName;
	  eventName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	  pEventName = this.getProxyEventName(eventName);
	  args.splice(0, 0, this.el);
	  if (pEventName) {
	    return this.$el.trigger(pEventName, args);
	  }
	};

	Component.prototype.getProxyEventName = function(eventName) {
	  if (!this.virtualEl || !this.virtualEl.props) {
	    return null;
	  }
	  return this.virtualEl.props['on-' + eventName];
	};

	loadPromise = function(data) {
	  var dtd, keys, promises;
	  dtd = $.Deferred();
	  keys = util.objectKeys(data);
	  if (keys.length === 0) {
	    dtd.resolve({});
	  } else {
	    promises = [];
	    each(keys, function(v) {
	      return promises.push(data[v]);
	    });
	    $.when.apply(null, promises).done(function() {
	      var args, vData;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      vData = {};
	      util.each(args, (function(_this) {
	        return function(v, k) {
	          var key;
	          key = keys[k];
	          if (key) {
	            if (util.isArray(v) && v.length === 3 && v[2].promise) {
	              v = v[0];
	            }
	            return vData[key] = v;
	          }
	        };
	      })(this));
	      return dtd.resolve(vData);
	    }).fail(function(err) {
	      return dtd.reject(err);
	    });
	  }
	  return dtd.promise();
	};

	BaseClass = (function(superClass) {
	  extend(BaseClass, superClass);

	  function BaseClass() {
	    this._id = _id++;
	    this.$win = $win;
	    this.$body = $body;
	    this.util = util;
	    this.nextTick = util.nextTick;
	    this.isWeixinBrowser = _isWeixinBrowser;
	    this.isIOS = _isIOS;
	    this.template = false;
	    this.beforeInit();
	    this.init();
	    this.watch();
	  }

	  BaseClass.prototype.beforeInit = function() {};

	  BaseClass.prototype.init = function() {};

	  BaseClass.prototype.watch = function() {};

	  BaseClass.prototype.render = function(virtualDomDefine, scope) {
	    var dtd;
	    this.virtualDomDefine = virtualDomDefine;
	    if (scope == null) {
	      scope = {};
	    }
	    if (!this.template) {
	      this.template = new Template();
	      this.template._proxy = this;
	    }
	    dtd = $.Deferred();
	    loadPromise(scope).then((function(_this) {
	      return function(scope) {
	        return _this.template.render(_this.virtualDomDefine, scope, function(refs) {
	          _this.emit('rendered', refs);
	          return dtd.resolve(refs);
	        });
	      };
	    })(this)).fail(function(err) {
	      return dtd.reject(err);
	    });
	    return dtd.promise();
	  };

	  BaseClass.prototype.set = function(key, value) {
	    if (!this.template) {
	      return;
	    }
	    if (util.isFunction(value.then)) {
	      return value.then((function(_this) {
	        return function(val) {
	          return _this.template.set(key, val);
	        };
	      })(this));
	    } else {
	      return this.template.set(key, value);
	    }
	  };

	  BaseClass.prototype.get = function() {
	    if (this.template) {
	      return this.template.get.apply(this.template, arguments);
	    }
	  };

	  BaseClass.prototype.remove = function() {
	    if (this.template) {
	      return this.template.remove.apply(this.template, arguments);
	    }
	  };

	  BaseClass.prototype.clone = function(value) {
	    return util.extend(true, value);
	  };

	  BaseClass.prototype.destroy = function() {
	    if (this.template) {
	      return this.template.destroy();
	    }
	  };

	  BaseClass.prototype.when = function() {
	    return $.when.apply(this, arguments);
	  };

	  return BaseClass;

	})(EventEmitter);

	module.exports = BaseClass;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * view 
	 * @date 2016-01-26 15:10:13
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 */
	'use strict';
	var $, Template, View, ref, util,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	ref = __webpack_require__(14), Template = ref.Template, util = ref.util;

	$ = __webpack_require__(16);

	View = (function(superClass) {
	  extend(View, superClass);

	  function View($el, app) {
	    this.$el = $el;
	    this.app = app;
	    View.__super__.constructor.call(this);
	    this.once('rendered', (function(_this) {
	      return function(refs) {
	        return _this.$el[0].appendChild(refs);
	      };
	    })(this));
	  }

	  View.prototype.setTitle = function(title) {
	    var $iframe;
	    this.title = title;
	    if (document.title === this.title) {
	      return;
	    }
	    document.title = this.title;
	    if (this.isWeixinBrowser && this.isIOS) {
	      $iframe = $('<iframe src="/favicon.ico"></iframe>');
	      return $iframe.one('load', function() {
	        return setTimeout(function() {
	          return $iframe.remove();
	        }, 0);
	      }).appendTo(this.$body);
	    }
	  };

	  View.prototype.back = function() {
	    if (window.history.length > 1) {
	      window.history.back();
	    } else {
	      window.location.href = '#';
	    }
	    return false;
	  };

	  View.prototype.destroy = function() {
	    View.__super__.destroy.call(this);
	    return this.$el.remove();
	  };

	  View.prototype.run = function() {};

	  View.prototype.afterRun = function() {};

	  return View;

	})(__webpack_require__(18));

	module.exports = View;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * 封装 http 请求
	 * @date 2015-12-07 14:32:01
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 * @version $Id$
	 */
	"use strict";
	var $, errCallback, http, networkErrCallback;

	$ = __webpack_require__(16);

	networkErrCallback = function(xhr, status, hideError) {
	  var error, error1, httpCode, msg, res;
	  msg = 'Network Error';
	  if (xhr.responseText) {
	    try {
	      res = JSON.parse(xhr.responseText);
	      if (res.error) {
	        msg = res.error;
	      }
	    } catch (error1) {
	      error = error1;
	    }
	  }
	  httpCode = xhr.statusCode().status;
	  if (httpCode) {
	    msg = msg + ' ( code: ' + httpCode + ' )';
	  }
	  if (!hideError) {
	    return alert(msg);
	  } else {
	    return console.log(msg);
	  }
	};

	errCallback = function(res, hideError) {
	  var msg;
	  msg = res.error || res.msg || 'An unknown error occurred';
	  if (!hideError) {
	    return alert(msg);
	  } else {
	    return console.log(msg);
	  }
	};

	http = (function() {
	  var ajax, exports, timeout;
	  timeout = 10000;
	  ajax = function(type, url, data, hideError) {
	    var dtd, options, promise, xhr;
	    if (hideError == null) {
	      hideError = false;
	    }
	    dtd = $.Deferred();
	    options = {
	      cache: false,
	      data: http.sendDataFormat(data || {}),
	      dataType: 'json',
	      type: type || 'GET',
	      timeout: timeout,
	      headers: http.buildHeaders()
	    };
	    if (type === 'jsonp') {
	      options.type = 'GET';
	      options.dataType = 'jsonp';
	    }
	    xhr = $.ajax(url, options);
	    xhr.then(function(res) {
	      if (http.isSuccess(res, this)) {
	        return dtd.resolve(http.responseFormat(res));
	      } else {
	        dtd.reject(res);
	        return errCallback(res, hideError);
	      }
	    }).fail(function(xhr, status) {
	      dtd.reject(xhr, status);
	      return networkErrCallback(xhr, status, hideError);
	    });
	    promise = dtd.promise();
	    promise.xhr = xhr;
	    promise.reject = function(err) {
	      dtd = $.Deferred();
	      dtd.reject(err);
	      return dtd.promise();
	    };
	    return promise;
	  };
	  return exports = {
	    get: function(url, data, hideError) {
	      if (hideError == null) {
	        hideError = false;
	      }
	      return ajax('GET', url, data, hideError);
	    },
	    post: function(url, data, hideError) {
	      if (hideError == null) {
	        hideError = false;
	      }
	      return ajax('POST', url, data, hideError);
	    },
	    jsonp: function(url, data, hideError) {
	      if (hideError == null) {
	        hideError = false;
	      }
	      return ajax('jsonp', url, data, hideError);
	    }
	  };
	})();

	http.isSuccess = function(res) {
	  return Number(res.code) === 1;
	};

	http.buildHeaders = function() {
	  return {};
	};

	http.regErrCallback = function(type, fun) {
	  if (type === 'network') {
	    return networkErrCallback = fun;
	  } else {
	    return errCallback = fun;
	  }
	};

	http.responseFormat = function(res) {
	  return res;
	};

	http.sendDataFormat = function(data) {
	  return data;
	};

	module.exports = http;


/***/ }
/******/ ])
});
;