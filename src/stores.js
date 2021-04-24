import { writable, derived } from 'svelte/store'

export const shapes = writable([])

export const slots = writable([])

export const savedDesigns = writable([])

export const currentSave = writable(0)

export const centerText = writable('New Design')

export const fontSizeMod = writable(1)

export const maxSlotID = derived(slots, $slots =>  $slots.length > 0 ? Math.max(...$slots.map(s => s.id)) : 0)