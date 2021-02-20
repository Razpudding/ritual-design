<!-- Svelte: https://www.youtube.com/watch?v=aZzGvfnw8Zw&ab_channel=NoahGlaser -->
<!-- Native: https://svelte.dev/repl/adf5a97b91164c239cc1e6d0c76c2abe?version=3.14.1 -->

<script>
	/*
	* TODO: format code, remove ;
	* 			maintain order of elements in dropped zone
	*/

	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'
	import Dropdown from './Dropdown.svelte'

	let shapes = [
		{	type: 'rect', id: 0, slot: null },
		{	type: 'rect', id: 1, slot: null },
		{	type: 'rect', id: 2, slot: null }
	]
	let slots = new Array(shapes.length)
	let status = 'Start dragging'
	let categories = ['nose','ears','knees','toes']
	let category = categories[0]
</script>
<section class='menu'>
	<Dropdown
		title=''
		options={categories}
		bind:selected={category}
	/>
	{#each shapes.filter(s => s.slot === null) as { id } (id)}
		<Shape
			text={category}
			_text={'Draggable item' + id}
			{id}
		/>
	{/each}
</section>
<section class='content'>
	<h1>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot, i}
			<Slot
				id={i}
				bind:shapes={shapes}
				bind:status={status}
				filled={shapes.find(s => s.slot == i) !== undefined}
			>
				{#if shapes.find(s => s.slot == i)}
					<Shape 
						bind:shapes={shapes}
						text={'Draggable item' + shapes.find(s => s.slot == i).id}
						id={shapes.find(s => s.slot == i).id}
						inContainer=true
					/>
				{/if}
			</Slot>
		{/each}
	</div>
</section>

<style>
	.menu {
		height: 100%; /* 100% Full-height */
		width: 25%; /* 0 width - change this with JavaScript */
		position: fixed; /* Stay in place */
		z-index: 1; /* Stay on top */
		top: 0; /* Stay at the top */
		left: 0;
		background-color: lightgreen; /* Black*/
		overflow-x: hidden; /* Disable horizontal scroll */
		padding-top: 60px; /* Place content 60px from the top */
		transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
		clear: left;
	}

	.content {
		width: 75%;
		float: right;
		margin: auto;
	}
  .slotsContainer {
  	display:grid;
  	grid-template-columns: 1fr 1fr 1fr;
  	grid-column-gap: 1em;
  	height: 4em;
  	padding: 1em;
  }

  h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>