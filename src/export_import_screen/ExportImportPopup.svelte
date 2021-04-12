<script>
	import { savedDesigns, currentSave } from '../stores.js'
	import Button from '../menu_components/Button.svelte'

	function exportCurrentSave(){
		console.log(JSON.stringify($savedDesigns.find(save => save.id == $currentSave)))
	}
</script>

<Button on:click={exportCurrentSave} text="Export save #{$currentSave}"/>