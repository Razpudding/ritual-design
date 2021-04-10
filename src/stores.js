import { writable } from 'svelte/store'

export const shapes = writable([])

export const slots = writable([])

export const savedDesigns = writable([])

//TODO: This should prob just be a derived value from the savedDesigns and refer to the save object, not the id
export const currentSave = writable(0)

export const centerText = writable('')