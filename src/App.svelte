<!-- Svelte: https://www.youtube.com/watch?v=aZzGvfnw8Zw&ab_channel=NoahGlaser -->
<!-- Native: https://svelte.dev/repl/adf5a97b91164c239cc1e6d0c76c2abe?version=3.14.1 -->

<script>
	/*
	* TODO: format code, remove ;
	* 			maintain order of elements in dropped zone
	*/

	import Shape from './Shape.svelte'
	let menuShapeElement
	let shapes = [
		{	type: 'rect', id: 0, slot: null },
		{	type: 'rect', id: 1, slot: null },
		{	type: 'rect', id: 2, slot: null }
	]
	let slots = [
		{},{},{}
	]
	let dropped1 = []
	let dropped2 = []
	let dropped_in
	let status = 'Start dragging'

  function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	console.log("draggiong", menuShapeElement)
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}

	function handleDragDrop(e) {
		console.log(e.target)
	  e.preventDefault()
	  const element_id = e
	      .dataTransfer
	      .getData("text")
	  const slotId = e.target.id.split("slot")[1] //🤢
	  shapes.find(shape => shape.id == element_id).slot = slotId
	  console.log(slots, shapes)
	  shapes = shapes //TODO: test if this is needed
	  dropped_in = true;
	  status = ("You droped " + element_id + " into drop zone")
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
</script>


<section class='menu-left'>
	<h1>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot, i}
			<div 
				on:dragenter={handleDragEnter} 
				on:dragleave={handleDragLeave}  
				on:drop={handleDragDrop} 
				id={'slot'+i}
				class="slot" 
				ondragover="return false"
			>
				<!-- TODO: solve this by having the parent component pass its id as a prop https://stackoverflow.com/questions/62752123/get-reference-to-root-element-of-component-in-svelte -->
				{#if shapes.find(s => s.slot == i)}
					<p class="shapes">
					Dropped item {shapes.find(s => s.slot == i).id}
					</p>
				{/if}
			</div>
		{/each}
	</div>
	{#each shapes as { id }, i}
		<p 
			on:dragstart={dragstart} 
			draggable="true"
			id = {id}
			class='shapes'
		>Draggable item {id}</p>
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

  .shapes {
    display: inline-block;
    background-color: #FFF3CC;
    border-bottom: #DFBC6A 1px solid;
    margin: 10px;
    padding: 8px;
    font-size: 18px;
    text-align: center;
    box-shadow: 2px 2px 2px #999;
    cursor: move;
  }

  .slotsContainer {
  	display:grid;
  	grid-template-columns: 1fr 1fr 1fr;
  	grid-column-gap: 1em;
  	height: 4em;
  	padding: 1em;
  }
</style>