define("tpl/cnode",function(){"use strict";return{"index.html":'<loading watch="self:topics.data"></loading>\n\n<div rv-show="self:topics.data" rv-scroller="self:topics.data" class="scroller">\n    <div class="bar bar-header bar-royal">\n        <button class="button button-icon icon ion-navicon"></button>\n        <h1 class="title">CNode</h1>\n    </div>\n\n    <div class="bar bar-subheader">\n        <div class="button-bar">\n            <a href="#/" class="button">全部</a>\n            <a href="#/?tab=good" class="button">精华</a>\n            <a href="#/?tab=share" class="button">分享</a>\n            <a href="#/?tab=ask" class="button">问答</a>\n            <a href="#/?tab=job" class="button">招聘</a>\n        </div>\n    </div>\n    \n    <div class="content has-subheader">\n        \n        <div class="list">\n            <a class="item item-avatar" rv-class-hg-border="v.top" rv-href="\'#/topic/\' | link v.id" rv-each-v="self:topics.data">\n                <img rv-src="v.author.avatar_url" rv-alt="v.author.loginname">\n                <h2>{v.title}</h2>\n                <p>\n                    <i class="icon ion-ios-stopwatch-outline"></i>\n                    {v.create_at | fromNow}\n                    &nbsp;\n                    <i rv-if="v.reply_count" class="icon ion-chatbox"></i>\n                    {v.reply_count}\n                    \n                    &nbsp;\n\n                    <i rv-if="v.tab" class="icon ion-pound"></i>\n                    {v.tab}\n                </p>\n\n            </a>\n        </div>\n        \n        <div class="row">\n            <div class="col">\n                <a rv-if="self.prePage | > 0" rv-href="\'#?tab=\' | link self.context.tab | link \'&page=\' | link self.prePage" class="button icon-left ion-chevron-left button-clear button-dark"> New</a>\n            </div>\n            <div class="col col-25 col-offset-50">\n                <a rv-href="\'#?tab=\' | link self.context.tab | link \'&page=\' | link self.nextPage" class="button icon-right ion-chevron-right button-clear button-dark"> Old</a>\n\n            </div>\n        </div>\n\n    </div>\n</div>',"topic.html":'<loading watch="self:topic.data"></loading>\n\n<div rv-show="self:topic.data" rv-scroller="self:topic.data">\n    <top-header back="self.back"></top-header>\n\n    <div class="content has-header">\n        <div class="list card" rv-class-hg-border="self:topic.data.top">\n            <div class="item item-avatar">\n                <img rv-src="self:topic.data.author.avatar_url" rv-alt="self:topic.data.author.loginname">\n                <h2 rv-title="self:topic.data.title">{self:topic.data.title}</h2>\n                <p>\n                    {self:topic.data.author.loginname}\n                    &nbsp;\n                    <i class="icon ion-ios-stopwatch-outline"></i>\n                    {self:topic.data.create_at | fromNow}\n\n                </p>\n            </div>\n\n            <div class="item item-body markdown-wrap" rv-html="self:topic.data.content | markdown">\n            </div>\n\n            <div class="item tabs tabs-secondary tabs-icon-left">\n                <a rv-if="self:topic.data.tab" class="tab-item royal" rv-href="\'#/?tab=\' | link self:topic.data.tab">\n                    <i class="icon ion-pound"></i>\n                    {self:topic.data.tab}\n                </a>\n            </div>\n        </div>\n\n        <div>\n            <div class="list card" rv-each-v="self:topic.data.replies">\n                <div class="item item-avatar">\n                    <img rv-src="v.author.avatar_url" rv-alt="v.author.loginname">                   \n                    <h2>{v.author.loginname}</h2>\n\n                    <p>\n                        <i class="icon ion-ios-stopwatch-outline"></i>\n                        {v.create_at | fromNow}\n\n                    </p>\n                </div>\n\n                <div class="item item-body" rv-html="v.content | markdown">\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>'}});