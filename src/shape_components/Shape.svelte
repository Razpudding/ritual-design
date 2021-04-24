<script>
  import { fontSizeMod } from '../stores.js'
	import fontColorContrast from 'font-color-contrast'
	export let shapeData
  export let type = "inUse"
  export let draggable = true
  export let disabled = false
  export let fontSize = "1.2em"

  let fontSizeLocal
  //If the shape is used in a design in progress and has been placed in a slot, modify the fontsize according to the global setting
  $: if(type == "inUse" && shapeData.slot !== null){
    fontSizeLocal = parseFloat(fontSize, 10) * $fontSizeMod + "em" 
  } else {
    fontSizeLocal = fontSize
  }

	function dragstart(ev) {
  	// Add the target element's id to the data transfer object
  	ev.dataTransfer
       .setData("text", ev.target.getAttribute('id'));
	}
	function textColor(color){
		return fontColorContrast(color) === "#ffffff"
	}
</script>

<input 
	id = {shapeData.id}
  bind:value={shapeData.text}
  draggable={draggable}
  disabled={disabled}
	class='shape'
	class:positioned={shapeData.slot !== null}
	class:rotate={shapeData.rotated}
	class:whiteText={textColor(shapeData.color)}
	on:dragstart={dragstart} 
	
	style="--bg: {shapeData.color}; --fs: {fontSizeLocal}"
	on:change="{e => shapeData.text = shapeData.text}" 
	autocomplete="off"
>

<style>
  .shape, .shape:disabled {
    background-color: var(--bg);
    border: 1px solid black;
    padding: .3em;
    font-size: var(--fs);
    text-align: center;
    cursor: move;
    color: black;
  }

  .triangle {
      width: 0;
      height: 0;
      border-left: 40px solid transparent;
      border-right: 40px solid transparent;
      border-bottom: 80px solid lightblue;
  }

  .positioned {
  	width: 100%;
  	height: 100%;
  }

  .rotate {
		transform: rotate(-180deg);
  }

  .whiteText, .whiteText:disabled {
  	color: white;
  }
</style>