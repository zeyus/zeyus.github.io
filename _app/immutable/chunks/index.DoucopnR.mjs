import{N as f,O as m,J as w,m as q}from"./utils.RFpxasSs.mjs";const a=[];function x(s,u){return{subscribe:z(s,u).subscribe}}function z(s,u=f){let n=null;const r=new Set;function i(t){if(q(s,t)&&(s=t,n)){const o=!a.length;for(const e of r)e[1](),a.push(e,s);if(o){for(let e=0;e<a.length;e+=2)a[e][0](a[e+1]);a.length=0}}}function l(t){i(t(s))}function b(t,o=f){const e=[t,o];return r.add(e),r.size===1&&(n=u(i,l)||f),t(s),()=>{r.delete(e),r.size===0&&n&&(n(),n=null)}}return{set:i,update:l,subscribe:b}}function B(s,u,n){const r=!Array.isArray(s),i=r?[s]:s;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const l=u.length<2;return x(n,(b,t)=>{let o=!1;const e=[];let p=0,d=f;const y=()=>{if(p)return;d();const c=u(r?e[0]:e,b,t);l?b(c):d=typeof c=="function"?c:f},_=i.map((c,g)=>m(c,h=>{e[g]=h,p&=~(1<<g),o&&y()},()=>{p|=1<<g}));return o=!0,y(),function(){w(_),d(),o=!1}})}export{B as d,x as r,z as w};
