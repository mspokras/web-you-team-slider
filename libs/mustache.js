/*! For license information please see mustache.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).Mustache=t()}(this,(function(){"use strict";var e=Object.prototype.toString,t=Array.isArray||function(t){return"[object Array]"===e.call(t)};function n(e){return"function"==typeof e}function r(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function i(e,t){return null!=e&&"object"==typeof e&&t in e}var o=RegExp.prototype.test,s=/\S/;var a={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},c=/\s*/,p=/\s+/,u=/\s*=/,l=/\s*\}/,h=/#|\^|\/|>|\{|&|=|!/;function f(e){this.string=e,this.tail=e,this.pos=0}function g(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function d(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}f.prototype.eos=function(){return""===this.tail},f.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var n=t[0];return this.tail=this.tail.substring(n.length),this.pos+=n.length,n},f.prototype.scanUntil=function(e){var t,n=this.tail.search(e);switch(n){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,n),this.tail=this.tail.substring(n)}return this.pos+=t.length,t},g.prototype.push=function(e){return new g(e,this)},g.prototype.lookup=function(e){var t,r,o,s=this.cache;if(s.hasOwnProperty(e))t=s[e];else{for(var a,c,p,u=this,l=!1;u;){if(e.indexOf(".")>0)for(a=u.view,c=e.split("."),p=0;null!=a&&p<c.length;)p===c.length-1&&(l=i(a,c[p])||(r=a,o=c[p],null!=r&&"object"!=typeof r&&r.hasOwnProperty&&r.hasOwnProperty(o))),a=a[c[p++]];else a=u.view[e],l=i(u.view,e);if(l){t=a;break}u=u.parent}s[e]=t}return n(t)&&(t=t.call(this.view)),t},d.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},d.prototype.parse=function(e,n){var i=this.templateCache,a=e+":"+(n||v.tags).join(":"),g=void 0!==i,d=g?i.get(a):void 0;return null==d&&(d=function(e,n){if(!e)return[];var i,a,g,d,y=!1,w=[],m=[],b=[],C=!1,k=!1,x="",E=0;function T(){if(C&&!k)for(;b.length;)delete m[b.pop()];else b=[];C=!1,k=!1}function j(e){if("string"==typeof e&&(e=e.split(p,2)),!t(e)||2!==e.length)throw new Error("Invalid tags: "+e);i=new RegExp(r(e[0])+"\\s*"),a=new RegExp("\\s*"+r(e[1])),g=new RegExp("\\s*"+r("}"+e[1]))}j(n||v.tags);for(var U,S,P,V,O,A,I=new f(e);!I.eos();){if(U=I.pos,P=I.scanUntil(i))for(var R=0,_=P.length;R<_;++R)d=V=P.charAt(R),function(e,t){return o.call(e,t)}(s,d)?(k=!0,y=!0,x+=" "):(b.push(m.length),x+=V),m.push(["text",V,U,U+1]),U+=1,"\n"===V&&(T(),x="",E=0,y=!1);if(!I.scan(i))break;if(C=!0,S=I.scan(h)||"name",I.scan(c),"="===S?(P=I.scanUntil(u),I.scan(u),I.scanUntil(a)):"{"===S?(P=I.scanUntil(g),I.scan(l),I.scanUntil(a),S="&"):P=I.scanUntil(a),!I.scan(a))throw new Error("Unclosed tag at "+I.pos);if(O=">"==S?[S,P,U,I.pos,x,E,y]:[S,P,U,I.pos],E++,m.push(O),"#"===S||"^"===S)w.push(O);else if("/"===S){if(!(A=w.pop()))throw new Error('Unopened section "'+P+'" at '+U);if(A[1]!==P)throw new Error('Unclosed section "'+A[1]+'" at '+U)}else"name"===S||"{"===S||"&"===S?k=!0:"="===S&&j(P)}if(T(),A=w.pop())throw new Error('Unclosed section "'+A[1]+'" at '+I.pos);return function(e){for(var t,n=[],r=n,i=[],o=0,s=e.length;o<s;++o)switch((t=e[o])[0]){case"#":case"^":r.push(t),i.push(t),r=t[4]=[];break;case"/":i.pop()[5]=t[2],r=i.length>0?i[i.length-1][4]:n;break;default:r.push(t)}return n}(function(e){for(var t,n,r=[],i=0,o=e.length;i<o;++i)(t=e[i])&&("text"===t[0]&&n&&"text"===n[0]?(n[1]+=t[1],n[3]=t[3]):(r.push(t),n=t));return r}(m))}(e,n),g&&i.set(a,d)),d},d.prototype.render=function(e,t,n,r){var i=this.getConfigTags(r),o=this.parse(e,i),s=t instanceof g?t:new g(t,void 0);return this.renderTokens(o,s,n,e,r)},d.prototype.renderTokens=function(e,t,n,r,i){for(var o,s,a,c="",p=0,u=e.length;p<u;++p)a=void 0,"#"===(s=(o=e[p])[0])?a=this.renderSection(o,t,n,r,i):"^"===s?a=this.renderInverted(o,t,n,r,i):">"===s?a=this.renderPartial(o,t,n,i):"&"===s?a=this.unescapedValue(o,t):"name"===s?a=this.escapedValue(o,t,i):"text"===s&&(a=this.rawValue(o)),void 0!==a&&(c+=a);return c},d.prototype.renderSection=function(e,r,i,o,s){var a=this,c="",p=r.lookup(e[1]);if(p){if(t(p))for(var u=0,l=p.length;u<l;++u)c+=this.renderTokens(e[4],r.push(p[u]),i,o,s);else if("object"==typeof p||"string"==typeof p||"number"==typeof p)c+=this.renderTokens(e[4],r.push(p),i,o,s);else if(n(p)){if("string"!=typeof o)throw new Error("Cannot use higher-order sections without the original template");null!=(p=p.call(r.view,o.slice(e[3],e[5]),(function(e){return a.render(e,r,i,s)})))&&(c+=p)}else c+=this.renderTokens(e[4],r,i,o,s);return c}},d.prototype.renderInverted=function(e,n,r,i,o){var s=n.lookup(e[1]);if(!s||t(s)&&0===s.length)return this.renderTokens(e[4],n,r,i,o)},d.prototype.indentPartial=function(e,t,n){for(var r=t.replace(/[^ \t]/g,""),i=e.split("\n"),o=0;o<i.length;o++)i[o].length&&(o>0||!n)&&(i[o]=r+i[o]);return i.join("\n")},d.prototype.renderPartial=function(e,t,r,i){if(r){var o=this.getConfigTags(i),s=n(r)?r(e[1]):r[e[1]];if(null!=s){var a=e[6],c=e[5],p=e[4],u=s;0==c&&p&&(u=this.indentPartial(s,p,a));var l=this.parse(u,o);return this.renderTokens(l,t,r,u,i)}}},d.prototype.unescapedValue=function(e,t){var n=t.lookup(e[1]);if(null!=n)return n},d.prototype.escapedValue=function(e,t,n){var r=this.getConfigEscape(n)||v.escape,i=t.lookup(e[1]);if(null!=i)return"number"==typeof i&&r===v.escape?String(i):r(i)},d.prototype.rawValue=function(e){return e[1]},d.prototype.getConfigTags=function(e){return t(e)?e:e&&"object"==typeof e?e.tags:void 0},d.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!t(e)?e.escape:void 0};var v={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){y.templateCache=e},get templateCache(){return y.templateCache}},y=new d;return v.clearCache=function(){return y.clearCache()},v.parse=function(e,t){return y.parse(e,t)},v.render=function(e,n,r,i){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(t(o=e)?"array":typeof o)+'" was given as the first argument for mustache#render(template, view, partials)');var o;return y.render(e,n,r,i)},v.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return a[e]}))},v.Scanner=f,v.Context=g,v.Writer=d,v}));