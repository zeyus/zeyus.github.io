import{g as c,m as f,n as o,h as a,j as b,k as l}from"./utils.VG-PDj_W.mjs";let n=!1;function _(e,s,r){const u=r[s]??(r[s]={store:null,source:f(void 0),unsubscribe:o});if(u.store!==e)if(u.unsubscribe(),u.store=e??null,e==null)u.source.v=void 0,u.unsubscribe=o;else{var t=!0;u.unsubscribe=a(e,i=>{t?u.source.v=i:l(u.source,i)}),t=!1}return b(u.source)}function g(){const e={};return c(()=>{for(var s in e)e[s].unsubscribe()}),e}function p(e,s,r){return e.set(r),s}function v(e){var s=n;try{return n=!1,[e(),n]}finally{n=s}}export{_ as a,p as b,v as c,g as s};
