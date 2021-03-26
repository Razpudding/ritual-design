<script>
  import { shapes } from './stores.js'
  export let slotData
  export let slots
  export let filled = false
  export let rotation = '20deg'
  //On drop, find the id of the shape dropped and update that shape to reflect this slot
	function handleDragDrop(e) {
    e.preventDefault()
    if (!filled){
      const element_id = e
          .dataTransfer
          .getData("text")
      const myShape = $shapes.find(shape => shape.id == element_id)
      //If the shape was dropped from another slot, clear that slot
      const duplicate = slots.find(s => s.shape == myShape.id)
      if (duplicate){
        duplicate.shape = null
      } 
      //Bind the slot to the shape and visa versa
      slotData.shape = myShape.id
      myShape.slot = slotData.id
      //TODO: check if slots needs to be updated here?
      // slots = slots
      $shapes = $shapes
      filled = true
      //TODO: check if return value is needed here
      return false
    } 
    return true
  }

  //Calculate if a slots shape needs to be rotated
  //If the slot's rotation >90 and smaller than 270 and the slot is filled, update shapedata so the shape knows to rotate
  $: if (filled){
    const myShape = $shapes.find(shape => shape.slot == slotData.id)
    myShape.rotated = (parseInt(rotation, 10) >= 90 && parseInt(rotation, 10) < 270)
  }

  function handleDragOver(e) {
    if (filled){
      console.log("full")
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