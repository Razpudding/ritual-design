<script>
	import { slots } from '../stores.js'
	import Button from './Button.svelte'

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

<Button on:click={removeSlot($slots.length-1)} text="Remove slot"/>