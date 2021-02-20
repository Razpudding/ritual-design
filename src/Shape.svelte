<script>
	export let text = ''
	export let id = -1
	export let shapes
	export let inContainer = false

	function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	console.log("dragging", id)
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}
	function clickHandler(e) {
		if (!shapes) return
		shapes.find(shape => shape.id == e.target.id).slot = null
		shapes = shapes
	}
</script>

<p
	on:dragstart={dragstart} 
	on:click={clickHandler}
	draggable="true"
	id = {id}
	class='shapes'
	class:positioned={inContainer}
	>{text}
</p>

<style>
  .shapes {
    background-color: #FFF3CC;
    border-bottom: #DFBC6A 1px solid;
    margin: 10px;
    padding: 8px;
    font-size: 18px;
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