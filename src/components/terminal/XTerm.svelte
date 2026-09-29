<script lang="ts">
	import '@xterm/xterm/css/xterm.css';
	import type { ITerminalOptions, ITheme, Terminal } from '@xterm/xterm';
	import { onMount } from 'svelte';

	let {
		onready,
		options = {}
	}: {
		onready: (term: Terminal) => void;
		options?: ITerminalOptions;
	} = $props();

	let host: HTMLDivElement;

	// resolves any CSS colour (including oklch and var()) to #rrggbb
	function cssColor(value: string, fallback: string): string {
		const probe = document.createElement('canvas').getContext('2d');
		if (!probe || !value.trim()) return fallback;
		probe.fillStyle = fallback;
		probe.fillStyle = value.trim();
		probe.fillRect(0, 0, 1, 1);
		const [r, g, b] = probe.getImageData(0, 0, 1, 1).data;
		return '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('');
	}

	// the screen itself stays dark in both themes, the accent follows the site theme
	function theme(): ITheme {
		const accent = cssColor(
			getComputedStyle(document.documentElement).getPropertyValue('--color-accent'),
			'#d946ef'
		);
		return {
			background: '#050507',
			foreground: '#e4e4e7',
			cursor: accent,
			cursorAccent: '#050507',
			selectionBackground: accent + '66',
			black: '#18181b',
			red: '#ff5370',
			green: '#39ff88',
			yellow: '#ffcb6b',
			blue: '#5ab0ff',
			magenta: '#e879f9',
			cyan: '#22e5ff',
			white: '#d4d4d8',
			brightBlack: '#71717a',
			brightRed: '#ff8095',
			brightGreen: '#7dffb0',
			brightYellow: '#ffe09a',
			brightBlue: '#8cc8ff',
			brightMagenta: '#f0abfc',
			brightCyan: '#8af1ff',
			brightWhite: '#fafafa'
		};
	}

	onMount(() => {
		let disposed = false;
		let term: Terminal | undefined;
		let resizeObserver: ResizeObserver | undefined;
		let themeObserver: MutationObserver | undefined;

		(async () => {
			const [{ Terminal }, { FitAddon }, { WebLinksAddon }, { Unicode11Addon }] = await Promise.all(
				[
					import('@xterm/xterm'),
					import('@xterm/addon-fit'),
					import('@xterm/addon-web-links'),
					import('@xterm/addon-unicode11')
				]
			);
			// measure cells with the real font, not the fallback
			await document.fonts?.load('14px "Hack Nerd Font"').catch(() => undefined);
			if (disposed) return;

			term = new Terminal({
				fontFamily: '"Hack Nerd Font", ui-monospace, monospace',
				fontSize: window.innerWidth < 640 ? 12 : 14,
				lineHeight: 1.1,
				cursorBlink: true,
				scrollback: 5000,
				allowProposedApi: true,
				...options,
				theme: theme()
			});
			const fit = new FitAddon();
			term.loadAddon(fit);
			term.loadAddon(new WebLinksAddon());
			// emoji and CJK take two cells (matches cellWidth() used by the shell)
			term.loadAddon(new Unicode11Addon());
			term.unicode.activeVersion = '11';
			term.open(host);

			let frame = 0;
			const refit = () => {
				cancelAnimationFrame(frame);
				frame = requestAnimationFrame(() => {
					// hidden (minimised) terminals have no size to fit to
					if (host.offsetWidth > 0 && host.offsetHeight > 0) fit.fit();
				});
			};
			refit();
			resizeObserver = new ResizeObserver(refit);
			resizeObserver.observe(host);

			themeObserver = new MutationObserver(() => {
				if (term) term.options.theme = theme();
			});
			themeObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ['class']
			});

			onready(term);
		})();

		return () => {
			disposed = true;
			resizeObserver?.disconnect();
			themeObserver?.disconnect();
			term?.dispose();
		};
	});
</script>

<div class="xterm-host" bind:this={host}></div>

<style>
	.xterm-host {
		flex: 1 1 auto;
		min-height: 0;
		min-width: 0;
		padding: 0.4rem 0 0 0.5rem;
		background: #050507;
	}
	.xterm-host :global(.xterm) {
		height: 100%;
	}
	/* app.css hides div[role='presentation'], which xterm uses for its viewport */
	.xterm-host :global(div[role='presentation']) {
		display: block;
	}
	.xterm-host :global(.xterm-viewport) {
		scrollbar-width: thin;
		scrollbar-color: var(--color-accent-soft) transparent;
	}
</style>
