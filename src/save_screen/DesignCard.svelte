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

<div class='wrapper' on:click>
	<h2>#{item.id}</h2>
	<span>{item.title}</span>
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
						type="minimap"
						draggable={false}
						disabled={true}
						fontSize={"2em"}
					/>
				{/if}
			</Slot>
		{/each}
	</div>
	{/if}
</div>

<style>
	.wrapper {
		background-color: #76c7da;
		height:100%;
		width: 100%;
	}

	.slotsContainer {
		transform: scale(0.3);
		transform-origin: left;
	}
</style>