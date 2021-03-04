<script>
	export let text = ''
	export let id = -1
	export let shapes = [] //TODO find out if reactivity of shapes can be triggered through altering one single shape in the array so this prop can be removed
	export let thisShape
	export let inContainer = false

	function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	console.log("dragging", id)
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}
	//TODO: Move this whole function to the slot? Put the event listener on the slot which return the slotted shape through Svelte slot funct.
	function clickHandler(e) {
		if (thisShape.slot == null){
			//TODO: make text writeable. Maybe it's better to use content editable or smth like that and put the check in that event handler instead
		} else {
			shapes = shapes
		}
	}

	function updateText(e){
		console.log("changing text", thisShape)
		thisShape.text = text
	}
</script>

<input 
	type=text
	draggable="true"
	id = {id}
	class='shapes'
	class:positioned={inContainer}
	on:dragstart={dragstart} 
	on:_click={clickHandler}
	bind:value={text}
	on:change={updateText}
>

<style>
  .shapes {
    background-color: #FFF3CC;
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
  	margin: 0;
  	padding: 0;
  }
</style>