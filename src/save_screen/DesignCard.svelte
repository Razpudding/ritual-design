<script>
	import Shape from '../shape_components/Shape.svelte'
	import Slot from './MiniMapSlot.svelte'
	import CenterSlot from '../shape_components/CenterSlot.svelte'

	export let item

	if (item.slots.length > 0 && item.shapes.length >0){
		console.log("rendering minimap", item)
	} else {
		console.log("no data for minimap", item)
	}
</script>

<div on:click>
	<!-- Let's test this. Approach works but would need a lot of custom styling -->
	{#if (item.slots.length > 0 && item.shapes.length >0) }
	<div class='slotsContainer'>
		{#each item.slots as slot, i (slot.id)}
			<Slot
				slotData={slot}
				filled={item.shapes.find(s => s.slot == slot.id) !== undefined}
				rotation={i*(360/item.slots.length)+'deg'}
			>
				{#if item.shapes.find(s => s.slot == slot.id)}
					<Shape 
						shapeData={item.shapes.find(s => s.slot == slot.id)}
						draggable={false}
						disabled={true}
						fontSize={"4em"}
					/>
				{/if}
			</Slot>
		{/each}
		<CenterSlot disabled={true}/>
	</div>
	{/if}
	<!-- end of test -->
	<h2>#{item.id}</h2>
	<span>{item.title}</span>
</div>

<style>
	div {
		background-color: lightgreen;
	}
	.slotsContainer {
		transform: scale(0.3);
		transform-origin: left;
	}
</style>