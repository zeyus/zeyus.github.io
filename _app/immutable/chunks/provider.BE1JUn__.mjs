var T=Object.defineProperty;var f=(s,e,t)=>e in s?T(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var r=(s,e,t)=>f(s,typeof e!="symbol"?e+"":e,t);import{o as d,T as P,k as u,m as k,n as I,q as c,r as l,s as p,D as E,t as H,A as o}from"./register.3VdNnJgm.mjs";import{H as v}from"./provider.BlFwU3Pk.mjs";class q{constructor(e,t){this.qa=e,this.ph=t,e.textTracks.onaddtrack=this.va.bind(this),d(this.Eh.bind(this))}va(e){const t=e.track;if(!t||A(this.qa,t))return;const i=new P({id:t.id,kind:t.kind,label:t.label,language:t.language,type:"vtt"});i[u]={track:t},i[k]=2,i[I]=!0;let n=0;const h=g=>{if(t.cues)for(let a=n;a<t.cues.length;a++)i.addCue(t.cues[a],g),n++};h(e),t.oncuechange=h,this.ph.textTracks.add(i,e),i.setMode(t.mode,e)}Eh(){var e;this.qa.textTracks.onaddtrack=null;for(const t of this.ph.textTracks){const i=(e=t[u])==null?void 0:e.track;i!=null&&i.oncuechange&&(i.oncuechange=null)}}}function A(s,e){return Array.from(s.children).find(t=>t.track===e)}class m{constructor(e,t){r(this,"Hc",(e,t)=>{this.j.delegate.p("picture-in-picture-change",{detail:e,trigger:t})});this.qa=e,this.j=t,c(this.qa,"enterpictureinpicture",this.Fh.bind(this)),c(this.qa,"leavepictureinpicture",this.Gh.bind(this))}get active(){return document.pictureInPictureElement===this.qa}get supported(){return l(this.qa)}async enter(){return this.qa.requestPictureInPicture()}exit(){return document.exitPictureInPicture()}Fh(e){this.Hc(!0,e)}Gh(e){this.Hc(!1,e)}}class x{constructor(e,t){r(this,"Ga","inline");this.qa=e,this.j=t,c(this.qa,"webkitpresentationmodechanged",this.Kh.bind(this))}get Jh(){return p(this.qa)}async Ih(e){this.Ga!==e&&this.qa.webkitSetPresentationMode(e)}Kh(){var t;const e=this.Ga;this.Ga=this.qa.webkitPresentationMode,(t=this.j.player)==null||t.dispatchEvent(new E("video-presentation-change",{detail:this.Ga,trigger:event})),["fullscreen","picture-in-picture"].forEach(i=>{(this.Ga===i||e===i)&&this.j.delegate.p(`${i}-change`,{detail:this.Ga===i,trigger:event})})}}class G{constructor(e){this.Hh=e}get active(){return this.Hh.Ga==="fullscreen"}get supported(){return this.Hh.Jh}async enter(){this.Hh.Ih("fullscreen")}async exit(){this.Hh.Ih("inline")}}class b{constructor(e){this.Hh=e}get active(){return this.Hh.Ga==="picture-in-picture"}get supported(){return this.Hh.Jh}async enter(){this.Hh.Ih("picture-in-picture")}async exit(){this.Hh.Ih("inline")}}class _ extends v{constructor(t,i){super(t);r(this,"$$PROVIDER_TYPE","VIDEO");r(this,"fullscreen");r(this,"pictureInPicture");if(p(t)){const n=new x(t,i);this.fullscreen=new G(n),this.pictureInPicture=new b(n)}else l(t)&&(this.pictureInPicture=new m(t,i))}get type(){return"video"}setup(t){super.setup(t),H(this.video)&&new q(this.video,t),t.textRenderers[o](this.video),d(()=>{t.textRenderers[o](null)}),this.type==="video"&&t.delegate.p("provider-setup",{detail:this})}get video(){return this.j}}export{_ as VideoProvider};
