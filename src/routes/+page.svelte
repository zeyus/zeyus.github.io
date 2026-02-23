<script lang="ts">
    import { P, List, Li, A, Range, Label, Button } from "flowbite-svelte";
    import { UndoOutline, EyeOutline } from "flowbite-svelte-icons";
	import { getContext, onMount } from "svelte";
	import type { MetadataContext } from "$lib/metadata.svelte";
    import BoringReference from '$components/BoringReference.svelte';
    import BoringBibliography from '$components/BoringBibliography.svelte';
    import { createFootnote } from '$components/BoringReference.svelte';
    import { WebGlShader } from "svader";
    import storage from '$lib/store';

    const shaderLimits = {
        x: { min: -100.0, max: 100.0, default: 0.0 },
        y: { min: -100.0, max: 100.0, default: -50.0 },
        z: { min: -200.0, max: -0.1, default: -25.0 },
        rotateXY: { min: -5.0, max: 5.0, default: 0.03 },
        rotateXZ: { min: -5.0, max: 5.0, default: -0.03 },
        timeMultiplier: { min: 0.0001, max: 5.0, default: 0.20 },
        frameRate: { options: [15, 30, 60, 120, "unlimited"], default: 30 }, // unlimited means we use "time" in the WebGLShader
    };

    type ShaderSettings = {
        showShader: boolean;
        shaderX: number;
        shaderY: number;
        shaderZ: number;
        rotateXY: number;
        rotateXZ: number;
        timeMultiplier: number;
        framerate: number | "unlimited";
        timeOffset: number;
    };

    const defaultSettings: ShaderSettings = {
        showShader: false,
        shaderX: shaderLimits.x.default,
        shaderY: shaderLimits.y.default,
        shaderZ: shaderLimits.z.default,
        rotateXY: shaderLimits.rotateXY.default,
        rotateXZ: shaderLimits.rotateXZ.default,
        timeMultiplier: shaderLimits.timeMultiplier.default,
        framerate: shaderLimits.frameRate.default,
        timeOffset: 0,
    };

    const shaderSettings = storage<ShaderSettings>('shader-settings', defaultSettings);

    let showShader = $state($shaderSettings.showShader);
    let shaderX = $state($shaderSettings.shaderX);
    let shaderY = $state($shaderSettings.shaderY);
    let shaderZ = $state($shaderSettings.shaderZ);
    let rotateXY = $state($shaderSettings.rotateXY);
    let rotateXZ = $state($shaderSettings.rotateXZ);
    let timeMultiplier = $state($shaderSettings.timeMultiplier);
    let framerate = $state($shaderSettings.framerate);
    let timeOffset = $state($shaderSettings.timeOffset ?? 0);

    // Save non-time settings immediately when they change
    $effect(() => {
        // Track these settings but don't include timeOffset here
        const settingsToSave = {
            showShader,
            shaderX,
            shaderY,
            shaderZ,
            rotateXY,
            rotateXZ,
            timeMultiplier,
            framerate,
        };

        // Save immediately when non-time settings change
        shaderSettings.set({
            ...settingsToSave,
            timeOffset
        });
    });

    // Throttled save for timeOffset only (once per second)
    $effect(() => {
        if (!showShader) return;

        const intervalId = setInterval(() => {
            shaderSettings.set({
                showShader,
                shaderX,
                shaderY,
                shaderZ,
                rotateXY,
                rotateXZ,
                timeMultiplier,
                framerate,
                timeOffset
            });
        }, 1000);

        return () => clearInterval(intervalId);
    });

    

    let shaderTime = $state(0);
    let baseTimeOffset = $state(0); // Store the base offset
    let animationStartTime = $state(0);

    // Initialize baseTimeOffset from stored timeOffset
    $effect(() => {
        if (baseTimeOffset === 0 && timeOffset > 0) {
            baseTimeOffset = timeOffset;
        }
    });

    // For limited framerates: update timeOffset continuously
    $effect(() => {
        if (!showShader || framerate === "unlimited") {
            return;
        }

        let animationFrameId: number;
        let localStartTime = 0;
        let lastFrameTime = 0;

        const updateShaderTime = (timestamp: number) => {
            const currentTime = timestamp / 1000;

            // Initialize start time on first frame
            if (localStartTime === 0) {
                localStartTime = currentTime;
                lastFrameTime = currentTime;
                animationStartTime = currentTime;
            }

            const frameInterval = 1 / (framerate as number);

            if (currentTime - lastFrameTime >= frameInterval) {
                shaderTime = currentTime - localStartTime;
                // Continuously update the offset so it's always current
                timeOffset = baseTimeOffset + shaderTime;
                lastFrameTime = currentTime;
            }

            animationFrameId = requestAnimationFrame(updateShaderTime);
        };

        animationFrameId = requestAnimationFrame(updateShaderTime);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            // Update base offset when cleaning up
            baseTimeOffset = timeOffset;
            shaderTime = 0;
        };
    });

    // For unlimited mode: update timeOffset continuously
    $effect(() => {
        if (!showShader || framerate !== "unlimited") {
            return;
        }

        animationStartTime = performance.now() / 1000;
        let animationFrameId: number;

        const updateTimeOffset = () => {
            const currentTime = performance.now() / 1000;
            timeOffset = baseTimeOffset + (currentTime - animationStartTime);
            animationFrameId = requestAnimationFrame(updateTimeOffset);
        };

        animationFrameId = requestAnimationFrame(updateTimeOffset);

        return () => {
            cancelAnimationFrame(animationFrameId);
            // Update base offset when cleaning up
            baseTimeOffset = timeOffset;
        };
    });

    const shaderParameters = $derived(
        framerate === "unlimited"
            ? [
                { name: "iResolution", value: "resolution" as const },
                { name: "u_offset", value: "offset" as const },
                { name: "iTime", value: "time" as const },
                { name: "shaderX", value: shaderX, type: "float" as const },
                { name: "shaderY", value: shaderY, type: "float" as const },
                { name: "shaderZ", value: shaderZ, type: "float" as const },
                { name: "rotateXY", value: rotateXY, type: "float" as const },
                { name: "rotateXZ", value: rotateXZ, type: "float" as const },
                { name: "timeMultiplier", value: timeMultiplier, type: "float" as const },
                { name: "timeOffset", value: timeOffset, type: "float" as const },
            ]
            : [
                { name: "iResolution", value: "resolution" as const },
                { name: "u_offset", value: "offset" as const },
                { name: "iTime", value: shaderTime, type: "float" as const },
                { name: "shaderX", value: shaderX, type: "float" as const },
                { name: "shaderY", value: shaderY, type: "float" as const },
                { name: "shaderZ", value: shaderZ, type: "float" as const },
                { name: "rotateXY", value: rotateXY, type: "float" as const },
                { name: "rotateXZ", value: rotateXZ, type: "float" as const },
                { name: "timeMultiplier", value: timeMultiplier, type: "float" as const },
                { name: "timeOffset", value: timeOffset, type: "float" as const },
            ]
    );

    const isUnlimitedFramerate = $derived(framerate === "unlimited");

    let shaderCode = $derived.by(() => `#version 300 es
        // License: CC BY-NC-SA 3.0
        // https://creativecommons.org/licenses/by-nc-sa/3.0/
        // Author: bradjamesgrant (https://www.shadertoy.com/user/bradjamesgrant)
        // fractal pyramid: https://www.shadertoy.com/view/tsXBzS
        // Modified by zeyus.
        precision highp float;
        out vec4 fragColor;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 u_offset;

        uniform float shaderX;
        uniform float shaderY;
        uniform float shaderZ;
        uniform float rotateXY;
        uniform float rotateXZ;
        uniform float timeMultiplier;
        uniform float timeOffset;


        vec3 palette(float d){
            return mix(vec3(0.6,1.0,0.8),vec3(1.,0.0,1.),d);
        }

        vec2 rotate(vec2 p,float a){
            float c = cos(a*0.1);
            float s = sin(a*0.1);
            return p*mat2(c,s,-s,c);
        }

        float map(vec3 p){
            for( int i = 0; i<40; ++i){
                float t = (iTime + timeOffset)*timeMultiplier;
                p.xz =rotate(p.xz,t);
                p.xy =rotate(p.xy,t*2.89);
                p.xz = abs(p.xz);
                // p.xz-=.5;
                p.xz -=.3;
            }
            return dot(sign(p),p)/6.;
        }

        vec4 rm (vec3 ro, vec3 rd){
            float t = 0.;
            vec3 col = vec3(0.);
            float d;
            for(float i =0.; i<64.; i++){
                vec3 p = ro + rd*t;
                d = map(p)*.5;
                if(d<0.05){
                    break;
                }
                if(d>100.){
                    break;
                }
                col+=palette(length(p)*.15)/(550.*(d));
                t+=d;
            }
            return vec4(col,1./(d*100.));
        }
        void main()
        {
            vec2 uv = (gl_FragCoord.xy+u_offset-(iResolution.xy/2.))/iResolution.x;
            vec3 ro = vec3(shaderX,shaderY,shaderZ);
            ro.xy = rotate(ro.xy,(iTime + timeOffset)*rotateXY);
            ro.xz = rotate(ro.xz,(iTime + timeOffset)*rotateXZ);
            vec3 cf = normalize(-ro);
            vec3 cs = normalize(cross(cf,vec3(0.,1.,0.)));
            vec3 cu = normalize(cross(cf,cs));
            
            vec3 uuv = ro+cf*4. + uv.x*cs + uv.y*cu;
            
            vec3 rd = normalize(uuv-ro);
            
            vec4 col = rm(ro,rd);
            
            
            fragColor = col;
        }
    `);

    function onShaderParameterChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const value = parseFloat(target.value);
        switch (target.name) {
            case 'shaderX':
                shaderX = value;
                break;
            case 'shaderY':
                shaderY = value;
                break;
            case 'shaderZ':
                shaderZ = value;
                break;
            case 'rotateXY':
                rotateXY = value;
                break;
            case 'rotateXZ':
                rotateXZ = value;
                break;
            case 'timeMultiplier':
                timeMultiplier = value;
                break;
        }
    }
    
    let metaCtx = getContext<MetadataContext>('metadata');

    metaCtx.setMetadata({
        title: 'home',
        description: 'The official website of zeyus, a cognitive science researcher, software engineer, hacker, musician, and generalist. ' +
            'Check out my projects, art, and other work.',
    });

    let items: Footnote[] = $state([]);

    let loading = $state(true);

    onMount(() => {
        loading = false;
    });
    

</script>

<P class="dark:text-gray-200 mb-2 mt-4">Hi, I'm zeyus, the epitome of a generalist. I left industry to study <A href="https://en.wikipedia.org/wiki/Cognitive_science">cognitive science</A> and now I'm working on my PhD so I can specialize in generalism.</P>
<div class="flex flex-col md:flex-row md:items-start md:w-full md:justify-around">
    <!-- position list vertically centered -->
    <div class="flex mb-4 md:justify-start md:m-0 md:p-0 content-start md:self-center">
        <List class="home-list list-['>'] dark:text-gray-200 ml-3 mb-4 md:m-0 md:p-0 flex flex-col" position="inside">
            <Li class="ps-2">Cognitive Scientist</Li>
            <Li class="ps-2">PhD student</Li>
            <Li class="ps-2"><A href="https://github.com/zeyus">Open-source contributor and developer</A></Li>
            <Li class="ps-2"><A href="https://soundcloud.com/zeyus">Musician</A></Li>
            <Li class="ps-2">You can follow me around the internet via my <A href="https://me.zys.im/">link list</A></Li>
        </List>
    </div>
    
    
    {#if showShader && !loading}
    <div class="flex md:m-0 md:p-0 mb-4 justify-center flex-col md:flex-row">
        <div class="flex justify-self-center md:justify-self-end mb-4 md:mb-4 justify-center self-center">
            {#key isUnlimitedFramerate}
            <WebGlShader
                width="300px"
                height="256px"
                code={shaderCode}
                forceAnimation={true}
                parameters={shaderParameters}
            >
                <div class="fallback dark:text-gray-500">Enable WebGL to see an awesome shader.</div>

            </WebGlShader>
            {/key}
        </div>
        <div class="flex md:justify-self-start mb-4 md:mb-4 justify-center self-center flex-col w-64 md:w-32 ml-2">
            <!-- Shader parameter controls -->
            <div class="flex justify-between">
            <Label
                for="shaderX"
                title="Adjust the position of the camera on the X axis"
                class="mb-0 pb-0">Cam X:</Label>
            <span
                class="text-sm text-gray-500 dark:text-gray-400 mb-0 pb-0"
            >{shaderX.toFixed(2)}</span>
            </div>
            <Range
                id="shaderX"
                title="Adjust the position of the camera on the X axis"
                class="mt-0 pt-0"
                min={shaderLimits.x.min}
                max={shaderLimits.x.max}
                onchange={onShaderParameterChange}
                step={0.1}
                value={shaderX}
                name="shaderX"
                aria-labelledby="shaderX"
            />
            <div class="flex justify-between">
            <Label
                for="shaderY"
                title="Adjust the position of the camera on the Y axis"
                class="mb-0 pb-0">Cam Y:</Label>
            <span
                class="text-sm text-gray-500 dark:text-gray-400 mb-0 pb-0"
            >{shaderY.toFixed(2)}</span>
            </div>
            <Range
                id="shaderY"
                title="Adjust the position of the camera on the Y axis"
                class="mt-0 pt-0"
                min={shaderLimits.y.min}
                max={shaderLimits.y.max}
                onchange={onShaderParameterChange}
                step={0.1}
                value={shaderY}
                name="shaderY"
                aria-labelledby="shaderY"
            />
            <div class="flex justify-between">
            <Label
                for="shaderZ"
                title="Adjust the camera zoom level"
                class="mb-0 pb-0">Zoom:</Label>
            <span
                class="text-sm text-gray-500 dark:text-gray-400 mb-0 pb-0"
            >{shaderZ.toFixed(2)}</span>
            </div>
            <Range
                id="shaderZ"
                title="Adjust the camera zoom level"
                class="mt-0 pt-0"
                min={shaderLimits.z.min}
                max={shaderLimits.z.max}
                onchange={onShaderParameterChange}
                step={0.01}
                value={shaderZ}
                name="shaderZ"
                aria-labelledby="shaderZ"
            />
            <div class="flex justify-between">
            <Label
                for="rotateXY"
                title="Adjust the spin speed around the XY axis"
                class="mb-0 pb-0">Spin XY:</Label>
            <span
                class="text-sm text-gray-500 dark:text-gray-400 mb-0 pb-0"
            >{rotateXY.toFixed(2)}</span>
            </div>
            <Range
                id="rotateXY"
                title="Adjust the spin speed around the XY axis"
                class="mt-0 pt-0"
                min={shaderLimits.rotateXY.min}
                max={shaderLimits.rotateXY.max}
                onchange={onShaderParameterChange}
                step={0.01}
                value={rotateXY}
                name="rotateXY"
                aria-labelledby="rotateXY"
            />
            <div class="flex justify-between">
            <Label
                for="rotateXZ"
                title="Adjust the spin speed around the XZ axis"
                class="mb-0 pb-0">Spin XZ:</Label>
            <span
                class="text-sm text-gray-500 dark:text-gray-400 mb-0 pb-0"
            >{rotateXZ.toFixed(2)}</span>
            </div>
            <Range
                id="rotateXZ"
                title="Adjust the spin speed around the XZ axis"
                class="mt-0 pt-0"
                min={shaderLimits.rotateXZ.min}
                max={shaderLimits.rotateXZ.max}
                onchange={onShaderParameterChange}
                step={0.01}
                value={rotateXZ}
                name="rotateXZ"
                aria-labelledby="rotateXZ"
            />
            <div class="flex justify-between">
            <Label
                for="timeMultiplier"
                title="Adjust the speed of time progression in the shader"
                class="mb-0 pb-0">Mult:</Label>
            <span
                class="text-sm text-gray-500 dark:text-gray-400 mb-0 pb-0"
            >{timeMultiplier.toFixed(3)}</span>
            </div>
            <Range
                id="timeMultiplier"
                title="Adjust the speed of time progression in the shader"
                class="mt-0 pt-0"
                min={shaderLimits.timeMultiplier.min}
                max={shaderLimits.timeMultiplier.max}
                onchange={onShaderParameterChange}
                step={0.001}
                value={timeMultiplier}
                name="timeMultiplier"
                aria-labelledby="timeMultiplier"
            />
            <div class="flex justify-between">
                <!-- Hide button -->
                <Button class="mt-2 w-6 h-6 p-0" color="primary" outline={true} size="sm" onclick={() => showShader = false}
                aria-label="Hide shader"
                title="Hide shader"
                >
                    <EyeOutline class="w-4 h-4 m-0 p-0" />
                </Button>
                <!-- framerate select dropdown -->
                 <div class="flex flex-row items-center m-0">
                <Label for="framerate-select" class="md:sr-only">Framerate:</Label>
                <select
                    class="ms-2 self-center w-16 py-0.5 md:ms-0 md:mt-2 px-0.5 h-6 text-xs rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    bind:value={framerate}
                    aria-label="Select shader frame rate"
                    title="Select shader frame rate"
                >
                    {#each shaderLimits.frameRate.options as option}
                        <option value={option}>{option === "unlimited" ? "∞ FPS" : option + " FPS"}</option>
                    {/each}
                </select>
                </div>
                <!-- reset button -->
                <Button class="mt-2 w-6 h-6 p-0" color="primary" outline={true} size="sm" onclick={() => {
                    shaderX = shaderLimits.x.default;
                    shaderY = shaderLimits.y.default;
                    shaderZ = shaderLimits.z.default;
                    rotateXY = shaderLimits.rotateXY.default;
                    rotateXZ = shaderLimits.rotateXZ.default;
                    timeMultiplier = shaderLimits.timeMultiplier.default;
                    timeOffset = 0;
                    baseTimeOffset = 0;
                }}
                aria-label="Reset shader parameters"
                title="Reset shader parameters"
                >
                    <UndoOutline class="w-4 h-4 m-0 p-0" />
                </Button>
            </div>
        </div>
        </div>
    {:else}
        <div class="flex md:justify-self-center mb-4 md:mb-4 justify-center md:self-center">
            <!-- Show button -->
            <Button color="primary" outline={true} size="sm" onclick={() => showShader = true}
            title="Show shader"
            aria-label="Show shader"
            class="m-0 p-0 w-6 h-6"
            >
                <EyeOutline class="w-4 h-4 m-0 p-0" />
            </Button>
        </div>
    {/if}
</div>
<P class="dark:text-gray-200 md:mt-4">
    If you're interested in some stuff I write about, check out <A href="/_vault/">the _vault</A>, if you'd like to see some of the open source projects I've worked on, take a look at
    <A href="/projects/">the projects page</A>. If you just want to connect to your Arduino or other serial device directly from your browser, check out 
    <A href="/terminal/">the terminal</A><BoringReference
        bind:items item={
            createFootnote(
                "Requires a browser that supports the <a class='inline-flex items-center hover:underline " +
                "text-primary-600 dark:text-primary-500 mx-1' " +
                "href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility'>" +
                "WebSerial</a> or <a class='inline-flex items-center hover:underline text-primary-600 " + 
                "dark:text-primary-500 mx-1' href='" +
                "https://developer.mozilla.org/en-US/docs/Web/API/USB#browser_compatibility'>USB</a> APIs")} />.
</P>

<BoringBibliography bind:items />
