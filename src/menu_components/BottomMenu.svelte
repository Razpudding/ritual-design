<script>
	import { maxProperty } from '../helpers/utils.js'
	import RemoveShape from './RemoveShape.svelte'
	import Button from './Button.svelte'

	import { slots, shapes, centerText, maxSlotID, notifications } from '../stores.js'

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
			$notifications = $notifications.concat({id: maxProperty($notifications, 'id')+1, text: "Can't remove last available slot"})
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
	* {
		padding: 1em;
	}

  .UIComponents {
  	position: fixed;
  	bottom:0;
		width:100%;
		height:10%;
		background: #76c7daa3;
  }
</style>