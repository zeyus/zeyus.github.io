import{S as R,i as U,s as A,k as m,a as H,q as T,l as v,m as x,c as D,h as b,r as I,n as d,b as S,F as w,M,u as O,L as j,a5 as N,w as G,a6 as k,y as V,z as P,A as z,g as X,d as W,B as J}from"../chunks/index.f584ad79.mjs";import{t as Q}from"../chunks/store.05f392ee.mjs";var Y=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Z(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var q={};(function(_){(function(n,i){if(typeof _.nodeName!="string")i(_);else{var t={};i(t),n.AnsiUp=t.default}})(Y,function(n){var i=this&&this.__makeTemplateObject||function(r,e){return Object.defineProperty?Object.defineProperty(r,"raw",{value:e}):r.raw=e,r},t;(function(r){r[r.EOS=0]="EOS",r[r.Text=1]="Text",r[r.Incomplete=2]="Incomplete",r[r.ESC=3]="ESC",r[r.Unknown=4]="Unknown",r[r.SGR=5]="SGR",r[r.OSCURL=6]="OSCURL"})(t||(t={}));var l=function(){function r(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(r.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),r.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(y){y.forEach(function(C){e.palette_256.push(C)})});for(var o=[0,95,135,175,215,255],u=0;u<6;++u)for(var s=0;s<6;++s)for(var f=0;f<6;++f){var p={rgb:[o[u],o[s],o[f]],class_name:"truecolor"};this.palette_256.push(p)}for(var h=8,g=0;g<24;++g,h+=10){var E={rgb:[h,h,h],class_name:"truecolor"};this.palette_256.push(E)}},r.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(o){if(o==="&")return"&amp;";if(o==="<")return"&lt;";if(o===">")return"&gt;";if(o==='"')return"&quot;";if(o==="'")return"&#x27;"}):e},r.prototype.append_buffer=function(e){var o=this._buffer+e;this._buffer=o},r.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},o=this._buffer.length;if(o==0)return e;var u=this._buffer.indexOf("\x1B");if(u==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(u>0)return e.kind=t.Text,e.text=this._buffer.slice(0,u),this._buffer=this._buffer.slice(u),e;if(u==0){if(o<3)return e.kind=t.Incomplete,e;var s=this._buffer.charAt(1);if(s!="["&&s!="]"&&s!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(s=="["){this._csi_regex||(this._csi_regex=a(i([`
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
                    `])));var f=this._buffer.match(this._csi_regex);if(f===null)return e.kind=t.Incomplete,e;if(f[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;f[1]!=""||f[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=f[2];var p=f[0].length;return this._buffer=this._buffer.slice(p),e}else if(s=="]"){if(o<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=c(i([`
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
                    `])));var f=this._buffer.match(this._osc_regex);if(f===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=f[1],e.text=f[2];var p=f[0].length;return this._buffer=this._buffer.slice(p),e}else if(s=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},r.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var o=[];;){var u=this.get_next_packet();if(u.kind==t.EOS||u.kind==t.Incomplete)break;u.kind==t.ESC||u.kind==t.Unknown||(u.kind==t.Text?o.push(this.transform_to_html(this.with_state(u))):u.kind==t.SGR?this.process_ansi(u):u.kind==t.OSCURL&&o.push(this.process_hyperlink(u)))}return o.join("")},r.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},r.prototype.process_ansi=function(e){for(var o=e.text.split(";");o.length>0;){var u=o.shift(),s=parseInt(u,10);if(isNaN(s)||s===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(s===1)this.bold=!0;else if(s===3)this.italic=!0;else if(s===4)this.underline=!0;else if(s===22)this.bold=!1;else if(s===23)this.italic=!1;else if(s===24)this.underline=!1;else if(s===39)this.fg=null;else if(s===49)this.bg=null;else if(s>=30&&s<38)this.fg=this.ansi_colors[0][s-30];else if(s>=40&&s<48)this.bg=this.ansi_colors[0][s-40];else if(s>=90&&s<98)this.fg=this.ansi_colors[1][s-90];else if(s>=100&&s<108)this.bg=this.ansi_colors[1][s-100];else if((s===38||s===48)&&o.length>0){var f=s===38,p=o.shift();if(p==="5"&&o.length>0){var h=parseInt(o.shift(),10);h>=0&&h<=255&&(f?this.fg=this.palette_256[h]:this.bg=this.palette_256[h])}if(p==="2"&&o.length>2){var g=parseInt(o.shift(),10),E=parseInt(o.shift(),10),y=parseInt(o.shift(),10);if(g>=0&&g<=255&&E>=0&&E<=255&&y>=0&&y<=255){var C={rgb:[g,E,y],class_name:"truecolor"};f?this.fg=C:this.bg=C}}}}},r.prototype.transform_to_html=function(e){var o=e.text;if(o.length===0||(o=this.escape_txt_for_html(o),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return o;var u=[],s=[],f=e.fg,p=e.bg;e.bold&&u.push("font-weight:bold"),e.italic&&u.push("font-style:italic"),e.underline&&u.push("text-decoration:underline"),this._use_classes?(f&&(f.class_name!=="truecolor"?s.push(f.class_name+"-fg"):u.push("color:rgb("+f.rgb.join(",")+")")),p&&(p.class_name!=="truecolor"?s.push(p.class_name+"-bg"):u.push("background-color:rgb("+p.rgb.join(",")+")"))):(f&&u.push("color:rgb("+f.rgb.join(",")+")"),p&&u.push("background-color:rgb("+p.rgb+")"));var h="",g="";return s.length&&(h=' class="'+s.join(" ")+'"'),u.length&&(g=' style="'+u.join(";")+'"'),"<span"+g+h+">"+o+"</span>"},r.prototype.process_hyperlink=function(e){var o=e.url.split(":");if(o.length<1||!this._url_whitelist[o[0]])return"";var u='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return u},r}();function a(r){var e=r.raw[0],o=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(o,"");return new RegExp(u)}function c(r){var e=r.raw[0],o=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(o,"");return new RegExp(u,"g")}Object.defineProperty(n,"__esModule",{value:!0}),n.default=l})})(q);const $=Z(q);function B(_,n,i){const t=_.slice();return t[8]=n[i],t}function K(_){let n,i,t=_[8].text+"",l,a;return{c(){n=m("span"),i=m("pre"),l=T(t),this.h()},l(c){n=v(c,"SPAN",{class:!0});var r=x(n);r.forEach(b),i=v(c,"PRE",{class:!0});var e=x(i);l=I(e,t),e.forEach(b),this.h()},h(){d(n,"class","prompt svelte-vfmxju"),d(i,"class",a=k(_[8].type)+" svelte-vfmxju")},m(c,r){S(c,n,r),n.innerHTML=F,S(c,i,r),w(i,l)},p(c,r){r&1&&t!==(t=c[8].text+"")&&O(l,t),r&1&&a!==(a=k(c[8].type)+" svelte-vfmxju")&&d(i,"class",a)},d(c){c&&b(n),c&&b(i)}}}function ee(_){let n,i=_[8].text+"",t,l;return{c(){n=m("pre"),t=T(i),this.h()},l(a){n=v(a,"PRE",{class:!0});var c=x(n);t=I(c,i),c.forEach(b),this.h()},h(){d(n,"class",l=k(_[8].type)+" svelte-vfmxju")},m(a,c){S(a,n,c),w(n,t)},p(a,c){c&1&&i!==(i=a[8].text+"")&&O(t,i),c&1&&l!==(l=k(a[8].type)+" svelte-vfmxju")&&d(n,"class",l)},d(a){a&&b(n)}}}function te(_){let n,i=_[8].text+"",t;return{c(){n=m("pre"),this.h()},l(l){n=v(l,"PRE",{class:!0});var a=x(n);a.forEach(b),this.h()},h(){d(n,"class",t=k(_[8].type)+" svelte-vfmxju")},m(l,a){S(l,n,a),n.innerHTML=i},p(l,a){a&1&&i!==(i=l[8].text+"")&&(n.innerHTML=i),a&1&&t!==(t=k(l[8].type)+" svelte-vfmxju")&&d(n,"class",t)},d(l){l&&b(n)}}}function L(_){let n;function i(a,c){return a[8].type==="output"?te:a[8].type==="error"?ee:K}let t=i(_),l=t(_);return{c(){n=m("div"),l.c(),this.h()},l(a){n=v(a,"DIV",{class:!0});var c=x(n);l.l(c),c.forEach(b),this.h()},h(){d(n,"class","terminal-line svelte-vfmxju")},m(a,c){S(a,n,c),l.m(n,null)},p(a,c){t===(t=i(a))&&l?l.p(a,c):(l.d(1),l=t(a),l&&(l.c(),l.m(n,null)))},d(a){a&&b(n),l.d()}}}function se(_){let n,i,t,l,a,c,r,e,o,u=_[0],s=[];for(let f=0;f<u.length;f+=1)s[f]=L(B(_,u,f));return{c(){n=m("div");for(let f=0;f<s.length;f+=1)s[f].c();i=H(),t=m("div"),l=m("span"),a=m("pre"),c=T(_[1]),r=m("span"),this.h()},l(f){n=v(f,"DIV",{class:!0});var p=x(n);for(let y=0;y<s.length;y+=1)s[y].l(p);i=D(p),t=v(p,"DIV",{class:!0});var h=x(t);l=v(h,"SPAN",{class:!0});var g=x(l);g.forEach(b),a=v(h,"PRE",{class:!0});var E=x(a);c=I(E,_[1]),E.forEach(b),r=v(h,"SPAN",{class:!0}),x(r).forEach(b),h.forEach(b),p.forEach(b),this.h()},h(){d(l,"class","prompt svelte-vfmxju"),d(a,"class","input svelte-vfmxju"),d(r,"class","cursor svelte-vfmxju"),d(t,"class","terminal-line svelte-vfmxju"),d(n,"class","terminal svelte-vfmxju")},m(f,p){S(f,n,p);for(let h=0;h<s.length;h+=1)s[h]&&s[h].m(n,null);w(n,i),w(n,t),w(t,l),l.innerHTML=F,w(t,a),w(a,c),w(t,r),_[4](n),e||(o=M(window,"keydown",_[3]),e=!0)},p(f,[p]){if(p&1){u=f[0];let h;for(h=0;h<u.length;h+=1){const g=B(f,u,h);s[h]?s[h].p(g,p):(s[h]=L(g),s[h].c(),s[h].m(n,i))}for(;h<s.length;h+=1)s[h].d(1);s.length=u.length}p&2&&O(c,f[1])},i:j,o:j,d(f){f&&b(n),N(s,f),_[4](null),e=!1,o()}}}const F="anon@zeyus&gt;",ne="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function ie(_,n,i){const t=new $;let l=[],a="",c;function r(s){s.key==="Enter"?(i(0,l=[...l,{text:a,type:"input"}]),o(a),i(1,a=""),setTimeout(()=>{i(2,c.scrollTop=c.scrollHeight,c)},0)):s.key==="Backspace"?i(1,a=a.slice(0,-1)):s.key.length===1&&i(1,a+=s.key)}function e(s,f=25){for(let p=0;p<s.length;p++)setTimeout(()=>{i(1,a+=s[p])},f*p);setTimeout(()=>{r(new KeyboardEvent("keydown",{key:"Enter"}))},f*s.length)}function o(s){const f=s.split(" "),p=f[0];switch(p){case"echo":const h=f.slice(1).join(" "),g=t.ansi_to_html(h.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));i(0,l=[...l,{text:g,type:"output"}]);break;case"clear":i(0,l=[]);break;case"help":i(0,l=[...l,{text:"Commands: echo, clear, help",type:"output"}]);break;default:i(0,l=[...l,{text:`Unknown command: ${p}`,type:"error"}]);break}}e(ne);function u(s){G[s?"unshift":"push"](()=>{c=s,i(2,c)})}return[l,a,c,r,u]}class re extends R{constructor(n){super(),U(this,n,ie,se,A,{})}}function le(_){let n,i;return n=new re({}),{c(){V(n.$$.fragment)},l(t){P(n.$$.fragment,t)},m(t,l){z(n,t,l),i=!0},p:j,i(t){i||(X(n.$$.fragment,t),i=!0)},o(t){W(n.$$.fragment,t),i=!1},d(t){J(n,t)}}}function ae(_){return Q.set("terminal"),[]}class ue extends R{constructor(n){super(),U(this,n,ae,le,A,{})}}export{ue as default};
