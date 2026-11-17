const API = import.meta.env.VITE_API_URL

async function request(endpoint) {
  let response

  try {
    response = await fetch(`${API}${endpoint}`)
  } catch {
    throw new Error("Unable to connect to Star Wars API.")
  }

  if (!response.ok) {
    throw new Error(`Star Wars API: ${response.status} ${response.statusText}`)
  }

  try {
    return await response.json()
  } catch {
    throw new Error("Invalid response from Star Wars API.")
  }
}

export function getCharacters() {
  return request(`/characters`)
}

export function getCharacter(id) {
  return request(`/character/${id}`)
}

export function getMovies() {
  return request("/movies")
}

export function getPlanets() {
  return request("/planets")
}

export function getSpecies() {
  return request("/species")
}

export function getStarships() {
  return request("/starships")
}

export function getVehicles() {
  return request("/vehicles")
}

export function getCreatures() {
  return request("/creatures")
}

export function getDroids() {
  return request("/droids")
}

export function getLocations() {
  return request("/locations")
}

export function getOrganizations() {
  return request("/organizations")
}

export function getStats() {
  return request("/stats")
}
