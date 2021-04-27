<script>
	//TODO: On closing the popup, all state vars should be reset to false
	import { getContext } from 'svelte'
	import { shapes, slots, savedDesigns, currentSave, centerText } from '../stores.js'
	import Button from '../menu_components/Button.svelte'
	
  const { close } = getContext('simple-modal')

  let currentFunction = "initial"
	let exportString
	let inputString
	let newSaveID
	let loadedData

	function exportCurrentSave(){
		exportString = JSON.stringify($savedDesigns.find(save => save.id == $currentSave))
		currentFunction = "export"
		console.log(exportString)
	}

	function parseJSON (json){
    try {
      const result = JSON.parse(json)

      if (result && typeof result === "object") {
        return result
      }
    }
    catch (e) {
    	console.log("Error parsing JSON", e)
    }
    return false
	}

	function loadSaveData(){
		const inputData = parseJSON(inputString)

		//TODO add XSS protection through escaping of special chars, add better input validation to make sure the save is not malformed
		if (inputData.shapes && inputData.slots && inputData.title !== undefined){
			console.log("Valid data, loading into store")
			newSaveID = ($savedDesigns.length > 0 ? Math.max(...$savedDesigns.map(s => s.id)) : 0) + 1
			$savedDesigns = $savedDesigns.concat({
				id: newSaveID,
				shapes: inputData.shapes,
				slots: inputData.slots,
				title: inputData.title
			})
			console.log($savedDesigns)
			loadedData = true
		}
		else { console.log("invalid save data", inputData)}
	}
</script>

<Button on:click={() => currentFunction = "import"} text="Import save"/>
<Button on:click={exportCurrentSave} text="Export save #{$currentSave}"/>

{#if currentFunction == "import"}
	<h1>Paste data previously copied from this app here</h1>
	<input type="text" bind:value={inputString}>
	<Button on:click={loadSaveData} text="Load data"/>
	{#if loadedData}
		<h1>Data has been saved as design {newSaveID}</h1>
		<span>You can load this design in the 'Manage Saves' screen</span>
	{/if}
{:else if currentFunction == "export"}
		<h1>Copy the following text and save it somewhere</h1>
		<span>{exportString}</span>
{/if}