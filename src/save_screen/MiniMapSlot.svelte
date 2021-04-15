<script>
  export let filled = false
  export let rotation = '20deg'

  export let slotData
</script>

<div style="--rot: {rotation}"
  id={slotData.id}
  class="slot"
  class:filled={filled}
>
  <slot></slot>
</div>

<style>
  .slot {
    display: block;
    background-color: #eee;
    border: #999 1px dashed;
    transform: rotate(var(--rot)) translateX(-50%);
    transform-origin: center right;
    position: absolute;
    height: 5em;
    width: 100%;
    left: 50%;
    top: 70%;
  }

  .filled {
    background-color: #faa;
  }
</style>