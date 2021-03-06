<script>
  import { shapes } from './stores.js'
  export let slotData
  export let slots
  export let status
  export let filled = false
  export let rotation = '20deg'

  //On drop, find the id of the shape dropped and update that shape to reflect this slot
	function handleDragDrop(e) {
    e.preventDefault()
    const element_id = e
        .dataTransfer
        .getData("text")
    const myShape = $shapes.find(shape => shape.id == element_id)
    const duplicate = slots.find(s => s.shape == myShape.id)
    if (duplicate){
      console.log("duplicate found", duplicate)
      duplicate.shape = null
    } 
    //Bind the slot to the shape and visa versa
    slotData.shape = myShape.id
    myShape.slot = slotData.id
    console.log($shapes)
    console.log(slots)
    //TODO: check if slots needs to be updated here?
    slots = slots
    $shapes = $shapes
    status = ("You dropped " + element_id + " into drop zone " + slotData.id)
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
  id={slotData.id}
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