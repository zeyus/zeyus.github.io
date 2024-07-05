var g=Object.defineProperty;var a=(r,t,e)=>t in r?g(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var h=(r,t,e)=>a(r,typeof t!="symbol"?t+"":t,e);import{i as f,d as p,D as d,e as v,l as L,f as S,g as m,h as w,j as y}from"./register.3VdNnJgm.mjs";import{VideoProvider as E}from"./provider.BE1JUn__.mjs";import{a as j}from"./provider.BlFwU3Pk.mjs";class H{constructor(t,e,i){this.Bh=t,this.ph=e,this.jf=i,this.Ch()}async Ch(){const t={onLoadStart:this.ge.bind(this),onLoaded:this.ue.bind(this),onLoadError:this.Dh.bind(this)};let e=await C(this.Bh,t);if(f(e)&&!p(this.Bh)&&(e=await D(this.Bh,t)),!e)return null;if(!e.isSupported()){const i="[vidstack]: `hls.js` is not supported in this environment";return this.ph.player.dispatchEvent(new d("hls-unsupported")),this.ph.delegate.p("error",{detail:{message:i,code:4}}),null}return e}ge(){this.ph.player.dispatchEvent(new d("hls-lib-load-start"))}ue(t){this.ph.player.dispatchEvent(new d("hls-lib-loaded",{detail:t})),this.jf(t)}Dh(t){const e=v(t);this.ph.player.dispatchEvent(new d("hls-lib-load-error",{detail:e})),this.ph.delegate.p("error",{detail:{message:e.message,code:4}})}}async function D(r,t={}){var e,i,o,n,u;if(!f(r)){if((e=t.onLoadStart)==null||e.call(t),r.prototype&&r.prototype!==Function)return(i=t.onLoaded)==null||i.call(t,r),r;try{const s=(o=await r())==null?void 0:o.default;if(s&&s.isSupported)(n=t.onLoaded)==null||n.call(t,s);else throw Error("");return s}catch(s){(u=t.onLoadError)==null||u.call(t,s)}}}async function C(r,t={}){var e,i,o;if(p(r)){(e=t.onLoadStart)==null||e.call(t);try{if(await L(r),!S(window.Hls))throw Error("");const n=window.Hls;return(i=t.onLoaded)==null||i.call(t,n),n}catch(n){(o=t.onLoadError)==null||o.call(t,n)}}}const $="https://cdn.jsdelivr.net";class B extends E{constructor(){super(...arguments);h(this,"$$PROVIDER_TYPE","HLS");h(this,"mh",null);h(this,"od",new j(this.video));h(this,"lh",`${$}/npm/hls.js@^1.0.0/dist/hls.min.js`)}get ctor(){return this.mh}get instance(){return this.od.instance}get type(){return"hls"}get canLiveSync(){return!0}get config(){return this.od.nh}set config(e){this.od.nh=e}get library(){return this.lh}set library(e){this.lh=e}preconnect(){p(this.lh)&&w(this.lh)}setup(e){super.setup(e),new H(this.lh,e,i=>{this.mh=i,this.od.setup(i,e),e.delegate.p("provider-setup",{detail:this});const o=y(e.$store.source);o&&this.loadSource(o)})}async loadSource({src:e}){var i;p(e)&&((i=this.od.instance)==null||i.loadSource(e))}onInstance(e){const i=this.od.instance;return i&&e(i),this.od.oh.add(e),()=>this.od.oh.delete(e)}destroy(){this.od.Jg()}}h(B,"supported",m());export{B as HLSProvider};
