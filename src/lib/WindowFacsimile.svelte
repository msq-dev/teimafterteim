<script>
  import { onMount } from "svelte"
  import { currentInfo } from "../stores/content"
  import { loadImg } from "../utils/utils"

  export let imgUrl

  let squareX = 0
  let squareY = 0

  let canv
  let ctx
  let originalImg
  let zoomFactor

  function handleMouseEnter() {}

  function handleMouseLeave(canvas, context) {
    squareX = 0
    squareY = 0
    drawOnCanvas(canvas, context, squareX, squareY, zoomFactor)
  }

  function handleZoom(event, canvas, context) {
    squareX = event.layerX - 16 || 0
    squareY = event.layerY - 16 || 0

    drawOnCanvas(canvas, context, squareX, squareY, zoomFactor)
  }

  function drawOnCanvas(canvas, context, x, y, zoom) {
    context.clearRect(0, 0, canvas.width, canvas.height)

    context.drawImage(
      originalImg,
      x * zoom,
      y * zoom,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    )
  }

  onMount(async () => {
    $currentInfo = ""
    ctx = canv.getContext("2d")

    canv.width = 640
    canv.height = 640

    originalImg = await loadImg(imgUrl)
    zoomFactor = originalImg.width / 160

    drawOnCanvas(canv, ctx, squareX, squareY, zoomFactor)
  })
</script>

<div class="original-window">
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <img
    src={imgUrl}
    alt=""
    on:mouseenter={() => handleMouseEnter()}
    on:mousemove|self={(e) => handleZoom(e, canv, ctx)}
    on:mouseleave={() => handleMouseLeave(canv, ctx)}
  />
  <div class="zoom-square" style="left: {squareX}px; top: {squareY}px; " />
  <canvas class="zoomvas" bind:this={canv} />
</div>

<style>
  .original-window {
    position: relative;
  }

  img {
    position: absolute;
    mix-blend-mode: multiply;
    width: 160px;
    cursor: zoom-in;
  }

  .zoom-square {
    position: relative;
    z-index: -10;
    width: 32px;
    aspect-ratio: 1;
    background-color: hsla(276, 78%, 54%, 0.3);
  }

  .zoomvas {
    margin-top: 13.5rem;
    transition: opacity 0.3s ease;
  }
</style>
