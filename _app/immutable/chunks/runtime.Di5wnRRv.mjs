import{l as lt,t as tn}from"./index.DIeogL5L.mjs";const Q=!1;var Un=Array.isArray,nn=Array.prototype.indexOf,jn=Array.from,Bn=Object.defineProperty,dt=Object.getOwnPropertyDescriptor,rn=Object.getOwnPropertyDescriptors,Vn=Object.prototype,Gn=Array.prototype,en=Object.getPrototypeOf;function Kn(t){return typeof t=="function"}const $n=()=>{};function Wn(t){return t()}function an(t){for(var n=0;n<t.length;n++)t[n]()}const w=2,mt=4,U=8,ut=16,A=32,Z=64,tt=128,N=256,K=512,d=1024,x=2048,j=4096,P=8192,b=16384,sn=32768,At=65536,Xn=1<<17,ln=1<<19,gt=1<<20,Et=Symbol("$state"),Zn=Symbol("legacy props"),zn=Symbol("");function xt(t){return t===this.v}function un(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Jn(t,n){return t!==n}function It(t){return!un(t,this.v)}function on(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function fn(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function _n(t){throw new Error("https://svelte.dev/e/effect_orphan")}function cn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Qn(){throw new Error("https://svelte.dev/e/hydration_failed")}function tr(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function nr(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function rr(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function vn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function pn(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}const er=1,ar=2,sr=4,lr=8,ur=16,or=1,ir=2,fr=4,_r=8,cr=16,vr=1,pr=2,hr=4,dr=1,Er=2,hn="[",dn="[!",En="]",St={},wr=Symbol(),yr="http://www.w3.org/2000/svg";function ot(t,n){var r={f:0,v:t,reactions:null,equals:xt,rv:0,wv:0};return r}function Tr(t){return Ot(ot(t))}function wn(t,n=!1){var e;const r=ot(t);return n||(r.equals=It),lt&&o!==null&&o.l!==null&&((e=o.l).s??(e.s=[])).push(r),r}function mr(t,n=!1){return Ot(wn(t,n))}function Ot(t){return i!==null&&i.f&w&&(m===null?Cn([t]):m.push(t)),t}function Ar(t,n){return it(t,Jt(()=>pt(t))),n}function it(t,n){return i!==null&&vt()&&i.f&(w|ut)&&(m===null||!m.includes(t))&&pn(),yn(t,n)}function yn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Kt(),Rt(t,x),vt()&&u!==null&&u.f&d&&!(u.f&A)&&(h!==null&&h.includes(t)?(T(u,x),J(u)):g===null?kn([t]):g.push(t))),n}function Rt(t,n){var r=t.reactions;if(r!==null)for(var e=vt(),a=r.length,s=0;s<a;s++){var l=r[s],f=l.f;f&x||!e&&l===u||(T(l,n),f&(d|N)&&(f&w?Rt(l,j):J(l)))}}function Nt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let O=!1;function gr(t){O=t}let y;function M(t){if(t===null)throw Nt(),St;return y=t}function xr(){return M(D(y))}function Ir(t){if(O){if(D(y)!==null)throw Nt(),St;y=t}}function Sr(t=1){if(O){for(var n=t,r=y;n--;)r=D(r);y=r}}function Or(){for(var t=0,n=y;;){if(n.nodeType===8){var r=n.data;if(r===En){if(t===0)return n;t-=1}else(r===hn||r===dn)&&(t+=1)}var e=D(n);n.remove(),n=e}}var wt,Tn,Dt,Ct;function Rr(){if(wt===void 0){wt=window,Tn=document;var t=Element.prototype,n=Node.prototype;Dt=dt(n,"firstChild").get,Ct=dt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function nt(t=""){return document.createTextNode(t)}function rt(t){return Dt.call(t)}function D(t){return Ct.call(t)}function Nr(t,n){if(!O)return rt(t);var r=rt(y);if(r===null)r=y.appendChild(nt());else if(n&&r.nodeType!==3){var e=nt();return r==null||r.before(e),M(e),e}return M(r),r}function Dr(t,n){if(!O){var r=rt(t);return r instanceof Comment&&r.data===""?D(r):r}return y}function Cr(t,n=1,r=!1){let e=O?y:t;for(var a;n--;)a=e,e=D(e);if(!O)return e;var s=e==null?void 0:e.nodeType;if(r&&s!==3){var l=nt();return e===null?a==null||a.after(l):e.before(l),M(l),l}return M(e),e}function kr(t){t.textContent=""}function mn(t){var n=w|x;u===null?n|=N:u.f|=gt;var r=i!==null&&i.f&w?i:null;const e={children:null,ctx:o,deps:null,equals:xt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??u};return r!==null&&(r.children??(r.children=[])).push(e),e}function Pr(t){const n=mn(t);return n.equals=It,n}function kt(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&w?ft(e):R(e)}}}function An(t){for(var n=t.parent;n!==null;){if(!(n.f&w))return n;n=n.parent}return null}function Pt(t){var n,r=u;X(An(t));try{kt(t),n=$t(t)}finally{X(r)}return n}function bt(t){var n=Pt(t),r=(S||t.f&N)&&t.deps!==null?j:d;T(t,r),t.equals(n)||(t.v=n,t.wv=Kt())}function ft(t){kt(t),Y(t,0),T(t,b),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ft(t){u===null&&i===null&&_n(),i!==null&&i.f&N&&fn(),ct&&on()}function gn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function F(t,n,r,e=!0){var a=(t&Z)!==0,s=u,l={ctx:o,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|x,first:null,fn:n,last:null,next:null,parent:a?null:s,prev:null,teardown:null,transitions:null,wv:0};if(r){var f=C;try{yt(!0),B(l),l.f|=sn}catch(c){throw R(l),c}finally{yt(f)}}else n!==null&&J(l);var _=r&&l.deps===null&&l.first===null&&l.nodes_start===null&&l.teardown===null&&(l.f&gt)===0;if(!_&&!a&&e&&(s!==null&&gn(l,s),i!==null&&i.f&w)){var p=i;(p.children??(p.children=[])).push(l)}return l}function br(t){const n=F(U,null,!1);return T(n,d),n.teardown=t,n}function Fr(t){Ft();var n=u!==null&&(u.f&A)!==0&&o!==null&&!o.m;if(n){var r=o;(r.e??(r.e=[])).push({fn:t,effect:u,reaction:i})}else{var e=Lt(t);return e}}function Lr(t){return Ft(),_t(t)}function Mr(t){const n=F(Z,t,!0);return(r={})=>new Promise(e=>{r.outro?Sn(n,()=>{R(n),e(void 0)}):(R(n),e(void 0))})}function Lt(t){return F(mt,t,!1)}function qr(t,n){var r=o,e={effect:null,ran:!1};r.l.r1.push(e),e.effect=_t(()=>{t(),!e.ran&&(e.ran=!0,it(r.l.r2,!0),Jt(n))})}function Hr(){var t=o;_t(()=>{if(pt(t.l.r2)){for(var n of t.l.r1){var r=n.effect;r.f&d&&T(r,j),L(r)&&B(r),n.ran=!1}t.l.r2.v=!1}})}function _t(t){return F(U,t,!0)}function Yr(t){return xn(t)}function xn(t,n=0){return F(U|ut|n,t,!0)}function Ur(t,n=!0){return F(U|A,t,!0,n)}function Mt(t){var n=t.teardown;if(n!==null){const r=ct,e=i;Tt(!0),W(null);try{n.call(null)}finally{Tt(r),W(e)}}}function qt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ft(n[r])}}function Ht(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;R(r,n),r=e}}function In(t){for(var n=t.first;n!==null;){var r=n.next;n.f&A||R(n),n=r}}function R(t,n=!0){var r=!1;if((n||t.f&ln)&&t.nodes_start!==null){for(var e=t.nodes_start,a=t.nodes_end;e!==null;){var s=e===a?null:D(e);e.remove(),e=s}r=!0}Ht(t,n&&!r),qt(t),Y(t,0),T(t,b);var l=t.transitions;if(l!==null)for(const _ of l)_.stop();Mt(t);var f=t.parent;f!==null&&f.first!==null&&Yt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Yt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function Sn(t,n){var r=[];Ut(t,r,!0),On(r,()=>{R(t),n&&n()})}function On(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var a of t)a.out(e)}else n()}function Ut(t,n,r){if(!(t.f&P)){if(t.f^=P,t.transitions!==null)for(const l of t.transitions)(l.is_global||r)&&n.push(l);for(var e=t.first;e!==null;){var a=e.next,s=(e.f&At)!==0||(e.f&A)!==0;Ut(e,n,s?r:!1),e=a}}}function jr(t){jt(t,!0)}function jt(t,n){if(t.f&P){L(t)&&B(t),t.f^=P;for(var r=t.first;r!==null;){var e=r.next,a=(r.f&At)!==0||(r.f&A)!==0;jt(r,a?n:!1),r=e}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}let $=!1,et=[];function Bt(){$=!1;const t=et.slice();et=[],an(t)}function Br(t){$||($=!0,queueMicrotask(Bt)),et.push(t)}function Rn(){$&&Bt()}function Vr(){throw new Error("https://svelte.dev/e/invalid_default_snippet")}function Nn(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const Vt=0,Dn=1;let V=!1,G=Vt,q=!1,H=null,C=!1,ct=!1;function yt(t){C=t}function Tt(t){ct=t}let I=[],k=0;let i=null;function W(t){i=t}let u=null;function X(t){u=t}let m=null;function Cn(t){m=t}let h=null,E=0,g=null;function kn(t){g=t}let Gt=1,at=0,S=!1,o=null;function Kt(){return++Gt}function vt(){return!lt||o!==null&&o.l===null}function L(t){var p;var n=t.f;if(n&x)return!0;if(n&j){var r=t.deps,e=(n&N)!==0;if(r!==null){var a,s,l=(n&K)!==0,f=e&&u!==null&&!S,_=r.length;if(l||f){for(a=0;a<_;a++)s=r[a],(l||!((p=s==null?void 0:s.reactions)!=null&&p.includes(t)))&&(s.reactions??(s.reactions=[])).push(t);l&&(t.f^=K)}for(a=0;a<_;a++)if(s=r[a],L(s)&&bt(s),s.wv>t.wv)return!0}(!e||u!==null&&!S)&&T(t,d)}return!1}function Pn(t,n){for(var r=n;r!==null;){if(r.f&tt)try{r.fn(t);return}catch{r.f^=tt}r=r.parent}throw V=!1,t}function bn(t){return(t.f&b)===0&&(t.parent===null||(t.parent.f&tt)===0)}function z(t,n,r,e){if(V){if(r===null&&(V=!1),bn(n))throw t;return}r!==null&&(V=!0);{Pn(t,n);return}}function $t(t){var ht;var n=h,r=E,e=g,a=i,s=S,l=m,f=o,_=t.f;h=null,E=0,g=null,i=_&(A|Z)?null:t,S=!C&&(_&N)!==0,m=null,o=t.ctx,at++;try{var p=(0,t.fn)(),c=t.deps;if(h!==null){var v;if(Y(t,E),c!==null&&E>0)for(c.length=E+h.length,v=0;v<h.length;v++)c[E+v]=h[v];else t.deps=c=h;if(!S)for(v=E;v<c.length;v++)((ht=c[v]).reactions??(ht.reactions=[])).push(t)}else c!==null&&E<c.length&&(Y(t,E),c.length=E);return p}finally{h=n,E=r,g=e,i=a,S=s,m=l,o=f}}function Fn(t,n){let r=n.reactions;if(r!==null){var e=nn.call(r,t);if(e!==-1){var a=r.length-1;a===0?r=n.reactions=null:(r[e]=r[a],r.pop())}}r===null&&n.f&w&&(h===null||!h.includes(n))&&(T(n,j),n.f&(N|K)||(n.f^=K),Y(n,0))}function Y(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)Fn(t,r[e])}function B(t){var n=t.f;if(!(n&b)){T(t,d);var r=u,e=o;u=t;try{n&ut?In(t):Ht(t),qt(t),Mt(t);var a=$t(t);t.teardown=typeof a=="function"?a:null,t.wv=Gt;var s=t.deps,l;Q&&tn&&t.f&x}catch(f){z(f,t,r,e||t.ctx)}finally{u=r}}}function Wt(){if(k>1e3){k=0;try{cn()}catch(t){if(H!==null)z(t,H,null);else throw t}}k++}function Xt(t){var n=t.length;if(n!==0){Wt();var r=C;C=!0;try{for(var e=0;e<n;e++){var a=t[e];a.f&d||(a.f^=d);var s=[];Zt(a,s),Ln(s)}}finally{C=r}}}function Ln(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(b|P)))try{L(e)&&(B(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Yt(e):e.fn=null))}catch(a){z(a,e,null,e.ctx)}}}function Mn(){if(q=!1,k>1001)return;const t=I;I=[],Xt(t),q||(k=0,H=null)}function J(t){G===Vt&&(q||(q=!0,queueMicrotask(Mn))),H=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(Z|A)){if(!(r&d))return;n.f^=d}}I.push(n)}function Zt(t,n){var r=t.first,e=[];t:for(;r!==null;){var a=r.f,s=(a&A)!==0,l=s&&(a&d)!==0,f=r.next;if(!l&&!(a&P))if(a&U){if(s)r.f^=d;else try{L(r)&&B(r)}catch(v){z(v,r,null,r.ctx)}var _=r.first;if(_!==null){r=_;continue}}else a&mt&&e.push(r);if(f===null){let v=r.parent;for(;v!==null;){if(t===v)break t;var p=v.next;if(p!==null){r=p;continue t}v=v.parent}}r=f}for(var c=0;c<e.length;c++)_=e[c],n.push(_),Zt(_,n)}function zt(t){var n=G,r=I;try{Wt();const a=[];G=Dn,I=a,q=!1,Xt(r);var e=t==null?void 0:t();return Rn(),(I.length>0||a.length>0)&&zt(),k=0,H=null,e}finally{G=n,I=r}}async function Gr(){await Promise.resolve(),zt()}function pt(t){var c;var n=t.f,r=(n&w)!==0;if(r&&n&b){var e=Pt(t);return ft(t),e}if(i!==null){m!==null&&m.includes(t)&&vn();var a=i.deps;t.rv<at&&(t.rv=at,h===null&&a!==null&&a[E]===t?E++:h===null?h=[t]:h.push(t),g!==null&&u!==null&&u.f&d&&!(u.f&A)&&g.includes(t)&&(T(u,x),J(u)))}else if(r&&t.deps===null)for(var s=t,l=s.parent,f=s;l!==null;)if(l.f&w){var _=l;f=_,l=_.parent}else{var p=l;(c=p.deriveds)!=null&&c.includes(f)||(p.deriveds??(p.deriveds=[])).push(f);break}return r&&(s=t,L(s)&&bt(s)),t.v}function Jt(t){const n=i;try{return i=null,t()}finally{i=n}}const qn=-7169;function T(t,n){t.f=t.f&qn|n}function Kr(t){return Qt().get(t)}function $r(t,n){return Qt().set(t,n),n}function Qt(t){return o===null&&Nn(),o.c??(o.c=new Map(Hn(o)||void 0))}function Hn(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function Wr(t,n=1){var r=pt(t),e=n===1?r++:r--;return it(t,r),e}function Xr(t,n=!1,r){o={p:o,c:null,e:null,m:!1,s:t,x:null,l:null},lt&&!n&&(o.l={s:null,u:null,r1:[],r2:ot(!1)})}function Zr(t){const n=o;if(n!==null){const l=n.e;if(l!==null){var r=u,e=i;n.e=null;try{for(var a=0;a<l.length;a++){var s=l[a];X(s.effect),W(s.reaction),Lt(s.fn)}}finally{X(r),W(e)}}o=n.p,n.m=!0}return{}}function zr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(Et in t)st(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&Et in r&&st(r)}}}function st(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{st(t[e],n)}catch{}const r=en(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=rn(r);for(let a in e){const s=e[a].get;if(s)try{s.call(t)}catch{}}}}}export{Lr as $,jn as A,dn as B,Or as C,gr as D,At as E,jr as F,Br as G,St as H,P as I,u as J,er as K,yn as L,ar as M,Ut as N,kr as O,On as P,En as Q,i as R,lr as S,wn as T,ot as U,ur as V,Et as W,o as X,Nn as Y,Fr as Z,wr as _,Zr as a,an as a0,pt as a1,Wn as a2,mn as a3,$n as a4,qr as a5,Hr as a6,it as a7,mr as a8,Kr as a9,or as aA,ir as aB,_r as aC,Pr as aD,cr as aE,zt as aF,Bn as aG,Gr as aH,Tr as aI,zn as aJ,rn as aK,ln as aL,hn as aM,dr as aN,Er as aO,Rr as aP,Qn as aQ,Mr as aR,Vr as aS,Tn as aT,vt as aU,Jn as aV,Ar as aW,wt as aX,yr as aa,Sr as ab,$r as ac,ut as ad,sn as ae,Kn as af,hr as ag,W as ah,X as ai,vr as aj,pr as ak,Vn as al,Gn as am,nr as an,dt as ao,rr as ap,en as aq,br as ar,tr as as,Xn as at,fr as au,It as av,Wr as aw,Zn as ax,A as ay,Z as az,xr as b,Nr as c,xn as d,Ur as e,Dr as f,y as g,O as h,Sn as i,Lt as j,_t as k,zr as l,un as m,D as n,Nt as o,Xr as p,M as q,Ir as r,Cr as s,Yr as t,Jt as u,rt as v,R as w,nt as x,sr as y,Un as z};
