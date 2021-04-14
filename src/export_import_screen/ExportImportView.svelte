<script>
	import { getContext } from 'svelte'
	import ExportImportPopup from './ExportImportPopup.svelte'
	import Button from '../menu_components/Button.svelte'

	const { open } = getContext('simple-modal')
	const showPopupLong = () => {
		open(ExportImportPopup)
	}
</script>

<Button on:click={showPopupLong} text="Import/Export data"/>
<!-- TODO: Should be a way for the popup to pass back an event so that we can close the modal here when an option has been chosen -->

