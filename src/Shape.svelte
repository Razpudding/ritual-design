<script>
	export let text = ''
	export let id = -1

	function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	console.log("draggiong", id)
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}
</script>

<p
	on:dragstart={dragstart} 
	draggable="true"
	id = {id}
	class='shapes'>{text}
</p>

<style>
  .shapes {
    display: inline-block;
    background-color: #FFF3CC;
    border-bottom: #DFBC6A 1px solid;
    margin: 10px;
    padding: 8px;
    font-size: 18px;
    text-align: center;
    box-shadow: 2px 2px 2px #999;
    cursor: move;
  }
</style>