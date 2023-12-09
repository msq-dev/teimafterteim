<script>
  import { currentInfo } from "./stores/content"
  import { getXmlContent } from "./utils/utils"
  import TextContent from "./lib/TextContent.svelte"
  import WindowFacsimile from "./lib/WindowFacsimile.svelte"
  import WindowInfo from "./lib/WindowInfo.svelte"
  import IconDownload from "./lib/IconDownload.svelte"
  import IconImageview from "./lib/IconImageview.svelte"
  import IconGithub from "./lib/IconGithub.svelte"

  const XML_URL =
    "https://apps.maxspuling.de/assets/xmlkalbeck/1897-03-02_kalbeck_231013T000400.xml"

  let processedXml = fetchAndParse(XML_URL)

  async function fetchAndParse(url) {
    const xmlData = await getXmlContent(url)

    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlData, "application/xml")

    const errorNode = doc.querySelector("parsererror")
    if (errorNode) {
      throw new Error("Es ist ein Fehler aufgetreten :(")
    } else {
      const entryDate = doc.querySelector(
        "teiHeader sourceDesc date"
      ).textContent

      const facsimileUrl = doc
        .querySelector("facsimile graphic")
        .attributes.getNamedItem("url").value

      const mainText = doc
        .querySelector("body")
        .innerHTML.replace(/<lb[^>]*>/g, `<span class="line-break"></span>`)

      const backmatter = doc.querySelector("back")

      const content = {
        entryDate,
        facsimileUrl,
        mainText,
        backmatter,
      }
      return content
    }
  }
</script>

<div class="app-container">
  <div class="site-label-wrapper">
    <a href="#"><IconGithub fill="#fff" size="32" /></a>

    <div class="site-label">
      <div class="app-title">
        Diese Beispielseite entstand im Rahmen des Projekts "Transkription und
        editorische Erschließung des Tagebuchs des Wiener Musikkritikers Max
        Kalbeck (1850–1921)"<br /><span
          >mdw – Universität für Musik und darstellende Kunst Wien &middot;
          Gefördert von der Stadt Wien Kultur</span
        >
      </div>
    </div>
    <img
      src="https://apps.maxspuling.de/assets/xmlkalbeck/StadtWien_Logo_DE_NEG_WEB.png"
      alt="Logo Stadt Wien"
    />
  </div>
  <main>
    {#await processedXml}
      <p>&hellip; fetching</p>
    {:then content}
      <div class="toolbar">
        <a href={XML_URL} download target="_blank"
          ><button class="button"><IconDownload /> Download TEI</button>
        </a>
        <button
          class="button"
          disabled={$currentInfo === ""}
          on:click={() => ($currentInfo = "")}
          ><IconImageview /> Show Facsimile</button
        >
      </div>
      <div class="content-area">
        <TextContent
          entryDate={content.entryDate}
          mainText={content.mainText}
        />
        {#if $currentInfo}
          <WindowInfo backmatter={content.backmatter} />
        {:else}
          <WindowFacsimile imgUrl={content.facsimileUrl} />
        {/if}
      </div>
    {:catch error}
      <p style="color: tomato;">{error.message}</p>
    {/await}
  </main>
</div>

<style>
  .site-label-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
    padding-block: 0.5rem;
    padding-inline: 1rem;
    background-color: var(--clr-accent);
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .site-label-wrapper img {
    height: 2rem;
  }

  .site-label {
    width: calc(100% - 2rem);
  }

  .app-container {
    min-height: 100lvh;
  }

  .app-title {
    color: hsl(287, 100%, 98%);
    font-size: 70%;
    text-align: right !important;
  }

  .app-title span {
    font-weight: 700;
  }

  main {
    width: min(100% - 2rem, 1500px);
    margin-inline: auto;
    margin-block: 3vh;
  }

  .content-area {
    display: grid;
    grid-template-columns: 65ch auto;
    gap: 1rem;
    margin-bottom: 20vh;
  }

  .toolbar {
    margin-block: 2rem;
  }
</style>
