const API_URL = import.meta.env.VITE_API_URL;

async function request(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function getCharacters(page = 1) {
  return request([`/people/?page=${page}`]);
}

export async function getCharacter(id) {
  return request([`/people/${id}`]);
}

export async function searchCharacters(query) {
  return request(`/people/?search=${encodeURIComponent(query)}`);
}

export async function getPlanets(page = 1) {
  return request([`/planets/?page=${page}`]);
}

export async function getFilms() {
  return request([`/films/`]);
}

export async function getStarships(page = 1) {
  return request([`/starships/?page=${page}`]);
}

export async function getVehicles(page = 1) {
  return request([`/vehicles/?page=${page}`]);
}

export async function getSpecies(page = 1) {
  return request([`/species/?page=${page}`]);
}