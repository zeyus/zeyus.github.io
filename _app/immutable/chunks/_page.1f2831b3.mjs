import{S as H,i as F,s as N,e as y,a as I,t as j,c as E,b as w,g as B,f as v,d as U,I as b,h as S,j as x,Q as O,k as L,n as R,R as z,T as V,M as P,U as T,A as X,B as W,C as Q,w as J,x as Y,D as Z}from"./index.60c0155e.mjs";import{t as $}from"./store.99fe3e2c.mjs";var K=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ee(p){return p&&p.__esModule&&Object.prototype.hasOwnProperty.call(p,"default")?p.default:p}var G={};(function(p){(function(s,n){if(typeof p.nodeName!="string")n(p);else{var t={};n(t),s.AnsiUp=t.default}})(K,function(s){var n=this&&this.__makeTemplateObject||function(l,e){return Object.defineProperty?Object.defineProperty(l,"raw",{value:e}):l.raw=e,l},t;(function(l){l[l.EOS=0]="EOS",l[l.Text=1]="Text",l[l.Incomplete=2]="Incomplete",l[l.ESC=3]="ESC",l[l.Unknown=4]="Unknown",l[l.SGR=5]="SGR",l[l.OSCURL=6]="OSCURL"})(t||(t={}));var i=function(){function l(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(l.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(l.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(l.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),l.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(g){g.forEach(function(k){e.palette_256.push(k)})});for(var a=[0,95,135,175,215,255],u=0;u<6;++u)for(var f=0;f<6;++f)for(var d=0;d<6;++d){var h={rgb:[a[u],a[f],a[d]],class_name:"truecolor"};this.palette_256.push(h)}for(var c=8,_=0;_<24;++_,c+=10){var m={rgb:[c,c,c],class_name:"truecolor"};this.palette_256.push(m)}},l.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(a){if(a==="&")return"&amp;";if(a==="<")return"&lt;";if(a===">")return"&gt;";if(a==='"')return"&quot;";if(a==="'")return"&#x27;"}):e},l.prototype.append_buffer=function(e){var a=this._buffer+e;this._buffer=a},l.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},a=this._buffer.length;if(a==0)return e;var u=this._buffer.indexOf("\x1B");if(u==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(u>0)return e.kind=t.Text,e.text=this._buffer.slice(0,u),this._buffer=this._buffer.slice(u),e;if(u==0){if(a<3)return e.kind=t.Incomplete,e;var f=this._buffer.charAt(1);if(f!="["&&f!="]"&&f!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(f=="["){this._csi_regex||(this._csi_regex=r(n([`
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
                    `])));var d=this._buffer.match(this._csi_regex);if(d===null)return e.kind=t.Incomplete,e;if(d[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;d[1]!=""||d[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=d[2];var h=d[0].length;return this._buffer=this._buffer.slice(h),e}else if(f=="]"){if(a<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=o(n([`
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
                    `]))),this._osc_st.lastIndex=0;{var c=this._osc_st.exec(this._buffer);if(c===null)return e.kind=t.Incomplete,e;if(c[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var _=this._osc_st.exec(this._buffer);if(_===null)return e.kind=t.Incomplete,e;if(_[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=r(n([`
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
                    `])));var d=this._buffer.match(this._osc_regex);if(d===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=d[1],e.text=d[2];var h=d[0].length;return this._buffer=this._buffer.slice(h),e}else if(f=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},l.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var a=[];;){var u=this.get_next_packet();if(u.kind==t.EOS||u.kind==t.Incomplete)break;u.kind==t.ESC||u.kind==t.Unknown||(u.kind==t.Text?a.push(this.transform_to_html(this.with_state(u))):u.kind==t.SGR?this.process_ansi(u):u.kind==t.OSCURL&&a.push(this.process_hyperlink(u)))}return a.join("")},l.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},l.prototype.process_ansi=function(e){for(var a=e.text.split(";");a.length>0;){var u=a.shift(),f=parseInt(u,10);if(isNaN(f)||f===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(f===1)this.bold=!0;else if(f===3)this.italic=!0;else if(f===4)this.underline=!0;else if(f===22)this.bold=!1;else if(f===23)this.italic=!1;else if(f===24)this.underline=!1;else if(f===39)this.fg=null;else if(f===49)this.bg=null;else if(f>=30&&f<38)this.fg=this.ansi_colors[0][f-30];else if(f>=40&&f<48)this.bg=this.ansi_colors[0][f-40];else if(f>=90&&f<98)this.fg=this.ansi_colors[1][f-90];else if(f>=100&&f<108)this.bg=this.ansi_colors[1][f-100];else if((f===38||f===48)&&a.length>0){var d=f===38,h=a.shift();if(h==="5"&&a.length>0){var c=parseInt(a.shift(),10);c>=0&&c<=255&&(d?this.fg=this.palette_256[c]:this.bg=this.palette_256[c])}if(h==="2"&&a.length>2){var _=parseInt(a.shift(),10),m=parseInt(a.shift(),10),g=parseInt(a.shift(),10);if(_>=0&&_<=255&&m>=0&&m<=255&&g>=0&&g<=255){var k={rgb:[_,m,g],class_name:"truecolor"};d?this.fg=k:this.bg=k}}}}},l.prototype.transform_to_html=function(e){var a=e.text;if(a.length===0||(a=this.escape_txt_for_html(a),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return a;var u=[],f=[],d=e.fg,h=e.bg;e.bold&&u.push("font-weight:bold"),e.italic&&u.push("font-style:italic"),e.underline&&u.push("text-decoration:underline"),this._use_classes?(d&&(d.class_name!=="truecolor"?f.push(d.class_name+"-fg"):u.push("color:rgb("+d.rgb.join(",")+")")),h&&(h.class_name!=="truecolor"?f.push(h.class_name+"-bg"):u.push("background-color:rgb("+h.rgb.join(",")+")"))):(d&&u.push("color:rgb("+d.rgb.join(",")+")"),h&&u.push("background-color:rgb("+h.rgb+")"));var c="",_="";return f.length&&(c=' class="'+f.join(" ")+'"'),u.length&&(_=' style="'+u.join(";")+'"'),"<span"+_+c+">"+a+"</span>"},l.prototype.process_hyperlink=function(e){var a=e.url.split(":");if(a.length<1||!this._url_whitelist[a[0]])return"";var u='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return u},l}();function r(l){var e=l.raw[0],a=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(a,"");return new RegExp(u)}function o(l){var e=l.raw[0],a=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,u=e.replace(a,"");return new RegExp(u,"g")}Object.defineProperty(s,"__esModule",{value:!0}),s.default=i})})(G);const te=ee(G);function q(p,s,n){const t=p.slice();return t[11]=s[n],t}function se(p){let s,n,t=p[11].text+"",i,r;return{c(){s=y("span"),n=y("pre"),i=j(t),this.h()},l(o){s=E(o,"SPAN",{class:!0});var l=w(s);l.forEach(v),n=E(o,"PRE",{class:!0});var e=w(n);i=U(e,t),e.forEach(v),this.h()},h(){b(s,"class","prompt svelte-ps6h2d"),b(n,"class",r=T(p[11].type)+" svelte-ps6h2d")},m(o,l){S(o,s,l),s.innerHTML=M,S(o,n,l),x(n,i)},p(o,l){l&1&&t!==(t=o[11].text+"")&&L(i,t),l&1&&r!==(r=T(o[11].type)+" svelte-ps6h2d")&&b(n,"class",r)},d(o){o&&v(s),o&&v(n)}}}function ne(p){let s,n=p[11].text+"",t,i;return{c(){s=y("pre"),t=j(n),this.h()},l(r){s=E(r,"PRE",{class:!0});var o=w(s);t=U(o,n),o.forEach(v),this.h()},h(){b(s,"class",i=T(p[11].type)+" svelte-ps6h2d")},m(r,o){S(r,s,o),x(s,t)},p(r,o){o&1&&n!==(n=r[11].text+"")&&L(t,n),o&1&&i!==(i=T(r[11].type)+" svelte-ps6h2d")&&b(s,"class",i)},d(r){r&&v(s)}}}function ie(p){let s,n=p[11].text+"",t;return{c(){s=y("pre"),this.h()},l(i){s=E(i,"PRE",{class:!0});var r=w(s);r.forEach(v),this.h()},h(){b(s,"class",t=T(p[11].type)+" svelte-ps6h2d")},m(i,r){S(i,s,r),s.innerHTML=n},p(i,r){r&1&&n!==(n=i[11].text+"")&&(s.innerHTML=n),r&1&&t!==(t=T(i[11].type)+" svelte-ps6h2d")&&b(s,"class",t)},d(i){i&&v(s)}}}function D(p){let s;function n(r,o){return r[11].type==="output"?ie:r[11].type==="error"?ne:se}let t=n(p),i=t(p);return{c(){s=y("div"),i.c(),this.h()},l(r){s=E(r,"DIV",{class:!0});var o=w(s);i.l(o),o.forEach(v),this.h()},h(){b(s,"class","terminal-line svelte-ps6h2d")},m(r,o){S(r,s,o),i.m(s,null)},p(r,o){t===(t=n(r))&&i?i.p(r,o):(i.d(1),i=t(r),i&&(i.c(),i.m(s,null)))},d(r){r&&v(s),i.d()}}}function re(p){let s,n,t,i,r,o,l,e,a,u,f,d,h=p[0],c=[];for(let _=0;_<h.length;_+=1)c[_]=D(q(p,h,_));return{c(){s=y("div");for(let _=0;_<c.length;_+=1)c[_].c();n=I(),t=y("div"),i=y("span"),r=I(),o=y("textarea"),l=I(),e=y("pre"),a=j(p[1]),u=y("span"),this.h()},l(_){s=E(_,"DIV",{class:!0,id:!0});var m=w(s);for(let C=0;C<c.length;C+=1)c[C].l(m);n=B(m),t=E(m,"DIV",{class:!0});var g=w(t);i=E(g,"SPAN",{class:!0});var k=w(i);k.forEach(v),r=B(g),o=E(g,"TEXTAREA",{autocomplete:!0,autocorrect:!0,autocapitalize:!0,spellcheck:!0,name:!0,id:!0,class:!0}),w(o).forEach(v),l=B(g),e=E(g,"PRE",{class:!0});var A=w(e);a=U(A,p[1]),A.forEach(v),u=E(g,"SPAN",{class:!0}),w(u).forEach(v),g.forEach(v),m.forEach(v),this.h()},h(){b(i,"class","prompt svelte-ps6h2d"),b(o,"autocomplete","off"),b(o,"autocorrect","off"),b(o,"autocapitalize","off"),b(o,"spellcheck","false"),b(o,"name","mobileinput"),b(o,"id","touchinput"),b(o,"class","svelte-ps6h2d"),b(e,"class","input svelte-ps6h2d"),b(u,"class","cursor svelte-ps6h2d"),b(t,"class","terminal-line svelte-ps6h2d"),b(s,"class","terminal svelte-ps6h2d"),b(s,"id","terminal-wrapper")},m(_,m){S(_,s,m);for(let g=0;g<c.length;g+=1)c[g]&&c[g].m(s,null);x(s,n),x(s,t),x(t,i),i.innerHTML=M,x(t,r),x(t,o),x(t,l),x(t,e),x(e,a),x(t,u),p[6](s),f||(d=[O(window,"keydown",p[3]),O(o,"input",p[4]),O(s,"touchend",p[5])],f=!0)},p(_,[m]){if(m&1){h=_[0];let g;for(g=0;g<h.length;g+=1){const k=q(_,h,g);c[g]?c[g].p(k,m):(c[g]=D(k),c[g].c(),c[g].m(s,n))}for(;g<c.length;g+=1)c[g].d(1);c.length=h.length}m&2&&L(a,_[1])},i:R,o:R,d(_){_&&v(s),z(c,_),p[6](null),f=!1,V(d)}}}const M="anon@zeyus&gt;",le="echo 👋\\x1b[31mHello\\x1b[0m👋\\n🌍\\x1b[32mWorld\\x1b[0m🌍";function ae(p,s,n){const t=new te;let i=[{text:`            __________                                 
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
`,type:"output"}],r="",o;function l(h){h.preventDefault();const c=document.getElementById("touchinput");h.key==="Enter"?(n(0,i=[...i,{text:r,type:"input"}]),u(r),n(1,r=""),c.value="",setTimeout(()=>{n(2,o.scrollTop=o.scrollHeight,o)},0)):h.key==="Backspace"?n(1,r=r.slice(0,-1)):h.key.length===1&&n(1,r+=h.key)}function e(h){const c=h.target;n(1,r=c.value),(r.includes("\r")||r.includes(`
`))&&l(new KeyboardEvent("keydown",{key:"Enter"}))}function a(h,c=25){for(let _=0;_<h.length;_++)setTimeout(()=>{n(1,r+=h[_])},c*_);setTimeout(()=>{l(new KeyboardEvent("keydown",{key:"Enter"}))},c*h.length)}function u(h){const c=h.split(" "),_=c[0];switch(_){case"echo":const m=c.slice(1).join(" "),g=t.ansi_to_html(m.replace(/\\033/g,"\x1B").replace(/\\e/g,"\x1B").replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0/g,"\0").replace(/\\x1b/g,"\x1B"));n(0,i=[...i,{text:g,type:"output"}]);break;case"clear":n(0,i=[]);break;case"help":n(0,i=[...i,{text:"Commands: echo, clear, help",type:"output"}]);break;default:n(0,i=[...i,{text:`Unknown command: ${_}`,type:"error"}]);break}}var f=h=>{h.preventDefault();const c=document.getElementById("touchinput");c&&c.focus()};a(le);function d(h){P[h?"unshift":"push"](()=>{o=h,n(2,o)})}return[i,r,o,l,e,f,d]}class oe extends H{constructor(s){super(),F(this,s,ae,re,N,{})}}function fe(p){let s,n;return s=new oe({}),{c(){X(s.$$.fragment)},l(t){W(s.$$.fragment,t)},m(t,i){Q(s,t,i),n=!0},p:R,i(t){n||(J(s.$$.fragment,t),n=!0)},o(t){Y(s.$$.fragment,t),n=!1},d(t){Z(s,t)}}}function ue(p){return $.set("terminal"),[]}class _e extends H{constructor(s){super(),F(this,s,ue,fe,N,{})}}export{_e as default};
