(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"7evw":function(e,t,n){"use strict";n("R48M"),Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=t.CommentEmbed=t.CommentCount=void 0;var o=n("UZsz"),r=n("Bp/N"),i=n("HhXV");t.CommentCount=o.CommentCount,t.CommentEmbed=r.CommentEmbed,t.DiscussionEmbed=i.DiscussionEmbed;var s={CommentCount:o.CommentCount,CommentEmbed:r.CommentEmbed,DiscussionEmbed:i.DiscussionEmbed};t.default=s},"Bp/N":function(e,t,n){"use strict";n("YBKJ"),n("q8oJ"),n("C9fy"),n("8npG"),n("LagC"),n("pS08"),n("R48M"),Object.defineProperty(t,"__esModule",{value:!0}),t.CommentEmbed=void 0;var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n("q1tI"),s=(o=i)&&o.__esModule?o:{default:o};function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(t.CommentEmbed=function(e){function t(){return a(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"getSrc",value:function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")}},{key:"render",value:function(){return s.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0"})}}]),t}(s.default.Component)).defaultProps={showMedia:!0,showParentComment:!0,width:420,height:320}},HhXV:function(e,t,n){"use strict";n("LagC"),n("pS08"),n("R48M"),Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=void 0;var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n("q1tI"),s=(o=i)&&o.__esModule?o:{default:o},a=n("ZMnY");function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}t.DiscussionEmbed=function(e){function t(){return u(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentWillMount",value:function(){"undefined"!=typeof window&&window.disqus_shortname&&window.disqus_shortname!==this.props.shortname&&this.cleanInstance()}},{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){return this.props!==e&&(0,a.shallowComparison)(this.props,e)}},{key:"componentWillUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance()}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;window&&window.DISQUS&&e.getElementById("dsq-embed-scr")?window.DISQUS.reset({reload:!0,config:this.getDisqusConfig(this.props.config)}):(window.disqus_config=this.getDisqusConfig(this.props.config),window.disqus_shortname=this.props.shortname,(0,a.insertScript)("https://"+this.props.shortname+".disqus.com/embed.js","dsq-embed-scr",e.body))}},{key:"cleanInstance",value:function(){var e=window.document;(0,a.removeScript)("dsq-embed-scr",e.body),window&&window.DISQUS&&window.DISQUS.reset({});try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var t=e.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild)}},{key:"getDisqusConfig",value:function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.callbacks.onNewComment=[e.onNewComment]}}},{key:"render",value:function(){return s.default.createElement("div",{id:"disqus_thread"})}}]),t}(s.default.Component)},UZsz:function(e,t,n){"use strict";n("LagC"),n("pS08"),n("R48M"),Object.defineProperty(t,"__esModule",{value:!0}),t.CommentCount=void 0;var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=n("q1tI"),s=(o=i)&&o.__esModule?o:{default:o},a=n("ZMnY");function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var l=(0,a.debounce)((function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})}),300,!1);t.CommentCount=function(e){function t(){return u(this,t),c(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){return this.props!==e&&(0,a.shallowComparison)(this.props,e)}},{key:"componentWillUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance()}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;e.getElementById("dsq-count-scr")?l():(0,a.insertScript)("https://"+this.props.shortname+".disqus.com/count.js","dsq-count-scr",e.body)}},{key:"cleanInstance",value:function(){var e=window.document.body;(0,a.removeScript)("dsq-count-scr",e),window.DISQUSWIDGETS=void 0}},{key:"render",value:function(){return s.default.createElement("span",{className:"disqus-comment-count","data-disqus-identifier":this.props.config.identifier,"data-disqus-url":this.props.config.url},this.props.children)}}]),t}(s.default.Component)},YBKJ:function(e,t,n){"use strict";var o=n("emib"),r=n("qDzq"),i=n("CCE/"),s=n("TUPI"),a=n("kxs/"),u=n("96qb"),c=n("chL8").f,l=n("Drra").f,d=n("rjfK").f,f=n("EU/P").trim,p=o.Number,m=p,h=p.prototype,b="Number"==i(n("nsRs")(h)),y="trim"in String.prototype,w=function(e){var t=a(e,!1);if("string"==typeof t&&t.length>2){var n,o,r,i=(t=y?t.trim():f(t,3)).charCodeAt(0);if(43===i||45===i){if(88===(n=t.charCodeAt(2))||120===n)return NaN}else if(48===i){switch(t.charCodeAt(1)){case 66:case 98:o=2,r=49;break;case 79:case 111:o=8,r=55;break;default:return+t}for(var s,u=t.slice(2),c=0,l=u.length;c<l;c++)if((s=u.charCodeAt(c))<48||s>r)return NaN;return parseInt(u,o)}}return+t};if(!p(" 0o1")||!p("0b1")||p("+0x1")){p=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof p&&(b?u((function(){h.valueOf.call(n)})):"Number"!=i(n))?s(new m(w(t)),n,p):w(t)};for(var v,g=n("QPJK")?c(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),E=0;g.length>E;E++)r(m,v=g[E])&&!r(p,v)&&d(p,v,l(m,v));p.prototype=h,h.constructor=p,n("IYdN")(o,"Number",p)}},ZMnY:function(e,t,n){"use strict";n("m210"),n("4DPX"),n("Ggvi"),n("rzGZ"),n("Dq+y"),n("8npG"),n("YbXK"),n("ToIb"),n("wZFJ"),n("MIFh"),n("R48M"),Object.defineProperty(t,"__esModule",{value:!0}),t.insertScript=function(e,t,n){var o=window.document.createElement("script");return o.async=!0,o.src=e,o.id=t,n.appendChild(o),o},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var o=void 0;return function(){var r=this,i=arguments,s=function(){o=null,n||e.apply(r,i)},a=n&&!o;window.clearTimeout(o),o=setTimeout(s,t),a&&e.apply(r,i)}},t.isReactElement=s,t.shallowComparison=function(e,t){var n=new Set(Object.keys(e),Object.keys(t)),o=!0,r=!1,i=void 0;try{for(var a,u=n[Symbol.iterator]();!(o=(a=u.next()).done);o=!0){var c=a.value;if(e[c]!==t[c]&&!s(e[c]))return!0}}catch(l){r=!0,i=l}finally{try{!o&&u.return&&u.return()}finally{if(r)throw i}}return!1};var o,r=n("q1tI"),i=(o=r)&&o.__esModule?o:{default:o};function s(e){return!!i.default.isValidElement(e)||!!Array.isArray(e)&&e.some((function(e){return i.default.isValidElement(e)}))}},cZrw:function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"pageQuery",(function(){return c}));n("E5k/");var o=n("Wbzz"),r=n("7evw"),i=n("IgZc"),s=n("9Dj+"),a=n("H8eV"),u=n("rB5o");n("cXBx");t.default=function(t){var n=t.data,c=t.location,l=t.pageContext,d=n.markdownRemark,f=n.site.siteMetadata.title,p=l.previous,m=l.next,h={shortname:"mitchellsimoensblog",config:{identifier:d.fields.slug,title:d.frontmatter.title,url:""+n.site.siteMetadata.siteUrl+d.fields.slug}};return e.createElement(s.a,{location:c,title:f},e.createElement(a.a,{title:d.frontmatter.title,description:d.frontmatter.description||d.excerpt}),e.createElement(o.Link,{style:{boxShadow:"none"},to:"/"},"← Back"),e.createElement("h1",{style:{marginTop:Object(u.a)(1),marginBottom:0}},d.frontmatter.title),e.createElement("p",{style:Object.assign({},Object(u.b)(-.2),{display:"block",marginBottom:0})},d.frontmatter.date),e.createElement("p",{style:Object.assign({},Object(u.b)(-.2),{display:"block",marginBottom:Object(u.a)(1)})},d.fields.readingTime.text),e.createElement("div",{dangerouslySetInnerHTML:{__html:d.html}}),e.createElement("hr",{style:{marginBottom:Object(u.a)(1)}}),e.createElement(i.a,null),e.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},e.createElement("li",null,p&&e.createElement(o.Link,{to:p.fields.slug,rel:"prev"},"← ",p.frontmatter.title)),e.createElement("li",null,m&&e.createElement(o.Link,{to:m.fields.slug,rel:"next"},m.frontmatter.title," →"))),e.createElement(r.DiscussionEmbed,h))};var c="661840405"}.call(this,n("q1tI"))}}]);
//# sourceMappingURL=component---src-templates-blog-post-tsx-2bee3c4d0f5d3d0bb277.js.map