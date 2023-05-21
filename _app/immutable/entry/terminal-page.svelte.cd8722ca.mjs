import{S as L,i as U,s as A,k as m,a as H,q as I,l as x,m as v,c as N,h as b,r as O,n as d,b as S,F as w,M as D,u as B,L as T,a5 as G,w as M,a6 as k,y as z,z as V,A as P,g as W,d as X,B as J}from"../chunks/index.f584ad79.mjs";import{t as Q}from"../chunks/store.05f392ee.mjs";var Y=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Z(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var q={};(function(_){(function(n,i){if(typeof _.nodeName!="string")i(_);else{var t={};i(t),n.AnsiUp=t.default}})(Y,function(n){var i=this&&this.__makeTemplateObject||function(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r},t;(function(r){r[r.EOS=0]="EOS",r[r.Text=1]="Text",r[r.Incomplete=2]="Incomplete",r[r.ESC=3]="ESC",r[r.Unknown=4]="Unknown",r[r.SGR=5]="SGR",r[r.OSCURL=6]="OSCURL"})(t||(t={}));var l=function(){function r(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(r.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),r.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(y){y.forEach(function(C){e.palette_256.push(C)})});for(var f=[0,95,135,175,215,255],u=0;u<6;++u)for(var s=0;s<6;++s)for(var o=0;o<6;++o){var p={rgb:[f[u],f[s],f[o]],class_name:"truecolor"};this.palette_256.push(p)}for(var h=8,g=0;g<24;++g,h+=10){var E={rgb:[h,h,h],class_name:"truecolor"};this.palette_256.push(E)}},r.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(f){if(f==="&")return"&amp;";if(f==="<")return"&lt;";if(f===">")return"&gt;";if(f==='"')return"&quot;";if(f==="'")return"&#x27;"}):e},r.prototype.append_buffer=function(e){var f=this._buffer+e;this._buffer=f},r.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},f=this._buffer.length;if(f==0)return e;var u=this._buffer.indexOf("\x1B");if(u==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(u>0)return e.kind=t.Text,e.text=this._buffer.slice(0,u),this._buffer=this._buffer.slice(u),e;if(u==0){if(f<3)return e.kind=t.Incomplete,e;var s=this._buffer.charAt(1);if(s!="["&&s!="]"&&s!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(s=="["){this._csi_regex||(this._csi_regex=a(i([`
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
                    `])));var o=this._buffer.match(this._csi_regex);if(o===null)return e.kind=t.Incomplete,e;if(o[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;o[1]!=""||o[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=o[2];var p=o[0].length;return this._buffer=this._buffer.slice(p),e}else if(s=="]"){if(f<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=c(i([`
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
                    `]))),this._osc_st.lastIndex=0;{var h=this._osc_st.exec(this._buffer);if(h===null)return e.kind=t.Incomplete,e;if(h[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var g=this._osc_st.exec(this._buffer);if(g===null)return e.kind=t.Incomplete,e;if(g[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=a(i([`
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
                    `])));var o=this._buffer.match(this._osc_regex);if(o===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=o[1],e.text=o[2];var p=o[0].length;return this._buffer=this._buffer.slice(p),e}else if(s=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},r.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var f=[];;){var u=this.get_next_packet();if(u.kind==t.EOS||u.kind==t.Incomplete)break;u.kind==t.ESC||u.kind==t.Unknown||(u.kind==t.Text?f.push(this.transform_to_html(this.with_state(u))):u.kind==t.SGR?this.process_ansi(u):u.kind==t.OSCURL&&f.push(this.process_hyperlink(u)))}return f.join("")},r.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},r.prototype.process_ansi=function(e){for(var f=e.text.split(";");f.length>0;){var u=f.shift(),s=parseInt(u,10);if(isNaN(s)||s===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(s===1)this.bold=!0;else if(s===3)this.italic=!0;else if(s===4)this.underline=!0;else if(s===22)this.bold=!1;else if(s===23)this.italic=!1;else if(s===24)this.underline=!1;else if(s===39)this.fg=null;else if(s===49)this.bg=null;else if(s>=30&&s<38)this.fg=this.ansi_colors[0][s-30];else if(s>=40&&s<48)this.bg=this.ansi_colors[0][s-40];else if(s>=90&&s<98)this.fg=this.ansi_colors[1][s-90];else if(s>=100&&s<108)this.bg=this.ansi_colors[1][s-100];else if((s===38||s===48)&&f.length>0){var o=s===38,p=f.shift();if(p==="5"&&f.length>0){var h=parseInt(f.shift(),10);h>=0&&h<=255&&(o?this.fg=this.palette_256[h]:this.bg=this.palette_256[h])}if(p==="2"&&f.length>2){var g=parseInt(f.shift(),10),E=parseInt(f.shift(),10),y=parseInt(f.shift(),10);if(g>=0&&g<=255&&E>=0&&E<=255&&y>=0&&y<=255){var C={rgb:[g,E,y],class_name:"truecolor"};o?this.fg=C:this.bg=C}}}}},r.prototype.transform_to_html=function(e){var f=e.text;if(f.length===0||(f=this.escape_txt_for_html(f),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return f;var u=[],s=[],o=e.fg,p=e.bg;e.bold&&u.push("font-weight:bold"),e.italic&&u.push("font-style:italic"),e.underline&&u.push("text-decoration:underline"),this._use_classes?(o&&(o.class_name!=="truecolor"?s.push(o.class_name+"-fg"):u.push("color:rgb("+o.rgb.join(",")+")")),p&&(p.class_name!=="truecolor"?s.push(p.class_name+"-bg"):u.push("background-color:rgb("+p.rgb.join(",")+")"))):(o&&u.push("color:rgb("+o.rgb.join(",")+")"),p&&u.push("background-color:rgb("+p.rgb+")"));var h="",g="";return s.length&&(h=' class="'+s.join(" ")+'"'),u.length&&(g=' style="'+u.join(";")+'"'),"<span"+g+h+">"+f+"</span>"},r.prototype.process_hyperlink=function(e){var f=e.url.split(":");if(f.length<1||!this._url_whitelist[f[0]])return"";var u='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return u},r}();function a(r){var e=r.raw[0],f=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(f,"");return new RegExp(u)}function c(r){var e=r.raw[0],f=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(f,"");return new RegExp(u,"g")}Object.defineProperty(n,"__esModule",{value:!0}),n.default=l})})(q);const $=Z(q);function j(_,n,i){const t=_.slice();return t[8]=n[i],t}function K(_){let n,i,t=_[8].text+"",l,a;return{c(){n=m("span"),i=m("pre"),l=I(t),this.h()},l(c){n=x(c,"SPAN",{class:!0});var r=v(n);r.forEach(b),i=x(c,"PRE",{class:!0});var e=v(i);l=O(e,t),e.forEach(b),this.h()},h(){d(n,"class","prompt svelte-90ggu4"),d(i,"class",a=k(_[8].type)+" svelte-90ggu4")},m(c,r){S(c,n,r),n.innerHTML=F,S(c,i,r),w(i,l)},p(c,r){r&1&&t!==(t=c[8].text+"")&&B(l,t),r&1&&a!==(a=k(c[8].type)+" svelte-90ggu4")&&d(i,"class",a)},d(c){c&&b(n),c&&b(i)}}}function ee(_){let n,i=_[8].text+"",t,l;return{c(){n=m("pre"),t=I(i),this.h()},l(a){n=x(a,"PRE",{class:!0});var c=v(n);t=O(c,i),c.forEach(b),this.h()},h(){d(n,"class",l=k(_[8].type)+" svelte-90ggu4")},m(a,c){S(a,n,c),w(n,t)},p(a,c){c&1&&i!==(i=a[8].text+"")&&B(t,i),c&1&&l!==(l=k(a[8].type)+" svelte-90ggu4")&&d(n,"class",l)},d(a){a&&b(n)}}}function te(_){let n,i=_[8].text+"",t;return{c(){n=m("pre"),this.h()},l(l){n=x(l,"PRE",{class:!0});var a=v(n);a.forEach(b),this.h()},h(){d(n,"class",t=k(_[8].type)+" svelte-90ggu4")},m(l,a){S(l,n,a),n.innerHTML=i},p(l,a){a&1&&i!==(i=l[8].text+"")&&(n.innerHTML=i),a&1&&t!==(t=k(l[8].type)+" svelte-90ggu4")&&d(n,"class",t)},d(l){l&&b(n)}}}function R(_){let n;function i(a,c){return a[8].type==="output"?te:a[8].type==="error"?ee:K}let t=i(_),l=t(_);return{c(){n=m("div"),l.c(),this.h()},l(a){n=x(a,"DIV",{class:!0});var c=v(n);l.l(c),c.forEach(b),this.h()},h(){d(n,"class","terminal-line svelte-90ggu4")},m(a,c){S(a,n,c),l.m(n,null)},p(a,c){t===(t=i(a))&&l?l.p(a,c):(l.d(1),l=t(a),l&&(l.c(),l.m(n,null)))},d(a){a&&b(n),l.d()}}}function se(_){let n,i,t,l,a,c,r,e,f,u=_[0],s=[];for(let o=0;o<u.length;o+=1)s[o]=R(j(_,u,o));return{c(){n=m("div");for(let o=0;o<s.length;o+=1)s[o].c();i=H(),t=m("div"),l=m("span"),a=m("pre"),c=I(_[1]),r=m("span"),this.h()},l(o){n=x(o,"DIV",{class:!0});var p=v(n);for(let y=0;y<s.length;y+=1)s[y].l(p);i=N(p),t=x(p,"DIV",{class:!0});var h=v(t);l=x(h,"SPAN",{class:!0});var g=v(l);g.forEach(b),a=x(h,"PRE",{class:!0});var E=v(a);c=O(E,_[1]),E.forEach(b),r=x(h,"SPAN",{class:!0}),v(r).forEach(b),h.forEach(b),p.forEach(b),this.h()},h(){d(l,"class","prompt svelte-90ggu4"),d(a,"class","input svelte-90ggu4"),d(r,"class","cursor svelte-90ggu4"),d(t,"class","terminal-line svelte-90ggu4"),d(n,"class","terminal svelte-90ggu4")},m(o,p){S(o,n,p);for(let h=0;h<s.length;h+=1)s[h]&&s[h].m(n,null);w(n,i),w(n,t),w(t,l),l.innerHTML=F,w(t,a),w(a,c),w(t,r),_[4](n),e||(f=D(window,"keydown",_[3]),e=!0)},p(o,[p]){if(p&1){u=o[0];let h;for(h=0;h<u.length;h+=1){const g=j(o,u,h);s[h]?s[h].p(g,p):(s[h]=R(g),s[h].c(),s[h].m(n,i))}for(;h<s.length;h+=1)s[h].d(1);s.length=u.length}p&2&&B(c,o[1])},i:T,o:T,d(o){o&&b(n),G(s,o),_[4](null),e=!1,f()}}}const F="anon@zeyus&gt;",ne="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function ie(_,n,i){const t=new $;let l=[{text:`            __________                                 
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
`,type:"output"}],a="",c;function r(s){s.key==="Enter"?(i(0,l=[...l,{text:a,type:"input"}]),f(a),i(1,a=""),setTimeout(()=>{i(2,c.scrollTop=c.scrollHeight,c)},0)):s.key==="Backspace"?i(1,a=a.slice(0,-1)):s.key.length===1&&i(1,a+=s.key)}function e(s,o=25){for(let p=0;p<s.length;p++)setTimeout(()=>{i(1,a+=s[p])},o*p);setTimeout(()=>{r(new KeyboardEvent("keydown",{key:"Enter"}))},o*s.length)}function f(s){const o=s.split(" "),p=o[0];switch(p){case"echo":const h=o.slice(1).join(" "),g=t.ansi_to_html(h.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));i(0,l=[...l,{text:g,type:"output"}]);break;case"clear":i(0,l=[]);break;case"help":i(0,l=[...l,{text:"Commands: echo, clear, help",type:"output"}]);break;default:i(0,l=[...l,{text:`Unknown command: ${p}`,type:"error"}]);break}}e(ne);function u(s){M[s?"unshift":"push"](()=>{c=s,i(2,c)})}return[l,a,c,r,u]}class re extends L{constructor(n){super(),U(this,n,ie,se,A,{})}}function le(_){let n,i;return n=new re({}),{c(){z(n.$$.fragment)},l(t){V(n.$$.fragment,t)},m(t,l){P(n,t,l),i=!0},p:T,i(t){i||(W(n.$$.fragment,t),i=!0)},o(t){X(n.$$.fragment,t),i=!1},d(t){J(n,t)}}}function ae(_){return Q.set("terminal"),[]}class ue extends L{constructor(n){super(),U(this,n,ae,le,A,{})}}export{ue as default};
