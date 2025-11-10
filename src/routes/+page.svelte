<script lang="ts">
    import { P, List, Li, A } from "flowbite-svelte";
	import { getContext } from "svelte";
	import type { MetadataContext } from "$lib/metadata.svelte";
    import BoringReference from '$components/BoringReference.svelte';
    import BoringBibliography from '$components/BoringBibliography.svelte';
    import { createFootnote } from '$components/BoringReference.svelte';
    import { WebGlShader } from "svader";

    const shaderCode = `#version 300 es
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
                float t = iTime*0.01;
                p.xz =rotate(p.xz,t);
                p.xy =rotate(p.xy,t*2.89);
                p.xz = abs(p.xz);
                p.xz-=.5;
            }
            return dot(sign(p),p)/5.;
        }

        vec4 rm (vec3 ro, vec3 rd){
            float t = 0.;
            vec3 col = vec3(0.);
            float d;
            for(float i =0.; i<64.; i++){
                vec3 p = ro + rd*t;
                d = map(p)*.5;
                if(d<0.1){
                    break;
                }
                if(d>100.){
                    break;
                }
                col+=palette(length(p)*.15)/(500.*(d));
                t+=d;
            }
            return vec4(col,1./(d*100.));
        }
        void main()
        {
            vec2 uv = (gl_FragCoord.xy+u_offset-(iResolution.xy/2.))/iResolution.x;
            vec3 ro = vec3(0.,0.,-50.);
            ro.xz = rotate(ro.xz,iTime);
            vec3 cf = normalize(-ro);
            vec3 cs = normalize(cross(cf,vec3(0.,1.,0.)));
            vec3 cu = normalize(cross(cf,cs));
            
            vec3 uuv = ro+cf*4. + uv.x*cs + uv.y*cu;
            
            vec3 rd = normalize(uuv-ro);
            
            vec4 col = rm(ro,rd);
            
            
            fragColor = col;
        }
    `;
    
    let metaCtx = getContext<MetadataContext>('metadata');

    metaCtx.setMetadata({
        title: 'home',
        description: 'Hi, I\'m zeyus, the epitome of a generalist. I left industry to study cognitive science and now I\'m working on my PhD so I can specialize in generalism.',
    });

    let items: Footnote[] = [];

</script>

<P class="dark:text-gray-200 mb-2 mt-4">Hi, I'm zeyus, the epitome of a generalist. I left industry to study <A href="https://en.wikipedia.org/wiki/Cognitive_science">cognitive science</A> and now I'm working on my PhD so I can specialize in generalism.</P>
<div class="flex flex-col md:flex-row md:items-start md:space-x-8 md:justify-around">
    <!-- position list vertically centered -->
    <div class="w-full flex mb-4 md:justify-around md:mb-0 content-start md:self-center">
        <List class="list-['>'] dark:text-gray-200 ml-3 mb-4 flex flex-col" position="inside">
            <Li>Cognitive Scientist</Li>
            <Li>PhD student</Li>
            <Li><A href="https://github.com/zeyus">Open-source contributor and developer</A></Li>
            <Li><A href="https://soundcloud.com/zeyus">Musician</A></Li>
            <Li>You can follow me around the internet via my <A href="https://me.zys.im/">link list</A></Li>
        </List>
    </div>
    <div class="w-full flex md:justify-around mb-4 md:mb-4 justify-center md:self-center">
    <WebGlShader
        width="300px"
        height="256px"
        code={shaderCode}
        parameters={[
            { name: "iResolution", value: "resolution" },
            { name: "u_offset", value: "offset" },
            { name: "iTime", value: "time" }

        ]}
    >
        <div class="fallback dark:text-gray-500">Enable WebGL to see an awesome shader.</div>
    </WebGlShader>
    </div>
</div>
<P class="dark:text-gray-200">
    If you're interested in some stuff I write about, check out <A href="/_vault/">the _vault</A>, if you'd like to see some of the open source projects I've worked on, take a look at
    <A href="/projects/">the projects page</A>. If you just want to connect to your Arduino or other serial device directly from your browser, check out <A href="/terminal/">the terminal</A><BoringReference bind:items item={createFootnote("Requires a browser that supports the WebSerial or USB APIs")} />.
</P>

<BoringBibliography bind:items />
