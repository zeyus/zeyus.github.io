import{S as _,i as d,s as p,k as l,l as c,m,h as n,a3 as f,a4 as u,b as h,F as y,L as o,o as E}from"../chunks/index.edaf9815.mjs";import{t as v}from"../chunks/store.37975706.mjs";import{_ as L}from"../chunks/preload-helper.41c905a7.mjs";async function A(){return(await L(()=>import("../chunks/register-C7DORXC6.8e4df76a.mjs").then(r=>r.J),["..\\chunks\\register-C7DORXC6.8e4df76a.mjs","..\\chunks\\preload-helper.41c905a7.mjs"],import.meta.url)).default()}function P(r){let e,t,i;return{c(){e=l("media-player"),t=l("media-outlet"),this.h()},l(a){e=c(a,"MEDIA-PLAYER",{src:!0,controls:!0});var s=m(e);t=c(s,"MEDIA-OUTLET",{}),m(t).forEach(n),s.forEach(n),this.h()},h(){f(e.src,i="/music/Cranky.mp3")||u(e,"src",i),u(e,"controls","")},m(a,s){h(a,e,s),y(e,t)},p:o,i:o,o,d(a){a&&n(e)}}}function T(r){return A(),v.set("music"),E(()=>{const e=document.querySelector("media-player");e==null||e.addEventListener("can-play",t=>{e.currentTime=5})}),[]}class D extends _{constructor(e){super(),d(this,e,T,P,p,{})}}export{D as default};
