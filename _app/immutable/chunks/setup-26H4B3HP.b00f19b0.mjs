import{r as v,g as E,s as S,d as i,M as y,R as P,e as j,S as d,o as w,P as b,A as O,C as m,f as R,t as T}from"./register-C7DORXC6.8e4df76a.mjs";function I(e,t={}){return v(s=>{var C;t.scope&&t.scope.append(E());let n=null,c=!1,p="props"in e,a=p?M(e.props):{},l=S(!1),g={},h={},k=o=>void Object.assign(g,o),A=o=>void Object.assign(h,o);if(t.props&&p)for(const o of Object.keys(t.props))o in e.props&&a["$"+o].set(t.props[o]);const f={[b]:{$attrs:g,$styles:h,$connected:l},el:null,$el(){return l()?f.el:null},$connected:l,setAttributes:k,setStyles:A,setCSSVars:A},r={host:f,props:a,[d]:E(),[b]:a,[O]:[],[m]:[],accessors(){if(n)return n;const o={};for(const u of Object.keys(e.props))o[u]=a["$"+u];return n=R(o)},destroy(){var o;c||(c=!0,(o=f.el)==null||o.destroy(),T(),r[O].length=0,r[m].length=0,s(),r[d]=null,r[y]=null,r[P]=null,f.el=null)}};try{i(r),r[y]=e.setup(r)}finally{i(null)}const N=(C=r[y])==null?void 0:C.$render;return N&&(r[P]=function(){let u=null;return j(()=>{try{i(r),u=N()}finally{i(null)}},r[d]),u}),w(r.destroy),r})}function M(e){const t={};for(const s of Object.keys(e)){const n=e[s];t["$"+s]=S(n.initial,n)}return t}async function $(e){const t=D(e),s=e.constructor,n=s.c;if(t&&(await customElements.whenDefined(t.localName),t[m]===!0||await new Promise(c=>t[m].push(c))),e.isConnected){const c=I(n,{props:x(e),scope:t==null?void 0:t.instance[d]});t!=null&&t.keepAlive&&(e.keepAlive=!0),e.attachComponent(c)}}function x(e){var n;const t=e.constructor,s={};if(!t.f)return s;for(const c of t.f.keys())if(e.hasAttribute(c)){const p=t.f.get(c),a=(n=t.c.props[p].type)==null?void 0:n.from;if(a){const l=e.getAttribute(c);s[p]=a(l)}}return s}function D(e){let t=e.constructor,s=e.parentNode,n=t.c.tagName.split("-",1)[0]+"-";for(;s;){if(s.nodeType===1&&s.localName.startsWith(n))return s;s=s.parentNode}return null}export{$ as setup};
