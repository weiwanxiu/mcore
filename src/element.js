// Generated by CoffeeScript 1.10.0

/**
 * 
 * @date 2016-01-21 19:34:48
 * @author vfasky <vfasky@gmail.com>
 * @link http://vfasky.com
 */
'use strict';
var Element, Template, _id, setElementAttr,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_id = 0;

Template = require('./template');

setElementAttr = require('./util').setElementAttr;

Element = (function() {
  function Element(tagName, props, children) {
    var count;
    this.props = props != null ? props : {};
    this.children = children != null ? children : [];
    this.tagName = tagName.toLowerCase();
    this._id = _id++;
    this._binders = [];
    this._bindersReg = [];
    this.key = this.props.key || void 0;
    count = 0;
    this.children.forEach((function(_this) {
      return function(child, i) {
        if (child instanceof Element) {
          count += child.count;
        } else {
          _this.children[i] = String(child);
        }
        return count++;
      };
    })(this));
    this.count = count;
  }

  Element.prototype.render = function() {
    var attr, el, ref, value;
    el = this.bindComponents();
    if (false === el) {
      el = document.createElement(this.tagName);
      if (this.template) {
        el._element = this;
        this.el = el;
      }
      ref = this.props;
      for (attr in ref) {
        value = ref[attr];
        this.setAttribute(el, attr, value);
      }
      this.children.forEach(function(child) {
        var childEl;
        if (child instanceof Element) {
          childEl = child.render();
        } else {
          childEl = document.createTextNode(child);
        }
        return el.appendChild(childEl);
      });
    }
    return el;
  };

  Element.prototype.removeAttribute = function(attrName) {
    var binder, j, len, ref;
    attrName = attrName.toLowerCase();
    ref = this._binders;
    for (j = 0, len = ref.length; j < len; j++) {
      binder = ref[j];
      if (binder.attrName === attrName) {
        if (binder.binder.remove) {
          binder.binder.remove.call(this, this.el);
        }
        return;
      }
    }
    return this.el.removeAttribute(attrName);
  };

  Element.prototype.setAttribute = function(el, attrName, value) {
    var binder, j, len, ref;
    attrName = String(attrName).toLowerCase();
    if (this.template) {
      if (attrName.indexOf('on-') === 0) {
        this.template.regEvent(attrName.replace('on-', ''), el, value, this._id);
        setElementAttr(el, '_mc', this._id, true);
        return;
      }
      ref = this._binders;
      for (j = 0, len = ref.length; j < len; j++) {
        binder = ref[j];
        if (binder.attrName === attrName) {
          if (indexOf.call(this._bindersReg, attrName) < 0) {
            this._bindersReg.push(attrName);
            if (binder.binder.init) {
              binder.binder.init.call(this, el);
            }
          }
          if (binder.binder.update) {
            binder.binder.update.call(this, el, value);
          } else {
            binder.binder.call(this, el, value);
          }
          binder.value = value;
          return;
        }
      }
    }
    return setElementAttr(el, attrName, value, true);
  };

  Element.prototype.bindComponents = function() {
    var el;
    if (!this.template) {
      return false;
    }
    if (false === Template.components.hasOwnProperty(this.tagName)) {
      return false;
    }
    el = document.createElement(this.tagName);
    new Template.components[this.tagName](el, this);
    return el;
  };

  Element.prototype.bindBinder = function(attrName, value) {
    if (Template.binders.hasOwnProperty(attrName)) {
      return this._binders.push({
        binder: Template.binders[attrName],
        value: value,
        attrName: attrName.toLowerCase()
      });
    }
  };

  Element.prototype.bindTemplate = function(template) {
    this.template = template;
  };

  return Element;

})();

module.exports = Element;
