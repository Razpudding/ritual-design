<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { notifications } from '../stores.js'

  export let note

  //Remove the notification from the store which in turn destroys the component
  onMount(() =>{
    setTimeout(function(){ 
      $notifications =  $notifications.filter(n => n.id !== note.id)
    }, 1000)
  })
</script>

<span in:fade out:fade>
  {note.text}
</span>

<style>
  span {
    display: block;
    color: darkslateblue
  }
</style>