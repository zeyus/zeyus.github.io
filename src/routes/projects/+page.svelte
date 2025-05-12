<script lang="ts">
    import { ButtonGroup, Button, Card, P, A } from "flowbite-svelte";
    import { GithubSolid } from 'flowbite-svelte-icons';
    import type { MetadataContext } from "$lib/metadata.svelte";
	import { getContext } from "svelte";

    let metaCtx = getContext<MetadataContext>('metadata');

    metaCtx.setMetadata({
        title: 'projects',
        description: 'A selection of projects that I have worked on, from apps to research, all open source!',
    });

    const allProjects = [
        {
            name: "MEP Contact",
            description: "A simple web app to help you find and contact your (Members of the European Parliament) MEPs. Because their website is difficult to navigate, here, it's all on one page.",
            link: "https://zeyus.com/contact-mep-representative",
            source: "https://github.com/zeyus/contact-mep-representative",
            tags: ["politics", "tool"]
        },
        {
            name: "liblsl.dart native",
            description: "A Dart / Flutter library for the Lab Streaming Layer (LSL), a system for synchronizing streaming data in real-time. Using native-assets, this library builds the liblsl dynamic library and Dart bindings + an experimental user-friendly API (WIP). Works in OSX, Linux, Windows, iOS, Android (including Meta Quest).",
            link: "https://pub.dev/packages/liblsl",
            source: "https://github.com/zeyus/liblsl.dart",
            tags: ["research", "tool", "library", "dart", "lsl"]
        },
        {
            name: "Python XDF explorer",
            description: "A python GUI script to view XDF files (eXtensible Data Format), from e.g. Lab Streaming Layer (LSL). It allows you to view the data in a more user-friendly way, and also to export it to CSV.",
            link: "https://gist.github.com/zeyus/c80b27b66335b19dbf93467326ff208f",
            source: "https://gist.github.com/zeyus/c80b27b66335b19dbf93467326ff208f",
            tags: ["research", "tool", "python", "lsl"]

        },
        {
            name: "Python3BlueBox",
            description: "A old-school hacking tool, remade for the modern age. Generate MF (Multi-frequency) tones to control phone systems, just like in the movies.",
            link: "https://pypi.org/project/mfbluebox/",
            linkText: "PyPi",
            source: "https://github.com/zeyus/Python3BlueBox",
            tags: ["security", "tool", "hacking"]
        },
        {
            name: "Long YouTube Videos UserScript",
            description: "A <a href=\"https://violentmonkey.github.io/\">Violentmonkey</a> / <a href=\"https://www.tampermonkey.net/\">Tampermonkey</a> / <a href=\"https://www.greasespot.net/\">Greasemonkey</a> userscript to hide YouTube shorts and highlight videos over a specified length.",
            link: "https://gist.github.com/zeyus/dae59e6a4d709bdb8a041a45634450cc/raw/YTLongForm.user.js",
            source: "https://gist.github.com/zeyus/dae59e6a4d709bdb8a041a45634450cc",
            linkText: "Install",
            tags: ["QoL", "userscript"]
        },
        {
            name: "terminal-s (forked)",
            description: "A serial terminal that can act as a console host, supports SIGQUIT / SIGBREAK, and includes a loopback devices for testing.",
            source: "https://github.com/zeyus/terminal-s",
            tags: ["tool", "electronics"]
        },
        {
            name: "In-browser Serial COM Terminal",
            description: "A serverless serial terminal web app that works right in your browser, you can communicate with arduino or any other serial device without installing any software (you just need a browser that supports the WebSerial or USB API).",
            link: "https://zeyus.com/terminal",
            source: "https://github.com/zeyus/zeyus.github.io/blob/main/src/components/Terminal.svelte",
            tags: ["tool", "electronics"]
        },
        {
            name: "Treasure Hunt",
            description: "A serverless geo-location based step-by-step treasure hunt / quiz. You can only get the next question when you're close to the location.",
            link: "https://zeyus.com/sveltekit-treasure-hunt/",
            source: "https://github.com/zeyus/sveltekit-treasure-hunt",
            tags: ["game", "fun", "docker"]
        },
        {
            name: "RAGGA: Retrieval Augmented Generation General Assistant",
            description: "Load quantized LLMs and run them on your local devices. Interact with your own notes (currently markdown notes are supported by default) and ask questions about what you have written.",
            source: "https://github.com/zeyus/RAGGA",
            tags: ["LLM", "NLP", "tool", "research"]
        },
        {
            name: "AdAway Revival for Android (fork for Android 4.1 to 13)",
            description: "AdAway is an open-source ad blocker for Android using the hosts file. This fork is for Android 4.1 to 13, which are not officially supported by AdAway.",
            link: "https://github.com/zeyus/AdAway/releases",
            linkText: "Releases",
            source: "https://github.com/zeyus/AdAway",
            tags: ["tool", "android"]
        },
        {
            name: "TouchTracker",
            description: "A dart + flutter mobile / web / desktop app to perform experiments using touch tracking interfaces (compatible with MouseTrap data files).",
            link: "https://zeyus.com/touchtracker/web/index.html",
            source: "https://github.com/zeyus/touchtracker",
            tags: ["tool", "research", "dart", "flutter"]
        },
        {
            name: "ukulele (fork), a discord music bot",
            description: "Play soundcloud, youtube, etc links in a discord call, customizable and working with later APIs.",
            link: "https://github.com/zeyus?tab=packages&repo_name=ukulele",
            linkText: "Docker Image",
            source: "https://github.com/zeyus/ukulele",
            tags: ["docker", "bot", "music"]
        },
        {
            name: "GPU Prisoner's Dilemma Agent-Based Model (ABM)",
            description: "A (3D, using FLAMEGPU2) 2D ABM simulation executed on the GPU. This ABM models interactions of 'games' between agents, specifically the Prisoner's Dilemma game, in which participants can either cooperate or defect, resulting in a payoff, depending on the combination of decisions.",
            link: "https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM/releases",
            linkText: "Releases",
            source: "https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM",
            tags: ["research", "simulation"]
        },
        {
            name: "WIP Novel social paradigm",
            description: "Current development of a novel paradigm for studying the brain during simultaneous cooperative and competitive tasks. It is targeted at joint action, social interaction, and social cognition research, and will be combined with EEG hyperscanning and neuro-/bio-feedback.",
            link: "https://zeyus.com/RiseTogether/",
            source: "https://github.com/zeyus/RiseTogether",
            tags: ["research", "game", "flutter", "dart", "flame"]
        },
        {
            name: "BrainJammers.com",
            description: "Currently an interactive 3D WebGL brain, but probably will become a fake product to jam brains",
            link: "https://brainjammers.com",
            source: "https://github.com/zeyus/brainjammers.com",
            tags: ["WebGL", "toy"]
        },
        {
            name: "Red Ocelot",
            description: "A Space Shooter game developed (by myself and @stuartrapop) in < 1 week for the Flame Game Jame 2025",
            link: "https://zeyus.itch.io/red-ocelot",
            linkText: "Play",
            source: "https://github.com/FlameJam2025-T2/red_ocelot",
            tags: ["game", "flutter", "dart", "flame", "fun"]
        },

    ];

    const tagSort = (a: string, b: string) => a.localeCompare(b);

    let orderDirection = $state('desc');
    let orderBy = $state('name');
    const allTags = allProjects.flatMap(p => p.tags).filter((tag, index, self) => self.indexOf(tag) === index).sort(
        tagSort
    );
    let selectedTags: string[] = $state([]);

    let projects = $state(allProjects);

    const filterProjects = (tags: string[]) => {
        projects = allProjects.filter(project => {
            if (tags.length === 0) return true;
            return project.tags.some((tag: string) => tags.includes(tag));
        });
    };

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }
    };

    $effect(() => {
        filterProjects(selectedTags);
    });
    
    

</script>

<P class="mt-4 block mb-4">Here are some of my projects:</P>

<div class="w-full justify-end pe-4 flex flex-row flex-wrap">
    {#if selectedTags.length > 0}
        <Button
            size="sm"
            color="none"
            outline={false}
            shadow={false}
            class="p-0 mb-3 me-2 text-red-700 dark:text-red-700 text-xl"
            on:click={() => selectedTags = []}
            >x</Button>
    {/if}
    {#each allTags as tag}
        {@const checked = selectedTags.includes(tag)}
        {@const colorClasses = checked ? 'dark:bg-primary-800 dark:text-black dark:hover:bg-primary-900' : 'dark:bg-none dark:text-gray-300 dark:hover:bg-primary-900 dark:hover:text-white'}
        <Button
            size="sm"
            color="none"
            pill={true}
            outline={true}
            shadow={false}
            class="ml-2 mb-2 p-2 hover:bg-gray-700 dark:border-2 dark:border-primary-900 min-w-10 {colorClasses}"
            on:click={() => toggleTag(tag)}
            {checked}
            >{tag}</Button>
    {/each}
</div>

<div class="columns-1 sm:columns-2 xl:columns-3 w-full">
    {#each projects as project}
        <Card class="w-full mb-4 break-inside-avoid-column mx-auto sm:mx-0 max-w-lg">
            <h5 class="truncate whitespace-normal mb-2 text-2xl font-bold text-white">{project.name}</h5>
            <p class="mx-2 mb-5 text-gray-300 font-normal leading-tight">{@html project.description}</p>
            <div class="flex flex-row w-full justify-between">
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
                <!-- tags -->
                <div class="self-center w-fit h-fit">
                    {#each project.tags.sort(tagSort) as tag}
                        <Button color="none" class="ml-2 p-1"
                            on:click={() => selectedTags = [tag]}
                        >{tag}</Button>
                    {/each}
                </div>
            </div>
        </Card>
    {/each}
</div>
