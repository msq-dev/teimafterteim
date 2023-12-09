<script>
  import { loadImg } from "../utils/utils"

  export let infoElement

  let author = ""
  let title = ""
  let volume = ""
  let pages = ""
  let publisher = ""
  let pubPlace = ""
  let pubDate = ""

  let imgSrc
  let docImg
  let imgWidth
  let imgHeight

  $: infoElement, setupInfoDoc()

  async function setupInfoDoc() {
    author = infoElement.querySelector("author").textContent
    title = infoElement.querySelector("title").textContent
    volume = infoElement.querySelector("biblScope[unit='volume']").textContent
    pages = infoElement.querySelector("biblScope[unit='page']").textContent
    publisher = infoElement.querySelector("publisher").textContent
    pubPlace = infoElement.querySelector("pubPlace").textContent
    pubDate = infoElement.querySelector("date").textContent

    const graphicNode = infoElement.querySelector("graphic")
    imgSrc = graphicNode
      ? graphicNode.attributes.getNamedItem("url").value
      : "https://apps.maxspuling.de/assets/xmlkalbeck/placeholder-550x550.webp"

    docImg = await loadImg(imgSrc)
    imgWidth = docImg.naturalWidth
    imgHeight = docImg.naturalHeight
  }
</script>

<div class="doc-info">
  <img src={imgSrc} alt="" class="doc-img" />
  <p>
    {author}, {title}
    {volume}, {pubPlace}: {publisher}
    {pubDate}. S. {pages}.
  </p>
</div>

<style>
  .doc-info {
    white-space: initial;
  }
</style>
