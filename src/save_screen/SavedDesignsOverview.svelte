<script>

  import { getContext } from 'svelte'
	import { fly } from 'svelte/transition'
	import Button from '../menu_components/Button.svelte'
	
  import PopupLong from './PopupLong.svelte'

  const { open } = getContext('simple-modal')
	const showPopupLong = () => {
		open(PopupLong, //Component
			{ message: "Choose a design to load from or save to"}, //Props
			{ styleWindow: { width: '90%' } } //Options
		)	
	}
</script>

<Button on:click={showPopupLong} text="Manage Saves"></Button>