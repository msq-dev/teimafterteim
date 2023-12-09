<script>
  export let infoElement

  const mapStuffValue = 0.002

  let placeName = ""
  let lat = 0
  let lon = 0
  let street = ""
  let settlement = ""

  $: infoElement, setupInfoPlace()

  function setupInfoPlace() {
    placeName = infoElement.querySelector("placeName").textContent

    const coordNode = infoElement.querySelector("geo")
    if (coordNode) {
      const coords = coordNode.textContent.split(" ")
      lat = parseFloat(coords[0])
      lon = parseFloat(coords[1])
    }

    const addressNode = infoElement.querySelector("address")
    if (addressNode) {
      street = addressNode.querySelector("street").textContent
      settlement = addressNode.querySelector("settlement").textContent
    }
  }
</script>

<div class="place-info">
  {#if lat && lon}
    <!-- svelte-ignore a11y-missing-attribute -->
    <iframe
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      src="https://www.openstreetmap.org/export/embed.html?bbox={lon -
        mapStuffValue}%2C{lat - mapStuffValue}%2C{lon + mapStuffValue}%2C{lat +
        mapStuffValue}&amp;layer=mapnik&amp;marker={lat}%2C{lon}"
    />
  {/if}
  <p><strong>{placeName}</strong></p>
  {#if street}<p>{street}</p>{/if}
</div>

<style>
  iframe {
    width: 30ch;
    height: 30lvh;
  }
</style>
