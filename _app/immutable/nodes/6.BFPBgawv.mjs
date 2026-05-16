import{_ as U}from"../chunks/Vqxjq5Cl.mjs";import{a as s,t as o,f as g}from"../chunks/C603BAvK.mjs";import"../chunks/DZ_ncIIB.mjs";import{f as w,s as r,n as a}from"../chunks/DacMhmEP.mjs";import"../chunks/DihdM1og.mjs";import{P as i}from"../chunks/DLwDTXty.mjs";import{C as c}from"../chunks/DkNG-ITE.mjs";var P=g("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function F(_){var l=P(),d=w(l);i(d,{children:(e,n)=>{a();var t=o(`If you have a bunch of services or apps that require SSL certificates, but they do not run as
	root, they will not have access to /etc/letsencrypt so will fail when they load.`);s(e,t)},$$slots:{default:!0}});var p=r(d,2);i(p,{children:(e,n)=>{a();var t=o("Here's a simple way to automatically copy the renewed certificates.");s(e,t)},$$slots:{default:!0}});var u=r(p,2);i(u,{children:(e,n)=>{a();var t=o("First, create a script /usr/bin/copy-certs");s(e,t)},$$slots:{default:!0}});var m=r(u,2);c(m,{lang:"bash",code:`#!/usr/bin/sh

# /usr/bin/copy-certs
# First non-root app/service
install -Dm 644 -o [service username] /etc/letsencrypt/live/[service domain]/fullchain.pem /path/to/service/readable/cert.pem
install -Dm 600 -o [service username] /etc/letsencrypt/live/[service domain]/privkey.pem /path/to/service/readable/key.pem

# same process for each additional app/service`});var h=r(m,2);i(h,{children:(e,n)=>{a();var t=o("Then, set up a systemd unit and timer for running the copy script.");s(e,t)},$$slots:{default:!0}});var y=r(h,2);i(y,{children:(e,n)=>{a();var t=o("e.g. /usr/lib/systemd/system/copy-cert.timer :");s(e,t)},$$slots:{default:!0}});var v=r(y,2);c(v,{lang:"ini",code:`[Unit]
Description=Run certbot copy cert

[Timer]
OnCalendar=*-*-* 00,03,06,09,12,15,18,21:00:00
RandomizedDelaySec=2h
Persistent=true

[Install]
WantedBy=timers.target`});var f=r(v,2);i(f,{children:(e,n)=>{a();var t=o("e.g. /usr/lib/systemd/system/copy-cert.service :");s(e,t)},$$slots:{default:!0}});var $=r(f,2);c($,{lang:"ini",code:`[Unit]
Description=Copy certs
Documentation=https://eff-certbot.readthedocs.io/en/stable/

[Service]
Type=oneshot
ExecStart=/usr/bin/copy-certs
PrivateTmp=true`});var b=r($,2);i(b,{children:(e,n)=>{a();var t=o("Then, you need to run a few things");s(e,t)},$$slots:{default:!0}});var x=r(b,2);c(x,{lang:"bash",code:`# first make the script executable
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
sudo systemctl status copy-cert`}),s(_,l)}export{F as component,U as universal};
