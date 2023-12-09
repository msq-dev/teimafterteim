<script>
  export let size = 24
  export let inline = true
  export let fill = "currentColor"
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  {fill}
  class:inline
>
  <slot />
</svg>

<style>
  .inline {
    display: inline;
    vertical-align: top;
  }
</style>
