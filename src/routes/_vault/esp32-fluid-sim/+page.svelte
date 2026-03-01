<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import { page } from '$app/state';
	import { P, List, Li, A } from 'flowbite-svelte';
	import BoringReference from '$components/BoringReference.svelte';
	import BoringBibliography from '$components/BoringBibliography.svelte';
	import { createFootnote } from '$components/BoringReference.svelte';
	import EnhancedImg from '$components/EnhancedImg.svelte';

	// let images = page.data.props.gallery.images as HTMLImgAttributes[];
	let items: Footnote[] = [];
</script>

<P class="text-right">
	<A href="https://github.com/zeyus/FLIP-ESP32-I2C-OLED"
		>Source code <img
			class="ml-2"
			alt="GitHub License"
			src="https://img.shields.io/github/license/zeyus/FLIP-ESP32-I2C-OLED"
		/></A
	>
</P>

<P
	>So, I came across this really amazing looking <A
		href="https://mitxela.com/projects/fluid-pendant">LED matrix fluid simulation pendant</A
	>, and thought it would be fun to try and make one without needing machining skills, nor the money
	to buy gold plating.</P
>

<P
	>I decided it should be possible with modular components, and made a first brush at running it on
	the Arduino Mega 2560. It worked, but the simulation was only running at about 10 fps. Enter the
	ESP32, with its dual cores and floating point support.
</P>

<P>Here's the list of components (so far):</P>

<List>
	<Li>ESP32-WROOM-32 (Any ESP32 should work) dev board</Li>
	<Li>ESP32 breakout board</Li>
	<Li>SSD1306 OLED 128x64 display</Li>
	<Li>GY-521 / MPU-6050 Accelerometer &amp; gyroscope</Li>
	<Li>500mAh LiPo pouch</Li>
	<Li>TPS63020 3.3V buck/boost module</Li>
	<Li>3296W 10K Trimpot</Li>
	<Li>TP4056 Charger Module</Li>
</List>

<P>Work in progress video</P>

<iframe
	class="my-8"
	width="560"
	height="315"
	src="https://www.youtube-nocookie.com/embed/0kSZB3dPxjA?si=xZa_xWljPTpGkSqo"
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	referrerpolicy="strict-origin-when-cross-origin"
	allowfullscreen
></iframe>

<P
	>More to come soon...I'm waiting on a couple of parts, and then I'll spend some time finishing it
	off and cleaning up the code.</P
>
