<script>
  import { shapes, slots } from '../stores.js'
  
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
  class="btn"
  >Remove Shape
</div>

<style>
  div {
    display:inline-block;
    width: 5em;
    margin: auto;
    color:#444;
    border:1px dotted #CCC;
    background:#fc7a5d;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    vertical-align:middle;
    padding: 5px;
    text-align: center;
    right: 40%;
    position:absolute;
  }
</style>