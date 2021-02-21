<!-- Svelte: https://www.youtube.com/watch?v=aZzGvfnw8Zw&ab_channel=NoahGlaser -->
<!-- Native: https://svelte.dev/repl/adf5a97b91164c239cc1e6d0c76c2abe?version=3.14.1 -->

<script>
	/*
	* TODO: format code, remove ;
	* 			the dropdown should trigger a function through an event that updates category as well as the shape's text value as well as the next dropdown
	*/
	import { onMount } from 'svelte'
	import Shape from './Shape.svelte'
	import Slot from './Slot.svelte'
	import Dropdown from './Dropdown.svelte'
	import {loadData, generateText} from './textGenerator.js'

	let categories = []
	let words = [[]]
	let shapes = [
		{	type: 'rect', id: 0, slot: null, text:"" },
		{	type: 'rect', id: 1, slot: null, text:"" },
		{	type: 'rect', id: 2, slot: null, text:"" },
		{	type: 'rect', id: 3, slot: null, text:"" },
	]
	let slots = new Array(9)

	let currentCategory = 0
	let currentWord = ''
	$: currentShapeText = currentWord == ''? currentCategory : currentWord
	let status = 'Start dragging'
	
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
		console.log('categories', categories)
		words = wordData
		currentCategory = categories[0]
		console.log(words[currentCategory])
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
			>
				{#if shapes.find(s => s.slot == i)}
					<Shape 
						bind:shapes={shapes}
						text={shapes.find(s => s.slot == i).text}
						id={shapes.find(s => s.slot == i).id}
						inContainer=true
					/>
				{/if}
			</Slot>
		{/each}
	</div>
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
  	display:grid;
  	grid-template-columns: 1fr 1fr 1fr;
  	grid-column-gap: 1em;
  	grid-row-gap: 1em;
  	height: 10em;
  	padding: 1em;
  }

  .status {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
</style>