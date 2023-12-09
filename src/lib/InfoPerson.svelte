<script>
  import { loadImg, formatDate } from "../utils/utils"

  export let infoElement

  let rolename = ""
  let forenames = ""
  let surname = ""
  let surnameBirth = ""
  let birth = ""
  let death = ""

  let occupation = ""
  let imgSrc
  let personImg
  let imgWidth
  let imgHeight

  $: infoElement, setupInfoPerson()

  async function setupInfoPerson() {
    const rolenameNode = infoElement.querySelector("rolename")
    if (rolenameNode) rolename = rolenameNode.textContent

    const forenameNodes = infoElement.querySelectorAll("forename")
    forenames = [...forenameNodes].map((node) => node.textContent).join(" ")

    const surnameNodes = infoElement.querySelectorAll("surname")
    if (surnameNodes.length > 1) {
      surnameBirth = infoElement.querySelector(
        "surname[type='birth']"
      ).textContent
      surname = infoElement.querySelector("surname[type='married']").textContent
    } else {
      surname = infoElement.querySelector("surname").textContent
    }

    birth = infoElement
      .querySelector("birth")
      .attributes.getNamedItem("when").value
    death = infoElement
      .querySelector("death")
      .attributes.getNamedItem("when").value

    const occupationNode = infoElement.querySelector("occupation")
    if (occupationNode) occupation = occupationNode.textContent

    const graphicNode = infoElement.querySelector("graphic")
    imgSrc = graphicNode
      ? graphicNode.attributes.getNamedItem("url").value
      : "https://apps.maxspuling.de/assets/xmlkalbeck/placeholder-550x550.webp"

    personImg = await loadImg(imgSrc)
    imgWidth = personImg.naturalWidth
    imgHeight = personImg.naturalHeight
  }
</script>

<div class="person-info">
  {#if imgHeight}
    <div
      class="image-container"
      style="background-image: url({imgSrc}); width: min({imgWidth}px, 30ch);  aspect-ratio: {imgWidth} / {imgHeight}"
    />
  {/if}
  <p>
    <strong>
      {#if rolename}{rolename}
      {/if}{forenames}
      {surname}</strong
    >{#if surnameBirth}&nbsp;(geb. {surnameBirth}){/if}
  </p>
  <p>&ast; {formatDate(birth)}</p>
  <p>&#8224; {formatDate(death)}</p>
  <p class="person-desc">{occupation}</p>
</div>

<style>
  .image-container {
    margin-bottom: 0.5rem;
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
  }

  .person-desc {
    margin-top: 0.5rem;
    max-width: 30ch;
    white-space: initial;
    font-size: 85%;
  }
</style>
