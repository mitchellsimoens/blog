(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{203:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return u});n(18);var i=n(0),a=n.n(i),r=n(211),o=n(228),s=n(216),c=n(213),l=n(214),d=n(209);n(205);t.default=function(e){var t=e.data,n=e.location,i=e.pageContext,u=t.markdownRemark,f=t.site.siteMetadata.title,m=i.previous,p=i.next,g={url:""+t.site.siteMetadata.siteUrl+u.fields.slug,identifier:u.id,title:u.frontmatter.title};return a.a.createElement(c.a,{location:n,title:f},a.a.createElement(l.a,{title:u.frontmatter.title,description:u.frontmatter.description||u.excerpt}),a.a.createElement(r.a,{style:{boxShadow:"none"},to:"/"},"← Back"),a.a.createElement("h1",{style:{marginTop:Object(d.a)(1),marginBottom:0}},u.frontmatter.title),a.a.createElement("p",{style:Object.assign({},Object(d.b)(-.2),{display:"block",marginBottom:Object(d.a)(1)})},u.frontmatter.date),a.a.createElement("div",{dangerouslySetInnerHTML:{__html:u.html}}),a.a.createElement("hr",{style:{marginBottom:Object(d.a)(1)}}),a.a.createElement(s.a,null),a.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},a.a.createElement("li",null,m&&a.a.createElement(r.a,{to:m.fields.slug,rel:"prev"},"← ",m.frontmatter.title)),a.a.createElement("li",null,p&&a.a.createElement(r.a,{to:p.fields.slug,rel:"next"},p.frontmatter.title," →"))),a.a.createElement(o.Disqus,{config:g}))};var u="600259732"},209:function(e,t,n){"use strict";n.d(t,"a",function(){return c}),n.d(t,"b",function(){return l});var i=n(219),a=n.n(i),r=n(220),o=n.n(r);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var s=new a.a(o.a);var c=s.rhythm,l=s.scale},210:function(e,t,n){var i;e.exports=(i=n(212))&&i.default||i},211:function(e,t,n){"use strict";var i=n(0),a=n.n(i),r=n(66),o=n.n(r);n.d(t,"a",function(){return o.a});n(210),n(9).default.enqueue,a.a.createContext({})},212:function(e,t,n){"use strict";n.r(t);n(18);var i=n(0),a=n.n(i),r=n(94);t.default=function(e){var t=e.location,n=e.pageResources;return n?a.a.createElement(r.a,Object.assign({location:t,pageResources:n},n.json)):null}},213:function(e,t,n){"use strict";n(18);var i=n(0),a=n.n(i),r=n(211),o=n(209);t.a=function(e){var t,n=e.children,i=e.location,s=e.title;return t="/"===i.pathname?a.a.createElement("h1",{style:Object.assign({},Object(o.b)(1.5),{marginBottom:Object(o.a)(1.5),marginTop:0})},a.a.createElement(r.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},s)):a.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},a.a.createElement(r.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},s)),a.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(o.a)(24),padding:Object(o.a)(1.5)+" "+Object(o.a)(.75)}},a.a.createElement("header",null,t),a.a.createElement("main",null,n),a.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",a.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))}},214:function(e,t,n){"use strict";var i=n(215),a=n(0),r=n.n(a),o=n(221),s=n.n(o);function c(e){var t=e.description,n=e.lang,a=e.meta,o=e.title,c=i.data.site,l=t||c.siteMetadata.description;return r.a.createElement(s.a,{htmlAttributes:{lang:n},title:o,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{name:"description",content:l},{property:"og:title",content:o},{property:"og:description",content:l},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:c.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:l}].concat(a)})}c.defaultProps={lang:"en",meta:[],description:""},t.a=c},215:function(e){e.exports={data:{site:{siteMetadata:{title:"Mitchell Simoens Blog",description:"Blog articles about myself and tech topics!",author:"Mitchell Simoens"}}}}},216:function(e,t,n){"use strict";n(217);var i=n(218),a=n(0),r=n.n(a),o=n(223),s=n.n(o),c=n(227),l=n(209);t.a=function(){var e=i.data,t=e.site.siteMetadata,n=t.author,a=t.social;return r.a.createElement("div",{style:{display:"flex",marginBottom:Object(l.a)(2.5)}},r.a.createElement(s.a,{fixed:e.avatar.childImageSharp.fixed,alt:n,style:{marginRight:Object(l.a)(.5),marginBottom:0,minWidth:50,borderRadius:"100%"},imgStyle:{borderRadius:"50%"}}),r.a.createElement("div",null,r.a.createElement("p",null,"Written by ",n," who is a long time nerd developing software and building computers and gadgets. Anything expressed on this website are ",n,"'","s alone and do not represent his employer."),r.a.createElement(c.a,{screenName:a.twitter,options:{size:"large"}})))}},218:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEpElEQVQ4y4WVWUwbVxSGB7uVUvUtUqVKfamQ0pdIqaI8VMpD1KitKqVNH6ok9KGNaJukSURJmgUUyhJCWAolgYawbyGBEKBgEwM21OybMTabsbHxBtgGLxhsMBgv9++daZFSgtQjjWY8Puc795zz3zsM8z+mUqkYANzzht/PLCjHI4bLCvlt1y7x9/pSv7dfAwgEAsbj8XDPRv084/P5IqYFTbze7LQ39gHwPF7vB4rnNRfa7vxS05maYOD+MJlM3D3+m7OMb2cnYkE+yhPFxfJrPzvO2wtZdTjeG6ks+bojKa7gr/QUpbK2OmCStMHSLYGivBCMw+1m1u12nqyyhF8fdXq/Mg5Ov2z5uOf3jHu9Oendg/k5npEHmTC1C+HRa/GvhegVFCfcDDP7AA5Y59RHpdlp12UVxS06qcQyJ2iCXtgI62AvrOMyFhBmASzIohgjfTnpZK69lahaGgkH8dI+jNfVnB8u+uNJV1qipislHpNlj+GakNOQ0H8APZl3SV/2fdIef404dXMQ3YohyqeVpOXK91gYGQQz3dww1nn3zra67gmURflQNzyDXiohmw57SNfZHgxsb4cNvVI0X44mipoKIrj6AzRtAkw+r8FoSQFenD+DqYZaaMUiLMqGwUxVlcBFM7HZhwpyg00Xvw1trCwTWgqqv/qEK0WSeBsemwWBLR/klcUw9EkR8PkwQhcw9eIZBvOy0ZOZCrt6BsxYeVFoeXqSsET1y2Yi/PkiMfZ1w9jfg4m6aui6OiC9n4S1BTN8qy7Q8jCQ9xs3CdozkHCYJrNiZ3OTe8ewgQMPs7hAtgc0AWxTSu5iVzlZ/xR2zSzodDFU8AB+rwfrlkUOtNfWlxbAzAr/hKy0AD1Z97iV2NUqDhz0+2nWDWy6nAgFAtxv9v6qsUMZpkncJgMaos+h7VYMGKdWw8EcWjUFJnKObrMR+xlblpH2b7TkEZZnJulAzqLlSjQHEsT8iOITx8DqjptOYGsLYSqRJfkoCLiWYtWo5wKpRNCfm4HxqlK0Xr8MYewlVH1xElnvHySiG1exNC4jY+WFpOrLkyGGDaLygKysEOahfq6X1AF0OKj/7gyd9KcUGIu8DyMhTUskFMQKGAUfHSa0r2G6yiCdbpAt22ddBMNmFyfcgGmgF2uLZqoxIahUUBt1Gt0ZKUSSFEcDs5Fz6F0irygOi3+9GaJiDtJhkdCGF9aBbriUcsyJRf5FuWySUbc2I//oISQeYLjh6KWdhO0RW4Y0PTmsqCkPDT3KDY5Xl4ZWaGDA5cCSVMIJmR4MRk2HqM6u111wWJYOc8fcdGMdcc5rMU+dqCwI1WSIvqNlqII68UvsOO3YWbbCTYdGd82KaWRQbJIN37bMzhyngLdeOwx6slLDqyZD0KHVBNndsGu+RRPsWrV3SSEfdhoNmWvLts+tZvM7e+PLTxzjeZdtfJfNxjNp1Awz21iHLdq7dY0K61ZLeMNhn3HMa0vXHfZzljlN5F5A0ZHIiIWhfv7G2hrP5nDunlBMcnLyPw4zohbx0OOHQk1nx0/mCcURera8+SpgLOoUqwQ+3Rc89+pqxC5Ap9Pt+8n4GzNjGH46skWiAAAAAElFTkSuQmCC",width:50,height:50,src:"/static/d52cc3e45670cb0e8e5951c1cc06c6e0/352e5/profile-pic.png",srcSet:"/static/d52cc3e45670cb0e8e5951c1cc06c6e0/352e5/profile-pic.png 1x,\n/static/d52cc3e45670cb0e8e5951c1cc06c6e0/aae31/profile-pic.png 1.5x,\n/static/d52cc3e45670cb0e8e5951c1cc06c6e0/47c2b/profile-pic.png 2x"}}},site:{siteMetadata:{author:"Mitchell Simoens",social:{twitter:"LikelyMitch"}}}}}},222:function(e,t,n){"use strict";t.__esModule=!0,t.insertScript=function(e,t,n){var i=window.document.createElement("script");return i.async=!0,i.src=e,i.id=t,n.appendChild(i),i},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var i;return function(){var a=this,r=arguments,o=n&&!i;window.clearTimeout(i),i=setTimeout(function(){i=null,n||e.apply(a,r)},t),o&&e.apply(a,r)}}},228:function(e,t,n){"use strict";var i=n(14);t.__esModule=!0,t.default=void 0;var a=i(n(229));t.Disqus=a.default;var r=i(n(230));t.CommentCount=r.default;var o=a.default;t.default=o},229:function(e,t,n){"use strict";var i=n(14);t.__esModule=!0,t.default=void 0;var a=i(n(134)),r=i(n(133)),o=i(n(68)),s=i(n(0)),c=i(n(51)),l=n(222);n(204);var d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="mitchellsimoensblog",t.config?n.config=t.config:n.config={identifier:t.identifier,url:t.url,title:t.title},n}(0,o.default)(t,e);var n=t.prototype;return n.componentWillReceiveProps=function(e){this.setState(e)},n.componentWillMount=function(){"undefined"!=typeof window&&window.document&&this.shortname&&this.cleanInstance()},n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){if(this.shortname!==e.shortname)return!0;var t=this.config,n=e.config;return t.url!==n.url||t.identifier!==n.identifier},n.componentDidUpdate=function(){this.loadInstance()},n.loadInstance=function(){if("undefined"!=typeof window&&window.document&&this.shortname){var e=this.config;window.disqus_config=function(){this.page.identifier=e.identifier,this.page.title=e.title,this.page.url=e.url},(0,l.insertScript)("https://"+this.shortname+".disqus.com/embed.js","disqus-embed-script",window.document.body)}},n.cleanInstance=function(){(0,l.removeScript)("disqus-embed-script",window.document.body),window&&window.DISQUS&&window.DISQUS.reset();try{delete window.DISQUS}catch(t){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild)},n.render=function(){var e=this.props,t=(e.config,(0,r.default)(e,["config"]));return s.default.createElement("div",(0,a.default)({id:"disqus_thread"},t,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:86},__self:this}))},t}(s.default.Component);t.default=d,d.propTypes={config:c.default.shape({identifier:c.default.string,title:c.default.string,url:c.default.string}),identifier:c.default.string,title:c.default.string,url:c.default.string}},230:function(e,t,n){"use strict";var i=n(14);t.__esModule=!0,t.default=void 0;var a=i(n(134)),r=i(n(133)),o=i(n(68)),s=i(n(0)),c=i(n(51)),l=n(222),d=(0,l.debounce)(function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})},300,!1),u=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="mitchellsimoensblog",n}(0,o.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){var t=this.props.config,n=e.config;return t.url!==n.url||t.identifier!==n.identifier},n.componentWillReceiveProps=function(e){this.setState(e)},n.componentDidUpdate=function(){this.loadInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?d():(0,l.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,l.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.placeholder,i=(0,r.default)(e,["config","placeholder"]);return s.default.createElement("span",(0,a.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},i,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:55},__self:this}),n)},t}(s.default.Component);t.default=u,u.defaultProps={placeholder:"..."},u.propTypes={config:c.default.shape({identifier:c.default.string,title:c.default.string,url:c.default.string}),placeholder:c.default.string}}}]);
//# sourceMappingURL=component---src-templates-blog-post-jsx-8bd0f700524370f0cd49.js.map