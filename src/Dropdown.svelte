<script>
  import { createEventDispatcher } from 'svelte';
  export let title
  export let options
  export let selected = ''
  export let id

  const dispatch = createEventDispatcher()

  function makeSelection(){
    console.log("makeSelection")
    dispatch('selection', {
      text: selected
    })
  }
</script>

<div>
  <h1 class=clearBoth>{title}</h1>
  <select id={id} bind:value={selected} on:change={makeSelection}>
    {#each options as option}
      <option value={option}>{option}
    {/each}
  </select>
</div>

<style>
  select {
    float: left;
  }
  .clearBoth {
    clear:both;
  }
</style>