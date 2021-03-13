<script>
	/*
	* TODO: 
	*		Turn elements into components: random button
	* 	Add color change option
	* 	Write a proper readme
	*		Add circle to the middle
	* BUG:
	* 	Right now if there are only 2 slots left, the rotation puts them om 0 and 360 deg
	*/
	import { onMount } from 'svelte'
	import { shapes } from './stores.js';
	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'
	import Dropdown from './Dropdown.svelte'
	import {loadData, generateText} from './dataHandler.js'
	//Initialize variables
	$shapes.push({	type: 'rect', id: 0, slot: null, text:"", rotated:false })
	let slots = []
	for (let i = 0; i < 5; i ++){
		slots.push({ id: i+1, shape: null })
	}

	let categories = []
	let words = [[]]
	let currentCategory = 0
	let currentWord = ''
	let status = 'Start dragging'

	//Reactive code that checks if a new shape is needed in the menu
	$: if($shapes[$shapes.length -1].slot != null){ freshShape() }
	$: maxSlotID = Math.max(...slots.map(s => s.id))

	//Create a fresh shape and add it to the shapes store
	function freshShape(){
		const newShape = {...$shapes[$shapes.length -1]}
		newShape.slot = null
		newShape.id += 1
		newShape.text = (currentWord == ''? currentCategory : currentWord)
		newShape.rotated = false
		$shapes = $shapes.concat(newShape)
	}
	function changeCategory(e){
		console.log("changing cat to", e.detail)
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
	function removeSlot(index){
		console.log("remove called with", index, slots)
		if (slots[index].shape === null){
			console.log(index, 'safe to remove')
			slots.splice(index, 1)
			console.log(slots)
			slots = slots
		} else {
			index > 0 ? removeSlot(--index) : console.log("no slots can be removed")
		}
	}
	//Select a random category and dispatch a change event on the select
	function randomOption(target){
		const event = new Event("change")
		const sel = document.getElementById(target)
		const options = sel.children
		sel.value = options[Math.floor(Math.random() * options.length)].value; 
		sel.dispatchEvent(event)
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
	<button class='float-right' on:click={() => randomOption("dropdownCat")}>🔀</button>
	<Dropdown
		title='Word'
		options={words[currentCategory]}
		on:selection={changeWord}
		id='dropdownWord'
	/>
	<button class='float-right' on:click={() => randomOption("dropdownWord")}>🔀</button>
	<h1 class='clearBoth'>Shape</h1>
	<Shape
		shapeData={$shapes.filter(s => s.slot === null)[0]}
	/>	
</section>
<section class='content'>
	<h1 class='status'>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot (slot.id)}
			<Slot
				slotData={slot}
				slots={slots}
				bind:status={status}
				filled={$shapes.find(s => s.slot == slot.id) !== undefined}
				rotation={(slot.id -1)*(360/slots.length)+'deg'}
			>
				{#if $shapes.find(s => s.slot == slot.id)}
					<Shape 
						shapeData={$shapes.find(s => s.slot == slot.id)}
					/>
				{/if}
			</Slot>
		{/each}
	</div>
	<div id="circleEl">
		<input
			id='centerText'
			type=text
			on:change="" 
		>
	</div>
	<div id="addSlotBtn" on:click="{e => {slots = slots.concat({ id: maxSlotID +1, shape: null }); console.log(slots)}}">Add slot</div>
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

	.float-right {
		float: right; 
	}

	.clearBoth {
    clear: both;
  }
  #circleEl {
    background: lightblue;
    border-radius: 50%;
    position: absolute;
    top: 53%;
    left: 61%;
    width: 8em;
    height: 8em;
	}
	#centerText {
		width: 80%;
		position: relative;
		top: 40%;
		left: 10%;
		background-color: transparent;
		font-weight: bolder;
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