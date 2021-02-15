<script>
	export let id = -1
  export let shapes
  export let status
  let filled = false

	function handleDragDrop(e) {
    e.preventDefault()
    const element_id = e
        .dataTransfer
        .getData("text")
    const slotId = e.target.id.split("slot")[1] //🤢
    shapes.find(shape => shape.id == element_id).slot = slotId
    console.log(shapes)
    shapes = shapes //😕
    status = ("You dropped " + element_id + " into drop zone")
    filled = true
  }

  function handleDragOver(e) {
    if (filled){
      return true
    }
    console.log("dragover")
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

  }
  //on:ondragover={handleDragOver}
  //ondragover="return false"
</script>

<div
	on:drop={handleDragDrop} 
  on:dragover={handleDragOver}
  
  id={'slot'+id}
  class="slot" 
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