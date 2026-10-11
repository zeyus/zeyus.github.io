import{Et as e,Gt as t,Q as n,X as r,tt as i,wt as a}from"../chunks/BlxtBjMW.js";import{t as o}from"../chunks/By0W-Ift.js";import{n as s,t as c}from"../chunks/S0gtsNH7.js";import"../chunks/CNvNBOXK.js";import{t as l}from"../chunks/xea6Wx3B.js";var u={name:`ini`,aliases:[`toml`],register:{name:`ini`,aliases:[`toml`],caseInsensitive:!0,states:[{illegal:`\\S`,rules:[1,4,5,6]},{scope:`comment`,begin:`;`,end:`$`,rules:[2,3]},{scope:`doctag`,begin:`[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)`,end:`(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):`,excludeBegin:!0,relevance:0},{begin:`[ ]+((?:I|a|is|so|us|to|at|if|in|it|on|[A-Za-z]+['](d|ve|re|ll|t|s|n)|[A-Za-z]+[-][a-z]+|[A-Za-z][a-z]{2,})[.]?[:]?([.][ ]|[ ])){3}`,end:`\\B|\\b`},{scope:`comment`,begin:`#`,end:`$`,rules:[2,3]},{scope:`section`,begin:`\\[+`,end:`\\]+`},{scope:`attr`,begin:`(?:[A-Za-z0-9_-]+|"(\\\\"|[^"])*"|'[^']*')(\\s*\\.\\s*(?:[A-Za-z0-9_-]+|"(\\\\"|[^"])*"|'[^']*'))*(?=\\s*=\\s*[^#\\s])`,end:`\\B|\\b`,starts:7},{begin:`\\B|\\b`,end:`$`,rules:[1,4,8,9,10,11,12,14,16,18,20,21]},{begin:`\\[`,end:`\\]`,relevance:0,rules:[1,4,9,10,11,12,14,16,18,20,21,8]},{scope:`literal`,begin:`\\bon|off|true|false|yes|no\\b`,end:`\\B|\\b`},{scope:`variable`,begin:`\\$[\\w\\d"][\\w\\d_]*`,end:`\\B|\\b`},{scope:`variable`,begin:`\\$\\{(.*?)\\}`,end:`\\B|\\b`},{scope:`string`,begin:`'''`,end:`'''`,relevance:10,rules:[13]},{begin:`\\\\[\\s\\S]`,end:`\\B|\\b`,relevance:0},{scope:`string`,begin:`"""`,end:`"""`,relevance:10,rules:[15]},{begin:`\\\\[\\s\\S]`,end:`\\B|\\b`,relevance:0},{scope:`string`,begin:`"`,end:`"`,rules:[17]},{begin:`\\\\[\\s\\S]`,end:`\\B|\\b`,relevance:0},{scope:`string`,begin:`'`,end:`'`,rules:[19]},{begin:`\\\\[\\s\\S]`,end:`\\B|\\b`,relevance:0},{scope:`number`,begin:`([+-]+)?[\\d]+_[\\d_]+`,end:`\\B|\\b`,relevance:0},{scope:`number`,begin:`\\b\\d+(\\.\\d+)?`,end:`\\B|\\b`,relevance:0}]}},d=n(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1);function f(n){var l=d(),f=a(l);o(f,{children:(e,n)=>{t();var a=i(`If you have a bunch of services or apps that require SSL certificates, but they do not run as
	root, they will not have access to /etc/letsencrypt so will fail when they load.`);r(e,a)},$$slots:{default:!0}});var p=e(f,2);o(p,{children:(e,n)=>{t();var a=i(`Here's a simple way to automatically copy the renewed certificates.`);r(e,a)},$$slots:{default:!0}});var m=e(p,2);o(m,{children:(e,n)=>{t();var a=i(`First, create a script /usr/bin/copy-certs`);r(e,a)},$$slots:{default:!0}});var h=e(m,2);c(h,{get lang(){return s},code:`#!/usr/bin/sh

# /usr/bin/copy-certs
# First non-root app/service
install -Dm 644 -o [service username] /etc/letsencrypt/live/[service domain]/fullchain.pem /path/to/service/readable/cert.pem
install -Dm 600 -o [service username] /etc/letsencrypt/live/[service domain]/privkey.pem /path/to/service/readable/key.pem

# same process for each additional app/service`});var g=e(h,2);o(g,{children:(e,n)=>{t();var a=i(`Then, set up a systemd unit and timer for running the copy script.`);r(e,a)},$$slots:{default:!0}});var _=e(g,2);o(_,{children:(e,n)=>{t();var a=i(`e.g. /usr/lib/systemd/system/copy-cert.timer :`);r(e,a)},$$slots:{default:!0}});var v=e(_,2);c(v,{get lang(){return u},code:`[Unit]
Description=Run certbot copy cert

[Timer]
OnCalendar=*-*-* 00,03,06,09,12,15,18,21:00:00
RandomizedDelaySec=2h
Persistent=true

[Install]
WantedBy=timers.target`});var y=e(v,2);o(y,{children:(e,n)=>{t();var a=i(`e.g. /usr/lib/systemd/system/copy-cert.service :`);r(e,a)},$$slots:{default:!0}});var b=e(y,2);c(b,{get lang(){return u},code:`[Unit]
Description=Copy certs
Documentation=https://eff-certbot.readthedocs.io/en/stable/

[Service]
Type=oneshot
ExecStart=/usr/bin/copy-certs
PrivateTmp=true`});var x=e(b,2);o(x,{children:(e,n)=>{t();var a=i(`Then, you need to run a few things`);r(e,a)},$$slots:{default:!0}});var S=e(x,2);c(S,{get lang(){return s},code:`# first make the script executable
sudo chmod +x /usr/bin/copy-certs

# make sure it can be found
sudo systemctl daemon-reload

# then enable and start the timer
sudo systemctl enable --now copy-cert.timer

# test it out
sudo systemctl start copy-cert

# if it works you should see the copied certs in their
# new locations and you can confirm the timer is working with
sudo systemctl list-timers copy-cert.timer
# and you can see if the script executed successfully with
sudo systemctl status copy-cert`}),r(n,l)}export{f as component,l as universal};