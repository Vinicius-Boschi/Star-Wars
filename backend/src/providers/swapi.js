const API = process.env.SWAPI_URL

async function request(endpoint) {
  const response = await fetch(`${API}${endpoint}`)

  if (!response.ok) {
    throw new Error(`SWAPI: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function getPeople() {
  return request("/people")
}

export function getPerson(id) {
  return request(`/people/${id}`)
}