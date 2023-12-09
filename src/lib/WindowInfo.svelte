<script>
  import { currentInfo } from "../stores/content"
  import InfoPerson from "./InfoPerson.svelte"
  import InfoPlace from "./InfoPlace.svelte"
  import InfoDoc from "./InfoDoc.svelte"

  export let backmatter

  const infoTypes = {
    person: InfoPerson,
    place: InfoPlace,
    biblStruct: InfoDoc,
  }

  $: infoElement = backmatter.querySelector(`[*|id=${$currentInfo}]`)
  $: infoTag = infoElement?.tagName
</script>

<div class="info-wrapper">
  <div class="info-window">
    <svelte:component this={infoTypes[infoTag]} {infoElement} />
  </div>
</div>

<style>
  .info-wrapper {
    height: max-content;
    position: sticky;
    top: 4rem;
    align-self: start;
  }

  .info-window {
    border: 1px solid lightgray;
    padding: 0.5em;
    margin-bottom: 2rem;
    height: 100%;
    white-space: nowrap;
    overflow-x: hidden;
    max-width: 400px;
  }
</style>
