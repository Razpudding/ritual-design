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

	function handleDragDrop(e) {
		console.log(e.target)
	  e.preventDefault()
	  const element_id = e
	      .dataTransfer
	      .getData("text")
	  const slotId = e.target.id.split("slot")[1] //🤢
	  shapes.find(shape => shape.id == element_id).slot = slotId
	  console.log(slots, shapes)
	  shapes = shapes //😕
	  status = ("You dropped " + element_id + " into drop zone")
  }

  function handleDragEnter(e) {
    status = "You are dragging over the " + e
        .target
        .getAttribute('id');
    console.log(status)
  }

  function handleDragLeave(e) {
    status = "You left the " + e
        .target
        .getAttribute('id')
    console.log(status)
  }

  function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	console.log("draggiong",  ev.target.getAttribute('id'))
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}
</script>

<section class='menu-left'>
	<h1>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot, i}
			<div 
				on:drop={handleDragDrop} 
				id={'slot'+i}
				class="slot" 
				ondragover="return false"
			>
<!-- 			<Slot
				id={i}
				shapes={shapes}
			> -->
				{#if shapes.find(s => s.slot == i)}
					<Shape 
						text={'Draggable item' + shapes.find(s => s.slot == i).id}
						class="shapes"
					/>
				{/if}
			</div>
		{/each}
	</div>
	{#each shapes.filter(s => s.slot === null) as { id }, i}
		<Shape 
			text={'Draggable item' + id}
			{id}
			class="shapes"
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

	.slot {
    background-color: #eee;
    border: #999 1px dashed ;
    padding: 8px;
    font-size: 19px;
  }

  .slotsContainer {
  	display:grid;
  	grid-template-columns: 1fr 1fr 1fr;
  	grid-column-gap: 1em;
  	height: 4em;
  	padding: 1em;
  }
</style>