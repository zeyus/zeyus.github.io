import{c as N,a as w,t as I}from"./disclose-version.CbBHkuzr.mjs";import"./legacy.C9q1SDd6.mjs";import{p as O,D as Y,F as Z,G as tt,f as Q,a as R,c as F,s as G,r as S,t as M,H as et,x as D,v as j,I as rt}from"./runtime.C2dwlhJ5.mjs";import{e as at,s as q,r as A}from"./render.DmFOKR_b.mjs";import{i as P}from"./this.dqfZJWtc.mjs";import{s as E,b as st,t as H,a as T,h as J}from"./bundle-mjs.Cx3_z0_i.mjs";import{i as V}from"./lifecycle.ClYKmd6O.mjs";import{l as W,p as c}from"./props.BrYin2Pm.mjs";import{h as ot,s as K}from"./class.C4Gqt5Km.mjs";function wt(e){const t=Math.cos(e*Math.PI*.5);return Math.abs(t)<1e-14?1:1-t}const nt=e=>e;function X(e){const t=e-1;return t*t*t+1}function it(e){return e<.5?4*e*e*e:.5*Math.pow(2*e-2,3)+1}function U(e){const t=typeof e=="string"&&e.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return t?[parseFloat(t[1]),t[2]||"px"]:[e,"px"]}function Ct(e,{delay:t=0,duration:n=400,easing:d=it,amount:i=5,opacity:r=0}={}){const u=getComputedStyle(e),s=+u.opacity,v=u.filter==="none"?"":u.filter,o=s*(1-r),[g,y]=U(i);return{delay:t,duration:n,easing:d,css:(m,h)=>`opacity: ${s-o*h}; filter: ${v} blur(${h*g}${y});`}}function zt(e,{delay:t=0,duration:n=400,easing:d=nt}={}){const i=+getComputedStyle(e).opacity;return{delay:t,duration:n,easing:d,css:r=>`opacity: ${r*i}`}}function $t(e,{delay:t=0,duration:n=400,easing:d=X,x:i=0,y:r=0,opacity:u=0}={}){const s=getComputedStyle(e),v=+s.opacity,o=s.transform==="none"?"":s.transform,g=v*(1-u),[y,m]=U(i),[h,_]=U(r);return{delay:t,duration:n,easing:d,css:(x,C)=>`
			transform: ${o} translate(${(1-x)*y}${m}, ${(1-x)*h}${_});
			opacity: ${v-g*C}`}}function Ft(e,{delay:t=0,duration:n=400,easing:d=X,axis:i="y"}={}){const r=getComputedStyle(e),u=+r.opacity,s=i==="y"?"height":"width",v=parseFloat(r[s]),o=i==="y"?["top","bottom"]:["left","right"],g=o.map(l=>`${l[0].toUpperCase()}${l.slice(1)}`),y=parseFloat(r[`padding${g[0]}`]),m=parseFloat(r[`padding${g[1]}`]),h=parseFloat(r[`margin${g[0]}`]),_=parseFloat(r[`margin${g[1]}`]),x=parseFloat(r[`border${g[0]}Width`]),C=parseFloat(r[`border${g[1]}Width`]);return{delay:t,duration:n,easing:d,css:l=>`overflow: hidden;opacity: ${Math.min(l*20,1)*u};${s}: ${l*v}px;padding-${o[0]}: ${l*y}px;padding-${o[1]}: ${l*m}px;margin-${o[0]}: ${l*h}px;margin-${o[1]}: ${l*_}px;border-${o[0]}-width: ${l*x}px;border-${o[1]}-width: ${l*C}px;`}}var lt=I('<span class="sr-only"> </span>'),ct=I("<a><!> <!></a>"),gt=I('<span class="sr-only"> </span>'),dt=I("<button><!> <!></button>");function St(e,t){const n=W(t,["children","$$slots","$$events","$$legacy"]),d=W(n,["color","name","ariaLabel","size","href"]);O(t,!1);let i=c(t,"color",8,"default"),r=c(t,"name",24,()=>{}),u=c(t,"ariaLabel",24,()=>{}),s=c(t,"size",8,"md"),v=c(t,"href",24,()=>{});const o=Y("background"),g={dark:"text-gray-500 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600",gray:"text-gray-500 focus:ring-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300",red:"text-red-500 focus:ring-red-400 hover:bg-red-200 dark:hover:bg-red-800 dark:hover:text-red-300",yellow:"text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-800 dark:hover:text-yellow-300",green:"text-green-500 focus:ring-green-400 hover:bg-green-200 dark:hover:bg-green-800 dark:hover:text-green-300",indigo:"text-indigo-500 focus:ring-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800 dark:hover:text-indigo-300",purple:"text-purple-500 focus:ring-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800 dark:hover:text-purple-300",pink:"text-pink-500 focus:ring-pink-400 hover:bg-pink-200 dark:hover:bg-pink-800 dark:hover:text-pink-300",blue:"text-blue-500 focus:ring-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 dark:hover:text-blue-300",primary:"text-primary-500 focus:ring-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 dark:hover:text-primary-300",default:"focus:ring-gray-400 hover:bg-gray-100"},y={xs:"m-0.5 rounded-sm focus:ring-1 p-0.5",sm:"m-0.5 rounded focus:ring-1 p-0.5",md:"m-0.5 rounded-lg focus:ring-2 p-1.5",lg:"m-0.5 rounded-lg focus:ring-2 p-2.5"};let m=rt();const h={xs:"w-3 h-3",sm:"w-3.5 h-3.5",md:"w-5 h-5",lg:"w-5 h-5"};Z(()=>(D(s()),D(i()),D(n)),()=>{et(m,H("focus:outline-none whitespace-normal",y[s()],g[i()],i()==="default"&&(o?"dark:hover:bg-gray-600":"dark:hover:bg-gray-700"),n.class))}),tt(),V();var _=N(),x=Q(_);{var C=f=>{var a=ct();let p;var k=F(a);{var z=b=>{var $=lt(),B=F($,!0);S($),M(()=>q(B,r())),w(b,$)};P(k,b=>{r()&&b(z)})}var L=G(k,2);E(L,t,"default",{get svgSize(){return h[s()]}},null),S(a),M(()=>p=T(a,p,{href:v(),...d,class:j(m),"aria-label":u()??r()})),w(f,a)},l=f=>{var a=dt();let p;var k=F(a);{var z=b=>{var $=gt(),B=F($,!0);S($),M(()=>q(B,r())),w(b,$)};P(k,b=>{r()&&b(z)})}var L=G(k,2);E(L,t,"default",{get svgSize(){return h[s()]}},null),S(a),M(()=>p=T(a,p,{type:"button",...d,class:j(m),"aria-label":u()??r()})),at("click",a,function(b){st.call(this,t,b)}),w(f,a)};P(x,f=>{v()?f(C):f(l,!1)})}w(e,_),R()}var ut=I("<figure><img> <figcaption><!></figcaption></figure>"),ft=I("<img>");function Mt(e,t){const n=W(t,["children","$$slots","$$events","$$legacy"]),d=W(n,["caption","src","srcset","size","alignment","imgClass","figClass","alt","effect","captionClass"]);O(t,!1);let i=c(t,"caption",24,()=>{}),r=c(t,"src",24,()=>{}),u=c(t,"srcset",24,()=>{}),s=c(t,"size",8,"max-w-full"),v=c(t,"alignment",8,""),o=c(t,"imgClass",8,"h-auto"),g=c(t,"figClass",8,"max-w-lg"),y=c(t,"alt",8,""),m=c(t,"effect",8,""),h=c(t,"captionClass",8,"mt-2 text-sm text-center text-gray-500 dark:text-gray-400");V();var _=N(),x=Q(_);{var C=f=>{var a=ut(),p=F(a);let k;var z=G(p,2),L=F(z);ot(L,i,!1,!1),S(z),S(a),M(()=>{K(a,g()),k=T(p,k,{class:H(o(),s(),v(),m(),n.class),src:r(),srcset:u(),alt:y(),...d}),K(z,h())}),J(p),A(p),w(f,a)},l=f=>{var a=ft();let p;M(()=>p=T(a,p,{...d,class:H(o(),s(),v(),m(),n.class),src:r(),srcset:u(),alt:y()})),J(a),A(a),w(f,a)};P(x,f=>{i()?f(C):f(l,!1)})}w(e,_),R()}export{Mt as I,St as T,Ft as a,zt as b,Ct as c,$t as f,wt as s};
