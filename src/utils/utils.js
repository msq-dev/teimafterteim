export async function getXmlContent(xmlUrl) {
  const res = await fetch(xmlUrl)
  const text = await res.text()

  if (res.ok) {
    const xmlData = text
    return xmlData
  } else {
    throw new Error(text)
  }
}

export function loadImg(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.crossOrigin = "Anonymous"
    img.src = url
  })
}

export function formatDate(datestring, format = "normal") {
  if (!datestring) return ""

  let options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
  if (format === "verylong") options["weekday"] = "long"

  const date = new Date(datestring)
  return new Intl.DateTimeFormat("de-DE", options).format(date)
}
