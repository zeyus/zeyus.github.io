import{S as A,_ as $,$ as z,a0 as w,a1 as G,F as h,U as v,a2 as I,E as b,a3 as L,a4 as H,a5 as V,z as J,a6 as Q,a7 as W,a8 as Y,a9 as X,u as j,aa as C,ab as D,ac as Z,ad as k,ae as ee,af as F,ag as re,x as ne,ah as ie,ai as te,Z as U,aj as se,ak as ae,B as ue}from"./utils.DPR7n44y.mjs";import{c as fe}from"./store.BO6wc9hZ.mjs";function R(e,r=null,a){if(typeof e!="object"||e===null||A in e)return e;const f=V(e);if(f!==$&&f!==z)return e;var t=new Map,c=J(e),P=w(0);c&&t.set("length",w(e.length));var g;return new Proxy(e,{defineProperty(l,n,i){(!("value"in i)||i.configurable===!1||i.enumerable===!1||i.writable===!1)&&G();var u=t.get(n);return u===void 0?(u=w(i.value),t.set(n,u)):h(u,R(i.value,g)),!0},deleteProperty(l,n){var i=t.get(n);if(i===void 0)n in l&&t.set(n,w(v));else{if(c&&typeof n=="string"){var u=t.get("length"),s=Number(n);Number.isInteger(s)&&s<u.v&&h(u,s)}h(i,v),q(P)}return!0},get(l,n,i){var _;if(n===A)return e;var u=t.get(n),s=n in l;if(u===void 0&&(!s||(_=I(l,n))!=null&&_.writable)&&(u=w(R(s?l[n]:v,g)),t.set(n,u)),u!==void 0){var d=b(u);return d===v?void 0:d}return Reflect.get(l,n,i)},getOwnPropertyDescriptor(l,n){var i=Reflect.getOwnPropertyDescriptor(l,n);if(i&&"value"in i){var u=t.get(n);u&&(i.value=b(u))}else if(i===void 0){var s=t.get(n),d=s==null?void 0:s.v;if(s!==void 0&&d!==v)return{enumerable:!0,configurable:!0,value:d,writable:!0}}return i},has(l,n){var d;if(n===A)return!0;var i=t.get(n),u=i!==void 0&&i.v!==v||Reflect.has(l,n);if(i!==void 0||L!==null&&(!u||(d=I(l,n))!=null&&d.writable)){i===void 0&&(i=w(u?R(l[n],g):v),t.set(n,i));var s=b(i);if(s===v)return!1}return u},set(l,n,i,u){var x;var s=t.get(n),d=n in l;if(c&&n==="length")for(var _=i;_<s.v;_+=1){var m=t.get(_+"");m!==void 0?h(m,v):_ in l&&(m=w(v),t.set(_+"",m))}s===void 0?(!d||(x=I(l,n))!=null&&x.writable)&&(s=w(void 0),h(s,R(i,g)),t.set(n,s)):(d=s.v!==v,h(s,R(i,g)));var p=Reflect.getOwnPropertyDescriptor(l,n);if(p!=null&&p.set&&p.set.call(u,i),!d){if(c&&typeof n=="string"){var O=t.get("length"),E=Number(n);Number.isInteger(E)&&E>=O.v&&h(O,E+1)}q(P)}return!0},ownKeys(l){b(P);var n=Reflect.ownKeys(l).filter(s=>{var d=t.get(s);return d===void 0||d.v!==v});for(var[i,u]of t)u.v!==v&&!(i in l)&&n.push(i);return n},setPrototypeOf(){H()}})}function q(e,r=1){h(e,e.v+r)}const le={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function pe(e,r,a){return new Proxy({props:e,exclude:r},le)}const de={get(e,r){if(!e.exclude.includes(r))return b(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,a){return r in e.special||(e.special[r]=ce({get[r](){return e.props[r]}},r,Y)),e.special[r](a),C(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),C(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function be(e,r){return new Proxy({props:e,exclude:r,special:{},version:w(0)},de)}const oe={get(e,r){let a=e.props.length;for(;a--;){let f=e.props[a];if(D(f)&&(f=f()),typeof f=="object"&&f!==null&&r in f)return f[r]}},set(e,r,a){let f=e.props.length;for(;f--;){let t=e.props[f];D(t)&&(t=t());const c=I(t,r);if(c&&c.set)return c.set(a),!0}return!1},getOwnPropertyDescriptor(e,r){let a=e.props.length;for(;a--;){let f=e.props[a];if(D(f)&&(f=f()),typeof f=="object"&&f!==null&&r in f){const t=I(f,r);return t&&!t.configurable&&(t.configurable=!0),t}}},has(e,r){if(r===A||r===Z)return!1;for(let a of e.props)if(D(a)&&(a=a()),a!=null&&r in a)return!0;return!1},ownKeys(e){const r=[];for(let a of e.props){D(a)&&(a=a());for(const f in a)r.includes(f)||r.push(f)}return r}};function we(...e){return new Proxy({props:e},oe)}function M(e){for(var r=L,a=L;r!==null&&!(r.f&(k|ee));)r=r.parent;try{return F(r),e()}finally{F(a)}}function ce(e,r,a,f){var B;var t=(a&re)!==0,c=!ne||(a&ie)!==0,P=(a&te)!==0,g=(a&ae)!==0,l=!1,n;P?[n,l]=fe(()=>e[r]):n=e[r];var i=A in e||Z in e,u=((B=I(e,r))==null?void 0:B.set)??(i&&P&&r in e?o=>e[r]=o:void 0),s=f,d=!0,_=!1,m=()=>(_=!0,d&&(d=!1,g?s=j(f):s=f),s);n===void 0&&f!==void 0&&(u&&c&&Q(),n=m(),u&&u(n));var p;if(c)p=()=>{var o=e[r];return o===void 0?m():(d=!0,_=!1,o)};else{var O=M(()=>(t?U:se)(()=>e[r]));O.f|=W,p=()=>{var o=b(O);return o!==void 0&&(s=void 0),o===void 0?s:o}}if(!(a&Y))return p;if(u){var E=e.$$legacy;return function(o,y){return arguments.length>0?((!c||!y||E||l)&&u(y?p():o),o):p()}}var x=!1,K=!1,N=ue(n),S=M(()=>U(()=>{var o=p(),y=b(N);return x?(x=!1,K=!0,y):(K=!1,N.v=o)}));return t||(S.equals=X),function(o,y){if(arguments.length>0){const T=y?b(S):c&&P?R(o):o;return S.equals(T)||(x=!0,h(N,T),_&&s!==void 0&&(s=T),j(()=>b(S))),o}return b(S)}}export{R as a,be as l,ce as p,pe as r,we as s};
