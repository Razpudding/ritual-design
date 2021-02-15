<!-- Svelte: https://www.youtube.com/watch?v=aZzGvfnw8Zw&ab_channel=NoahGlaser -->
<!-- Native: https://svelte.dev/repl/adf5a97b91164c239cc1e6d0c76c2abe?version=3.14.1 -->

<script>
	/*
	* TODO: format code, remove ;
	* 			maintain order of elements in dropped zone
	*/

	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'

	let shapes = [
		{	type: 'rect', id: 0, slot: null },
		{	type: 'rect', id: 1, slot: null },
		{	type: 'rect', id: 2, slot: null }
	]
	let slots = new Array(shapes.length)
	let status = 'Start dragging'
</script>

<section class='menu-left'>
	<h1>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot, i}
			<Slot
				id={i}
				bind:shapes={shapes}
				bind:status={status}
			>
				{#if shapes.find(s => s.slot == i)}
					<Shape 
						bind:shapes={shapes}
						text={'Draggable item' + shapes.find(s => s.slot == i).id}
						id={shapes.find(s => s.slot == i).id}
					/>
				{/if}
			</Slot>
		{/each}
	</div>
	{#each shapes.filter(s => s.slot === null) as { id }, i}
		<Shape 
			text={'Draggable item' + id}
			{id}
		/>
	{/each}
</section>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

  .slotsContainer {
  	display:grid;
  	grid-template-columns: 1fr 1fr 1fr;
  	grid-column-gap: 1em;
  	height: 4em;
  	padding: 1em;
  }
</style>