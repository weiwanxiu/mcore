define("tpl/cnode",function(){"use strict";return{"index.html":'<div rv-scroller="self:topics.data" class="scroller">\n    <div class="bar bar-header bar-royal">\n        \n        <h1 class="title">CNode</h1>\n    </div>\n\n    <div class="bar bar-subheader">\n        <div class="button-bar">\n            <a href="#/" rv-class-active="self.context.tab | eq \'\'" class="button">全部</a>\n            <a href="#/?tab=good" rv-class-active="self.context.tab | eq \'good\'" class="button">精华</a>\n            <a href="#/?tab=share" class="button" rv-class-active="self.context.tab | eq \'share\'">分享</a>\n            <a href="#/?tab=ask" class="button" rv-class-active="self.context.tab | eq \'ask\'">问答</a>\n            <a href="#/?tab=job" class="button" rv-class-active="self.context.tab | eq \'job\'">招聘</a>\n        </div>\n    </div>\n\n    <div class="content has-subheader">\n\n        <div class="list">\n            <a class="item item-avatar" rv-class-hg-border="v.top" rv-href="\'#/topic/\' | link v.id" rv-each-v="self:topics.data">\n                <img rv-src="v.author.avatar_url" rv-alt="v.author.loginname">\n                <h2>{v.title}</h2>\n                <p>\n                    <i class="icon ion-ios-stopwatch-outline"></i>\n                    {v.create_at | fromNow} &nbsp;\n                    <i rv-if="v.reply_count" class="icon ion-chatbox"></i>\n                    {v.reply_count} &nbsp;\n\n                    <i rv-if="v.tab" class="icon ion-pound"></i>\n                    {v.tab}\n                </p>\n\n            </a>\n        </div>\n\n        <div class="row">\n            <div class="col">\n                <a rv-if="self.prePage | > 0" rv-href="\'#?tab=\' | link self.context.tab | link \'&page=\' | link self.prePage" class="button icon-left ion-chevron-left button-clear button-dark"> New</a>\n            </div>\n            <div class="col col-25 col-offset-50">\n                <a rv-href="\'#?tab=\' | link self.context.tab | link \'&page=\' | link self.nextPage" class="button icon-right ion-chevron-right button-clear button-dark"> Old</a>\n\n            </div>\n        </div>\n\n    </div>\n</div>',"topic.html":'<div rv-scroller="self:topic.data | or self:replieEnd">\n    <top-header back="self.back"></top-header>\n\n    <div class="content has-header">\n        <div class="list card" rv-class-hg-border="self:topic.data.top">\n            <a rv-href="\'#/user/%s\' | % self:topic.data.author.loginname" class="item item-avatar">\n                <img rv-src="self:topic.data.author.avatar_url" rv-alt="self:topic.data.author.loginname">\n                <h2 rv-title="self:topic.data.title">{self:topic.data.title}</h2>\n                <p>\n                    {self:topic.data.author.loginname}\n                    &nbsp;\n                    <i class="icon ion-ios-stopwatch-outline"></i>\n                    {self:topic.data.create_at | fromNow}\n\n                </p>\n            </a>\n\n            <div rv-link-to-blank class="item item-body markdown-wrap" rv-html="self:topic.data.content | markdown">\n            </div>\n\n            <div class="item tabs tabs-secondary tabs-icon-left">\n                <a rv-if="self:topic.data.tab" class="tab-item royal" rv-href="\'#/?tab=\' | link self:topic.data.tab">\n                    <i class="icon ion-pound"></i>\n                    {self:topic.data.tab}\n                </a>\n            </div>\n        </div>\n\n        <div>\n            <div class="list card" rv-each-v="self:topic.data.replies | slice 0 self:replieEnd">\n                <a rv-href="\'#/user/%s\' | % v.author.loginname" class="item item-avatar">\n                    <img rv-src="v.author.avatar_url" rv-alt="v.author.loginname">                   \n                    <h2>{v.author.loginname}</h2>\n\n                    <p>\n                        <i class="icon ion-ios-stopwatch-outline"></i>\n                        {v.create_at | fromNow}\n\n                    </p>\n                </a>\n\n                <div rv-data-ix="v.ix" rv-link-to-blank class="item item-body" rv-html="v.content | markdown" rv-user-link="self:topic.data.replies">\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>',"user.html":'<div rv-scroller="self:user.data">\n    <top-header title="self:user.data.loginname" back="self.back"></top-header>\n\n    <div class="content has-header">\n\n        <div class="list card">\n\n            <div class="item item-avatar">\n                <img rv-src="self:user.data.avatar_url">\n                <h2>{self:user.data.loginname}</h2>\n                <p>注册时间: {self:user.data.create_at | dateFormat }</p>\n            </div>\n\n           \n            <div class="item item-divider">\n                最近发布的主题\n            </div>\n\n            <a rv-each-v="self:user.data.recent_topics" class="item" rv-href="\'#/topic/%s\' | % v.id">\n                {v.title}\n\n                <span class="item-note">\n                {v.last_reply_at | fromNow}\n                </span>\n            </a>\n\n            <div class="item item-divider">\n                最近回复的主题\n            </div>\n\n            <a rv-each-v="self:user.data.recent_replies" class="item" rv-href="\'#/topic/%s\' | % v.id">\n                {v.title}\n\n                <span class="item-note">\n                {v.last_reply_at | fromNow}\n                </span>\n            </a>\n\n        </div>\n    </div>\n\n</div>'}});