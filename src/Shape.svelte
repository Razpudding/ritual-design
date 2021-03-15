<script>
	export let id = -1
	export let shapeData 
	function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	console.log("dragging", id)
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}
</script>

<input 
	type=text
	draggable="true"
	id = {shapeData.id}
	class='shape'
	class:positioned={shapeData.slot !== null}
	class:rotate={shapeData.rotated}
	on:dragstart={dragstart} 
	bind:value={shapeData.text}
	style="--bg: {shapeData.color}"
	on:change="{e => shapeData.text = shapeData.text}" 
>

<style>
  .shape {
    background-color: var(--bg);
    border-bottom: #DFBC6A 1px solid;
    padding: .3em;
    font-size: 1.2em;
    text-align: center;
    box-shadow: 2px 2px 2px #999;
    cursor: move;
  }

  .positioned {
  	width: 100%;
  	height: 100%;
  }

  .rotate {
		transform: rotate(-180deg);
  }
</style>