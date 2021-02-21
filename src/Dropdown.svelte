<script>
  import { createEventDispatcher } from 'svelte';
  export let title
  export let options
  export let selected

  const dispatch = createEventDispatcher()

  function makeSelection(){
    console.log("makeSelection")
    dispatch('categorySelection', {
      text: selected
    })
  }
  
</script>

<div>
  <h1>{title}</h1>
  <select bind:value={selected} on:change={makeSelection}>
    {#each options as option}
      <option value={option}>{option}
    {/each}
  </select>
  <h2>{selected}</h2>
</div>

<style>

</style>