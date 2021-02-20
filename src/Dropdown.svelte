<script>
  export let title
  export let options
  export let selected

</script>

<div>
  <h1>{title}</h1>
  <select bind:value={selected}>
    {#each options as option}
      <option value={option}>{option}
    {/each}
  </select>
  <h2>{selected}</h2>
</div>

<style>

</style>