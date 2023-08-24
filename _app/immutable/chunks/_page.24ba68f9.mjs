import{S as L,i as A,s as q,e as m,a as F,t as I,c as v,b as y,g as D,f as d,d as O,I as b,h as k,j as w,Q as j,k as B,n as T,R as G,T as M,M as P,U as C,A as V,B as z,C as W,w as X,x as Q,D as J}from"./index.60c0155e.mjs";import{t as Y}from"./store.99fe3e2c.mjs";var Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var H={};(function(p){(function(s,i){if(typeof p.nodeName!="string")i(p);else{var t={};i(t),s.AnsiUp=t.default}})(Z,function(s){var i=this&&this.__makeTemplateObject||function(a,e){return Object.defineProperty?Object.defineProperty(a,"raw",{value:e}):a.raw=e,a},t;(function(a){a[a.EOS=0]="EOS",a[a.Text=1]="Text",a[a.Incomplete=2]="Incomplete",a[a.ESC=3]="ESC",a[a.Unknown=4]="Unknown",a[a.SGR=5]="SGR",a[a.OSCURL=6]="OSCURL"})(t||(t={}));var r=function(){function a(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(a.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),a.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(E){E.forEach(function(S){e.palette_256.push(S)})});for(var o=[0,95,135,175,215,255],c=0;c<6;++c)for(var n=0;n<6;++n)for(var f=0;f<6;++f){var h={rgb:[o[c],o[n],o[f]],class_name:"truecolor"};this.palette_256.push(h)}for(var g=8,_=0;_<24;++_,g+=10){var x={rgb:[g,g,g],class_name:"truecolor"};this.palette_256.push(x)}},a.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(o){if(o==="&")return"&amp;";if(o==="<")return"&lt;";if(o===">")return"&gt;";if(o==='"')return"&quot;";if(o==="'")return"&#x27;"}):e},a.prototype.append_buffer=function(e){var o=this._buffer+e;this._buffer=o},a.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},o=this._buffer.length;if(o==0)return e;var c=this._buffer.indexOf("\x1B");if(c==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(c>0)return e.kind=t.Text,e.text=this._buffer.slice(0,c),this._buffer=this._buffer.slice(c),e;if(c==0){if(o<3)return e.kind=t.Incomplete,e;var n=this._buffer.charAt(1);if(n!="["&&n!="]"&&n!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(n=="["){this._csi_regex||(this._csi_regex=l(i([`
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
                    `])));var f=this._buffer.match(this._csi_regex);if(f===null)return e.kind=t.Incomplete,e;if(f[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;f[1]!=""||f[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=f[2];var h=f[0].length;return this._buffer=this._buffer.slice(h),e}else if(n=="]"){if(o<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=u(i([`
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
                    `]))),this._osc_st.lastIndex=0;{var g=this._osc_st.exec(this._buffer);if(g===null)return e.kind=t.Incomplete,e;if(g[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var _=this._osc_st.exec(this._buffer);if(_===null)return e.kind=t.Incomplete,e;if(_[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=l(i([`
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
                    `])));var f=this._buffer.match(this._osc_regex);if(f===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=f[1],e.text=f[2];var h=f[0].length;return this._buffer=this._buffer.slice(h),e}else if(n=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},a.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var o=[];;){var c=this.get_next_packet();if(c.kind==t.EOS||c.kind==t.Incomplete)break;c.kind==t.ESC||c.kind==t.Unknown||(c.kind==t.Text?o.push(this.transform_to_html(this.with_state(c))):c.kind==t.SGR?this.process_ansi(c):c.kind==t.OSCURL&&o.push(this.process_hyperlink(c)))}return o.join("")},a.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},a.prototype.process_ansi=function(e){for(var o=e.text.split(";");o.length>0;){var c=o.shift(),n=parseInt(c,10);if(isNaN(n)||n===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(n===1)this.bold=!0;else if(n===3)this.italic=!0;else if(n===4)this.underline=!0;else if(n===22)this.bold=!1;else if(n===23)this.italic=!1;else if(n===24)this.underline=!1;else if(n===39)this.fg=null;else if(n===49)this.bg=null;else if(n>=30&&n<38)this.fg=this.ansi_colors[0][n-30];else if(n>=40&&n<48)this.bg=this.ansi_colors[0][n-40];else if(n>=90&&n<98)this.fg=this.ansi_colors[1][n-90];else if(n>=100&&n<108)this.bg=this.ansi_colors[1][n-100];else if((n===38||n===48)&&o.length>0){var f=n===38,h=o.shift();if(h==="5"&&o.length>0){var g=parseInt(o.shift(),10);g>=0&&g<=255&&(f?this.fg=this.palette_256[g]:this.bg=this.palette_256[g])}if(h==="2"&&o.length>2){var _=parseInt(o.shift(),10),x=parseInt(o.shift(),10),E=parseInt(o.shift(),10);if(_>=0&&_<=255&&x>=0&&x<=255&&E>=0&&E<=255){var S={rgb:[_,x,E],class_name:"truecolor"};f?this.fg=S:this.bg=S}}}}},a.prototype.transform_to_html=function(e){var o=e.text;if(o.length===0||(o=this.escape_txt_for_html(o),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return o;var c=[],n=[],f=e.fg,h=e.bg;e.bold&&c.push("font-weight:bold"),e.italic&&c.push("font-style:italic"),e.underline&&c.push("text-decoration:underline"),this._use_classes?(f&&(f.class_name!=="truecolor"?n.push(f.class_name+"-fg"):c.push("color:rgb("+f.rgb.join(",")+")")),h&&(h.class_name!=="truecolor"?n.push(h.class_name+"-bg"):c.push("background-color:rgb("+h.rgb.join(",")+")"))):(f&&c.push("color:rgb("+f.rgb.join(",")+")"),h&&c.push("background-color:rgb("+h.rgb+")"));var g="",_="";return n.length&&(g=' class="'+n.join(" ")+'"'),c.length&&(_=' style="'+c.join(";")+'"'),"<span"+_+g+">"+o+"</span>"},a.prototype.process_hyperlink=function(e){var o=e.url.split(":");if(o.length<1||!this._url_whitelist[o[0]])return"";var c='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return c},a}();function l(a){var e=a.raw[0],o=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,c=e.replace(o,"");return new RegExp(c)}function u(a){var e=a.raw[0],o=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,c=e.replace(o,"");return new RegExp(c,"g")}Object.defineProperty(s,"__esModule",{value:!0}),s.default=r})})(H);const K=$(H);function R(p,s,i){const t=p.slice();return t[8]=s[i],t}function ee(p){let s,i,t=p[8].text+"",r,l;return{c(){s=m("span"),i=m("pre"),r=I(t),this.h()},l(u){s=v(u,"SPAN",{class:!0});var a=y(s);a.forEach(d),i=v(u,"PRE",{class:!0});var e=y(i);r=O(e,t),e.forEach(d),this.h()},h(){b(s,"class","prompt svelte-19tww2i"),b(i,"class",l=C(p[8].type)+" svelte-19tww2i")},m(u,a){k(u,s,a),s.innerHTML=N,k(u,i,a),w(i,r)},p(u,a){a&1&&t!==(t=u[8].text+"")&&B(r,t),a&1&&l!==(l=C(u[8].type)+" svelte-19tww2i")&&b(i,"class",l)},d(u){u&&d(s),u&&d(i)}}}function te(p){let s,i=p[8].text+"",t,r;return{c(){s=m("pre"),t=I(i),this.h()},l(l){s=v(l,"PRE",{class:!0});var u=y(s);t=O(u,i),u.forEach(d),this.h()},h(){b(s,"class",r=C(p[8].type)+" svelte-19tww2i")},m(l,u){k(l,s,u),w(s,t)},p(l,u){u&1&&i!==(i=l[8].text+"")&&B(t,i),u&1&&r!==(r=C(l[8].type)+" svelte-19tww2i")&&b(s,"class",r)},d(l){l&&d(s)}}}function se(p){let s,i=p[8].text+"",t;return{c(){s=m("pre"),this.h()},l(r){s=v(r,"PRE",{class:!0});var l=y(s);l.forEach(d),this.h()},h(){b(s,"class",t=C(p[8].type)+" svelte-19tww2i")},m(r,l){k(r,s,l),s.innerHTML=i},p(r,l){l&1&&i!==(i=r[8].text+"")&&(s.innerHTML=i),l&1&&t!==(t=C(r[8].type)+" svelte-19tww2i")&&b(s,"class",t)},d(r){r&&d(s)}}}function U(p){let s;function i(l,u){return l[8].type==="output"?se:l[8].type==="error"?te:ee}let t=i(p),r=t(p);return{c(){s=m("div"),r.c(),this.h()},l(l){s=v(l,"DIV",{class:!0});var u=y(s);r.l(u),u.forEach(d),this.h()},h(){b(s,"class","terminal-line svelte-19tww2i")},m(l,u){k(l,s,u),r.m(s,null)},p(l,u){t===(t=i(l))&&r?r.p(l,u):(r.d(1),r=t(l),r&&(r.c(),r.m(s,null)))},d(l){l&&d(s),r.d()}}}function ne(p){let s,i,t,r,l,u,a,e,o,c,n=p[0],f=[];for(let h=0;h<n.length;h+=1)f[h]=U(R(p,n,h));return{c(){s=m("div");for(let h=0;h<f.length;h+=1)f[h].c();i=F(),t=m("div"),r=m("span"),l=m("input"),u=m("pre"),a=I(p[1]),e=m("span"),this.h()},l(h){s=v(h,"DIV",{class:!0});var g=y(s);for(let S=0;S<f.length;S+=1)f[S].l(g);i=D(g),t=v(g,"DIV",{class:!0});var _=y(t);r=v(_,"SPAN",{class:!0});var x=y(r);x.forEach(d),l=v(_,"INPUT",{type:!0,name:!0,id:!0}),u=v(_,"PRE",{class:!0});var E=y(u);a=O(E,p[1]),E.forEach(d),e=v(_,"SPAN",{class:!0}),y(e).forEach(d),_.forEach(d),g.forEach(d),this.h()},h(){b(r,"class","prompt svelte-19tww2i"),b(l,"type","hidden"),b(l,"name","mobileinput"),b(l,"id","touchdevice"),b(u,"class","input svelte-19tww2i"),b(e,"class","cursor svelte-19tww2i"),b(t,"class","terminal-line svelte-19tww2i"),b(s,"class","terminal svelte-19tww2i")},m(h,g){k(h,s,g);for(let _=0;_<f.length;_+=1)f[_]&&f[_].m(s,null);w(s,i),w(s,t),w(t,r),r.innerHTML=N,w(t,l),w(t,u),w(u,a),w(t,e),p[4](s),o||(c=[j(window,"keydown",p[3]),j(s,"touchstart",re,{passive:!0})],o=!0)},p(h,[g]){if(g&1){n=h[0];let _;for(_=0;_<n.length;_+=1){const x=R(h,n,_);f[_]?f[_].p(x,g):(f[_]=U(x),f[_].c(),f[_].m(s,i))}for(;_<f.length;_+=1)f[_].d(1);f.length=n.length}g&2&&B(a,h[1])},i:T,o:T,d(h){h&&d(s),G(f,h),p[4](null),o=!1,M(c)}}}const N="anon@zeyus&gt;",ie="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function re(){document.getElementById("touchdevice").focus()}function le(p,s,i){const t=new K;let r=[{text:`            __________                                 
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
`,type:"output"}],l="",u;function a(n){n.key==="Enter"?(i(0,r=[...r,{text:l,type:"input"}]),o(l),i(1,l=""),setTimeout(()=>{i(2,u.scrollTop=u.scrollHeight,u)},0)):n.key==="Backspace"?i(1,l=l.slice(0,-1)):n.key.length===1&&i(1,l+=n.key)}function e(n,f=25){for(let h=0;h<n.length;h++)setTimeout(()=>{i(1,l+=n[h])},f*h);setTimeout(()=>{a(new KeyboardEvent("keydown",{key:"Enter"}))},f*n.length)}function o(n){const f=n.split(" "),h=f[0];switch(h){case"echo":const g=f.slice(1).join(" "),_=t.ansi_to_html(g.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));i(0,r=[...r,{text:_,type:"output"}]);break;case"clear":i(0,r=[]);break;case"help":i(0,r=[...r,{text:"Commands: echo, clear, help",type:"output"}]);break;default:i(0,r=[...r,{text:`Unknown command: ${h}`,type:"error"}]);break}}e(ie);function c(n){P[n?"unshift":"push"](()=>{u=n,i(2,u)})}return[r,l,u,a,c]}class ae extends L{constructor(s){super(),A(this,s,le,ne,q,{})}}function oe(p){let s,i;return s=new ae({}),{c(){V(s.$$.fragment)},l(t){z(s.$$.fragment,t)},m(t,r){W(s,t,r),i=!0},p:T,i(t){i||(X(s.$$.fragment,t),i=!0)},o(t){Q(s.$$.fragment,t),i=!1},d(t){J(s,t)}}}function fe(p){return Y.set("terminal"),[]}class he extends L{constructor(s){super(),A(this,s,fe,oe,q,{})}}export{he as default};
