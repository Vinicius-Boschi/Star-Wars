export function imageBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/characters/"
}

export function getImageUrl(id) {
  if (id && !isNaN(id)) {
    const imageUrl = `${imageBaseUrl()}${Number(id)}.jpg`
    return imageUrl;
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function extractIdFromUrl(url) {
  const parts = url.split("/").filter((part) => !!part)
  return parts.pop()
}