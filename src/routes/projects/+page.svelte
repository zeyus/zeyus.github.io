<script lang="ts">
	import { ButtonGroup, Button, Card, P, A } from 'flowbite-svelte';
	import {
		CaretDownSolid,
		CaretUpSolid,
		CloseCircleSolid,
		CodeOutline
	} from 'flowbite-svelte-icons';
	import type { MetadataContext } from '$lib/metadata.svelte';
	import { getContext } from 'svelte';

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

<div class="flex w-full flex-row justify-end">
	<div class="flex w-1/12 flex-row justify-between self-end p-0 md:w-4/12">
		<button
			aria-label="Toggle sort order (ascending/descending)"
			title="Toggle sort order (ascending/descending)"
			class="me-2 mb-3 h-2 w-2 cursor-pointer p-0 text-xl text-gray-800 dark:bg-none dark:text-gray-300"
			onclick={() => (orderDirection = orderDirection === 'asc' ? 'desc' : 'asc')}
			>{#if orderDirection === 'asc'}
				<CaretUpSolid size="xs" />
			{:else}
				<CaretDownSolid size="xs" />
			{/if}
		</button>
		{#if selectedTags.length > 0 || excludedTags.length > 0}
			<button
				aria-label="Clear filters"
				title="Clear filters"
				class="me-2 mb-3 h-2 w-2 cursor-pointer p-0 text-xl text-red-800 dark:bg-none dark:text-red-800"
				onclick={() => ((selectedTags = []), (excludedTags = []))}
				><CloseCircleSolid size="xs" /></button
			>
		{/if}
	</div>
	<div class="flex w-11/12 flex-[1_1_auto] flex-row flex-wrap justify-end md:w-8/12">
		{#each allTags as tag}
			{@const excluded = excludedTags.includes(tag)}
			{@const checked = selectedTags.includes(tag) || excluded}
			{@const colorClasses = checked
				? !excluded
					? 'dark:bg-primary-800 dark:text-black dark:hover:bg-primary-900 dark:border-primary-900'
					: 'dark:bg-mauve-900 dark:text-gray-500 dark:hover:bg-mauve-950 dark:border-mauve-800'
				: 'dark:bg-none dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-white dark:border-primary-900'}
			<Button
				size="xs"
				color="light"
				pill={false}
				outline={true}
				shadow={false}
				class="mb-2 ml-2 min-w-10 p-2 hover:bg-gray-700 dark:border-2 {colorClasses}"
				onclick={() => toggleTag(tag)}
				{checked}>{tag}</Button
			>
		{/each}
	</div>
</div>
<div class="w-full columns-1 sm:columns-2 xl:columns-3">
	{#each projects as project}
		<Card
			class="mx-auto mb-4 w-full max-w-lg break-inside-avoid-column p-4 sm:mx-0 dark:bg-zinc-800"
		>
			<h5 class="mb-0 truncate text-2xl font-bold whitespace-normal text-white">{project.name}</h5>
			<div class="m-0 mb-4 h-fit w-fit self-start p-0">
				{#each project.tags.toSorted(tagSort) as tag}
					<Button
						size="xs"
						color="light"
						class="me-2 p-1 text-primary-600 dark:bg-zinc-800 dark:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-white"
						onclick={() => (selectedTags = [tag])}>{tag}</Button
					>
				{/each}
			</div>
			<p class="mx-2 mb-0 leading-tight font-normal text-gray-300">{@html project.description}</p>
			<div class="flex w-full flex-col justify-between">
				<ButtonGroup class="project-buttons mt-4 mb-0 flex h-8 justify-end gap-2">
					{#if project.link}
						<Button color="primary" class="my-0 inline-flex h-8" href={project.link}>
							{project.linkText ? project.linkText : 'Go'}
						</Button>
					{/if}
					{#if project.source}
						<Button
							color="alternative"
							class="my-0 inline-flex h-8 dark:bg-zinc-800 dark:hover:bg-zinc-500"
							href={project.source}
						>
							<CodeOutline class="me-2" />
							<span>Source</span>
						</Button>
					{/if}
				</ButtonGroup>
				<!-- tags -->
			</div>
		</Card>
	{/each}
</div>

<style>
	:global(.project-buttons svg) {
		display: inline-flex;
	}
</style>
