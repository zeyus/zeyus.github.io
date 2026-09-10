<script lang="ts">
	import { P, List, Li, A, Heading } from 'flowbite-svelte';
	import BoringReference from '$components/BoringReference.svelte';
	import BoringBibliography from '$components/BoringBibliography.svelte';
	import { createFootnote } from '$components/BoringReference.svelte';
	import { resolve } from '$app/paths';
	import { Toc } from '@svelte-put/toc';
	import EnhancedImg from '$components/EnhancedImg.svelte';

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
		<P class="border-l-4 border-primary-500 pl-4 text-lg italic"
			>TL;DR: I want to understand if we can identify group membership based on neural synchrony</P
		>
		<P
			>I'm fascinated by group behaviour<BoringReference
				bind:items
				item={createFootnote('I grew up in a cult, so make of that what you will.')}
			/>, especially what drives people to join or go along with the more extreme. Parallel to this,
			it is equally interesting to try and understand how to reach people, and how minds change<BoringReference
				bind:items
				item={createFootnote(
					'Not for evil, let us assume I mean changing your mind based on solid evidence, maybe just hold in your mind the example of climate change denial, where plenty of evidence exists, yet some people are unable to acknowledge that fact.'
				)}
			/>. We're all succeptible to social influence, and that comes from many different sources.
			Most of the time this is wanted and welcome, like when you ask an experienced friend advice on
			which tool is best suited for a task (e.g. for aspects of <A href={resolve('/_vault/sauna')}
				>building a sauna</A
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
			are not made up of a single group membership, rather a complex moiré of a whole host of mutable
			and immutable characteristics, the environments we live and were raised in, and the experiences
			we have had.
		</P>
		<P
			>The neural underpinnings of a lot of group social dynamics are not understood yet, in part
			because it's just plain difficult to do neuroimaging with groups of people. That is starting
			to change, with various portable EEG<BoringReference
				bind:items
				item={createFootnote(
					'EEG: Electroencephalography, a neuroimaging method that is a (with caveats) direct measure of cortical - or surface level - brain activity.'
				)}
			/>
			systems, including Ear-EEG, and semi-portable (at least you can move in it), and other neuroimaging
			techniques like OPM-MEG<BoringReference
				bind:items
				item={createFootnote(
					'MEG: Magnetoencephalography, a neuroimaging method that is a (with caveats as well) direct measure of cortical brain activity, it is not portable, because you basically sit inside a giant egg. The OPM part is "Optically Pumped Magnetometer", which is a type of sensor that is a bit more portable than traditional MEG.'
				)}
			/> and fNIRS<BoringReference
				bind:items
				item={createFootnote(
					'fNIRS: Functional Near-Infrared Spectroscopy, a neuroimaging method that measures changes in blood oxygenation in the brain, which is an indirect measure of neural activity (i.e. slower to update).'
				)}
			/>
			. But it's still early days and there's a lot left to learn, which makes it interesting, even if
			"nothing" is uncovered, that alone will say something interesting and point us in new directions.</P
		>
		<P
			>OK, so groups are interesting, there's the possibility of looking at the brain activity of
			people in groups, but what do we measure and what are we even looking for? Well, obviously,
			like most things, there is a plethora of options when it comes to what we can investigate, but
			there is something that has both intrigued and bothered me a little with the previous research
			in interactions, in particular, neural synchrony. For the group membership question, we have a
			huge amount of work to do before we can even consider addressing any of the more complex
			aspects of social interactions, so one place to start is what defines or makes a group on a
			neural level. Before coming around to neural synchrony, let me just briefly describe two of
			the known effects of group membership from social psychology and behavioural research. First,
			it takes next to nothing for us to feel like we are part of a group, established with the
			"minimal group paradigm"<BoringReference
				bind:items
				item={createFootnote(
					'Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C. (1971). Social categorization and intergroup behaviour. European Journal of Social Psychology, 1(2), 149–178. <a href="https://doi.org/10.1002/ejsp.2420010202" target="_blank" rel="noopener noreferrer">https://doi.org/10.1002/ejsp.2420010202</a>'
				)}
			/> which showed that just assigning people randomly to a group is enough for them to start <A
				href="https://en.wikipedia.org/wiki/In-group_and_out-group"
				>favouring others in their group, and showing bias against members of the other group</A
			>. Secondly, there is the interesting effect of
			<a href="https://en.wikipedia.org/wiki/Group_polarization">group polarization</a>, which is
			the tendency of a group to move towards a more extreme position than initially held by any
			individual member (for example after a discussion with the group). Both these things are
			relevant to my research, but are not what I am looking at directly.
		</P>
		<P
			>"But what does any of that have to do with neural synchrony?" I hear you scream as I digress
			into another tangent. Well, dear reader, neural synchrony is something that you can measure
			between two or more people, and (yet again) there are a fifty trillion approaches, but at its
			core you can think of it as do these two-or-more individuals show similar activity at the same
			time and/or place in their brain. Perhaps unsurprisingly, if you have two people, doing the
			exact same thing at the same time in the same room, you will see indications of neural
			synchrony<BoringReference
				bind:items
				item={createFootnote(
					'Schilbach, L., & Redcay, E. (2025). Synchrony Across Brains. Annual Review of Psychology, 76(1), 883–911. <a href="https://doi.org/10.1146/annurev-psych-080123-101149" target="_blank" rel="noopener noreferrer">https://doi.org/10.1146/annurev-psych-080123-101149</a>'
				)}
			/>. This can happen with or without interaction, meaning you can see synchrony with people who
			may not even be aware of the other people, or you can see synchrony when you look at people
			interacting with each other in an experiment.
		</P>
		<EnhancedImg
			image={{
				src: 'ps760883.f1.gif',
				alt: 'Figure depicting interactive vs non-interactive neural synchrony',
				title:
					'Interactive versus noninteractive neural synchrony. Figure from Schilbach & Redcay, 2025',
				extraImgClasses: 'invert-90'
			}}
		/>
	</section>

	<section>
		<Heading tag="h2">Footnotes & References</Heading>
		<BoringBibliography bind:items hline={false} />
	</section>
</main>
