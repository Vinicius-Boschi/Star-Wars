import {
  getFilms,
  getPlanets,
  getSpecies,
  getVehicles,
  getStarships,
} from "../providers/swapi.js"
import {
  getSpecies as fetchDatabankSpecies,
  getPlanets as fetchDatabankPlanets,
  getVehicles as fetchDatabankVehicles,
  getCreatures as fetchDatabankCreatures,
  getDroids as fetchDatabankDroids,
  getLocations as fetchDatabankLocations,
  getOrganizations as fetchDatabankOrganizations,
} from "../providers/databank.js"
import {
  toList,
  extractIdFromUrl,
  normalizeName,
  fromDatabank,
  indexByName,
  databankList,
} from "./helpers.js"

const databankSpecies = databankList(fetchDatabankSpecies)
const databankPlanets = databankList(fetchDatabankPlanets)
const databankVehicles = databankList(fetchDatabankVehicles)

function mergeWithDatabank(
  swapiItems,
  databankItems,
  { keepDatabankOnly = false } = {},
) {
  const byName = indexByName(databankItems)
  const usedIds = new Set()

  const merged = swapiItems.map((item) => {
    const match = byName.get(normalizeName(item.name))

    if (match) usedIds.add(match._id)

    return {
      ...item,
      id: extractIdFromUrl(item.url),
      image: match?.image || null,
      description: match?.description || "",
    }
  })

  if (!keepDatabankOnly) return merged

  const extras = databankItems
    .filter((item) => !usedIds.has(item._id))
    .map(fromDatabank)

  return [...merged, ...extras]
}

export async function getSpecie() {
  const [swapi, databank] = await Promise.all([
    getSpecies(),
    databankSpecies(),
  ])

  return mergeWithDatabank(toList(swapi), databank)
}

export async function getPlanet() {
  const [swapi, databank] = await Promise.all([
    getPlanets(),
    databankPlanets(),
  ])

  return mergeWithDatabank(toList(swapi), databank)
}

export async function getVehicle() {
  const [swapi, databank] = await Promise.all([
    getVehicles(),
    databankVehicles(),
  ])

  return mergeWithDatabank(toList(swapi), databank, { keepDatabankOnly: true })
}

export async function getMovies() {
  return toList(await getFilms())
}

export async function getStarship() {
  const starships = toList(await getStarships())

  return starships.map((starship) => ({
    ...starship,
    id: extractIdFromUrl(starship.url),
    image: null,
    description: "",
  }))
}

const databankOnlyList = (fetchPage) => {
  const list = databankList(fetchPage)

  return async () => (await list()).map(fromDatabank)
}

export const getCreature = databankOnlyList(fetchDatabankCreatures)
export const getDroid = databankOnlyList(fetchDatabankDroids)
export const getLocation = databankOnlyList(fetchDatabankLocations)
export const getOrganization = databankOnlyList(fetchDatabankOrganizations)