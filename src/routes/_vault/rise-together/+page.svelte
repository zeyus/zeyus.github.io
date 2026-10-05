<script lang="ts">
	import { P, List, Li, A, Heading, Alert, Button } from 'flowbite-svelte';
	import BoringReference from '$components/BoringReference.svelte';
	import BoringBibliography from '$components/BoringBibliography.svelte';
	import { createFootnote } from '$components/BoringReference.svelte';
	import { resolve } from '$app/paths';
	import { Toc } from '@svelte-put/toc';
	import EnhancedImg from '$components/EnhancedImg.svelte';
	import Callout from '$components/Callout.svelte';
	import Details from '$components/Details.svelte';
	import Term from '$components/Term.svelte';
	import Ref from '$components/Ref.svelte';
	import WiringDiagram from '$components/rise-together/WiringDiagram.svelte';
	import TriggerPulseTimeline from '$components/rise-together/TriggerPulseTimeline.svelte';
	import TouchToPhoton from '$components/rise-together/TouchToPhoton.svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	const toc = new Toc({
		selector: ':where(h1, h2)',
		anchor: { position: 'append', content: '#' }
	});
	let items: Footnote[] = [];

	// matchMedia only exists in the browser, so start playback on mount instead of during SSR
	const autoplay = (video: HTMLVideoElement) => {
		if (!matchMedia('(prefers-reduced-motion: reduce)').matches) video.play().catch(() => {});
	};

	// show controls if not autoplay (reduced motion)
	const controls = (video: HTMLVideoElement) => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) video.controls = true;
	};

	const terms = {
		BOLD: 'Blood Oxygenation Level Dependent: a signal that is measured by fMRI and fNIRS, which is an indirect measure of neural activity. It is slower to update than direct measures of neural activity, because it measures changes in blood oxygenation in the brain which occur typically around 5 seconds after the activity.',
		Dart: 'A programming language developed by Google that can be run in many different places.',
		EEG: 'Electroencephalography: a neuroimaging method that is a (with caveats) direct measure of cortical - or surface level - brain activity. It uses electrodes on the scalp to collect the electrical activity produced by the brain.',
		'OPM-MEG':
			'Magnetoencephalography: a neuroimaging method that is a (with caveats as well) direct measure of cortical brain activity, traditional MEG is not portable, because you basically sit inside a giant egg. The OPM part is "Optically Pumped Magnetometer", a type of sensor that accommodates a more portable setup than traditional MEG.',
		Flame: 'Flame is a game engine written for Dart and Flutter.',
		Flutter:
			'A UI toolkit for building applications for mobile, web, and desktop from a single codebase.',
		fNIRS:
			'Functional Near-Infrared Spectroscopy: a neuroimaging method that measures changes in blood oxygenation in the brain, which is an indirect measure of neural activity (i.e. slower to update).',
		Hyperscanning:
			'The simultaneous measurement and recording of brain activity from two or more people at the same time.',
		EMG: 'Electromyography: a recording of the electrical activity that muscles produce when they contract.',
		IMU: 'Inertial Measurement Unit: a small sensor that measures movement and rotation, like the one that tells your phone which way up it is.',
		Amplifier:
			'The device the EEG electrodes plug into. It boosts the tiny electrical signals picked up at the scalp and turns them into numbers a computer can record.',
		Cortical: 'To do with the cortex, the outer layer of the brain.',
		Faraday:
			'Faraday cage: a room or enclosure lined with conductive material that blocks outside electromagnetic fields, so they do not show up in sensitive recordings.',
		Frame: 'One complete picture drawn on a screen. These iPads draw 120 of them a second.',
		Hz: 'Hertz: times per second. An EEG recording at 500 Hz takes 500 measurements every second.',
		Latency:
			'The delay between something happening and its result showing up, for example between touching a screen and the picture changing.',
		Naturalistic:
			'Closer to what people do in everyday life than a traditional, tightly controlled lab task.',
		Neuroimaging:
			'Any method of measuring the structure or activity of the brain, such as EEG or MRI.',
		OpenSource:
			'Software whose source code is published so that anyone can read, use and change it.',
		Paradigm:
			'An experimental paradigm is an established recipe for an experiment: the task, its conditions and how it is run, which other researchers can reuse.',
		Preregistration:
			'Publicly recording your hypotheses and analysis plan before collecting the data, so they cannot be changed afterwards to fit the results.',
		Stimulus:
			'Whatever a participant is presented with in an experiment, for example what is shown on their screen.',
		Subcortical: 'To do with the structures beneath the cortex, deeper inside the brain.',
		Synchrony:
			'Neural synchrony: when the brain activity of two or more people rises and falls together in time.',
		LSL: 'Lab Streaming Layer: software widely used in research labs to send data between devices over a network, with every sample timestamped on a shared clock.',
		Pi: 'Raspberry Pi: a small, cheap computer about the size of a credit card.',
		Coordinator:
			'The computer (a Raspberry Pi) that runs the experiment: it tells every iPad what to do and, when participants play together, works out where the ball and paddle are.',
		Bela: 'A small computer board built for reading sensors and audio with very little delay.',
		Bindings:
			'Glue code that lets a program written in one language use a library written in another.',
		XDF: 'Extensible Data Format: a file format for storing several streams of recorded data together with their timestamps.',
		Headless: 'Running without a screen attached.'
	};
</script>

<main use:toc.actions.root>
	<nav class="post-toc" aria-label="Table of contents">
		<span class="post-toc-label">$ grep '^##' rise-together</span>
		{#if toc.items.size}
			<ol>
				{#each toc.items.values() as tocItem (tocItem.id)}
					<li>
						<!-- svelte-ignore a11y_missing_attribute -->
						<a use:toc.actions.link={tocItem}>
							<!-- textContent injected by toc -->
						</a>
					</li>
				{/each}
			</ol>
		{/if}
	</nav>
	<section>
		<Heading tag="h2">Introduction</Heading>
		<P
			>Is a group something more than just a collection of individuals? What makes a group
			identifiable?</P
		>
		<P>Consider the following:</P>
		<Callout label="An example most contrived"
			><P>
				You're walking to a park at the end of a quiet street, on your way to meet two of your
				friends. Not too far from the park, the friends you are meeting appear from a side street
				and start walking and chatting with you. You look across the road, and realise that there is
				another group of three people walking towards the same park. Both your group, and the group
				across the street realise at the same time that you're all heading to the one small picnic
				table in the park. You and your friends start to walk a little faster, and so does the other
				group.</P
			>
		</Callout>
		<P
			>While the example is admittedly silly, I would like you to ask yourself: <em
				>As an observer, could you tell the difference between these two groups of people?</em
			>
			Let me be bold and assume that you most definitely could. Maybe we could even go further and say
			that you could still identify the two groups even if they were on the <em>same</em> side of the
			street, next to each other. This is something that is naturally easy to do, and it is something
			we do constantly.
		</P>
		<P>
			Leaving aside their negative connotations, the fact that the words "us" and "them" exist
			allows us to simply speak about a group we belong to and a group we don't. What is it that
			makes this an identity? In the example, the two sets of people aren't the same individuals,
			nor are they the same group. What do the people within the groups share, beyond the fact that
			they are individuals doing the same thing at the same time and place? There is something in
			our brain that recognises this, and it's something that I would love to understand better. And
			if a group is that easy to recognise from the outside, is there also something that the people
			on the inside share, something we could measure?
		</P>
		<P
			>To try and find some answers to this question, I've designed an experiment (<Ref
				to="feature-image"
			/>) that is run with a group of participants in two teams (groups of four so far, six in the
			current round, and up to ten planned). They play a videogame made specifically for this
			experiment in <Term def={terms.Flutter}>Flutter</Term>, <Term def={terms.Flame}>Flame</Term>
			and <Term def={terms.Dart}>Dart</Term> (<a href="#try-rise-together">[TRY IT]</a>). The
			experiment setup allows us to collect behavioural data about how participants play the game,
			how they collaborate with their teammates and their performance. We are also collecting brain
			data, muscle data, and some movement data!</P
		>
		<Callout label="&quot;THIS POST IS LONG&quot;">
			<P
				>Sure, I understand. I hope there's something for everyone. Each section will have a <strong
					>[TL;DR] (too long, didn't read)</strong
				>
				summary, and more details are hidden under the optional
				<span class="text-accent">[CONTEXT]</span> sections for those who are interested.</P
			>
		</Callout>
		<P>
			So, with that, let's get to it. If you want to know about the experiment and idea, just keep
			reading, if timing and <Term def={terms.Latency}>latency</Term> is your jam, you can jump straight
			to
			<a href="#time-is-an-illusion-lunchtime-doubly-so"
				>Time is an illusion. Lunchtime doubly so.</a
			>, and if you're more interested in the <Term def={terms.Flutter}>Flutter</Term> and <Term
				def={terms.Dart}>Dart</Term
			> aspects, you can see
			<a href="#building-the-tools">Building the tools</a>
			and
			<a href="#my-thoughts-on-flutter-as-a-research-tool"
				>My thoughts on Flutter as a Research Tool</a
			>.
		</P>
	</section>
	<section>
		<Heading tag="h2">What am I trying to do?</Heading>
		<Callout label="TL;DR">
			<P
				>I want to understand if we can find some marker of group identity in the brain using a
				purpose-built experimental setup. The marker I'm looking for is whether the brain activity
				of people in the same group lines up in time: <Term def={terms.Synchrony}
					>neural synchrony</Term
				>.</P
			>
		</Callout>
		<P
			>Considering I grew up in a cult (the kind of situation that places high importance on group
			identity), it's little wonder I'm fascinated by group behaviour, especially what drives people
			to join groups and go along with the more extreme. Parallel to this, it is equally interesting
			to try and understand how to reach people, and how minds change.<BoringReference
				bind:items
				item={createFootnote(
					'Not for evil, let us assume I mean changing your mind based on solid evidence, maybe just hold in your mind the example of climate change denial, where plenty of evidence exists, yet some people are unable to acknowledge that fact.'
				)}
			/> We're all susceptible to social influence, and that comes from many different sources. Most of
			the time this is wanted and welcome, like when you ask an experienced friend advice on which tool
			is best suited for a task (e.g. for aspects of <A href={resolve('/_vault/sauna')}
				>building a sauna</A
			>), or a recommendation for some music you might like. This isn't always the case though,
			there are also negative or unwanted influences from media (social and traditional),
			advertising, and group pressure from extremist or high control organisations.<BoringReference
				bind:items
				item={createFootnote(
					'Hogg, M. A., Kruglanski, A., & van den Bos, K. (2013). Uncertainty and the Roots of Extremism. Journal of Social Issues, 69(3), 407–418. <a href="https://doi.org/10.1111/josi.12021" target="_blank" rel="noopener noreferrer">https://doi.org/10.1111/josi.12021</a>'
				)}
			/>
			In theory, we align with the members of the groups we belong to, and there might even be other groups
			that we dislike or disagree with, but of course it's more complicated than that, our identities
			are not made up of a single group membership, rather a complex moiré of a whole host of mutable
			and immutable characteristics, the environments we live and were raised in, and the experiences
			we have had.
		</P>
		<EnhancedImg
			image={{
				src: 'concert.webp',
				alt: 'A concert with the musicians on stage and a large crowd in front.',
				title:
					'A performance is a great example of different types of identity and synchrony. Both for the audience and the performers.'
			}}
		/>
		<P
			>All of these experiences and influences happen in our brains, individually and collectively,
			and naturally, as a cognitive scientist, the brain is where I want to look. Yet, the neural
			underpinnings (meaning, where and which processes happening in the brain) for a lot of group
			social dynamics are still not understood, in part because it's just plain difficult to do
			<Term def={terms.Neuroimaging}>neuroimaging</Term> with groups of people. Portable brain imaging
			is only now making this possible. It's still early days and there's a lot left to learn, which is
			exactly what makes this kind of work worth doing. At the end of the day, even if "nothing" is uncovered,
			that itself will say something interesting and point us in new directions.</P
		>
		<P
			>While my experiment is not going to answer the larger social questions I'm interested in, it
			is a small first step towards understanding how group identity is reflected in the brain. I
			mention these broader interests to explain some of my motivation, and the experiment is my way
			of paving the way for future research.
		</P>
		<Details label="CONTEXT" title="A brief tour of portable brain imaging">
			<P
				>There are many different ways to measure brain activity, and each has its own strengths and
				weaknesses. A lot of methods have been difficult to use in group situations or outside of a
				lab because of the size of the equipment or special environments needed, for example some
				require a <Term def={terms.Faraday}>Faraday cage</Term> to prevent electromagnetic noise and interference
				in recordings. Some examples of neuroimaging techniques that have at least some portability are
				<Term def={terms.EEG}>EEG</Term>, which is a direct measure of <Term def={terms.Cortical}
					>cortical</Term
				> activity, and can record at a high frequency (500+
				<Term def={terms.Hz}>Hz</Term>); <Term def={terms['OPM-MEG']}>OPM-MEG</Term>, a direct
				measure of cortical and
				<Term def={terms.Subcortical}>subcortical</Term> activity, it does require a special environment,
				and is expensive; and
				<Term def={terms.fNIRS}>fNIRS</Term>, an indirect measure of cortical activity, indirect
				because it measures the <Term def={terms.BOLD}>BOLD</Term> signal which peaks after about a 5
				second delay,<BoringReference
					bind:items
					item={createFootnote(
						'Glover, G. H. (1999). Deconvolution of Impulse Response in Event-Related BOLD fMRI. NeuroImage, 9(4), 416–429. <a href="https://doi.org/10.1006/nimg.1998.0419" target="_blank" rel="noopener noreferrer">https://doi.org/10.1006/nimg.1998.0419</a>'
					)}
				/> and at the moment it is an expensive method, making it less accessible to study groups. For
				me, the choice of EEG was clear, not to mention that we have a super awesome group EEG lab at
				Aarhus University.
			</P>
		</Details>
	</section>

	<section>
		<Heading tag="h2">So, about that synchrony?</Heading>
		<Callout label="TL;DR">
			<P
				>Synchrony between brains can be found when people do the same thing at the same time and
				place. The level of synchrony can be affected by the relationship that those people have,
				but it sure is difficult to tease apart all the factors contributing to <Term
					def={terms.Synchrony}>neural synchrony</Term
				>. A lot of progress has been made in this area over the last few years.</P
			>
		</Callout>
		<P
			>Since group identity is interesting, and it is possible to look at the brain activity of
			people in groups, we need to establish what to measure and what we are looking for. Obviously,
			like most things, there are a plethora of options when it comes to what we can look into, but
			there is one potentially promising avenue for this line of investigation: <em
				>neural synchrony</em
			>. Promising, because neural synchrony is something that has been shown to arise between
			(usually only pairs of) people, who are either doing the same thing, or, interacting with each
			other, and the level of this synchrony can even be affected by the relationship between those
			people.<BoringReference
				bind:items
				item={createFootnote(
					'Schilbach, L., & Redcay, E. (2025). Synchrony Across Brains. Annual Review of Psychology, 76(1), 883–911. <a href="https://doi.org/10.1146/annurev-psych-080123-101149" target="_blank" rel="noopener noreferrer">https://doi.org/10.1146/annurev-psych-080123-101149</a>'
				)}
			/> At its core you can think of neural synchrony as measuring if
			<em
				>two-or-more individuals show similar activity at the same time and/or place in their brain</em
			>. Perhaps unsurprisingly, if you have two people, doing the exact same thing at the same time
			in the same room, you will see indications of neural synchrony, but what is more surprising is
			that there is evidence that two people collaborating will show more synchrony than two people
			doing different things, or competing against each other (see
			<Ref to="ins" />).<BoringReference
				bind:items
				item={createFootnote(
					'Czeszumski, A., Liang, S. H.-Y., Dikker, S., König, P., Lee, C.-P., Koole, S. L., & Kelsen, B. (2022). Cooperative Behavior Evokes Interbrain Synchrony in the Prefrontal and Temporoparietal Cortex: A Systematic Review and Meta-Analysis of fNIRS Hyperscanning Studies. Eneuro, 9(2), ENEURO.0268-21.2022. <a href="https://doi.org/10.1523/ENEURO.0268-21.2022" target="_blank" rel="noopener noreferrer">https://doi.org/10.1523/ENEURO.0268-21.2022</a>'
				)}
			/>&nbsp;<BoringReference
				bind:items
				item={createFootnote(
					'Susnoschi Luca, I., Putri, F. D., Ding, H., & Vuckovič, A. (2021). Brain Synchrony in Competition and Collaboration During Multiuser Neurofeedback-Based Gaming. Frontiers in Neuroergonomics, 2. <a href="https://www.frontiersin.org/articles/10.3389/fnrgo.2021.749009" target="_blank" rel="noopener noreferrer">https://www.frontiersin.org/articles/10.3389/fnrgo.2021.749009</a>'
				)}
			/>
		</P>
		<EnhancedImg
			figId="ins"
			image={{
				src: 'ps760883.f1.webp',
				alt: 'Figure depicting interactive vs non-interactive neural synchrony, interactive neural synchrony is two people interacting with each other, whereas the non-interactive version in the figure is called "neural similarity" which is illustrated with 3 participants looking at individual screens with a divider between them so they are not aware of the other participants.',
				title:
					'Interactive versus noninteractive neural synchrony. Figure from Schilbach & Redcay, 2025',
				extraImgClasses: 'invert-90'
			}}
		/>
		<P
			>Imagine if we recorded the brain activity of everyone in a train carriage on their daily
			commute to work, they are all individuals, but at the same time, they will belong to a
			multitude of different groups. If we found the same level of neural synchrony between all of
			the people in that carriage, there are so many possible explanations that it would be
			difficult to make any claims about what that synchrony means. That said, you absolutely can
			find neural synchrony in larger groups of people when you ask them to do something together at
			the same time in the same setting.<BoringReference
				bind:items
				item={createFootnote(
					'Zamm, A., Kappel, S. L., Demos, A. P., Debener, S., & Konvalinka, I. (2026). The Tapping Orchestra: A 10-Person Platform for Measuring Behavioral & Neural Synchrony During Group Interaction (Version 01). Zenodo. <a href="https://doi.org/10.5281/ZENODO.19371498" target="_blank" rel="noopener noreferrer">https://doi.org/10.5281/ZENODO.19371498</a>'
				)}
			/> This makes a lot of sense, and we naturally do things like falling into step when we walk with
			someone, mirroring people's gestures, and so on.
		</P>
		<P>
			This synchrony arises from some combination of "shared <Term def={terms.Stimulus}
				>stimulus</Term
			>", "shared action", and "shared attention". In order to get a little further towards the
			understanding if there is such a thing as "this is your brain in a group", there has to be a
			way to pull apart some of the contributing factors. Maybe then, whatever is left, might be
			some kind of indication of a "group identity" signal, and that would be fascinating. This is
			something that should not be able to be explained away <em>only</em> by people doing the same thing
			at the same time in the same place.
		</P>
		<Callout label="THIS MIGHT BAKE YOUR NOODLE">
			<EnhancedImg
				image={{
					src: 'bakingnoodles.webp',
					alt: 'The Oracle from The Matrix, smiling in her green-tiled kitchen with an oven mitt on, standing at the stove.',
					title:
						'Baking noodles (cookies) with The Oracle. From The Matrix © Warner Bros. Entertainment Inc. 1999'
				}}
			/>
			<P
				>Our brains respond to input from the environment, this happens on different levels,
				including higher levels like how we feel about being where we are, if we like the
				aesthetics, but also on much lower levels &mdash; like our eyes responding to the light in
				the room. Is there a point, somewhere along the line from pure sensory input to higher level
				cognition where we can say "this synchrony is because of a shared identity, bond, goal,
				relationship" and not just from a mutual environment and/or culture? <Term
					def={terms.Hyperscanning}>Hyperscanning</Term
				>, the recording of brain activity from two or more people at the same time, is the tool
				designed specifically to address these kinds of questions, by looking at people in
				interaction.
				<BoringReference
					bind:items
					item={createFootnote(
						'Wheatley, T., Thornton, M. A., Stolk, A., & Chang, L. J. (2024). The Emerging Science of Interacting Minds. Perspectives on Psychological Science, 19(2), 355–373. <a href="https://doi.org/10.1177/17456916231200177" target="_blank" rel="noopener noreferrer">https://doi.org/10.1177/17456916231200177</a>'
					)}
				/>
			</P>
		</Callout>
		<P
			>Part of the problem is that hyperscanning is complex, there are a lot of moving parts, and
			the majority of <Term def={terms.Paradigm}>experimental paradigms</Term> that are around do not
			really work at a group level. So, the options were to give up, or to build my own experiment and
			the tools around it. Luckily, one of my supervisors is from the <A
				href="https://ece.au.dk/en/research/research-centres/center-for-ear-eeg/"
				>Center for Ear-EEG</A
			> at Aarhus University, and they have developed an <Term def={terms.EEG}>EEG</Term> hyperscanning
			platform that uses super cool custom <Term def={terms.EEG}>EEG</Term>
			<Term def={terms.Amplifier}>amplifiers</Term> in a space that can record up to 10 people at the
			same time. All of that is huge, but it's one step towards having a working experiment.
		</P>
		<P
			>So I have access to a hi-tech setup to collect the data, and it's <Term def={terms.EEG}
				>EEG</Term
			>, so we can use it for real-time interactions, but how can we have people in groups and
			compare them? Let's see if we can bring these things together&hellip;</P
		>
		<Details label="CONTEXT" title="Signal, noise, EEG, Experiments">
			<P>
				<Term def={terms.EEG}>EEG</Term> can be very sensitive to electromagnetic noise. The noise can
				be from the environment, like electricity cables too close to the EEG equipment, but even muscle
				movements, especially around the face can be a source of noise in a recording. So this effectively
				means that any kind of experiment that would involve a lot of talking (a conversation), or lots
				of movement (a ball game), would be &mdash; even if possible in theory &mdash; more difficult
				to get good, clean data from.</P
			>

			<P
				>All of these requirements make the whole setup more and more specific, and nothing that
				already existed offered a good way to try and isolate some of the contributing factors to
				any observed neural synchrony.</P
			>
		</Details>
	</section>
	<section>
		<Heading tag="h2" class="block w-full">The experiment</Heading>
		<Callout label="TL;DR">
			<P
				>Participants are assigned to two teams, and they play a game where they have to work
				together to lift a ball with a paddle, while the other team is trying to do the same. This
				gives us people in the same environment with the same <Term def={terms.Stimulus}
					>stimulus</Term
				>, but differing by which group (team) they belong to.</P
			>
		</Callout>

		<EnhancedImg
			figClass="w-full my-0 p-0 md:w-1/3 md:pl-4 md:mb-4 float-right floating"
			image={{
				src: 'rise-together.webp',
				alt: 'Screenshot of the Rise Together game, showing a ball being lifted by a paddle.',
				title: 'Rise Together game screenshot'
			}}
		/>
		<P
			>To get at this group identity idea, I knew I wanted to look at real-time interactions, and
			something like a videogame seemed like a good idea, as long as it was simple to play and could
			have sub-groups of players (teams!). Taking some inspiration from the field of joint action
			(the study of how people coordinate what they do with each other),<BoringReference
				bind:items
				item={createFootnote(
					'Vesper, C., Butterfill, S., Knoblich, G., & Sebanz, N. (2010). A minimal architecture for joint action. Neural Networks, 23(8–9), 998–1003. <a href="https://doi.org/10.1016/j.neunet.2010.06.002" target="_blank" rel="noopener noreferrer">https://doi.org/10.1016/j.neunet.2010.06.002</a>'
				)}
			/>
			I figured that a task where people work together is a good start, but there should also be competition.
			This duality of cooperation and competition happens a lot in daily life, sports and other games,
			and it is one way to have people working together, and at the same time competing against another
			team. This all led me to design and iteratively work on a game where people work together to lift
			a ball using a paddle, while they are doing that the other team is trying to do the same thing,
			and whoever gets furthest, wins. There are only two buttons, one to lift the paddle on the left
			side, and one to lift the paddle on the right side, but the ball and game are physics based so it
			is deceptively difficult.
		</P>

		<Callout label="WHY A GAME?">
			<P
				>Why choose a videogame for the experiment? Well the main reasons are that it is a more <Term
					def={terms.Naturalistic}>naturalistic</Term
				> task, it's hopefully more fun for participants, the interactions are real-time and it is still
				something that can be controlled and repeated. It's not all upsides though, the complexity increases
				the difficulty of analyses, and while a lot can be controlled, there's a lot more happening in
				the game and between the participants than in a more simple lab experiment (see <A
					href="#rich-dataset">[CONTEXT] A rich dataset</A
				>).
			</P>
		</Callout>

		<P>
			While there's a lot going on in the game and the experiment, the nice part for my avenue of
			research is how much of it is shared. Everyone is in the same room, playing the same game,
			pressing the same two buttons and looking at an almost identical screen, which takes care of a
			lot of the shared <Term def={terms.Stimulus}>stimulus</Term>, shared action and shared
			attention from earlier. The main difference is which people are in a team together. What this
			allows is for us to look at the level of
			<Term def={terms.Synchrony}>neural synchrony</Term> for the participants that are on the same team,
			and compare that to the level of synchrony for participants that are on different teams.
		</P>
		<P>
			There are two key things to note here. First, the participants are told which team they are
			on, and they know who their teammates are (see
			<a href="#one-of-us">[ONE OF US]</a>
			below for why this should be enough). Second, the teams change throughout the experiment, so the
			same two people will be teammates at one point and opponents at another. This is important to be
			able to make the comparison with the same people but belonging to different groups.
		</P>
		<Callout id="one-of-us" label="ONE OF US"
			><P
				>It takes next to nothing for us to feel like we are part of a group. This was established
				with the "minimal group paradigm",<BoringReference
					bind:items
					item={createFootnote(
						'Tajfel, H., Billig, M. G., Bundy, R. P., & Flament, C. (1971). Social categorization and intergroup behaviour. European Journal of Social Psychology, 1(2), 149–178. <a href="https://doi.org/10.1002/ejsp.2420010202" target="_blank" rel="noopener noreferrer">https://doi.org/10.1002/ejsp.2420010202</a>'
					)}
				/> which showed that just assigning people randomly to a group is enough for them to start <A
					href="https://en.wikipedia.org/wiki/In-group_and_out-group"
					>favouring others in their group, and showing bias against members of the other group</A
				>. Based on this effect, assigning people to teams in the group and making sure they know
				which team they are on is enough to start seeing differences between the two teams, and this
				is exactly what I am hoping for.</P
			></Callout
		>
		<P>
			Not every part of the experiment is a team game. In some trials each participant plays on
			their own at the same time, which means we can see how they perform by themselves and they get
			time to practice, and there are other tasks where everyone in the room is doing and seeing the
			same thing &mdash; this is what can be used as a baseline measure of synchrony.
		</P>
		<P>
			So, the prediction: if there is such a thing as a "group identity" synchrony for people
			collaborating, then we would expect that during the game, when teammates have to actively
			collaborate, we will see more synchrony between teammates than between people on different
			teams, and we would also expect this to be higher than the baseline measure.
		</P>
		<P>
			How do you put a number on synchrony? One measure I'll be looking at is inter-subject
			correlation: take the recordings from two or more people and ask how closely the ups and downs
			of one follow the ups and downs of the other. I will also look at whether the rhythms in two
			brains keep in step with each other (phase-locked synchrony).
		</P>
		<P>
			One caveat: this study is not <Term def={terms.Preregistration}>preregistered</Term>. It is a
			huge undertaking built on bespoke tools, and a lot of what comes out of it is going to be
			validation: showing that group level
			<Term def={terms.Hyperscanning}>hyperscanning</Term> research like this can be done at all. For
			the basic overview, I'll leave it at that, and take a look again at
			<Ref to="feature-image" /> to see the actual setup in the lab.
		</P>

		<Callout label="TRY IT" id="try-rise-together">
			<Alert color="secondary" rounded={true} border={true} class="my-4 w-full bg-secondary-900/20"
				><div class="flex items-center gap-3">
					<InfoCircleSolid class="h-5 w-5" /><span class="sr-only">Info</span>
					<P class="text-lg font-bold">Are you in Aarhus?</P>
				</div>
				<P
					>If you are in Aarhus and would like to participate in the experiment, <A
						href="https://me.zys.im/">get in touch</A
					>, and <strong class="italic">please, don't try the game beforehand.</strong></P
				></Alert
			>
			<P>
				Would you like to try the game out? I have a more game-like version that you can play in
				your browser:
			</P>
			<div class="flex flex-row items-center justify-center">
				<Button
					color="primary"
					href="https://rt-lobby.nexusdynamic.org/"
					target="_blank"
					rel="noopener noreferrer"
					class="mt-0 mb-4 w-full md:w-1/2"
					>Rise Together game edition
				</Button>
			</div>
			<P>
				The coolest thing about this is that the web version of the game is essentially the same
				codebase as the version used on the iPads in the experiment. There are some differences, but
				only because the version of the code I run in the lab has a lot of data collection and
				low-level networking code that is not required for the web (and the other stand-alone
				versions of the game).
			</P>
		</Callout>
		<Details label="CONTEXT" title="A rich dataset" id="rich-dataset">
			<EnhancedImg
				image={{
					src: 'hyprview.webp',
					alt: 'A screenshot of an application showing a plot of recorded EEG signal from a participant in a pilot experiment',
					title: 'Plot of recorded EEG signal from a participant in a pilot experiment'
				}}
			/>
			<P>
				One of the best things about this experiment is that, because it is a more <Term
					def={terms.Naturalistic}>naturalistic</Term
				>
				task, the data is rich and complex. Of course this makes it a bit more difficult to analyse, but
				that is absolutely a worthwhile tradeoff. We will have <Term def={terms.EEG}>EEG</Term>, <Term
					def={terms.EMG}>EMG</Term
				>, <Term def={terms.IMU}>IMU</Term>, behavioural data and survey responses. These will all
				aid in trying to answer the questions I'm asking of the data, but it is also going to be a
				great tool for other researchers to investigate and for use in teaching. The data will be
				made available in an open format, and the code for the experiment will be made available as
				<Term def={terms.OpenSource}>open source</Term>.
			</P>
			<P>
				The EMG data is collected from participants' thumbs, and can be correlated with the button
				presses in the game, this is useful for validation and helping to clean up the EEG data, but
				also can be used to investigate when participants are preparing to press a button. The IMU
				data is collected from their chair, and again, is useful for cleaning up EEG data if the
				participants move too much, and beyond that, we can look at specific moments in the game and
				see if participants move in similar ways.</P
			>
		</Details>
	</section>

	<section>
		<Heading tag="h2">Building the tools</Heading>
		<Callout label="TL;DR">
			<P
				>There were no off-the-shelf tools for this experiment, so I built my own. This includes
				some lower-level libraries as well as some hardware setups. The majority of the setup runs
				with <Term def={terms.Flutter}>Flutter</Term> and <Term def={terms.Dart}>Dart</Term>.</P
			>
		</Callout>
		<P
			>Comparing what several brains did at the same moment only works if every device in the room
			agrees on what happened and when, which is why the rest of this post is mostly engineering.
			So, in a very short time I had a very basic prototype of the game for one player using <A
				href="https://flame-engine.org/">Flame</A
			>, but really, that was the easy part. If I want to run an experiment with 4, 6 or 10
			participants, each with their own iPad, interacting in real-time, then there needed to be a
			lot more work put in. In fact, this whole thing turned out to be extremely complex in the end
			(see: <Ref to="wiring-diagram" />; did I learn my lesson? Absolutely not).</P
		>
		<P
			>The short version of where it ended up: one small computer, a <Term def={terms.Pi}
				>Raspberry Pi</Term
			>, acts as the <Term def={terms.Coordinator}>coordinator</Term>. When participants play
			together, the coordinator does all of the physics calculations and the iPads update their
			displays to match what it tells them. In the other direction, the iPads send an event whenever
			a participant touches one of the buttons, and the coordinator updates the game state based on
			that. The iPads run the same game, so when participants play on their own, each iPad does its
			own physics. With all the pieces together, the game runs very nicely on a Raspberry Pi 5, and
			has no problem having 10 participants in a game during testing.</P
		>

		<Heading tag="h3" class="block w-full">Back to basics</Heading>
		<P
			>Before we can discuss all the complexities, let me just explain some of the steps preceding
			all of this. Open science, open data, <Term def={terms.OpenSource}>open source</Term> and reproducibility
			are very important to me. This is what led me to use <Term def={terms.Flame}>Flame</Term>, <Term
				def={terms.Flutter}>Flutter</Term
			> and <Term def={terms.Dart}>Dart</Term> for the experiment. My idea was, not only could I make
			a functional and interesting experiment, but all of the work I had done could be made publicly available,
			and, because Flutter runs on all kinds of different platforms, my experiment could potentially be
			run "off-the-shelf", in different labs with different equipment.
		</P>
		<Callout label="WHY OPEN SCIENCE MATTERS">
			<P>
				Maybe you have heard of the
				<A href="https://en.wikipedia.org/wiki/Replication_crisis">replication crisis</A> in psychology,
				if not, there has been a lot of discussion about scientific studies in the field of psychology
				reporting results, and then when another researcher tries to perform the same experiment, their
				results are very different from the original.
			</P>
			<P>
				This can have a huge impact, not just within the field itself, but also to the general
				public. Often press releases and news articles will report findings ("Scientists find that
				going to church makes you live forever!") and the people writing the articles &mdash;
				completely understandably &mdash; are not researchers themselves, and cannot critically
				evaluate the way the research was done. If a subsequent study cannot replicate the results,
				or the paper is retracted, this will get much less media attention and people will still
				remember the original claim.
			</P>
			<P>
				Thankfully, there has been a concerted effort to improve the situation. Things like study
				<Term def={terms.Preregistration}>preregistration</Term>, open data and open source code are
				all ways to improve the situation. Still, there are gaps, and of course there are cases
				where specialised equipment is needed, and a lot of researchers are not software engineers,
				so adapting tools to their needs and equipment is not always an easy process.
			</P>
		</Callout>
		<P
			>Even though there are tools out there, like <A href="https://psychopy.org/">PsychoPy</A> for building
			experiments, they are not made in a way that scales easily to real-time interactions, are not set
			up to run a game engine, and most importantly, don't support group level multimodal data collection
			(recording several kinds of data at once). So if I would have to basically build my own tooling
			for the experiment anyway, why not use something that is cross-platform instead of trying to adapt
			an existing tool in ways that weren't intended (ha!). Maybe it would have been easier to try and
			force something like PsychoPy to do what I wanted, but maybe not, and I am sure I would have been
			less happy with the result.
		</P>
		<Heading tag="h3" class="block w-full">Networking</Heading>
		<P
			>If I want to make something that will run on normal devices (e.g. the iPads), then the game
			is going to have to run over the network. Some other solution like serial interfaces or
			special peripherals defeats the purpose of trying to make an experiment that can be reproduced
			flexibly. Sure, there are different tools out there for network communication, but the thing
			here is what you want from a normal game is different to what you want from something that is
			research oriented.
		</P>
		<P
			>Enter <Term def={terms.LSL}>LSL</Term>, or Lab Streaming Layer. LSL is a network data
			streaming library that is designed for research, and for my use case, the most attractive
			feature is that it has a built-in, high-precision clock synchronisation and timestamping
			system. This is ideal, and it is already used for this exact purpose in a lot of research labs
			and equipment.<BoringReference
				bind:items
				item={createFootnote(
					'Check out the LSL website, you can see over 130 devices and integrations that use LSL <a href="https://labstreaminglayer.org/" target="_blank" rel="noopener noreferrer">https://labstreaminglayer.org/</a>'
				)}
			/> LSL is a C++ library, and while there are some <Term def={terms.Bindings}>bindings</Term> for
			other languages, there were none for Dart, so I had to make my own (more on that below). But after
			messing around with LSL and trying different things with the game and network setup, I realised
			that I could actually use LSL for all the game communication. This is a little bit of an unusual
			application of LSL, but it definitely has advantages in a research setting.
		</P>
		<P>
			On the hardware side of networking, I wanted to keep everything in a closed network. This
			didn't require much more than a switch, some ethernet adapters for the iPads and a Raspberry
			Pi (for routing and device discovery). One thing about this setup that has been a little bit
			annoying is that iPads require constantly connecting to the internet to verify developer
			certificates, which added some extra work with routing, and added an extra step during the
			experiment setup - I have to always disable WiFi.
		</P>

		<Heading tag="h3" class="block w-full">Dart, Flutter and Flame</Heading>
		<P>
			Back to those missing LSL bindings. I really wanted to see if LSL would work for the
			experiment's data, so I ended up using the Dart FFI (Foreign Function Interface) and build
			hooks to create a very basic LSL binding for Dart. Throughout the course of the experiment, I
			have kept improving the library and it's now completely at parity with the C++ library. What
			this means is that anybody can use the library to add LSL to their Dart or Flutter project,
			with one exception: the library will not run in a web browser. It just requires lower-level
			access to network hardware than a browser has, or should have (more on that in the
			<A href="#coordination">[CONTEXT] Layers of coordination</A> section).
		</P>
		<P
			>By the way, did you see that cool plot in <A href="#rich-dataset">[CONTEXT] A rich dataset</A
			>? No? why not click that link and have a quick look. That app was built in Flutter as well,
			and can be connected via USB Serial directly to the EEG
			<Term def={terms.Amplifier}>amplifiers</Term>. What does that mean? It means from your phone
			you can just plug in the USB cable and see live data from the
			<Term def={terms.EEG}>EEG</Term>, <Term def={terms.EMG}>EMG</Term>
			and <Term def={terms.IMU}>IMU</Term>, and when we're preparing participants for the
			experiment, we can make sure the signal quality is good before we start. Oh, <A
				href="https://nexusdynamic.org/liblsl.dart/lsl_viewer/">it also works as a web app</A
			> so you can view and read <Term def={terms.XDF}>XDF</Term> files or connect to a serial device
			directly from your browser (or download and install an app version).</P
		>
		<Callout label="LIBLSL DART PACKAGE AND PAPER">
			<P>
				As part of this work, I have created a Dart package for LSL, and I have written a paper
				describing the package and the work that went into it. The paper is available in <A
					href="https://joss.theoj.org/papers/10.21105/joss.10425"
					>The Journal of Open Source Software</A
				> and the package is available on <A href="https://pub.dev/packages/liblsl">pub.dev</A>.
			</P>
		</Callout>
		<P>
			Finally, for the game engine, I used <A href="https://flame-engine.org/">Flame</A>, which is a
			game engine built on top of Flutter. Flame is really nice, it's easy to get something running,
			and it has the ability to integrate the <A href="https://box2d.org/">Box2D</A> physics engine via
			<A href="https://pub.dev/packages/flame_forge2d">flame_forge2d</A>. The important part here is
			that Box2D physics are <em>deterministic</em>: from the same starting point and the same
			button presses, the same thing happens every time (as long as the hardware is the same, and
			newer versions of Box2D have gone a long way towards making that true across platforms too).
			When participants play together the coordinator is the single authority on where the ball is,
			but when they play on their own each iPad runs its own physics. Imagine if the game behaved
			slightly differently from one participant to the next, that would break the experiment.
		</P>

		<Heading tag="h3" class="block w-full">Coordinating everything</Heading>
		<P
			>Take a look at <Ref to="wiring-diagram" /> to see how all the different devices in the experiment
			fit together. There's a lot going on there, and soon into getting the experiment working on two
			devices, I realised that I had to have some way to coordinate everything. By that I mean, things
			like starting the experiment, logging the data, starting streams for data and physics, etc. Each
			of the iPads must be in the same state, and not have to rely on a participant doing something. At
			the same time, it became more and more important that I could do things like restart the experiment
			or skip a trial. I know that sounds quite simple, but the more devices you have, the more chances
			there are for one device to arrive late, or miss a message, which could break the entire experiment.
		</P>
		<WiringDiagram />
		<P
			>So to that end, I built on top of LSL a coordination library, with the entire goal of
			abstracting away a lot of the complexities of setting up pairs of streams, and starting and
			stopping them. I'm not going to go into a lot of detail about it, but this is something that
			saved me a lot of time, and also helps prevent some bugs that might happen from having to
			duplicate things everywhere.</P
		>
		<Details label="CONTEXT" title="Layers of Coordination" id="coordination">
			<P
				>With the amount of data being sent around the network, I figured that it was important to
				prioritise which information was needed, that's also why I wanted to make sure it was a
				closed network with no internet traffic or traffic from other devices besides the ones
				participating in the experiment.</P
			>
			<P
				>The end result is that we have the coordination messages running and polling at about 10
				<Term def={terms.Hz}>Hz</Term>
				throughout the entire experiment. This is to tell all of the iPads to move to the next step in
				the experiment, and also for the iPads to tell the coordinator that they have finished creating
				the stream they were asked to. Basically an "experiment administration" layer. Then we have two
				additional streams that run during gameplay only, and are at 120 Hz:
				<em>physics updates</em>
				which are sent from the coordinator and all iPads subscribe to them, and
				<em>game events</em> which are sent by each iPad, and the coordinator listens to each of them,
				and polls them for new messages - the polling is at 120 Hz, but messages are sent only if there's
				a need. In the end the physics stream is the most busy, because the ball or paddle is usually
				moving.</P
			>
			<P>
				The heavy lifting of the network communication is done with LSL, but because LSL was never
				designed to be a "game networking" library, it required me to make that coordination
				library. One of the main selling points of LSL is its excellent handling of timing, but the
				by-product of that is LSL is not natively compatible with becoming a web application (not
				even via WASM, I tried...), so once I'd got my coordination library running, I realised that
				the concept could extend to any protocol, and with a little bit of work, I managed to get a
				WebRTC and WebSockets version of the coordination library running. This ended up essentially
				being "Web LSL", but I'm not going to make any claims about how it performs compared with
				LSL or how accurate the timing is, but in principle, it does the same things, and it's what
				I used for the "game edition" of the Rise Together game that you can try in your browser.
				The coordination library <A href="https://pub.dev/packages/peer_coordinator"
					>peer_coordinator</A
				> is available on pub.dev, along with <A href="https://pub.dev/packages/liblsl_coordinator"
					>liblsl_coordinator</A
				>, <A href="https://pub.dev/packages/webrtc_coordinator">webrtc_coordinator</A> and <A
					href="https://pub.dev/packages/webrtc_coordinator_flutter">webrtc_coordinator_flutter</A
				> which are the specific implementations for the different protocols.
			</P>
		</Details>
		<Details label="CONTEXT" title="Packages developed along the way">
			<P>
				While liblsl is at the core of everything that this experiment runs on, there were quite a
				few other tools I built along the way to help me (and others) out. The coordination library
				and backends mentioned in
				<A href="#coordination">[CONTEXT] Layers of Coordination</A> are some of these, but here are some
				of the others.
			</P>
			<List>
				<Li>
					<A href="https://pub.dev/packages/flutter_multicast_lock">flutter_multicast_lock</A> - a tool
					to help with multicast networking on Android devices, which is required for LSL to work properly.
				</Li>
				<Li>
					<A href="https://pub.dev/packages/easy_shared_preferences">easy_shared_preferences</A> - an
					easy to use, type-safe wrapper for Flutter's shared_preferences package, which is used for storing
					simple key-value pairs on the device.
				</Li>
				<Li>
					<A href="https://pub.dev/packages/android_libcpp_shared">android_libcpp_shared</A> - a package
					that provides a shared C++ library for Android, which is used by liblsl to provide the LSL functionality
					on Android devices.
				</Li>
				<Li>
					<A href="https://pub.dev/packages/flutter_refresh_rate_control"
						>flutter_refresh_rate_control</A
					> - a package that allows you to request high refresh rates on Android and iOS devices, used
					to make sure the game runs at the maximum rate possible.
				</Li>
				<Li>
					<A href="https://pub.dev/packages/xdf">xdf</A> - a package that provides a simple way to read
					and write XDF files, which is a file format used by LSL (and other tools) for time series data.
				</Li>
			</List>
		</Details>
		<Details label="CONTEXT" title="Headless Flutter" id="headless-flutter">
			<P
				>Flame needs Flutter, Flutter is a UI framework, a UI framework requires an interface.
				That's all reasonable, except I didn't want reasonable. Why waste all this processing power
				rendering something that is never going to be seen, and I didn't want to have a screen
				connected to the Raspberry Pi either.</P
			>
			<P
				>I spent a lot of time looking for various ways to run Flutter <Term def={terms.Headless}
					>headless</Term
				>, including a wrapper designed specifically for this, but unfortunately they did not work
				at all for me, and one prevented me from building on my macOS laptop. My desktop PC is
				Linux, and has been for a while (I've also used Linux since I was about 16, so I've seen
				some huge changes), so I'm familiar with some of the display backends and rendering
				pipelines. My initial thought was to make a headless X server, which worked, and actually
				ended up being the way I was running the experiment for a lot of the development. Turns out
				that was just eating up about 40% of the CPU (/GPU) on the Pi.</P
			>
			<P
				>The solution I came to, and one that I'm extremely happy with, was to use Wayland via
				Weston and the kiosk-mode shell. This ended up letting me use Vulkan (GPU acceleration) on
				the Pi and render to a virtual, headless 128x64 px display. Even though the Xvfb display was
				1x1 px, having the hardware acceleration and supporting everything Flutter expected made a
				huge difference. 40+% CPU down to 3%...that's a lotta headroom.</P
			>
		</Details>
	</section>

	<section>
		<Heading tag="h2">Time is an illusion. Lunchtime doubly so.</Heading>
		<span class="block text-right text-sm italic">&mdash; Douglas Adams</span>

		<Callout label="TL;DR">
			<P
				>To compare recordings from multiple brains, every game event has to be aligned with every
				participant's <Term def={terms.EEG}>EEG</Term> recording at the exact right moment. Here it does
				so to within about half a millisecond. A button press takes about 58 ms to become light on the
				screen.</P
			>
		</Callout>
		<P
			>The brain's response to something happening, like the ball starting to roll off the paddle,
			plays out over the first few hundred milliseconds. If I want to compare what several brains
			did in response to the same moment in the game, I need to know where that moment sits on each
			of their EEG recordings, to within a few milliseconds. For reference, the iPads themselves
			draw a new <Term def={terms.Frame}>frame</Term> every 8 ms.</P
		>
		<P
			>That sounds easy until you count the clocks. Each iPad has its own, so does the coordinator
			(the computer that runs the game's physics and tells every iPad what to draw), and so does
			each EEG <Term def={terms.Amplifier}>amplifier</Term>, and they all drift apart over time
			(very likely every one of your devices connects to the internet regularly to check with a
			global clock to correct for this). On top of that, delays hide in places you might not expect:
			the network takes a moment to deliver a message, a screen takes a moment between being told to
			draw something and light leaving the glass, and a touchscreen takes a moment between a finger
			landing and the app hearing about it. It is a bit like recording a band with every musician in
			a different city and no click track.</P
		>
		<figure>
			<video
				{@attach autoplay}
				{@attach controls}
				muted
				loop
				playsinline
				preload="metadata"
				class="mx-auto rounded-lg border-2 border-accent-soft"
				aria-label="Video showing the scene from Back to the Future Part II where Doc is on the clock tower, and Marty is on the ground with the DeLorean. The lightning strikes the clock tower, and the DeLorean drives off to the future and leaves tracks of fire behind it."
			>
				<source
					src="/_assets/images/_vault/rise-together/bttf2.av1.mp4"
					type="video/mp4; codecs=&quot;av01.0.05M.08&quot;"
				/>
				<source src="/_assets/images/_vault/rise-together/bttf2.h264.mp4" type="video/mp4" />
			</video>
			<figcaption class="mt-2 text-center text-sm text-fg-muted">
				Timing is everything! The clock tower scene from Back to the Future Part II &copy; 1989
				Universal City Studios, Inc. All Rights Reserved.
			</figcaption>
		</figure>
		<P
			>Not all of these delays are equally bad. A delay that is the same every time can be measured
			once and subtracted afterwards. A delay that changes from one moment to the next (jitter)
			can't, and it affects the very thing I am trying to measure. So the work is in two parts:
			making the delays as constant as possible, and then measuring them for real instead of
			trusting what the software says. For that, a light sensor (a photodiode) on the screen records
			when the picture really changed and, on the test bench, a force sensor under the finger
			records when the press really happened.</P
		>
		<EnhancedImg
			image={{
				src: 'latency-setup.jpg',
				alt: 'An iPad lying on a desk with a thin, flat force sensor taped to its screen over a blue square and a small black dome-shaped light sensor next to it, both wired to a circuit board with rows of sockets and a tiny display.',
				title:
					'Testing the timing on the bench. The round, flat sensor (an FSR: Force Sensitive Resistor) on the blue square feels when a finger touches it, and the black dome (a photodiode to detect light) next to it sees the screen change. The fingerprints and smudges have nothing to do with the experiment.'
			}}
		/>
		<P
			>From a finger landing to the paddle moving on screen takes about 58 ms. Roughly 22 ms of that
			passes before the game's code hears about the touch, and about 18 ms goes on getting the
			finished picture onto the screen. The rest is the trip over the network to the coordinator and
			back, a step of the physics, and waiting for the next <Term def={terms.Frame}>frame</Term>. A
			lot of time and effort has gone into reducing that to the minimum possible, and making sure it
			doesn't jitter.</P
		>
		<P
			>The payoff is that a moment in the game can be placed on each EEG recording to within about
			half a millisecond. That is well inside the few milliseconds I was aiming for, and it means
			that when two brains appear to do something at the same time, I can trust that they did.</P
		>
		<Details label="CONTEXT" title="How the game's events get onto the EEG recording">
			<P
				>Every event (the start of a trial, a participant pressing a button, a survey response)
				needs to get from the iPads and eventually be aligned with the
				<Term def={terms.EEG}>EEG</Term> data for analysis. The way this happens is by using regular pulses
				from the <Term def={terms.Coordinator}>coordinator</Term>, and from photodiodes (light
				sensors) on the iPads. Both of these sources go to the <Term def={terms.Bela}>Bela</Term>,
				which samples the inputs 48,000 times a second (48 kHz), then it forwards the pulses from
				the coordinator as well as its own regular pulse to the EEG
				<Term def={terms.Amplifier}>amplifiers</Term>. All of these are also logged to the internal
				storage on the Bela. That way we have a way to align everything to the EEG, and we have
				additional validation and measurements from <Term def={terms.LSL}>LSL</Term> on the coordinator
				and iPads.</P
			>
			<TriggerPulseTimeline />
		</Details>

		<Details label="CONTEXT" title="From a touch to a response on the screen">
			<P
				>While interacting with an iPad can feel pretty instantaneous, there's often a bit of a
				delay. This is not unique to iPads, in fact PC gamers will spend lots of money on getting
				the lowest latency setup they can, and even in the best of these cases there are still 10s
				to 100s of milliseconds of <Term def={terms.Latency}>latency</Term>. The diagram below shows
				the round trip of one game event &mdash; a participant pressing a button to lift the paddle
				&mdash; from the iPad, to the coordinator and back. You might be surprised to find that the
				largest stretches of time are from the iPad registering the touch and processing it and then
				later updating the screen.</P
			>
			<TouchToPhoton />
		</Details>
	</section>

	<section>
		<Heading tag="h2">My thoughts on Flutter as a Research Tool</Heading>
		<Callout label="TL;DR">
			<P
				><Term def={terms.Flutter}>Flutter</Term> and <Term def={terms.Dart}>Dart</Term> turned out to
				be fast, reliable and fun to build a complex experiment with. What is missing for research is
				validated tools and examples to point to, and I hope this project is a start.</P
			>
		</Callout>
		<P
			>Flutter has huge potential as a research tool. I really love the idea of making something
			that pretty much anyone can run, and despite this being quite a complex experiment and setup,
			the <Term def={terms.Pi}>Raspberry Pi</Term> sits at a cool 3% CPU usage throughout the experiment
			(see <A href="#headless-flutter">[CONTEXT] Headless Flutter</A>), and it's the one doing all
			the heavy lifting in terms of physics calculations. For me it was the right choice, and I hope
			that we will see an increase in people choosing to use Flutter and Dart for research.</P
		>
		<P
			>I think adoption is going to be a problem though, for a few reasons. Like anything, people
			use what they know, and if you use MATLAB, then that's your go-to, likewise with Python or
			anything else. Where there are established (and even more importantly), validated tools, like
			PsychoPy, it makes sense for someone to use that, until you need to do something that sits
			firmly outside of its scope. The last things that are missing are research-oriented tools and
			precedent: examples people can point to when they are at the start of designing an experiment.
			Hopefully this post and project go some way towards that, and some of the tools I have built
			will be useful for others.</P
		>
		<P
			>This has not been a perfectly smooth journey, I've encountered many bugs (mostly of my own
			making) including an <A href="https://github.com/flutter/flutter/issues/170735"
				>issue in Flutter</A
			> that makes the <Term def={terms.Latency}>latency</Term> one
			<Term def={terms.Frame}>frame</Term> more than the native implementation, and I've experienced frustrations
			in designing and building this experiment, but this has usually been about the complexity rather
			than the language. I have shown that
			<a href="https://joss.theoj.org/papers/10.21105/joss.10425">Dart can be reliable and fast</a>,
			and that's one step towards validation. But there is a long journey ahead, and it can't rest
			solely on my shoulders, Flutter and Dart already have a good community, it's just missing a
			voice from researchers. If you're a researcher and looking for some options, definitely give
			it a try, I think you'll be surprised at how fun building something with it can be.</P
		>
	</section>

	<section>
		<Heading tag="h2">In summary</Heading>
		<Callout label="TL;DR">
			<P
				>A group is easy to recognise from the outside. This experiment is my attempt to find out
				whether it can also be recognised from the inside, and everything built for it is there for
				others to use.</P
			>
		</Callout>
		<P
			>Back to the two groups hurrying towards that picnic table. From the outside, you can tell at
			a glance who belongs with whom. What I want to know is whether the same is true on the inside:
			whether the brains of people on the same team line up with each other more than with the
			people on the other team, even when everyone is in the same place doing the same thing. This
			experiment won't settle what a group is, but it should say whether that is a question brain
			recordings can help with, and even a clear "no" would be worth knowing.</P
		>
		<P
			>Where are things now? I have collected behavioural data with groups of four, and I'm piloting
			the full setup with <Term def={terms.EEG}>EEG</Term>, with groups of six in the current round.
			The main data collection is still ahead, and the setup is built to scale up to ten people.
			When it's done, the data will be made available in an open format and the code for the
			experiment as <Term def={terms.OpenSource}>open source</Term>. Please be patient with me, I
			have some administrative and writing tasks to do before that will happen.</P
		>
		<P
			>In the meantime, you can <a href="#try-rise-together">play the game in your browser</a>, and
			if you're in Aarhus, you can come and play it with an EEG cap on. And if you're building
			something of your own, <A href="https://pub.dev/packages/liblsl">liblsl</A> and the rest of the
			packages are there to be used.</P
		>

		<Details label="CONTEXT" title="Concepts and tools involved">
			<P
				>There are many different areas that are involved in making all this come together, so
				here's a non-exhaustive list for your perusal.</P
			>
			<div class="my-4 rounded-4xl border-2 border-accent-soft p-4">
				<List class="grid list-none grid-flow-row grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
					<Li
						><Heading tag="h4">Fields & Theories:</Heading>
						<List>
							<Li>Cognitive Science</Li>
							<Li>Electrical Engineering</Li>
							<Li>Dynamical Systems Theory</Li>
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
		</Details>
	</section>

	<section>
		<Heading tag="h2">Footnotes & References</Heading>
		<BoringBibliography bind:items hline={false} />
	</section>
</main>
