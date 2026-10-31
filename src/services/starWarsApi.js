const API = import.meta.env.VITE_API_URL;

async function request(endpoint) {
  const response = await fetch(`${API}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Star Wars API: ${response.status}`);
  }

  return response.json();
}

export function getCharacters() {
  return request(`/characters`);
}

export function getCharacter(id) {
  return request(`/character/${id}`);
}

export function getMovies() {
  return request("/movies");
}

export function getPlanets() {
  return request("/planets");
}

export function getSpecies() {
  return request("/species");
}

export function getStarships() {
  return request("/starships");
}

export function getVehicles() {
  return request("/vehicles");
}