import{s as l,F as m,n,o as c}from"./scheduler.Knsie03R.mjs";import{S as u,i as _,e as d,c as p,C as f,K as o,g as h,d as v}from"./index.cEMZ7GLX.mjs";import{t as y}from"./store.Hvpztf4R.mjs";import{_ as g}from"./preload-helper.0HuHagjb.mjs";async function E(){return(await g(()=>import("./register.UTOCXelZ.mjs").then(a=>a.M),__vite__mapDeps([0,1]),import.meta.url)).default()}function M(a){let e,r="<media-outlet></media-outlet>",s;return{c(){e=d("media-player"),e.innerHTML=r,this.h()},l(t){e=p(t,"MEDIA-PLAYER",{src:!0,controls:!0,"data-svelte-h":!0}),f(e)!=="svelte-hgzlxb"&&(e.innerHTML=r),this.h()},h(){m(e.src,s="/music/Cranky.mp3")||o(e,"src",s),o(e,"controls","")},m(t,i){h(t,e,i)},p:n,i:n,o:n,d(t){t&&v(e)}}}function P(a){return E(),y.set("music"),c(()=>{const e=document.querySelector("media-player");e==null||e.addEventListener("can-play",r=>{e.currentTime=5})}),[]}class x extends u{constructor(e){super(),_(this,e,P,M,l,{})}}const b=Object.freeze(Object.defineProperty({__proto__:null,default:x},Symbol.toStringTag,{value:"Module"}));export{x as P,b as _};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["./register.UTOCXelZ.mjs","./preload-helper.0HuHagjb.mjs"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
