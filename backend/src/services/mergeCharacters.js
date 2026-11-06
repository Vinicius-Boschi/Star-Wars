import {
  getPeople,
  getPerson,
  getFilms,
  getPlanets,
  getSpecies,
} from "../providers/swapi.js"
import {
  getCharacters as getDatabankCharacters,
  getSpecies as getDatabankSpecies,
  getPlanets as getDatabankPlanets,
} from "../providers/databank.js"
import { getAkababCharacters } from "../providers/akabab.js"

function extractIdFromUrl(url) {
  if (!url) return null

  const match = url.match(/\/(\d+)\/?$/)

  return match ? Number(match[1]) : null
}

function normalizeSwapiCharacter(character) {
  return {
    id: extractIdFromUrl(character.url),

    name: character.name,

    height: character.height,
    mass: character.mass,

    hair_color: character.hair_color,
    skin_color: character.skin_color,
    eye_color: character.eye_color,

    birth_year: character.birth_year,
    gender: character.gender,

    homeworld: character.homeworld,

    films: character.films || [],
    species: character.species || [],
    vehicles: character.vehicles || [],
    starships: character.starships || [],
  }
}

function normalizeDatabankCharacter(character) {
  return {
    id: character._id,
    name: character.name,
    image: character.image || null,
    description: character.description || "",
    source: "databank",
  }
}

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

async function getAllDatabankCharacters() {
  const characters = []

  let page = 1
  const limit = 100

  while (true) {
    const response = await getDatabankCharacters(page, limit)

    const data = Array.isArray(response)
      ? response
      : response.data || response.results || []

    characters.push(...data)

    const total = response.info?.total

    if (!total || characters.length >= total || !data.length) {
      break
    }

    page++
  }

  return characters
}

function findDatabankCharacter(name, databankCharacters) {
  const normalizedName = normalizeName(name)

  const exactMatch = databankCharacters.find(
    (character) => normalizeName(character.name) === normalizedName,
  )

  if (exactMatch) {
    return normalizeDatabankCharacter(exactMatch)
  }

  const ignoredWords = new Set([
    "darth",
    "lord",
    "general",
    "admiral",
    "captain",
    "commander",
    "count",
    "grand",
    "master",
    "chief",
    "major",
    "colonel",
    "senator",
    "king",
    "queen",
    "princess",
    "prince",
  ])

  const nameWords = normalizedName
    .split(" ")
    .filter((word) => word.length > 2 && !ignoredWords.has(word))

  if (!nameWords.length) {
    return null
  }

  let bestMatch = null
  let bestScore = 0
  let hasTie = false

  for (const character of databankCharacters) {
    const databankName = normalizeName(character.name)

    const databankWords = databankName
      .split(" ")
      .filter((word) => word.length > 2 && !ignoredWords.has(word))

    const matchedWords = nameWords.filter((word) =>
      databankWords.includes(word),
    )

    const score = matchedWords.length

    if (score > bestScore) {
      bestScore = score
      bestMatch = character
      hasTie = false
    } else if (score === bestScore && score > 0) {
      hasTie = true
    }
  }

  if (bestMatch && bestScore >= 2 && !hasTie) {
    return normalizeDatabankCharacter(bestMatch)
  }

  return null
}

function findAkababCharacter(name, akababCharacters) {
  const normalizedName = normalizeName(name)

  const exactMatch = akababCharacters.find(
    (character) => normalizeName(character.name) === normalizedName,
  )

  if (exactMatch) {
    return exactMatch
  }

  return null
}

export async function getCharacters() {
  const [swapiData, databankCharacters, akababCharacters] = await Promise.all([
    getPeople(),
    getAllDatabankCharacters(),
    getAkababCharacters(),
  ])

  const swapiCharacters = Array.isArray(swapiData)
    ? swapiData
    : swapiData.results || []

  const usedDatabankIds = new Set()

  const mergedCharacters = swapiCharacters.map((character) => {
    const swapiCharacter = normalizeSwapiCharacter(character)

    const databankCharacter = findDatabankCharacter(
      swapiCharacter.name,
      databankCharacters,
    )

    const akababCharacter = findAkababCharacter(
      swapiCharacter.name,
      akababCharacters,
    )

    if (databankCharacter) {
      usedDatabankIds.add(databankCharacter.id)
    }

    return {
      ...swapiCharacter,
      image: akababCharacter?.image || databankCharacter?.image || null,
      description: databankCharacter?.description || "",
    }
  })

  const databankOnlyCharacters = databankCharacters
    .filter((character) => !usedDatabankIds.has(character._id))
    .map((character) => ({
      ...normalizeDatabankCharacter(character),
      height: null,
      mass: null,
      hair_color: null,
      skin_color: null,
      eye_color: null,
      birth_year: null,
      gender: null,
      homeworld: null,
      films: [],
      species: [],
      vehicles: [],
      starships: [],
    }))

  return [...mergedCharacters, ...databankOnlyCharacters]
}

export async function getCharacter(id) {
  const [character, databankCharacters, akababCharacters] = await Promise.all([
    getPerson(id),
    getAllDatabankCharacters(),
    getAkababCharacters(),
  ])

  const swapiCharacter = normalizeSwapiCharacter(character)

  const databankCharacter = findDatabankCharacter(
    swapiCharacter.name,
    databankCharacters,
  )

  const akababCharacter = await findAkababCharacter(
    swapiCharacter.name,
    akababCharacters,
  )

  return {
    ...swapiCharacter,
    image: akababCharacter?.image || databankCharacter?.image || null,
    description: databankCharacter?.description || "",
  }
}

export async function getMovies() {
  const data = await getFilms()

  return Array.isArray(data) ? data : data.results || []
}

export async function getSpecie() {
  const [swapiData, databankData] = await Promise.all([
    getSpecies(),
    getAllDatabankSpecies(),
  ])

  const swapiSpecies = Array.isArray(swapiData)
    ? swapiData
    : swapiData.results || []

  const databankSpecies = Array.isArray(databankData)
    ? databankData
    : databankData.data || databankData.results || []

  return swapiSpecies.map((specie) => {
    const match = databankSpecies.find(
      (item) => normalizeName(item.name) === normalizeName(specie.name),
    )

    return {
      ...specie,
      id: extractIdFromUrl(specie.url),
      image: match?.image || null,
      description: match?.description || "",
    }
  })
}

async function getAllDatabankSpecies() {
  const species = []

  let page = 1
  const limit = 100

  while (true) {
    const response = await getDatabankSpecies(page, limit)

    const data = Array.isArray(response)
      ? response
      : response.data || response.results || []

    species.push(...data)

    const total = response.info?.total

    if (!total || species.length >= total || !data.length) {
      break
    }

    page++
  }

  return species
}

export async function getPlanet() {
  const [swapiData, databankData] = await Promise.all([
    getPlanets(),
    getAllDatabankPlanets(),
  ])

  const swapiPlanets = Array.isArray(swapiData)
    ? swapiData
    : swapiData.results || []

  const databankPlanets = Array.isArray(databankData)
    ? databankData
    : databankData.data || databankData.results || []

  return swapiPlanets.map((planet) => {
    const match = databankPlanets.find(
      (item) => normalizeName(item.name) === normalizeName(planet.name),
    )

    return {
      ...planet,
      id: extractIdFromUrl(planet.url),
      image: match?.image || null,
      description: match?.description || "",
    }
  })
}

async function getAllDatabankPlanets() {
  const planets = []

  let page = 1
  const limit = 100

  while (true) {
    const response = await getDatabankPlanets(page, limit)

    const data = Array.isArray(response)
      ? response
      : response.data || response.results || []

    planets.push(...data)

    const total = response.info?.total

    if (!total || planets.length >= total || !data.length) {
      break
    }

    page++
  }

  return planets
}