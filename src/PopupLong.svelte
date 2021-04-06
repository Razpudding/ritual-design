<script>
  export let message
  export let items
</script>

<h1>🎉 {message} 🍾</h1>

<ul>
	{#each items as item (item.id)}
	<li>{item.text}</li>
	{/each}
</ul>

<style>
  h1 {
		font-size: 2rem;
		text-align: center;
	}
</style>