export function imageBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/characters/"
}

export function imageFilmsBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/films/"
}

export function imageVehiclesBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/vehicles/"
}

export function imageStarshipsBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/starships/"
}

export function getImageFilmsUrl(id) {
  if (id && !isNaN(id)) {
    const imageFilmsUrl = `${imageFilmsBaseUrl()}${Number(id)}.jpg`
    return imageFilmsUrl
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function getImageUrl(id) {
  if (id && !isNaN(id)) {
    const imageUrl = `${imageBaseUrl()}${Number(id)}.jpg`
    return imageUrl
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function getImageVehiclesUrl(id) {
  if (id && !isNaN(id)) {
    const imageVehiclesUrl = `${imageVehiclesBaseUrl()}${Number(id)}.jpg`
    return imageVehiclesUrl
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function getImageStarshipsUrl(id) {
  if (id && !isNaN(id)) {
    const imageStarshipssUrl = `${imageStarshipsBaseUrl()}${Number(id)}.jpg`
    return imageStarshipssUrl
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function extractIdFromUrl(url) {
  const parts = url.split("/").filter((part) => !!part)
  return parts.pop()
}