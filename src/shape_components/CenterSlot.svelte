<script>
  import { onMount } from 'svelte'
  import { shapes, centerText } from '../stores.js'
  let textAr = false
  // let fontSize
  let minSize = 0

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

  function isOverflown(element) {
      if (textAr){
        console.log("element.scrollHeight", element.scrollHeight)
        return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
      }
      return false
      
  }

  // onMount(() => {
  //   fontSize = parseInt(textAr.style.fontSize)
  //   console.log("center mounted", textAr,  textAr.style)
  // })
  
  // $: if (fontSize && isOverflown(textAr)) { el.style.fontSize = (--fontSize + "px") }

  $: fontSize = textAr && (textAr.scrollHeight > textAr.clientHeight || textAr.scrollWidth > textAr.clientWidth) ? minSize : 18  
  
</script>

<div
  on:drop={handleDragDrop} 
  on:dragover={handleDragOver}
  >
  <textarea 
    style="font-size: {fontSize + 'px'}"
    bind:this={textAr}
    rows='7'
    type=text
    bind:value={$centerText}
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
    font-size: 80px;
  }
</style>