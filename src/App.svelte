<!-- Svelte: https://www.youtube.com/watch?v=aZzGvfnw8Zw&ab_channel=NoahGlaser -->
<!-- Native: https://svelte.dev/repl/adf5a97b91164c239cc1e6d0c76c2abe?version=3.14.1 -->

<script>
	/*
	* TODO: 
	* Selecting first dropdown should clear second dropdown selector visually
	* Slot adding and removing should be done in a proper function which checks which slots are safe to remove (empty) and maybe where a slot should be added visually.
	* Add color change option
	* !Add way to change a placed shape's properties
	* !Add way to write own text, add random option, 
	* Write a proper readme
	* Remove logic that expect multiple shapes in the menu and multiple per slot
	*/
	import { onMount } from 'svelte'
	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'
	import Dropdown from './Dropdown.svelte'
	import {loadData, generateText} from './dataHandler.js'

	let categories = []
	let words = [[]]
	let shapes = [
		{	type: 'rect', id: 0, slot: null, text:"" },
	]
	$: slots = new Array(5)

	let currentCategory = 0
	let currentWord = ''
	let status = 'Start dragging'

	$: currentShapeText = currentWord == ''? currentCategory : currentWord
	//Reactive var that checks if a new shape is needed in the menu
	$: newShapeNeeded = shapes[shapes.length -1].slot != null ? freshShape(): console.log("not needed")

	//Create a fresh shape with the same text and type but a new id and slot
	function freshShape(){
		const newShape = {...shapes[shapes.length -1]}
		newShape.slot = null
		newShape.id += 1
		shapes = shapes.concat(newShape)
	}
	function changeCategory(e){
		console.log("changing cat to", e.detail.text)
		currentCategory = e.detail.text
	}
	function changeWord(e){
		console.log("changing word to", e.detail.text)
		currentWord = e.detail.text
	}
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
	})
</script>

<section class='menu'>
	<Dropdown
		title='Category'
		options={categories}
		on:selection={changeCategory}
	/>
	<Dropdown
		title='Word'
		options={words[currentCategory]}
		on:selection={changeWord}
	/>
	<h1>Shape</h1>
	{#each shapes.filter(s => s.slot === null) as { id } (id)}
		<Shape
			text={currentWord == ''? currentCategory : currentWord}
			bind:shapes={shapes}
			thisShape={shapes.find(s => s.id == id)}
			{id}
		/>
	{/each}
</section>
<section class='content'>
	<h1 class='status'>{status}</h1>
	<div class = slotsContainer>
		{#each slots as slot, i}
			<Slot
				id={i}
				bind:shapes={shapes}
				bind:status={status}
				filled={shapes.find(s => s.slot == i) !== undefined}
				currentCategory={currentShapeText}
				rotation={i*(360/slots.length)+'deg'}
			>
				{#if shapes.find(s => s.slot == i)}
					<Shape 
						bind:shapes={shapes}
						bind:value={shapes.find(s => s.slot == i).text}
						thisShape={shapes.find(s => s.slot == i)}
						text={shapes.find(s => s.slot == i).text}
						id={shapes.find(s => s.slot == i).id}
						inContainer=true
					/>
				{/if}
			</Slot>
		{/each}
	</div>
	<div id="addSlotBtn" on:click="{e => {slots = slots.concat(0); console.log(slots)}}">Add slot</div>
	<div id="removeSlotBtn" on:click="{e => {slots = slots.slice(0, -1); console.log(slots)}}">Remove slot</div>
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