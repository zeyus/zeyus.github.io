import{c as ce,a as v,f as G,j as ee,t as F}from"../chunks/BAeyy59I.mjs";import"../chunks/CKghMp1M.mjs";import{ap as $e,ad as ke,a$ as we,p as ve,b0 as le,b1 as ze,f as q,a as me,ab as de,g as l,m as W,c as V,r as N,x as te,d as M,t as Be,w as Ce,n as y,s as _,e as Ee}from"../chunks/w9IvsRUR.mjs";import{i as he}from"../chunks/Chpe7JU5.mjs";import{o as re,q as xe,e as Ae}from"../chunks/DzbWwnYh.mjs";import{A as j}from"../chunks/D9hu_qxI.mjs";import{L as Ie,a as X}from"../chunks/C9qFrTL3.mjs";import{P as be}from"../chunks/ByXErucO.mjs";import{B as Le,a as Fe,c as Te}from"../chunks/B3oGfr_G.mjs";import{o as Re,a as Oe}from"../chunks/BOUil-qg.mjs";import{s as ue}from"../chunks/pqN00TXM.mjs";import{p as m,i as qe,a as Me,b as Ue}from"../chunks/CuoeUak4.mjs";import{b as ye}from"../chunks/BScucWbY.mjs";function De(s,r,i){var d=$e(s,r);d&&d.set&&(s[r]=i,ke(()=>{s[r]=null}))}const je=()=>({props:{title:"home",excerpt:"Hi, I'm zeyus, the epitome of a generalist. I left industry to study cognitive science and now I'm working on my PhD so I can specialize in generalism."}}),ht=Object.freeze(Object.defineProperty({__proto__:null,load:je},Symbol.toStringTag,{value:"Module"})),We=typeof window<"u"?we(window.devicePixelRatio,s=>{let r=()=>{};function i(){r();const d=`(resolution: ${window.devicePixelRatio}dppx)`,c=matchMedia(d);c.addEventListener("change",i),r=()=>c.removeEventListener("change",i),s(window.devicePixelRatio)}i()}):we(1);function fe(s,r,i){return Math.min(Math.max(r,s),i)}function _e(s,r){let i=0;const d={...r,threshold:i};let c=new IntersectionObserver(u,d);c.observe(s);function u(T){const S=T[0];if(S.intersectionRatio===i)return;s.dispatchEvent(new CustomEvent("intersectionchanged",{detail:S})),i=S.intersectionRatio,c.disconnect();const E=1e-5,z=[i-E,i,i+E].map(I=>fe(0,I,1)),P={...r,threshold:z};c=new IntersectionObserver(u,P),c.observe(s)}return{destroy(){c.disconnect()}}}async function Ge(){return new Promise(s=>{const r=new ResizeObserver(i=>{s(i.every(d=>"devicePixelContentBoxSize"in d)),r.disconnect()});r.observe(document.body,{box:"device-pixel-content-box"})}).catch(()=>!1)}const He=Ge();let se=!1;function Pe(s){let r=new ResizeObserver(i);function i(d){const c=d[0];let u;se?u={width:c.devicePixelContentBoxSize[0].inlineSize,height:c.devicePixelContentBoxSize[0].blockSize}:c.contentBoxSize?u={width:c.contentBoxSize[0].inlineSize*window.devicePixelRatio,height:c.contentBoxSize[0].blockSize*window.devicePixelRatio}:u={width:c.contentRect.width*window.devicePixelRatio,height:c.contentRect.height*window.devicePixelRatio},s.dispatchEvent(new CustomEvent("devicepixelresize",{detail:u}))}return He.then(d=>{se=d,r.observe(s,{box:se?"device-pixel-content-box":"content-box"})}),{destroy(){r.disconnect()}}}var Ye=G('<div class="svelte-hblyql"><canvas><!></canvas></div>');function Xe(s,r){ve(r,!1);const i=()=>Ue(We,"$pixelScale",d),[d,c]=Me();let u=m(r,"width",8),T=m(r,"height",8),S=m(r,"canRender",8),E=m(r,"maxSize",8),z=m(r,"render",8),P=m(r,"rerenderEveryFrame",12),I=m(r,"forceAnimation",8);function R(){return typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches}!I()&&R()&&P(!1);let H;Re(()=>{H=performance.now()/1e3});let p=m(r,"offsetFromBottom",8,!1),U=m(r,"updateCanvasSize",8,()=>{}),w=m(r,"updateContainerSize",8),$=m(r,"updateOffset",8),k=m(r,"updateScale",8),A=m(r,"updateTime",8),x=W(),o=m(r,"canvasElement",12),e=null;const n=[];function t(){S()&&e===null&&(e=requestAnimationFrame(()=>{n.forEach(g=>g()),n.length=0,P()&&A()(performance.now()/1e3-H),z()(),e=null,P()&&t()}))}function a(){e!==null&&(cancelAnimationFrame(e),e=null)}function h(g){n.push(()=>{const f=g.detail.width,B=g.detail.height;o(o().width=f,!0),o(o().height=B,!0),U()(f,B)}),t()}function Q(g){const f=g.detail.width,B=g.detail.height;w()(f,B)}let L=W(0),D=W(0);function J(){const g=l(x).getBoundingClientRect(),f=window.innerWidth,B=o().offsetWidth,C=l(x).offsetWidth,K=-g.left;M(L,fe(0,K-(B-f)/2,C-B)*i());const Y=window.innerHeight,Z=o().offsetHeight,b=l(x).offsetHeight,ie=p()?g.top+b-Y:-g.top;M(D,fe(0,ie-(Z-Y)/2,b-Z)*i())}Oe(a),le(()=>(l(L),l(D),de($())),()=>{l(L)!==void 0&&l(D)!==void 0&&$()(l(L),l(D))}),le(()=>(de(k()),i()),()=>{k()(i())}),ze();var ge={requestRender:t};he();var oe=ce(),pe=q(oe);{var ne=g=>{var f=Ye();let B;var C=V(f);let K,Y;var Z=V(C);ue(Z,r,"default",{},null),N(C),ye(C,b=>o(b),()=>o()),re(C,b=>Pe?.(b)),te(()=>ee("devicepixelresize",C,h)),re(C,(b,ie)=>_e?.(b,ie),()=>({rootMargin:"100px"})),te(()=>ee("intersectionchanged",C,J)),N(f),ye(f,b=>M(x,b),()=>l(x)),re(f,b=>Pe?.(b)),te(()=>ee("devicepixelresize",f,Q)),re(f,b=>_e?.(b)),te(()=>ee("intersectionchanged",f,J)),Be(()=>{B=xe(f,"",B,{"--width":u(),"--height":T()}),K=Ae(C,1,"svelte-hblyql",null,K,{"offset-from-bottom":p()}),Y=xe(C,"",Y,{"--max-size":`${E()/i()}px`,"--offset-x":`${l(L)/i()}px`,"--offset-y":`${l(D)/i()}px`})}),v(g,f)},ae=g=>{var f=ce(),B=q(f);ue(B,r,"default",{},null),v(g,f)};qe(pe,g=>{S()?g(ne):g(ae,!1)})}v(s,oe),De(r,"requestRender",t);var O=me(ge);return c(),O}let Se=typeof navigator<"u"&&typeof navigator.gpu<"u";Ve();async function Ve(){try{if(!Se)return null;const s=await navigator.gpu.requestAdapter();if(!s)throw new Error("Failed to get WebGPU adapter.");const r=await s.requestDevice(),i=new Float32Array([-1,-1,1,-1,1,1,-1,-1,1,1,-1,1]),d=r.createBuffer({label:"ScreenQuad Vertex Buffer",size:i.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});return r.queue.writeBuffer(d,0,i),{device:r,vertexBuffer:d,vertexBufferLayout:{arrayStride:8,attributes:[{format:"float32x2",offset:0,shaderLocation:0}]}}}catch(s){return console.warn(s),Se=!1,null}}function Ne(s,r){ve(r,!1);let i=m(r,"width",8,void 0),d=m(r,"height",8,void 0),c=m(r,"code",8),u=m(r,"parameters",24,()=>[]);const T=u().some(o=>o.value==="time");let S=m(r,"forceAnimation",8,!1);const E=4096;let z=W(),P=W(),I=W(typeof WebGL2RenderingContext<"u");const R=new Promise(o=>Re(async()=>{try{if(!l(I)||l(P)===null)return;const e=l(P).getContext("webgl2");if(e===null)throw new Error("Failed to get WebGL2 context.");const n=e.createProgram();if(n===null)throw new Error("Failed to create WebGL shader program.");const t=(ne,ae)=>{const O=e.createShader(ae);if(O===null)throw new Error("Failed to create texture.");if(e.shaderSource(O,ne),e.compileShader(O),!e.getShaderParameter(O,e.COMPILE_STATUS))throw new Error(`An error occurred compiling the shaders: ${e.getShaderInfoLog(O)}`);e.attachShader(n,O)};t(`#version 300 es
                    in vec4 pos;
                    void main() {
                        gl_Position = pos;
                    }
                `,e.VERTEX_SHADER),t(await c(),e.FRAGMENT_SHADER),e.linkProgram(n),e.useProgram(n);const h=e.getAttribLocation(n,"pos"),Q=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,Q);const L=[1,1,-1,1,1,-1,-1,-1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(L),e.STATIC_DRAW);const D=2,J=e.FLOAT;e.vertexAttribPointer(h,D,J,!1,0,0),e.enableVertexAttribArray(h),o({gl:e,shaderProgram:n})}catch(e){console.warn(e),M(I,!1)}}));async function H(){const{gl:o}=await R;o.drawArrays(o.TRIANGLE_STRIP,0,4)}async function p(o,e){const{gl:n}=await R;n.viewport(0,0,o,e)}async function U(o,e){const{gl:n,shaderProgram:t}=await R,a=u().find(h=>h.value==="resolution");if(a!==void 0){const h=n.getUniformLocation(t,a.name);n.uniform2fv(h,[o,e]),l(z)()}}async function w(o,e){const{gl:n,shaderProgram:t}=await R,a=u().find(h=>h.value==="offset");if(a!==void 0){const h=n.getUniformLocation(t,a.name);n.uniform2fv(h,[o,e]),l(z)()}}async function $(o){const{gl:e,shaderProgram:n}=await R,t=u().find(a=>a.value==="scale");if(t!==void 0){const a=e.getUniformLocation(n,t.name);e.uniform1f(a,o),l(z)()}}async function k(o){const{gl:e,shaderProgram:n}=await R,t=u().find(a=>a.value==="time");if(t!==void 0){const a=e.getUniformLocation(n,t.name);e.uniform1f(a,o)}}function A(o){if(!(typeof o.value=="string"))return!1;switch(o.value){case"resolution":case"offset":case"scale":case"time":return!0;default:throw new Error(`Unknown built-in value: ${o.value}`)}}async function x(o){const{gl:e,shaderProgram:n}=await R;for(const t of o){if(t.value===void 0)throw new Error("One or more parameters had an undefined value field.");if(!A(t)){const a=e.getUniformLocation(n,t.name);switch(t.type){case"float":e.uniform1f(a,t.value);break;case"vec2":e.uniform2fv(a,t.value);break;case"vec3":e.uniform3fv(a,t.value);break;case"vec4":e.uniform4fv(a,t.value);break;case"int":e.uniform1i(a,t.value);break;case"ivec2":e.uniform2iv(a,t.value);break;case"ivec3":e.uniform3iv(a,t.value);break;case"ivec4":e.uniform4iv(a,t.value);break;case"uint":e.uniform1ui(a,t.value);break;case"uvec2":e.uniform2uiv(a,t.value);break;case"uvec3":e.uniform3uiv(a,t.value);break;case"uvec4":e.uniform4uiv(a,t.value);break;case"mat2":e.uniformMatrix2fv(a,!1,t.value);break;case"mat3":e.uniformMatrix3fv(a,!1,t.value);break;case"mat4":e.uniformMatrix4fv(a,!1,t.value);break;default:throw new Error(`Unknown parameter type: ${t.type}`)}}}l(z)()}le(()=>de(u()),()=>{x(u())}),ze(),he(),Xe(s,{get width(){return i()},get height(){return d()},get canRender(){return l(I)},maxSize:E,offsetFromBottom:!0,get rerenderEveryFrame(){return T},get forceAnimation(){return S()},render:H,updateCanvasSize:p,updateContainerSize:U,updateOffset:w,updateScale:$,updateTime:k,get canvasElement(){return l(P)},set canvasElement(o){M(P,o)},get requestRender(){return l(z)},set requestRender(o){M(z,o)},children:(o,e)=>{var n=ce(),t=q(n);ue(t,r,"default",{},null),v(o,n)},$$slots:{default:!0},$$legacy:!0}),me()}var Qe=G("Hi, I'm zeyus, the epitome of a generalist. I left industry to study <!> and now I'm working on my PhD so I can specialize in generalism.",1),Je=G("You can follow me around the internet via my <!>",1),Ke=G("<!> <!> <!> <!> <!>",1),Ze=G('<div class="fallback dark:text-gray-500">Enable WebGL to see an awesome shader.</div>'),et=G("If you're interested in some stuff I write about, check out <!>, if you'd like to see some of the open source projects I've worked on, take a look at <!>. If you just want to connect to your Arduino or other serial device directly from your browser, check out <!><!>.",1),tt=G('<!> <div class="flex flex-col md:flex-row md:items-start md:space-x-8 md:justify-around"><div class="w-full flex mb-4 md:justify-around md:mb-0 content-start md:self-center"><!></div> <div class="w-full flex md:justify-around mb-4 md:mb-4 justify-center md:self-center"><!></div></div> <!> <!>',1);function gt(s,r){ve(r,!1);const i=`#version 300 es
        // License: CC BY-NC-SA 3.0
        // https://creativecommons.org/licenses/by-nc-sa/3.0/
        // Author: bradjamesgrant (https://www.shadertoy.com/user/bradjamesgrant)
        // fractal pyramid: https://www.shadertoy.com/view/tsXBzS
        // Modified by zeyus.
        precision highp float;
        out vec4 fragColor;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 u_offset;


        vec3 palette(float d){
            return mix(vec3(0.6,1.0,0.8),vec3(1.,0.0,1.),d);
        }

        vec2 rotate(vec2 p,float a){
            float c = cos(a*0.1);
            float s = sin(a*0.1);
            return p*mat2(c,s,-s,c);
        }

        float map(vec3 p){
            for( int i = 0; i<40; ++i){
                float t = iTime*0.01;
                p.xz =rotate(p.xz,t);
                p.xy =rotate(p.xy,t*2.89);
                p.xz = abs(p.xz);
                p.xz-=.5;
            }
            return dot(sign(p),p)/5.;
        }

        vec4 rm (vec3 ro, vec3 rd){
            float t = 0.;
            vec3 col = vec3(0.);
            float d;
            for(float i =0.; i<64.; i++){
                vec3 p = ro + rd*t;
                d = map(p)*.5;
                if(d<0.1){
                    break;
                }
                if(d>100.){
                    break;
                }
                col+=palette(length(p)*.15)/(500.*(d));
                t+=d;
            }
            return vec4(col,1./(d*100.));
        }
        void main()
        {
            vec2 uv = (gl_FragCoord.xy+u_offset-(iResolution.xy/2.))/iResolution.x;
            vec3 ro = vec3(0.,0.,-50.);
            ro.xz = rotate(ro.xz,iTime);
            vec3 cf = normalize(-ro);
            vec3 cs = normalize(cross(cf,vec3(0.,1.,0.)));
            vec3 cu = normalize(cross(cf,cs));
            
            vec3 uuv = ro+cf*4. + uv.x*cs + uv.y*cu;
            
            vec3 rd = normalize(uuv-ro);
            
            vec4 col = rm(ro,rd);
            
            
            fragColor = col;
        }
    `;Ce("metadata").setMetadata({title:"home",description:"Hi, I'm zeyus, the epitome of a generalist. I left industry to study cognitive science and now I'm working on my PhD so I can specialize in generalism."});let c=W([]);he();var u=tt(),T=q(u);be(T,{class:"dark:text-gray-200 mb-2 mt-4",children:(p,U)=>{y();var w=Qe(),$=_(q(w));j($,{href:"https://en.wikipedia.org/wiki/Cognitive_science",children:(k,A)=>{y();var x=F("cognitive science");v(k,x)},$$slots:{default:!0}}),y(),v(p,w)},$$slots:{default:!0}});var S=_(T,2),E=V(S),z=V(E);Ie(z,{class:"list-['>'] dark:text-gray-200 ml-3 mb-4 flex flex-col",position:"inside",children:(p,U)=>{var w=Ke(),$=q(w);X($,{children:(e,n)=>{y();var t=F("Cognitive Scientist");v(e,t)},$$slots:{default:!0}});var k=_($,2);X(k,{children:(e,n)=>{y();var t=F("PhD student");v(e,t)},$$slots:{default:!0}});var A=_(k,2);X(A,{children:(e,n)=>{j(e,{href:"https://github.com/zeyus",children:(t,a)=>{y();var h=F("Open-source contributor and developer");v(t,h)},$$slots:{default:!0}})},$$slots:{default:!0}});var x=_(A,2);X(x,{children:(e,n)=>{j(e,{href:"https://soundcloud.com/zeyus",children:(t,a)=>{y();var h=F("Musician");v(t,h)},$$slots:{default:!0}})},$$slots:{default:!0}});var o=_(x,2);X(o,{children:(e,n)=>{y();var t=Je(),a=_(q(t));j(a,{href:"https://me.zys.im/",children:(h,Q)=>{y();var L=F("link list");v(h,L)},$$slots:{default:!0}}),v(e,t)},$$slots:{default:!0}}),v(p,w)},$$slots:{default:!0}}),N(E);var P=_(E,2),I=V(P);Ne(I,{width:"300px",height:"256px",code:i,parameters:[{name:"iResolution",value:"resolution"},{name:"u_offset",value:"offset"},{name:"iTime",value:"time"}],children:(p,U)=>{var w=Ze();v(p,w)},$$slots:{default:!0}}),N(P),N(S);var R=_(S,2);be(R,{class:"dark:text-gray-200",children:(p,U)=>{y();var w=et(),$=_(q(w));j($,{href:"/_vault/",children:(o,e)=>{y();var n=F("the _vault");v(o,n)},$$slots:{default:!0}});var k=_($,2);j(k,{href:"/projects/",children:(o,e)=>{y();var n=F("the projects page");v(o,n)},$$slots:{default:!0}});var A=_(k,2);j(A,{href:"/terminal/",children:(o,e)=>{y();var n=F("the terminal");v(o,n)},$$slots:{default:!0}});var x=_(A);{let o=Ee(()=>Te("Requires a browser that supports the WebSerial or USB APIs"));Fe(x,{get item(){return l(o)},get items(){return l(c)},set items(e){M(c,e)},$$legacy:!0})}y(),v(p,w)},$$slots:{default:!0}});var H=_(R,2);Le(H,{get items(){return l(c)},set items(p){M(c,p)},$$legacy:!0}),v(s,u),me()}export{gt as component,ht as universal};
