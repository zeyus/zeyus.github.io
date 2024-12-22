<script lang="ts">
  import { P } from 'flowbite-svelte';
  import { getContext } from 'svelte';
  import Reference from '../../../components/Reference.svelte';
  
  let items: Footnote[] = getContext('bibItems');
  
</script>

<P>
    So, one side of my family is from Finland, and one of the consistencies of both places I lived during my childhood 
    was the presence of a sauna. <Reference bind:items text="These places were vastly different ..." />
</P>
<P>
  Blah<Reference bind:items text="This is a test." /> blah<Reference bind:items text="This is another test" /> blah...<Reference bind:items text="This is a test." />
</P>
