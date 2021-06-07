<script>
  //Setup: In the store there's an array of notifications. A statustext component will render for each notification. when a notification has been created, it will start a timer and when it finishes it will remove its notification from the store array which will in turn trigger the deletion of the component. It will prob have a fadeout on creation.
  import { fade } from 'svelte/transition'
  import { status } from '../stores.js'


  let old = $status
  $: if (old !== $status){
    console.log("status changed", $status, 'old', old)
    old = $status
  }

</script>

{#if $status}
<h2 class='fade'>
  {$status}
</h2>
{/if}

<style>
  h2 {
    color: darkslateblue
  }
</style>