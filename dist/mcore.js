(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
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
	 * mcore simple MVVM
	 * @date 2016-01-07 21:46:45
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 */
	'use strict';
	module.exports = {
	  version: '2.0.0',
	  virtualDom: __webpack_require__(1),
	  EventEmitter: __webpack_require__(9),
	  Template: __webpack_require__(11)
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * simple-virtual-dom
	 * @date 2016-01-07 21:50:58
	 */
	'use strict';
	var diff, el, patch, ref;

	ref = __webpack_require__(2), el = ref.el, diff = ref.diff, patch = ref.patch;

	module.exports = {
	  el: el,
	  diff: diff,
	  patch: patch
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports.el = __webpack_require__(3)
	exports.diff = __webpack_require__(5)
	exports.patch = __webpack_require__(6)


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4)

	/**
	 * Virtual-dom Element.
	 * @param {String} tagName
	 * @param {Object} props - Element's properties,
	 *                       - using object to store key-value pair
	 * @param {Array<Element|String>} - This element's children elements.
	 *                                - Can be Element instance or just a piece plain text.
	 */
	function Element (tagName, props, children) {
	  if (!(this instanceof Element)) {
	    return new Element(tagName, props, children)
	  }

	  if (_.isArray(props)) {
	    children = props
	    props = {}
	  }

	  this.tagName = tagName
	  this.props = props || {}
	  this.children = children || []
	  this.key = props
	    ? props.key
	    : void 666

	  var count = 0

	  _.each(this.children, function (child, i) {
	    if (child instanceof Element) {
	      count += child.count
	    } else {
	      children[i] = '' + child
	    }
	    count++
	  })

	  this.count = count
	}

	/**
	 * Render the hold element tree.
	 */
	Element.prototype.render = function () {
	  var el = document.createElement(this.tagName)
	  var props = this.props

	  for (var propName in props) {
	    var propValue = props[propName]
	    _.setAttr(el, propName, propValue)
	  }

	  var children = this.children || []

	  _.each(children, function (child) {
	    var childEl = (child instanceof Element)
	      ? child.render()
	      : document.createTextNode(child)
	    el.appendChild(childEl)
	  })

	  return el
	}

	module.exports = Element


/***/ },
/* 4 */
/***/ function(module, exports) {

	var _ = exports

	_.type = function (obj) {
	  return Object.prototype.toString.call(obj).replace(/\[object\s|\]/g, '')
	}

	_.isArray = function isArray (list) {
	  return _.type(list) === 'Array'
	}

	_.isString = function isString (list) {
	  return _.type(list) === 'String'
	}

	_.each = function each (array, fn) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    fn(array[i], i)
	  }
	}

	_.toArray = function toArray (listLike) {
	  if (!listLike) {
	    return []
	  }

	  var list = []

	  for (var i = 0, len = listLike.length; i < len; i++) {
	    list.push(listLike[i])
	  }

	  return list
	}

	_.setAttr = function setAttr (node, key, value) {
	  switch (key) {
	    case 'style':
	      node.style.cssText = value
	      break
	    case 'value':
	      var tagName = node.tagName || ''
	      tagName = tagName.toLowerCase()
	      if (
	        tagName === 'input' || tagName === 'textarea'
	      ) {
	        node.value = value
	      } else {
	        // if it is not a input or textarea, use `setAttribute` to set
	        node.setAttribute(key, value)
	      }
	      break
	    default:
	      node.setAttribute(key, value)
	      break
	  }
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4)
	var patch = __webpack_require__(6)
	var listDiff = __webpack_require__(7)

	function diff (oldTree, newTree) {
	  var index = 0
	  var patches = {}
	  dfsWalk(oldTree, newTree, index, patches)
	  return patches
	}

	function dfsWalk (oldNode, newNode, index, patches) {
	  var currentPatch = []

	  // node is removed
	  if (newNode === null) {
	    // will be removed when perform reordering, so has no needs to do anthings in here
	  // textNode content replacing
	  } else if (_.isString(oldNode) && _.isString(newNode)) {
	    if (newNode !== oldNode) {
	      currentPatch.push({ type: patch.TEXT, content: newNode })
	    }
	  // nodes are the same, diff its props and children
	  } else if (
	      oldNode.tagName === newNode.tagName &&
	      oldNode.key === newNode.key
	    ) {
	    // diff props
	    var propsPatches = diffProps(oldNode, newNode)
	    if (propsPatches) {
	      currentPatch.push({ type: patch.PROPS, props: propsPatches })
	    }
	    // diff children
	    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
	  // nodes are not the same, replace the old node with new node
	  } else {
	    currentPatch.push({ type: patch.REPLACE, node: newNode })
	  }

	  if (currentPatch.length) {
	    patches[index] = currentPatch
	  }
	}

	function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
	  var diffs = listDiff(oldChildren, newChildren, 'key')
	  newChildren = diffs.children

	  if (diffs.moves.length) {
	    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
	    currentPatch.push(reorderPatch)
	  }

	  var leftNode = null
	  var currentNodeIndex = index
	  _.each(oldChildren, function (child, i) {
	    var newChild = newChildren[i]
	    currentNodeIndex = (leftNode && leftNode.count)
	      ? currentNodeIndex + leftNode.count + 1
	      : currentNodeIndex + 1
	    dfsWalk(child, newChild, currentNodeIndex, patches)
	    leftNode = child
	  })
	}

	function diffProps (oldNode, newNode) {
	  var count = 0
	  var oldProps = oldNode.props
	  var newProps = newNode.props

	  var key, value
	  var propsPatches = {}

	  // find out different properties
	  for (key in oldProps) {
	    value = oldProps[key]
	    if (newProps[key] !== value) {
	      count++
	      propsPatches[key] = newProps[key]
	    }
	  }

	  // find out new property
	  for (key in newProps) {
	    value = newProps[key]
	    if (!oldProps.hasOwnProperty(key)) {
	      count++
	      propsPatches[key] = newProps[key]
	    }
	  }

	  // if properties all are identical
	  if (count === 0) {
	    return null
	  }

	  return propsPatches
	}

	module.exports = diff


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(4)

	var REPLACE = 0
	var REORDER = 1
	var PROPS = 2
	var TEXT = 3

	function patch (node, patches) {
	  var walker = {index: 0}
	  dfsWalk(node, walker, patches)
	}

	function dfsWalk (node, walker, patches) {
	  var currentPatches = patches[walker.index]

	  var len = node.childNodes
	    ? node.childNodes.length
	    : 0
	  for (var i = 0; i < len; i++) {
	    var child = node.childNodes[i]
	    walker.index++
	    dfsWalk(child, walker, patches)
	  }

	  if (currentPatches) {
	    applyPatches(node, currentPatches)
	  }
	}

	function applyPatches (node, currentPatches) {
	  _.each(currentPatches, function (currentPatch) {
	    switch (currentPatch.type) {
	      case REPLACE:
	        node.parentNode.replaceChild(currentPatch.node.render(), node)
	        break
	      case REORDER:
	        reorderChildren(node, currentPatch.moves)
	        break
	      case PROPS:
	        setProps(node, currentPatch.props)
	        break
	      case TEXT:
	        if (node.textContent) {
	          node.textContent = currentPatch.content
	        } else {
	          // fuck ie
	          node.nodeValue = currentPatch.content
	        }
	        break
	      default:
	        throw new Error('Unknown patch type ' + currentPatch.type)
	    }
	  })
	}

	function setProps (node, props) {
	  for (var key in props) {
	    if (props[key] === void 666) {
	      node.removeAttribute(key)
	    } else {
	      var value = props[key]
	      _.setAttr(node, key, value)
	    }
	  }
	}

	function reorderChildren (node, moves) {
	  var staticNodeList = _.toArray(node.childNodes)
	  var maps = {}

	  _.each(staticNodeList, function (node) {
	    if (node.nodeType === 1) {
	      var key = node.getAttribute('key')
	      if (key) {
	        maps[key] = node
	      }
	    }
	  })

	  _.each(moves, function (move) {
	    var index = move.index
	    if (move.type === 0) { // remove item
	      if (staticNodeList[index] === node.childNodes[index]) { // maybe have been removed for inserting
	        node.removeChild(node.childNodes[index])
	      }
	      staticNodeList.splice(index, 1)
	    } else if (move.type === 1) { // insert item
	      var insertNode = maps[move.item.key]
	        ? maps[move.item.key] // reuse old item
	        : (typeof move.item === 'object')
	            ? move.item.render()
	            : document.createTextNode(move.item)
	      staticNodeList.splice(index, 0, insertNode)
	      node.insertBefore(insertNode, node.childNodes[index] || null)
	    }
	  })
	}

	patch.REPLACE = REPLACE
	patch.REORDER = REORDER
	patch.PROPS = PROPS
	patch.TEXT = TEXT

	module.exports = patch


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8).diff


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Diff two list in O(N).
	 * @param {Array} oldList - Original List
	 * @param {Array} newList - List After certain insertions, removes, or moves
	 * @return {Object} - {moves: <Array>}
	 *                  - moves is a list of actions that telling how to remove and insert
	 */
	function diff (oldList, newList, key) {
	  var oldMap = makeKeyIndexAndFree(oldList, key)
	  var newMap = makeKeyIndexAndFree(newList, key)

	  var newFree = newMap.free

	  var oldKeyIndex = oldMap.keyIndex
	  var newKeyIndex = newMap.keyIndex

	  var moves = []

	  // a simulate list to manipulate
	  var children = []
	  var i = 0
	  var item
	  var itemKey
	  var freeIndex = 0

	  // fist pass to check item in old list: if it's removed or not
	  while (i < oldList.length) {
	    item = oldList[i]
	    itemKey = getItemKey(item, key)
	    if (itemKey) {
	      if (!newKeyIndex.hasOwnProperty(itemKey)) {
	        children.push(null)
	      } else {
	        var newItemIndex = newKeyIndex[itemKey]
	        children.push(newList[newItemIndex])
	      }
	    } else {
	      var freeItem = newFree[freeIndex++]
	      children.push(freeItem || null)
	    }
	    i++
	  }

	  var simulateList = children.slice(0)

	  // remove items no longer exist
	  i = 0
	  while (i < simulateList.length) {
	    if (simulateList[i] === null) {
	      remove(i)
	      removeSimulate(i)
	    } else {
	      i++
	    }
	  }

	  // i is cursor pointing to a item in new list
	  // j is cursor pointing to a item in simulateList
	  var j = i = 0
	  while (i < newList.length) {
	    item = newList[i]
	    itemKey = getItemKey(item, key)

	    var simulateItem = simulateList[j]
	    var simulateItemKey = getItemKey(simulateItem, key)

	    if (simulateItem) {
	      if (itemKey === simulateItemKey) {
	        j++
	      } else {
	        // new item, just inesrt it
	        if (!oldKeyIndex.hasOwnProperty(itemKey)) {
	          insert(i, item)
	        } else {
	          // if remove current simulateItem make item in right place
	          // then just remove it
	          var nextItemKey = getItemKey(simulateList[j + 1], key)
	          if (nextItemKey === itemKey) {
	            remove(i)
	            removeSimulate(j)
	            j++ // after removing, current j is right, just jump to next one
	          } else {
	            // else insert item
	            insert(i, item)
	          }
	        }
	      }
	    } else {
	      insert(i, item)
	    }

	    i++
	  }

	  function remove (index) {
	    var move = {index: index, type: 0}
	    moves.push(move)
	  }

	  function insert (index, item) {
	    var move = {index: index, item: item, type: 1}
	    moves.push(move)
	  }

	  function removeSimulate (index) {
	    simulateList.splice(index, 1)
	  }

	  return {
	    moves: moves,
	    children: children
	  }
	}

	/**
	 * Convert list to key-item keyIndex object.
	 * @param {Array} list
	 * @param {String|Function} key
	 */
	function makeKeyIndexAndFree (list, key) {
	  var keyIndex = {}
	  var free = []
	  for (var i = 0, len = list.length; i < len; i++) {
	    var item = list[i]
	    var itemKey = getItemKey(item, key)
	    if (itemKey) {
	      keyIndex[itemKey] = i
	    } else {
	      free.push(item)
	    }
	  }
	  return {
	    keyIndex: keyIndex,
	    free: free
	  }
	}

	function getItemKey (item, key) {
	  if (!item || !key) return void 666
	  return typeof key === 'string'
	    ? item[key]
	    : key(item)
	}

	exports.makeKeyIndexAndFree = makeKeyIndexAndFree // exports for test
	exports.diff = diff


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * EventEmitter
	 * @date 2016-01-07 21:57:26
	 */
	'use strict';
	module.exports = __webpack_require__(10);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * 基于 virtual dom 的模板引擎
	 * @date 2016-01-09 16:39:56
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 */
	'use strict';
	var EventEmitter, Template, diff, patch, ref, requestAnimationFrame,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	EventEmitter = __webpack_require__(9);

	requestAnimationFrame = __webpack_require__(12);

	ref = __webpack_require__(1), diff = ref.diff, patch = ref.patch;

	__webpack_require__(13);

	Template = (function(superClass) {
	  extend(Template, superClass);

	  function Template() {
	    this._status = 0;
	    this._queueId = null;
	    this.refs = null;
	    this.virtualDomDefine = null;
	    this.virtualDom = null;
	    this.scope = {};
	    this.init();
	  }

	  Template.prototype.watchScope = function() {
	    if (this._initWatchObject || this._status === 0) {
	      return;
	    }
	    this._initWatchObject = true;
	    return Object.prototype.watch(this, 'scope', (function(_this) {
	      return function(id, oldval, newval) {
	        _this.email('changeScope', oldval, newval);
	        return _this.renderQueue(_this);
	      };
	    })(this));
	  };

	  Template.prototype.destroy = function() {
	    if (this._initWatchObject) {
	      Object.prototype.unwatch(this, 'scope');
	    }
	    if (this.refs && this.refs.parentNode && this.refs.parentNode.removeChild) {
	      return this.refs.parentNode.removeChild(this.refs);
	    }
	  };

	  Template.prototype.init = function() {};

	  Template.prototype._render = function(data, done) {
	    var patches, virtualDom;
	    virtualDom = this.virtualDomDefine(data.scope);
	    if (this.virtualDom === null) {
	      this.virtualDom = virtualDom;
	      this.refs = this.virtualDom.render();
	    } else {
	      patches = diff(this.virtualDom, virtualDom);
	      patch(this.refs, patches);
	    }
	    this._status = 2;
	    this.emit('rendered');
	    if (done) {
	      return done();
	    }
	  };

	  Template.prototype.renderQueue = function(data, doneOrAsync) {
	    requestAnimationFrame.clear(this._queueId);
	    if (true === doneOrAsync) {
	      return this._render(data);
	    } else {
	      this._status = 1;
	      return this._queueId = requestAnimationFrame((function(_this) {
	        return function() {
	          return _this._render(data, doneOrAsync);
	        };
	      })(this));
	    }
	  };

	  Template.prototype.render = function(virtualDomDefine, scope, doneOrAsync) {
	    this.virtualDomDefine = virtualDomDefine;
	    this.scope = scope != null ? scope : {};
	    if (doneOrAsync == null) {
	      doneOrAsync = function() {};
	    }
	    this._status = 1;
	    this.emit('beforeRender');
	    this.renderQueue(this, doneOrAsync);
	    return requestAnimationFrame((function(_this) {
	      return function() {
	        return _this.watchScope();
	      };
	    })(this));
	  };

	  return Template;

	})(EventEmitter);

	module.exports = Template;


/***/ },
/* 12 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.10.0
	'use strict';

	/**
	 * 放到下一帧执行
	 * @author vfasky <vfasky@gmail.com>
	 */
	if (window.requestAnimationFrame) {
	  module.exports = function(fun) {
	    return window.requestAnimationFrame(function() {
	      return fun();
	    });
	  };
	  module.exports.clear = function(id) {
	    if (id) {
	      return window.cancelAnimationFrame(id);
	    }
	  };
	} else {
	  module.exports = function(fun) {
	    return setTimeout(fun, 0);
	  };
	  module.exports.clear = function(id) {
	    if (id) {
	      return clearTimeout(id);
	    }
	  };
	}


/***/ },
/* 13 */
/***/ function(module, exports) {

	// Generated by CoffeeScript 1.10.0

	/**
	 * object.watch polyfill
	 * @date 2016-01-09 17:22:29
	 * @author vfasky <vfasky@gmail.com>
	 * @link http://vfasky.com
	 */
	'use strict';
	if (!Object.prototype.watch) {
	  Object.defineProperty(Object.prototype, 'watch', {
	    enumerable: false,
	    configurable: true,
	    writable: false,
	    value: function(prop, handler) {
	      var getter, newval, oldval, setter;
	      oldval = this[prop];
	      newval = oldval;
	      getter = function() {
	        return newval;
	      };
	      setter = function(val) {
	        oldval = newval;
	        return newval = handler.callback(this, prop, oldval, val);
	      };
	      if (delete this[prop]) {
	        return Object.defineProperty(this, prop, {
	          get: getter,
	          set: setter,
	          enumerable: true,
	          configurable: true
	        });
	      }
	    }
	  });
	}

	if (!Object.prototype.unwatch) {
	  Object.defineProperty(Object.prototype, 'unwatch', {
	    enumerable: false,
	    configurable: true,
	    writable: false,
	    value: function(prop) {
	      var val;
	      val = this[prop];
	      delete this[prop];
	      return this[prop] = val;
	    }
	  });
	}


/***/ }
/******/ ])
});
;