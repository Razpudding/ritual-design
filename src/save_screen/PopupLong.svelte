<script>
	import DesignCard from './DesignCard.svelte'
  import Button from '../menu_components/Button.svelte'
  export let message
  export let items

  console.log(items)
  let selectedItem

  function selectDesign(id){
  	selectedItem = id
  	console.log("selected design", selectedItem)
  }
  //Each designcard can be selected. When one is selected the selecteditem reflects this
</script>

<h1>🎉 {message} 🍾</h1>

<ul>
	{#each items as item (item.id)}
		<DesignCard {item} on:click={selectDesign(item.id)}/>
	{/each}
</ul>

<Button on:click text='New Design'/>

{#if selectedItem !== undefined}
	<Button on:click text='Load Design'/>
  <Button on:click text='Overwrite Design'/>
{/if}

<style>
  h1 {
		font-size: 2rem;
		text-align: center;
	}
</style>