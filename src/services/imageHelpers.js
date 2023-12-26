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

export function imagePlanetsBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/planets/"
}

export function imageSpeciesBaseUrl() {
  return "https://starwars-visualguide.com/assets/img/species/"
}

export function getImageSpeciesUrl(id) {
  if (id && !isNaN(id)) {
    const imageSpeciesUrl = `${imageSpeciesBaseUrl()}${Number(id)}.jpg`
    return imageSpeciesUrl
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function getImagePlanetsUrl(id) {
  if (id && !isNaN(id)) {
    const imagePlanetsUrl = `${imagePlanetsBaseUrl()}${Number(id)}.jpg`
    return imagePlanetsUrl
  } else {
    console.error("Invalid id parameter", id)
  }
}

export function getImageFilmsUrl(id) {
  if (id && !isNaN(id)) {
    const imageFilmsUrl = `${imageFilmsBaseUrl()}${Number(id)}.jpg`
    return imageFilmsUrl
  } else {
    console.error("Invalid id parameter", id)
    return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
  }
}

export function getImageUrl(id) {
  if (id && !isNaN(id)) {
    const imageUrl = `${imageBaseUrl()}${Number(id)}.jpg`
    return imageUrl
  } else {
    console.error("Invalid id parameter", id)
    return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
  }
}

export function getImageVehiclesUrl(id) {
  if (id && !isNaN(id)) {
    const imageVehiclesUrl = `${imageVehiclesBaseUrl()}${Number(id)}.jpg`
    return imageVehiclesUrl
  } else {
    console.error("Invalid id parameter", id)
    return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
  }
}

export function getImageStarshipsUrl(id) {
  if (id && !isNaN(id)) {
    const imageStarshipssUrl = `${imageStarshipsBaseUrl()}${Number(id)}.jpg`
    return imageStarshipssUrl
  } else {
    console.error("Invalid id parameter", id)
    return "https://i.pinimg.com/originals/c0/6c/9d/c06c9d63bda3f0a823aee1b2f47b0457.png"
  }
}

export function extractIdFromUrl(url) {
  const parts = url.split("/").filter((part) => !!part)
  return parts.pop()
}