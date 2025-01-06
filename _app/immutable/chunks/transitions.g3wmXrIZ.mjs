import{H as z,a7 as B,a8 as M,e as P,u as U,a6 as S,a9 as j,S as x,w,aa as G,ab as y,ac as C,ad as H,ae as K,af as W}from"./runtime.jmfZKiTF.mjs";import{a as g}from"./render.Dg16rCjN.mjs";const D=()=>performance.now(),h={tick:r=>requestAnimationFrame(r),now:()=>D(),tasks:new Set};function L(){const r=h.now();h.tasks.forEach(a=>{a.c(r)||(h.tasks.delete(a),a.f())}),h.tasks.size!==0&&h.tick(L)}function J(r){let a;return h.tasks.size===0&&h.tick(L),{promise:new Promise(i=>{h.tasks.add(a={c:r,f:i})}),abort(){h.tasks.delete(a)}}}function k(r,a){r.dispatchEvent(new CustomEvent(a))}function Q(r){if(r==="float")return"cssFloat";if(r==="offset")return"cssOffset";if(r.startsWith("--"))return r;const a=r.split("-");return a.length===1?a[0]:a[0]+a.slice(1).map(i=>i[0].toUpperCase()+i.slice(1)).join("")}function R(r){const a={},i=r.split(";");for(const t of i){const[v,d]=t.split(":");if(!v||d===void 0)break;const c=Q(v.trim());a[c]=d.trim()}return a}const V=r=>r;function Z(r,a,i,t){var v=(r&H)!==0,d=(r&K)!==0,c=v&&d,b=(r&G)!==0,A=c?"both":v?"in":"out",l,o=a.inert,n,e;function m(){var s=W,E=S;y(null),C(null);try{return l??(l=i()(a,(t==null?void 0:t())??{},{direction:A}))}finally{y(s),C(E)}}var T={is_global:b,in(){var s;if(a.inert=o,!v){e==null||e.abort(),(s=e==null?void 0:e.reset)==null||s.call(e);return}d||n==null||n.abort(),k(a,"introstart"),n=p(a,m(),e,1,()=>{k(a,"introend"),n==null||n.abort(),n=l=void 0})},out(s){if(!d){s==null||s(),l=void 0;return}a.inert=!0,k(a,"outrostart"),e=p(a,m(),n,0,()=>{k(a,"outroend"),s==null||s()})},stop:()=>{n==null||n.abort(),e==null||e.abort()}},f=S;if((f.transitions??(f.transitions=[])).push(T),v&&g){var _=b;if(!_){for(var u=f.parent;u&&u.f&z;)for(;(u=u.parent)&&!(u.f&B););_=!u||(u.f&M)!==0}_&&P(()=>{U(()=>T.in())})}}function p(r,a,i,t,v){var d=t===1;if(j(a)){var c,b=!1;return x(()=>{if(!b){var _=a({direction:d?"in":"out"});c=p(r,_,i,t,v)}}),{abort:()=>{b=!0,c==null||c.abort()},deactivate:()=>c.deactivate(),reset:()=>c.reset(),t:()=>c.t()}}if(i==null||i.deactivate(),!(a!=null&&a.duration))return v(),{abort:w,deactivate:w,reset:w,t:()=>t};const{delay:A=0,css:l,tick:o,easing:n=V}=a;var e=[];if(d&&i===void 0&&(o&&o(0,1),l)){var m=R(l(0,1));e.push(m,m)}var T=()=>1-t,f=r.animate(e,{duration:A});return f.onfinish=()=>{var _=(i==null?void 0:i.t())??1-t;i==null||i.abort();var u=t-_,s=a.duration*Math.abs(u),E=[];if(s>0){if(l)for(var I=Math.ceil(s/16.666666666666668),F=0;F<=I;F+=1){var O=_+u*n(F/I),q=l(O,1-O);E.push(R(q))}T=()=>{var N=f.currentTime;return _+u*n(N/s)},o&&J(()=>{if(f.playState!=="running")return!1;var N=T();return o(N,1-N),!0})}f=r.animate(E,{duration:s,fill:"forwards"}),f.onfinish=()=>{T=()=>t,o==null||o(t,1-t),v()}},{abort:()=>{f&&(f.cancel(),f.effect=null,f.onfinish=w)},deactivate:()=>{v=w},reset:()=>{t===0&&(o==null||o(1,0))},t:()=>T()}}export{Z as t};
