// @fancyapps/ui/Carousel v4.0.22
const t=t=>"object"==typeof t&&null!==t&&t.constructor===Object&&"[object Object]"===Object.prototype.toString.call(t),i=(...e)=>{let s=!1;"boolean"==typeof e[0]&&(s=e.shift());let n=e[0];if(!n||"object"!=typeof n)throw new Error("extendee must be an object");const o=e.slice(1),h=o.length;for(let e=0;e<h;e++){const h=o[e];for(let e in h)if(h.hasOwnProperty(e)){const o=h[e];if(s&&(Array.isArray(o)||t(o))){const t=Array.isArray(o)?[]:{};n[e]=i(!0,n.hasOwnProperty(e)?n[e]:t,o)}else n[e]=o}}return n},e=(t,i=1e4)=>(t=parseFloat(t)||0,Math.round((t+Number.EPSILON)*i)/i),s="undefined"!=typeof window&&window.ResizeObserver||class{constructor(t){this.observables=[],this.boundCheck=this.check.bind(this),this.boundCheck(),this.callback=t}observe(t){if(this.observables.some((i=>i.el===t)))return;const i={el:t,size:{height:t.clientHeight,width:t.clientWidth}};this.observables.push(i)}unobserve(t){this.observables=this.observables.filter((i=>i.el!==t))}disconnect(){this.observables=[]}check(){const t=this.observables.filter((t=>{const i=t.el.clientHeight,e=t.el.clientWidth;if(t.size.height!==i||t.size.width!==e)return t.size.height=i,t.size.width=e,!0})).map((t=>t.el));t.length>0&&this.callback(t),window.requestAnimationFrame(this.boundCheck)}};class n{constructor(t){this.id=t.pointerId||t.identifier||-1,this.pageX=t.pageX,this.pageY=t.pageY,this.clientX=t.clientX,this.clientY=t.clientY,this.nativePointer=t}}function o(t,i){return i?Math.sqrt((i.clientX-t.clientX)**2+(i.clientY-t.clientY)**2):0}function h(t,i){return i?{clientX:(t.clientX+i.clientX)/2,clientY:(t.clientY+i.clientY)/2}:t}class a{constructor(t,{start:i=(()=>!0),move:e=(()=>{}),end:s=(()=>{})}={}){this.element=t,this.startPointers=[],this.currentPointers=[],this.startCallback=i,this.moveCallback=e,this.endCallback=s,this.onStart=t=>{if(t.button&&0!==t.button)return;const i=new n(t);if(!1===this.startCallback(i,t))return!1;t.preventDefault(),(()=>{const t=window.getSelection?window.getSelection():document.selection;t&&t.rangeCount&&t.getRangeAt(0).getClientRects().length&&(t.removeAllRanges?t.removeAllRanges():t.empty&&t.empty())})(),this.currentPointers.push(i),this.startPointers.push(i);(t.target&&"setPointerCapture"in t.target?t.target:this.element).setPointerCapture(t.pointerId),this.element.addEventListener("pointermove",this.onMove),this.element.addEventListener("pointerup",this.onEnd),this.element.addEventListener("pointercancel",this.onEnd)},this.onMove=t=>{const i=this.currentPointers.slice(),e=[];for(const i of[new n(t)]){const t=this.currentPointers.findIndex((t=>t.id===i.id));t<0||(e.push(i),this.currentPointers[t]=i)}e.length&&this.moveCallback(i,this.currentPointers,t)},this.onEnd=t=>{const i=new n(t),e=this.currentPointers.findIndex((t=>t.id===i.id));if(-1===e)return!1;this.currentPointers.splice(e,1),this.startPointers.splice(e,1),this.endCallback(i,t),this.currentPointers.length||(this.element.removeEventListener("pointermove",this.onMove),this.element.removeEventListener("pointerup",this.onEnd),this.element.removeEventListener("pointercancel",this.onEnd))},this.element.addEventListener("pointerdown",this.onStart)}stop(){this.element.removeEventListener("pointerdown",this.onStart),this.element.removeEventListener("pointermove",this.onMove),this.element.removeEventListener("pointerup",this.onEnd),this.element.removeEventListener("pointercancel",this.onEnd)}}class r{constructor(t={}){this.options=i(!0,{},t),this.plugins=[],this.events={};for(const t of["on","once"])for(const i of Object.entries(this.options[t]||{}))this[t](...i)}option(t,i,...e){t=String(t);let s=(n=t,o=this.options,n.split(".").reduce((function(t,i){return t&&t[i]}),o));var n,o;return"function"==typeof s&&(s=s.call(this,this,...e)),void 0===s?i:s}localize(t,i=[]){return t=(t=String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g,((t,e,s)=>{let n="";s?n=this.option(`${e[0]+e.toLowerCase().substring(1)}.l10n.${s}`):e&&(n=this.option(`l10n.${e}`)),n||(n=t);for(let t=0;t<i.length;t++)n=n.split(i[t][0]).join(i[t][1]);return n}))).replace(/\{\{(.*)\}\}/,((t,i)=>i))}on(i,e){if(t(i)){for(const t of Object.entries(i))this.on(...t);return this}return String(i).split(" ").forEach((t=>{const i=this.events[t]=this.events[t]||[];-1==i.indexOf(e)&&i.push(e)})),this}once(i,e){if(t(i)){for(const t of Object.entries(i))this.once(...t);return this}return String(i).split(" ").forEach((t=>{const i=(...s)=>{this.off(t,i),e.call(this,this,...s)};i._=e,this.on(t,i)})),this}off(i,e){if(!t(i))return i.split(" ").forEach((t=>{const i=this.events[t];if(!i||!i.length)return this;let s=-1;for(let t=0,n=i.length;t<n;t++){const n=i[t];if(n&&(n===e||n._===e)){s=t;break}}-1!=s&&i.splice(s,1)})),this;for(const t of Object.entries(i))this.off(...t)}trigger(t,...i){for(const e of[...this.events[t]||[]].slice())if(e&&!1===e.call(this,this,...i))return!1;for(const e of[...this.events["*"]||[]].slice())if(e&&!1===e.call(this,t,this,...i))return!1;return!0}attachPlugins(t){const e={};for(const[s,n]of Object.entries(t||{}))!1===this.options[s]||this.plugins[s]||(this.options[s]=i({},n.defaults||{},this.options[s]),e[s]=new n(this));for(const[t,i]of Object.entries(e))i.attach(this);return this.plugins=Object.assign({},this.plugins,e),this}detachPlugins(){for(const t in this.plugins){let i;(i=this.plugins[t])&&"function"==typeof i.detach&&i.detach(this)}return this.plugins={},this}}const l={touch:!0,zoom:!0,pinchToZoom:!0,panOnlyZoomed:!1,lockAxis:!1,friction:.64,decelFriction:.88,zoomFriction:.74,bounceForce:.2,baseScale:1,minScale:1,maxScale:2,step:.5,textSelection:!1,click:"toggleZoom",wheel:"zoom",wheelFactor:42,wheelLimit:5,draggableClass:"is-draggable",draggingClass:"is-dragging",ratio:1};class c extends r{constructor(t,e={}){super(i(!0,{},l,e)),this.state="init",this.$container=t;for(const t of["onLoad","onWheel","onClick"])this[t]=this[t].bind(this);this.initLayout(),this.resetValues(),this.attachPlugins(c.Plugins),this.trigger("init"),this.updateMetrics(),this.attachEvents(),this.trigger("ready"),!1===this.option("centerOnStart")?this.state="ready":this.panTo({friction:0})}initLayout(){const t=this.$container;if(!(t instanceof HTMLElement))throw new Error("Panzoom: Container not found");const i=this.option("content")||t.querySelector(".panzoom__content");if(!i)throw new Error("Panzoom: Content not found");this.$content=i;let e=this.option("viewport")||t.querySelector(".panzoom__viewport");e||!1===this.option("wrapInner")||(e=document.createElement("div"),e.classList.add("panzoom__viewport"),e.append(...t.childNodes),t.appendChild(e)),this.$viewport=e||i.parentNode}resetValues(){this.updateRate=this.option("updateRate",/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?250:24),this.container={width:0,height:0},this.viewport={width:0,height:0},this.content={origWidth:0,origHeight:0,width:0,height:0,x:this.option("x",0),y:this.option("y",0),scale:this.option("baseScale")},this.transform={x:0,y:0,scale:1},this.resetDragPosition()}onLoad(t){this.updateMetrics(),this.panTo({scale:this.option("baseScale"),friction:0}),this.trigger("load",t)}onClick(t){if(t.defaultPrevented)return;if(this.option("textSelection")&&window.getSelection().toString().length)return void t.stopPropagation();const i=this.$content.getClientRects()[0];if("ready"!==this.state&&(this.dragPosition.midPoint||Math.abs(i.top-this.dragStart.rect.top)>1||Math.abs(i.left-this.dragStart.rect.left)>1))return t.preventDefault(),void t.stopPropagation();!1!==this.trigger("click",t)&&this.option("zoom")&&"toggleZoom"===this.option("click")&&(t.preventDefault(),t.stopPropagation(),this.zoomWithClick(t))}onWheel(t){!1!==this.trigger("wheel",t)&&this.option("zoom")&&this.option("wheel")&&this.zoomWithWheel(t)}zoomWithWheel(t){void 0===this.changedDelta&&(this.changedDelta=0);const i=Math.max(-1,Math.min(1,-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)),e=this.content.scale;let s=e*(100+i*this.option("wheelFactor"))/100;if(i<0&&Math.abs(e-this.option("minScale"))<.01||i>0&&Math.abs(e-this.option("maxScale"))<.01?(this.changedDelta+=Math.abs(i),s=e):(this.changedDelta=0,s=Math.max(Math.min(s,this.option("maxScale")),this.option("minScale"))),this.changedDelta>this.option("wheelLimit"))return;if(t.preventDefault(),s===e)return;const n=this.$content.getBoundingClientRect(),o=t.clientX-n.left,h=t.clientY-n.top;this.zoomTo(s,{x:o,y:h})}zoomWithClick(t){const i=this.$content.getClientRects()[0],e=t.clientX-i.left,s=t.clientY-i.top;this.toggleZoom({x:e,y:s})}attachEvents(){this.$content.addEventListener("load",this.onLoad),this.$container.addEventListener("wheel",this.onWheel,{passive:!1}),this.$container.addEventListener("click",this.onClick,{passive:!1}),this.initObserver();const t=new a(this.$container,{start:(i,e)=>{if(!this.option("touch"))return!1;if(!(this.velocity.scale<0)){if(!t.currentPointers.length){if(-1!==["BUTTON","TEXTAREA","OPTION","INPUT","SELECT","VIDEO"].indexOf(e.target.nodeName))return!1;if(this.option("textSelection")&&((t,i,e)=>{const s=t.childNodes,n=document.createRange();for(let t=0;t<s.length;t++){const o=s[t];if(o.nodeType!==Node.TEXT_NODE)continue;n.selectNodeContents(o);const h=n.getBoundingClientRect();if(i>=h.left&&e>=h.top&&i<=h.right&&e<=h.bottom)return o}return!1})(e.target,e.clientX,e.clientY))return!1}return!1!==this.trigger("touchStart",e)&&(this.state="pointerdown",this.resetDragPosition(),this.dragPosition.midPoint=null,this.dragPosition.time=Date.now(),!0)}},move:(i,e,s)=>{if("pointerdown"!==this.state)return;if(0==this.trigger("touchMove",s))return void s.preventDefault();if(e.length<2&&1==this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale"))return;if(e.length>1&&(!this.option("zoom")||!1===this.option("pinchToZoom")))return;s.preventDefault(),s.stopPropagation();const n=h(i[0],i[1]),a=h(e[0],e[1]),r=a.clientX-n.clientX,l=a.clientY-n.clientY,c=o(i[0],i[1]),d=o(e[0],e[1]),g=c?d/c:1;this.dragOffset.x+=r,this.dragOffset.y+=l,this.dragOffset.scale*=g,this.dragOffset.time=Date.now()-this.dragPosition.time;const p=1===this.dragStart.scale&&this.option("lockAxis");if(p&&!this.lockAxis){if(Math.abs(this.dragOffset.x)<6&&Math.abs(this.dragOffset.y)<6)return;if("xy"===p){const t=Math.abs(180*Math.atan2(this.dragOffset.y,this.dragOffset.x)/Math.PI);this.lockAxis=t>45&&t<135?"y":"x"}else this.lockAxis=p}if(this.lockAxis&&(this.dragOffset["x"===this.lockAxis?"y":"x"]=0),this.$container.classList.add(this.option("draggingClass")),this.transform.scale===this.option("baseScale")&&"y"===this.lockAxis||(this.dragPosition.x=this.dragStart.x+this.dragOffset.x),this.transform.scale===this.option("baseScale")&&"x"===this.lockAxis||(this.dragPosition.y=this.dragStart.y+this.dragOffset.y),this.dragPosition.scale=this.dragStart.scale*this.dragOffset.scale,e.length>1){const i=h(t.startPointers[0],t.startPointers[1]),e=i.clientX-this.dragStart.rect.x,s=i.clientY-this.dragStart.rect.y,{deltaX:n,deltaY:o}=this.getZoomDelta(this.content.scale*this.dragOffset.scale,e,s);this.dragPosition.x-=n,this.dragPosition.y-=o,this.dragPosition.midPoint=a}else this.setDragResistance();this.transform={x:this.dragPosition.x,y:this.dragPosition.y,scale:this.dragPosition.scale},this.startAnimation()},end:(i,e)=>{if("pointerdown"!==this.state)return;if(this._dragOffset={...this.dragOffset},t.currentPointers.length)return void this.resetDragPosition();if(this.state="decel",this.friction=this.option("decelFriction"),this.recalculateTransform(),this.$container.classList.remove(this.option("draggingClass")),!1===this.trigger("touchEnd",e))return;if("decel"!==this.state)return;const s=this.option("minScale");if(this.transform.scale<s)return void this.zoomTo(s,{friction:.64});const n=this.option("maxScale");if(this.transform.scale-n>.01){const t=this.dragPosition.midPoint||i,e=this.$content.getClientRects()[0];this.zoomTo(n,{friction:.64,x:t.clientX-e.left,y:t.clientY-e.top})}else;}});this.pointerTracker=t}initObserver(){this.resizeObserver||(this.resizeObserver=new s((()=>{this.updateTimer||(this.updateTimer=setTimeout((()=>{const t=this.$container.getBoundingClientRect();t.width&&t.height?((Math.abs(t.width-this.container.width)>1||Math.abs(t.height-this.container.height)>1)&&(this.isAnimating()&&this.endAnimation(!0),this.updateMetrics(),this.panTo({x:this.content.x,y:this.content.y,scale:this.option("baseScale"),friction:0})),this.updateTimer=null):this.updateTimer=null}),this.updateRate))})),this.resizeObserver.observe(this.$container))}resetDragPosition(){this.lockAxis=null,this.friction=this.option("friction"),this.velocity={x:0,y:0,scale:0};const{x:t,y:i,scale:e}=this.content;this.dragStart={rect:this.$content.getBoundingClientRect(),x:t,y:i,scale:e},this.dragPosition={...this.dragPosition,x:t,y:i,scale:e},this.dragOffset={x:0,y:0,scale:1,time:0}}updateMetrics(t){!0!==t&&this.trigger("beforeUpdate");const i=this.$container,s=this.$content,n=this.$viewport,o=s instanceof HTMLImageElement,h=this.option("zoom"),a=this.option("resizeParent",h);let r=this.option("width"),l=this.option("height"),c=r||(d=s,Math.max(parseFloat(d.naturalWidth||0),parseFloat(d.width&&d.width.baseVal&&d.width.baseVal.value||0),parseFloat(d.offsetWidth||0),parseFloat(d.scrollWidth||0)));var d;let g=l||(t=>Math.max(parseFloat(t.naturalHeight||0),parseFloat(t.height&&t.height.baseVal&&t.height.baseVal.value||0),parseFloat(t.offsetHeight||0),parseFloat(t.scrollHeight||0)))(s);Object.assign(s.style,{width:r?`${r}px`:"",height:l?`${l}px`:"",maxWidth:"",maxHeight:""}),a&&Object.assign(n.style,{width:"",height:""});const p=this.option("ratio");c=e(c*p),g=e(g*p),r=c,l=g;const f=s.getBoundingClientRect(),u=n.getBoundingClientRect(),m=n==i?u:i.getBoundingClientRect();let v=Math.max(n.offsetWidth,e(u.width)),x=Math.max(n.offsetHeight,e(u.height)),b=window.getComputedStyle(n);if(v-=parseFloat(b.paddingLeft)+parseFloat(b.paddingRight),x-=parseFloat(b.paddingTop)+parseFloat(b.paddingBottom),this.viewport.width=v,this.viewport.height=x,h){if(Math.abs(c-f.width)>.1||Math.abs(g-f.height)>.1){const t=((t,i,e,s)=>{const n=Math.min(e/t||0,s/i);return{width:t*n||0,height:i*n||0}})(c,g,Math.min(c,f.width),Math.min(g,f.height));r=e(t.width),l=e(t.height)}Object.assign(s.style,{width:`${r}px`,height:`${l}px`,transform:""})}if(a&&(Object.assign(n.style,{width:`${r}px`,height:`${l}px`}),this.viewport={...this.viewport,width:r,height:l}),o&&h&&"function"!=typeof this.options.maxScale){const t=this.option("maxScale");this.options.maxScale=function(){return this.content.origWidth>0&&this.content.fitWidth>0?this.content.origWidth/this.content.fitWidth:t}}this.content={...this.content,origWidth:c,origHeight:g,fitWidth:r,fitHeight:l,width:r,height:l,scale:1,isZoomable:h},this.container={width:m.width,height:m.height},!0!==t&&this.trigger("afterUpdate")}zoomIn(t){this.zoomTo(this.content.scale+(t||this.option("step")))}zoomOut(t){this.zoomTo(this.content.scale-(t||this.option("step")))}toggleZoom(t={}){const i=this.option("maxScale"),e=this.option("baseScale"),s=this.content.scale>e+.5*(i-e)?e:i;this.zoomTo(s,t)}zoomTo(t=this.option("baseScale"),{x:i=null,y:s=null}={}){t=Math.max(Math.min(t,this.option("maxScale")),this.option("minScale"));const n=e(this.content.scale/(this.content.width/this.content.fitWidth),1e7);null===i&&(i=this.content.width*n*.5),null===s&&(s=this.content.height*n*.5);const{deltaX:o,deltaY:h}=this.getZoomDelta(t,i,s);i=this.content.x-o,s=this.content.y-h,this.panTo({x:i,y:s,scale:t,friction:this.option("zoomFriction")})}getZoomDelta(t,i=0,e=0){const s=this.content.fitWidth*this.content.scale,n=this.content.fitHeight*this.content.scale,o=i>0&&s?i/s:0,h=e>0&&n?e/n:0;return{deltaX:(this.content.fitWidth*t-s)*o,deltaY:(this.content.fitHeight*t-n)*h}}panTo({x:t=this.content.x,y:i=this.content.y,scale:e,friction:s=this.option("friction"),ignoreBounds:n=!1}={}){if(e=e||this.content.scale||1,!n){const{boundX:s,boundY:n}=this.getBounds(e);s&&(t=Math.max(Math.min(t,s.to),s.from)),n&&(i=Math.max(Math.min(i,n.to),n.from))}this.friction=s,this.transform={...this.transform,x:t,y:i,scale:e},s?(this.state="panning",this.velocity={x:(1/this.friction-1)*(t-this.content.x),y:(1/this.friction-1)*(i-this.content.y),scale:(1/this.friction-1)*(e-this.content.scale)},this.startAnimation()):this.endAnimation()}startAnimation(){this.rAF?cancelAnimationFrame(this.rAF):this.trigger("startAnimation"),this.rAF=requestAnimationFrame((()=>this.animate()))}animate(){if(this.setEdgeForce(),this.setDragForce(),this.velocity.x*=this.friction,this.velocity.y*=this.friction,this.velocity.scale*=this.friction,this.content.x+=this.velocity.x,this.content.y+=this.velocity.y,this.content.scale+=this.velocity.scale,this.isAnimating())this.setTransform();else if("pointerdown"!==this.state)return void this.endAnimation();this.rAF=requestAnimationFrame((()=>this.animate()))}getBounds(t){let i=this.boundX,s=this.boundY;if(void 0!==i&&void 0!==s)return{boundX:i,boundY:s};i={from:0,to:0},s={from:0,to:0},t=t||this.transform.scale;const n=this.content.fitWidth*t,o=this.content.fitHeight*t,h=this.viewport.width,a=this.viewport.height;if(n<h){const t=e(.5*(h-n));i.from=t,i.to=t}else i.from=e(h-n);if(o<a){const t=.5*(a-o);s.from=t,s.to=t}else s.from=e(a-o);return{boundX:i,boundY:s}}setEdgeForce(){if("decel"!==this.state)return;const t=this.option("bounceForce"),{boundX:i,boundY:e}=this.getBounds(Math.max(this.transform.scale,this.content.scale));let s,n,o,h;if(i&&(s=this.content.x<i.from,n=this.content.x>i.to),e&&(o=this.content.y<e.from,h=this.content.y>e.to),s||n){let e=((s?i.from:i.to)-this.content.x)*t;const n=this.content.x+(this.velocity.x+e)/this.friction;n>=i.from&&n<=i.to&&(e+=this.velocity.x),this.velocity.x=e,this.recalculateTransform()}if(o||h){let i=((o?e.from:e.to)-this.content.y)*t;const s=this.content.y+(i+this.velocity.y)/this.friction;s>=e.from&&s<=e.to&&(i+=this.velocity.y),this.velocity.y=i,this.recalculateTransform()}}setDragResistance(){if("pointerdown"!==this.state)return;const{boundX:t,boundY:i}=this.getBounds(this.dragPosition.scale);let e,s,n,o;if(t&&(e=this.dragPosition.x<t.from,s=this.dragPosition.x>t.to),i&&(n=this.dragPosition.y<i.from,o=this.dragPosition.y>i.to),(e||s)&&(!e||!s)){const i=e?t.from:t.to,s=i-this.dragPosition.x;this.dragPosition.x=i-.3*s}if((n||o)&&(!n||!o)){const t=n?i.from:i.to,e=t-this.dragPosition.y;this.dragPosition.y=t-.3*e}}setDragForce(){"pointerdown"===this.state&&(this.velocity.x=this.dragPosition.x-this.content.x,this.velocity.y=this.dragPosition.y-this.content.y,this.velocity.scale=this.dragPosition.scale-this.content.scale)}recalculateTransform(){this.transform.x=this.content.x+this.velocity.x/(1/this.friction-1),this.transform.y=this.content.y+this.velocity.y/(1/this.friction-1),this.transform.scale=this.content.scale+this.velocity.scale/(1/this.friction-1)}isAnimating(){return!(!this.friction||!(Math.abs(this.velocity.x)>.05||Math.abs(this.velocity.y)>.05||Math.abs(this.velocity.scale)>.05))}setTransform(t){let i,s,n;if(t?(i=e(this.transform.x),s=e(this.transform.y),n=this.transform.scale,this.content={...this.content,x:i,y:s,scale:n}):(i=e(this.content.x),s=e(this.content.y),n=this.content.scale/(this.content.width/this.content.fitWidth),this.content={...this.content,x:i,y:s}),this.trigger("beforeTransform"),i=e(this.content.x),s=e(this.content.y),t&&this.option("zoom")){let t,o;t=e(this.content.fitWidth*n),o=e(this.content.fitHeight*n),this.content.width=t,this.content.height=o,this.transform={...this.transform,width:t,height:o,scale:n},Object.assign(this.$content.style,{width:`${t}px`,height:`${o}px`,maxWidth:"none",maxHeight:"none",transform:`translate3d(${i}px, ${s}px, 0) scale(1)`})}else this.$content.style.transform=`translate3d(${i}px, ${s}px, 0) scale(${n})`;this.trigger("afterTransform")}endAnimation(t){cancelAnimationFrame(this.rAF),this.rAF=null,this.velocity={x:0,y:0,scale:0},this.setTransform(!0),this.state="ready",this.handleCursor(),!0!==t&&this.trigger("endAnimation")}handleCursor(){const t=this.option("draggableClass");t&&this.option("touch")&&(1==this.option("panOnlyZoomed")&&this.content.width<=this.viewport.width&&this.content.height<=this.viewport.height&&this.transform.scale<=this.option("baseScale")?this.$container.classList.remove(t):this.$container.classList.add(t))}detachEvents(){this.$content.removeEventListener("load",this.onLoad),this.$container.removeEventListener("wheel",this.onWheel,{passive:!1}),this.$container.removeEventListener("click",this.onClick,{passive:!1}),this.pointerTracker&&(this.pointerTracker.stop(),this.pointerTracker=null),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null)}destroy(){"destroy"!==this.state&&(this.state="destroy",clearTimeout(this.updateTimer),this.updateTimer=null,cancelAnimationFrame(this.rAF),this.rAF=null,this.detachEvents(),this.detachPlugins(),this.resetDragPosition())}}c.version="4.0.22",c.Plugins={};const d=(t,i)=>{let e=0;return function(...s){const n=(new Date).getTime();if(!(n-e<i))return e=n,t(...s)}};class g{constructor(t){this.$container=null,this.$prev=null,this.$next=null,this.carousel=t,this.onRefresh=this.onRefresh.bind(this)}option(t){return this.carousel.option(`Navigation.${t}`)}createButton(t){const i=document.createElement("button");i.setAttribute("title",this.carousel.localize(`{{${t.toUpperCase()}}}`));const e=this.option("classNames.button")+" "+this.option(`classNames.${t}`);return i.classList.add(...e.split(" ")),i.setAttribute("tabindex","0"),i.innerHTML=this.carousel.localize(this.option(`${t}Tpl`)),i.addEventListener("click",(i=>{i.preventDefault(),i.stopPropagation(),this.carousel["slide"+("next"===t?"Next":"Prev")]()})),i}build(){this.$container||(this.$container=document.createElement("div"),this.$container.classList.add(...this.option("classNames.main").split(" ")),this.carousel.$container.appendChild(this.$container)),this.$next||(this.$next=this.createButton("next"),this.$container.appendChild(this.$next)),this.$prev||(this.$prev=this.createButton("prev"),this.$container.appendChild(this.$prev))}onRefresh(){const t=this.carousel.pages.length;t<=1||t>1&&this.carousel.elemDimWidth<this.carousel.wrapDimWidth&&!Number.isInteger(this.carousel.option("slidesPerPage"))?this.cleanup():(this.build(),this.$prev.removeAttribute("disabled"),this.$next.removeAttribute("disabled"),this.carousel.option("infiniteX",this.carousel.option("infinite"))||(this.carousel.page<=0&&this.$prev.setAttribute("disabled",""),this.carousel.page>=t-1&&this.$next.setAttribute("disabled","")))}cleanup(){this.$prev&&this.$prev.remove(),this.$prev=null,this.$next&&this.$next.remove(),this.$next=null,this.$container&&this.$container.remove(),this.$container=null}attach(){this.carousel.on("refresh change",this.onRefresh)}detach(){this.carousel.off("refresh change",this.onRefresh),this.cleanup()}}g.defaults={prevTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>',nextTpl:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',classNames:{main:"carousel__nav",button:"carousel__button",next:"is-next",prev:"is-prev"}};class p{constructor(t){this.carousel=t,this.selectedIndex=null,this.friction=0,this.onNavReady=this.onNavReady.bind(this),this.onNavClick=this.onNavClick.bind(this),this.onNavCreateSlide=this.onNavCreateSlide.bind(this),this.onTargetChange=this.onTargetChange.bind(this)}addAsTargetFor(t){this.target=this.carousel,this.nav=t,this.attachEvents()}addAsNavFor(t){this.target=t,this.nav=this.carousel,this.attachEvents()}attachEvents(){this.nav.options.initialSlide=this.target.options.initialPage,this.nav.on("ready",this.onNavReady),this.nav.on("createSlide",this.onNavCreateSlide),this.nav.on("Panzoom.click",this.onNavClick),this.target.on("change",this.onTargetChange),this.target.on("Panzoom.afterUpdate",this.onTargetChange)}onNavReady(){this.onTargetChange(!0)}onNavClick(t,i,e){const s=e.target.closest(".carousel__slide");if(!s)return;e.stopPropagation();const n=parseInt(s.dataset.index,10),o=this.target.findPageForSlide(n);this.target.page!==o&&this.target.slideTo(o,{friction:this.friction}),this.markSelectedSlide(n)}onNavCreateSlide(t,i){i.index===this.selectedIndex&&this.markSelectedSlide(i.index)}onTargetChange(){const t=this.target.pages[this.target.page].indexes[0],i=this.nav.findPageForSlide(t);this.nav.slideTo(i),this.markSelectedSlide(t)}markSelectedSlide(t){this.selectedIndex=t,[...this.nav.slides].filter((t=>t.$el&&t.$el.classList.remove("is-nav-selected")));const i=this.nav.slides[t];i&&i.$el&&i.$el.classList.add("is-nav-selected")}attach(t){const i=t.options.Sync;(i.target||i.nav)&&(i.target?this.addAsNavFor(i.target):i.nav&&this.addAsTargetFor(i.nav),this.friction=i.friction)}detach(){this.nav&&(this.nav.off("ready",this.onNavReady),this.nav.off("Panzoom.click",this.onNavClick),this.nav.off("createSlide",this.onNavCreateSlide)),this.target&&(this.target.off("Panzoom.afterUpdate",this.onTargetChange),this.target.off("change",this.onTargetChange))}}p.defaults={friction:.92};const f={Navigation:g,Dots:class{constructor(t){this.carousel=t,this.$list=null,this.events={change:this.onChange.bind(this),refresh:this.onRefresh.bind(this)}}buildList(){if(this.carousel.pages.length<this.carousel.option("Dots.minSlideCount"))return;const t=document.createElement("ol");return t.classList.add("carousel__dots"),t.addEventListener("click",(t=>{if(!("page"in t.target.dataset))return;t.preventDefault(),t.stopPropagation();const i=parseInt(t.target.dataset.page,10),e=this.carousel;i!==e.page&&(e.pages.length<3&&e.option("infinite")?e[0==i?"slidePrev":"slideNext"]():e.slideTo(i))})),this.$list=t,this.carousel.$container.appendChild(t),this.carousel.$container.classList.add("has-dots"),t}removeList(){this.$list&&(this.$list.parentNode.removeChild(this.$list),this.$list=null),this.carousel.$container.classList.remove("has-dots")}rebuildDots(){let t=this.$list;const i=!!t,e=this.carousel.pages.length;if(e<2)return void(i&&this.removeList());i||(t=this.buildList());const s=this.$list.children.length;if(s>e)for(let t=e;t<s;t++)this.$list.removeChild(this.$list.lastChild);else{for(let t=s;t<e;t++){const i=document.createElement("li");i.classList.add("carousel__dot"),i.dataset.page=t,i.setAttribute("role","button"),i.setAttribute("tabindex","0"),i.setAttribute("title",this.carousel.localize("{{GOTO}}",[["%d",t+1]])),i.addEventListener("keydown",(t=>{const e=t.code;let s;"Enter"===e||"NumpadEnter"===e?s=i:"ArrowRight"===e?s=i.nextSibling:"ArrowLeft"===e&&(s=i.previousSibling),s&&s.click()})),this.$list.appendChild(i)}this.setActiveDot()}}setActiveDot(){if(!this.$list)return;this.$list.childNodes.forEach((t=>{t.classList.remove("is-selected")}));const t=this.$list.childNodes[this.carousel.page];t&&t.classList.add("is-selected")}onChange(){this.setActiveDot()}onRefresh(){this.rebuildDots()}attach(){this.carousel.on(this.events)}detach(){this.removeList(),this.carousel.off(this.events),this.carousel=null}},Sync:p};const u={slides:[],preload:0,slidesPerPage:"auto",initialPage:null,initialSlide:null,friction:.92,center:!0,infinite:!0,fill:!0,dragFree:!1,prefix:"",classNames:{viewport:"carousel__viewport",track:"carousel__track",slide:"carousel__slide",slideSelected:"is-selected"},l10n:{NEXT:"Next slide",PREV:"Previous slide",GOTO:"Go to slide #%d"}};class m extends r{constructor(t,e={}){if(super(e=i(!0,{},u,e)),this.state="init",this.$container=t,!(this.$container instanceof HTMLElement))throw new Error("No root element provided");this.slideNext=d(this.slideNext.bind(this),250),this.slidePrev=d(this.slidePrev.bind(this),250),this.init()}init(){this.pages=[],this.page=this.pageIndex=null,this.prevPage=this.prevPageIndex=null,this.attachPlugins(m.Plugins),this.trigger("init"),this.initLayout(),this.initSlides(),this.updateMetrics(),this.$track&&this.pages.length&&(this.$track.style.transform=`translate3d(${-1*this.pages[this.page].left}px, 0px, 0) scale(1)`),this.manageSlideVisiblity(),this.initPanzoom(),this.state="ready",this.trigger("ready")}initLayout(){const t=this.option("prefix"),i=this.option("classNames");this.$viewport=this.option("viewport")||this.$container.querySelector(`.${t}${i.viewport}`),this.$viewport||(this.$viewport=document.createElement("div"),this.$viewport.classList.add(...(t+i.viewport).split(" ")),this.$viewport.append(...this.$container.childNodes),this.$container.appendChild(this.$viewport)),this.$track=this.option("track")||this.$container.querySelector(`.${t}${i.track}`),this.$track||(this.$track=document.createElement("div"),this.$track.classList.add(...(t+i.track).split(" ")),this.$track.append(...this.$viewport.childNodes),this.$viewport.appendChild(this.$track))}initSlides(){this.slides=[];this.$viewport.querySelectorAll(`.${this.option("prefix")}${this.option("classNames.slide")}`).forEach((t=>{const i={$el:t,isDom:!0};this.slides.push(i),this.trigger("createSlide",i,this.slides.length)})),Array.isArray(this.options.slides)&&(this.slides=i(!0,[...this.slides],this.options.slides))}updateMetrics(){let t,i=0,s=[];this.slides.forEach(((e,n)=>{const o=e.$el,h=e.isDom||!t?this.getSlideMetrics(o):t;e.index=n,e.width=h,e.left=i,t=h,i+=h,s.push(n)}));let n=Math.max(this.$track.offsetWidth,e(this.$track.getBoundingClientRect().width)),o=getComputedStyle(this.$track);n-=parseFloat(o.paddingLeft)+parseFloat(o.paddingRight),this.contentWidth=i,this.viewportWidth=n;const h=[],a=this.option("slidesPerPage");if(Number.isInteger(a)&&i>n)for(let t=0;t<this.slides.length;t+=a)h.push({indexes:s.slice(t,t+a),slides:this.slides.slice(t,t+a)});else{let t=0,i=0;for(let e=0;e<this.slides.length;e+=1){let s=this.slides[e];(!h.length||i+s.width>n)&&(h.push({indexes:[],slides:[]}),t=h.length-1,i=0),i+=s.width,h[t].indexes.push(e),h[t].slides.push(s)}}const r=this.option("center"),l=this.option("fill");h.forEach(((t,e)=>{t.index=e,t.width=t.slides.reduce(((t,i)=>t+i.width),0),t.left=t.slides[0].left,r&&(t.left+=.5*(n-t.width)*-1),l&&!this.option("infiniteX",this.option("infinite"))&&i>n&&(t.left=Math.max(t.left,0),t.left=Math.min(t.left,i-n))}));const c=[];let d;h.forEach((t=>{const i={...t};d&&i.left===d.left?(d.width+=i.width,d.slides=[...d.slides,...i.slides],d.indexes=[...d.indexes,...i.indexes]):(i.index=c.length,d=i,c.push(i))})),this.pages=c;let g=this.page;if(null===g){const t=this.option("initialSlide");g=null!==t?this.findPageForSlide(t):parseInt(this.option("initialPage",0),10)||0,c[g]||(g=c.length&&g>c.length?c[c.length-1].index:0),this.page=g,this.pageIndex=g}this.updatePanzoom(),this.trigger("refresh")}getSlideMetrics(t){if(!t){const i=this.slides[0];(t=document.createElement("div")).dataset.isTestEl=1,t.style.visibility="hidden",t.classList.add(...(this.option("prefix")+this.option("classNames.slide")).split(" ")),i.customClass&&t.classList.add(...i.customClass.split(" ")),this.$track.prepend(t)}let i=Math.max(t.offsetWidth,e(t.getBoundingClientRect().width));const s=t.currentStyle||window.getComputedStyle(t);return i=i+(parseFloat(s.marginLeft)||0)+(parseFloat(s.marginRight)||0),t.dataset.isTestEl&&t.remove(),i}findPageForSlide(t){t=parseInt(t,10)||0;const i=this.pages.find((i=>i.indexes.indexOf(t)>-1));return i?i.index:null}slideNext(){this.slideTo(this.pageIndex+1)}slidePrev(){this.slideTo(this.pageIndex-1)}slideTo(t,i={}){const{x:e=-1*this.setPage(t,!0),y:s=0,friction:n=this.option("friction")}=i;this.Panzoom.content.x===e&&!this.Panzoom.velocity.x&&n||(this.Panzoom.panTo({x:e,y:s,friction:n,ignoreBounds:!0}),"ready"===this.state&&"ready"===this.Panzoom.state&&this.trigger("settle"))}initPanzoom(){this.Panzoom&&this.Panzoom.destroy();const t=i(!0,{},{content:this.$track,wrapInner:!1,resizeParent:!1,zoom:!1,click:!1,lockAxis:"x",x:this.pages.length?-1*this.pages[this.page].left:0,centerOnStart:!1,textSelection:()=>this.option("textSelection",!1),panOnlyZoomed:function(){return this.content.width<=this.viewport.width}},this.option("Panzoom"));this.Panzoom=new c(this.$container,t),this.Panzoom.on({"*":(t,...i)=>this.trigger(`Panzoom.${t}`,...i),afterUpdate:()=>{this.updatePage()},beforeTransform:this.onBeforeTransform.bind(this),touchEnd:this.onTouchEnd.bind(this),endAnimation:()=>{this.trigger("settle")}}),this.updateMetrics(),this.manageSlideVisiblity()}updatePanzoom(){this.Panzoom&&(this.Panzoom.content={...this.Panzoom.content,fitWidth:this.contentWidth,origWidth:this.contentWidth,width:this.contentWidth},this.pages.length>1&&this.option("infiniteX",this.option("infinite"))?this.Panzoom.boundX=null:this.pages.length&&(this.Panzoom.boundX={from:-1*this.pages[this.pages.length-1].left,to:-1*this.pages[0].left}),this.option("infiniteY",this.option("infinite"))?this.Panzoom.boundY=null:this.Panzoom.boundY={from:0,to:0},this.Panzoom.handleCursor())}manageSlideVisiblity(){const t=this.contentWidth,i=this.viewportWidth;let e=this.Panzoom?-1*this.Panzoom.content.x:this.pages.length?this.pages[this.page].left:0;const s=this.option("preload"),n=this.option("infiniteX",this.option("infinite")),o=parseFloat(getComputedStyle(this.$viewport,null).getPropertyValue("padding-left")),h=parseFloat(getComputedStyle(this.$viewport,null).getPropertyValue("padding-right"));this.slides.forEach((a=>{let r,l,c=0;r=e-o,l=e+i+h,r-=s*(i+o+h),l+=s*(i+o+h);const d=a.left+a.width>r&&a.left<l;r=e+t-o,l=e+t+i+h,r-=s*(i+o+h);const g=n&&a.left+a.width>r&&a.left<l;r=e-t-o,l=e-t+i+h,r-=s*(i+o+h);const p=n&&a.left+a.width>r&&a.left<l;g||d||p?(this.createSlideEl(a),d&&(c=0),g&&(c=-1),p&&(c=1),a.left+a.width>e&&a.left<=e+i+h&&(c=0)):this.removeSlideEl(a),a.hasDiff=c}));let a=0,r=0;this.slides.forEach(((i,e)=>{let s=0;i.$el?(e!==a||i.hasDiff?s=r+i.hasDiff*t:r=0,i.$el.style.left=Math.abs(s)>.1?`${r+i.hasDiff*t}px`:"",a++):r+=i.width})),this.markSelectedSlides()}createSlideEl(t){if(!t)return;if(t.$el){let i=t.$el.dataset.index;if(!i||parseInt(i,10)!==t.index){let i;t.$el.dataset.index=t.index,t.$el.querySelectorAll("[data-lazy-srcset]").forEach((t=>{t.srcset=t.dataset.lazySrcset})),t.$el.querySelectorAll("[data-lazy-src]").forEach((t=>{let i=t.dataset.lazySrc;t instanceof HTMLImageElement?t.src=i:t.style.backgroundImage=`url('${i}')`})),(i=t.$el.dataset.lazySrc)&&(t.$el.style.backgroundImage=`url('${i}')`),t.state="ready"}return}const i=document.createElement("div");i.dataset.index=t.index,i.classList.add(...(this.option("prefix")+this.option("classNames.slide")).split(" ")),t.customClass&&i.classList.add(...t.customClass.split(" ")),t.html&&(i.innerHTML=t.html);const e=[];this.slides.forEach(((t,i)=>{t.$el&&e.push(i)}));const s=t.index;let n=null;if(e.length){let t=e.reduce(((t,i)=>Math.abs(i-s)<Math.abs(t-s)?i:t));n=this.slides[t]}return this.$track.insertBefore(i,n&&n.$el?n.index<t.index?n.$el.nextSibling:n.$el:null),t.$el=i,this.trigger("createSlide",t,s),t}removeSlideEl(t){t.$el&&!t.isDom&&(this.trigger("removeSlide",t),t.$el.remove(),t.$el=null)}markSelectedSlides(){const t=this.option("classNames.slideSelected"),i="aria-hidden";this.slides.forEach(((e,s)=>{const n=e.$el;if(!n)return;const o=this.pages[this.page];o&&o.indexes&&o.indexes.indexOf(s)>-1?(t&&!n.classList.contains(t)&&(n.classList.add(t),this.trigger("selectSlide",e)),n.removeAttribute(i)):(t&&n.classList.contains(t)&&(n.classList.remove(t),this.trigger("unselectSlide",e)),n.setAttribute(i,!0))}))}updatePage(){this.updateMetrics(),this.slideTo(this.page,{friction:0})}onBeforeTransform(){this.option("infiniteX",this.option("infinite"))&&this.manageInfiniteTrack(),this.manageSlideVisiblity()}manageInfiniteTrack(){const t=this.contentWidth,i=this.viewportWidth;if(!this.option("infiniteX",this.option("infinite"))||this.pages.length<2||t<i)return;const e=this.Panzoom;let s=!1;return e.content.x<-1*(t-i)&&(e.content.x+=t,this.pageIndex=this.pageIndex-this.pages.length,s=!0),e.content.x>i&&(e.content.x-=t,this.pageIndex=this.pageIndex+this.pages.length,s=!0),s&&"pointerdown"===e.state&&e.resetDragPosition(),s}onTouchEnd(t,i){const e=this.option("dragFree");if(!e&&this.pages.length>1&&t.dragOffset.time<350&&Math.abs(t.dragOffset.y)<1&&Math.abs(t.dragOffset.x)>5)this[t.dragOffset.x<0?"slideNext":"slidePrev"]();else if(e){const[,i]=this.getPageFromPosition(-1*t.transform.x);this.setPage(i)}else this.slideToClosest()}slideToClosest(t={}){let[,i]=this.getPageFromPosition(-1*this.Panzoom.content.x);this.slideTo(i,t)}getPageFromPosition(t){const i=this.pages.length;this.option("center")&&(t+=.5*this.viewportWidth);const e=Math.floor(t/this.contentWidth);t-=e*this.contentWidth;let s=this.slides.find((i=>i.left<=t&&i.left+i.width>t));if(s){let t=this.findPageForSlide(s.index);return[t,t+e*i]}return[0,0]}setPage(t,i){let e=0,s=parseInt(t,10)||0;const n=this.page,o=this.pageIndex,h=this.pages.length,a=this.contentWidth,r=this.viewportWidth;if(t=(s%h+h)%h,this.option("infiniteX",this.option("infinite"))&&a>r){const n=Math.floor(s/h)||0,o=a;if(e=this.pages[t].left+n*o,!0===i&&h>2){let t=-1*this.Panzoom.content.x;const i=e-o,n=e+o,a=Math.abs(t-e),r=Math.abs(t-i),l=Math.abs(t-n);l<a&&l<=r?(e=n,s+=h):r<a&&r<l&&(e=i,s-=h)}}else t=s=Math.max(0,Math.min(s,h-1)),e=this.pages.length?this.pages[t].left:0;return this.page=t,this.pageIndex=s,null!==n&&t!==n&&(this.prevPage=n,this.prevPageIndex=o,this.trigger("change",t,n)),e}destroy(){this.state="destroy",this.slides.forEach((t=>{this.removeSlideEl(t)})),this.slides=[],this.Panzoom.destroy(),this.detachPlugins()}}m.version="4.0.22",m.Plugins=f;export{m as Carousel,c as Panzoom};
