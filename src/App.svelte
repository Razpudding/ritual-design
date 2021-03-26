<script>
	/*
	* TODO: 
	*		Turn elements into components: random button
	* 	Write a proper readme
	* 	Make shapes that are already placed deleteable
	*		You should be able to drag a word to the middle
	*		Automatically resize all words (to same size) when word word is too long to fit
	*		Circle in the middle should touch edges of cards (make bigger)
	* BUG:
	*		You can drop two shapes in one slot -.-
	*/
	import { onMount } from 'svelte'
	import { shapes } from './stores.js';
	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'
	import Dropdown from './Dropdown.svelte'
	import RemoveShape from './RemoveShape.svelte'
	import {loadData, generateText} from './dataHandler.js'
	
	let slots = []
	for (let i = 0; i < 5; i ++){
		slots.push({ id: i+1, shape: null })
	}
	let shapeColor = '#fddb5d'
	$shapes.push({	type: 'rect', id: 0, slot: null, text:"", rotated:false, color:shapeColor })
	let categories = []
	let words = [[]]
	let currentCategory = 0
	let currentWord = ''

	//Reactive code that checks if a new shape is needed in the menu
	$: if($shapes.length == 0 || $shapes[$shapes.length -1].slot != null) { freshShape() }
	$: maxSlotID = Math.max(...slots.map(s => s.id))
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
		if (slots.length > 1){
			if (slots[index].shape === null){
				console.log(index, 'safe to remove')
				slots.splice(index, 1)
				console.log(slots)
				slots = slots
			} else {
				index > 0 ? removeSlot(--index) : console.log("no slots can be removed")
			}
		} else {
			console.log("can't remove last slot")
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
	<button class='float-right w25' on:click={() => randomOption("dropdownCat")}>🔀</button>
	<Dropdown
		title='Word'
		options={words[currentCategory]}
		on:selection={changeWord}
		id='dropdownWord'
	/>
	<button class='float-right w25' on:click={() => randomOption("dropdownWord")}>🔀</button>
	<h1 class='clearBoth'>Shape</h1>
	<Shape
		shapeData={$shapes.filter(s => s.slot === null)[0]}
	/>
  <input type="color" id="colorPicker" class='float-right w25' name="color picker" value="#fddb5d"
  	on:input={e => $shapes[$shapes.length-1].color = e.target.value}>
</section>

<section class='content'>
	<div class='slotsContainer'>
		{#each slots as slot, i (slot.id)}
			<Slot
				slotData={slot}
				slots={slots}
				filled={$shapes.find(s => s.slot == slot.id) !== undefined}
				rotation={i*(360/slots.length)+'deg'}
			>
				{#if $shapes.find(s => s.slot == slot.id)}
					<Shape 
						shapeData={$shapes.find(s => s.slot == slot.id)}
					/>
				{/if}
			</Slot>
		{/each}
		<div id="circleEl">
			<input
				id='centerText'
				type=text
				on:change="" 
			>
		</div>
	</div>
	<RemoveShape slots={slots}/>
	<div id="addSlotBtn" class="button" on:click="{e => {slots = slots.concat({ id: maxSlotID +1, shape: null }); console.log(slots)}}">Add slot</div>
	<div id="removeSlotBtn" class="button" on:click={removeSlot(slots.length-1)}>Remove slot</div>
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
		overflow-x: hidden;
		padding: 1em;
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

  .button {
    width: 5em;
    margin: auto;
    color:#444;
    border:1px solid #CCC;
    cursor: pointer;
    background:#DDD;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    vertical-align:middle;
    padding: 5px;
    text-align: center;
  }

  #circleEl {
  	position: relative;
    background: lightblue;
    border-radius: 50%;
    width: 21%;
    height: 25%;
    margin: auto;
    bottom: 9%;
	}
	#centerText {
		width: 80%;
		position: relative;
		top: 40%;
		left: 10%;
		background-color: transparent;
		font-weight: bolder;
		text-align: center;
	}
	#addSlotBtn {
  	bottom: 1em;
	}
	#removeSlotBtn {
  	bottom: 1em;
  	right: 1em;
	}
	#colorPicker {
		padding: 0;
		margin: 0;
		height: 2em;
	}
</style>