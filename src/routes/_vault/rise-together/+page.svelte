<script lang="ts">
	import { P, List, Li, A, Heading } from 'flowbite-svelte';
	import BoringReference from '$components/BoringReference.svelte';
	import BoringBibliography from '$components/BoringBibliography.svelte';
	import { createFootnote } from '$components/BoringReference.svelte';
	import { resolve } from '$app/paths';
	import { Toc } from '@svelte-put/toc';

	const toc = new Toc({
		selector: ':where(h1, h2)',
		anchor: { position: 'append', content: '🔗' }
	});
	let items: Footnote[] = [];
</script>

<main use:toc.actions.root>
	<section
		class="mb-8 ml-4 max-w-fit rounded-4xl border-2 p-0 ps-4 pe-8 pb-8 dark:border-primary-800"
	>
		<h2 class="mt-0 mb-0 py-0" data-toc-ignore="true">Table of Contents</h2>
		{#if toc.items.size}
			<ul class="toc-items list-disc">
				{#each toc.items.values() as tocItem (tocItem.id)}
					<li class="ml-8">
						<!-- svelte-ignore a11y_missing_attribute -->
						<a class="dark:text-primary-600" use:toc.actions.link={tocItem}>
							<!-- textContent injected by toc -->
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
	<section>
		<P
			>First up, I want to say that this post will hopefully evolve, I think it's useful practice in
			explaining what I am doing in a way that is engaging. Finding the right level of detail is
			always a struggle for me...if I like something, I also enjoy all of the details that feed into
			whatever that something is. But, that's often not helpful and can easily become overwhelming,
			so let's give it a go.</P
		>

		<P
			>Ok, I know what I just wrote, but I can't help it, I at least want to list some of the moving
			parts involved in the project, and I might just use the list to flesh out details in seperate
			posts in the future (or not!)</P
		>
	</section>
	<section>
		<Heading tag="h2">Some of the moving parts...</Heading>
		<div class="my-4 rounded-4xl border-2 p-4 dark:border-primary-800">
			<List class="grid list-none grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
				<Li
					><Heading tag="h4">Fields & Theories:</Heading>
					<List>
						<Li>Cognitive Science</Li>
						<Li>Electrical Engineering</Li>
						<Li>Neuroscience</Li>
						<Li>Psychology</Li>
						<Li>Game Theory</Li>
						<Li>Computational Modeling</Li>
						<Li>Group Social Dynamics</Li>
						<Li>Joint Action</Li>
						<Li>Social Identity / Minimal Group Paradigm</Li>
						<Li>Software Engineering</Li>
					</List>
				</Li>
				<Li>
					<Heading tag="h4">Programming Languages:</Heading>
					<List>
						<Li>C++</Li>
						<Li>Dart</Li>
						<Li>Python</Li>
						<Li>HTML/JavaScript</Li>
					</List>
				</Li>
				<Li>
					<Heading tag="h4">Software / Frameworks:</Heading>
					<List>
						<Li>liblsl</Li>
						<Li>Flutter</Li>
						<Li>Flame</Li>
						<Li>Box2D / Flame Forge2D</Li>
						<Li>Xenomai</Li>
						<Li>Svelte</Li>
					</List>
				</Li>
				<Li
					><Heading tag="h4">Hardware:</Heading><List>
						<Li>iPads (participant UI / Game)</Li>
						<Li>Raspberry Pi</Li>
						<Li>Bela (CTAG, Beaglebone Black)</Li>
						<Li>16 Port Switch</Li>
						<Li>USB-C Ethernet adaptors</Li>
					</List>
				</Li>
				<Li
					><Heading tag="h4">Imaging / Data:</Heading><List>
						<Li>EEG, custom caps + hyperscanner platform</Li>
						<Li>EMG</Li>
						<Li>IMUs</Li>
						<Li>Photodiodes</Li>
						<Li>FSR sensors</Li></List
					>
				</Li>
			</List>
		</div>
	</section>
	<section>
		<P>With that done, let's start from the beginning.</P>
		<Heading tag="h2">What am I trying to do?</Heading>
		<P
			>I'm fascinated by group behaviour. We're all succeptible to social influence, and that comes
			from many different sources. Most of the time this is wanted and welcome, like when you ask an
			experienced friend advice on which tool is best suited for a task (e.g. for aspects of <A
				href={resolve('/_vault/sauna')}>building a sauna</A
			>, or a recommendation for some music you might like. This isn't always the case though, there
			are influences from media (social and traditional), advertising, and group pressure from
			extremist or high control organisations.
			<BoringReference
				bind:items
				item={createFootnote(
					'Hogg, M. A., Kruglanski, A., & van den Bos, K. (2013). Uncertainty and the Roots of Extremism. Journal of Social Issues, 69(3), 407–418. <a href="https://doi.org/10.1111/josi.12021" target="_blank" rel="noopener noreferrer">https://doi.org/10.1111/josi.12021</a>'
				)}
			/>
			In theory, we align with the members of the groups we belong, and there might even be other groups
			that we dislike or disagree with, but of course it's more complicated than that, our identities
			are not made up of a single group membership, rather a complex moire of a whole host of mutable
			and immutable characteristics, the environments we live and were raised in, and the experiences
			we have had.
		</P>
		<P>What, then is</P>
	</section>
</main>
<BoringBibliography bind:items />
