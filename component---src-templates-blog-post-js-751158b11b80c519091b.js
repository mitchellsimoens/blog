(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{199:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return f});a(18);var n=a(0),i=a.n(n),r=a(205),o=a(221),s=a(211),l=a(208),d=a(209),c=a(203);var u=function(e){var t,a;function n(){return e.apply(this,arguments)||this}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata.title,a=this.props.pageContext,n=a.previous,u=a.next,f={url:""+this.props.data.site.siteMetadata.siteUrl+e.fields.slug,identifier:e.id,title:e.frontmatter.title};return i.a.createElement(l.a,{location:this.props.location,title:t},i.a.createElement(d.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),i.a.createElement(r.a,{style:{boxShadow:"none"},to:"/"},"← Back"),i.a.createElement("h1",{style:{marginTop:Object(c.a)(1),marginBottom:0}},e.frontmatter.title),i.a.createElement("p",{style:Object.assign({},Object(c.b)(-.2),{display:"block",marginBottom:Object(c.a)(1)})},e.frontmatter.date),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}),i.a.createElement("hr",{style:{marginBottom:Object(c.a)(1)}}),i.a.createElement(s.a,null),i.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},i.a.createElement("li",null,n&&i.a.createElement(r.a,{to:n.fields.slug,rel:"prev"},"← ",n.frontmatter.title)),i.a.createElement("li",null,u&&i.a.createElement(r.a,{to:u.fields.slug,rel:"next"},u.frontmatter.title," →"))),i.a.createElement(o.Disqus,{config:f}))},n}(i.a.Component);t.default=u;var f="600259732"},203:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"b",function(){return d});var n=a(215),i=a.n(n),r=a(216),o=a.n(r);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var s=new i.a(o.a);var l=s.rhythm,d=s.scale},204:function(e,t,a){var n;e.exports=(n=a(206))&&n.default||n},205:function(e,t,a){"use strict";var n=a(0),i=a.n(n),r=a(66),o=a.n(r);a.d(t,"a",function(){return o.a});a(204),a(9).default.enqueue,i.a.createContext({})},206:function(e,t,a){"use strict";a.r(t);a(18);var n=a(0),i=a.n(n),r=a(95);t.default=function(e){var t=e.location,a=e.pageResources;return a?i.a.createElement(r.a,Object.assign({location:t,pageResources:a},a.json)):null}},207:function(e,t,a){"use strict";a(212)("fixed",function(e){return function(){return e(this,"tt","","")}})},208:function(e,t,a){"use strict";a(18);var n=a(0),i=a.n(n),r=a(205),o=a(203);var s=function(e){var t,a;function n(){return e.apply(this,arguments)||this}return a=e,(t=n).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,n.prototype.render=function(){var e,t=this.props,a=t.location,n=t.title,s=t.children;return e="/"===a.pathname?i.a.createElement("h1",{style:Object.assign({},Object(o.b)(1.5),{marginBottom:Object(o.a)(1.5),marginTop:0})},i.a.createElement(r.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},i.a.createElement(r.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},n)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(o.a)(24),padding:Object(o.a)(1.5)+" "+Object(o.a)(.75)}},i.a.createElement("header",null,e),i.a.createElement("main",null,s),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},n}(i.a.Component);t.a=s},209:function(e,t,a){"use strict";var n=a(210),i=a(0),r=a.n(i),o=a(217),s=a.n(o);function l(e){var t=e.description,a=e.lang,i=e.meta,o=e.title,l=n.data.site,d=t||l.siteMetadata.description;return r.a.createElement(s.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:d},{property:"og:title",content:o},{property:"og:description",content:d},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:d}].concat(i)})}l.defaultProps={lang:"en",meta:[],description:""},t.a=l},210:function(e){e.exports={data:{site:{siteMetadata:{title:"Mitchell Simoens Blog",description:"Blog articles about myself and tech topics!",author:"Mitchell Simoens"}}}}},211:function(e,t,a){"use strict";a(207);var n=a(213),i=a(0),r=a.n(i),o=a(214),s=a.n(o),l=a(203);t.a=function(){var e=n.data,t=e.site.siteMetadata,a=t.author,i=t.social;return r.a.createElement("div",{style:{display:"flex",marginBottom:Object(l.a)(2.5)}},r.a.createElement(s.a,{fixed:e.avatar.childImageSharp.fixed,alt:a,style:{marginRight:Object(l.a)(.5),marginBottom:0,minWidth:50,borderRadius:"100%"},imgStyle:{borderRadius:"50%"}}),r.a.createElement("p",null,"Written by ",r.a.createElement("strong",null,a)," who is a long time nerd developing software and building computers and gadgets. Anything expressed on this website are Mitchell's alone and do not represent his employer."," ",r.a.createElement("a",{href:"https://twitter.com/"+i.twitter},"You should follow him on Twitter")))}},212:function(e,t,a){var n=a(1),i=a(7),r=a(32),o=/"/g,s=function(e,t,a,n){var i=String(r(e)),s="<"+t;return""!==a&&(s+=" "+a+'="'+String(n).replace(o,"&quot;")+'"'),s+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(s),n(n.P+n.F*i(function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}),"String",a)}},213:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEpElEQVQ4y4WVWUwbVxSGB7uVUvUtUqVKfamQ0pdIqaI8VMpD1KitKqVNH6ok9KGNaJukSURJmgUUyhJCWAolgYawbyGBEKBgEwM21OybMTabsbHxBtgGLxhsMBgv9++daZFSgtQjjWY8Puc795zz3zsM8z+mUqkYANzzht/PLCjHI4bLCvlt1y7x9/pSv7dfAwgEAsbj8XDPRv084/P5IqYFTbze7LQ39gHwPF7vB4rnNRfa7vxS05maYOD+MJlM3D3+m7OMb2cnYkE+yhPFxfJrPzvO2wtZdTjeG6ks+bojKa7gr/QUpbK2OmCStMHSLYGivBCMw+1m1u12nqyyhF8fdXq/Mg5Ov2z5uOf3jHu9Oendg/k5npEHmTC1C+HRa/GvhegVFCfcDDP7AA5Y59RHpdlp12UVxS06qcQyJ2iCXtgI62AvrOMyFhBmASzIohgjfTnpZK69lahaGgkH8dI+jNfVnB8u+uNJV1qipislHpNlj+GakNOQ0H8APZl3SV/2fdIef404dXMQ3YohyqeVpOXK91gYGQQz3dww1nn3zra67gmURflQNzyDXiohmw57SNfZHgxsb4cNvVI0X44mipoKIrj6AzRtAkw+r8FoSQFenD+DqYZaaMUiLMqGwUxVlcBFM7HZhwpyg00Xvw1trCwTWgqqv/qEK0WSeBsemwWBLR/klcUw9EkR8PkwQhcw9eIZBvOy0ZOZCrt6BsxYeVFoeXqSsET1y2Yi/PkiMfZ1w9jfg4m6aui6OiC9n4S1BTN8qy7Q8jCQ9xs3CdozkHCYJrNiZ3OTe8ewgQMPs7hAtgc0AWxTSu5iVzlZ/xR2zSzodDFU8AB+rwfrlkUOtNfWlxbAzAr/hKy0AD1Z97iV2NUqDhz0+2nWDWy6nAgFAtxv9v6qsUMZpkncJgMaos+h7VYMGKdWw8EcWjUFJnKObrMR+xlblpH2b7TkEZZnJulAzqLlSjQHEsT8iOITx8DqjptOYGsLYSqRJfkoCLiWYtWo5wKpRNCfm4HxqlK0Xr8MYewlVH1xElnvHySiG1exNC4jY+WFpOrLkyGGDaLygKysEOahfq6X1AF0OKj/7gyd9KcUGIu8DyMhTUskFMQKGAUfHSa0r2G6yiCdbpAt22ddBMNmFyfcgGmgF2uLZqoxIahUUBt1Gt0ZKUSSFEcDs5Fz6F0irygOi3+9GaJiDtJhkdCGF9aBbriUcsyJRf5FuWySUbc2I//oISQeYLjh6KWdhO0RW4Y0PTmsqCkPDT3KDY5Xl4ZWaGDA5cCSVMIJmR4MRk2HqM6u111wWJYOc8fcdGMdcc5rMU+dqCwI1WSIvqNlqII68UvsOO3YWbbCTYdGd82KaWRQbJIN37bMzhyngLdeOwx6slLDqyZD0KHVBNndsGu+RRPsWrV3SSEfdhoNmWvLts+tZvM7e+PLTxzjeZdtfJfNxjNp1Awz21iHLdq7dY0K61ZLeMNhn3HMa0vXHfZzljlN5F5A0ZHIiIWhfv7G2hrP5nDunlBMcnLyPw4zohbx0OOHQk1nx0/mCcURera8+SpgLOoUqwQ+3Rc89+pqxC5Ap9Pt+8n4GzNjGH46skWiAAAAAElFTkSuQmCC",width:50,height:50,src:"/static/d52cc3e45670cb0e8e5951c1cc06c6e0/352e5/profile-pic.png",srcSet:"/static/d52cc3e45670cb0e8e5951c1cc06c6e0/352e5/profile-pic.png 1x,\n/static/d52cc3e45670cb0e8e5951c1cc06c6e0/aae31/profile-pic.png 1.5x,\n/static/d52cc3e45670cb0e8e5951c1cc06c6e0/47c2b/profile-pic.png 2x"}}},site:{siteMetadata:{author:"Mitchell Simoens",social:{twitter:"LikelyMitch"}}}}}},214:function(e,t,a){"use strict";a(29),a(30),a(13),a(93),a(137),a(207);var n=a(14);t.__esModule=!0,t.default=void 0;var i,r=n(a(67)),o=n(a(71)),s=n(a(133)),l=n(a(134)),d=n(a(0)),c=n(a(51)),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,n=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),n&&(t.fluid=n,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=v([].concat(t.fluid))),t.fixed&&(t.fixed=v([].concat(t.fixed))),t},f=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},p=Object.create({}),g=function(e){var t=u(e),a=f(t);return p[a]||!1},m="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,h="undefined"!=typeof window,b=h&&window.IntersectionObserver,y=new WeakMap;function w(e){return e.map(function(e){var t=e.src,a=e.srcSet,n=e.srcSetWebp,i=e.media,r=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},n&&d.default.createElement("source",{type:"image/webp",media:i,srcSet:n,sizes:r}),d.default.createElement("source",{media:i,srcSet:a,sizes:r}))})}function v(e){var t=[],a=[];return e.forEach(function(e){return(e.media?t:a).push(e)}),t.concat(a)}function S(e){return e.map(function(e){var t=e.src,a=e.media,n=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:n})})}function E(e){return e.map(function(e){var t=e.src,a=e.media,n=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:n})})}function I(e,t){var a=e.srcSet,n=e.srcSetWebp,i=e.media,r=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?n:a)+'" '+(r?'sizes="'+r+'" ':"")+"/>"}var O=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),y.delete(e.target),t())}})},{rootMargin:"200px"})),i);return a&&(a.observe(e),y.set(e,t)),function(){a.unobserve(e),y.delete(e)}},M=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",r=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map(function(e){return(e.srcSetWebp?I(e,!0):"")+I(e)}).join("")+"<img "+d+o+s+a+n+t+r+i+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},x=function(e){var t=e.src,a=e.imageVariants,n=e.generateSources,i=e.spreadProps,r=d.default.createElement(A,(0,l.default)({src:t},i));return a.length>1?d.default.createElement("picture",null,n(a),r):r},A=d.default.forwardRef(function(e,t){var a=e.sizes,n=e.srcSet,i=e.src,r=e.style,o=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,p=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return d.default.createElement("img",(0,l.default)({sizes:a,srcSet:n,src:i},p,{onLoad:o,onError:c,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},r)}))});A.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var C=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=h&&g(t),a.addNoScript=!(t.critical&&!t.fadeIn),a.useIOSupport=!m&&b&&!t.critical&&!a.seenBefore;var n=t.critical||h&&(m||!a.useIOSupport);return a.state={isVisible:n,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,o.default)((0,o.default)(a))),a.handleRef=a.handleRef.bind((0,o.default)((0,o.default)(a))),a}(0,r.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=O(e,function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=f(t),p[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,n=e.className,i=e.style,r=void 0===i?{}:i,o=e.imgStyle,s=void 0===o?{}:o,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,g=e.fluid,m=e.fixed,h=e.backgroundColor,b=e.durationFadeIn,y=e.Tag,v=e.itemProp,I=e.loading,O=e.draggable,C=!1===this.state.fadeIn||this.state.imgLoaded,q=!0===this.state.fadeIn&&!this.state.imgCached,L=(0,l.default)({opacity:C?1:0,transition:q?"opacity "+b+"ms":"none"},s),j="boolean"==typeof h?"lightgray":h,R={transitionDelay:b+"ms"},U=(0,l.default)({opacity:this.state.imgLoaded?0:1},q&&R,s,f),k={title:t,alt:this.state.isVisible?"":a,style:U,className:p};if(g){var z=g,D=z[0];return d.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},r),ref:this.handleRef,key:"fluid-"+JSON.stringify(D.srcSet)},d.default.createElement(y,{style:{width:"100%",paddingBottom:100/D.aspectRatio+"%"}}),j&&d.default.createElement(y,{title:t,style:(0,l.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},q&&R)}),D.base64&&d.default.createElement(x,{src:D.base64,spreadProps:k,imageVariants:z,generateSources:E}),D.tracedSVG&&d.default.createElement(x,{src:D.tracedSVG,spreadProps:k,imageVariants:z,generateSources:S}),this.state.isVisible&&d.default.createElement("picture",null,w(z),d.default.createElement(A,{alt:a,title:t,sizes:D.sizes,src:D.src,crossOrigin:this.props.crossOrigin,srcSet:D.srcSet,style:L,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:I,draggable:O})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:M((0,l.default)({alt:a,title:t,loading:I},D,{imageVariants:z}))}}))}if(m){var N=m,W=N[0],T=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:W.width,height:W.height},r);return"inherit"===r.display&&delete T.display,d.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:T,ref:this.handleRef,key:"fixed-"+JSON.stringify(W.srcSet)},j&&d.default.createElement(y,{title:t,style:(0,l.default)({backgroundColor:j,width:W.width,opacity:this.state.imgLoaded?0:1,height:W.height},q&&R)}),W.base64&&d.default.createElement(x,{src:W.base64,spreadProps:k,imageVariants:N,generateSources:E}),W.tracedSVG&&d.default.createElement(x,{src:W.tracedSVG,spreadProps:k,imageVariants:N,generateSources:S}),this.state.isVisible&&d.default.createElement("picture",null,w(N),d.default.createElement(A,{alt:a,title:t,width:W.width,height:W.height,sizes:W.sizes,src:W.src,crossOrigin:this.props.crossOrigin,srcSet:W.srcSet,style:L,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:I,draggable:O})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:M((0,l.default)({alt:a,title:t,loading:I},W,{imageVariants:N}))}}))}return null},t}(d.default.Component);C.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var q=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),L=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});C.propTypes={resolutions:q,sizes:L,fixed:c.default.oneOfType([q,c.default.arrayOf(q)]),fluid:c.default.oneOfType([L,c.default.arrayOf(L)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var j=C;t.default=j},218:function(e,t,a){"use strict";t.__esModule=!0,t.insertScript=function(e,t,a){var n=window.document.createElement("script");return n.async=!0,n.src=e,n.id=t,a.appendChild(n),n},t.removeScript=function(e,t){var a=window.document.getElementById(e);a&&t.removeChild(a)},t.debounce=function(e,t,a){var n;return function(){var i=this,r=arguments,o=a&&!n;window.clearTimeout(n),n=setTimeout(function(){n=null,a||e.apply(i,r)},t),o&&e.apply(i,r)}}},221:function(e,t,a){"use strict";var n=a(14);t.__esModule=!0,t.default=void 0;var i=n(a(222));t.Disqus=i.default;var r=n(a(223));t.CommentCount=r.default;var o=i.default;t.default=o},222:function(e,t,a){"use strict";var n=a(14);t.__esModule=!0,t.default=void 0;var i=n(a(134)),r=n(a(133)),o=n(a(67)),s=n(a(0)),l=n(a(51)),d=a(218);a(200);var c=function(e){function t(t){var a;return(a=e.call(this,t)||this).shortname="mitchellsimoensblog",t.config?a.config=t.config:a.config={identifier:t.identifier,url:t.url,title:t.title},a}(0,o.default)(t,e);var a=t.prototype;return a.componentWillReceiveProps=function(e){this.setState(e)},a.componentWillMount=function(){"undefined"!=typeof window&&window.document&&this.shortname&&this.cleanInstance()},a.componentDidMount=function(){this.loadInstance()},a.shouldComponentUpdate=function(e){if(this.shortname!==e.shortname)return!0;var t=this.config,a=e.config;return t.url!==a.url||t.identifier!==a.identifier},a.componentDidUpdate=function(){this.loadInstance()},a.loadInstance=function(){if("undefined"!=typeof window&&window.document&&this.shortname){var e=this.config;window.disqus_config=function(){this.page.identifier=e.identifier,this.page.title=e.title,this.page.url=e.url},(0,d.insertScript)("https://"+this.shortname+".disqus.com/embed.js","disqus-embed-script",window.document.body)}},a.cleanInstance=function(){(0,d.removeScript)("disqus-embed-script",window.document.body),window&&window.DISQUS&&window.DISQUS.reset();try{delete window.DISQUS}catch(t){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild)},a.render=function(){var e=this.props,t=(e.config,(0,r.default)(e,["config"]));return s.default.createElement("div",(0,i.default)({id:"disqus_thread"},t,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:86},__self:this}))},t}(s.default.Component);t.default=c,c.propTypes={config:l.default.shape({identifier:l.default.string,title:l.default.string,url:l.default.string}),identifier:l.default.string,title:l.default.string,url:l.default.string}},223:function(e,t,a){"use strict";var n=a(14);t.__esModule=!0,t.default=void 0;var i=n(a(134)),r=n(a(133)),o=n(a(67)),s=n(a(0)),l=n(a(51)),d=a(218),c=(0,d.debounce)(function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})},300,!1),u=function(e){function t(t){var a;return(a=e.call(this,t)||this).shortname="mitchellsimoensblog",a}(0,o.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){this.loadInstance()},a.shouldComponentUpdate=function(e){var t=this.props.config,a=e.config;return t.url!==a.url||t.identifier!==a.identifier},a.componentWillReceiveProps=function(e){this.setState(e)},a.componentDidUpdate=function(){this.loadInstance()},a.loadInstance=function(){window.document.getElementById("dsq-count-scr")?c():(0,d.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},a.cleanInstance=function(){(0,d.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},a.render=function(){var e=this.props,t=e.config,a=e.placeholder,n=(0,r.default)(e,["config","placeholder"]);return s.default.createElement("span",(0,i.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},n,{__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:55},__self:this}),a)},t}(s.default.Component);t.default=u,u.defaultProps={placeholder:"..."},u.propTypes={config:l.default.shape({identifier:l.default.string,title:l.default.string,url:l.default.string}),placeholder:l.default.string}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-751158b11b80c519091b.js.map