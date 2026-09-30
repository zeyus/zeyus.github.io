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

	let touchScroll: (() => void) | undefined;

	// xterm 6's scrollbar ignores touch, so one-finger drags scroll the scrollback
	// here, with a little momentum. Returns a cleanup function.
	function enableTouchScroll(term: Terminal): () => void {
		let lastY = 0;
		let lastT = 0;
		let carry = 0; // sub-line remainder in px
		let velocity = 0; // px per ms
		let active = false; // this gesture belongs to the terminal
		let decided = false;
		let fling = 0;

		const cellHeight = () => {
			const screen = host.querySelector<HTMLElement>('.xterm-screen');
			return screen && term.rows ? screen.clientHeight / term.rows : 16;
		};
		const canScroll = (dy: number) => {
			const buf = term.buffer.active;
			// finger down (dy > 0) moves towards older lines
			return dy > 0 ? buf.viewportY > 0 : buf.viewportY < buf.baseY;
		};
		const scrollBy = (px: number) => {
			const h = cellHeight();
			carry += px;
			const lines = Math.trunc(carry / h);
			if (lines) {
				carry -= lines * h;
				term.scrollLines(-lines);
			}
		};
		const stopFling = () => {
			cancelAnimationFrame(fling);
			fling = 0;
		};

		const start = (e: TouchEvent) => {
			stopFling();
			if (e.touches.length !== 1) {
				active = false;
				decided = true;
				return;
			}
			lastY = e.touches[0].clientY;
			lastT = e.timeStamp;
			carry = 0;
			velocity = 0;
			active = false;
			decided = false;
		};
		const move = (e: TouchEvent) => {
			if (e.touches.length !== 1) return;
			const y = e.touches[0].clientY;
			const dy = y - lastY;
			if (!decided) {
				if (Math.abs(dy) < 4) return; // leave taps alone
				// with nothing to scroll in that direction the page takes the gesture
				active = canScroll(dy);
				decided = true;
			}
			if (!active) return;
			if (e.cancelable) e.preventDefault();
			const dt = Math.max(1, e.timeStamp - lastT);
			velocity = 0.8 * (dy / dt) + 0.2 * velocity;
			lastY = y;
			lastT = e.timeStamp;
			scrollBy(dy);
		};
		const end = () => {
			if (!active || Math.abs(velocity) < 0.1) return;
			let prev = performance.now();
			const step = (now: number) => {
				const dt = now - prev;
				prev = now;
				scrollBy(velocity * dt);
				velocity *= Math.pow(0.995, dt);
				fling = Math.abs(velocity) > 0.02 ? requestAnimationFrame(step) : 0;
			};
			fling = requestAnimationFrame(step);
		};

		host.addEventListener('touchstart', start, { passive: true });
		host.addEventListener('touchmove', move, { passive: false });
		host.addEventListener('touchend', end, { passive: true });
		host.addEventListener('touchcancel', end, { passive: true });
		return () => {
			stopFling();
			host.removeEventListener('touchstart', start);
			host.removeEventListener('touchmove', move);
			host.removeEventListener('touchend', end);
			host.removeEventListener('touchcancel', end);
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

			touchScroll = enableTouchScroll(term);
			onready(term);
		})();

		// xterm 6 never scrolls its elements natively, so any offset is the browser
		// revealing the focused textarea (e.g. when the keyboard opens); left alone it
		// shoves the canvas up and shows a black band underneath
		const unshift = (e: Event) => {
			const el = e.target as HTMLElement;
			if (el !== host && !host.contains(el)) return;
			if (el.scrollTop || el.scrollLeft) {
				el.scrollTop = 0;
				el.scrollLeft = 0;
			}
		};
		host.addEventListener('scroll', unshift, { capture: true, passive: true });

		return () => {
			disposed = true;
			touchScroll?.();
			host.removeEventListener('scroll', unshift, { capture: true });
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
		background: #050507;
	}
	/* the padding goes on .xterm, not the host: the fit addon subtracts it there,
	   but counts host padding as usable height and cuts off the last row */
	.xterm-host :global(.xterm) {
		height: 100%;
		padding: 0.4rem 0 0.4rem 0.5rem;
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
