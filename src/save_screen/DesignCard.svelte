<script>
	import Shape from '../shape_components/Shape.svelte'
	import Slot from '../shape_components/Slot.svelte'

	export let item

	if (item.slots && item.shapes){
		console.log("rendering minimap", item)
	}

</script>

<div on:click>
	<!-- Let's test this. Approach works but would need a lot of custom styling -->
	{#if item.slots.length > 0 && item.shapes.length >0 }
	<div class='slotsContainer'>
		{#each item.slots as slot, i (slot.id)}
			<Slot
				slotId={slot.id}
				filled={item.shapes.find(s => s.slot == slot.id) !== undefined}
				rotation={i*(360/item.slots.length)+'deg'}
			>
				{#if item.shapes.find(s => s.slot == slot.id)}
					<Shape 
						shapeData={item.shapes.find(s => s.slot == slot.id)}
					/>
				{/if}
			</Slot>
		{/each}
		<!-- <CenterSlot/> -->
	</div>
	{/if}
	<!-- end of test -->
	<h2>#{item.id}</h2>
	<span>{item.title}</span>
</div>

<style>
	div {
		background-color: lightgreen
	}
	.slotsContainer {

	}
</style>