import{a as p,t as h}from"./disclose-version.CX3xbMKq.mjs";import"./legacy.DnVmrOaW.mjs";import{p as E,E as F,a as I,c as C,r as O,f as _,s as f,z as k}from"./runtime.BeVL6ef-.mjs";import{P as T}from"./P.AEC_kY27.mjs";import{d as P}from"./events.B943W8Mb.mjs";import{b as w}from"./bundle-mjs.DbAllLLE.mjs";import{s as S}from"./class.5YRYEcFb.mjs";import{p as u}from"./props.Ch6qlijb.mjs";import{p as $}from"./index.LSllcR2A.mjs";const x=(a,r,e)=>{if(a instanceof KeyboardEvent&&a.key!=="Enter")return;a.preventDefault();const i=a.target.href.split("#")[1],t=document.getElementById(i);if(!t)return;t.scrollIntoView({behavior:"smooth",block:"center",inline:"center"});const s=t.querySelector("button");s&&s.focus(),t.setAttribute("data-return-to",r.toString()),t.classList.add(e()),setTimeout(()=>{t.classList.remove(e())},1e3)};var B=h('<sup class="footnote-ref-sup"><a></a></sup>');function m(a,r){var g,b;E(r,!0);let e=u(r,"item",31,()=>{}),i=u(r,"text",19,()=>{}),t=u(r,"year",19,()=>{}),s=u(r,"highlightClass",3,"bg-primary-800/50"),o=F("bibItems");if(e()&&!o.includes(e()))e(e().occurrences=1,!0),o.addFootnote(e());else if(i()){const y=o.find(v=>v.text===i());if(y)e(y),(g=e())==null||g.addOccurrence();else{const v=$.url.pathname;e({text:i(),url:v,year:t(),occurrences:1,addOccurrence:()=>{e()&&e(e().occurrences++,!0)}}),o.addFootnote(e())}}const n=o.indexOf(e()),c=((b=e())==null?void 0:b.occurrences)||1;var l=B(),d=C(l);d.__touchend=[x,c,s],d.__keydown=[x,c,s],d.__click=[x,c,s],w(d,"href",`#footnote-${n+1}`),w(d,"data-occurrence",c),S(d,`footnote-ref footnote-${n+1}-ref align-top text-xs text-primary-300`),d.textContent=n+1,O(l),p(a,l),I()}P(["touchend","keydown","click"]);var L=h(`So, one side of my family is from Finland, and one of the consistencies of both places I lived during my childhood 
    was the presence of a sauna. <!>`,1),q=h("Blah<!> blah<!> blah...<!>",1),z=h("<!> <!>",1);function M(a){var r=z(),e=_(r);T(e,{children:(t,s)=>{k();var o=L(),n=f(_(o));m(n,{text:"These places were vastly different ..."}),p(t,o)},$$slots:{default:!0}});var i=f(e,2);T(i,{children:(t,s)=>{k();var o=q(),n=f(_(o));m(n,{text:"This is a test."});var c=f(n,2);m(c,{text:"This is another test"});var l=f(c,2);m(l,{text:"This is a test."}),p(t,o)},$$slots:{default:!0}}),p(a,r)}export{M as default};
