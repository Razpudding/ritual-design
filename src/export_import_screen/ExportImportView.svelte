<script>
	import ExportImportPopup from './ExportImportPopup.svelte'
	import Button from '../menu_components/Button.svelte'

	const showPopupLong = () => {
		open(ExportImportPopup)
	}
</script>

<Button on:click={showPopupLong} text="Import/Export data"/>

