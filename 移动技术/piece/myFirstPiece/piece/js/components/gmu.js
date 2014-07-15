/*!Extend touch.js*/
(function(i){var g={},b,k,h,e=750,a;function c(m){return"tagName" in m?m:m.parentNode}function j(n,m,p,o){var r=Math.abs(n-m),q=Math.abs(p-o);return r>=q?(n-m>0?"Left":"Right"):(p-o>0?"Up":"Down")}function l(){a=null;if(g.last){g.el.trigger("longTap");g={}}}function d(){if(a){clearTimeout(a)}a=null}function f(){if(b){clearTimeout(b)}if(k){clearTimeout(k)}if(h){clearTimeout(h)}if(a){clearTimeout(a)}b=k=h=a=null;g={}}i(document).ready(function(){var m,n;i(document.body).bind("touchstart",function(o){m=Date.now();n=m-(g.last||m);g.el=i(c(o.touches[0].target));b&&clearTimeout(b);g.x1=o.touches[0].pageX;g.y1=o.touches[0].pageY;if(n>0&&n<=250){g.isDoubleTap=true}g.last=m;a=setTimeout(l,e)}).bind("touchmove",function(o){d();g.x2=o.touches[0].pageX;g.y2=o.touches[0].pageY;if(Math.abs(g.x1-g.x2)>10){o.preventDefault()}}).bind("touchend",function(o){d();if((g.x2&&Math.abs(g.x1-g.x2)>30)||(g.y2&&Math.abs(g.y1-g.y2)>30)){h=setTimeout(function(){g.el.trigger("swipe");g.el.trigger("swipe"+(j(g.x1,g.x2,g.y1,g.y2)));g={}},0)}else{if("last" in g){k=setTimeout(function(){var p=i.Event("tap");p.cancelTouch=f;g.el.trigger(p);if(g.isDoubleTap){g.el.trigger("doubleTap");g={}}else{b=setTimeout(function(){b=null;g.el.trigger("singleTap");g={}},250)}},0)}}}).bind("touchcancel",f);i(window).bind("scroll",f)});["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(n){i.fn[n]=function(m){return this.bind(n,m)}})})(Zepto);
/*!Extend zepto.extend.js*/
(function(a){a.extend(a,{contains:function(b,c){return b.compareDocumentPosition?!!(b.compareDocumentPosition(c)&16):b!==c&&b.contains(c)}})})(Zepto);(function(a,c){a.extend(a,{toString:function(d){return Object.prototype.toString.call(d)},slice:function(e,d){return Array.prototype.slice.call(e,d||0)},later:function(f,d,h,e,g){return window["set"+(h?"Interval":"Timeout")](function(){f.apply(e,g)},d||0)},parseTpl:function(g,f){var d="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+g.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/<%=([\s\S]+?)%>/g,function(h,i){return"',"+i.replace(/\\'/g,"'")+",'"}).replace(/<%([\s\S]+?)%>/g,function(h,i){return"');"+i.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ")+"__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";var e=new Function("obj",d);return f?e(f):e},throttle:function(d,e,i){var g=0,f;if(typeof e!=="function"){i=e;e=d;d=250}function h(){var m=this,n=Date.now()-g,l=arguments;function k(){g=Date.now();e.apply(m,l)}function j(){f=c}if(i&&!f){k()}f&&clearTimeout(f);if(i===c&&n>d){k()}else{f=setTimeout(i?j:k,i===c?d-n:d)}}h._zid=e._zid=e._zid||a.proxy(e)._zid;return h},debounce:function(d,f,e){return f===c?a.throttle(250,d,false):a.throttle(d,f,e===c?false:e!==false)}});a.each("String Boolean RegExp Number Date Object Null Undefined".split(" "),function(e,d){var f;if("is"+d in a){return}switch(d){case"Null":f=function(g){return g===null};break;case"Undefined":f=function(g){return g===c};break;default:f=function(g){return new RegExp(d+"]","i").test(b(g))}}a["is"+d]=f});var b=a.toString})(Zepto);(function(d,g){var c=navigator.userAgent,a=navigator.appVersion,b=d.browser;d.extend(b,{qq:/qq/i.test(c),uc:/UC/i.test(c)||/UC/i.test(a)});b.uc=b.uc||!b.qq&&!b.chrome&&!b.firefox&&!/safari/i.test(c);try{b.version=b.uc?a.match(/UC(?:Browser)?\/([\d.]+)/)[1]:b.qq?c.match(/MQQBrowser\/([\d.]+)/)[1]:b.version}catch(f){}d.support=d.extend(d.support||{},{orientation:!(b.uc||(parseFloat(d.os.version)<5&&(b.qq||b.chrome)))&&!(d.os.android&&parseFloat(d.os.version)>3)&&"orientation" in window&&"onorientationchange" in window,touch:"ontouchend" in document,cssTransitions:"WebKitTransitionEvent" in window,has3d:"WebKitCSSMatrix" in window&&"m11" in new WebKitCSSMatrix()})})(Zepto);(function(b){b.matchMedia=(function(){var g=0,e="gmu-media-detect",d=b.fx.transitionEnd,h=b.fx.cssPrefix,f=b("<style></style>").append("."+e+"{"+h+"transition: width 0.001ms; width: 0; position: absolute; top: -10000px;}\n").appendTo("head");return function(k){var m=e+g++,l=b('<div class="'+e+'" id="'+m+'"></div>').appendTo("body"),j=[],i;f.append("@media "+k+" { #"+m+" { width: 1px; } }\n");if("matchMedia" in window){return window.matchMedia(k)}l.on(d,function(){i.matches=l.width()===1;b.each(j,function(n,o){b.isFunction(o)&&o.call(i,i)})});i={matches:l.width()===1,media:k,addListener:function(n){j.push(n);return this},removeListener:function(o){var n=j.indexOf(o);~n&&j.splice(n,1);return this}};return i}}());b(function(){var d=function(e){b(window).trigger("ortchange")};b.mediaQuery={ortchange:"screen and (width: "+window.innerWidth+"px)"};b.matchMedia(b.mediaQuery.ortchange).addListener(d)});function a(){b(window).on("scroll",b.debounce(80,function(){b(document).trigger("scrollStop")},false))}function c(){b(window).off("scroll");a()}a();b(window).on("pageshow",function(d){if(d.persisted){b(document).off("touchstart",c).one("touchstart",c)}})})(Zepto);
/*!Extend zepto.highlight.js*/
(function(e){var d,a=false,f,c,b=function(){clearTimeout(f);if(d&&(c=d.attr("highlight-cls"))){d.removeClass(c).attr("highlight-cls","");d=null}};e.extend(e.fn,{highlight:function(g){a=a||!!e(document).on("touchend.highlight touchmove.highlight touchcancel.highlight",b);b();return this.each(function(){var h=e(this);h.css("-webkit-tap-highlight-color","rgba(255,255,255,0)").off("touchstart.highlight");g&&h.on("touchstart.highlight",function(){f=e.later(function(){d=h.attr("highlight-cls",g).addClass(g)},100)})})}})})(Zepto);

/*!Extend zepto.iscroll.js*/
/*
 * iScroll v4.2.2 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
//(function(h,E){var u=Math,o=[],l=E.createElement("div").style,z=(function(){var H="webkitT,MozT,msT,OT,t".split(","),G,F=0,m=H.length;for(;F<m;F++){G=H[F]+"ransform";if(G in l){return H[F].substr(0,H[F].length-1)}}return false})(),D=z?"-"+z.toLowerCase()+"-":"",k=s("transform"),x=s("transitionProperty"),j=s("transitionDuration"),n=s("transformOrigin"),B=s("transitionTimingFunction"),e=s("transitionDelay"),A=(/android/gi).test(navigator.appVersion),r=(/hp-tablet/gi).test(navigator.appVersion),i=s("perspective") in l,y="ontouchstart" in h&&!r,d=!!z,f=s("transition") in l,g="onorientationchange" in h?"orientationchange":"resize",b=y?"touchstart":"mousedown",t=y?"touchmove":"mousemove",c=y?"touchend":"mouseup",w=y?"touchcancel":"mouseup",a=(function(){if(z===false){return false}var m={"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"};return m[z]})(),q=(function(){return h.requestAnimationFrame||h.webkitRequestAnimationFrame||h.mozRequestAnimationFrame||h.oRequestAnimationFrame||h.msRequestAnimationFrame||function(m){return setTimeout(m,1)}})(),p=(function(){return h.cancelRequestAnimationFrame||h.webkitCancelAnimationFrame||h.webkitCancelRequestAnimationFrame||h.mozCancelRequestAnimationFrame||h.oCancelRequestAnimationFrame||h.msCancelRequestAnimationFrame||clearTimeout})(),C=i?" translateZ(0)":"",v=function(G,m){var H=this,F;H.wrapper=typeof G=="object"?G:E.getElementById(G);H.wrapper.style.overflow="hidden";H.scroller=H.wrapper.children[0];H.translateZ=C;H.options={hScroll:true,vScroll:true,x:0,y:0,bounce:true,bounceLock:false,momentum:true,lockDirection:true,useTransform:true,useTransition:false,topOffset:0,checkDOMChanges:false,handleClick:true,onRefresh:null,onBeforeScrollStart:function(I){I.preventDefault()},onScrollStart:null,onBeforeScrollMove:null,onScrollMove:null,onBeforeScrollEnd:null,onScrollEnd:null,onTouchEnd:null,onDestroy:null};for(F in m){H.options[F]=m[F]}H.x=H.options.x;H.y=H.options.y;H.options.useTransform=d&&H.options.useTransform;H.options.useTransition=f&&H.options.useTransition;H.scroller.style[x]=H.options.useTransform?D+"transform":"top left";H.scroller.style[j]="0";H.scroller.style[n]="0 0";if(H.options.useTransition){H.scroller.style[B]="cubic-bezier(0.33,0.66,0.66,1)"}if(H.options.useTransform){H.scroller.style[k]="translate("+H.x+"px,"+H.y+"px)"+C}else{H.scroller.style.cssText+=";position:absolute;top:"+H.y+"px;left:"+H.x+"px"}H.refresh();H._bind(g,h);H._bind(b);if(H.options.checkDOMChanges){H.checkDOMTime=setInterval(function(){H._checkDOMChanges()},500)}};v.prototype={enabled:true,x:0,y:0,steps:[],scale:1,currPageX:0,currPageY:0,pagesX:[],pagesY:[],aniTime:null,isStopScrollAction:false,handleEvent:function(F){var m=this;switch(F.type){case b:if(!y&&F.button!==0){return}m._start(F);break;case t:m._move(F);break;case c:case w:m._end(F);break;case g:m._resize();break;case a:m._transitionEnd(F);break}},_checkDOMChanges:function(){if(this.moved||this.animating||(this.scrollerW==this.scroller.offsetWidth*this.scale&&this.scrollerH==this.scroller.offsetHeight*this.scale)){return}this.refresh()},_resize:function(){var m=this;setTimeout(function(){m.refresh()},A?200:0)},_pos:function(m,F){m=this.hScroll?m:0;F=this.vScroll?F:0;if(this.options.useTransform){this.scroller.style[k]="translate("+m+"px,"+F+"px) scale("+this.scale+")"+C}else{m=u.round(m);F=u.round(F);this.scroller.style.left=m+"px";this.scroller.style.top=F+"px"}this.x=m;this.y=F},_start:function(K){var J=this,F=y?K.touches[0]:K,G,m,L,I,H;if(!J.enabled){return}if(J.options.onBeforeScrollStart){J.options.onBeforeScrollStart.call(J,K)}if(J.options.useTransition){J._transitionTime(0)}J.moved=false;J.animating=false;J.distX=0;J.distY=0;J.absDistX=0;J.absDistY=0;J.dirX=0;J.dirY=0;J.isStopScrollAction=false;if(J.options.momentum){if(J.options.useTransform){G=getComputedStyle(J.scroller,null)[k].replace(/[^0-9\-.,]/g,"").split(",");m=+G[4];L=+G[5]}else{m=+getComputedStyle(J.scroller,null).left.replace(/[^0-9-]/g,"");L=+getComputedStyle(J.scroller,null).top.replace(/[^0-9-]/g,"")}if(m!=J.x||L!=J.y){J.isStopScrollAction=true;if(J.options.useTransition){J._unbind(a)}else{p(J.aniTime)}J.steps=[];J._pos(m,L);if(J.options.onScrollEnd){J.options.onScrollEnd.call(J)}}}J.startX=J.x;J.startY=J.y;J.pointX=F.pageX;J.pointY=F.pageY;J.startTime=K.timeStamp||Date.now();if(J.options.onScrollStart){J.options.onScrollStart.call(J,K)}J._bind(t,h);J._bind(c,h);J._bind(w,h)},_move:function(K){var H=this,F=y?K.touches[0]:K,G=F.pageX-H.pointX,m=F.pageY-H.pointY,L=H.x+G,J=H.y+m,I=K.timeStamp||Date.now();if(H.options.onBeforeScrollMove){H.options.onBeforeScrollMove.call(H,K)}H.pointX=F.pageX;H.pointY=F.pageY;if(L>0||L<H.maxScrollX){L=H.options.bounce?H.x+(G/2):L>=0||H.maxScrollX>=0?0:H.maxScrollX}if(J>H.minScrollY||J<H.maxScrollY){J=H.options.bounce?H.y+(m/2):J>=H.minScrollY||H.maxScrollY>=0?H.minScrollY:H.maxScrollY}H.distX+=G;H.distY+=m;H.absDistX=u.abs(H.distX);H.absDistY=u.abs(H.distY);if(H.absDistX<6&&H.absDistY<6){return}if(H.options.lockDirection){if(H.absDistX>H.absDistY+5){J=H.y;m=0}else{if(H.absDistY>H.absDistX+5){L=H.x;G=0}}}H.moved=true;H._beforePos?H._beforePos(J,m)&&H._pos(L,J):H._pos(L,J);H.dirX=G>0?-1:G<0?1:0;H.dirY=m>0?-1:m<0?1:0;if(I-H.startTime>300){H.startTime=I;H.startX=H.x;H.startY=H.y}if(H.options.onScrollMove){H.options.onScrollMove.call(H,K)}},_end:function(K){if(y&&K.touches.length!==0){return}var I=this,O=y?K.changedTouches[0]:K,L,N,G={dist:0,time:0},m={dist:0,time:0},H=(K.timeStamp||Date.now())-I.startTime,M=I.x,J=I.y,F;I._unbind(t,h);I._unbind(c,h);I._unbind(w,h);if(I.options.onBeforeScrollEnd){I.options.onBeforeScrollEnd.call(I,K)}if(!I.moved){if(y&&this.options.handleClick&&!I.isStopScrollAction){I.doubleTapTimer=setTimeout(function(){I.doubleTapTimer=null;L=O.target;while(L.nodeType!=1){L=L.parentNode}if(L.tagName!="SELECT"&&L.tagName!="INPUT"&&L.tagName!="TEXTAREA"){N=E.createEvent("MouseEvents");N.initMouseEvent("click",true,true,K.view,1,O.screenX,O.screenY,O.clientX,O.clientY,K.ctrlKey,K.altKey,K.shiftKey,K.metaKey,0,null);N._fake=true;L.dispatchEvent(N)}},0)}I._resetPos(400);if(I.options.onTouchEnd){I.options.onTouchEnd.call(I,K)}return}if(H<300&&I.options.momentum){G=M?I._momentum(M-I.startX,H,-I.x,I.scrollerW-I.wrapperW+I.x,I.options.bounce?I.wrapperW:0):G;m=J?I._momentum(J-I.startY,H,-I.y,(I.maxScrollY<0?I.scrollerH-I.wrapperH+I.y-I.minScrollY:0),I.options.bounce?I.wrapperH:0):m;M=I.x+G.dist;J=I.y+m.dist;if((I.x>0&&M>0)||(I.x<I.maxScrollX&&M<I.maxScrollX)){G={dist:0,time:0}}if((I.y>I.minScrollY&&J>I.minScrollY)||(I.y<I.maxScrollY&&J<I.maxScrollY)){m={dist:0,time:0}}}if(G.dist||m.dist){F=u.max(u.max(G.time,m.time),10);I.scrollTo(u.round(M),u.round(J),F);if(I.options.onTouchEnd){I.options.onTouchEnd.call(I,K)}return}I._resetPos(200);if(I.options.onTouchEnd){I.options.onTouchEnd.call(I,K)}},_resetPos:function(G){var m=this,H=m.x>=0?0:m.x<m.maxScrollX?m.maxScrollX:m.x,F=m.y>=m.minScrollY||m.maxScrollY>0?m.minScrollY:m.y<m.maxScrollY?m.maxScrollY:m.y;if(H==m.x&&F==m.y){if(m.moved){m.moved=false;if(m.options.onScrollEnd){m.options.onScrollEnd.call(m)}if(m._afterPos){m._afterPos()}}return}m.scrollTo(H,F,G||0)},_transitionEnd:function(F){var m=this;if(F.target!=m.scroller){return}m._unbind(a);m._startAni()},_startAni:function(){var K=this,F=K.x,m=K.y,I=Date.now(),J,H,G;if(K.animating){return}if(!K.steps.length){K._resetPos(400);return}J=K.steps.shift();if(J.x==F&&J.y==m){J.time=0}K.animating=true;K.moved=true;if(K.options.useTransition){K._transitionTime(J.time);K._pos(J.x,J.y);K.animating=false;if(J.time){K._bind(a)}else{K._resetPos(0)}return}G=function(){var L=Date.now(),N,M;if(L>=I+J.time){K._pos(J.x,J.y);K.animating=false;if(K.options.onAnimationEnd){K.options.onAnimationEnd.call(K)}K._startAni();return}L=(L-I)/J.time-1;H=u.sqrt(1-L*L);N=(J.x-F)*H+F;M=(J.y-m)*H+m;K._pos(N,M);if(K.animating){K.aniTime=q(G)}};G()},_transitionTime:function(m){m+="ms";this.scroller.style[j]=m},_momentum:function(L,F,J,m,N){var K=0.0006,G=u.abs(L)*(this.options.speedScale||1)/F,H=(G*G)/(2*K),M=0,I=0;if(L>0&&H>J){I=N/(6/(H/G*K));J=J+I;G=G*J/H;H=J}else{if(L<0&&H>m){I=N/(6/(H/G*K));m=m+I;G=G*m/H;H=m}}H=H*(L<0?-1:1);M=G/K;return{dist:H,time:u.round(M)}},_offset:function(m){var G=-m.offsetLeft,F=-m.offsetTop;while(m=m.offsetParent){G-=m.offsetLeft;F-=m.offsetTop}if(m!=this.wrapper){G*=this.scale;F*=this.scale}return{left:G,top:F}},_bind:function(G,F,m){o.concat([F||this.scroller,G,this]);(F||this.scroller).addEventListener(G,this,!!m)},_unbind:function(G,F,m){(F||this.scroller).removeEventListener(G,this,!!m)},destroy:function(){var G=this;G.scroller.style[k]="";G._unbind(g,h);G._unbind(b);G._unbind(t,h);G._unbind(c,h);G._unbind(w,h);if(G.options.useTransition){G._unbind(a)}if(G.options.checkDOMChanges){clearInterval(G.checkDOMTime)}if(G.options.onDestroy){G.options.onDestroy.call(G)}for(var F=0,m=o.length;F<m;){o[F].removeEventListener(o[F+1],o[F+2]);o[F]=null;F=F+3}o=[];var H=E.createElement("div");H.appendChild(this.wrapper);H.innerHTML="";G.wrapper=G.scroller=H=null},refresh:function(){var m=this,F;m.wrapperW=m.wrapper.clientWidth||1;m.wrapperH=m.wrapper.clientHeight||1;m.minScrollY=-m.options.topOffset||0;m.scrollerW=u.round(m.scroller.offsetWidth*m.scale);m.scrollerH=u.round((m.scroller.offsetHeight+m.minScrollY)*m.scale);m.maxScrollX=m.wrapperW-m.scrollerW;m.maxScrollY=m.wrapperH-m.scrollerH+m.minScrollY;m.dirX=0;m.dirY=0;if(m.options.onRefresh){m.options.onRefresh.call(m)}m.hScroll=m.options.hScroll&&m.maxScrollX<0;m.vScroll=m.options.vScroll&&(!m.options.bounceLock&&!m.hScroll||m.scrollerH>m.wrapperH);F=m._offset(m.wrapper);m.wrapperOffsetLeft=-F.left;m.wrapperOffsetTop=-F.top;m.scroller.style[j]="0";m._resetPos(400)},scrollTo:function(m,L,K,J){var I=this,H=m,G,F;I.stop();if(!H.length){H=[{x:m,y:L,time:K,relative:J}]}for(G=0,F=H.length;G<F;G++){if(H[G].relative){H[G].x=I.x-H[G].x;H[G].y=I.y-H[G].y}I.steps.push({x:H[G].x,y:H[G].y,time:H[G].time||0})}I._startAni()},scrollToElement:function(m,G){var F=this,H;m=m.nodeType?m:F.scroller.querySelector(m);if(!m){return}H=F._offset(m);H.left+=F.wrapperOffsetLeft;H.top+=F.wrapperOffsetTop;H.left=H.left>0?0:H.left<F.maxScrollX?F.maxScrollX:H.left;H.top=H.top>F.minScrollY?F.minScrollY:H.top<F.maxScrollY?F.maxScrollY:H.top;G=G===undefined?u.max(u.abs(H.left)*2,u.abs(H.top)*2):G;F.scrollTo(H.left,H.top,G)},scrollToPage:function(G,F,I){var H=this,m,J;I=I===undefined?400:I;if(H.options.onScrollStart){H.options.onScrollStart.call(H)}m=-H.wrapperW*G;J=-H.wrapperH*F;if(m<H.maxScrollX){m=H.maxScrollX}if(J<H.maxScrollY){J=H.maxScrollY}H.scrollTo(m,J,I)},disable:function(){this.stop();this._resetPos(0);this.enabled=false;this._unbind(t,h);this._unbind(c,h);this._unbind(w,h)},enable:function(){this.enabled=true},stop:function(){if(this.options.useTransition){this._unbind(a)}else{p(this.aniTime)}this.steps=[];this.moved=false;this.animating=false},isReady:function(){return !this.moved&&!this.animating}};function s(m){if(z===""){return m}m=m.charAt(0).toUpperCase()+m.substr(1);return z+m}l=null;if(typeof exports!=="undefined"){exports.iScroll=v}else{h.iScroll=v}(function(H){if(!H){return}var G=v,I=0,F={};function m(K,J){var L="iscroll"+I++;K.data("_iscroll_",L);return F[L]=new G(K[0],J)}h.iScroll=function(K,J){return m(H(typeof K=="string"?"#"+K:K),J)};H.fn.iScroll=function(K){var J=[];this.each(function(N,O){if(typeof K=="string"){var M=F[H(O).data("_iscroll_")],P;if(M&&(P=M[K])){var L=H.isFunction(P)?P.apply(M,Array.prototype.slice.call(arguments,1)):P;if(L!==M&&L!==undefined){J.push(L)}}}else{if(!H(O).data("_iscroll_")){m(H(O),K)}}});return J.length?J:this}})(h.Zepto||null)})(window,document);
/*!Extend zepto.ui.js*/
(function(f,c){var b=1,e=function(){},j="<%=name%>-<%=id%>",h=(function(){var n={},o=0,m="GMUWidget"+(+new Date());return function(s,r,t){var p=s[m]||(s[m]=++o),q=n[p]||(n[p]={});!f.isUndefined(t)&&(q[r]=t);f.isNull(t)&&delete q[r];return q[r]}})();f.ui=f.ui||{version:"2.0.5",guid:g,define:function(n,p,o){if(o){p.inherit=o}var m=f.ui[n]=d(function(r,q){var s=k(m.prototype,{_id:f.parseTpl(j,{name:n,id:g()})});s._createWidget.call(s,r,q,m.plugins);return s},p);return i(n,m)},isWidget:function(n,m){return n instanceof (m===c?l:f.ui[m]||e)}};function g(){return b++}function k(m,n){var o={};Object.create?o=Object.create(m):o.__proto__=m;return f.extend(o,n||{})}function d(m,n){if(n){a(m,n);f.extend(m.prototype,n)}return f.extend(m,{plugins:[],register:function(o){if(f.isObject(o)){f.extend(this.prototype,o);return}this.plugins.push(o)}})}function a(m,p){var n=p.inherit||l,o=n.prototype,q;q=m.prototype=k(o,{$factory:m,$super:function(r){var s=o[r];return f.isFunction(s)?s.apply(this,f.slice(arguments,1)):s}});q._data=f.extend({},o._data,p._data);delete p._data;return m}function i(m){f.fn[m]=function(p){var o,q,n=f.slice(arguments,1);f.each(this,function(r,s){q=h(s,m)||f.ui[m](s,f.extend(f.isPlainObject(p)?p:{},{setup:true}));if(f.isString(p)){if(!f.isFunction(q[p])&&p!=="this"){throw new Error(m+"\u7ec4\u4ef6\u6ca1\u6709\u6b64\u65b9\u6cd5")}o=f.isFunction(q[p])?q[p].apply(q,n):c}if(o!==c&&o!==q||p==="this"&&(o=q)){return false}o=c});return o!==c?o:this}}var l=function(){};f.extend(l.prototype,{_data:{status:true},data:function(m,o){var n=this._data;if(f.isObject(m)){return f.extend(n,m)}else{return !f.isUndefined(o)?n[m]=o:n[m]}},_createWidget:function(o,q,m){if(f.isObject(o)){q=o||{};o=c}var r=f.extend({},this._data,q);f.extend(this,{_el:o?f(o):c,_data:r});var p=this;f.each(m,function(u,v){var s=v.apply(p);if(s&&f.isPlainObject(s)){var t=p._data.disablePlugin;if(!t||f.isString(t)&&!~t.indexOf(s.pluginName)){delete s.pluginName;f.each(s,function(w,y){var x;if((x=p[w])&&f.isFunction(y)){p[w]=function(){p[w+"Org"]=x;return y.apply(p,arguments)}}else{p[w]=y}})}}});if(r.setup){this._setup(o&&o.getAttribute("data-mode"))}else{this._create()}this._init();var p=this,n=this.trigger("init").root();n.on("tap",function(s){(s.bubblesList||(s.bubblesList=[])).push(p)});h(n[0],p._id.split("-")[0],p)},_create:function(){},_setup:function(m){},root:function(m){return this._el=m||this._el},id:function(m){return this._id=m||this._id},destroy:function(){var n=this,m;m=this.trigger("destroy").off().root();m.find("*").off();h(m[0],n._id.split("-")[0],null);m.off().remove();this.__proto__=null;f.each(this,function(o){delete n[o]})},on:function(m,n){this.root().on(m,f.proxy(n,this));return this},off:function(m,n){this.root().off(m,n);return this},trigger:function(n,o){n=f.isString(n)?f.Event(n):n;var p=this.data(n.type),m;if(p&&f.isFunction(p)){n.data=o;m=p.apply(this,[n].concat(o));if(m===false||n.defaultPrevented){return this}}this.root().trigger(n,o);return this}})})(Zepto);
/*!Widget slider.js*/
(function(a,b){a.ui.define("slider",{_data:{viewNum:1,imgInit:2,itemRender:null,imgZoom:false,loop:false,stopPropagation:false,springBackDis:15,autoPlay:true,autoPlayTime:4000,animationTime:400,showArr:true,showDot:true,slide:null,slideend:null,index:0,_stepLength:1,_direction:1},_create:function(){var g=this,e=0,d,c=[],f=g.data("content");g._initConfig();(g.root()||g.root(a("<div></div>"))).addClass("ui-slider").appendTo(g.data("container")||(g.root().parent().length?"":document.body)).html('<div class="ui-slider-wheel"><div class="ui-slider-group">'+(function(){if(g.data("itemRender")){var h=g.data("itemRender");while(d=h.call(g,e++)){c.push('<div class="ui-slider-item">'+d+"</div>")}}else{while(d=f[e++]){c.push('<div class="ui-slider-item"><a href="'+d.href+'"><img lazyload="'+d.pic+'"/></a>'+(d.title?"<p>"+d.title+"</p>":"")+"</div>")}}c.push(g.data("loop")?'</div><div class="ui-slider-group">'+c.join("")+"</div></div>":"</div></div>");return c.join("")}()));g._addDots()},_setup:function(g){var e=this,c=e.root().addClass("ui-slider");e._initConfig();if(!g){var d=c.children(),f=a('<div class="ui-slider-group"></div>').append(d.addClass("ui-slider-item"));c.empty().append(a('<div class="ui-slider-wheel"></div>').append(f).append(e.data("loop")?f.clone():""));e._addDots()}else{e.data("loop")&&a(".ui-slider-wheel",c).append(a(".ui-slider-group",c).clone())}},_init:function(){var f=this,d=f.data("index"),c=f.root(),e=a.proxy(f._eventHandler,f);f._setWidth();a(f.data("wheel")).on("touchstart touchmove touchend touchcancel webkitTransitionEnd",e);a(window).on("ortchange",e);a(".ui-slider-pre",c).on("tap",function(){f.pre()});a(".ui-slider-next",c).on("tap",function(){f.next()});f.on("destroy",function(){clearTimeout(f.data("play"));a(window).off("ortchange",e)});f.data("autoPlay")&&f._setTimeout()},_initConfig:function(){var c=this._data;if(c.viewNum>1){c.loop=false;c.showDot=false;c.imgInit=c.viewNum+1}},_addDots:function(){var f=this,c=f.root(),e=a(".ui-slider-item",c).length/(f.data("loop")?2:1),d=[];if(f.data("showDot")){d.push('<p class="ui-slider-dots">');while(e--){d.push("<b></b>")}d.push("</p>")}f.data("showArr")&&(d.push('<span class="ui-slider-pre"><b></b></span><span class="ui-slider-next"><b></b></span>'));c.append(d.join(""))},_setWidth:function(){var s=this,f=s._data,t=s.root(),c=Math.ceil(t.width()/f.viewNum),u=t.height(),n=f.loop,q=a(".ui-slider-item",t).toArray(),g=q.length,p=a(".ui-slider-wheel",t).width(c*g)[0],r=a(".ui-slider-dots b",t).toArray(),e=a("img",t).toArray(),v=e.concat(),d={},m,k,h=f.imgInit||g;f.showDot&&(r[0].className="ui-slider-dot-select");if(f.imgZoom){a(v).on("load",function(){var l=this.height,i=this.width,o=Math.min(l,u),j=Math.min(i,c);if(l/u>i/c){this.style.cssText+="height:"+o+"px;width:"+o/l*i+"px;"}else{this.style.cssText+="height:"+j/i*l+"px;width:"+j+"px"}this.onload=null})}for(m=0;m<g;m++){q[m].style.cssText+="width:"+c+"px;position:absolute;-webkit-transform:translate3d("+m*c+"px,0,0);z-index:"+(900-m);d[m]=n?(m>g/2-1?m-g/2:m):m;if(m<h){k=v.shift();k&&(k.src=k.getAttribute("lazyload"));if(f.loop){k=e[m+g/2];k&&(k.src=k.getAttribute("lazyload"))}}}s.data({root:t[0],wheel:p,items:q,lazyImgs:v,allImgs:e,length:g,width:c,height:u,dots:r,dotIndex:d,dot:r[0]});return s},_eventHandler:function(d){var c=this;switch(d.type){case"touchmove":c._touchMove(d);break;case"touchstart":c._touchStart(d);break;case"touchcancel":case"touchend":c._touchEnd();break;case"webkitTransitionEnd":c._transitionEnd();break;case"ortchange":c._resize.call(c);break}},_touchStart:function(d){var c=this;c.data({pageX:d.touches[0].pageX,pageY:d.touches[0].pageY,S:false,T:false,X:0});c.data("wheel").style.webkitTransitionDuration="0ms"},_touchMove:function(g){var h=this._data,i=h.X=g.touches[0].pageX-h.pageX;if(!h.T){var c=h.index,f=h.length,d=Math.abs(i)<Math.abs(g.touches[0].pageY-h.pageY);h.loop&&(h.index=c>0&&(c<f-1)?c:(c===f-1)&&i<0?f/2-1:c===0&&i>0?f/2:c);d||clearTimeout(h.play);h.T=true;h.S=d}if(!h.S){h.stopPropagation&&g.stopPropagation();g.preventDefault();h.wheel.style.webkitTransform="translate3d("+(i-h.index*h.width)+"px,0,0)"}},_touchEnd:function(){var d=this,e=d._data;if(!e.S){var f=e.springBackDis,c=e.X<=-f?Math.ceil(-e.X/e.width):(e.X>f)?-Math.ceil(e.X/e.width):0;e._stepLength=Math.abs(c);d._slide(e.index+c)}},_slide:function(d,h){var f=this,g=f._data,e=g.length,c=e-g.viewNum+1;if(-1<d&&d<c){f._move(d)}else{if(d>=c){if(!g.loop){f._move(c-(h?2:1));g._direction=-1}else{g.wheel.style.cssText+="-webkit-transition:0ms;-webkit-transform:translate3d(-"+(e/2-1)*g.width+"px,0,0);";g._direction=1;a.later(function(){f._move(e/2)},20)}}else{if(!g.loop){f._move(h?1:0)}else{g.wheel.style.cssText+="-webkit-transition:0ms;-webkit-transform:translate3d(-"+(e/2)*g.width+"px,0,0);";a.later(function(){f._move(e/2-1)},20)}g._direction=1}}return f},_move:function(d){var f=this._data,e=f.dotIndex[d];this.trigger("slide",e);if(f.lazyImgs.length){var c=f.allImgs[d];c&&c.src||(c.src=c.getAttribute("lazyload"))}if(f.showDot){f.dot.className="";f.dots[e].className="ui-slider-dot-select";f.dot=f.dots[e]}f.index=d;f.wheel.style.cssText+="-webkit-transition:"+f.animationTime+"ms;-webkit-transform:translate3d(-"+d*f.width+"px,0,0);"},_transitionEnd:function(){var f=this,g=f._data;f.trigger("slideend",g.dotIndex[g.index]);if(g.lazyImgs.length){for(var e=g._stepLength,d=0;d<e;d++){var c=g.lazyImgs.shift();c&&(c.src=c.getAttribute("lazyload"));if(g.loop){c=g.allImgs[g.index+g.length/2];c&&!c.src&&(c.src=c.getAttribute("lazyload"))}}g._stepLength=1}f._setTimeout()},_setTimeout:function(){var c=this,d=c._data;if(!d.autoPlay){return c}clearTimeout(d.play);d.play=a.later(function(){c._slide.call(c,d.index+d._direction,true)},d.autoPlayTime);return c},_resize:function(){var g=this,h=g._data,e=h.root.offsetWidth/h.viewNum,f=h.length,c=h.items;if(!e){return g}h.width=e;clearTimeout(h.play);for(var d=0;d<f;d++){c[d].style.cssText+="width:"+e+"px;-webkit-transform:translate3d("+d*e+"px,0,0);"}h.wheel.style.removeProperty("-webkit-transition");h.wheel.style.cssText+="width:"+e*f+"px;-webkit-transform:translate3d(-"+h.index*e+"px,0,0);";h._direction=1;g._setTimeout();return g},pre:function(){var c=this;c._slide(c.data("index")-1);return c},next:function(){var c=this;c._slide(c.data("index")+1);return c},stop:function(){var c=this;clearTimeout(c.data("play"));c.data("autoPlay",false);return c},resume:function(){var c=this;c.data("_direction",1);c.data("autoPlay",true);c._setTimeout();return c}})})(Zepto);


/*!Widget calendar.js*/
/**
 * @file 日历组件
 * @name Calendar
 * @desc <qrcode align="right" title="Live Demo">../gmu/_examples/widget/calendar/calendar.html</qrcode>
 * 日历组件, 可以用来给一容器生成日历。
 * @import core/touch.js, core/zepto.ui.js, core/zepto.highlight.js
 */ (function($, undefined) {
	var monthNames = ["01月", "02月", "03月", "04月", "05月", "06月",
			"07月", "08月", "09月", "10月", "11月", "12月"
	],

		dayNames = ["日", "一", "二", "三", "四", "五", "六"],
		offsetRE = /^(\+|\-)?(\d+)(M|Y)$/i,

		//获取月份的天数
		getDaysInMonth = function(year, month) {
			return 32 - new Date(year, month, 32).getDate();
		},

		//获取月份中的第一天是所在星期的第几天
		getFirstDayOfMonth = function(year, month) {
			return new Date(year, month, 1).getDay();
		},

		//格式化数字，不足补零.
		formatNumber = function(val, len) {
			var num = "" + val;
			while (num.length < len) {
				num = "0" + num;
			}
			return num;
		},

		getVal = function(elem) {
			return elem.is('select, input') ? elem.val() : elem.attr('data-value');
		},

		prototype;

	/**
	 * @name $.ui.calendar
	 * @grammar $.ui.calendar(options) ⇒ instance
	 * @grammar calendar(options) ⇒ self
	 * @desc **Options**
	 * - ''date'' {Date|String}: (可选，默认：today) 初始化日期
	 * - ''firstDay'' {Number}: (可选，默认：1)  设置新的一周从星期几开始，星期天用0表示, 星期一用1表示, 以此类推.
	 * - ''minDate'' {Date|String}: (可选，默认：null)  设置可以选择的最小日期
	 * - ''maxDate'' {Date|String}: (可选，默认：null)  设置可以选择的最大日期
	 * - ''swipeable'' {Boolean}: (可选，默认：false)  设置是否可以通过左右滑动手势来切换日历
	 * - ''monthChangeable'' {Boolean}: (可选，默认：false)  设置是否让月份可选择
	 * - ''yearChangeable'' {Boolean}: (可选，默认：false)  设置是否让年份可选择
	 * - ''events'' 所有[Trigger Events](#calendar_triggerevents)中提及的事件都可以在此设置Hander, 如init: function(e){}。
	 *
	 * **Demo**
	 * <codepreview href="../gmu/_examples/widget/calendar/calendar.html">
	 * ../gmu/_examples/widget/calendar/calendar.html
	 * </codepreview>
	 */
	$.ui.define('calendar', {
		_data: {
			date: null, //默认日期
			firstDay: 1, //星期天用0表示, 星期一用1表示, 以此类推.
			maxDate: null, //可以选择的日期范围
			minDate: null,
			swipeable: false,
			monthChangeable: false,
			yearChangeable: false,
			selectYear: null,
			selectYearBefore: null,
			selectYearAfter: null
		},

		_create: function() {
			var el = this.root();

			//如果没有指定el, 则创建一个空div
			el = el || this.root($('<div></div>'));
			el.appendTo(this.data('container') || (el.parent().length ? '' : document.body));
		},

		_init: function() {
			var data = this._data,
				el = this._container || this.root(),
				eventHandler = $.proxy(this._eventHandler, this);

			this.minDate(data.minDate)
				.maxDate(data.maxDate)
				.date(data.date || new Date())
				.refresh();

			el.addClass('ui-calendar')
				.on('click', eventHandler)
				.highlight();

			data.swipeable && el.on('swipeLeft swipeRight', eventHandler);
		},

		_eventHandler: function(e) {
			var data = this._data,
				root = (this._container || this.root()).get(0),
				match,
				target,
				cell,
				date,
				elems;

			switch (e.type) {
				case 'swipeLeft':
				case 'swipeRight':
					return this.switchMonthTo((e.type == 'swipeRight' ? '-' : '+') + '1M');

				case 'change':
					elems = $('.ui-calendar-header .ui-calendar-year, ' +
						'.ui-calendar-header .ui-calendar-month', this._el);

					return this.switchMonthTo(getVal(elems.eq(1)), getVal(elems.eq(0)));

				default:
					//click

					target = e.target;

					if ((match = $(target).closest('.ui-calendar-calendar tbody a', root)) && match.length) {

						e.preventDefault();
						cell = match.parent();

						this._option('selectedDate',
							date = new Date(cell.attr('data-year'), cell.attr('data-month'), match.text()));

						this.trigger('select', [date, $.calendar.formatDate(date), this]);
						this.refresh();
					} else if ((match = $(target).closest('.ui-calendar-prev, .ui-calendar-next', root)) && match.length) {

						e.preventDefault();
						this.switchMonthTo((match.is('.ui-calendar-prev') ? '-' : '+') + '1M');
					}
			}
		},

		/**
		 * @ignore
		 * @name option
		 * @grammar option(key[, value]) ⇒ instance
		 * @desc 设置或获取Option，如果想要Option生效需要调用[Refresh](#calendar_refresh)方法。
		 */
		_option: function(key, val) {
			var data = this._data,
				date, minDate, maxDate;

			//如果是setter
			if (val !== undefined) {

				switch (key) {
					case 'minDate':
					case 'maxDate':
						data[key] = val ? $.calendar.parseDate(val) : null;
						break;

					case 'selectedDate':
						minDate = data.minDate;
						maxDate = data.maxDate;
						val = $.calendar.parseDate(val);
						val = minDate && minDate > val ? minDate : maxDate && maxDate < val ? maxDate : val;
						data._selectedYear = data._drawYear = val.getFullYear();
						data._selectedMonth = data._drawMonth = val.getMonth();
						data._selectedDay = val.getDate();
						break;

					case 'date':
						this._option('selectedDate', val);
						data[key] = this._option('selectedDate');
						break;

					default:
						data[key] = val;
				}

				//标记为true, 则表示下次refresh的时候要重绘所有内容。
				data._invalid = true;

				//如果是setter则要返回instance
				return this;
			}

			return key == 'selectedDate' ? new Date(data._selectedYear, data._selectedMonth, data._selectedDay) : data[key];
		},

		/**
		 * 切换到今天所在月份。
		 * @name switchToToday
		 * @grammar switchToToday() ⇒ instance
		 * @returns {*}
		 */
		switchToToday: function() {
			var today = new Date();
			return this.switchMonthTo(today.getMonth(), today.getFullYear());
		},

		/**
		 * @name switchMonthTo
		 * @grammar switchMonthTo(month, year) ⇒ instance
		 * @grammar switchMonthTo(str) ⇒ instance
		 * @desc 使组件显示某月，当第一参数为str可以+1M, +4M, -5Y, +1Y等等。+1M表示在显示的月的基础上显示下一个月，+4m表示下4个月，-5Y表示5年前
		 */
		switchMonthTo: function(month, year) {
			var data = this._data,
				minDate = this.minDate(),
				maxDate = this.maxDate(),
				offset,
				period,
				tmpDate;

			if ($.isString(month) && offsetRE.test(month)) {
				offset = RegExp.$1 == '-' ? -parseInt(RegExp.$2, 10) : parseInt(RegExp.$2, 10);
				period = RegExp.$3.toLowerCase();
				month = data._drawMonth + (period == 'm' ? offset : 0);
				year = data._drawYear + (period == 'y' ? offset : 0);
			} else {
				month = parseInt(month, 10);
				year = parseInt(year, 10);
			}

			//Date有一定的容错能力，如果传入2012年13月，它会变成2013年1月
			tmpDate = new Date(year, month, 1);

			//不能跳到不可选的月份
			tmpDate = minDate && minDate > tmpDate ? minDate : maxDate && maxDate < tmpDate ? maxDate : tmpDate;

			month = tmpDate.getMonth();
			year = tmpDate.getFullYear();

			if (month != data._drawMonth || year != data._drawYear) {
				this.trigger('monthchange', [
					data._drawMonth = month, data._drawYear = year, this
				]);

				data._invalid = true;
				this.refresh();
			}

			return this;
		},

		/**
		 * @name refresh
		 * @grammar refresh() ⇒ instance
		 * @desc 当修改option后需要调用此方法。
		 */
		refresh: function() {
			var data = this._data,
				el = this._container || this.root(),
				eventHandler = $.proxy(this._eventHandler, this);

			//如果数据没有变化厕不重绘了
			if (!data._invalid) {
				return;
			}

			$('.ui-calendar-calendar td:not(.ui-state-disabled), .ui-calendar-header a', el).highlight();
			$('.ui-calendar-header select', el).off('change', eventHandler);
			el.empty().append(this._generateHTML());
			$('.ui-calendar-calendar td:not(.ui-state-disabled), .ui-calendar-header a', el).highlight('ui-state-hover');
			$('.ui-calendar-header select', el).on('change', eventHandler);
			data._invalid = false;
			return this;
		},

		/**
		 * @desc 销毁组件。
		 * @name destroy
		 * @grammar destroy()  ⇒ instance
		 */
		destroy: function() {
			var el = this._container || this.root(),
				eventHandler = this._eventHandler;

			$('.ui-calendar-calendar td:not(.ui-state-disabled)', el).highlight();
			$('.ui-calendar-header select', el).off('change', eventHandler);
			return this.$super('destroy');
		},

		/**
		 * 重绘表格
		 */
		_generateHTML: function() {
			var data = this._data,
				drawYear = data._drawYear,
				drawMonth = data._drawMonth,
				tempDate = new Date(),
				today = new Date(tempDate.getFullYear(), tempDate.getMonth(),
					tempDate.getDate()),

				minDate = this.minDate(),
				maxDate = this.maxDate(),
				selectedDate = this.selectedDate(),
				html = '',
				i,
				j,
				firstDay,
				day,
				leadDays,
				daysInMonth,
				rows,
				printDate;

			firstDay = (isNaN(firstDay = parseInt(data.firstDay, 10)) ? 0 : firstDay);

			html += this._renderHead(data, drawYear, drawMonth, minDate, maxDate) +
				'<table  class="ui-calendar-calendar"><thead><tr>';

			for (i = 0; i < 7; i++) {
				day = (i + firstDay) % 7;

				html += '<th' + ((i + firstDay + 6) % 7 >= 5 ?

				//如果是周末则加上ui-calendar-week-end的class给th
				' class="ui-calendar-week-end"' : '') + '>' +
					'<span>' + dayNames[day] + '</span></th>';
			}

			//添加一个间隙，样式需求
			html += '</thead></tr><tbody><tr class="ui-calendar-gap">' +
				'<td colspan="7">&#xa0;</td></tr>';

			daysInMonth = getDaysInMonth(drawYear, drawMonth);
			leadDays = (getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
			rows = Math.ceil((leadDays + daysInMonth) / 7);
			printDate = new Date(drawYear, drawMonth, 1 - leadDays);

			for (i = 0; i < rows; i++) {
				html += '<tr>';

				for (j = 0; j < 7; j++) {
					html += this._renderDay(j, printDate, firstDay, drawMonth, selectedDate, today, minDate, maxDate);
					printDate.setDate(printDate.getDate() + 1);
				}
				html += '</tr>';
			}
			html += '</tbody></table>';
			return html;
		},

		_renderHead: function(data, drawYear, drawMonth, minDate, maxDate) {
			var html = '<div class="ui-calendar-header">',

				//上一个月的最后一天
				lpd = new Date(drawYear, drawMonth, -1),

				//下一个月的第一天
				fnd = new Date(drawYear, drawMonth + 1, 1),
				i,
				max;

			html += '<a class="ui-calendar-prev' + (minDate && minDate > lpd ?
				' ui-state-disable' : '') + '" href="#">&lt;&lt;</a><div class="ui-calendar-title">';

			if (data.yearChangeable) {
				html += '<select class="ui-calendar-year">';

				if (this._data.selectYearBefore !== null || this._data.selectYearAfter !== null) {
					var today = new Date();
					var y = today.getFullYear();
					for (i = y - parseInt(this._data.selectYearBefore), max = y + parseInt(this._data.selectYearAfter); i < max; i++) {
						html += '<option value="' + i + '" ' + (i == drawYear ?
							'selected="selected"' : '') + '>' + i + '年</option>';
					}
				} else {
					for (i = Math.max(1970, drawYear - 10), max = i + 20; i < max; i++) {
						html += '<option value="' + i + '" ' + (i == drawYear ?
							'selected="selected"' : '') + '>' + i + '年</option>';
					}
				}

				html += '</select>';
			} else {
				html += '<span class="ui-calendar-year" data-value="' + drawYear + '">' + drawYear + '年' + '</span>';
			}

			if (data.monthChangeable) {
				html += '<select class="ui-calendar-month">';

				for (i = 0; i < 12; i++) {
					html += '<option value="' + i + '" ' + (i == drawMonth ?
						'selected="selected"' : '') + '>' + monthNames[i] + '</option>';
				}
				html += '</select>';
			} else {
				html += '<span class="ui-calendar-month" data-value="' + drawMonth + '">' + monthNames[drawMonth] + '</span>';
			}

			html += '</div><a class="ui-calendar-next' + (maxDate && maxDate < fnd ?
				' ui-state-disable' : '') + '" href="#">&gt;&gt;</a></div>';
			return html;
		},

		_renderDay: function(j, printDate, firstDay, drawMonth, selectedDate, today, minDate, maxDate) {

			var otherMonth = (printDate.getMonth() !== drawMonth),
				unSelectable;

			unSelectable = otherMonth || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);

			return "<td class='" + ((j + firstDay + 6) % 7 >= 5 ? "ui-calendar-week-end" : "") + // 标记周末

			(unSelectable ? " ui-calendar-unSelectable ui-state-disabled" : "") + //标记不可点的天

			(otherMonth || unSelectable ? '' : (printDate.getTime() === selectedDate.getTime() ? " ui-calendar-current-day" : "") + //标记当前选择
			(printDate.getTime() === today.getTime() ? " ui-calendar-today" : "") //标记今天
			) + "'" +

			(unSelectable ? "" : " data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" +

			(otherMonth ? "&#xa0;" : (unSelectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" :
				"<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === selectedDate.getTime() ? " ui-state-active" : "") +
				"' href='#'>" + printDate.getDate() + "</a>")) + "</td>";
		}
	});

	prototype = $.ui.calendar.prototype;

	//添加更直接的option修改接口
	$.each(['maxDate', 'minDate', 'date', 'selectedDate'], function(i, name) {
		prototype[name] = function(val) {
			return this._option(name, val);
		}
	});

	//补充注释

	/**
	 * @name maxDate
	 * @grammar maxDate([value]) ⇒ instance
	 * @desc 设置或获取maxDate，如果想要Option生效需要调用[Refresh](#calendar_refresh)方法。
	 */

	/**
	 * @name minDate
	 * @grammar minDate([value]) ⇒ instance
	 * @desc 设置或获取minDate，如果想要Option生效需要调用[Refresh](#calendar_refresh)方法。
	 */

	/**
	 * @name date
	 * @grammar date([value]) ⇒ instance
	 * @desc 设置或获取当前date，如果想要Option生效需要调用[Refresh](#calendar_refresh)方法。
	 */

	/**
	 * @name date
	 * @grammar date([value]) ⇒ instance
	 * @desc 设置或获取当前选中的日期，如果想要Option生效需要调用[Refresh](#calendar_refresh)方法。
	 */


	//@todo 支持各种格式
	//开放接口，如果现有格式不能满足需求，外部可以通过覆写一下两个方法
	$.calendar = {

		/**
		 * 解析字符串成日期格式对象。目前支持yyyy-mm-dd格式和yyyy/mm/dd格式。
		 * @name $.calendar.parseDate
		 * @grammar $.calendar.parseDate( str ) ⇒ Date
		 */
		parseDate: function(obj) {
			var dateRE = /^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})$/;
			return $.isDate(obj) ? obj : dateRE.test(obj) ? new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10)) : null;
		},

		/**
		 * 格式化日期对象为字符串, 输出格式为yyy-mm-dd
		 * @name $.calendar.formatDate
		 * @grammar $.calendar.formatDate( date ) ⇒ String
		 */
		formatDate: function(date) {
			return date.getFullYear() + '-' + formatNumber(date.getMonth() + 1, 2) + '-' + formatNumber(date.getDate(), 2);
		}
	}

	/**
	 * @name Trigger Events
	 * @theme event
	 * @desc 组件内部触发的事件
	 *
	 * ^ 名称 ^ 处理函数参数 ^ 描述 ^
	 * | init | event | 组件初始化的时候触发，不管是render模式还是setup模式都会触发 |
	 * | select | event, date, dateStr, ui | 选中日期的时候触发 |
	 * | monthchange | event, month, year, ui | 当当前现实月份发生变化时触发 |
	 * | destroy | event | 组件在销毁的时候触发 |
	 */

})(Zepto);