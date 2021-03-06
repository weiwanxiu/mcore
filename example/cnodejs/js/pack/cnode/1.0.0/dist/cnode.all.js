// Generated by CoffeeScript 1.9.3

/**
 * api
 * @module cnode/api
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/api', ['jquery'], function($) {
    "use strict";
    var _host, exports;
    _host = 'https://cnodejs.org/api/v1';
    return exports = {
      topics: function(data) {
        if (data == null) {
          data = {};
        }
        data = $.extend({
          mdrender: false,
          limit: 10
        }, data);
        return $.get(_host + '/topics', data);
      },
      topic: function(id) {
        return $.get(_host + '/topic/' + id, {
          mdrender: false
        });
      },
      user: function(userName) {
        return $.get(_host + '/user/' + userName);
      }
    };
  });

}).call(this);

;
// Generated by CoffeeScript 1.9.3

/**
 * 启动
 * @module cnode/bootstrap
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode', ['jquery', 'mcore', 'middleware', 'tag', 'attr'], function($, mcore, middleware) {
    "use strict";
    var init;
    init = false;
    return function(select, loadSelect) {
      var app;
      app = new mcore.App($(select));
      app.use(middleware.loader);
      app.route('/topic/:id', 'cnode/topic').route('/user/:userName', 'cnode/user').route('*', 'cnode/index');
      app.on('runView', function() {
        if (init === false) {
          init = true;
          return $(loadSelect).remove();
        }
      });
      return app.run();
    };
  });

}).call(this);

;
// Generated by CoffeeScript 1.9.3

/**
 * 过滤函数
 * @module cnode/formatters
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/formatters', ['mcore', 'moment', 'markdown-it', 'highlight'], function(mcore, moment, Markdownit) {
    "use strict";
    var Template, exports, highlight, markdown;
    hljs.initHighlightingOnLoad();
    Template = mcore.Template;
    highlight = (function() {
      var alias;
      alias = [
        {
          js: 'javascript',
          jscript: 'javascript',
          html: 'xml',
          htm: 'xml',
          coffee: 'coffeescript',
          'coffee-script': 'coffeescript',
          yml: 'yaml',
          pl: 'perl',
          ru: 'ruby',
          rb: 'ruby',
          csharp: 'cs'
        }
      ];
      return function(str, lang) {
        var _, compiled, content, firstLine, lines, numbers, result;
        lang = String(lang).toLowerCase() || 'javascript';
        if (alias[lang]) {
          lang = alias[lang];
        }
        if (hljs.getLanguage(lang)) {
          try {
            compiled = hljs.highlight(lang, str).value;
          } catch (_error) {
            _ = _error;
            compiled = hljs.highlightAuto(str).value;
          }
        } else {
          compiled = hljs.highlightAuto(str).value;
        }
        lines = compiled.split('\n');
        numbers = '';
        content = '';
        firstLine = 1;
        if (!lines[lines.length - 1]) {
          lines.pop();
        }
        lines.forEach(function(item, i) {
          numbers += '<div class="line">' + (i + firstLine) + '</div>';
          return content += '<div class="line">' + item + '</div>';
        });
        result = '<figure class="highlight' + (lang != null ? lang : ' ' + {
          lang: ''
        }) + '">';
        result += "<table>\n    <tr>\n        <td class=\"gutter\"><pre>" + numbers + "</pre></td>\n        <td class=\"code\"><pre>" + content + "</pre></td>\n    </tr>\n</table>";
        result += '</figure>';
        return result;
      };
    })();
    markdown = new Markdownit({
      html: false,
      xhtmlOut: false,
      breaks: true,
      langPrefix: 'hljs ',
      linkify: true,
      typographer: false,
      highlight: highlight
    });
    Template.formatters('dateFormat', function(value, format) {
      if (format == null) {
        format = 'YYYY-MM-DD';
      }
      return moment(value).format(format);
    });
    Template.formatters('fromNow', function(value) {
      return moment(value).fromNow();
    });
    Template.formatters('markdown', function(value) {
      return markdown.render(value);
    });
    return exports = {
      markdown: function(md) {
        return markdown.render(md);
      }
    };
  });

}).call(this);

;
// Generated by CoffeeScript 1.9.3

/**
 *
 * @module cnode/topic
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/topic', ['jquery', 'cnode/view', 'mcore-attr/scroller', 'cnode/formatters', 'attr/userLink'], function($, View) {
    "use strict";
    return View.subclass({
      constructor: View.prototype.constructor,
      run: function(id) {
        return this.render('cnode/topic.html', {
          replieEnd: 5,
          topic: this.api.topic(id).then(function(res) {
            res.data.replies.forEach(function(v, k) {
              return v.ix = k;
            });
            return res;
          })
        });
      },
      watch: function() {
        return this.$el.on('scrollend', (function(_this) {
          return function() {
            var replieEnd, topic, topicCount, total;
            topic = _this.get('topic');
            replieEnd = _this.get('replieEnd');
            total = replieEnd + 5;
            topicCount = Number(topic.data.reply_count);
            if (total > topicCount) {
              total = topicCount;
            }
            if (total === replieEnd) {
              return;
            }
            return _this.set('replieEnd', total);
          };
        })(this));
      }
    });
  });

}).call(this);

;
// Generated by CoffeeScript 1.9.3

/**
 * 用户主页
 * @module cnode/user
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/user', ['jquery', 'cnode/view', 'cnode/formatters', 'mcore-attr/scroller'], function($, View) {
    "use strict";
    return View.subclass({
      constructor: View.prototype.constructor,
      run: function(userName) {
        return this.render('cnode/user.html', {
          user: this.api.user(userName)
        });
      }
    });
  });

}).call(this);

;
// Generated by CoffeeScript 1.9.3

/**
 * 
 * @module cnode/view
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/view', ['jquery', 'mcore', 'cnode/api'], function($, mcore, api) {
    "use strict";
    return mcore.View.subclass({
      constructor: mcore.View.prototype.constructor,
      beforeInit: function() {
        return this.api = api;
      }
    });
  });

}).call(this);

;
// Generated by CoffeeScript 1.9.3

/**
 * 首页
 * @module cnode/index
 * @author vfasky <vfasky@gmail.com>
 */

(function() {
  define('cnode/index', ['jquery', 'cnode/view', 'mcore-attr/scroller', 'cnode/formatters'], function($, View) {
    "use strict";
    return View.subclass({
      constructor: View.prototype.constructor,
      run: function(tab) {
        this.context.page = Number(this.context.page || 1);
        this.context.tab = this.context.tab || '';
        this.nextPage = this.context.page + 1;
        this.prePage = this.context.page - 1;
        this.page = 1;
        return this.render('cnode/index.html', {
          topics: this.getTopics(),
          loadPageDone: true
        });
      },
      getTopics: function() {
        var page, promise, tab;
        page = this.context.page;
        tab = this.context.tab;
        promise = (function(_this) {
          return function() {
            return _this.api.topics({
              page: page,
              tab: tab
            });
          };
        })(this);
        return this.memoryCache("index_topics_" + page + "_" + tab).has(promise);
      }
    });
  });

}).call(this);
