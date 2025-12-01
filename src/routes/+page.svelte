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
        z: { min: -200.0, max: 1.0, default: -30.0 },
        rotateXY: { min: -5.0, max: 5.0, default: 0.0 },
        rotateXZ: { min: -5.0, max: 5.0, default: 0.1 },
        timeMultiplier: { min: 0.0001, max: 5.0, default: 0.25 },
    };

    type ShaderSettings = {
        showShader: boolean;
        shaderX: number;
        shaderY: number;
        shaderZ: number;
        rotateXY: number;
        rotateXZ: number;
        timeMultiplier: number;
    };

    const defaultSettings: ShaderSettings = {
        showShader: true,
        shaderX: shaderLimits.x.default,
        shaderY: shaderLimits.y.default,
        shaderZ: shaderLimits.z.default,
        rotateXY: shaderLimits.rotateXY.default,
        rotateXZ: shaderLimits.rotateXZ.default,
        timeMultiplier: shaderLimits.timeMultiplier.default,
    };

    const shaderSettings = storage<ShaderSettings>('shader-settings', defaultSettings);

    let showShader = $state($shaderSettings.showShader);
    let shaderX = $state($shaderSettings.shaderX);
    let shaderY = $state($shaderSettings.shaderY);
    let shaderZ = $state($shaderSettings.shaderZ);
    let rotateXY = $state($shaderSettings.rotateXY);
    let rotateXZ = $state($shaderSettings.rotateXZ);
    let timeMultiplier = $state($shaderSettings.timeMultiplier);

    // Save changes back to store
    $effect(() => {
        shaderSettings.set({
            showShader,
            shaderX,
            shaderY,
            shaderZ,
            rotateXY,
            rotateXZ,
            timeMultiplier,
        });
    });

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
                float t = iTime*timeMultiplier;
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
            ro.xy = rotate(ro.xy,iTime*rotateXY);
            ro.xz = rotate(ro.xz,iTime*rotateXZ);
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
        console.log(`Parameter ${target.name} changed to ${value}`);
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
        description: 'Hi, I\'m zeyus, the epitome of a generalist. I left industry to study cognitive science and now I\'m working on my PhD so I can specialize in generalism.',
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
    <div class="flex md:m-0 md:p-0 mb-4 justify-center flex-row">
        <div class="flex md:justify-self-end mb-4 md:mb-4 justify-center md:self-center">
            <WebGlShader
                width="300px"
                height="256px"
                code={shaderCode}
                parameters={[
                    { name: "iResolution", value: "resolution" },
                    { name: "u_offset", value: "offset" },
                    { name: "iTime", value: "time" },
                    { name: "shaderX", value: shaderX, type: "float" },
                    { name: "shaderY", value: shaderY, type: "float" },
                    { name: "shaderZ", value: shaderZ, type: "float" },
                    { name: "rotateXY", value: rotateXY, type: "float" },
                    { name: "rotateXZ", value: rotateXZ, type: "float" },
                    { name: "timeMultiplier", value: timeMultiplier, type: "float" },

                ]}
            >
                <div class="fallback dark:text-gray-500">Enable WebGL to see an awesome shader.</div>
                
            </WebGlShader>
        </div>
        <div class="flex md:justify-self-start mb-4 md:mb-4 justify-center md:self-center flex-col w-32 ml-2">
            <!-- Shader parameter controls -->
            <Label
                title="Adjust the position of the camera on the X axis"
                class="mb-0 pb-0">Cam X: {shaderX.toFixed(2)}</Label>
            <Range
                title="Adjust the position of the camera on the X axis"
                class="mt-0 pt-0"
                min={shaderLimits.x.min}
                max={shaderLimits.x.max}
                onchange={onShaderParameterChange}
                step={0.1}
                value={shaderX}
                name="shaderX"
            />
            <Label
                title="Adjust the position of the camera on the Y axis"
                class="mb-0 pb-0">Cam Y: {shaderY.toFixed(2)}</Label>
            <Range
                title="Adjust the position of the camera on the Y axis"
                class="mt-0 pt-0"
                min={shaderLimits.y.min}
                max={shaderLimits.y.max}
                onchange={onShaderParameterChange}
                step={0.1} 
                value={shaderY}
                name="shaderY" 
            />
            <Label
                title="Adjust the camera zoom level"
                class="mb-0 pb-0">Zoom: {shaderZ.toFixed(2)}</Label>
            <Range
                title="Adjust the camera zoom level"
                class="mt-0 pt-0" min={shaderLimits.z.min}
                max={shaderLimits.z.max} onchange={onShaderParameterChange}
                step={0.1}
                value={shaderZ}
                name="shaderZ"
            />
            <Label 
                title="Adjust the spin speed around the XY axis"
                class="mb-0 pb-0">Spin XY: {rotateXY.toFixed(2)}</Label>
            <Range
                title="Adjust the spin speed around the XY axis"
                class="mt-0 pt-0"
                min={shaderLimits.rotateXY.min}
                max={shaderLimits.rotateXY.max}
                onchange={onShaderParameterChange}
                step={0.01}
                value={rotateXY}
                name="rotateXY"
            />
            <Label
                title="Adjust the spin speed around the XZ axis"
                class="mb-0 pb-0">Spin XZ: {rotateXZ.toFixed(2)}</Label>
            <Range
                title="Adjust the spin speed around the XZ axis"
                class="mt-0 pt-0"
                min={shaderLimits.rotateXZ.min}
                max={shaderLimits.rotateXZ.max}
                onchange={onShaderParameterChange}
                step={0.01} value={rotateXZ}
                name="rotateXZ"
            />
            <Label
                title="Adjust the speed of time progression in the shader"
                class="mb-0 pb-0">Time Mult: {timeMultiplier.toFixed(3)}</Label>
            <Range
                title="Adjust the speed of time progression in the shader"
                class="mt-0 pt-0"
                min={shaderLimits.timeMultiplier.min}
                max={shaderLimits.timeMultiplier.max}
                onchange={onShaderParameterChange}
                step={0.001} value={timeMultiplier}
                name="timeMultiplier"
            />
            <div class="flex justify-between">
                <!-- Hide button -->
                <Button class="mt-2 w-6 h-6 p-0" color="primary" outline={true} size="sm" onclick={() => showShader = false}
                aria-label="Hide shader"
                title="Hide shader"
                >
                    <EyeOutline class="w-4 h-4 m-0 p-0" />
                </Button>
                <!-- reset button -->
                <Button class="mt-2 w-6 h-6 p-0" color="primary" outline={true} size="sm" onclick={() => {
                    shaderX = shaderLimits.x.default;
                    shaderY = shaderLimits.y.default;
                    shaderZ = shaderLimits.z.default;
                    rotateXY = shaderLimits.rotateXY.default;
                    rotateXZ = shaderLimits.rotateXZ.default;
                    timeMultiplier = shaderLimits.timeMultiplier.default;
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
    <A href="/projects/">the projects page</A>. If you just want to connect to your Arduino or other serial device directly from your browser, check out <A href="/terminal/">the terminal</A><BoringReference bind:items item={createFootnote("Requires a browser that supports the WebSerial or USB APIs")} />.
</P>

<BoringBibliography bind:items />
