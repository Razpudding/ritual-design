<script>
  import { createEventDispatcher } from 'svelte';
  export let title
  export let options
  export let selected = ''
  export let id

  const dispatch = createEventDispatcher()

  function makeSelection(){
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
  h1 {
    font-family: Verdana;
    font-weight: 300;
  }

  select {
    float: left;
    width: 75%;
    padding: 0;
    background-color: transparent;
    border: none;
    font-size: larger;
    color: darkslateblue;
    font-weight: 400;
    font-style: italic;
    border-bottom: 1px solid darkslateblue;
    -webkit-appearance:none;
  }
  .clearBoth {
    clear: both;
  }
</style>