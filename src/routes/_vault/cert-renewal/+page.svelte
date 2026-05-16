<script lang="ts">
	import { P, List, Li, A } from 'flowbite-svelte';
	import CodeBlock from '$components/CodeBlock.svelte';
</script>

<P>
	If you have a bunch of services or apps that require SSL certificates, but they do not run as
	root, they will not have access to /etc/letsencrypt so will fail when they load.
</P>

<P>Here's a simple way to automatically copy the renewed certificates.</P>

<P>First, create a script /usr/bin/copy-certs</P>

<!-- prettier-ignore -->
<CodeBlock lang="bash">
#!/usr/bin/sh

# /usr/bin/copy-certs
# First non-root app/service
install -Dm 644 -o [service username] /etc/letsencrypt/live/[service domain]/fullchain.pem /path/to/service/readable/cert.pem
install -Dm 600 -o [service username] /etc/letsencrypt/live/[service domain]/privkey.pem /path/to/service/readable/key.pem

# same process for each additional app/service
</CodeBlock>

<P>Then, set up a systemd unit and timer for running the copy script.</P>

<P>e.g. /usr/lib/systemd/system/copy-cert.timer :</P>
<!-- prettier-ignore -->
<CodeBlock lang="ini">
[Unit]
Description=Run certbot copy cert

[Timer]
OnCalendar=*-*-* 00,03,06,09,12,15,18,21:00:00
RandomizedDelaySec=2h
Persistent=true

[Install]
WantedBy=timers.target
</CodeBlock>

<P>e.g. /usr/lib/systemd/system/copy-cert.service :</P>
<!-- prettier-ignore -->
<CodeBlock lang="ini">
[Unit]
Description=Copy certs
Documentation=https://eff-certbot.readthedocs.io/en/stable/

[Service]
Type=oneshot
ExecStart=/usr/bin/copy-certs
PrivateTmp=true
</CodeBlock>

<P>Then, you need to run a few things</P>

<!-- prettier-ignore -->
<CodeBlock lang="bash">
# first make the script executable
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
sudo systemctl status copy-cert
</CodeBlock>
