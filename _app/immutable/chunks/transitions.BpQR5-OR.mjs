import{a4 as q,aj as z,ak as B,ad as M,e as P,I as R,R as U,af as x,n as k,al as G,am as y,X as C,an as K,ao as W,ap as X}from"./utils.VG-PDj_W.mjs";import{b as g}from"./disclose-version.CRct7bnb.mjs";const D=()=>performance.now(),h={tick:r=>requestAnimationFrame(r),now:()=>D(),tasks:new Set};function L(){const r=h.now();h.tasks.forEach(a=>{a.c(r)||(h.tasks.delete(a),a.f())}),h.tasks.size!==0&&h.tick(L)}function H(r){let a;return h.tasks.size===0&&h.tick(L),{promise:new Promise(i=>{h.tasks.add(a={c:r,f:i})}),abort(){h.tasks.delete(a)}}}function N(r,a){r.dispatchEvent(new CustomEvent(a))}function J(r){if(r==="float")return"cssFloat";if(r==="offset")return"cssOffset";if(r.startsWith("--"))return r;const a=r.split("-");return a.length===1?a[0]:a[0]+a.slice(1).map(i=>i[0].toUpperCase()+i.slice(1)).join("")}function S(r){const a={},i=r.split(";");for(const t of i){const[o,d]=t.split(":");if(!o||d===void 0)break;const c=J(o.trim());a[c]=d.trim()}return a}const Q=r=>r;function Z(r,a,i,t){var o=(r&K)!==0,d=(r&W)!==0,c=o&&d,m=(r&G)!==0,p=c?"both":o?"in":"out",l,v=a.inert,n,e;function b(){var s=X,w=R;y(null),C(null);try{return l??(l=i()(a,(t==null?void 0:t())??{},{direction:p}))}finally{y(s),C(w)}}var T={is_global:m,in(){var s;if(a.inert=v,!o){e==null||e.abort(),(s=e==null?void 0:e.reset)==null||s.call(e);return}d||n==null||n.abort(),N(a,"introstart"),n=F(a,b(),e,1,()=>{N(a,"introend"),n==null||n.abort(),n=l=void 0})},out(s){if(!d){s==null||s(),l=void 0;return}a.inert=!0,N(a,"outrostart"),e=F(a,b(),n,0,()=>{N(a,"outroend"),s==null||s()})},stop:()=>{n==null||n.abort(),e==null||e.abort()}},f=R;if((f.transitions??(f.transitions=[])).push(T),o&&g){var _=m;if(!_){for(var u=f.parent;u&&u.f&q;)for(;(u=u.parent)&&!(u.f&z););_=!u||(u.f&B)!==0}_&&M(()=>{P(()=>T.in())})}}function F(r,a,i,t,o){var d=t===1;if(U(a)){var c,m=!1;return x(()=>{if(!m){var _=a({direction:d?"in":"out"});c=F(r,_,i,t,o)}}),{abort:()=>{m=!0,c==null||c.abort()},deactivate:()=>c.deactivate(),reset:()=>c.reset(),t:()=>c.t()}}if(i==null||i.deactivate(),!(a!=null&&a.duration))return o(),{abort:k,deactivate:k,reset:k,t:()=>t};const{delay:p=0,css:l,tick:v,easing:n=Q}=a;var e=[];if(d&&i===void 0&&(v&&v(0,1),l)){var b=S(l(0,1));e.push(b,b)}var T=()=>1-t,f=r.animate(e,{duration:p});return f.onfinish=()=>{var _=(i==null?void 0:i.t())??1-t;i==null||i.abort();var u=t-_,s=a.duration*Math.abs(u),w=[];if(s>0){if(l)for(var I=Math.ceil(s/16.666666666666668),A=0;A<=I;A+=1){var O=_+u*n(A/I),j=l(O,1-O);w.push(S(j))}T=()=>{var E=f.currentTime;return _+u*n(E/s)},v&&H(()=>{if(f.playState!=="running")return!1;var E=T();return v(E,1-E),!0})}f=r.animate(w,{duration:s,fill:"forwards"}),f.onfinish=()=>{T=()=>t,v==null||v(t,1-t),o()}},{abort:()=>{f&&(f.cancel(),f.effect=null,f.onfinish=k)},deactivate:()=>{o=k},reset:()=>{t===0&&(v==null||v(1,0))},t:()=>T()}}export{Z as t};