import{a as v,t as k,c as ae}from"./disclose-version.CbBHkuzr.mjs";import"./legacy.C9q1SDd6.mjs";import{p as J,t as I,a as Q,H as p,v as u,aZ as ue,I as U,aY as fe,c as g,r as b,s as T,C as he,f as V}from"./runtime.C2dwlhJ5.mjs";import{i as P}from"./lifecycle.ClYKmd6O.mjs";import{e as L,s as q}from"./render.DmFOKR_b.mjs";import{b as oe,i as W}from"./this.dqfZJWtc.mjs";import{e as _e,h as F,i as ce,s as H}from"./class.C4Gqt5Km.mjs";import{t as pe}from"./store.D0mqP-YX.mjs";var A=function(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r},a;(function(r){r[r.EOS=0]="EOS",r[r.Text=1]="Text",r[r.Incomplete=2]="Incomplete",r[r.ESC=3]="ESC",r[r.Unknown=4]="Unknown",r[r.SGR=5]="SGR",r[r.OSCURL=6]="OSCURL"})(a||(a={}));class ge{constructor(){this.VERSION="6.0.2",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_allowlist={http:1,https:1},this._escape_html=!0,this.boldStyle="font-weight:bold",this.faintStyle="opacity:0.7",this.italicStyle="font-style:italic",this.underlineStyle="text-decoration:underline"}set use_classes(e){this._use_classes=e}get use_classes(){return this._use_classes}set url_allowlist(e){this._url_allowlist=e}get url_allowlist(){return this._url_allowlist}set escape_html(e){this._escape_html=e}get escape_html(){return this._escape_html}set boldStyle(e){this._boldStyle=e}get boldStyle(){return this._boldStyle}set faintStyle(e){this._faintStyle=e}get faintStyle(){return this._faintStyle}set italicStyle(e){this._italicStyle=e}get italicStyle(){return this._italicStyle}set underlineStyle(e){this._underlineStyle=e}get underlineStyle(){return this._underlineStyle}setup_palettes(){this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(i=>{i.forEach(t=>{this.palette_256.push(t)})});let e=[0,95,135,175,215,255];for(let i=0;i<6;++i)for(let t=0;t<6;++t)for(let n=0;n<6;++n){let l={rgb:[e[i],e[t],e[n]],class_name:"truecolor"};this.palette_256.push(l)}let s=8;for(let i=0;i<24;++i,s+=10){let t={rgb:[s,s,s],class_name:"truecolor"};this.palette_256.push(t)}}escape_txt_for_html(e){return this._escape_html?e.replace(/[&<>"']/gm,s=>{if(s==="&")return"&amp;";if(s==="<")return"&lt;";if(s===">")return"&gt;";if(s==='"')return"&quot;";if(s==="'")return"&#x27;"}):e}append_buffer(e){var s=this._buffer+e;this._buffer=s}get_next_packet(){var e={kind:a.EOS,text:"",url:""},s=this._buffer.length;if(s==0)return e;var i=this._buffer.indexOf("\x1B");if(i==-1)return e.kind=a.Text,e.text=this._buffer,this._buffer="",e;if(i>0)return e.kind=a.Text,e.text=this._buffer.slice(0,i),this._buffer=this._buffer.slice(i),e;if(i==0){if(s<3)return e.kind=a.Incomplete,e;var t=this._buffer.charAt(1);if(t!="["&&t!="]"&&t!="(")return e.kind=a.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(t=="["){this._csi_regex||(this._csi_regex=X(M||(M=A([`
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
                    `]))));let l=this._buffer.match(this._csi_regex);if(l===null)return e.kind=a.Incomplete,e;if(l[4])return e.kind=a.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;l[1]!=""||l[3]!="m"?e.kind=a.Unknown:e.kind=a.SGR,e.text=l[2];var n=l[0].length;return this._buffer=this._buffer.slice(n),e}else if(t=="]"){if(s<4)return e.kind=a.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=a.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=be(Y||(Y=A([`
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
                    `])))),this._osc_st.lastIndex=0;{let _=this._osc_st.exec(this._buffer);if(_===null)return e.kind=a.Incomplete,e;if(_[3])return e.kind=a.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{let _=this._osc_st.exec(this._buffer);if(_===null)return e.kind=a.Incomplete,e;if(_[3])return e.kind=a.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=X(Z||(Z=A([`
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
                    `]))));let l=this._buffer.match(this._osc_regex);if(l===null)return e.kind=a.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=a.OSCURL,e.url=l[1],e.text=l[2];var n=l[0].length;return this._buffer=this._buffer.slice(n),e}else if(t=="(")return e.kind=a.Unknown,this._buffer=this._buffer.slice(3),e}}ansi_to_html(e){this.append_buffer(e);for(var s=[];;){var i=this.get_next_packet();if(i.kind==a.EOS||i.kind==a.Incomplete)break;i.kind==a.ESC||i.kind==a.Unknown||(i.kind==a.Text?s.push(this.transform_to_html(this.with_state(i))):i.kind==a.SGR?this.process_ansi(i):i.kind==a.OSCURL&&s.push(this.process_hyperlink(i)))}return s.join("")}with_state(e){return{bold:this.bold,faint:this.faint,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}}process_ansi(e){let s=e.text.split(";");for(;s.length>0;){let i=s.shift(),t=parseInt(i,10);if(isNaN(t)||t===0)this.fg=null,this.bg=null,this.bold=!1,this.faint=!1,this.italic=!1,this.underline=!1;else if(t===1)this.bold=!0;else if(t===2)this.faint=!0;else if(t===3)this.italic=!0;else if(t===4)this.underline=!0;else if(t===21)this.bold=!1;else if(t===22)this.faint=!1,this.bold=!1;else if(t===23)this.italic=!1;else if(t===24)this.underline=!1;else if(t===39)this.fg=null;else if(t===49)this.bg=null;else if(t>=30&&t<38)this.fg=this.ansi_colors[0][t-30];else if(t>=40&&t<48)this.bg=this.ansi_colors[0][t-40];else if(t>=90&&t<98)this.fg=this.ansi_colors[1][t-90];else if(t>=100&&t<108)this.bg=this.ansi_colors[1][t-100];else if((t===38||t===48)&&s.length>0){let n=t===38,l=s.shift();if(l==="5"&&s.length>0){let o=parseInt(s.shift(),10);o>=0&&o<=255&&(n?this.fg=this.palette_256[o]:this.bg=this.palette_256[o])}if(l==="2"&&s.length>2){let o=parseInt(s.shift(),10),_=parseInt(s.shift(),10),S=parseInt(s.shift(),10);if(o>=0&&o<=255&&_>=0&&_<=255&&S>=0&&S<=255){let C={rgb:[o,_,S],class_name:"truecolor"};n?this.fg=C:this.bg=C}}}}}transform_to_html(e){let s=e.text;if(s.length===0||(s=this.escape_txt_for_html(s),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return s;let i=[],t=[],n=e.fg,l=e.bg;e.bold&&i.push(this._boldStyle),e.faint&&i.push(this._faintStyle),e.italic&&i.push(this._italicStyle),e.underline&&i.push(this._underlineStyle),this._use_classes?(n&&(n.class_name!=="truecolor"?t.push(`${n.class_name}-fg`):i.push(`color:rgb(${n.rgb.join(",")})`)),l&&(l.class_name!=="truecolor"?t.push(`${l.class_name}-bg`):i.push(`background-color:rgb(${l.rgb.join(",")})`))):(n&&i.push(`color:rgb(${n.rgb.join(",")})`),l&&i.push(`background-color:rgb(${l.rgb})`));let o="",_="";return t.length&&(o=` class="${t.join(" ")}"`),i.length&&(_=` style="${i.join(";")}"`),`<span${_}${o}>${s}</span>`}process_hyperlink(e){let s=e.url.split(":");return s.length<1||!this._url_allowlist[s[0]]?"":`<a href="${this.escape_txt_for_html(e.url)}">${this.escape_txt_for_html(e.text)}</a>`}}function X(r,...e){let s=r.raw[0],i=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,t=s.replace(i,"");return new RegExp(t)}function be(r,...e){let s=r.raw[0],i=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,t=s.replace(i,"");return new RegExp(t,"g")}var M,Y,Z,de=k("<pre><!></pre>"),me=k("<pre> </pre>"),xe=k('<span class="prompt svelte-ps6h2d"><!></span><pre> </pre>',1),ye=k('<div class="terminal-line svelte-ps6h2d"><!></div>'),ve=k('<div class="terminal svelte-ps6h2d" id="terminal-wrapper"><!> <div class="terminal-line svelte-ps6h2d"><span class="prompt svelte-ps6h2d"><!></span> <textarea autocomplete="off" spellcheck="false" autocapitalize="off" name="mobileinput" id="touchinput" class="svelte-ps6h2d"></textarea> <pre class="input svelte-ps6h2d"> </pre><span class="cursor svelte-ps6h2d"></span></div></div>');function Se(r,e){J(e,!1);const s=new ge,i="anon@zeyus&gt;";let t=U([{text:`            __________                                 
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
`,type:"output"}]),n=U(""),l=U();function o(h){h.preventDefault();const f=document.getElementById("touchinput");h.key==="Enter"?(p(t,[...u(t),{text:u(n),type:"input"}]),C(u(n)),p(n,""),f.value="",setTimeout(()=>{fe(l,u(l).scrollTop=u(l).scrollHeight)},0)):h.key==="Backspace"?p(n,u(n).slice(0,-1)):h.key.length===1&&p(n,u(n)+h.key)}function _(h){const f=h.target;p(n,f.value),(u(n).includes("\r")||u(n).includes(`
`))&&o(new KeyboardEvent("keydown",{key:"Enter"}))}function S(h,f=25){for(let c=0;c<h.length;c++)setTimeout(()=>{p(n,u(n)+h[c])},f*c);setTimeout(()=>{o(new KeyboardEvent("keydown",{key:"Enter"}))},f*h.length)}function C(h){const f=h.split(" "),c=f[0];switch(c){case"echo":const O=f.slice(1).join(" "),j=s.ansi_to_html(O.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));p(t,[...u(t),{text:j,type:"output"}]);break;case"clear":p(t,[]);break;case"help":p(t,[...u(t),{text:"Commands: echo, clear, help",type:"output"}]);break;default:p(t,[...u(t),{text:`Unknown command: ${c}`,type:"error"}]);break}}const K=h=>{h.preventDefault();const f=document.getElementById("touchinput");f&&f.focus()};S("echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍"),P();var w=ve();L("keydown",ue,o);var G=g(w);_e(G,1,()=>u(t),ce,(h,f)=>{var c=ye(),O=g(c);{var j=x=>{var d=de(),$=g(d);F($,()=>u(f).text,!1,!1),b(d),I(()=>H(d,`${u(f).type??""} svelte-ps6h2d`)),v(x,d)},se=x=>{var d=ae(),$=V(d);{var ie=y=>{var m=me(),E=g(m,!0);b(m),I(()=>{H(m,`${u(f).type??""} svelte-ps6h2d`),q(E,u(f).text)}),v(y,m)},ne=y=>{var m=xe(),E=V(m),le=g(E);F(le,()=>i,!1,!1),b(E);var R=T(E),re=g(R,!0);b(R),I(()=>{H(R,`${u(f).type??""} svelte-ps6h2d`),q(re,u(f).text)}),v(y,m)};W($,y=>{u(f).type==="error"?y(ie):y(ne,!1)},!0)}v(x,d)};W(O,x=>{u(f).type==="output"?x(j):x(se,!1)})}b(c),v(h,c)});var z=T(G,2),B=g(z),ee=g(B);F(ee,()=>i,!1,!1),b(B);var D=T(B,2),N=T(D,2),te=g(N,!0);b(N),he(),b(z),b(w),oe(w,h=>p(l,h),()=>u(l)),I(()=>q(te,u(n))),L("input",D,_),L("touchend",w,K),v(r,w),Q()}function we(r,e){J(e,!1),pe.set("terminal"),P(),Se(r,{}),Q()}const Re=Object.freeze(Object.defineProperty({__proto__:null,default:we},Symbol.toStringTag,{value:"Module"}));export{we as _,Re as a};
