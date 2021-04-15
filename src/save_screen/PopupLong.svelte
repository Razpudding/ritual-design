<script>
  import { getContext } from 'svelte';
	import DesignCard from './DesignCard.svelte'
  import Button from '../menu_components/Button.svelte'
  import { shapes, slots, savedDesigns, currentSave, centerText } from '../stores.js'

  const { close } = getContext('simple-modal')

  export let message

  let selectedId


  //TODO: remove this after fixing bug
  console.log("Loading popup with savedDesigns", $savedDesigns)

  function createNewDesign(){
    const maxID = Math.max(...$savedDesigns.map(s => s.id))
    $savedDesigns = $savedDesigns.concat({id:maxID + 1, title:'New Design', shapes:[], slots:[]})
  }

  //TODO: Maybe move this to a helper js module so loading can be done from other places as well.
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
      $currentSave = save.id
      $centerText = save.title
      close()
    }
    else {
      console.log("Invalid save", save)
    }
  }
</script>

<h1>{message}</h1>

<ul>
	{#each $savedDesigns as item (item.id)}
    <div class:selected="{selectedId == item.id}">
  		<DesignCard 
        {item} 
        on:click={()=>{selectedId = item.id}}
        />
    </div>
	{/each}
</ul>


<Button on:click={createNewDesign} text='New Design'/>
{#if selectedId !== undefined}
	<Button on:click={loadDesign} text='Load Design' optionalClass={'float-right'}/>
{/if}

<style>
  h1 {
		font-size: 2rem;
		text-align: center;
	}

  div {
    display: inline-block;
    margin: 1em;
  }

  .selected{
    border: green 3px dotted;
  }
</style>