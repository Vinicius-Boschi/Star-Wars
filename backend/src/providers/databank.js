async function request(endpoint) {
  const API = process.env.DATABANK_URL
  const response = await fetch(`${API}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Databank: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export function getCharacters() {
  return request("/characters")
}