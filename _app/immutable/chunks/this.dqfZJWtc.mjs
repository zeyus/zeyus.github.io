import{d as N,h,b as R,E as k,K as L,L as g,M as O,O as _,P as d,e as E,i as A,g as o,U as q,Q as v,R as x,m as D,S as F,T as M}from"./runtime.C2dwlhJ5.mjs";function U(a,f,e=!1){h&&R();var i=a,r=null,s=null,c=q,b=e?k:0,l=!1;const y=(n,t=!0)=>{l=!0,u(t,n)},u=(n,t)=>{if(c===(c=n))return;let T=!1;if(h){const I=i.data===L;!!c===I&&(i=g(),O(i),_(!1),T=!0)}c?(r?d(r):t&&(r=E(()=>t(i))),s&&A(s,()=>{s=null})):(s?d(s):t&&(s=E(()=>t(i))),r&&A(r,()=>{r=null})),T&&_(!0)};N(()=>{l=!1,f(y),l||u(null,null)},b),h&&(i=o)}function S(a,f){return a===f||(a==null?void 0:a[M])===f}function Y(a={},f,e,i){return v(()=>{var r,s;return x(()=>{r=s,s=[],D(()=>{a!==e(...s)&&(f(a,...s),r&&S(e(...r),a)&&f(null,...r))})}),()=>{F(()=>{s&&S(e(...s),a)&&f(null,...s)})}}),a}export{Y as b,U as i};
