import{Rt as e,U as t,V as n,ht as r,mt as i,z as a}from"../chunks/BkFQlMHx.mjs";import"../chunks/xihTtKlq.mjs";import{t as o}from"../chunks/B3q1TijA.mjs";import{t as s}from"../chunks/Dt1PLgsy.mjs";import"../chunks/DND9tJTA.mjs";import{t as c}from"../chunks/iqoQdcE_.mjs";var l=n(`<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>`,1);function u(n){var c=l(),u=i(c);o(u,{children:(n,r)=>{e();var i=t(`If you have a bunch of services or apps that require SSL certificates, but they do not run as
	root, they will not have access to /etc/letsencrypt so will fail when they load.`);a(n,i)},$$slots:{default:!0}});var d=r(u,2);o(d,{children:(n,r)=>{e();var i=t(`Here's a simple way to automatically copy the renewed certificates.`);a(n,i)},$$slots:{default:!0}});var f=r(d,2);o(f,{children:(n,r)=>{e();var i=t(`First, create a script /usr/bin/copy-certs`);a(n,i)},$$slots:{default:!0}});var p=r(f,2);s(p,{lang:`bash`,code:`#!/usr/bin/sh

# /usr/bin/copy-certs
# First non-root app/service
install -Dm 644 -o [service username] /etc/letsencrypt/live/[service domain]/fullchain.pem /path/to/service/readable/cert.pem
install -Dm 600 -o [service username] /etc/letsencrypt/live/[service domain]/privkey.pem /path/to/service/readable/key.pem

# same process for each additional app/service`});var m=r(p,2);o(m,{children:(n,r)=>{e();var i=t(`Then, set up a systemd unit and timer for running the copy script.`);a(n,i)},$$slots:{default:!0}});var h=r(m,2);o(h,{children:(n,r)=>{e();var i=t(`e.g. /usr/lib/systemd/system/copy-cert.timer :`);a(n,i)},$$slots:{default:!0}});var g=r(h,2);s(g,{lang:`ini`,code:`[Unit]
Description=Run certbot copy cert

[Timer]
OnCalendar=*-*-* 00,03,06,09,12,15,18,21:00:00
RandomizedDelaySec=2h
Persistent=true

[Install]
WantedBy=timers.target`});var _=r(g,2);o(_,{children:(n,r)=>{e();var i=t(`e.g. /usr/lib/systemd/system/copy-cert.service :`);a(n,i)},$$slots:{default:!0}});var v=r(_,2);s(v,{lang:`ini`,code:`[Unit]
Description=Copy certs
Documentation=https://eff-certbot.readthedocs.io/en/stable/

[Service]
Type=oneshot
ExecStart=/usr/bin/copy-certs
PrivateTmp=true`});var y=r(v,2);o(y,{children:(n,r)=>{e();var i=t(`Then, you need to run a few things`);a(n,i)},$$slots:{default:!0}});var b=r(y,2);s(b,{lang:`bash`,code:`# first make the script executable
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
sudo systemctl status copy-cert`}),a(n,c)}export{u as component,c as universal};