<script>
	//TODO: On closing the popup, all state vars should be reset to false
	import { shapes, slots, savedDesigns, currentSave, centerText } from '../stores.js'
	import Button from '../menu_components/Button.svelte'
	
	let exportString
	let inputtingData
	let inputString
	let loadedData

	let newSaveID

	function exportCurrentSave(){
		exportString = JSON.stringify($savedDesigns.find(save => save.id == $currentSave))
		console.log(exportString)
	}

	function loadSaveData(){
		const inputData = JSON.parse(inputString)

		//TODO add XSS protection through escaping of special chars, add better input validation to make sure the save is not malformed
		if (inputData.shapes && inputData.slots && inputData.title !== undefined){
			console.log("Valid data, loading into store")
			newSaveID = ($savedDesigns.length > 0 ? Math.max(...$savedDesigns.map(s => s.id)) : 0) + 1
			$savedDesigns.push({
				id: newSaveID,
				shapes: inputData.shapes,
				slots: inputData.slots,
				title: inputData.title
			})
			console.log($savedDesigns)
			//Render the app to match the newly loaded data
			loadedData = true
		}
		else { console.log("invalid save data", inputData)}
	}

	function showSaveInput(){
		inputtingData = true
	}
</script>

<Button on:click={showSaveInput} text="Import save"/>
{#if inputtingData}
	<h1>Paste data previously copied from this app here</h1>
	<input type="text" bind:value={inputString}>
	<Button on:click={loadSaveData} text="Load data"/>
	{#if loadedData}
		<h1>Data has been saved as design {newSaveID}</h1>
		<span>You can load this design in the 'Manage Saves' screen</span>
	{/if}
{/if}

<Button on:click={exportCurrentSave} text="Export save #{$currentSave}"/>
{#if exportString}
	<h1>Copy the following text and save it somewhere</h1>
	<span>{exportString}</span>
{/if}