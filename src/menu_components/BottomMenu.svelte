<script>
	import RemoveShape from './RemoveShape.svelte'
	import Button from './Button.svelte'

	import { slots, shapes, centerText, maxSlotID } from '../stores.js'

	// $: maxSlotID = $slots.length > 0 ? Math.max(...$slots.map(s => s.id)) : 0
	console.log($maxSlotID)
	function resetElementData(){
		console.log("Resetting element data")	
		$shapes = []
		$slots = []
		$centerText = 'New Design'
	}

	//Check if a slot can be removed, if not, call self with prev slot
	function removeSlot(index){
		if ($slots.length > 1){
			if ($slots[index].shape === null){
				$slots.splice(index, 1)
				$slots = $slots
			} else {
				index > 0 ? removeSlot(--index) : console.log("no slots are empty")
			}
		} else {
			console.log("can't remove last slot")
		}
	}
</script>

<div class='UIComponents'>
	<Button on:click="{() => $slots=$slots.concat({id:$maxSlotID +1, shape:null})}" text="Add slot"/>
	<Button on:click={removeSlot($slots.length-1)} text="Remove slot"/>
	<Button on:click={resetElementData} text="Start from scratch"/>
	<RemoveShape/>
</div>

<style>
  .UIComponents {
  	position: fixed;
  	bottom:0;
		width:100%;
		height:10%;
		background: lightgreen;
  }
</style>