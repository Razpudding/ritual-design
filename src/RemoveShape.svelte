<script>
  import { shapes } from './stores.js'
  import { slots } from './stores.js'
  
  function handleDragDrop(e) {
    console.log("deleting shape")
    e.preventDefault()
    const element_id = e
      .dataTransfer
      .getData("text")
    
    //If the shape was dropped from another slot, clear that slot
    const duplicate = $slots.find(s => s.shape == element_id)
    if (duplicate){
      duplicate.shape = null
    }
    // slots = slots
    //Delete the dropped shape from the shapedata
    $shapes = $shapes.filter(s => s.id != element_id)
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }
</script>

<div
  on:drop={handleDragDrop} 
  on:dragover={handleDragOver}
  >Remove Shape
</div>

<style>
  div {
    width: 5em;
    margin: auto;
    color:#444;
    border:1px dotted #CCC;
    background:#fc7a5d;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    vertical-align:middle;
    padding: 5px;
    text-align: center;
    position: absolute;
    bottom: 1em;
    left: 50%;
  }
</style>