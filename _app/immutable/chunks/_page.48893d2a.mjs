import{S as L,i as A,s as H,e as y,a as F,t as I,c as v,b as E,g as D,f as d,d as B,I as b,h as S,j as w,Q as j,k as O,n as C,R as G,T as M,M as V,U as T,A as P,B as z,C as W,w as X,x as Q,D as J}from"./index.60c0155e.mjs";import{t as Y}from"./store.99fe3e2c.mjs";var Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function K(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var q={};(function(p){(function(s,i){if(typeof p.nodeName!="string")i(p);else{var t={};i(t),s.AnsiUp=t.default}})(Z,function(s){var i=this&&this.__makeTemplateObject||function(a,e){return Object.defineProperty?Object.defineProperty(a,"raw",{value:e}):a.raw=e,a},t;(function(a){a[a.EOS=0]="EOS",a[a.Text=1]="Text",a[a.Incomplete=2]="Incomplete",a[a.ESC=3]="ESC",a[a.Unknown=4]="Unknown",a[a.SGR=5]="SGR",a[a.OSCURL=6]="OSCURL"})(t||(t={}));var r=function(){function a(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(a.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),a.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(x){x.forEach(function(k){e.palette_256.push(k)})});for(var f=[0,95,135,175,215,255],_=0;_<6;++_)for(var o=0;o<6;++o)for(var c=0;c<6;++c){var l={rgb:[f[_],f[o],f[c]],class_name:"truecolor"};this.palette_256.push(l)}for(var g=8,h=0;h<24;++h,g+=10){var m={rgb:[g,g,g],class_name:"truecolor"};this.palette_256.push(m)}},a.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(f){if(f==="&")return"&amp;";if(f==="<")return"&lt;";if(f===">")return"&gt;";if(f==='"')return"&quot;";if(f==="'")return"&#x27;"}):e},a.prototype.append_buffer=function(e){var f=this._buffer+e;this._buffer=f},a.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},f=this._buffer.length;if(f==0)return e;var _=this._buffer.indexOf("\x1B");if(_==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(_>0)return e.kind=t.Text,e.text=this._buffer.slice(0,_),this._buffer=this._buffer.slice(_),e;if(_==0){if(f<3)return e.kind=t.Incomplete,e;var o=this._buffer.charAt(1);if(o!="["&&o!="]"&&o!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(o=="["){this._csi_regex||(this._csi_regex=n(i([`
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
                    `])));var c=this._buffer.match(this._csi_regex);if(c===null)return e.kind=t.Incomplete,e;if(c[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;c[1]!=""||c[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=c[2];var l=c[0].length;return this._buffer=this._buffer.slice(l),e}else if(o=="]"){if(f<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=u(i([`
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
                    `]))),this._osc_st.lastIndex=0;{var g=this._osc_st.exec(this._buffer);if(g===null)return e.kind=t.Incomplete,e;if(g[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var h=this._osc_st.exec(this._buffer);if(h===null)return e.kind=t.Incomplete,e;if(h[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=n(i([`
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
                    `])));var c=this._buffer.match(this._osc_regex);if(c===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=c[1],e.text=c[2];var l=c[0].length;return this._buffer=this._buffer.slice(l),e}else if(o=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},a.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var f=[];;){var _=this.get_next_packet();if(_.kind==t.EOS||_.kind==t.Incomplete)break;_.kind==t.ESC||_.kind==t.Unknown||(_.kind==t.Text?f.push(this.transform_to_html(this.with_state(_))):_.kind==t.SGR?this.process_ansi(_):_.kind==t.OSCURL&&f.push(this.process_hyperlink(_)))}return f.join("")},a.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},a.prototype.process_ansi=function(e){for(var f=e.text.split(";");f.length>0;){var _=f.shift(),o=parseInt(_,10);if(isNaN(o)||o===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(o===1)this.bold=!0;else if(o===3)this.italic=!0;else if(o===4)this.underline=!0;else if(o===22)this.bold=!1;else if(o===23)this.italic=!1;else if(o===24)this.underline=!1;else if(o===39)this.fg=null;else if(o===49)this.bg=null;else if(o>=30&&o<38)this.fg=this.ansi_colors[0][o-30];else if(o>=40&&o<48)this.bg=this.ansi_colors[0][o-40];else if(o>=90&&o<98)this.fg=this.ansi_colors[1][o-90];else if(o>=100&&o<108)this.bg=this.ansi_colors[1][o-100];else if((o===38||o===48)&&f.length>0){var c=o===38,l=f.shift();if(l==="5"&&f.length>0){var g=parseInt(f.shift(),10);g>=0&&g<=255&&(c?this.fg=this.palette_256[g]:this.bg=this.palette_256[g])}if(l==="2"&&f.length>2){var h=parseInt(f.shift(),10),m=parseInt(f.shift(),10),x=parseInt(f.shift(),10);if(h>=0&&h<=255&&m>=0&&m<=255&&x>=0&&x<=255){var k={rgb:[h,m,x],class_name:"truecolor"};c?this.fg=k:this.bg=k}}}}},a.prototype.transform_to_html=function(e){var f=e.text;if(f.length===0||(f=this.escape_txt_for_html(f),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return f;var _=[],o=[],c=e.fg,l=e.bg;e.bold&&_.push("font-weight:bold"),e.italic&&_.push("font-style:italic"),e.underline&&_.push("text-decoration:underline"),this._use_classes?(c&&(c.class_name!=="truecolor"?o.push(c.class_name+"-fg"):_.push("color:rgb("+c.rgb.join(",")+")")),l&&(l.class_name!=="truecolor"?o.push(l.class_name+"-bg"):_.push("background-color:rgb("+l.rgb.join(",")+")"))):(c&&_.push("color:rgb("+c.rgb.join(",")+")"),l&&_.push("background-color:rgb("+l.rgb+")"));var g="",h="";return o.length&&(g=' class="'+o.join(" ")+'"'),_.length&&(h=' style="'+_.join(";")+'"'),"<span"+h+g+">"+f+"</span>"},a.prototype.process_hyperlink=function(e){var f=e.url.split(":");if(f.length<1||!this._url_whitelist[f[0]])return"";var _='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return _},a}();function n(a){var e=a.raw[0],f=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,_=e.replace(f,"");return new RegExp(_)}function u(a){var e=a.raw[0],f=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,_=e.replace(f,"");return new RegExp(_,"g")}Object.defineProperty(s,"__esModule",{value:!0}),s.default=r})})(q);const $=K(q);function U(p,s,i){const t=p.slice();return t[10]=s[i],t}function ee(p){let s,i,t=p[10].text+"",r,n;return{c(){s=y("span"),i=y("pre"),r=I(t),this.h()},l(u){s=v(u,"SPAN",{class:!0});var a=E(s);a.forEach(d),i=v(u,"PRE",{class:!0});var e=E(i);r=B(e,t),e.forEach(d),this.h()},h(){b(s,"class","prompt svelte-jtse0h"),b(i,"class",n=T(p[10].type)+" svelte-jtse0h")},m(u,a){S(u,s,a),s.innerHTML=N,S(u,i,a),w(i,r)},p(u,a){a&1&&t!==(t=u[10].text+"")&&O(r,t),a&1&&n!==(n=T(u[10].type)+" svelte-jtse0h")&&b(i,"class",n)},d(u){u&&d(s),u&&d(i)}}}function te(p){let s,i=p[10].text+"",t,r;return{c(){s=y("pre"),t=I(i),this.h()},l(n){s=v(n,"PRE",{class:!0});var u=E(s);t=B(u,i),u.forEach(d),this.h()},h(){b(s,"class",r=T(p[10].type)+" svelte-jtse0h")},m(n,u){S(n,s,u),w(s,t)},p(n,u){u&1&&i!==(i=n[10].text+"")&&O(t,i),u&1&&r!==(r=T(n[10].type)+" svelte-jtse0h")&&b(s,"class",r)},d(n){n&&d(s)}}}function se(p){let s,i=p[10].text+"",t;return{c(){s=y("pre"),this.h()},l(r){s=v(r,"PRE",{class:!0});var n=E(s);n.forEach(d),this.h()},h(){b(s,"class",t=T(p[10].type)+" svelte-jtse0h")},m(r,n){S(r,s,n),s.innerHTML=i},p(r,n){n&1&&i!==(i=r[10].text+"")&&(s.innerHTML=i),n&1&&t!==(t=T(r[10].type)+" svelte-jtse0h")&&b(s,"class",t)},d(r){r&&d(s)}}}function R(p){let s;function i(n,u){return n[10].type==="output"?se:n[10].type==="error"?te:ee}let t=i(p),r=t(p);return{c(){s=y("div"),r.c(),this.h()},l(n){s=v(n,"DIV",{class:!0});var u=E(s);r.l(u),u.forEach(d),this.h()},h(){b(s,"class","terminal-line svelte-jtse0h")},m(n,u){S(n,s,u),r.m(s,null)},p(n,u){t===(t=i(n))&&r?r.p(n,u):(r.d(1),r=t(n),r&&(r.c(),r.m(s,null)))},d(n){n&&d(s),r.d()}}}function ne(p){let s,i,t,r,n,u,a,e,f,_,o=p[0],c=[];for(let l=0;l<o.length;l+=1)c[l]=R(U(p,o,l));return{c(){s=y("div");for(let l=0;l<c.length;l+=1)c[l].c();i=F(),t=y("div"),r=y("span"),n=y("input"),u=y("pre"),a=I(p[1]),e=y("span"),this.h()},l(l){s=v(l,"DIV",{class:!0,id:!0});var g=E(s);for(let k=0;k<c.length;k+=1)c[k].l(g);i=D(g),t=v(g,"DIV",{class:!0});var h=E(t);r=v(h,"SPAN",{class:!0});var m=E(r);m.forEach(d),n=v(h,"INPUT",{type:!0,name:!0,id:!0,class:!0}),u=v(h,"PRE",{class:!0});var x=E(u);a=B(x,p[1]),x.forEach(d),e=v(h,"SPAN",{class:!0}),E(e).forEach(d),h.forEach(d),g.forEach(d),this.h()},h(){b(r,"class","prompt svelte-jtse0h"),b(n,"type","text"),b(n,"name","mobileinput"),b(n,"id","touchinput"),b(n,"class","svelte-jtse0h"),b(u,"class","input svelte-jtse0h"),b(e,"class","cursor svelte-jtse0h"),b(t,"class","terminal-line svelte-jtse0h"),b(s,"class","terminal svelte-jtse0h"),b(s,"id","#terminal-wrapper")},m(l,g){S(l,s,g);for(let h=0;h<c.length;h+=1)c[h]&&c[h].m(s,null);w(s,i),w(s,t),w(t,r),r.innerHTML=N,w(t,n),w(t,u),w(u,a),w(t,e),p[6](s),f||(_=[j(window,"keydown",p[3]),j(n,"keyup",p[5]),j(n,"input",p[4]),j(s,"load",re)],f=!0)},p(l,[g]){if(g&1){o=l[0];let h;for(h=0;h<o.length;h+=1){const m=U(l,o,h);c[h]?c[h].p(m,g):(c[h]=R(m),c[h].c(),c[h].m(s,i))}for(;h<c.length;h+=1)c[h].d(1);c.length=o.length}g&2&&O(a,l[1])},i:C,o:C,d(l){l&&d(s),G(c,l),p[6](null),f=!1,M(_)}}}const N="anon@zeyus&gt;",ie="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function re(){var p=i=>{const t=document.getElementById("touchinput");t&&t.focus()},s=document.getElementById("terminal-wrapper");s&&s.addEventListener("touchend",p)}function le(p,s,i){const t=new $;let r=[{text:`            __________                                 
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
`,type:"output"}],n="",u;function a(l){l.key==="Enter"?(i(0,r=[...r,{text:n,type:"input"}]),o(n),i(1,n=""),setTimeout(()=>{i(2,u.scrollTop=u.scrollHeight,u)},0)):l.key==="Backspace"?i(1,n=n.slice(0,-1)):l.key.length===1&&i(1,n+=l.key)}function e(l){const g=l.target;i(1,n=g.value)}function f(l){if(l.key==="Enter"){const g=document.getElementById("touchinput");g&&g.blur(),i(0,r=[...r,{text:n,type:"input"}]),o(n),i(1,n=""),setTimeout(()=>{i(2,u.scrollTop=u.scrollHeight,u)},0)}}function _(l,g=25){for(let h=0;h<l.length;h++)setTimeout(()=>{i(1,n+=l[h])},g*h);setTimeout(()=>{a(new KeyboardEvent("keydown",{key:"Enter"}))},g*l.length)}function o(l){const g=l.split(" "),h=g[0];switch(h){case"echo":const m=g.slice(1).join(" "),x=t.ansi_to_html(m.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));i(0,r=[...r,{text:x,type:"output"}]);break;case"clear":i(0,r=[]);break;case"help":i(0,r=[...r,{text:"Commands: echo, clear, help",type:"output"}]);break;default:i(0,r=[...r,{text:`Unknown command: ${h}`,type:"error"}]);break}}_(ie);function c(l){V[l?"unshift":"push"](()=>{u=l,i(2,u)})}return[r,n,u,a,e,f,c]}class ae extends L{constructor(s){super(),A(this,s,le,ne,H,{})}}function oe(p){let s,i;return s=new ae({}),{c(){P(s.$$.fragment)},l(t){z(s.$$.fragment,t)},m(t,r){W(s,t,r),i=!0},p:C,i(t){i||(X(s.$$.fragment,t),i=!0)},o(t){Q(s.$$.fragment,t),i=!1},d(t){J(s,t)}}}function fe(p){return Y.set("terminal"),[]}class he extends L{constructor(s){super(),A(this,s,fe,oe,H,{})}}export{he as default};
