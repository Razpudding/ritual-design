<script>
	export let id = -1
  export let shapes

	function handleDragDrop(e) {
    console.log(e.target)
    e.preventDefault()
    const element_id = e
        .dataTransfer
        .getData("text")
    const slotId = e.target.id.split("slot")[1] //🤢
    shapes.find(shape => shape.id == element_id).slot = slotId
    console.log(shapes)
    shapes = shapes //😕
    status = ("You dropped " + element_id + " into drop zone")
  }
</script>

<div
	on:drop={handleDragDrop} 
  id={'slot'+id}
  class="slot" 
  ondragover="return false"
>
  <slot></slot>
</div>

<style>
  .slot {
    background-color: #eee;
    border: #999 1px dashed ;
    padding: 8px;
    font-size: 19px;
  }
</style>