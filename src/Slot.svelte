<script>
	export let id = -1
  export let shapes
  export let status
  export let filled = false
  export let currentCategory

  export let rotation = '20deg'

	function handleDragDrop(e) {
    e.preventDefault()
    const element_id = e
        .dataTransfer
        .getData("text")
    const slotId = e.target.id.split("slot")[1] //🤢
    const myShape = shapes.find(shape => shape.id == element_id)
    myShape.slot = slotId
    // myShape.text = currentCategory Don't think I need this anymore
    
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

<div style="--rot: {rotation}"
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
    display: block;
    background-color: #eee;
    border: #999 1px dashed;
    transform: rotate(var(--rot)) translateX(-50%);
    transform-origin: center right;
    position: absolute;
    left: 30%;
    height: 3em;
    width: 20%;
  }

  .filled {
    background-color: #faa;
  }
</style>