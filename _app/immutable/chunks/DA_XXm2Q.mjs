import{J as ee,y as ae,K,F as M,z as C,G as re,A as ne,g as U,d as fe,L as ie,M as X,N as S,C as R,O as le,P,B as Q,Q as se,R as b,T as W,x as ue,U as z,V as k,W as F,X as y,Y as te,Z as G,q as ve,_ as de,$ as _e,a0 as oe,a1 as ce,I as he,a2 as Ee,D as pe}from"./BwZklXNc.mjs";function me(l,e){return e}function Ae(l,e,a,u){for(var v=[],_=e.length,t=0;t<_;t++)_e(e[t].e,v,!0);var o=_>0&&v.length===0&&a!==null;if(o){var A=a.parentNode;oe(A),A.append(a),u.clear(),m(l,e[0].prev,e[_-1].next)}ce(v,()=>{for(var h=0;h<_;h++){var d=e[h];o||(u.delete(d.k),m(l,d.prev,d.next)),he(d.e,!o)}})}function Ce(l,e,a,u,v,_=null){var t=l,o={flags:e,items:new Map,first:null},A=(e&K)!==0;if(A){var h=l;t=C?M(re(h)):h.appendChild(ee())}C&&ne();var d=null,N=!1,f=fe(()=>{var s=a();return ve(s)?s:s==null?[]:W(s)});ae(()=>{var s=U(f),r=s.length;if(N&&r===0)return;N=r===0;let I=!1;if(C){var E=t.data===ie;E!==(r===0)&&(t=X(),M(t),S(!1),I=!0)}if(C){for(var p=null,T,c=0;c<r;c++){if(R.nodeType===8&&R.data===le){t=R,I=!0,S(!1);break}var n=s[c],i=u(n,c);T=Z(R,o,p,null,n,i,c,v,e,a),o.items.set(i,T),p=T}r>0&&M(X())}C||Te(s,o,t,v,e,u,a),_!==null&&(r===0?d?P(d):d=Q(()=>_(t)):d!==null&&se(d,()=>{d=null})),I&&S(!0),U(f)}),C&&(t=R)}function Te(l,e,a,u,v,_,t){var O,q,V,Y;var o=(v&de)!==0,A=(v&(k|y))!==0,h=l.length,d=e.items,N=e.first,f=N,s,r=null,I,E=[],p=[],T,c,n,i;if(o)for(i=0;i<h;i+=1)T=l[i],c=_(T,i),n=d.get(c),n!==void 0&&((O=n.a)==null||O.measure(),(I??(I=new Set)).add(n));for(i=0;i<h;i+=1){if(T=l[i],c=_(T,i),n=d.get(c),n===void 0){var $=f?f.e.nodes_start:a;r=Z($,e,r,r===null?e.first:r.next,T,c,i,u,v,t),d.set(c,r),E=[],p=[],f=r.next;continue}if(A&&Ie(n,T,i,v),(n.e.f&b)!==0&&(P(n.e),o&&((q=n.a)==null||q.unfix(),(I??(I=new Set)).delete(n))),n!==f){if(s!==void 0&&s.has(n)){if(E.length<p.length){var g=p[0],x;r=g.prev;var L=E[0],D=E[E.length-1];for(x=0;x<E.length;x+=1)J(E[x],g,a);for(x=0;x<p.length;x+=1)s.delete(p[x]);m(e,L.prev,D.next),m(e,r,L),m(e,D,g),f=g,r=D,i-=1,E=[],p=[]}else s.delete(n),J(n,f,a),m(e,n.prev,n.next),m(e,n,r===null?e.first:r.next),m(e,r,n),r=n;continue}for(E=[],p=[];f!==null&&f.k!==c;)(f.e.f&b)===0&&(s??(s=new Set)).add(f),p.push(f),f=f.next;if(f===null)continue;n=f}E.push(n),r=n,f=n.next}if(f!==null||s!==void 0){for(var w=s===void 0?[]:W(s);f!==null;)(f.e.f&b)===0&&w.push(f),f=f.next;var H=w.length;if(H>0){var j=(v&K)!==0&&h===0?a:null;if(o){for(i=0;i<H;i+=1)(V=w[i].a)==null||V.measure();for(i=0;i<H;i+=1)(Y=w[i].a)==null||Y.fix()}Ae(e,w,j,d)}}o&&ue(()=>{var B;if(I!==void 0)for(n of I)(B=n.a)==null||B.apply()}),z.first=e.first&&e.first.e,z.last=r&&r.e}function Ie(l,e,a,u){(u&k)!==0&&F(l.v,e),(u&y)!==0?F(l.i,a):l.i=a}function Z(l,e,a,u,v,_,t,o,A,h){var d=(A&k)!==0,N=(A&Ee)===0,f=d?N?te(v):G(v):v,s=(A&y)===0?t:G(t),r={i:s,v:f,k:_,a:null,e:null,prev:a,next:u};try{return r.e=Q(()=>o(l,f,s,h),C),r.e.prev=a&&a.e,r.e.next=u&&u.e,a===null?e.first=r:(a.next=r,a.e.next=r.e),u!==null&&(u.prev=r,u.e.prev=r.e),r}finally{}}function J(l,e,a){for(var u=l.next?l.next.e.nodes_start:a,v=e?e.e.nodes_start:a,_=l.e.nodes_start;_!==u;){var t=pe(_);v.before(_),_=t}}function m(l,e,a){e===null?l.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}export{Ce as e,me as i};
