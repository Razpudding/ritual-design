<script>
  export let text
  export let optionalClass = ''
</script>

<button
  on:click
  class={optionalClass}
  >{text}
</button>

<style>
  button {
    min-width: 3em;
    color:#444;
    border:1px solid black;
    cursor: pointer;
    background:#eeeff2;
    padding: 5px;
  }

  .float-right {
    float: right;
  }
</style>