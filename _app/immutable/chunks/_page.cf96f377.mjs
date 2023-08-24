import{S as z,i as L,s as A,e as m,a as N,t as T,c as v,b as y,g as D,f as d,d as I,I as b,h as k,j as E,Q as B,k as O,n as C,R as F,T as G,M,U as j,A as P,B as V,C as W,w as X,x as Q,D as J}from"./index.60c0155e.mjs";import{t as Y}from"./store.99fe3e2c.mjs";var Z=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var q={};(function(_){(function(n,i){if(typeof _.nodeName!="string")i(_);else{var t={};i(t),n.AnsiUp=t.default}})(Z,function(n){var i=this&&this.__makeTemplateObject||function(a,e){return Object.defineProperty?Object.defineProperty(a,"raw",{value:e}):a.raw=e,a},t;(function(a){a[a.EOS=0]="EOS",a[a.Text=1]="Text",a[a.Incomplete=2]="Incomplete",a[a.ESC=3]="ESC",a[a.Unknown=4]="Unknown",a[a.SGR=5]="SGR",a[a.OSCURL=6]="OSCURL"})(t||(t={}));var l=function(){function a(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(a.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(a.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),a.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(w){w.forEach(function(S){e.palette_256.push(S)})});for(var o=[0,95,135,175,215,255],u=0;u<6;++u)for(var s=0;s<6;++s)for(var f=0;f<6;++f){var h={rgb:[o[u],o[s],o[f]],class_name:"truecolor"};this.palette_256.push(h)}for(var g=8,p=0;p<24;++p,g+=10){var x={rgb:[g,g,g],class_name:"truecolor"};this.palette_256.push(x)}},a.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(o){if(o==="&")return"&amp;";if(o==="<")return"&lt;";if(o===">")return"&gt;";if(o==='"')return"&quot;";if(o==="'")return"&#x27;"}):e},a.prototype.append_buffer=function(e){var o=this._buffer+e;this._buffer=o},a.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},o=this._buffer.length;if(o==0)return e;var u=this._buffer.indexOf("\x1B");if(u==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(u>0)return e.kind=t.Text,e.text=this._buffer.slice(0,u),this._buffer=this._buffer.slice(u),e;if(u==0){if(o<3)return e.kind=t.Incomplete,e;var s=this._buffer.charAt(1);if(s!="["&&s!="]"&&s!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(s=="["){this._csi_regex||(this._csi_regex=r(i([`
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
                    `])));var f=this._buffer.match(this._csi_regex);if(f===null)return e.kind=t.Incomplete,e;if(f[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;f[1]!=""||f[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=f[2];var h=f[0].length;return this._buffer=this._buffer.slice(h),e}else if(s=="]"){if(o<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=c(i([`
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
                    `]))),this._osc_st.lastIndex=0;{var g=this._osc_st.exec(this._buffer);if(g===null)return e.kind=t.Incomplete,e;if(g[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var p=this._osc_st.exec(this._buffer);if(p===null)return e.kind=t.Incomplete,e;if(p[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=r(i([`
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
                    `])));var f=this._buffer.match(this._osc_regex);if(f===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=f[1],e.text=f[2];var h=f[0].length;return this._buffer=this._buffer.slice(h),e}else if(s=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},a.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var o=[];;){var u=this.get_next_packet();if(u.kind==t.EOS||u.kind==t.Incomplete)break;u.kind==t.ESC||u.kind==t.Unknown||(u.kind==t.Text?o.push(this.transform_to_html(this.with_state(u))):u.kind==t.SGR?this.process_ansi(u):u.kind==t.OSCURL&&o.push(this.process_hyperlink(u)))}return o.join("")},a.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},a.prototype.process_ansi=function(e){for(var o=e.text.split(";");o.length>0;){var u=o.shift(),s=parseInt(u,10);if(isNaN(s)||s===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(s===1)this.bold=!0;else if(s===3)this.italic=!0;else if(s===4)this.underline=!0;else if(s===22)this.bold=!1;else if(s===23)this.italic=!1;else if(s===24)this.underline=!1;else if(s===39)this.fg=null;else if(s===49)this.bg=null;else if(s>=30&&s<38)this.fg=this.ansi_colors[0][s-30];else if(s>=40&&s<48)this.bg=this.ansi_colors[0][s-40];else if(s>=90&&s<98)this.fg=this.ansi_colors[1][s-90];else if(s>=100&&s<108)this.bg=this.ansi_colors[1][s-100];else if((s===38||s===48)&&o.length>0){var f=s===38,h=o.shift();if(h==="5"&&o.length>0){var g=parseInt(o.shift(),10);g>=0&&g<=255&&(f?this.fg=this.palette_256[g]:this.bg=this.palette_256[g])}if(h==="2"&&o.length>2){var p=parseInt(o.shift(),10),x=parseInt(o.shift(),10),w=parseInt(o.shift(),10);if(p>=0&&p<=255&&x>=0&&x<=255&&w>=0&&w<=255){var S={rgb:[p,x,w],class_name:"truecolor"};f?this.fg=S:this.bg=S}}}}},a.prototype.transform_to_html=function(e){var o=e.text;if(o.length===0||(o=this.escape_txt_for_html(o),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return o;var u=[],s=[],f=e.fg,h=e.bg;e.bold&&u.push("font-weight:bold"),e.italic&&u.push("font-style:italic"),e.underline&&u.push("text-decoration:underline"),this._use_classes?(f&&(f.class_name!=="truecolor"?s.push(f.class_name+"-fg"):u.push("color:rgb("+f.rgb.join(",")+")")),h&&(h.class_name!=="truecolor"?s.push(h.class_name+"-bg"):u.push("background-color:rgb("+h.rgb.join(",")+")"))):(f&&u.push("color:rgb("+f.rgb.join(",")+")"),h&&u.push("background-color:rgb("+h.rgb+")"));var g="",p="";return s.length&&(g=' class="'+s.join(" ")+'"'),u.length&&(p=' style="'+u.join(";")+'"'),"<span"+p+g+">"+o+"</span>"},a.prototype.process_hyperlink=function(e){var o=e.url.split(":");if(o.length<1||!this._url_whitelist[o[0]])return"";var u='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return u},a}();function r(a){var e=a.raw[0],o=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(o,"");return new RegExp(u)}function c(a){var e=a.raw[0],o=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(o,"");return new RegExp(u,"g")}Object.defineProperty(n,"__esModule",{value:!0}),n.default=l})})(q);const K=$(q);function R(_,n,i){const t=_.slice();return t[8]=n[i],t}function ee(_){let n,i,t=_[8].text+"",l,r;return{c(){n=m("span"),i=m("pre"),l=T(t),this.h()},l(c){n=v(c,"SPAN",{class:!0});var a=y(n);a.forEach(d),i=v(c,"PRE",{class:!0});var e=y(i);l=I(e,t),e.forEach(d),this.h()},h(){b(n,"class","prompt svelte-1cjn8nz"),b(i,"class",r=j(_[8].type)+" svelte-1cjn8nz")},m(c,a){k(c,n,a),n.innerHTML=H,k(c,i,a),E(i,l)},p(c,a){a&1&&t!==(t=c[8].text+"")&&O(l,t),a&1&&r!==(r=j(c[8].type)+" svelte-1cjn8nz")&&b(i,"class",r)},d(c){c&&d(n),c&&d(i)}}}function te(_){let n,i=_[8].text+"",t,l;return{c(){n=m("pre"),t=T(i),this.h()},l(r){n=v(r,"PRE",{class:!0});var c=y(n);t=I(c,i),c.forEach(d),this.h()},h(){b(n,"class",l=j(_[8].type)+" svelte-1cjn8nz")},m(r,c){k(r,n,c),E(n,t)},p(r,c){c&1&&i!==(i=r[8].text+"")&&O(t,i),c&1&&l!==(l=j(r[8].type)+" svelte-1cjn8nz")&&b(n,"class",l)},d(r){r&&d(n)}}}function ne(_){let n,i=_[8].text+"",t;return{c(){n=m("pre"),this.h()},l(l){n=v(l,"PRE",{class:!0});var r=y(n);r.forEach(d),this.h()},h(){b(n,"class",t=j(_[8].type)+" svelte-1cjn8nz")},m(l,r){k(l,n,r),n.innerHTML=i},p(l,r){r&1&&i!==(i=l[8].text+"")&&(n.innerHTML=i),r&1&&t!==(t=j(l[8].type)+" svelte-1cjn8nz")&&b(n,"class",t)},d(l){l&&d(n)}}}function U(_){let n;function i(r,c){return r[8].type==="output"?ne:r[8].type==="error"?te:ee}let t=i(_),l=t(_);return{c(){n=m("div"),l.c(),this.h()},l(r){n=v(r,"DIV",{class:!0});var c=y(n);l.l(c),c.forEach(d),this.h()},h(){b(n,"class","terminal-line svelte-1cjn8nz")},m(r,c){k(r,n,c),l.m(n,null)},p(r,c){t===(t=i(r))&&l?l.p(r,c):(l.d(1),l=t(r),l&&(l.c(),l.m(n,null)))},d(r){r&&d(n),l.d()}}}function se(_){let n,i,t,l,r,c,a,e,o,u,s=_[0],f=[];for(let h=0;h<s.length;h+=1)f[h]=U(R(_,s,h));return{c(){n=m("div");for(let h=0;h<f.length;h+=1)f[h].c();i=N(),t=m("div"),l=m("span"),r=m("input"),c=m("pre"),a=T(_[1]),e=m("span"),this.h()},l(h){n=v(h,"DIV",{class:!0});var g=y(n);for(let S=0;S<f.length;S+=1)f[S].l(g);i=D(g),t=v(g,"DIV",{class:!0});var p=y(t);l=v(p,"SPAN",{class:!0});var x=y(l);x.forEach(d),r=v(p,"INPUT",{type:!0,name:!0,id:!0,class:!0}),c=v(p,"PRE",{class:!0});var w=y(c);a=I(w,_[1]),w.forEach(d),e=v(p,"SPAN",{class:!0}),y(e).forEach(d),p.forEach(d),g.forEach(d),this.h()},h(){b(l,"class","prompt svelte-1cjn8nz"),b(r,"type","text"),b(r,"name","mobileinput"),b(r,"id","touchdevice"),b(r,"class","svelte-1cjn8nz"),b(c,"class","input svelte-1cjn8nz"),b(e,"class","cursor svelte-1cjn8nz"),b(t,"class","terminal-line svelte-1cjn8nz"),b(n,"class","terminal svelte-1cjn8nz")},m(h,g){k(h,n,g);for(let p=0;p<f.length;p+=1)f[p]&&f[p].m(n,null);E(n,i),E(n,t),E(t,l),l.innerHTML=H,E(t,r),E(t,c),E(c,a),E(t,e),_[4](n),o||(u=[B(window,"keydown",_[3]),B(n,"touchstart",re)],o=!0)},p(h,[g]){if(g&1){s=h[0];let p;for(p=0;p<s.length;p+=1){const x=R(h,s,p);f[p]?f[p].p(x,g):(f[p]=U(x),f[p].c(),f[p].m(n,i))}for(;p<f.length;p+=1)f[p].d(1);f.length=s.length}g&2&&O(a,h[1])},i:C,o:C,d(h){h&&d(n),F(f,h),_[4](null),o=!1,G(u)}}}const H="anon@zeyus&gt;",ie="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function re(_){console.log("touch"),console.log(_),_.preventDefault();const n=document.getElementById("touchdevice");n&&n.focus()}function le(_,n,i){const t=new K;let l=[{text:`            __________                                 
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
`,type:"output"}],r="",c;function a(s){s.key==="Enter"?(i(0,l=[...l,{text:r,type:"input"}]),o(r),i(1,r=""),setTimeout(()=>{i(2,c.scrollTop=c.scrollHeight,c)},0)):s.key==="Backspace"?i(1,r=r.slice(0,-1)):s.key.length===1&&i(1,r+=s.key)}function e(s,f=25){for(let h=0;h<s.length;h++)setTimeout(()=>{i(1,r+=s[h])},f*h);setTimeout(()=>{a(new KeyboardEvent("keydown",{key:"Enter"}))},f*s.length)}function o(s){const f=s.split(" "),h=f[0];switch(h){case"echo":const g=f.slice(1).join(" "),p=t.ansi_to_html(g.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));i(0,l=[...l,{text:p,type:"output"}]);break;case"clear":i(0,l=[]);break;case"help":i(0,l=[...l,{text:"Commands: echo, clear, help",type:"output"}]);break;default:i(0,l=[...l,{text:`Unknown command: ${h}`,type:"error"}]);break}}e(ie);function u(s){M[s?"unshift":"push"](()=>{c=s,i(2,c)})}return[l,r,c,a,u]}class ae extends z{constructor(n){super(),L(this,n,le,se,A,{})}}function oe(_){let n,i;return n=new ae({}),{c(){P(n.$$.fragment)},l(t){V(n.$$.fragment,t)},m(t,l){W(n,t,l),i=!0},p:C,i(t){i||(X(n.$$.fragment,t),i=!0)},o(t){Q(n.$$.fragment,t),i=!1},d(t){J(n,t)}}}function fe(_){return Y.set("terminal"),[]}class he extends z{constructor(n){super(),L(this,n,fe,oe,A,{})}}export{he as default};
