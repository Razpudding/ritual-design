<script>
  //Setup: In the store there's an array of notifications. A statustext component will render for each notification. when a notification has been created, it will start a timer and when it finishes it will remove its notification from the store array which will in turn trigger the deletion of the component. It will prob have a fadeout on creation.
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { notifications } from '../stores.js'

  export let note

  onMount(() =>{
    setTimeout(function(){ 
      console.log("deleting", note)
      $notifications =  $notifications.filter(n => n.id !== note.id)
      console.log("notes", $notifications)
    }, 1000)
  })

</script>

<h2 in:fade out:fade>
  {note.text}
</h2>

<style>
  h2 {
    color: darkslateblue
  }
</style>