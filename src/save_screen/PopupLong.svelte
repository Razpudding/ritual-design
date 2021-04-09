<script>
	import DesignCard from './DesignCard.svelte'
  import Button from '../menu_components/Button.svelte'
  import { shapes, slots, savedDesigns } from '../stores.js'

  export let message

  console.log('popup loaded with', $savedDesigns)
  let selectedId

  function selectDesign(id){
  	selectedId = id
  	console.log("selected design", selectedId)
  }

  function loadDesign(){
    let save = $savedDesigns.find(i => i.id == selectedId)
    if (save == undefined) { 
      console.log("no save found for this id", selectedId)
      return
    }
    //TODO: Find a better nullcheck here. This might cause issues if the array of slots is empty for instance
    if (save.shapes && save.slots){
      console.log("Loading data for design", save)
      $shapes = save.shapes.map(s => ({...s}))
      $slots = save.slots.map(s => ({...s}))
    }
    else {
      console.log("Invalid save", save)
    }
  }
</script>

<h1>{message}</h1>

<ul>
	{#each $savedDesigns as item (item.id)}
		<DesignCard {item} on:click={selectDesign(item.id)}/>
	{/each}
</ul>

{#if selectedId == undefined}
  <Button on:click text='New Design'/>
{:else}
	<Button on:click={loadDesign} text='Load Design'/>
  <Button on:click text='Overwrite Design'/>
{/if}

<style>
  h1 {
		font-size: 2rem;
		text-align: center;
	}
</style>