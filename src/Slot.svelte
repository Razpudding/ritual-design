<script>
	export let id = -1
  export let shapes
  export let status
  export let filled = false

	function handleDragDrop(e) {
    e.preventDefault()
    const element_id = e
        .dataTransfer
        .getData("text")
    const slotId = e.target.id.split("slot")[1] //🤢
    shapes.find(shape => shape.id == element_id).slot = slotId
    console.log(shapes)
    shapes = shapes //😕
    status = ("You dropped " + element_id + " into drop zone " + id)
    filled = true
  }

  function handleDragOver(e) {
    if (filled){
      return true
    }
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }
</script>

<div
	on:drop={handleDragDrop} 
  on:dragover={handleDragOver}
  id={'slot'+id}
  class="slot"
  class:filled={filled}
>
  <slot></slot>
</div>

<style>
  .slot {
    background-color: #eee;
    border: #999 1px dashed ;
  }

  .filled {
    background-color: #faa;
  }
</style>