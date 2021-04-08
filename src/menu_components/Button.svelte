<script>
  export let text
</script>

<div
  on:click
  >{text}
</div>

<style>
  div {
    width: 5em;
    margin: auto;
    color:#444;
    border:1px solid #CCC;
    cursor: pointer;
    background:#DDD;
    box-shadow: 0 0 5px -1px rgba(0,0,0,0.2);
    vertical-align:middle;
    padding: 5px;
    text-align: center;
    position: relative;
    display:inline-block;
  }
</style>