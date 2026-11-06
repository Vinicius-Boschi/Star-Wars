const API = process.env.SWAPI_URL

async function request(endpoint) {
  const response = await fetch(`${API}${endpoint}`)

  if (!response.ok) {
    throw new Error(`SWAPI: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function getPeople() {
  return request("/people")
}

export async function getPerson(id) {
  return request(`/people/${id}`)
}

export async function getFilms() {
  return request("/films")
}

export async function getPlanets() {
  return request("/planets")
}

export async function getSpecies() {
  return request("/species")
}

export async function getVehicles() {
  return request("/vehicles")
}