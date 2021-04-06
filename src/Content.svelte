<script>
  import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	
  import PopupLong from './PopupLong.svelte';

  const { open } = getContext('simple-modal');
	
	const showPopupLong = () => {
		open(PopupLong, { message: "It's a popup with long text!" });
	};
</script>


<button on:click={showPopupLong}>See saved designs</button>

<style>
</style>