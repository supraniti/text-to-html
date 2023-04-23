import{ak as pe,h as E,c as L,r as C,M as be,x as K,e as xe,u as M,w as p,o as ee,d as S,g as W,A as z,l as P,al as I,s as ye,a0 as Te,O as we,am as Se,P as He,a as w,an as Ee,X as Ce,ao as Me,R as Pe,ap as ke,aq as te,T as qe,b as ne,B as Le,F as We,C as Oe,n as Ae,ar as $e,as as ze,f as Qe,at as Re}from"./index.34462876.js";function Q(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),pe.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}const Be=E("div",{class:"q-space"});var Ge=L({name:"QSpace",setup(){return()=>Be}});const De={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function je({showing:e,avoidEmit:l,configureAnchorEl:o}){const{props:t,proxy:n,emit:u}=W(),i=C(null);let s=null;function c(a){return i.value===null?!1:a===void 0||a.touches===void 0||a.touches.length<=1}const r={};o===void 0&&(Object.assign(r,{hide(a){n.hide(a)},toggle(a){n.toggle(a),a.qAnchorHandled=!0},toggleKey(a){be(a,13)===!0&&r.toggle(a)},contextClick(a){n.hide(a),K(a),xe(()=>{n.show(a),a.qAnchorHandled=!0})},prevent:K,mobileTouch(a){if(r.mobileCleanup(a),c(a)!==!0)return;n.hide(a),i.value.classList.add("non-selectable");const h=a.target;M(r,"anchor",[[h,"touchmove","mobileCleanup","passive"],[h,"touchend","mobileCleanup","passive"],[h,"touchcancel","mobileCleanup","passive"],[i.value,"contextmenu","prevent","notPassive"]]),s=setTimeout(()=>{s=null,n.show(a),a.qAnchorHandled=!0},300)},mobileCleanup(a){i.value.classList.remove("non-selectable"),s!==null&&(clearTimeout(s),s=null),e.value===!0&&a!==void 0&&Q()}}),o=function(a=t.contextMenu){if(t.noParentEvent===!0||i.value===null)return;let h;a===!0?n.$q.platform.is.mobile===!0?h=[[i.value,"touchstart","mobileTouch","passive"]]:h=[[i.value,"mousedown","hide","passive"],[i.value,"contextmenu","contextClick","notPassive"]]:h=[[i.value,"click","toggle","passive"],[i.value,"keyup","toggleKey","passive"]],M(r,"anchor",h)});function d(){z(r,"anchor")}function g(a){for(i.value=a;i.value.classList.contains("q-anchor--skip");)i.value=i.value.parentNode;o()}function v(){if(t.target===!1||t.target===""||n.$el.parentNode===null)i.value=null;else if(t.target===!0)g(n.$el.parentNode);else{let a=t.target;if(typeof t.target=="string")try{a=document.querySelector(t.target)}catch{a=void 0}a!=null?(i.value=a.$el||a,o()):(i.value=null,console.error(`Anchor: target "${t.target}" not found`))}}return p(()=>t.contextMenu,a=>{i.value!==null&&(d(),o(a))}),p(()=>t.target,()=>{i.value!==null&&d(),v()}),p(()=>t.noParentEvent,a=>{i.value!==null&&(a===!0?d():o())}),ee(()=>{v(),l!==!0&&t.modelValue===!0&&i.value===null&&u("update:modelValue",!1)}),S(()=>{s!==null&&clearTimeout(s),d()}),{anchorEl:i,canShow:c,anchorEvents:r}}function Ne(e,l){const o=C(null);let t;function n(s,c){const r=`${c!==void 0?"add":"remove"}EventListener`,d=c!==void 0?c:t;s!==window&&s[r]("scroll",d,P.passive),window[r]("scroll",d,P.passive),t=c}function u(){o.value!==null&&(n(o.value),o.value=null)}const i=p(()=>e.noParentEvent,()=>{o.value!==null&&(u(),l())});return S(i),{localScrollTarget:o,unconfigureScrollTarget:u,changeScrollEvent:n}}const{notPassiveCapture:k}=P,x=[];function q(e){const l=e.target;if(l===void 0||l.nodeType===8||l.classList.contains("no-pointer-events")===!0)return;let o=I.length-1;for(;o>=0;){const t=I[o].$;if(t.type.name!=="QDialog")break;if(t.props.seamless!==!0)return;o--}for(let t=x.length-1;t>=0;t--){const n=x[t];if((n.anchorEl.value===null||n.anchorEl.value.contains(l)===!1)&&(l===document.body||n.innerRef.value!==null&&n.innerRef.value.contains(l)===!1))e.qClickOutside=!0,n.onClickOutside(e);else return}}function Ve(e){x.push(e),x.length===1&&(document.addEventListener("mousedown",q,k),document.addEventListener("touchstart",q,k))}function X(e){const l=x.findIndex(o=>o===e);l>-1&&(x.splice(l,1),x.length===0&&(document.removeEventListener("mousedown",q,k),document.removeEventListener("touchstart",q,k)))}let Y,_;function U(e){const l=e.split(" ");return l.length!==2?!1:["top","center","bottom"].includes(l[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(l[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function Fe(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const R={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{R[`${e}#ltr`]=e,R[`${e}#rtl`]=e});function G(e,l){const o=e.split(" ");return{vertical:o[0],horizontal:R[`${o[1]}#${l===!0?"rtl":"ltr"}`]}}function Ke(e,l){let{top:o,left:t,right:n,bottom:u,width:i,height:s}=e.getBoundingClientRect();return l!==void 0&&(o-=l[1],t-=l[0],u+=l[1],n+=l[0],i+=l[0],s+=l[1]),{top:o,bottom:u,height:s,left:t,right:n,width:i,middle:t+(n-t)/2,center:o+(u-o)/2}}function Ie(e,l,o){let{top:t,left:n}=e.getBoundingClientRect();return t+=l.top,n+=l.left,o!==void 0&&(t+=o[1],n+=o[0]),{top:t,bottom:t+1,height:1,left:n,right:n+1,width:1,middle:n,center:t}}function Xe(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function J(e,l,o){return{top:e[o.anchorOrigin.vertical]-l[o.selfOrigin.vertical],left:e[o.anchorOrigin.horizontal]-l[o.selfOrigin.horizontal]}}function Ye(e){if(ye.is.ios===!0&&window.visualViewport!==void 0){const s=document.body.style,{offsetLeft:c,offsetTop:r}=window.visualViewport;c!==Y&&(s.setProperty("--q-pe-left",c+"px"),Y=c),r!==_&&(s.setProperty("--q-pe-top",r+"px"),_=r)}const{scrollLeft:l,scrollTop:o}=e.el,t=e.absoluteOffset===void 0?Ke(e.anchorEl,e.cover===!0?[0,0]:e.offset):Ie(e.anchorEl,e.absoluteOffset,e.offset);let n={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(n.minWidth=t.width+"px",e.cover===!0&&(n.minHeight=t.height+"px")),Object.assign(e.el.style,n);const u=Xe(e.el);let i=J(t,u,e);if(e.absoluteOffset===void 0||e.offset===void 0)$(i,t,u,e.anchorOrigin,e.selfOrigin);else{const{top:s,left:c}=i;$(i,t,u,e.anchorOrigin,e.selfOrigin);let r=!1;if(i.top!==s){r=!0;const d=2*e.offset[1];t.center=t.top-=d,t.bottom-=d+2}if(i.left!==c){r=!0;const d=2*e.offset[0];t.middle=t.left-=d,t.right-=d+2}r===!0&&(i=J(t,u,e),$(i,t,u,e.anchorOrigin,e.selfOrigin))}n={top:i.top+"px",left:i.left+"px"},i.maxHeight!==void 0&&(n.maxHeight=i.maxHeight+"px",t.height>i.maxHeight&&(n.minHeight=n.maxHeight)),i.maxWidth!==void 0&&(n.maxWidth=i.maxWidth+"px",t.width>i.maxWidth&&(n.minWidth=n.maxWidth)),Object.assign(e.el.style,n),e.el.scrollTop!==o&&(e.el.scrollTop=o),e.el.scrollLeft!==l&&(e.el.scrollLeft=l)}function $(e,l,o,t,n){const u=o.bottom,i=o.right,s=Te(),c=window.innerHeight-s,r=document.body.clientWidth;if(e.top<0||e.top+u>c)if(n.vertical==="center")e.top=l[t.vertical]>c/2?Math.max(0,c-u):0,e.maxHeight=Math.min(u,c);else if(l[t.vertical]>c/2){const d=Math.min(c,t.vertical==="center"?l.center:t.vertical===n.vertical?l.bottom:l.top);e.maxHeight=Math.min(u,d),e.top=Math.max(0,d-u)}else e.top=Math.max(0,t.vertical==="center"?l.center:t.vertical===n.vertical?l.top:l.bottom),e.maxHeight=Math.min(u,c-e.top);if(e.left<0||e.left+i>r)if(e.maxWidth=Math.min(i,r),n.horizontal==="middle")e.left=l[t.horizontal]>r/2?Math.max(0,r-i):0;else if(l[t.horizontal]>r/2){const d=Math.min(r,t.horizontal==="middle"?l.middle:t.horizontal===n.horizontal?l.right:l.left);e.maxWidth=Math.min(i,d),e.left=Math.max(0,d-e.maxWidth)}else e.left=Math.max(0,t.horizontal==="middle"?l.middle:t.horizontal===n.horizontal?l.left:l.right),e.maxWidth=Math.min(i,r-e.left)}var Je=L({name:"QTooltip",inheritAttrs:!1,props:{...De,...we,...Se,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:U},self:{type:String,default:"top middle",validator:U},offset:{type:Array,default:()=>[14,14],validator:Fe},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...He],setup(e,{slots:l,emit:o,attrs:t}){let n,u;const i=W(),{proxy:{$q:s}}=i,c=C(null),r=C(!1),d=w(()=>G(e.anchor,s.lang.rtl)),g=w(()=>G(e.self,s.lang.rtl)),v=w(()=>e.persistent!==!0),{registerTick:a,removeTick:h}=Ee(),{registerTimeout:H}=Ce(),{transitionProps:le,transitionStyle:oe}=Me(e),{localScrollTarget:B,changeScrollEvent:ie,unconfigureScrollTarget:ae}=Ne(e,V),{anchorEl:m,canShow:re,anchorEvents:y}=je({showing:r,configureAnchorEl:me}),{show:se,hide:O}=Pe({showing:r,canShow:re,handleShow:ce,handleHide:de,hideOnRouteChange:v,processOnMount:!0});Object.assign(y,{delayShow:fe,delayHide:he});const{showPortal:D,hidePortal:j,renderPortal:ue}=ke(i,c,ge,"tooltip");if(s.platform.is.mobile===!0){const f={anchorEl:m,innerRef:c,onClickOutside(b){return O(b),b.target.classList.contains("q-dialog__backdrop")&&Le(b),!0}},A=w(()=>e.modelValue===null&&e.persistent!==!0&&r.value===!0);p(A,b=>{(b===!0?Ve:X)(f)}),S(()=>{X(f)})}function ce(f){D(),a(()=>{u=new MutationObserver(()=>T()),u.observe(c.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),T(),V()}),n===void 0&&(n=p(()=>s.screen.width+"|"+s.screen.height+"|"+e.self+"|"+e.anchor+"|"+s.lang.rtl,T)),H(()=>{D(!0),o("show",f)},e.transitionDuration)}function de(f){h(),j(),N(),H(()=>{j(!0),o("hide",f)},e.transitionDuration)}function N(){u!==void 0&&(u.disconnect(),u=void 0),n!==void 0&&(n(),n=void 0),ae(),z(y,"tooltipTemp")}function T(){const f=c.value;m.value===null||!f||Ye({el:f,offset:e.offset,anchorEl:m.value,anchorOrigin:d.value,selfOrigin:g.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function fe(f){if(s.platform.is.mobile===!0){Q(),document.body.classList.add("non-selectable");const A=m.value,b=["touchmove","touchcancel","touchend","click"].map(F=>[A,F,"delayHide","passiveCapture"]);M(y,"tooltipTemp",b)}H(()=>{se(f)},e.delay)}function he(f){s.platform.is.mobile===!0&&(z(y,"tooltipTemp"),Q(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),H(()=>{O(f)},e.hideDelay)}function me(){if(e.noParentEvent===!0||m.value===null)return;const f=s.platform.is.mobile===!0?[[m.value,"touchstart","delayShow","passive"]]:[[m.value,"mouseenter","delayShow","passive"],[m.value,"mouseleave","delayHide","passive"]];M(y,"anchor",f)}function V(){if(m.value!==null||e.scrollTarget!==void 0){B.value=te(m.value,e.scrollTarget);const f=e.noParentEvent===!0?T:O;ie(B.value,f)}}function ve(){return r.value===!0?E("div",{...t,ref:c,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",t.class],style:[t.style,oe.value],role:"tooltip"},ne(l.default)):null}function ge(){return E(qe,le.value,ve)}return S(N),Object.assign(i.proxy,{updatePosition:T}),ue}}),Ze=L({name:"QBar",props:{...We,dense:Boolean},setup(e,{slots:l}){const{proxy:{$q:o}}=W(),t=Oe(e,o),n=w(()=>`q-bar row no-wrap items-center q-bar--${e.dense===!0?"dense":"standard"}  q-bar--${t.value===!0?"dark":"light"}`);return()=>E("div",{class:n.value,role:"toolbar"},ne(l.default))}});const{passive:Z}=P,_e=["both","horizontal","vertical"];var et=L({name:"QScrollObserver",props:{axis:{type:String,validator:e=>_e.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:l}){const o={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let t=null,n,u;p(()=>e.scrollTarget,()=>{c(),s()});function i(){t!==null&&t();const g=Math.max(0,$e(n)),v=ze(n),a={top:g-o.position.top,left:v-o.position.left};if(e.axis==="vertical"&&a.top===0||e.axis==="horizontal"&&a.left===0)return;const h=Math.abs(a.top)>=Math.abs(a.left)?a.top<0?"up":"down":a.left<0?"left":"right";o.position={top:g,left:v},o.directionChanged=o.direction!==h,o.delta=a,o.directionChanged===!0&&(o.direction=h,o.inflectionPoint=o.position),l("scroll",{...o})}function s(){n=te(u,e.scrollTarget),n.addEventListener("scroll",r,Z),r(!0)}function c(){n!==void 0&&(n.removeEventListener("scroll",r,Z),n=void 0)}function r(g){if(g===!0||e.debounce===0||e.debounce==="0")i();else if(t===null){const[v,a]=e.debounce?[setTimeout(i,e.debounce),clearTimeout]:[requestAnimationFrame(i),cancelAnimationFrame];t=()=>{a(v),t=null}}}const{proxy:d}=W();return p(()=>d.$q.lang.rtl,i),ee(()=>{u=d.$el.parentNode,s()}),S(()=>{t!==null&&t(),c()}),Object.assign(d,{trigger:r,getPosition:()=>o}),Ae}});function tt(){return Qe(Re)}export{et as Q,Ze as a,Ge as b,Q as c,Je as d,tt as u};
