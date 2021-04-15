<script>
  import { shapes, centerText } from '../stores.js'
  export let disabled = false

  function handleDragDrop(e) {
    console.log(e)
    e.preventDefault()
    const element_id = e
      .dataTransfer
      .getData("text")
    $centerText = $shapes.find(s => s.id == element_id).text
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }  
</script>

<div
  on:drop={handleDragDrop} 
  on:dragover={handleDragOver}
  >
  <textarea 
    rows='7'
    type=text
    bind:value={$centerText}
    disabled={disabled} 
  />
</div>

<style>
  div {
    position: relative;
    background: lightblue;
    border-radius: 50%;
    width: 21%;
    height: 25%;
    margin: auto;
    bottom: 9%;
  }

  textarea {
    width: 80%;
    position: relative;
    top: 20%;
    left: 10%;
    background-color: transparent;
    font-weight: bolder;
    text-align: center;
    resize: none;
    overflow: hidden;
    border: none;
  }
</style>