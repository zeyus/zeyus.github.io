var Ke=e=>{throw TypeError(e)};var Ot=(e,t,n)=>t.has(e)||Ke("Cannot "+n);var b=(e,t,n)=>(Ot(e,t,"read from private field"),n?n.call(e):t.get(e)),P=(e,t,n)=>t.has(e)?Ke("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,n);import{aK as C,a5 as O,a4 as N,aJ as Nt}from"./runtime.BzU52yKJ.mjs";import{w as Pe}from"./index.oYxekxRb.mjs";import{o as He}from"./index-client.CToGXzFW.mjs";new URL("sveltekit-internal://");function jt(e,t){return e==="/"||t==="ignore"?e:t==="never"?e.endsWith("/")?e.slice(0,-1):e:t==="always"&&!e.endsWith("/")?e+"/":e}function $t(e){return e.split("%25").map(decodeURI).join("%25")}function Dt(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}function Ee({href:e}){return e.split("#")[0]}function Ft(e,t,n,r=!1){const a=new URL(e);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(i,s){if(s==="get"||s==="getAll"||s==="has")return f=>(n(f),i[s](f));t();const c=Reflect.get(i,s);return typeof c=="function"?c.bind(i):c}}),enumerable:!0,configurable:!0});const o=["href","pathname","search","toString","toJSON"];r&&o.push("hash");for(const i of o)Object.defineProperty(a,i,{get(){return t(),e[i]},enumerable:!0,configurable:!0});return a}const Vt="/__data.json",Bt=".html__data.json";function Gt(e){return e.endsWith(".html")?e.replace(/\.html$/,Bt):e.replace(/\/$/,"")+Vt}function Mt(...e){let t=5381;for(const n of e)if(typeof n=="string"){let r=n.length;for(;r;)t=t*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)t=t*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(t>>>0).toString(36)}function qt(e){const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n.buffer}const it=window.fetch;window.fetch=(e,t)=>((e instanceof Request?e.method:(t==null?void 0:t.method)||"GET")!=="GET"&&H.delete(Ce(e)),it(e,t));const H=new Map;function Kt(e,t){const n=Ce(e,t),r=document.querySelector(n);if(r!=null&&r.textContent){let{body:a,...o}=JSON.parse(r.textContent);const i=r.getAttribute("data-ttl");return i&&H.set(n,{body:a,init:o,ttl:1e3*Number(i)}),r.getAttribute("data-b64")!==null&&(a=qt(a)),Promise.resolve(new Response(a,o))}return window.fetch(e,t)}function Ht(e,t,n){if(H.size>0){const r=Ce(e,n),a=H.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);H.delete(r)}}return window.fetch(t,n)}function Ce(e,t){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(t!=null&&t.headers||t!=null&&t.body){const a=[];t.headers&&a.push([...new Headers(t.headers)].join(",")),t.body&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&a.push(t.body),r+=`[data-hash="${Mt(...a)}"]`}return r}const Wt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function Yt(e){const t=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${zt(e).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return t.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(o)return t.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,f)=>{if(f%2){if(c.startsWith("x+"))return Re(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return Re(String.fromCharCode(...c.slice(2).split("-").map(l=>parseInt(l,16))));const d=Wt.exec(c),[,h,y,u,g]=d;return t.push({name:u,matcher:g,optional:!!h,rest:!!y,chained:y?f===1&&i[0]==="":!1}),y?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return Re(c)}).join("")}).join("")}/?$`),params:t}}function Jt(e){return!/^\([^)]+\)$/.test(e)}function zt(e){return e.slice(1).split("/").filter(Jt)}function Xt(e,t,n){const r={},a=e.slice(1),o=a.filter(s=>s!==void 0);let i=0;for(let s=0;s<t.length;s+=1){const c=t[s];let f=a[s-i];if(c.chained&&c.rest&&i&&(f=a.slice(s-i,s+1).filter(d=>d).join("/"),i=0),f===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](f)){r[c.name]=f;const d=t[s+1],h=a[s+1];d&&!d.rest&&d.optional&&h&&c.chained&&(i=0),!d&&!h&&Object.keys(r).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return r}function Re(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Zt({nodes:e,server_loads:t,dictionary:n,matchers:r}){const a=new Set(t);return Object.entries(n).map(([s,[c,f,d]])=>{const{pattern:h,params:y}=Yt(s),u={id:s,exec:g=>{const l=h.exec(g);if(l)return Xt(l,y,r)},errors:[1,...d||[]].map(g=>e[g]),layouts:[0,...f||[]].map(i),leaf:o(c)};return u.errors.length=u.layouts.length=Math.max(u.errors.length,u.layouts.length),u});function o(s){const c=s<0;return c&&(s=~s),[c,e[s]]}function i(s){return s===void 0?s:[a.has(s),e[s]]}}function ct(e,t=JSON.parse){try{return t(sessionStorage[e])}catch{}}function We(e,t,n=JSON.stringify){const r=n(t);try{sessionStorage[e]=r}catch{}}var nt;const x=((nt=globalThis.__sveltekit_1chd3pu)==null?void 0:nt.base)??"";var rt;const Qt=((rt=globalThis.__sveltekit_1chd3pu)==null?void 0:rt.assets)??x,en="1736450004724",lt="sveltekit:snapshot",ft="sveltekit:scroll",ut="sveltekit:states",tn="sveltekit:pageurl",B="sveltekit:history",J="sveltekit:navigation",fe={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},le=location.origin;function dt(e){if(e instanceof URL)return e;let t=document.baseURI;if(!t){const n=document.getElementsByTagName("base");t=n.length?n[0].href:document.URL}return new URL(e,t)}function Oe(){return{x:pageXOffset,y:pageYOffset}}function V(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const Ye={...fe,"":fe.hover};function ht(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function pt(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=ht(e)}}function Le(e,t,n){let r;try{r=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const a=e instanceof SVGAElement?e.target.baseVal:e.target,o=!r||!!a||we(r,t,n)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),i=(r==null?void 0:r.origin)===le&&e.hasAttribute("download");return{url:r,external:o,target:a,download:i}}function ue(e){let t=null,n=null,r=null,a=null,o=null,i=null,s=e;for(;s&&s!==document.documentElement;)r===null&&(r=V(s,"preload-code")),a===null&&(a=V(s,"preload-data")),t===null&&(t=V(s,"keepfocus")),n===null&&(n=V(s,"noscroll")),o===null&&(o=V(s,"reload")),i===null&&(i=V(s,"replacestate")),s=ht(s);function c(f){switch(f){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Ye[r??"off"],preload_data:Ye[a??"off"],keepfocus:c(t),noscroll:c(n),reload:c(o),replace_state:c(i)}}function Je(e){const t=Pe(e);let n=!0;function r(){n=!0,t.update(i=>i)}function a(i){n=!1,t.set(i)}function o(i){let s;return t.subscribe(c=>{(s===void 0||n&&c!==s)&&i(s=c)})}return{notify:r,set:a,subscribe:o}}const gt={v:()=>{}};function nn(){const{set:e,subscribe:t}=Pe(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${Qt}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const i=(await a.json()).version!==en;return i&&(e(!0),gt.v(),clearTimeout(n)),i}catch{return!1}}return{subscribe:t,check:r}}function we(e,t,n){return e.origin!==le||!e.pathname.startsWith(t)?!0:n?!(e.pathname===t+"/"||e.protocol==="file:"&&e.pathname.replace(/\/[^/]+\.html?$/,"")===t):!1}function ze(e){const t=an(e),n=new ArrayBuffer(t.length),r=new DataView(n);for(let a=0;a<n.byteLength;a++)r.setUint8(a,t.charCodeAt(a));return n}const rn="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function an(e){e.length%4===0&&(e=e.replace(/==?$/,""));let t="",n=0,r=0;for(let a=0;a<e.length;a++)n<<=6,n|=rn.indexOf(e[a]),r+=6,r===24&&(t+=String.fromCharCode((n&16711680)>>16),t+=String.fromCharCode((n&65280)>>8),t+=String.fromCharCode(n&255),n=r=0);return r===12?(n>>=4,t+=String.fromCharCode(n)):r===18&&(n>>=2,t+=String.fromCharCode((n&65280)>>8),t+=String.fromCharCode(n&255)),t}const on=-1,sn=-2,cn=-3,ln=-4,fn=-5,un=-6;function dn(e,t){if(typeof e=="number")return a(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const n=e,r=Array(n.length);function a(o,i=!1){if(o===on)return;if(o===cn)return NaN;if(o===ln)return 1/0;if(o===fn)return-1/0;if(o===un)return-0;if(i)throw new Error("Invalid input");if(o in r)return r[o];const s=n[o];if(!s||typeof s!="object")r[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],f=t==null?void 0:t[c];if(f)return r[o]=f(a(s[1]));switch(c){case"Date":r[o]=new Date(s[1]);break;case"Set":const d=new Set;r[o]=d;for(let u=1;u<s.length;u+=1)d.add(a(s[u]));break;case"Map":const h=new Map;r[o]=h;for(let u=1;u<s.length;u+=2)h.set(a(s[u]),a(s[u+1]));break;case"RegExp":r[o]=new RegExp(s[1],s[2]);break;case"Object":r[o]=Object(s[1]);break;case"BigInt":r[o]=BigInt(s[1]);break;case"null":const y=Object.create(null);r[o]=y;for(let u=1;u<s.length;u+=2)y[s[u]]=a(s[u+1]);break;case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"BigInt64Array":case"BigUint64Array":{const u=globalThis[c],g=s[1],l=ze(g),p=new u(l);r[o]=p;break}case"ArrayBuffer":{const u=s[1],g=ze(u);r[o]=g;break}default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);r[o]=c;for(let f=0;f<s.length;f+=1){const d=s[f];d!==sn&&(c[f]=a(d))}}else{const c={};r[o]=c;for(const f in s){const d=s[f];c[f]=a(d)}}return r[o]}return a(0)}const mt=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...mt];const hn=new Set([...mt]);[...hn];function pn(e){return e.filter(t=>t!=null)}class ve{constructor(t,n){this.status=t,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${t}`}}toString(){return JSON.stringify(this.body)}}class yt{constructor(t,n){this.status=t,this.location=n}}class Ne extends Error{constructor(t,n,r){super(r),this.status=t,this.text=n}}const gn="x-sveltekit-invalidated",mn="x-sveltekit-trailing-slash";function de(e){return e instanceof ve||e instanceof Ne?e.status:500}function yn(e){return e instanceof Ne?e.text:"Internal Error"}let U,z,Ie;const _n=He.toString().includes("$$")||/function \w+\(\) \{\}/.test(He.toString());var Q,ee,te,ne,re,ae,oe,se,at,ie,ot,ce,st;_n?(U={data:{},form:null,error:null,params:{},route:{id:null},state:{},status:-1,url:new URL("https://example.com")},z={current:null},Ie={current:!1}):(U=new(at=class{constructor(){P(this,Q,C({}));P(this,ee,C(null));P(this,te,C(null));P(this,ne,C({}));P(this,re,C({id:null}));P(this,ae,C({}));P(this,oe,C(-1));P(this,se,C(new URL("https://example.com")))}get data(){return O(b(this,Q))}set data(t){N(b(this,Q),t)}get form(){return O(b(this,ee))}set form(t){N(b(this,ee),t)}get error(){return O(b(this,te))}set error(t){N(b(this,te),t)}get params(){return O(b(this,ne))}set params(t){N(b(this,ne),t)}get route(){return O(b(this,re))}set route(t){N(b(this,re),t)}get state(){return O(b(this,ae))}set state(t){N(b(this,ae),t)}get status(){return O(b(this,oe))}set status(t){N(b(this,oe),t)}get url(){return O(b(this,se))}set url(t){N(b(this,se),t)}},Q=new WeakMap,ee=new WeakMap,te=new WeakMap,ne=new WeakMap,re=new WeakMap,ae=new WeakMap,oe=new WeakMap,se=new WeakMap,at),z=new(ot=class{constructor(){P(this,ie,C(null))}get current(){return O(b(this,ie))}set current(t){N(b(this,ie),t)}},ie=new WeakMap,ot),Ie=new(st=class{constructor(){P(this,ce,C(!1))}get current(){return O(b(this,ce))}set current(t){N(b(this,ce),t)}},ce=new WeakMap,st),gt.v=()=>Ie.current=!0);function wn(e){Object.assign(U,e)}const vn=new Set(["icon","shortcut icon","apple-touch-icon"]),F=ct(ft)??{},X=ct(lt)??{},$={url:Je({}),page:Je({}),navigating:Pe(null),updated:nn()};function je(e){F[e]=Oe()}function bn(e,t){let n=e+1;for(;F[n];)delete F[n],n+=1;for(n=t+1;X[n];)delete X[n],n+=1}function M(e){return location.href=e.href,new Promise(()=>{})}async function _t(){if("serviceWorker"in navigator){const e=await navigator.serviceWorker.getRegistration(x||"/");e&&await e.update()}}function Xe(){}let be,Te,he,j,xe,k;const wt=[],pe=[];let L=null;const vt=new Set,An=new Set,W=new Set;let _={branch:[],error:null,url:null},$e=!1,ge=!1,Ze=!0,Z=!1,q=!1,bt=!1,De=!1,At,I,T,me;const Y=new Set;async function Fn(e,t,n){var a,o,i,s;document.URL!==location.href&&(location.href=location.href),k=e,await((o=(a=e.hooks).init)==null?void 0:o.call(a)),be=Zt(e),j=document.documentElement,xe=t,Te=e.nodes[0],he=e.nodes[1],Te(),he(),I=(i=history.state)==null?void 0:i[B],T=(s=history.state)==null?void 0:s[J],I||(I=T=Date.now(),history.replaceState({...history.state,[B]:I,[J]:T},""));const r=F[I];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await Tn(xe,n):Un(location.href,{replaceState:!0}),Ln()}function kn(){wt.length=0,De=!1}function kt(e){pe.some(t=>t==null?void 0:t.snapshot)&&(X[e]=pe.map(t=>{var n;return(n=t==null?void 0:t.snapshot)==null?void 0:n.capture()}))}function St(e){var t;(t=X[e])==null||t.forEach((n,r)=>{var a,o;(o=(a=pe[r])==null?void 0:a.snapshot)==null||o.restore(n)})}function Qe(){je(I),We(ft,F),kt(T),We(lt,X)}async function Et(e,t,n,r){return K({type:"goto",url:dt(e),keepfocus:t.keepFocus,noscroll:t.noScroll,replace_state:t.replaceState,state:t.state,redirect_count:n,nav_token:r,accept:()=>{t.invalidateAll&&(De=!0)}})}async function Sn(e){if(e.id!==(L==null?void 0:L.id)){const t={};Y.add(t),L={id:e.id,token:t,promise:It({...e,preload:t}).then(n=>(Y.delete(t),n.type==="loaded"&&n.state.error&&(L=null),n))}}return L.promise}async function Ue(e){const t=be.find(n=>n.exec(Ut(e)));t&&await Promise.all([...t.layouts,t.leaf].map(n=>n==null?void 0:n[1]()))}function Rt(e,t,n){var o;_=e.state;const r=document.querySelector("style[data-sveltekit]");r&&r.remove(),Object.assign(U,e.props.page),At=new k.root({target:t,props:{...e.props,stores:$,components:pe},hydrate:n,sync:!1}),St(T);const a={from:null,to:{params:_.params,route:{id:((o=_.route)==null?void 0:o.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};W.forEach(i=>i(a)),ge=!0}function ye({url:e,params:t,branch:n,status:r,error:a,route:o,form:i}){let s="never";if(x&&(e.pathname===x||e.pathname===x+"/"))s="always";else for(const u of n)(u==null?void 0:u.slash)!==void 0&&(s=u.slash);e.pathname=jt(e.pathname,s),e.search=e.search;const c={type:"loaded",state:{url:e,params:t,branch:n,error:a,route:o},props:{constructors:pn(n).map(u=>u.node.component),page:Ge(U)}};i!==void 0&&(c.props.form=i);let f={},d=!U,h=0;for(let u=0;u<Math.max(n.length,_.branch.length);u+=1){const g=n[u],l=_.branch[u];(g==null?void 0:g.data)!==(l==null?void 0:l.data)&&(d=!0),g&&(f={...f,...g.data},d&&(c.props[`data_${h}`]=f),h+=1)}return(!_.url||e.href!==_.url.href||_.error!==a||i!==void 0&&i!==U.form||d)&&(c.props.page={error:a,params:t,route:{id:(o==null?void 0:o.id)??null},state:{},status:r,url:new URL(e),form:i??null,data:d?f:U.data}),c}async function Fe({loader:e,parent:t,url:n,params:r,route:a,server_data_node:o}){var d,h,y;let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},f=await e();if((d=f.universal)!=null&&d.load){let u=function(...l){for(const p of l){const{href:A}=new URL(p,n);c.dependencies.add(A)}};const g={route:new Proxy(a,{get:(l,p)=>(s&&(c.route=!0),l[p])}),params:new Proxy(r,{get:(l,p)=>(s&&c.params.add(p),l[p])}),data:(o==null?void 0:o.data)??null,url:Ft(n,()=>{s&&(c.url=!0)},l=>{s&&c.search_params.add(l)},k.hash),async fetch(l,p){let A;l instanceof Request?(A=l.url,p={body:l.method==="GET"||l.method==="HEAD"?void 0:await l.blob(),cache:l.cache,credentials:l.credentials,headers:[...l.headers].length?l.headers:void 0,integrity:l.integrity,keepalive:l.keepalive,method:l.method,mode:l.mode,redirect:l.redirect,referrer:l.referrer,referrerPolicy:l.referrerPolicy,signal:l.signal,...p}):A=l;const E=new URL(A,n);return s&&u(E.href),E.origin===n.origin&&(A=E.href.slice(n.origin.length)),ge?Ht(A,E.href,p):Kt(A,p)},setHeaders:()=>{},depends:u,parent(){return s&&(c.parent=!0),t()},untrack(l){s=!1;try{return l()}finally{s=!0}}};i=await f.universal.load.call(null,g)??null}return{node:f,loader:e,server:o,universal:(h=f.universal)!=null&&h.load?{type:"data",data:i,uses:c}:null,data:i??(o==null?void 0:o.data)??null,slash:((y=f.universal)==null?void 0:y.trailingSlash)??(o==null?void 0:o.slash)}}function et(e,t,n,r,a,o){if(De)return!0;if(!a)return!1;if(a.parent&&e||a.route&&t||a.url&&n)return!0;for(const i of a.search_params)if(r.has(i))return!0;for(const i of a.params)if(o[i]!==_.params[i])return!0;for(const i of a.dependencies)if(wt.some(s=>s(new URL(i))))return!0;return!1}function Ve(e,t){return(e==null?void 0:e.type)==="data"?e:(e==null?void 0:e.type)==="skip"?t??null:null}function En(e,t){if(!e)return new Set(t.searchParams.keys());const n=new Set([...e.searchParams.keys(),...t.searchParams.keys()]);for(const r of n){const a=e.searchParams.getAll(r),o=t.searchParams.getAll(r);a.every(i=>o.includes(i))&&o.every(i=>a.includes(i))&&n.delete(r)}return n}function tt({error:e,url:t,route:n,params:r}){return{type:"loaded",state:{error:e,url:t,route:n,params:r,branch:[]},props:{page:Ge(U),constructors:[]}}}async function It({id:e,invalidating:t,url:n,params:r,route:a,preload:o}){if((L==null?void 0:L.id)===e)return Y.delete(L.token),L.promise;const{errors:i,layouts:s,leaf:c}=a,f=[...s,c];i.forEach(m=>m==null?void 0:m().catch(()=>{})),f.forEach(m=>m==null?void 0:m[1]().catch(()=>{}));let d=null;const h=_.url?e!==_e(_.url):!1,y=_.route?a.id!==_.route.id:!1,u=En(_.url,n);let g=!1;const l=f.map((m,w)=>{var D;const S=_.branch[w],R=!!(m!=null&&m[0])&&((S==null?void 0:S.loader)!==m[1]||et(g,y,h,u,(D=S.server)==null?void 0:D.uses,r));return R&&(g=!0),R});if(l.some(Boolean)){try{d=await xt(n,l)}catch(m){const w=await G(m,{url:n,params:r,route:{id:e}});return Y.has(o)?tt({error:w,url:n,params:r,route:a}):Ae({status:de(m),error:w,url:n,route:a})}if(d.type==="redirect")return d}const p=d==null?void 0:d.nodes;let A=!1;const E=f.map(async(m,w)=>{var ke;if(!m)return;const S=_.branch[w],R=p==null?void 0:p[w];if((!R||R.type==="skip")&&m[1]===(S==null?void 0:S.loader)&&!et(A,y,h,u,(ke=S.universal)==null?void 0:ke.uses,r))return S;if(A=!0,(R==null?void 0:R.type)==="error")throw R;return Fe({loader:m[1],url:n,params:r,route:a,parent:async()=>{var qe;const Me={};for(let Se=0;Se<w;Se+=1)Object.assign(Me,(qe=await E[Se])==null?void 0:qe.data);return Me},server_data_node:Ve(R===void 0&&m[0]?{type:"skip"}:R??null,m[0]?S==null?void 0:S.server:void 0)})});for(const m of E)m.catch(()=>{});const v=[];for(let m=0;m<f.length;m+=1)if(f[m])try{v.push(await E[m])}catch(w){if(w instanceof yt)return{type:"redirect",location:w.location};if(Y.has(o))return tt({error:await G(w,{params:r,url:n,route:{id:a.id}}),url:n,params:r,route:a});let S=de(w),R;if(p!=null&&p.includes(w))S=w.status??S,R=w.error;else if(w instanceof ve)R=w.body;else{if(await $.updated.check())return await _t(),await M(n);R=await G(w,{params:r,url:n,route:{id:a.id}})}const D=await Rn(m,v,i);return D?ye({url:n,params:r,branch:v.slice(0,D.idx).concat(D.node),status:S,error:R,route:a}):await Tt(n,{id:a.id},R,S)}else v.push(void 0);return ye({url:n,params:r,branch:v,status:200,error:null,route:a,form:t?void 0:null})}async function Rn(e,t,n){for(;e--;)if(n[e]){let r=e;for(;!t[r];)r-=1;try{return{idx:r+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function Ae({status:e,error:t,url:n,route:r}){const a={};let o=null;if(k.server_loads[0]===0)try{const f=await xt(n,[!0]);if(f.type!=="data"||f.nodes[0]&&f.nodes[0].type!=="data")throw 0;o=f.nodes[0]??null}catch{(n.origin!==le||n.pathname!==location.pathname||$e)&&await M(n)}const s=await Fe({loader:Te,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:Ve(o)}),c={node:await he(),loader:he,universal:null,server:null,data:null};return ye({url:n,params:a,branch:[s,c],status:e,error:t,route:null})}function Be(e,t){if(!e||we(e,x,k.hash))return;let n;try{if(n=k.hooks.reroute({url:new URL(e)})??e,typeof n=="string"){const a=new URL(e);k.hash?a.hash=n:a.pathname=n,n=a}}catch{return}const r=Ut(n);for(const a of be){const o=a.exec(r);if(o)return{id:_e(e),invalidating:t,route:a,params:Dt(o),url:e}}}function Ut(e){return $t(k.hash?e.hash.replace(/^#/,"").replace(/[?#].+/,""):e.pathname.slice(x.length))||"/"}function _e(e){return(k.hash?e.hash.replace(/^#/,""):e.pathname)+e.search}function Lt({url:e,type:t,intent:n,delta:r}){let a=!1;const o=Ct(_,n,e,t);r!==void 0&&(o.navigation.delta=r);const i={...o.navigation,cancel:()=>{a=!0,o.reject(new Error("navigation cancelled"))}};return Z||vt.forEach(s=>s(i)),a?null:o}async function K({type:e,url:t,popped:n,keepfocus:r,noscroll:a,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:f=Xe,block:d=Xe}){const h=Be(t,!1),y=Lt({url:t,type:e,delta:n==null?void 0:n.delta,intent:h});if(!y){d();return}const u=I,g=T;f(),Z=!0,ge&&$.navigating.set(z.current=y.navigation),me=c;let l=h&&await It(h);if(!l){if(we(t,x,k.hash))return await M(t);l=await Tt(t,{id:null},await G(new Ne(404,"Not Found",`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=(h==null?void 0:h.url)||t,me!==c)return y.reject(new Error("navigation aborted")),!1;if(l.type==="redirect")if(s>=20)l=await Ae({status:500,error:await G(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return Et(new URL(l.location,t).href,{},s+1,c),!1;else l.props.page.status>=400&&await $.updated.check()&&(await _t(),await M(t));if(kn(),je(u),kt(g),l.props.page.url.pathname!==t.pathname&&(t.pathname=l.props.page.url.pathname),i=n?n.state:i,!n){const v=o?0:1,m={[B]:I+=v,[J]:T+=v,[ut]:i};(o?history.replaceState:history.pushState).call(history,m,"",t),o||bn(I,T)}if(L=null,l.props.page.state=i,ge){_=l.state,l.props.page&&(l.props.page.url=t);const v=(await Promise.all(Array.from(An,m=>m(y.navigation)))).filter(m=>typeof m=="function");if(v.length>0){let m=function(){v.forEach(w=>{W.delete(w)})};v.push(m),v.forEach(w=>{W.add(w)})}At.$set(l.props),wn(l.props.page),bt=!0}else Rt(l,xe,!1);const{activeElement:p}=document;await Nt();const A=n?n.scroll:a?Oe():null;if(Ze){const v=t.hash&&document.getElementById(decodeURIComponent(k.hash?t.hash.split("#")[2]??"":t.hash.slice(1)));A?scrollTo(A.x,A.y):v?v.scrollIntoView():scrollTo(0,0)}const E=document.activeElement!==p&&document.activeElement!==document.body;!r&&!E&&xn(),Ze=!0,l.props.page&&Object.assign(U,l.props.page),Z=!1,e==="popstate"&&St(T),y.fulfil(void 0),W.forEach(v=>v(y.navigation)),$.navigating.set(z.current=null)}async function Tt(e,t,n,r){return e.origin===le&&e.pathname===location.pathname&&!$e?await Ae({status:r,error:n,url:e,route:t}):await M(e)}function In(){let e;j.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(e),e=setTimeout(()=>{r(i,2)},20)});function t(o){o.defaultPrevented||r(o.composedPath()[0],1)}j.addEventListener("mousedown",t),j.addEventListener("touchstart",t,{passive:!0});const n=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(Ue(new URL(i.target.href)),n.unobserve(i.target))},{threshold:0});function r(o,i){const s=pt(o,j);if(!s)return;const{url:c,external:f,download:d}=Le(s,x,k.hash);if(f||d)return;const h=ue(s),y=c&&_e(_.url)===_e(c);if(!h.reload&&!y)if(i<=h.preload_data){const u=Be(c,!1);u&&Sn(u)}else i<=h.preload_code&&Ue(c)}function a(){n.disconnect();for(const o of j.querySelectorAll("a")){const{url:i,external:s,download:c}=Le(o,x,k.hash);if(s||c)continue;const f=ue(o);f.reload||(f.preload_code===fe.viewport&&n.observe(o),f.preload_code===fe.eager&&Ue(i))}}W.add(a),a()}function G(e,t){if(e instanceof ve)return e.body;const n=de(e),r=yn(e);return k.hooks.handleError({error:e,event:t,status:n,message:r})??{message:r}}function Un(e,t={}){return e=new URL(dt(e)),e.origin!==le?Promise.reject(new Error("goto: invalid URL")):Et(e,t,0)}function Ln(){var t;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let r=!1;if(Qe(),!Z){const a=Ct(_,void 0,null,"leave"),o={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation cancelled"))}};vt.forEach(i=>i(o))}r?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Qe()}),(t=navigator.connection)!=null&&t.saveData||In(),j.addEventListener("click",async n=>{if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=pt(n.composedPath()[0],j);if(!r)return;const{url:a,external:o,target:i,download:s}=Le(r,x,k.hash);if(!a)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=ue(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||s)return;const[d,h]=(k.hash?a.hash.replace(/^#/,""):a.href).split("#"),y=d===Ee(location);if(o||c.reload&&(!y||!h)){Lt({url:a,type:"link"})?Z=!0:n.preventDefault();return}if(h!==void 0&&y){const[,u]=_.url.href.split("#");if(u===h){if(n.preventDefault(),h===""||h==="top"&&r.ownerDocument.getElementById("top")===null)window.scrollTo({top:0});else{const g=r.ownerDocument.getElementById(decodeURIComponent(h));g&&(g.scrollIntoView(),g.focus())}return}if(q=!0,je(I),e(a),!c.replace_state)return;q=!1}n.preventDefault(),await new Promise(u=>{requestAnimationFrame(()=>{setTimeout(u,0)}),setTimeout(u,100)}),K({type:"link",url:a,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??a.href===location.href})}),j.addEventListener("submit",n=>{if(n.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formTarget)||r.target)==="_blank"||((a==null?void 0:a.formMethod)||r.method)!=="get")return;const s=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(we(s,x,!1))return;const c=n.target,f=ue(c);if(f.reload)return;n.preventDefault(),n.stopPropagation();const d=new FormData(c),h=a==null?void 0:a.getAttribute("name");h&&d.append(h,(a==null?void 0:a.getAttribute("value"))??""),s.search=new URLSearchParams(d).toString(),K({type:"form",url:s,keepfocus:f.keepfocus,noscroll:f.noscroll,replace_state:f.replace_state??s.href===location.href})}),addEventListener("popstate",async n=>{var r;if((r=n.state)!=null&&r[B]){const a=n.state[B];if(me={},a===I)return;const o=F[a],i=n.state[ut]??{},s=new URL(n.state[tn]??location.href),c=n.state[J],f=Ee(location)===Ee(_.url);if(c===T&&(bt||f)){i!==U.state&&(U.state=i),e(s),F[I]=Oe(),o&&scrollTo(o.x,o.y),I=a;return}const h=a-I;await K({type:"popstate",url:s,popped:{state:i,scroll:o,delta:h},accept:()=>{I=a,T=c},block:()=>{history.go(-h)},nav_token:me})}else if(!q){const a=new URL(location.href);e(a)}}),addEventListener("hashchange",()=>{q?(q=!1,history.replaceState({...history.state,[B]:++I,[J]:T},"",location.href)):k.hash&&_.url.hash===location.hash&&K({type:"goto",url:_.url})});for(const n of document.querySelectorAll("link"))vn.has(n.rel)&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&$.navigating.set(z.current=null)});function e(n){_.url=U.url=n,$.page.set(Ge(U)),$.page.notify()}}async function Tn(e,{status:t=200,error:n,node_ids:r,params:a,route:o,data:i,form:s}){$e=!0;const c=new URL(location.href);({params:a={},route:o={id:null}}=Be(c,!1)||{});let f,d=!0;try{const h=r.map(async(g,l)=>{const p=i[l];return p!=null&&p.uses&&(p.uses=Pt(p.uses)),Fe({loader:k.nodes[g],url:c,params:a,route:o,parent:async()=>{const A={};for(let E=0;E<l;E+=1)Object.assign(A,(await h[E]).data);return A},server_data_node:Ve(p)})}),y=await Promise.all(h),u=be.find(({id:g})=>g===o.id);if(u){const g=u.layouts;for(let l=0;l<g.length;l++)g[l]||y.splice(l,0,void 0)}f=ye({url:c,params:a,branch:y,status:t,error:n,form:s,route:u??null})}catch(h){if(h instanceof yt){await M(new URL(h.location,location.href));return}f=await Ae({status:de(h),error:await G(h,{url:c,params:a,route:o}),url:c,route:o}),e.textContent="",d=!1}f.props.page&&(f.props.page.state={}),Rt(f,e,d)}async function xt(e,t){var a;const n=new URL(e);n.pathname=Gt(e.pathname),e.pathname.endsWith("/")&&n.searchParams.append(mn,"1"),n.searchParams.append(gn,t.map(o=>o?"1":"0").join(""));const r=await it(n.href);if(!r.ok){let o;throw(a=r.headers.get("content-type"))!=null&&a.includes("application/json")?o=await r.json():r.status===404?o="Not Found":r.status===500&&(o="Internal Error"),new ve(r.status,o)}return new Promise(async o=>{var h;const i=new Map,s=r.body.getReader(),c=new TextDecoder;function f(y){return dn(y,{...k.decoders,Promise:u=>new Promise((g,l)=>{i.set(u,{fulfil:g,reject:l})})})}let d="";for(;;){const{done:y,value:u}=await s.read();if(y&&!d)break;for(d+=!u&&d?`
`:c.decode(u,{stream:!0});;){const g=d.indexOf(`
`);if(g===-1)break;const l=JSON.parse(d.slice(0,g));if(d=d.slice(g+1),l.type==="redirect")return o(l);if(l.type==="data")(h=l.nodes)==null||h.forEach(p=>{(p==null?void 0:p.type)==="data"&&(p.uses=Pt(p.uses),p.data=f(p.data))}),o(l);else if(l.type==="chunk"){const{id:p,data:A,error:E}=l,v=i.get(p);i.delete(p),E?v.reject(f(E)):v.fulfil(f(A))}}}})}function Pt(e){return{dependencies:new Set((e==null?void 0:e.dependencies)??[]),params:new Set((e==null?void 0:e.params)??[]),parent:!!(e!=null&&e.parent),route:!!(e!=null&&e.route),url:!!(e!=null&&e.url),search_params:new Set((e==null?void 0:e.search_params)??[])}}function xn(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const t=document.body,n=t.getAttribute("tabindex");t.tabIndex=-1,t.focus({preventScroll:!0,focusVisible:!1}),n!==null?t.setAttribute("tabindex",n):t.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let o=0;o<r.rangeCount;o+=1)a.push(r.getRangeAt(o));setTimeout(()=>{if(r.rangeCount===a.length){for(let o=0;o<r.rangeCount;o+=1){const i=a[o],s=r.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}r.removeAllRanges()}})}}}function Ct(e,t,n,r){var c,f;let a,o;const i=new Promise((d,h)=>{a=d,o=h});return i.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:((c=e.route)==null?void 0:c.id)??null},url:e.url},to:n&&{params:(t==null?void 0:t.params)??null,route:{id:((f=t==null?void 0:t.route)==null?void 0:f.id)??null},url:n},willUnload:!t,type:r,complete:i},fulfil:a,reject:o}}function Ge(e){return{data:e.data,error:e.error,form:e.form,params:e.params,route:e.route,state:e.state,status:e.status,url:e.url}}export{Fn as a,U as p,$ as s,Ie as u};
