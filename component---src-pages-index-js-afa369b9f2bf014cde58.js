(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{202:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return u});var r=a(0),i=a.n(r),n=a(205),o=a(211),s=a(208),l=a(209),d=a(203);var c=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){var e=this.props.data,t=e.site.siteMetadata.title,a=e.allMarkdownRemark.edges;return i.a.createElement(s.a,{location:this.props.location,title:t},i.a.createElement(l.a,{title:"All posts"}),i.a.createElement(o.a,null),a.map(function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug;return i.a.createElement("div",{key:t.fields.slug},i.a.createElement("h3",{style:{marginBottom:Object(d.a)(.25)}},i.a.createElement(n.a,{style:{boxShadow:"none"},to:t.fields.slug},a)),i.a.createElement("small",null,t.frontmatter.date),i.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}}))}))},r}(i.a.Component);t.default=c;var u="1623555389"},203:function(e,t,a){"use strict";a.d(t,"a",function(){return l}),a.d(t,"b",function(){return d});var r=a(215),i=a.n(r),n=a(216),o=a.n(n);o.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete o.a.googleFonts;var s=new i.a(o.a);var l=s.rhythm,d=s.scale},204:function(e,t,a){var r;e.exports=(r=a(206))&&r.default||r},205:function(e,t,a){"use strict";var r=a(0),i=a.n(r),n=a(66),o=a.n(n);a.d(t,"a",function(){return o.a});a(204),a(9).default.enqueue,i.a.createContext({})},206:function(e,t,a){"use strict";a.r(t);a(18);var r=a(0),i=a.n(r),n=a(95);t.default=function(e){var t=e.location,a=e.pageResources;return a?i.a.createElement(n.a,Object.assign({location:t,pageResources:a},a.json)):null}},207:function(e,t,a){"use strict";a(212)("fixed",function(e){return function(){return e(this,"tt","","")}})},208:function(e,t,a){"use strict";a(18);var r=a(0),i=a.n(r),n=a(205),o=a(203);var s=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){var e,t=this.props,a=t.location,r=t.title,s=t.children;return e="/"===a.pathname?i.a.createElement("h1",{style:Object.assign({},Object(o.b)(1.5),{marginBottom:Object(o.a)(1.5),marginTop:0})},i.a.createElement(n.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0}},i.a.createElement(n.a,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(o.a)(24),padding:Object(o.a)(1.5)+" "+Object(o.a)(.75)}},i.a.createElement("header",null,e),i.a.createElement("main",null,s),i.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built with"," ",i.a.createElement("a",{href:"https://www.gatsbyjs.org"},"Gatsby")))},r}(i.a.Component);t.a=s},209:function(e,t,a){"use strict";var r=a(210),i=a(0),n=a.n(i),o=a(217),s=a.n(o);function l(e){var t=e.description,a=e.lang,i=e.meta,o=e.title,l=r.data.site,d=t||l.siteMetadata.description;return n.a.createElement(s.a,{htmlAttributes:{lang:a},title:o,titleTemplate:"%s | "+l.siteMetadata.title,meta:[{name:"description",content:d},{property:"og:title",content:o},{property:"og:description",content:d},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:l.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:d}].concat(i)})}l.defaultProps={lang:"en",meta:[],description:""},t.a=l},210:function(e){e.exports={data:{site:{siteMetadata:{title:"Mitchell Simoens Blog",description:"Blog articles about myself and tech topics!",author:"Mitchell Simoens"}}}}},211:function(e,t,a){"use strict";a(207);var r=a(213),i=a(0),n=a.n(i),o=a(214),s=a.n(o),l=a(203);t.a=function(){var e=r.data,t=e.site.siteMetadata,a=t.author,i=t.social;return n.a.createElement("div",{style:{display:"flex",marginBottom:Object(l.a)(2.5)}},n.a.createElement(s.a,{fixed:e.avatar.childImageSharp.fixed,alt:a,style:{marginRight:Object(l.a)(.5),marginBottom:0,minWidth:50,borderRadius:"100%"},imgStyle:{borderRadius:"50%"}}),n.a.createElement("p",null,"Written by ",n.a.createElement("strong",null,a)," who is a long time nerd developing software and building computers and gadgets. Anything expressed on this website are Mitchell's alone and do not represent his employer."," ",n.a.createElement("a",{href:"https://twitter.com/"+i.twitter},"You should follow him on Twitter")))}},212:function(e,t,a){var r=a(1),i=a(7),n=a(32),o=/"/g,s=function(e,t,a,r){var i=String(n(e)),s="<"+t;return""!==a&&(s+=" "+a+'="'+String(r).replace(o,"&quot;")+'"'),s+">"+i+"</"+t+">"};e.exports=function(e,t){var a={};a[e]=t(s),r(r.P+r.F*i(function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}),"String",a)}},213:function(e){e.exports={data:{avatar:{childImageSharp:{fixed:{base64:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEpElEQVQ4y4WVWUwbVxSGB7uVUvUtUqVKfamQ0pdIqaI8VMpD1KitKqVNH6ok9KGNaJukSURJmgUUyhJCWAolgYawbyGBEKBgEwM21OybMTabsbHxBtgGLxhsMBgv9++daZFSgtQjjWY8Puc795zz3zsM8z+mUqkYANzzht/PLCjHI4bLCvlt1y7x9/pSv7dfAwgEAsbj8XDPRv084/P5IqYFTbze7LQ39gHwPF7vB4rnNRfa7vxS05maYOD+MJlM3D3+m7OMb2cnYkE+yhPFxfJrPzvO2wtZdTjeG6ks+bojKa7gr/QUpbK2OmCStMHSLYGivBCMw+1m1u12nqyyhF8fdXq/Mg5Ov2z5uOf3jHu9Oendg/k5npEHmTC1C+HRa/GvhegVFCfcDDP7AA5Y59RHpdlp12UVxS06qcQyJ2iCXtgI62AvrOMyFhBmASzIohgjfTnpZK69lahaGgkH8dI+jNfVnB8u+uNJV1qipislHpNlj+GakNOQ0H8APZl3SV/2fdIef404dXMQ3YohyqeVpOXK91gYGQQz3dww1nn3zra67gmURflQNzyDXiohmw57SNfZHgxsb4cNvVI0X44mipoKIrj6AzRtAkw+r8FoSQFenD+DqYZaaMUiLMqGwUxVlcBFM7HZhwpyg00Xvw1trCwTWgqqv/qEK0WSeBsemwWBLR/klcUw9EkR8PkwQhcw9eIZBvOy0ZOZCrt6BsxYeVFoeXqSsET1y2Yi/PkiMfZ1w9jfg4m6aui6OiC9n4S1BTN8qy7Q8jCQ9xs3CdozkHCYJrNiZ3OTe8ewgQMPs7hAtgc0AWxTSu5iVzlZ/xR2zSzodDFU8AB+rwfrlkUOtNfWlxbAzAr/hKy0AD1Z97iV2NUqDhz0+2nWDWy6nAgFAtxv9v6qsUMZpkncJgMaos+h7VYMGKdWw8EcWjUFJnKObrMR+xlblpH2b7TkEZZnJulAzqLlSjQHEsT8iOITx8DqjptOYGsLYSqRJfkoCLiWYtWo5wKpRNCfm4HxqlK0Xr8MYewlVH1xElnvHySiG1exNC4jY+WFpOrLkyGGDaLygKysEOahfq6X1AF0OKj/7gyd9KcUGIu8DyMhTUskFMQKGAUfHSa0r2G6yiCdbpAt22ddBMNmFyfcgGmgF2uLZqoxIahUUBt1Gt0ZKUSSFEcDs5Fz6F0irygOi3+9GaJiDtJhkdCGF9aBbriUcsyJRf5FuWySUbc2I//oISQeYLjh6KWdhO0RW4Y0PTmsqCkPDT3KDY5Xl4ZWaGDA5cCSVMIJmR4MRk2HqM6u111wWJYOc8fcdGMdcc5rMU+dqCwI1WSIvqNlqII68UvsOO3YWbbCTYdGd82KaWRQbJIN37bMzhyngLdeOwx6slLDqyZD0KHVBNndsGu+RRPsWrV3SSEfdhoNmWvLts+tZvM7e+PLTxzjeZdtfJfNxjNp1Awz21iHLdq7dY0K61ZLeMNhn3HMa0vXHfZzljlN5F5A0ZHIiIWhfv7G2hrP5nDunlBMcnLyPw4zohbx0OOHQk1nx0/mCcURera8+SpgLOoUqwQ+3Rc89+pqxC5Ap9Pt+8n4GzNjGH46skWiAAAAAElFTkSuQmCC",width:50,height:50,src:"/static/d52cc3e45670cb0e8e5951c1cc06c6e0/352e5/profile-pic.png",srcSet:"/static/d52cc3e45670cb0e8e5951c1cc06c6e0/352e5/profile-pic.png 1x,\n/static/d52cc3e45670cb0e8e5951c1cc06c6e0/aae31/profile-pic.png 1.5x,\n/static/d52cc3e45670cb0e8e5951c1cc06c6e0/47c2b/profile-pic.png 2x"}}},site:{siteMetadata:{author:"Mitchell Simoens",social:{twitter:"LikelyMitch"}}}}}},214:function(e,t,a){"use strict";a(29),a(30),a(13),a(93),a(137),a(207);var r=a(14);t.__esModule=!0,t.default=void 0;var i,n=r(a(67)),o=r(a(71)),s=r(a(133)),l=r(a(134)),d=r(a(0)),c=r(a(51)),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=v([].concat(t.fluid))),t.fixed&&(t.fixed=v([].concat(t.fixed))),t},f=function(e){var t=e.fluid,a=e.fixed;return(t&&t[0]||a&&a[0]).src},p=Object.create({}),g=function(e){var t=u(e),a=f(t);return p[a]||!1},m="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,h="undefined"!=typeof window,b=h&&window.IntersectionObserver,y=new WeakMap;function S(e){return e.map(function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},r&&d.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),d.default.createElement("source",{media:i,srcSet:a,sizes:n}))})}function v(e){var t=[],a=[];return e.forEach(function(e){return(e.media?t:a).push(e)}),t.concat(a)}function w(e){return e.map(function(e){var t=e.src,a=e.media,r=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:r})})}function E(e){return e.map(function(e){var t=e.src,a=e.media,r=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:r})})}function O(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var A=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){if(y.has(e.target)){var t=y.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),y.delete(e.target),t())}})},{rootMargin:"200px"})),i);return a&&(a.observe(e),y.set(e,t)),function(){a.unobserve(e),y.delete(e)}},L=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map(function(e){return(e.srcSetWebp?O(e,!0):"")+O(e)}).join("")+"<img "+d+o+s+a+r+t+n+i+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},M=function(e){var t=e.src,a=e.imageVariants,r=e.generateSources,i=e.spreadProps,n=d.default.createElement(x,(0,l.default)({src:t},i));return a.length>1?d.default.createElement("picture",null,r(a),n):n},x=d.default.forwardRef(function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,o=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,p=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable"]);return d.default.createElement("img",(0,l.default)({sizes:a,srcSet:r,src:i},p,{onLoad:o,onError:c,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))});x.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var I=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=h&&g(t),a.addNoScript=!(t.critical&&!t.fadeIn),a.useIOSupport=!m&&b&&!t.critical&&!a.seenBefore;var r=t.critical||h&&(m||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,o.default)((0,o.default)(a))),a.handleRef=a.handleRef.bind((0,o.default)((0,o.default)(a))),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:g(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=A(e,function(){var e=g(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},function(){return t.setState({imgLoaded:e,imgCached:!!t.imageRef.current.currentSrc})})}))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),a=f(t),p[a]=!0,this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,o=e.imgStyle,s=void 0===o?{}:o,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,g=e.fluid,m=e.fixed,h=e.backgroundColor,b=e.durationFadeIn,y=e.Tag,v=e.itemProp,O=e.loading,A=e.draggable,I=!1===this.state.fadeIn||this.state.imgLoaded,R=!0===this.state.fadeIn&&!this.state.imgCached,z=(0,l.default)({opacity:I?1:0,transition:R?"opacity "+b+"ms":"none"},s),j="boolean"==typeof h?"lightgray":h,C={transitionDelay:b+"ms"},V=(0,l.default)({opacity:this.state.imgLoaded?0:1},R&&C,s,f),k={title:t,alt:this.state.isVisible?"":a,style:V,className:p};if(g){var q=g,N=q[0];return d.default.createElement(y,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(N.srcSet)},d.default.createElement(y,{style:{width:"100%",paddingBottom:100/N.aspectRatio+"%"}}),j&&d.default.createElement(y,{title:t,style:(0,l.default)({backgroundColor:j,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},R&&C)}),N.base64&&d.default.createElement(M,{src:N.base64,spreadProps:k,imageVariants:q,generateSources:E}),N.tracedSVG&&d.default.createElement(M,{src:N.tracedSVG,spreadProps:k,imageVariants:q,generateSources:w}),this.state.isVisible&&d.default.createElement("picture",null,S(q),d.default.createElement(x,{alt:a,title:t,sizes:N.sizes,src:N.src,crossOrigin:this.props.crossOrigin,srcSet:N.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:O,draggable:A})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,l.default)({alt:a,title:t,loading:O},N,{imageVariants:q}))}}))}if(m){var W=m,G=W[0],T=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:G.width,height:G.height},n);return"inherit"===n.display&&delete T.display,d.default.createElement(y,{className:(r||"")+" gatsby-image-wrapper",style:T,ref:this.handleRef,key:"fixed-"+JSON.stringify(G.srcSet)},j&&d.default.createElement(y,{title:t,style:(0,l.default)({backgroundColor:j,width:G.width,opacity:this.state.imgLoaded?0:1,height:G.height},R&&C)}),G.base64&&d.default.createElement(M,{src:G.base64,spreadProps:k,imageVariants:W,generateSources:E}),G.tracedSVG&&d.default.createElement(M,{src:G.tracedSVG,spreadProps:k,imageVariants:W,generateSources:w}),this.state.isVisible&&d.default.createElement("picture",null,S(W),d.default.createElement(x,{alt:a,title:t,width:G.width,height:G.height,sizes:G.sizes,src:G.src,crossOrigin:this.props.crossOrigin,srcSet:G.srcSet,style:z,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v,loading:O,draggable:A})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:L((0,l.default)({alt:a,title:t,loading:O},G,{imageVariants:W}))}}))}return null},t}(d.default.Component);I.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var R=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),z=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string});I.propTypes={resolutions:R,sizes:z,fixed:c.default.oneOfType([R,c.default.arrayOf(R)]),fluid:c.default.oneOfType([z,c.default.arrayOf(z)]),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var j=I;t.default=j}}]);
//# sourceMappingURL=component---src-pages-index-js-afa369b9f2bf014cde58.js.map