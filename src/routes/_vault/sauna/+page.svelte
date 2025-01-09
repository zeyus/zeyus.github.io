<script lang="ts">
    import type { HTMLImgAttributes } from 'svelte/elements';
    import { P } from 'flowbite-svelte';
    import { getContext } from 'svelte';
    import Reference from '$components/Reference.svelte';
    import EnhancedImg from '$components/EnhancedImg.svelte';

    let images = getContext<() => HTMLImgAttributes[]>('images')();
</script>

<P>
    <EnhancedImg image={images[0]} figClass="w-96 float-end" />
    So, one side of my family is from Finland, and one of the consistencies of both places I lived during my childhood 
    was the presence of a sauna.<Reference text="These places were in vastly different locations, the first was near Sydney, and the second was in the middle of nowhere." />
</P>
<P>
  
  Since moving to Denmark several years ago, we ended up buying a house which had a wood shed on the property, and I knew it would be 
  the perfect place for a sauna. Although, I had to wait for a while to save up enough money and
  there were other projects that were more urgent.<Reference text="Stuff like radon mitigation, dealing with mold, that kind of fun stuff" />
</P>
<P>
    The time finally came, and I started planning, so I used made some measurements of the wood shed and then put it in a CAD program to work out the best layout.
    We still wanted to use part of the wood shed for storage of some garden cushions and of course, wood. In the end I based the design on my uncle's sauna and adapted it
    to the size and materials I could work with (plus, his sauna is electric and free-standing, so it was just a rough starting point).
</P>
<P>
    With the plan drawn up, and happy with the design, I used it to calculate the amount of material I would need and ordered the framing materials, concrete, panelling and bench wood.
    I had a bunch of leftover fiberglass insulation and some plastic sheeting that I could use for the moisture barrier which saved a bit of money.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[1]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[2]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[3]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[4]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    After the materials arrived, I<Reference text="I will use 'I' throughout this article, but some friends, one in particular lent a hand throughout the process, as well as my partner" /> 
    dug 6 foot pads and filled them with concrete to make a nice base for the sauna to sit on, ensuring that it was as level as possible. When it was cured, I started
    on the floor framing, using double 50x150mm beams to support the floor and the walls around the edges and the bearers were 50x150mm, and the same for the noggins.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[5]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[6]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[7]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[8]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    Next up was the framing. I started with the back and sides, and it went fairly well, and everything was perfectly level, there are also extra supports to attach the benches to. What was frustrating is that I realised later I made a boo-boo when
    it came to the corners. It doesn't affect the structural integrity, but it did mean that when the wall panelling eventually went on, in the back and front corners, there was nothing to nail the boards
    onto, just don't tell anyone. I also put a double header in the front wall to support the door frame (even though there's no roof going on the sauna, just the ceiling and insulation), in theory...I could
    take the sauna out of the wood shed and put a roof and external wall onto it and it would be a free-standing sauna. I also wanted to make use of the existing window in the wood shed to let some light in. It worked
    quite well just framing around it, and the existing window was already double-glazed.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[9]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[10]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[11]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[12]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    Once the walls were done, it was time for the insulation. Inside is a layer of plastic moisture barrier, then fiberglass batts inside the framing, and on the outside is a layer of roofing underlay that serves the dual
    purposes of holding the insulation in and providing an extra layer of insulation and protection for the fiberglass. The insulation was done before the ceiling because of the limited space above and it made it easier to fix
    everything in place without the ceiling getting in the way.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[13]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[14]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[15]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[16]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    Around this time the stove arrived<Reference text="I got a really awesome deal on a Harvia Pro 20, which I couldn't pass up...it ended up being cheaper than smaller wood stoves and vastly cheaper than even the cheapest electric stoves.
    Electric wasn't an option anyway because the wood shed doesn't have any mains connection and I'm not legally allowed to dig in underground wiring here." />, and of course I just wanted everything done so we could enjoy the sauna, 
    but still there was a lot of work left to do. Next up I used whatever wood I had left to make the ceiling beams and fixed them to the framing,
    and the insulation treatment for the ceiling was the same as the walls, with the addition of a plastic mesh for support. With all the framing and insulation done, the panelling could begin.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[17]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[18]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[19]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[20]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    After the panelling was the bench construction. I wanted to make the benches without legs, which is why there was the extra structural support in the framing to fix the bench supports onto.
    The bench framing uses double 50x100mm beams, and the smaller side benches attach to the wall and the front of the larger bench. I think it makes it look really nice, and so far we've had 10+ people
    in the sauna at the same time and the whole thing is solid as a rock (benches and frame).
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[21]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[22]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[23]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[24]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    For the inside work, I still needed a pad for the stove to sit on, which I just formed up and poured in some concrete, it turned out quite nice and we painted it black. To protect the walls and reduce fire hazard,
    I used some fire-proof wall boards on the side of and behind the stove, and painted them with high temperature paint to make it look nicely finished. The door was made with a plywood core, and some rough pine for the
    border (it was just the cheapest that was available but it was untreated of course). The outside I attached vertical pine boards, and on the inside I used the offcuts from the wall panelling fixed horizontally. For the
    inside handle I just used a piece of leftover bench wood and sanded it down. The outside handle is just a metal gate handle but it looks nice.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[25]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[26]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[27]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[28]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    With all that out of the way, it was time to make some holes for the vent, I just used a holesaw and then fed in some hot water pipes, and used some leftover wall panelling to make a little sliding hatch.
    Now for the hands-down hardest part of the whole build...the chimney. What a nightmare. I thought it would be easy, but due to weather and me just not having any experience with it, I ended up having to re-do it
    after it was leaking. I did make a nice cutout to decorate the ceiling on the inside, and I had to bash my own surround for where the chimney exits the roof, and I made a custom chimney cap as well. But it all works,
    and again, we just sprayed the inside part with heatproof black paint which definitely finishes it off nicely.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[29]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[30]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[31]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[32]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    And that's basically it. There were a few finishing touches that needed to be done, like oiling the benches, all the wall panels had sanua wax applied, and the floor was done with some deck coating to protect it from the moisture.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[33]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[34]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[35]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[36]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    After a lot of hard work, we could enjoy the sauna. I added a cheap waterproof rechargeable bluetooth speaker and some LED pool lights that sit on the floor, it adds some nice atmosphere, along with the lantern candles outside.
</P>
<div class="flex flex-row flex-wrap items-start">
    <EnhancedImg image={images[37]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[38]} figClass="mb-4 lg:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[39]} figClass="mb-4 sm:pe-2 flex-full sm:basis-1/2 lg:basis-1/4" />
    <EnhancedImg image={images[40]} figClass="mb-4 flex-full sm:basis-1/2 lg:basis-1/4" />
</div>
<P>
    After all of that, I mounted a shower outside which can be connected via a hose connecting to an external tap on the house, I just found one of these dual handheld / rain shower heads on sale at Lidl and it's perfect.
</P>
<figure class="h-svh">
    <video controls muted class="mx-auto h-5/6">
        <source src="/_assets/media/_vault/sauna/sauna_nosound.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    <figcaption class="h-1/6 mt-2 text-sm text-center text-gray-500 dark:text-gray-400">The sauna in action 🔥🔥🤘</figcaption>
</figure>
<P>
    I'm really happy with how everything turned out, and since building it, we've used it on average at least twice a week, and often when we have visitors we end up using it even more! It's such a great way to relax,
    and it's a nice place to sit and chat, and there's no real chance of other distractions.
</P>
