<script lang="ts">
	/**
	 * A link to a figure, by its id: <Ref to="wiring-diagram" /> reads "fig.06".
	 * The number is filled in by the vault layout, which numbers the figures in document order.
	 */
	let { to }: { to: string } = $props();
</script>

<a href="#{to}" data-fig-ref>fig.</a>
