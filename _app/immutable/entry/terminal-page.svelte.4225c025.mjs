import{S as L,i as R,s as q,k as y,a as N,q as A,l as w,m as C,c as F,r as z,h as b,n as d,b as S,F as x,a5 as I,M as j,a6 as G,L as O,W as M,e as E,a7 as D,w as $,a8 as T,u as V,y as X,z as W,A as J,g as P,d as Q,B as Y}from"../chunks/index.0806ecca.mjs";import{t as Z}from"../chunks/store.c06c03f3.mjs";var K=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function ee(_){return _&&_.__esModule&&Object.prototype.hasOwnProperty.call(_,"default")?_.default:_}var H={};(function(_){(function(s,i){if(typeof _.nodeName!="string")i(_);else{var t={};i(t),s.AnsiUp=t.default}})(K,function(s){var i=this&&this.__makeTemplateObject||function(n,e){return Object.defineProperty?Object.defineProperty(n,"raw",{value:e}):n.raw=e,n},t;(function(n){n[n.EOS=0]="EOS",n[n.Text=1]="Text",n[n.Incomplete=2]="Incomplete",n[n.ESC=3]="ESC",n[n.Unknown=4]="Unknown",n[n.SGR=5]="SGR",n[n.OSCURL=6]="OSCURL"})(t||(t={}));var h=function(){function n(){this.VERSION="5.2.1",this.setup_palettes(),this._use_classes=!1,this.bold=!1,this.italic=!1,this.underline=!1,this.fg=this.bg=null,this._buffer="",this._url_whitelist={http:1,https:1},this._escape_html=!0}return Object.defineProperty(n.prototype,"use_classes",{get:function(){return this._use_classes},set:function(e){this._use_classes=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"url_whitelist",{get:function(){return this._url_whitelist},set:function(e){this._url_whitelist=e},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"escape_html",{get:function(){return this._escape_html},set:function(e){this._escape_html=e},enumerable:!1,configurable:!0}),n.prototype.setup_palettes=function(){var e=this;this.ansi_colors=[[{rgb:[0,0,0],class_name:"ansi-black"},{rgb:[187,0,0],class_name:"ansi-red"},{rgb:[0,187,0],class_name:"ansi-green"},{rgb:[187,187,0],class_name:"ansi-yellow"},{rgb:[0,0,187],class_name:"ansi-blue"},{rgb:[187,0,187],class_name:"ansi-magenta"},{rgb:[0,187,187],class_name:"ansi-cyan"},{rgb:[255,255,255],class_name:"ansi-white"}],[{rgb:[85,85,85],class_name:"ansi-bright-black"},{rgb:[255,85,85],class_name:"ansi-bright-red"},{rgb:[0,255,0],class_name:"ansi-bright-green"},{rgb:[255,255,85],class_name:"ansi-bright-yellow"},{rgb:[85,85,255],class_name:"ansi-bright-blue"},{rgb:[255,85,255],class_name:"ansi-bright-magenta"},{rgb:[85,255,255],class_name:"ansi-bright-cyan"},{rgb:[255,255,255],class_name:"ansi-bright-white"}]],this.palette_256=[],this.ansi_colors.forEach(function(v){v.forEach(function(k){e.palette_256.push(k)})});for(var a=[0,95,135,175,215,255],f=0;f<6;++f)for(var r=0;r<6;++r)for(var l=0;l<6;++l){var u={rgb:[a[f],a[r],a[l]],class_name:"truecolor"};this.palette_256.push(u)}for(var p=8,g=0;g<24;++g,p+=10){var m={rgb:[p,p,p],class_name:"truecolor"};this.palette_256.push(m)}},n.prototype.escape_txt_for_html=function(e){return this._escape_html?e.replace(/[&<>"']/gm,function(a){if(a==="&")return"&amp;";if(a==="<")return"&lt;";if(a===">")return"&gt;";if(a==='"')return"&quot;";if(a==="'")return"&#x27;"}):e},n.prototype.append_buffer=function(e){var a=this._buffer+e;this._buffer=a},n.prototype.get_next_packet=function(){var e={kind:t.EOS,text:"",url:""},a=this._buffer.length;if(a==0)return e;var f=this._buffer.indexOf("\x1B");if(f==-1)return e.kind=t.Text,e.text=this._buffer,this._buffer="",e;if(f>0)return e.kind=t.Text,e.text=this._buffer.slice(0,f),this._buffer=this._buffer.slice(f),e;if(f==0){if(a<3)return e.kind=t.Incomplete,e;var r=this._buffer.charAt(1);if(r!="["&&r!="]"&&r!="(")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;if(r=="["){this._csi_regex||(this._csi_regex=o(i([`
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
                    `])));var l=this._buffer.match(this._csi_regex);if(l===null)return e.kind=t.Incomplete,e;if(l[4])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;l[1]!=""||l[3]!="m"?e.kind=t.Unknown:e.kind=t.SGR,e.text=l[2];var u=l[0].length;return this._buffer=this._buffer.slice(u),e}else if(r=="]"){if(a<4)return e.kind=t.Incomplete,e;if(this._buffer.charAt(2)!="8"||this._buffer.charAt(3)!=";")return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;this._osc_st||(this._osc_st=c(i([`
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
                    `]))),this._osc_st.lastIndex=0;{var p=this._osc_st.exec(this._buffer);if(p===null)return e.kind=t.Incomplete,e;if(p[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}{var g=this._osc_st.exec(this._buffer);if(g===null)return e.kind=t.Incomplete,e;if(g[3])return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e}this._osc_regex||(this._osc_regex=o(i([`
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
                    `])));var l=this._buffer.match(this._osc_regex);if(l===null)return e.kind=t.ESC,e.text=this._buffer.slice(0,1),this._buffer=this._buffer.slice(1),e;e.kind=t.OSCURL,e.url=l[1],e.text=l[2];var u=l[0].length;return this._buffer=this._buffer.slice(u),e}else if(r=="(")return e.kind=t.Unknown,this._buffer=this._buffer.slice(3),e}},n.prototype.ansi_to_html=function(e){this.append_buffer(e);for(var a=[];;){var f=this.get_next_packet();if(f.kind==t.EOS||f.kind==t.Incomplete)break;f.kind==t.ESC||f.kind==t.Unknown||(f.kind==t.Text?a.push(this.transform_to_html(this.with_state(f))):f.kind==t.SGR?this.process_ansi(f):f.kind==t.OSCURL&&a.push(this.process_hyperlink(f)))}return a.join("")},n.prototype.with_state=function(e){return{bold:this.bold,italic:this.italic,underline:this.underline,fg:this.fg,bg:this.bg,text:e.text}},n.prototype.process_ansi=function(e){for(var a=e.text.split(";");a.length>0;){var f=a.shift(),r=parseInt(f,10);if(isNaN(r)||r===0)this.fg=this.bg=null,this.bold=!1,this.italic=!1,this.underline=!1;else if(r===1)this.bold=!0;else if(r===3)this.italic=!0;else if(r===4)this.underline=!0;else if(r===22)this.bold=!1;else if(r===23)this.italic=!1;else if(r===24)this.underline=!1;else if(r===39)this.fg=null;else if(r===49)this.bg=null;else if(r>=30&&r<38)this.fg=this.ansi_colors[0][r-30];else if(r>=40&&r<48)this.bg=this.ansi_colors[0][r-40];else if(r>=90&&r<98)this.fg=this.ansi_colors[1][r-90];else if(r>=100&&r<108)this.bg=this.ansi_colors[1][r-100];else if((r===38||r===48)&&a.length>0){var l=r===38,u=a.shift();if(u==="5"&&a.length>0){var p=parseInt(a.shift(),10);p>=0&&p<=255&&(l?this.fg=this.palette_256[p]:this.bg=this.palette_256[p])}if(u==="2"&&a.length>2){var g=parseInt(a.shift(),10),m=parseInt(a.shift(),10),v=parseInt(a.shift(),10);if(g>=0&&g<=255&&m>=0&&m<=255&&v>=0&&v<=255){var k={rgb:[g,m,v],class_name:"truecolor"};l?this.fg=k:this.bg=k}}}}},n.prototype.transform_to_html=function(e){var a=e.text;if(a.length===0||(a=this.escape_txt_for_html(a),!e.bold&&!e.italic&&!e.underline&&e.fg===null&&e.bg===null))return a;var f=[],r=[],l=e.fg,u=e.bg;e.bold&&f.push("font-weight:bold"),e.italic&&f.push("font-style:italic"),e.underline&&f.push("text-decoration:underline"),this._use_classes?(l&&(l.class_name!=="truecolor"?r.push(l.class_name+"-fg"):f.push("color:rgb("+l.rgb.join(",")+")")),u&&(u.class_name!=="truecolor"?r.push(u.class_name+"-bg"):f.push("background-color:rgb("+u.rgb.join(",")+")"))):(l&&f.push("color:rgb("+l.rgb.join(",")+")"),u&&f.push("background-color:rgb("+u.rgb+")"));var p="",g="";return r.length&&(p=' class="'+r.join(" ")+'"'),f.length&&(g=' style="'+f.join(";")+'"'),"<span"+g+p+">"+a+"</span>"},n.prototype.process_hyperlink=function(e){var a=e.url.split(":");if(a.length<1||!this._url_whitelist[a[0]])return"";var f='<a href="'+this.escape_txt_for_html(e.url)+'">'+this.escape_txt_for_html(e.text)+"</a>";return f},n}();function o(n){var e=n.raw[0],a=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,f=e.replace(a,"");return new RegExp(f)}function c(n){var e=n.raw[0],a=/^\s+|\s+\n|\s*#[\s\S]*?\n|\n/gm,f=e.replace(a,"");return new RegExp(f,"g")}Object.defineProperty(s,"__esModule",{value:!0}),s.default=h})})(H);const te=ee(H);function U(_,s,i){const t=_.slice();return t[8]=s[i],t}function ne(_){let s,i=_[8].text+"",t,h;return{c(){s=y("pre"),t=A(i),this.h()},l(o){s=w(o,"PRE",{class:!0});var c=C(s);t=z(c,i),c.forEach(b),this.h()},h(){d(s,"class",h=T(_[8].type)+" svelte-o4aphz")},m(o,c){S(o,s,c),x(s,t)},p(o,c){c&1&&i!==(i=o[8].text+"")&&V(t,i),c&1&&h!==(h=T(o[8].type)+" svelte-o4aphz")&&d(s,"class",h)},d(o){o&&b(s)}}}function se(_){let s,i=_[8].text+"",t;return{c(){s=y("pre"),this.h()},l(h){s=w(h,"PRE",{class:!0});var o=C(s);o.forEach(b),this.h()},h(){d(s,"class",t=T(_[8].type)+" svelte-o4aphz")},m(h,o){S(h,s,o),s.innerHTML=i},p(h,o){o&1&&i!==(i=h[8].text+"")&&(s.innerHTML=i),o&1&&t!==(t=T(h[8].type)+" svelte-o4aphz")&&d(s,"class",t)},d(h){h&&b(s)}}}function B(_,s){let i,t;function h(n,e){return n[8].type==="output"?se:ne}let o=h(s),c=o(s);return{key:_,first:null,c(){i=E(),c.c(),t=E(),this.h()},l(n){i=E(),c.l(n),t=E(),this.h()},h(){this.first=i},m(n,e){S(n,i,e),c.m(n,e),S(n,t,e)},p(n,e){s=n,o===(o=h(s))&&c?c.p(s,e):(c.d(1),c=o(s),c&&(c.c(),c.m(t.parentNode,t)))},d(n){n&&b(i),c.d(n),n&&b(t)}}}function ie(_){let s,i=[],t=new Map,h,o,c,n,e,a,f=_[0];const r=l=>l[8].text+l[8].type;for(let l=0;l<f.length;l+=1){let u=U(_,f,l),p=r(u);t.set(p,i[l]=B(p,u))}return{c(){s=y("div");for(let l=0;l<i.length;l+=1)i[l].c();h=N(),o=y("span"),c=A("user@host>"),n=y("input"),this.h()},l(l){s=w(l,"DIV",{class:!0});var u=C(s);for(let g=0;g<i.length;g+=1)i[g].l(u);h=F(u),o=w(u,"SPAN",{class:!0});var p=C(o);c=z(p,"user@host>"),p.forEach(b),n=w(u,"INPUT",{class:!0}),u.forEach(b),this.h()},h(){d(o,"class","prompt svelte-o4aphz"),d(n,"class","svelte-o4aphz"),d(s,"class","terminal svelte-o4aphz")},m(l,u){S(l,s,u);for(let p=0;p<i.length;p+=1)i[p]&&i[p].m(s,null);x(s,h),x(s,o),x(o,c),x(s,n),I(n,_[1]),_[5](s),e||(a=[j(n,"input",_[4]),j(n,"keydown",_[3])],e=!0)},p(l,[u]){u&1&&(f=l[0],i=G(i,u,r,1,l,f,t,s,D,B,h,U)),u&2&&n.value!==l[1]&&I(n,l[1])},i:O,o:O,d(l){l&&b(s);for(let u=0;u<i.length;u+=1)i[u].d();_[5](null),e=!1,M(a)}}}function re(_,s,i){const t=new te;let h=[],o="",c;function n(r){r.key==="Enter"&&(i(0,h=[...h,{text:o,type:"input"}]),e(o),i(1,o=""),setTimeout(()=>{i(2,c.scrollTop=c.scrollHeight,c)},0))}function e(r){const l=r.split(" "),u=l[0];switch(u){case"echo":const p=t.ansi_to_html(l.slice(1).join(" "));i(0,h=[...h,{text:p,type:"output"}]);break;default:i(0,h=[...h,{text:`Unknown command: ${u}`,type:"error"}]);break}}function a(){o=this.value,i(1,o)}function f(r){$[r?"unshift":"push"](()=>{c=r,i(2,c)})}return[h,o,c,n,a,f]}class le extends L{constructor(s){super(),R(this,s,re,ie,q,{})}}function ae(_){let s,i;return s=new le({}),{c(){X(s.$$.fragment)},l(t){W(s.$$.fragment,t)},m(t,h){J(s,t,h),i=!0},p:O,i(t){i||(P(s.$$.fragment,t),i=!0)},o(t){Q(s.$$.fragment,t),i=!1},d(t){Y(s,t)}}}function fe(_){return Z.set("terminal"),[]}class he extends L{constructor(s){super(),R(this,s,fe,ae,q,{})}}export{he as default};
