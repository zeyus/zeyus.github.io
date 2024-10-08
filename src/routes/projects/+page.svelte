<script lang="ts">
    import { title } from "$lib/store.ts";
    title.set('projects');

    import { ButtonGroup, Button, Card, P, A } from "flowbite-svelte";
    import { ArrowRightOutline, GithubSolid } from 'flowbite-svelte-icons';

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
            source: "https://github.com/zeyus/Python3BlueBox"
        },
        {
            name: "terminal-s (forked)",
            description: "A serial terminal that can act as a console host, supports SIGQUIT / SIGBREAK, and includes a loopback devices for testing.",
            source: "https://github.com/zeyus/terminal-s"
        },
        {
            name: "Treasure Hunt",
            description: "A serverless geo-location based step-by-step treasure hunt / quiz. You can only get the next question when you're close to the location.",
            link: "http://zeyus.com/sveltekit-treasure-hunt/",
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
            source: "https://github.com/zeyus/ukulele"
        },
        {
            name: "GPU Prisoner's Dilemma Agent-Based Model (ABM)",
            description: "A (3D, using FLAMEGPU2) 2D ABM simulation executed on the GPU. This ABM models interactions of 'games' between agents, specifically the Prisoner's Dilemma game, in which participants can either cooperate or defect, resulting in a payoff, depending on the combination of decisions.",
            link: "https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM/releases",
            source: "https://github.com/zeyus/FLAMEGPU2-Prisoners-Dilemma-ABM"
        }
    ];

</script>

<P class="mb-0 mt-4">Here are some of my projects:</P>
<div class="card-columns grid md:grid-cols-2 xl:grid-cols-3">
    {#each projects as project}
        <Card class="mt-4">
            <h5 class="mb-2 text-2xl font-bold text-white">{project.name}</h5>
            <P class="mb-3 font-normal leading-tight">{project.description}</P>
            <ButtonGroup>
                {#if project.link}
                    <Button color="primary" class="w-50" href={project.link}>
                        <span>View</span>
                        <ArrowRightOutline class="ml-2" />
                    </Button>
                {/if}
                <Button color="alternative" class="w-50" href={project.source}>
                    <GithubSolid class="mr-2" />
                    <span>Source</span>
                    <ArrowRightOutline class="ml-2" />
                </Button>
            </ButtonGroup>
        </Card>
    {/each}
</div>
