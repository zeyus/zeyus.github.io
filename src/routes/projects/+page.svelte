<script lang="ts">
    import { title } from "$lib/store.ts";
    title.set('projects');

    import { ButtonGroup, Button, Card, P, A } from "flowbite-svelte";
    import { ArrowRightOutline, GithubSolid } from 'flowbite-svelte-icons';
	import { link } from "svelte-spa-router";

    let projects = [
        {
            name: "MEP Contact",
            description: "A simple web app to help you find and contact your (Members of the European Parliament) MEPs. Because their website is difficult to navigate, here, it's all on one page.",
            link: "https://zeyus.com/contact-mep-representative",
            source: "https://github.com/zeyus/contact-mep-representative"
        },
        {
            name: "Python3BlueBox",
            description: "A old-school hacking tool, remade for the modern age. Generate MF (Multi-frequency) tones to control phone systems, just like in the movies.",
            link: "https://pypi.org/project/mfbluebox/",
            linkText: "PyPi",
            source: "https://github.com/zeyus/Python3BlueBox"
        },
        {
            name: "Long YouTube Videos UserScript",
            description: "A <a href=\"https://violentmonkey.github.io/\">Violentmonkey</a> / <a href=\"https://www.tampermonkey.net/\">Tampermonkey</a> / <a href=\"https://www.greasespot.net/\">Greasemonkey</a> userscript to hide YouTube shorts and highlight videos over a specified length.",
            link: "https://gist.github.com/zeyus/dae59e6a4d709bdb8a041a45634450cc/raw/YTLongForm.user.js",
            source: "https://gist.github.com/zeyus/dae59e6a4d709bdb8a041a45634450cc",
            linkText: "Install"
        },
        {
            name: "terminal-s (forked)",
            description: "A serial terminal that can act as a console host, supports SIGQUIT / SIGBREAK, and includes a loopback devices for testing.",
            source: "https://github.com/zeyus/terminal-s"
        },
        {
            name: "Treasure Hunt",
            description: "A serverless geo-location based step-by-step treasure hunt / quiz. You can only get the next question when you're close to the location.",
            link: "https://zeyus.com/sveltekit-treasure-hunt/",
            source: "https://github.com/zeyus/sveltekit-treasure-hunt"
        },
        {
            name: "RAGGA: Retrieval Augmented Generation General Assistant",
            description: "Load quantized LLMs and run them on your local devices. Interact with your own notes (currently markdown notes are supported by default) and ask questions about what you have written.",
            source: "https://github.com/zeyus/RAGGA"    
        },
        {
            name: "AdAway Revival for Android (fork for Android 4.1 to 13)",
            description: "AdAway is an open-source ad blocker for Android using the hosts file. This fork is for Android 4.1 to 13, which are not officially supported by AdAway.",
            link: "https://github.com/zeyus/AdAway/releases",
            linkText: "Releases",
            source: "https://github.com/zeyus/AdAway"
        },
        {
            name: "TouchTracker",
            description: "A dart + flutter mobile / web / desktop app to perform experiments using touch tracking interfaces (compatible with MouseTrap data files).",
            link: "https://zeyus.com/touchtracker/web/index.html",
            source: "https://github.com/zeyus/touchtracker",
        },
        {
            name: "ukulele (fork), a discord music bot",
            description: "Play soundcloud, youtube, etc links in a discord call, customizable and working with later APIs.",
            link: "https://github.com/zeyus?tab=packages&repo_name=ukulele",
            linkText: "Docker Image",
            source: "https://github.com/zeyus/ukulele"
        },
        {
            name: "GPU Prisoner's Dilemma Agent-Based Model (ABM)",
            description: "A (3D, using FLAMEGPU2) 2D ABM simulation executed on the GPU. This ABM models interactions of 'games' between agents, specifically the Prisoner's Dilemma game, in which participants can either cooperate or defect, resulting in a payoff, depending on the combination of decisions.",
            link: "https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM/releases",
            linkText: "Releases",
            source: "https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM"
        },
        {
            name: "WIP Novel social paradigm",
            description: "Current development of a novel paradigm for studying the brain during simultaneous cooperative and competitive tasks. It is targeted at joint action, social interaction, and social cognition research, and will be combined with EEG hyperscanning and neuro-/bio-feedback.",
            link: "https://zeyus.com/RiseTogether/",
            source: "https://github.com/zeyus/RiseTogether"
        },
        {
            name: "BrainJammers.com",
            description: "Currently an interactive 3D WebGL brain, but probably will become a fake product to jam brains",
            link: "https://brainjammers.com",
            source: "https://github.com/zeyus/brainjammers.com"
        },
    ];

</script>

<P class="mb-0 mt-4 block mb-4">Here are some of my projects:</P>
<div class="columns-1 sm:columns-2 xl:columns-3 w-full">
    {#each projects as project}
        <Card class="w-full mb-4 break-inside-avoid-column mx-auto sm:mx-0 max-w-lg">
            <h5 class="truncate whitespace-normal mb-2 text-2xl font-bold text-white">{project.name}</h5>
            <p class="mx-2 mb-5 text-gray-300 font-normal leading-tight">{@html project.description}</p>
            <ButtonGroup>
                {#if project.link}
                    <Button color="primary" class="w-50" href={project.link}>
                        <span>{project.linkText ? project.linkText : 'Go'}</span>
                    </Button>
                {/if}
                <Button color="alternative" class="w-50" href={project.source}>
                    <GithubSolid class="mr-2" />
                    <span>Source</span>
                </Button>
            </ButtonGroup>
        </Card>
    {/each}
</div>
