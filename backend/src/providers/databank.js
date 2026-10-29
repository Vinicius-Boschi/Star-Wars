async function request(endpoint) {
  const API = process.env.DATABANK_URL;

  const response = await fetch(`${API}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Databank: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function getCharacters(page = 1, limit = 10) {
  return request(`/characters?page=${page}&limit=${limit}`);
}

export function getCharacterByName(name) {
  const encodedName = encodeURIComponent(name);

  return request(`/characters/name/${encodedName}`);
}