<script>
	export let item
</script>

<div on:click>
	<h2>#{item.id}</h2>
	<span>{item.title}</span>
</div>

<style>
	div {
		background-color: lightgreen
	}
</style>