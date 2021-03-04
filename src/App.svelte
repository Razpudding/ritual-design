<script>
	/*
	* TODO: 
	* Slot adding and removing should be done in a proper function which checks which slots are safe to remove (empty) and maybe where a slot should be added visually. Removing a slot with a shape should prob get rid of the shape data as well
	* Add color change option
	* !Add way to change a placed shape's properties
	* !Add way to write own text, add random option, 
	* Write a proper readme
	* Remove logic that expect multiple shapes in the menu and multiple per slot
	* clean up slot now that it's connected to thisSlot (rename to shapeData and slotData?)
	* A slot should be cleared when a shape is dragged out of it :()
	* Slots need to be re-rotated when one is removed? Could be recalc inside the slot
	*/
	import { onMount } from 'svelte'
	import { shapes } from './stores.js';
	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'
	import Dropdown from './Dropdown.svelte'
	import {loadData, generateText} from './dataHandler.js'
	//Initialize variables
	$shapes.push({	type: 'rect', id: 0, slot: null, text:"" })
	let slots = []
	for (let i = 0; i < 5; i ++){
		slots.push({ id: i+1, shape: null })
	}

	let categories = []
	let words = [[]]
	let currentCategory = 0
	let currentWord = ''
	let status = 'Start dragging'

	//Reactive var that checks if a new shape is needed in the menu
	$: newShapeNeeded = $shapes[$shapes.length -1].slot != null ? freshShape(): console.log("not needed")

	//Create a fresh shape and add it to the shapes store
	function freshShape(){
		const newShape = {...$shapes[$shapes.length -1]}
		newShape.slot = null
		newShape.id += 1
		newShape.text = (currentWord == ''? currentCategory : currentWord)
		$shapes = $shapes.concat(newShape)
	}
	function changeCategory(e){
		console.log("changing cat to", e.detail.text)
		currentCategory = e.detail.text
		currentWord = words[currentCategory][0]
		$shapes[$shapes.length-1].text = currentWord
		//Overwrite the selected value of the word selector
		document.getElementById('dropdownWord').options[0].selected = true
		console.log("changing word to", currentWord)
	}
	function changeWord(e){
		console.log("changing word to", e.detail.text)
		currentWord = e.detail.text
		$shapes[$shapes.length-1].text = currentWord
	}
	//Check if a slot can be removed, if not, call self with prev slot
	//TODO: if no slot can be safely removed, alert user
	// Ah this wont work with just empty values in an array, slots will need to be a bit more complex
	function removeSlot(index){
		console.log("remove called with", index, slots)
		if (slots[index].shape === null){
			console.log(index, 'safe to remove')
			slots.splice(index, 1)
			slots = slots
		} else {
			index > 0 ? removeSlot(--index) : console.log("no slots can be removed")
		}
	}
	//Load the word data and set variables
	onMount(async () => {
		const wordData = await loadData('assets/taxonomy_0.csv')
		console.log('wordData', wordData)
		categories = Object.keys(wordData)
		//Add the name of the category to each word array belonging to that category
		for (let category in wordData){
			wordData[category].unshift(category)
		}
		words = wordData
		currentCategory = currentWord = categories[0]
		$shapes[0].text = currentCategory
	})
</script>

<section class='menu'>
	<Dropdown
		title='Category'
		options={categories}
		on:selection={changeCategory}
		id='dropdownCat'
	/>
	<Dropdown
		title='Word'
		options={words[currentCategory]}
		on:selection={changeWord}
		id='dropdownWord'
	/>
	<h1>Shape</h1>
	{#each $shapes.filter(s => s.slot === null) as shape (shape.id)}
		<Shape
			thisShape={shape}
		/>
	{/each}
</section>
<section class='content'>
	<h1 class='status'>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot}
			<Slot
				thisSlot={slot}
				slots={slots}
				bind:status={status}
				filled={$shapes.find(s => s.slot == slot.id) !== undefined}
				rotation={(slot.id -1)*(360/slots.length)+'deg'}
			>
				{#if $shapes.find(s => s.slot == slot.id)}
					<Shape 
						thisShape={$shapes.find(s => s.slot == slot.id)}
					/>
				{/if}
			</Slot>
		{/each}
	</div>
	<div id="addSlotBtn" on:click="{e => {slots = slots.concat({ id: slots.length, shape: null }); console.log(slots)}}">Add slot</div>
	<div id="removeSlotBtn" on:click={removeSlot(slots.length-1)}>Remove slot</div>
</section>

<style>
	.menu {
		height: 100%;
		width: 25%;
		position: fixed;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: lightgreen; 
		overflow-x: hidden; /* Disable horizontal scroll */
		padding: 1em;
		clear: left;
	}

	.content {
		width: 70%;
		float: right;
		margin: auto;
	}

  .slotsContainer {
		position: relative;
		width: 100%;
		height: 100%;
  }

  .status {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		visibility: hidden;
	}

	#addSlotBtn {
		position: absolute;
  	bottom: 1em;
	}
	#removeSlotBtn {
		position: absolute;
  	bottom: 1em;
  	right: 1em;
	}
</style>