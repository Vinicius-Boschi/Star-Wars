const API = process.env.DATABANK_URL

async function request(endpoint) {
  const response = await fetch(`${API}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Databank: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function getCharacters(page = 1, limit = 10) {
  return request(`/characters?page=${page}&limit=${limit}`)
}

export function getCharacterByName(name) {
  const encodedName = encodeURIComponent(name)

  return request(`/characters/name/${encodedName}`)
}

export function getSpecies(page = 1, limit = 10) {
  return request(`/species?page=${page}&limit=${limit}`)
}

export function getPlanets(page = 1, limit = 10) {
  return request(`/planets?page=${page}&limit=${limit}`)
}

export function getVehicles(page = 1, limit = 10) {
  return request(`/vehicles?page=${page}&limit=${limit}`)
}

export function getCreatures(page = 1, limit = 10) {
  return request(`/creatures?page=${page}&limit=${limit}`)
}

export function getDroids(page = 1, limit = 10) {
  return request(`/droids?page=${page}&limit=${limit}`)
}

export function getLocations(page = 1, limit = 10) {
  return request(`/locations?page=${page}&limit=${limit}`)
}

export function getOrganizations(page = 1, limit = 10) {
  return request(`/organizations?page=${page}&limit=${limit}`)
}