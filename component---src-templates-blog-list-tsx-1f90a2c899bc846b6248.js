(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"68np":function(e,t,n){},K392:function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"blogListQuery",(function(){return i}));var a=n("Wbzz"),l=n("IgZc"),r=n("9Dj+"),o=n("H8eV"),s=n("rB5o");n("68np");t.default=function(t){var n=t.data.allMarkdownRemark.edges,i=t.location,c=t.pageContext,m=c.currentPage,d=c.numPages,u=c.title;return e.createElement(r.a,{location:i,title:u},e.createElement(o.a,{title:1===m?void 0:"Posts Page "+m}),e.createElement(l.a,null),n.map((function(t){var n=t.node,l=n.frontmatter.title||n.fields.slug;return e.createElement("div",{key:n.fields.slug},e.createElement("h3",{style:{marginBottom:Object(s.a)(1/4)}},e.createElement(a.Link,{style:{boxShadow:"none"},to:n.fields.slug},l)),e.createElement("small",{style:{display:"flex"}},e.createElement("span",null,n.frontmatter.date),e.createElement("span",{style:{flex:"1"}}),e.createElement("span",null,n.fields.readingTime.text)),e.createElement("p",{dangerouslySetInnerHTML:{__html:n.frontmatter.description||n.excerpt}}))})),e.createElement("div",{className:"blog-list-navigation"},m>1&&e.createElement(a.Link,{style:{boxShadow:"none"},to:2===m?"":"/page/"+(m-1)},"← Newer Posts"),e.createElement("div",{className:"blog-list-navigation-spacer"}),m<d&&e.createElement(a.Link,{style:{boxShadow:"none"},to:"/page/"+(m+1)},"Older Posts →")))};var i="3782152029"}.call(this,n("q1tI"))}}]);
//# sourceMappingURL=component---src-templates-blog-list-tsx-1f90a2c899bc846b6248.js.map