<script lang="ts">
	import type { MetadataContext } from '$lib/metadata.svelte';
	import { getContext } from 'svelte';

	// explicit ids, otherwise auto-slug gives every card the same id ("project-name")
	const projectId = (name: string) =>
		name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');

	let metaCtx = getContext<MetadataContext>('metadata');

	metaCtx.setMetadata({
		title: 'projects',
		description:
			'A selection of projects that I have worked on, from apps to research, all open source!'
	});

	interface Project {
		name: string;
		description: string;
		link?: string;
		linkText?: string;
		source?: string;
		tags: string[];
	}

	const allProjects: Project[] = [
		{
			name: 'MEP Contact',
			description:
				"A simple web app to help you find and contact your (Members of the European Parliament) MEPs. Because their website is difficult to navigate, here, it's all on one page.",
			link: 'https://zeyus.com/contact-mep-representative',
			source: 'https://github.com/zeyus/contact-mep-representative',
			tags: ['politics', 'tool']
		},
		{
			name: 'liblsl.dart native',
			description:
				'A Dart / Flutter library for the Lab Streaming Layer (LSL), a system for synchronizing streaming data in real-time. Using native-assets, this library builds the liblsl dynamic library and Dart bindings + a user-friendly API. Works in OSX, Linux, Windows, iOS, Android (including Meta Quest).',
			link: 'https://pub.dev/packages/liblsl',
			source: 'https://github.com/NexusDynamic/liblsl.dart',
			tags: ['research', 'tool', 'library', 'dart', 'lsl']
		},
		{
			name: 'flutter_multicast_lock',
			description:
				'A Flutter plugin for managing Android WiFi multicast locks. This plugin allows you to acquire and release multicast locks on Android devices, which is necessary for receiving multicast UDP packets.',
			link: 'https://pub.dev/packages/flutter_multicast_lock',
			source: 'https://github.com/NexusDynamic/flutter_multicast_lock',
			tags: ['tool', 'library', 'dart', 'flutter']
		},
		{
			name: 'flutter_refresh_rate_control',
			description:
				'A Flutter plugin that allows you to request high refresh rate mode on Android and iOS devices. This plugin provides a simple API to attempt to enable the highest possible refresh rate for your Flutter application.',
			link: 'https://pub.dev/packages/flutter_refresh_rate_control',
			source: 'https://github.com/NexusDynamic/flutter_refresh_rate_control',
			tags: ['tool', 'library', 'dart', 'flutter']
		},
		{
			name: 'easy_shared_preferences',
			description: "A flexible, hierarchical wrapper for flutter's shared_preferences package.",
			link: 'https://pub.dev/packages/easy_shared_preferences',
			source: 'https://github.com/NexusDynamic/easy_shared_preferences',
			tags: ['tool', 'library', 'dart', 'flutter']
		},
		{
			name: 'Python XDF explorer',
			description:
				'A python GUI script to view XDF files (eXtensible Data Format), from e.g. Lab Streaming Layer (LSL). It allows you to view the data in a more user-friendly way, and also to export it to CSV.',
			link: 'https://gist.github.com/zeyus/c80b27b66335b19dbf93467326ff208f',
			source: 'https://gist.github.com/zeyus/c80b27b66335b19dbf93467326ff208f',
			tags: ['research', 'tool', 'python', 'lsl']
		},
		{
			name: 'Python3BlueBox',
			description:
				'A old-school hacking tool, remade for the modern age. Generate MF (Multi-frequency) tones to control phone systems, just like in the movies.',
			link: 'https://pypi.org/project/mfbluebox/',
			linkText: 'PyPi',
			source: 'https://github.com/zeyus/Python3BlueBox',
			tags: ['security', 'tool', 'hacking']
		},
		{
			name: 'Long YouTube Videos UserScript',
			description:
				'A <a href="https://violentmonkey.github.io/">Violentmonkey</a> / <a href="https://www.tampermonkey.net/">Tampermonkey</a> / <a href="https://www.greasespot.net/">Greasemonkey</a> userscript to hide YouTube shorts and highlight videos over a specified length.',
			link: 'https://gist.github.com/zeyus/dae59e6a4d709bdb8a041a45634450cc/raw/YTLongForm.user.js',
			source: 'https://gist.github.com/zeyus/dae59e6a4d709bdb8a041a45634450cc',
			linkText: 'Install',
			tags: ['QoL', 'userscript']
		},
		{
			name: 'terminal-s (forked)',
			description:
				'A serial terminal that can act as a console host, supports SIGQUIT / SIGBREAK, and includes a loopback devices for testing.',
			source: 'https://github.com/zeyus/terminal-s',
			tags: ['tool', 'electronics']
		},
		{
			name: 'In-browser Serial COM Terminal',
			description:
				'A serverless serial terminal web app that works right in your browser, you can communicate with arduino or any other serial device without installing any software (you just need a browser that supports the WebSerial or USB API).',
			link: 'https://zeyus.com/terminal',
			source: 'https://github.com/zeyus/zeyus.github.io/blob/main/src/components/Terminal.svelte',
			tags: ['tool', 'electronics']
		},
		{
			name: 'Treasure Hunt',
			description:
				"A serverless geo-location based step-by-step treasure hunt / quiz. You can only get the next question when you're close to the location.",
			link: 'https://zeyus.com/sveltekit-treasure-hunt/',
			source: 'https://github.com/zeyus/sveltekit-treasure-hunt',
			tags: ['game', 'fun', 'docker']
		},
		{
			name: "Nine Peer's Morris",
			description:
				"A serverless peer-to-peer WebRTC implementation of the medieval Nine Men's Morris game.",
			link: 'https://zeyus.com/nine-peers-morris/',
			source: 'https://github.com/zeyus/nine-peers-morris',
			tags: ['game', 'fun', 'webrtc', 'p2p']
		},
		{
			name: 'RAGGA: Retrieval Augmented Generation General Assistant',
			description:
				'Load quantized LLMs and run them on your local devices. Interact with your own notes (currently markdown notes are supported by default) and ask questions about what you have written.',
			source: 'https://github.com/zeyus/RAGGA',
			tags: ['LLM', 'NLP', 'tool', 'research']
		},
		{
			name: 'AdAway Revival for Android (fork for Android 4.1 to 13)',
			description:
				'AdAway is an open-source ad blocker for Android using the hosts file. This fork is for Android 4.1 to 13, which are not officially supported by AdAway.',
			link: 'https://github.com/zeyus/AdAway/releases',
			linkText: 'Releases',
			source: 'https://github.com/zeyus/AdAway',
			tags: ['tool', 'android']
		},
		{
			name: 'TouchTracker',
			description:
				'A dart + flutter mobile / web / desktop app to perform experiments using touch tracking interfaces (compatible with MouseTrap data files).',
			link: 'https://zeyus.com/touchtracker/web/index.html',
			source: 'https://github.com/zeyus/touchtracker',
			tags: ['tool', 'research', 'dart', 'flutter']
		},
		{
			name: 'ukulele (fork), a discord music bot',
			description:
				'Play soundcloud, youtube, etc links in a discord call, customizable and working with later APIs.',
			link: 'https://github.com/zeyus?tab=packages&repo_name=ukulele',
			linkText: 'Docker',
			source: 'https://github.com/zeyus/ukulele',
			tags: ['docker', 'bot', 'music']
		},
		{
			name: "GPU Prisoner's Dilemma Agent-Based Model (ABM)",
			description:
				"A (3D, using FLAMEGPU2) 2D ABM simulation executed on the GPU. This ABM models interactions of 'games' between agents, specifically the Prisoner's Dilemma game, in which participants can either cooperate or defect, resulting in a payoff, depending on the combination of decisions.",
			link: 'https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM/releases',
			linkText: 'Releases',
			source: 'https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM',
			tags: ['research', 'simulation']
		},
		{
			name: 'WIP Novel social paradigm',
			description:
				'Current development of a novel paradigm for studying the brain during simultaneous cooperative and competitive tasks. It is targeted at joint action, social interaction, and social cognition research, and will be combined with EEG hyperscanning and neuro-/bio-feedback.',
			/** source: 'https://github.com/NexusDynamic/RiseTogether', **/
			linkText: 'Poster',
			link: 'https://nexusdynamic.org/FINAL-Coop_comp_paradigm-A0Poster_reduced.pdf',
			tags: ['research', 'game', 'flutter', 'dart', 'flame']
		},
		{
			name: 'BrainJammers.com',
			description:
				'Currently an interactive 3D WebGL brain, but probably will become a fake product to jam brains',
			link: 'https://brainjammers.com',
			source: 'https://github.com/zeyus/brainjammers.com',
			tags: ['WebGL', 'toy']
		},
		{
			name: 'Red Ocelot',
			description:
				'A Space Shooter game developed (by myself and @stuartrapop) in < 1 week for the Flame Game Jame 2025',
			link: 'https://zeyus.itch.io/red-ocelot',
			linkText: 'Play',
			source: 'https://github.com/FlameJam2025-T2/red_ocelot',
			tags: ['game', 'flutter', 'dart', 'flame', 'fun']
		},
		{
			name: 'Double ROT-13 encoder/decoder',
			description: 'Obvious joke.',
			link: 'https://zeyus.neocities.org/dr13',
			tags: ['fun', 'joke']
		},
		{
			name: 'Neverending Sweater',
			description:
				'The talking parts from Weezer\'s "Undone (the sweater song)" on infinite repeat. Includes dialogue popups and the ability speed up the track.',
			link: 'https://localhose.com/sweatshop.html',
			tags: ['fun', 'joke']
		},
		{
			name: 'android_libcpp_shared Dart / Flutter package',
			description:
				'Dart / flutter package for Android to add the libc++_shared.so STL C++ shared runtime library to your app.',
			link: 'https://pub.dev/packages/android_libcpp_shared',
			source: 'https://github.com/NexusDynamic/android_libcpp_shared',
			tags: ['tool', 'library', 'dart', 'flutter', 'android']
		}
	];

	const tagSort = (a: string, b: string) => a.localeCompare(b);

	let orderDirection = $state('asc');
	const orderBy = 'name';
	const allTags = allProjects
		.flatMap((p) => p.tags)
		.filter((tag, index, self) => self.indexOf(tag) === index)
		.sort(tagSort);
	let selectedTags: string[] = $state([]);
	let excludedTags: string[] = $state(['fun', 'joke', 'toy']);

	const sortProjects = (projects: Project[], order: string): Project[] => {
		projects.sort((a, b) => {
			const aValue = a[orderBy].toLowerCase();
			const bValue = b[orderBy].toLowerCase();
			if (aValue < bValue) return order === 'asc' ? -1 : 1;
			if (aValue > bValue) return order === 'asc' ? 1 : -1;
			return 0;
		});
		return projects;
	};

	const filterProjects = (tags: string[], exclude: string[]): Project[] => {
		return allProjects.filter((project) => {
			if (exclude.length > 0 && project.tags.some((tag: string) => exclude.includes(tag)))
				return false;
			if (tags.length === 0) return true;
			return project.tags.some((tag: string) => tags.includes(tag));
		});
	};

	let projects: Project[] = $derived(
		sortProjects(filterProjects(selectedTags, excludedTags), orderDirection)
	);

	const toggleTag = (tag: string) => {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
			excludedTags = [...excludedTags, tag];
		} else if (excludedTags.includes(tag)) {
			excludedTags = excludedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
	};

	// $effect(() => {
	// 	projects = sortProjects(filterProjects(selectedTags, excludedTags), orderDirection);
	// });
</script>

<div class="projects-head">
	<p class="term-prompt">
		<span class="text-accent">anon@zeyus</span>:~$ ls ~/projects --sort=name{orderDirection ===
		'desc'
			? ' --reverse'
			: ''}
		<span class="projects-count">({projects.length}/{allProjects.length})</span>
	</p>
	<div class="projects-controls">
		<button
			type="button"
			class="term-btn"
			aria-label="Toggle sort order (ascending/descending)"
			title="Toggle sort order (ascending/descending)"
			onclick={() => (orderDirection = orderDirection === 'asc' ? 'desc' : 'asc')}
			>[{orderDirection === 'asc' ? 'a→z' : 'z→a'}]</button
		>
		{#if selectedTags.length > 0 || excludedTags.length > 0}
			<button
				type="button"
				class="term-btn"
				aria-label="Clear filters"
				title="Clear filters"
				onclick={() => ((selectedTags = []), (excludedTags = []))}>[clear]</button
			>
		{/if}
	</div>
</div>

<div class="projects-tags" role="group" aria-label="Filter by tag">
	{#each allTags as tag (tag)}
		{@const excluded = excludedTags.includes(tag)}
		{@const included = selectedTags.includes(tag)}
		<button
			type="button"
			class="tag-chip"
			class:included
			class:excluded
			title={included
				? `showing ${tag}; click to hide`
				: excluded
					? `hiding ${tag}; click to reset`
					: `click to filter by ${tag}`}
			onclick={() => toggleTag(tag)}>{included ? '+' : excluded ? '-' : '#'}{tag}</button
		>
	{/each}
</div>

<div class="w-full columns-1 gap-4 sm:columns-2 xl:columns-3">
	{#each projects as project (project.name)}
		<article class="term-card project">
			<h2 class="project-name" id={projectId(project.name)}>{project.name}</h2>
			<p class="project-desc">{@html project.description}</p>
			<div class="project-tags">
				{#each project.tags.toSorted(tagSort) as tag (tag)}
					<button
						type="button"
						class="tag-chip small"
						class:included={selectedTags.includes(tag)}
						title="Show only {tag}"
						onclick={() => ((selectedTags = [tag]), (excludedTags = []))}>#{tag}</button
					>
				{/each}
			</div>
			{#if project.link || project.source}
				<div class="project-links">
					{#if project.link}
						<a href={project.link}>[{project.linkText ? project.linkText : 'open'}]</a>
					{/if}
					{#if project.source}
						<a href={project.source}>[source]</a>
					{/if}
				</div>
			{/if}
		</article>
	{/each}
</div>

<style>
	.projects-head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5rem 1rem;
		margin-top: 1.5rem;
	}

	.projects-count {
		margin-left: 0.5em;
		color: var(--color-fg-subtle);
	}

	.projects-controls {
		display: flex;
		gap: 0.75rem;
	}

	.term-btn {
		cursor: pointer;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-accent-strong);

		&:hover {
			text-shadow: 0 0 8px var(--color-glow);
		}
	}

	.projects-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-bottom: 1.75rem;
	}

	.tag-chip {
		cursor: pointer;
		padding: 0.15rem 0.6rem;
		border: 1px solid var(--color-line);
		border-radius: 999px;
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--color-fg-muted);
		transition:
			border-color 0.15s,
			color 0.15s,
			background-color 0.15s;

		&:hover {
			border-color: var(--color-accent);
			color: var(--color-accent-strong);
		}

		&.included {
			border-color: var(--color-accent);
			background-color: var(--color-accent-faint);
			color: var(--color-accent-strong);
			box-shadow: 0 0 10px -3px var(--color-glow);
		}

		&.excluded {
			color: var(--color-fg-subtle);
			text-decoration: line-through;
			opacity: 0.7;
		}

		&.small {
			padding: 0 0.45rem;
			font-size: 0.72rem;
		}
	}

	.project {
		break-inside: avoid;
		margin-bottom: 1rem;

		/* the card itself isn't a link, so glow but don't lift */
		&:hover {
			transform: none;
		}
	}

	.project-name {
		margin-bottom: 0.5rem;
		font-size: 1.35rem;
		line-height: 1.25;
		color: var(--color-fg-strong);
	}

	.project-desc {
		margin-bottom: 1rem;
		line-height: 1.55;
		color: var(--color-fg);
	}

	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.project-links {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px dashed var(--color-line);
		font-family: var(--font-mono);
		font-size: 0.85rem;

		a {
			color: var(--color-accent-strong);

			&:hover {
				text-shadow: 0 0 8px var(--color-glow);
			}
		}
	}
</style>
