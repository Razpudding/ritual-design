<script>
	import { savedDesigns, shapes, slots, currentSave, centerText } from '../stores.js'
	import DesignCard from '../save_screen/DesignCard.svelte'

	//TODO: Move this and the version in exportimport to a helper js module so loading can be done from other places as well.
	function loadDesign(id){
	  let save = $savedDesigns.find(i => i.id == id)
	  if (save == undefined) { 
	    console.log("no save found for this id", selectedId)
	    return
	  }
	  //TODO: Find a better nullcheck here. This might cause issues if the array of slots is empty for instance
	  if (save.shapes && save.slots){
	    console.log("Loading data for design", save)
	    $shapes = save.shapes.map(s => ({...s}))
	    $slots = save.slots.map(s => ({...s}))
	    $currentSave = save.id
	    $centerText = save.title
	  }
	  else {
	    console.log("Invalid save", save)
	  }
	}
</script>


	{#each $savedDesigns as item (item.id)}
	<div class="cardContainer">
		<DesignCard
	    {item}
	    on:click={()=>{loadDesign(item.id)}}
	    designSize={.3}
	    />
	</div>
	{/each}


<style>
	.cardContainer {
		height: 8.5em;
		list-style-type: none;
	}
</style>