<script>
	export let item
</script>

<div on:click>
	<h2>#{item.id}</h2>
	<span>{item.title}</span>
</div>

<style>
	div {
		display:inline-block;
		margin: 1em;
		background-color: lightgreen
	}
</style>