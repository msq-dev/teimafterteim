<script>
  import { currentInfo } from "../stores/content"
  import { formatDate } from "../utils/utils"

  export let entryDate
  export let mainText

  const infoTags = ["PERSNAME", "PLACENAME", "REF"]

  function setInfo(event) {
    const element = event.target
    if (!infoTags.includes(element.tagName)) return

    const idAttr = element.tagName === "REF" ? "target" : "ref"
    const pointer = element.attributes.getNamedItem(idAttr).value.substring(1)

    $currentInfo = pointer
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="content-text" on:click={setInfo}>
  <div class="date-info">{formatDate(entryDate, "verylong")}</div>
  {@html mainText}
</div>

<style>
  .content-text {
    font-family: "Lora", serif;
    line-height: 1.65;
    width: 65ch;
  }

  .date-info {
    font-family: sans-serif;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  :global(persname),
  :global(placename),
  :global(ref[target]) {
    --_l: 91%;

    --clr-person: hsl(180, 100%, var(--_l, 21%));
    --clr-place: hsl(220, 100%, var(--_l, 36%));
    --clr-doc: hsl(33, 100%, var(--_l, 50%));
    cursor: pointer;
  }

  :global(persname):hover,
  :global(placename):hover,
  :global(ref[target]):hover {
    --_l: 81%;
  }

  :global(persname) {
    background-color: var(--clr-person);
  }

  :global(placename) {
    background-color: var(--clr-place);
  }

  :global(ref[target]) {
    background-color: var(--clr-doc);
  }

  :global(.line-break::after) {
    content: "\00A0/\a";
    white-space: pre;
    color: tomato;
  }

  :global(del) {
    font-style: italic;
    text-decoration: line-through;
  }

  :global(add) {
    display: inline-block;
    color: var(--gray-700);
    transform: translateY(-0.15em);
  }

  :global(unclear) {
    font-style: italic;
  }

  :global(unclear::after) {
    content: "?";
    color: tomato;
    display: inline-block;
    font-size: 70%;
    transform: translateY(-0.35em);
  }

  :global(lb) {
    display: inline-block;
  }

  :global(expan) {
    color: var(--gray-700);
    display: inline-block;
    font-size: 70%;
    transform: translateY(-0.35em);
  }

  :global(expan::before) {
    content: "\005B=";
    margin-left: 0.15em;
  }

  :global(expan::after) {
    content: "\005D";
  }
</style>
