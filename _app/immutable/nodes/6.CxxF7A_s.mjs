import{J as e,K as t,St as n,Vt as r,X as i,bt as a}from"../chunks/SKx8kQ6a.mjs";import"../chunks/xihTtKlq.mjs";import{t as o}from"../chunks/BSfPkDG0.mjs";import{t as s}from"../chunks/BXoAfsEk.mjs";import"../chunks/CnP7a91j.mjs";import{t as c}from"../chunks/Da6OifyR.mjs";var l=e(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1);function u(e){var c=l(),u=a(c);o(u,{children:(e,n)=>{r();var a=i(`If you have a bunch of services or apps that require SSL certificates, but they do not run as
	root, they will not have access to /etc/letsencrypt so will fail when they load.`);t(e,a)},$$slots:{default:!0}});var d=n(u,2);o(d,{children:(e,n)=>{r();var a=i(`Here's a simple way to automatically copy the renewed certificates.`);t(e,a)},$$slots:{default:!0}});var f=n(d,2);o(f,{children:(e,n)=>{r();var a=i(`First, create a script /usr/bin/copy-certs`);t(e,a)},$$slots:{default:!0}});var p=n(f,2);s(p,{lang:`bash`,code:`#!/usr/bin/sh

# /usr/bin/copy-certs
# First non-root app/service
install -Dm 644 -o [service username] /etc/letsencrypt/live/[service domain]/fullchain.pem /path/to/service/readable/cert.pem
install -Dm 600 -o [service username] /etc/letsencrypt/live/[service domain]/privkey.pem /path/to/service/readable/key.pem

# same process for each additional app/service`});var m=n(p,2);o(m,{children:(e,n)=>{r();var a=i(`Then, set up a systemd unit and timer for running the copy script.`);t(e,a)},$$slots:{default:!0}});var h=n(m,2);o(h,{children:(e,n)=>{r();var a=i(`e.g. /usr/lib/systemd/system/copy-cert.timer :`);t(e,a)},$$slots:{default:!0}});var g=n(h,2);s(g,{lang:`ini`,code:`[Unit]
Description=Run certbot copy cert

[Timer]
OnCalendar=*-*-* 00,03,06,09,12,15,18,21:00:00
RandomizedDelaySec=2h
Persistent=true

[Install]
WantedBy=timers.target`});var _=n(g,2);o(_,{children:(e,n)=>{r();var a=i(`e.g. /usr/lib/systemd/system/copy-cert.service :`);t(e,a)},$$slots:{default:!0}});var v=n(_,2);s(v,{lang:`ini`,code:`[Unit]
Description=Copy certs
Documentation=https://eff-certbot.readthedocs.io/en/stable/

[Service]
Type=oneshot
ExecStart=/usr/bin/copy-certs
PrivateTmp=true`});var y=n(v,2);o(y,{children:(e,n)=>{r();var a=i(`Then, you need to run a few things`);t(e,a)},$$slots:{default:!0}});var b=n(y,2);s(b,{lang:`bash`,code:`# first make the script executable
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
sudo systemctl status copy-cert`}),t(e,c)}export{u as component,c as universal};