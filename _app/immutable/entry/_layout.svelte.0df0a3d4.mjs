import{_ as d}from"../chunks/preload-helper.41c905a7.mjs";import{S as C,i as P,s as T,C as b,a as v,H as D,k as H,q as O,D as y,h as f,c as E,E as A,l as I,m as R,r as V,b as h,F as j,u as q,G as w,I as z,J as M,g as S,d as $,K as g}from"../chunks/index.f584ad79.mjs";import{p as k}from"../chunks/stores.59ad4219.mjs";import{t as F}from"../chunks/store.05f392ee.mjs";const G=(a,r)=>{const n=document.createElement("nav");return a.forEach(l=>{const o=document.createElement("a");o.href=l.path,o.textContent=l.name,l.url===r?(o.classList.add("active"),o.ariaCurrent="true"):(o.classList.add("inactive"),o.ariaCurrent="false"),n.appendChild(o)}),n};function J(a){let r,n,l,o=a[1].innerHTML+"",u,m,c,p,_;document.title=r=a[0]+" - zeyus dot com";const i=a[3].default,t=b(i,a,a[2],null);return{c(){n=v(),l=new D(!1),u=v(),m=H("h1"),c=O(a[0]),p=v(),t&&t.c(),this.h()},l(e){y("svelte-pf2g5r",document.head).forEach(f),n=E(e),l=A(e,!1),u=E(e),m=I(e,"H1",{});var L=R(m);c=V(L,a[0]),L.forEach(f),p=E(e),t&&t.l(e),this.h()},h(){l.a=u},m(e,s){h(e,n,s),l.m(o,e,s),h(e,u,s),h(e,m,s),j(m,c),h(e,p,s),t&&t.m(e,s),_=!0},p(e,[s]){(!_||s&1)&&r!==(r=e[0]+" - zeyus dot com")&&(document.title=r),(!_||s&1)&&q(c,e[0]),t&&t.p&&(!_||s&4)&&w(t,i,e,e[2],_?M(i,e[2],s,null):z(e[2]),null)},i(e){_||(S(t,e),_=!0)},o(e){$(t,e),_=!1},d(e){e&&f(n),e&&l.d(),e&&f(u),e&&f(m),e&&f(p),t&&t.d(e)}}}function K(a,r,n){let l,o;g(a,k,i=>n(4,l=i)),g(a,F,i=>n(0,o=i));let{$$slots:u={},$$scope:m}=r;const c=Object.assign({"./+page.svelte":()=>d(()=>import("./_page.svelte.ec18a26f.mjs"),["./_page.svelte.ec18a26f.mjs","..\\chunks\\index.f584ad79.mjs","..\\chunks\\store.05f392ee.mjs","..\\chunks\\index.05802cb5.mjs"],import.meta.url),"./music/+page.svelte":()=>d(()=>import("./music-page.svelte.ad2af710.mjs"),["./music-page.svelte.ad2af710.mjs","..\\chunks\\index.f584ad79.mjs","..\\chunks\\store.05f392ee.mjs","..\\chunks\\index.05802cb5.mjs","..\\chunks\\preload-helper.41c905a7.mjs","..\\assets\\_page.d08630e8.css"],import.meta.url),"./projects/+page.svelte":()=>d(()=>import("./projects-page.svelte.ef8812bf.mjs"),["./projects-page.svelte.ef8812bf.mjs","..\\chunks\\index.f584ad79.mjs","..\\chunks\\store.05f392ee.mjs","..\\chunks\\index.05802cb5.mjs"],import.meta.url),"./terminal/+page.svelte":()=>d(()=>import("./terminal-page.svelte.3f003277.mjs"),["./terminal-page.svelte.3f003277.mjs","..\\chunks\\index.f584ad79.mjs","..\\chunks\\store.05f392ee.mjs","..\\chunks\\index.05802cb5.mjs","..\\assets\\_page.642e927f.css"],import.meta.url)});let p=[];for(const i in c){const t=i.split("/").slice(-2)[0],e=t==="."?"home":t,s="/"+(t==="."?"":t);p.push({name:e,path:s})}const _=G(p,l.url.pathname);return a.$$set=i=>{"$$scope"in i&&n(2,m=i.$$scope)},[o,_,m,u]}class W extends C{constructor(r){super(),P(this,r,K,J,T,{})}}export{W as default};