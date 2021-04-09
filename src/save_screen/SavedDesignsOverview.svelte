<script>

  import { getContext } from 'svelte'
	import { fly } from 'svelte/transition'
	import Button from '../menu_components/Button.svelte'
	
  import PopupLong from './PopupLong.svelte'

  const { open } = getContext('simple-modal')
	const showPopupLong = () => {
		open(PopupLong, { message: "Choose a design to load from or save to" })
	}
</script>

<Button on:click={showPopupLong} text="See saved designs"></Button>

<style>
</style>