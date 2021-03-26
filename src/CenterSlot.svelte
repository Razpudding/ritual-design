<script>
  import { shapes } from './stores.js'
  export let slots
  let centerText = ''

  function handleDragDrop(e) {
    console.log("Setting middle text")
    
    e.preventDefault()
    const element_id = e
      .dataTransfer
      .getData("text")
    centerText = $shapes.find(s => s.id == element_id).text
    console.log(centerText)
    
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
  <input
    type=text
    bind:value={centerText}
  >
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
  input {
    width: 80%;
    position: relative;
    top: 40%;
    left: 10%;
    background-color: transparent;
    font-weight: bolder;
    text-align: center;
  }
</style>