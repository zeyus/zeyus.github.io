import{s as M,n as L,r as Z,b as K,H as k}from"./scheduler.Knsie03R.mjs";import{S as P,i as Q,e as y,s as O,H as A,t as q,c as S,a as v,f as R,F as H,d,b as F,o as p,g as C,h as x,z as j,j as D,J as ee,u as te,v as se,w as le,n as ne,l as ie,x as re}from"./index.cEMZ7GLX.mjs";import{e as z}from"./each.6w4Ej4nR.mjs";import{t as ae}from"./store.Hvpztf4R.mjs";var U=function(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r},h;(function(r){r[r.EOS=0]="EOS",r[r.Text=1]="Text",r[r.Incomplete=2]="Incomplete",r[r.ESC=3]="ESC",r[r.Unknown=4]="Unknown",r[r.SGR=5]="SGR",r[r.OSCURL=6]="OSCURL"})(h||(h={}));class ue{constructor(){this.VERSION="6.0.2",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_allowlist={http:1,https:1},this._escape_html=!0,this.boldStyle="font-weight:bold",this.faintStyle="opacity:0.7",this.italicStyle="font-style:italic",this.underlineStyle="text-decoration:underline"}set use_classes(e){this._use_classes=e}get use_classes(){return this._use_classes}set url_allowlist(e){this._url_allowlist=e}get url_allowlist(){return this._url_allowlist}set escape_html(e){this._escape_html=e}get escape_html(){return this._escape_html}set boldStyle(e){this._boldStyle=e}get boldStyle(){return this._boldStyle}set faintStyle(e){this._faintStyle=e}get faintStyle(){return this._faintStyle}set italicStyle(e){this._italicStyle=e}get italicStyle(){return this._italicStyle}set underlineStyle(e){this._underlineStyle=e}get underlineStyle(){return this._underlineStyle}setup_palettes(){this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(s=>{s.forEach(t=>{this.palette_256.push(t)})});let e=[0,95,135,175,215,255];for(let s=0;s<6;++s)for(let t=0;t<6;++t)for(let n=0;n<6;++n){let i={rgb:[e[s],e[t],e[n]],class_name:"truecolor"};this.palette_256.push(i)}let l=8;for(let s=0;s<24;++s,l+=10){let t={rgb:[l,l,l],class_name:"truecolor"};this.palette_256.push(t)}}escape_txt_for_html(e){return this._escape_html?e.replace(/[&<>"']/gm,l=>{if(l==="&")return"&amp;";if(l==="<")return"&lt;";if(l===">")return"&gt;";if(l==='"')return"&quot;";if(l==="'")return"&#x27;"}):e}append_buffer(e){var l=this._buffer+e;this._buffer=l}get_next_packet(){var e={kind:h.EOS,text:"",url:""},l=this._buffer.length;if(l==0)return e;var s=this._buffer.indexOf("\x1B");if(s==-1)return e.kind=h.Text,e.text=this._buffer,this._buffer="",e;if(s>0)return e.kind=h.Text,e.text=this._buffer.slice(0,s),this._buffer=this._buffer.slice(s),e;if(s==0){if(l<3)return e.kind=h.Incomplete,e;var t=this._buffer.charAt(1);if(t!="["&&t!="]"&&t!="(")return e.kind=h.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(t=="["){this._csi_regex||(this._csi_regex=G($||($=U([`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \x1B[                      # CSI
                          ([<-?]?)              # private-mode char
                          ([d;]*)                    # any digits or semicolons
                          ([ -/]?               # an intermediate modifier
                          [@-~])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \x1B[                      # CSI
                          [ -~]*                # anything legal
                          ([\0-:])              # anything illegal
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                                                    # First attempt
                        (?:                         # legal sequence
                          \\x1b\\[                      # CSI
                          ([\\x3c-\\x3f]?)              # private-mode char
                          ([\\d;]*)                    # any digits or semicolons
                          ([\\x20-\\x2f]?               # an intermediate modifier
                          [\\x40-\\x7e])                # the command
                        )
                        |                           # alternate (second attempt)
                        (?:                         # illegal sequence
                          \\x1b\\[                      # CSI
                          [\\x20-\\x7e]*                # anything legal
                          ([\\x00-\\x1f:])              # anything illegal
                        )
                    `]))));let i=this._buffer.match(this._csi_regex);if(i===null)return e.kind=h.Incomplete,e;if(i[4])return e.kind=h.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;i[1]!=""||i[3]!="m"?e.kind=h.Unknown:e.kind=h.SGR,e.text=i[2];var n=i[0].length;return this._buffer=this._buffer.slice(n),e}else if(t=="]"){if(l<4)return e.kind=h.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=h.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=he(V||(V=U([`
                        (?:                         # legal sequence
                          (\x1B\\)                    # ESC                           |                           # alternate
                          (\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\0-]                 # anything illegal
                          |                           # alternate
                          [\b-]                 # anything illegal
                          |                           # alternate
                          [-]                 # anything illegal
                        )
                    `],[`
                        (?:                         # legal sequence
                          (\\x1b\\\\)                    # ESC \\
                          |                           # alternate
                          (\\x07)                      # BEL (what xterm did)
                        )
                        |                           # alternate (second attempt)
                        (                           # illegal sequence
                          [\\x00-\\x06]                 # anything illegal
                          |                           # alternate
                          [\\x08-\\x1a]                 # anything illegal
                          |                           # alternate
                          [\\x1c-\\x1f]                 # anything illegal
                        )
                    `])))),this._osc_st.lastIndex=0;{let u=this._osc_st.exec(this._buffer);if(u===null)return e.kind=h.Incomplete,e;if(u[3])return e.kind=h.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{let u=this._osc_st.exec(this._buffer);if(u===null)return e.kind=h.Incomplete,e;if(u[3])return e.kind=h.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=G(X||(X=U([`
                        ^                           # beginning of line
                                                    #
                        \x1B]8;                    # OSC Hyperlink
                        [ -:<-~]*       # params (excluding ;)
                        ;                           # end of params
                        ([!-~]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                        ([ -~]+)              # TEXT capture
                        \x1B]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\x1B\\)                  # ESC                           |                           # alternate
                          (?:\x07)                    # BEL (what xterm did)
                        )
                    `],[`
                        ^                           # beginning of line
                                                    #
                        \\x1b\\]8;                    # OSC Hyperlink
                        [\\x20-\\x3a\\x3c-\\x7e]*       # params (excluding ;)
                        ;                           # end of params
                        ([\\x21-\\x7e]{0,512})        # URL capture
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                        ([\\x20-\\x7e]+)              # TEXT capture
                        \\x1b\\]8;;                   # OSC Hyperlink End
                        (?:                         # ST
                          (?:\\x1b\\\\)                  # ESC \\
                          |                           # alternate
                          (?:\\x07)                    # BEL (what xterm did)
                        )
                    `]))));let i=this._buffer.match(this._osc_regex);if(i===null)return e.kind=h.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=h.OSCURL,e.url=i[1],e.text=i[2];var n=i[0].length;return this._buffer=this._buffer.slice(n),e}else if(t=="(")return e.kind=h.Unknown,this._buffer=this._buffer.slice(3),e}}ansi_to_html(e){this.append_buffer(e);for(var l=[];;){var s=this.get_next_packet();if(s.kind==h.EOS||s.kind==h.Incomplete)break;s.kind==h.ESC||s.kind==h.Unknown||(s.kind==h.Text?l.push(this.transform_to_html(this.with_state(s))):s.kind==h.SGR?this.process_ansi(s):s.kind==h.OSCURL&&l.push(this.process_hyperlink(s)))}return l.join("")}with_state(e){return{bold:this.bold,faint:this.faint,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}}process_ansi(e){let l=e.text.split(";");for(;l.length>0;){let s=l.shift(),t=parseInt(s,10);if(isNaN(t)||t===0)this.fg=null,this.bg=null,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1;else if(t===1)this.bold=!0;else if(t===2)this.faint=!0;else if(t===3)this.italic=!0;else if(t===4)this.underline=!0;else if(t===21)this.bold=!1;else if(t===22)this.faint=!1,this.bold=!1;else if(t===23)this.italic=!1;else if(t===24)this.underline=!1;else if(t===39)this.fg=null;else if(t===49)this.bg=null;else if(t>=30&&t<38)this.fg=this.ansi_colors[0][t-30];else if(t>=40&&t<48)this.bg=this.ansi_colors[0][t-40];else if(t>=90&&t<98)this.fg=this.ansi_colors[1][t-90];else if(t>=100&&t<108)this.bg=this.ansi_colors[1][t-100];else if((t===38||t===48)&&l.length>0){let n=t===38,i=l.shift();if(i==="5"&&l.length>0){let a=parseInt(l.shift(),10);a>=0&&a<=255&&(n?this.fg=this.palette_256[a]:this.bg=this.palette_256[a])}if(i==="2"&&l.length>2){let a=parseInt(l.shift(),10),u=parseInt(l.shift(),10),m=parseInt(l.shift(),10);if(a>=0&&a<=255&&u>=0&&u<=255&&m>=0&&m<=255){let E={rgb:[a,u,m],class_name:"truecolor"};n?this.fg=E:this.bg=E}}}}}transform_to_html(e){let l=e.text;if(l.length===0||(l=this.escape_txt_for_html(l),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return l;let s=[],t=[],n=e.fg,i=e.bg;e.bold&&s.push(this._boldStyle),e.faint&&s.push(this._faintStyle),e.italic&&s.push(this._italicStyle),e.underline&&s.push(this._underlineStyle),this._use_classes?(n&&(n.class_name!=="truecolor"?t.push(`${n.class_name}-fg`):s.push(`color:rgb(${n.rgb.join(",")})`)),i&&(i.class_name!=="truecolor"?t.push(`${i.class_name}-bg`):s.push(`background-color:rgb(${i.rgb.join(",")})`))):(n&&s.push(`color:rgb(${n.rgb.join(",")})`),i&&s.push(`background-color:rgb(${i.rgb})`));let a="",u="";return t.length&&(a=` class="${t.join(" ")}"`),s.length&&(u=` style="${s.join(";")}"`),`<span${u}${a}>${l}</span>`}process_hyperlink(e){let l=e.url.split(":");return l.length<1||!this._url_allowlist[l[0]]?"":`<a href="${this.escape_txt_for_html(e.url)}">${this.escape_txt_for_html(e.text)}</a>`}}function G(r,...e){let l=r.raw[0],s=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,t=l.replace(s,"");return new RegExp(t)}function he(r,...e){let l=r.raw[0],s=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,t=l.replace(s,"");return new RegExp(t,"g")}var $,V,X;function W(r,e,l){const s=r.slice();return s[11]=e[l],s}function fe(r){let e,l,s,t=r[11].text+"",n,i;return{c(){e=y("span"),l=new A(!1),s=y("pre"),n=q(t),this.h()},l(a){e=S(a,"SPAN",{class:!0});var u=v(e);l=H(u,!1),u.forEach(d),s=S(a,"PRE",{class:!0});var m=v(s);n=F(m,t),m.forEach(d),this.h()},h(){l.a=null,p(e,"class","prompt svelte-ps6h2d"),p(s,"class",i=k(r[11].type)+" svelte-ps6h2d")},m(a,u){C(a,e,u),l.m(Y,e),C(a,s,u),x(s,n)},p(a,u){u&1&&t!==(t=a[11].text+"")&&D(n,t),u&1&&i!==(i=k(a[11].type)+" svelte-ps6h2d")&&p(s,"class",i)},d(a){a&&(d(e),d(s))}}}function ce(r){let e,l=r[11].text+"",s,t;return{c(){e=y("pre"),s=q(l),this.h()},l(n){e=S(n,"PRE",{class:!0});var i=v(e);s=F(i,l),i.forEach(d),this.h()},h(){p(e,"class",t=k(r[11].type)+" svelte-ps6h2d")},m(n,i){C(n,e,i),x(e,s)},p(n,i){i&1&&l!==(l=n[11].text+"")&&D(s,l),i&1&&t!==(t=k(n[11].type)+" svelte-ps6h2d")&&p(e,"class",t)},d(n){n&&d(e)}}}function oe(r){let e,l,s=r[11].text+"",t;return{c(){e=y("pre"),l=new A(!1),this.h()},l(n){e=S(n,"PRE",{class:!0});var i=v(e);l=H(i,!1),i.forEach(d),this.h()},h(){l.a=null,p(e,"class",t=k(r[11].type)+" svelte-ps6h2d")},m(n,i){C(n,e,i),l.m(s,e)},p(n,i){i&1&&s!==(s=n[11].text+"")&&l.p(s),i&1&&t!==(t=k(n[11].type)+" svelte-ps6h2d")&&p(e,"class",t)},d(n){n&&d(e)}}}function J(r){let e;function l(n,i){return n[11].type==="output"?oe:n[11].type==="error"?ce:fe}let s=l(r),t=s(r);return{c(){e=y("div"),t.c(),this.h()},l(n){e=S(n,"DIV",{class:!0});var i=v(e);t.l(i),i.forEach(d),this.h()},h(){p(e,"class","terminal-line svelte-ps6h2d")},m(n,i){C(n,e,i),t.m(e,null)},p(n,i){s===(s=l(n))&&t?t.p(n,i):(t.d(1),t=s(n),t&&(t.c(),t.m(e,null)))},d(n){n&&d(e),t.d()}}}function _e(r){let e,l,s,t,n,i,a,u,m,E,w,I,o,g=z(r[0]),f=[];for(let _=0;_<g.length;_+=1)f[_]=J(W(r,g,_));return{c(){e=y("div");for(let _=0;_<f.length;_+=1)f[_].c();l=O(),s=y("div"),t=y("span"),n=new A(!1),i=O(),a=y("textarea"),u=O(),m=y("pre"),E=q(r[1]),w=y("span"),this.h()},l(_){e=S(_,"DIV",{class:!0,id:!0});var b=v(e);for(let B=0;B<f.length;B+=1)f[B].l(b);l=R(b),s=S(b,"DIV",{class:!0});var c=v(s);t=S(c,"SPAN",{class:!0});var T=v(t);n=H(T,!1),T.forEach(d),i=R(c),a=S(c,"TEXTAREA",{autocomplete:!0,autocorrect:!0,autocapitalize:!0,spellcheck:!0,name:!0,id:!0,class:!0}),v(a).forEach(d),u=R(c),m=S(c,"PRE",{class:!0});var N=v(m);E=F(N,r[1]),N.forEach(d),w=S(c,"SPAN",{class:!0}),v(w).forEach(d),c.forEach(d),b.forEach(d),this.h()},h(){n.a=null,p(t,"class","prompt svelte-ps6h2d"),p(a,"autocomplete","off"),p(a,"autocorrect","off"),p(a,"autocapitalize","off"),p(a,"spellcheck","false"),p(a,"name","mobileinput"),p(a,"id","touchinput"),p(a,"class","svelte-ps6h2d"),p(m,"class","input svelte-ps6h2d"),p(w,"class","cursor svelte-ps6h2d"),p(s,"class","terminal-line svelte-ps6h2d"),p(e,"class","terminal svelte-ps6h2d"),p(e,"id","terminal-wrapper")},m(_,b){C(_,e,b);for(let c=0;c<f.length;c+=1)f[c]&&f[c].m(e,null);x(e,l),x(e,s),x(s,t),n.m(Y,t),x(s,i),x(s,a),x(s,u),x(s,m),x(m,E),x(s,w),r[6](e),I||(o=[j(window,"keydown",r[3]),j(a,"input",r[4]),j(e,"touchend",r[5])],I=!0)},p(_,[b]){if(b&1){g=z(_[0]);let c;for(c=0;c<g.length;c+=1){const T=W(_,g,c);f[c]?f[c].p(T,b):(f[c]=J(T),f[c].c(),f[c].m(e,l))}for(;c<f.length;c+=1)f[c].d(1);f.length=g.length}b&2&&D(E,_[1])},i:L,o:L,d(_){_&&d(e),ee(f,_),r[6](null),I=!1,Z(o)}}}const Y="anon@zeyus&gt;",pe="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function ge(r,e,l){const s=new ue;let t=[{text:`            __________                                 
         .'----------\`.                              
         | .--------. |                             
         | |########| |       __________              
         | |########| |      /__________             
.--------| \`--------' |------|    --=-- |-------------.
|        \`----,-.-----'      |o ======  |             | 
|       ______|_|_______     |__________|             | 
|      /  %%%%%%%%%%%%  \\                             | 
|     /  %%%%%%%%%%%%%%  \\                            | 
|     ^^^^^^^^^^^^^^^^^^^^                            | 
+-----------------------------------------------------+`,type:"output"},{text:`
`,type:"output"},{text:`WARNING:  Unauthorized access to this system is
forbidden and will be prosecuted by law. By accessing
this system, you agree that your actions may be
monitored if unauthorized usage is suspected.`,type:"output"},{text:`
`,type:"output"},{text:'Type "help" for a list of commands.',type:"output"},{text:`
`,type:"output"}],n="",i;function a(o){o.preventDefault();const g=document.getElementById("touchinput");o.key==="Enter"?(l(0,t=[...t,{text:n,type:"input"}]),E(n),l(1,n=""),g.value="",setTimeout(()=>{l(2,i.scrollTop=i.scrollHeight,i)},0)):o.key==="Backspace"?l(1,n=n.slice(0,-1)):o.key.length===1&&l(1,n+=o.key)}function u(o){const g=o.target;l(1,n=g.value),(n.includes("\r")||n.includes(`
`))&&a(new KeyboardEvent("keydown",{key:"Enter"}))}function m(o,g=25){for(let f=0;f<o.length;f++)setTimeout(()=>{l(1,n+=o[f])},g*f);setTimeout(()=>{a(new KeyboardEvent("keydown",{key:"Enter"}))},g*o.length)}function E(o){const g=o.split(" "),f=g[0];switch(f){case"echo":const _=g.slice(1).join(" "),b=s.ansi_to_html(_.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));l(0,t=[...t,{text:b,type:"output"}]);break;case"clear":l(0,t=[]);break;case"help":l(0,t=[...t,{text:"Commands: echo, clear, help",type:"output"}]);break;default:l(0,t=[...t,{text:`Unknown command: ${f}`,type:"error"}]);break}}var w=o=>{o.preventDefault();const g=document.getElementById("touchinput");g&&g.focus()};m(pe);function I(o){K[o?"unshift":"push"](()=>{i=o,l(2,i)})}return[t,n,i,a,u,w,I]}class de extends P{constructor(e){super(),Q(this,e,ge,_e,M,{})}}function me(r){let e,l;return e=new de({}),{c(){te(e.$$.fragment)},l(s){se(e.$$.fragment,s)},m(s,t){le(e,s,t),l=!0},p:L,i(s){l||(ne(e.$$.fragment,s),l=!0)},o(s){ie(e.$$.fragment,s),l=!1},d(s){re(e,s)}}}function be(r){return ae.set("terminal"),[]}class xe extends P{constructor(e){super(),Q(this,e,be,me,M,{})}}const we=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"}));export{xe as P,we as _};
