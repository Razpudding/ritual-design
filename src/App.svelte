<script>
	/*
	* TODO: 
	*		Turn elements into components: random button
	*		Change to Sass so components can be styled and classes reused properly
	*		Automatically resize all words (to same size) when word word is too long to fit
	*		Implement material components to improve the styling
	*		Move all menu items to parent component. Move state like category, word, random option to store, then turn elements into components
	* BUGS:
	*		Styling: Circle needs a height setting to work prop. That means the containing div(slot container) needs 100% height but that causes the slot container to be higher than the page causing other issues.
	*/
	import { onMount } from 'svelte'
	import { shapes, slots, savedDesigns, currentSave, centerText, fontSizeMod } from './stores.js'
	import SavedDesignsOverview from './save_screen/SavedDesignsOverview.svelte'
	import ExportImportView from './export_import_screen/ExportImportView.svelte'
	import BottomMenu from './menu_components/BottomMenu.svelte'
	import Modal from 'svelte-simple-modal'
	import Button from './menu_components/Button.svelte'
	import Shape from './shape_components/Shape.svelte'
	import Slot from './shape_components/Slot.svelte'
	import CenterSlot from './shape_components/CenterSlot.svelte'
	import Dropdown from './menu_components/Dropdown.svelte'
	import {loadData, generateText} from './helpers/wordDataHandler.js'

	if ($savedDesigns.length == 0){
		$savedDesigns = [{id:0, title:'New Design', shapes:[], slots:[]}]
	}
	
	//TODO: Determine what 0 state should be. Opening the app should start a new save?
	$currentSave = 0

	for (let i = 0; i < 5; i ++){
		$slots.push({ id: i+1, shape: null })
	}
	let shapeColor = '#942192'
	$shapes.push({	type: 'rect', id: 0, slot: null, text:"", rotated:false, color:shapeColor })
	let categories = []
	let words = [[]]
	let currentCategory = 0
	let currentWord = ''

	let centerSlot

	//Create a new shape if the last shape is already placed in a slot
	$: if($shapes.length == 0 || $shapes[$shapes.length -1].slot != null) { freshShape() }
	$: maxShapeID = Math.max(...$shapes.map(s => s.id))

	//Create a fresh shape and add it to the shapes store
	function freshShape(){
		const newShape = {
			type: 'rect',
			slot: null,
			id:  maxShapeID + 1,
			text: (currentWord == ''? currentCategory : currentWord),
			rotated: false,
			color: shapeColor,
		}
		$shapes = $shapes.concat(newShape)
	}
	function changeCategory(e){
		currentCategory = e.detail.text
		currentWord = words[currentCategory][0]
		$shapes[$shapes.length-1].text = currentWord
		//Overwrite the selected value of the word selector
		//TODO: use bind:this to more easily fetch this element
		document.getElementById('dropdownWord').options[0].selected = true
	}
	function changeWord(e){
		currentWord = e.detail.text
		$shapes[$shapes.length-1].text = currentWord
	}

	//Select a random category and dispatch a change event on the select
	function randomOption(target){
		const event = new Event("change")
		const sel = document.getElementById(target)
		const options = sel.children
		sel.value = options[Math.floor(Math.random() * options.length)].value; 
		sel.dispatchEvent(event)
	}

	function saveElementData(){
		let save = $savedDesigns.find(save => save.id == $currentSave)
		if (save == undefined) { 
			console.log("no save found for this id", $currentSave)
		}
		else {
			console.log(centerSlot)
			//make a deep copy of each array. it contains objects so a shallow copy wont work
			save.shapes = $shapes.map(s => ({...s}))
			save.slots = $slots.map(s => ({...s}))
			save.title = $centerText
			console.log("Saving element data", save)
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

<section class='content'>
	<div class='slotsContainer'>
		{#each $slots as slot, i (slot.id)}
			<Slot
				slotId={slot.id}
				filled={$shapes.find(s => s.slot == slot.id) !== undefined}
				rotation={i*(360/$slots.length)+'deg'}
			>
				{#if $shapes.find(s => s.slot == slot.id)}
					<Shape 
						shapeData={$shapes.find(s => s.slot == slot.id)}
					/>
				{/if}
			</Slot>
		{/each}
		<CenterSlot bind:this={centerSlot}/>
	</div>
	<BottomMenu/>
</section>

<section class='menu'>
	<Dropdown
		title='Category'
		options={categories}
		on:selection={changeCategory}
		id='dropdownCat'
	/>
	<Button on:click={() => randomOption("dropdownCat")} text="🔀" optionalClass="float-right"/>
	<Dropdown
		title='Word'
		options={words[currentCategory]}
		on:selection={changeWord}
		id='dropdownWord'
	/>
	<Button on:click={() => randomOption("dropdownWord")} text="🔀" optionalClass="float-right"/>
	<h1 class='clearBoth'>Shape</h1>
	<Shape
		shapeData={$shapes.filter(s => s.slot === null)[0]}
		type="menu"
	/>
  <input type="color" id="colorPicker" class='float-right w25' name="color picker" value="#942192"
  	on:input={e => $shapes[$shapes.length-1].color = e.target.value}>
	<Button on:click={saveElementData} text="Save design #{$currentSave}"/>
	<Modal>
		<SavedDesignsOverview/>
	</Modal>
	<Modal>
		<ExportImportView/>
	</Modal>
	<Button on:click={() => $fontSizeMod += .1} text='+ text size'/>
	<Button on:click={() => $fontSizeMod -= .1} text='- text size'/>
</section>

<style>
	* {
		font-family: Verdana;
	}

	:global(body) {
		background-image: url("../assets/sand.jpg");
		/*background-repeat: no-repeat;*/
	}

	h1 {
		font-family: Verdana;
		font-weight: 300;
	}

	.menu {
		height: 100%;
		width: 25%;
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		background-color: #76c7da; 
		overflow-x: hidden;
		padding-top: 10%;
		padding-left: 1em;
		padding-right: 1em;
		clear: left;
	}
	.content {
		width: 70%;
		height: 100%;
		float: right;
		margin: auto;
	}
  .slotsContainer {
		position: relative;
		width: 100%;
		height: 100%;
		margin-top: 30%;
  }
	.float-right {
		float: right; 
	}
	.clearBoth {
    clear: both;
  }
  .w25 {
  	width: 25%;
  }

	#colorPicker {
		padding: 0;
		margin: 0;
		height: 2em;
	}
</style>