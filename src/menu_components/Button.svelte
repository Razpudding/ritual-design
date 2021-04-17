<script>
  export let text
  export let optionalClass = ''
</script>

<div
  on:click
  class={optionalClass}
  class:btn={true}
  >{text}
</div>

<style>
  div {
    min-width: 3em;
    width: min-content;
    margin: auto;
    color:#444;
    border:1px solid black;
    cursor: pointer;
    background:#eeeff2;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    vertical-align:middle;
    padding: 5px;
    text-align: center;
    position: relative;
    display:inline-block;
  }

  .float-right {
    float: right;
  }
</style>