import{n as c,o as r,q as i,v as _,u as m,w as v}from"./runtime.BzU52yKJ.mjs";function b(n){c===null&&r(),i&&c.l!==null?d(c).m.push(n):_(()=>{const e=m(n);if(typeof e=="function")return e})}function p(n,e,{bubbles:o=!1,cancelable:s=!1}={}){return new CustomEvent(n,{detail:e,bubbles:o,cancelable:s})}function k(){const n=c;return n===null&&r(),(e,o,s)=>{var a;const t=(a=n.s.$$events)==null?void 0:a[e];if(t){const l=v(t)?t.slice():[t],u=p(e,o,s);for(const f of l)f.call(n.x,u);return!u.defaultPrevented}return!0}}function d(n){var e=n.l;return e.u??(e.u={a:[],b:[],m:[]})}export{k as c,b as o};
