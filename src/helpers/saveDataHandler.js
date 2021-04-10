// Started work on this separate module that should handle savedata
// Abonded it because it creates more overhead than it saves atm

import { get } from 'svelte/store'
import { savedDesigns, currentSave } from '../stores.js'

export function saveElementData(shapes, slots, centerText){
	let save = get(savedDesigns).find(save => save.id == get(currentSave))
	if (save == undefined) { 
		console.log("no save found for this id", $currentSave)
	}
	else {
		//make a deep copy of each array. it contains objects so a shallow copy wont work
		save.shapes = shapes.map(s => ({...s}))
		save.slots = slots.map(s => ({...s}))
		save.title = centerText
		console.log("Saving element data", save)
	}
}