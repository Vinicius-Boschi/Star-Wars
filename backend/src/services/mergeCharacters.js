import { getPeople, getPerson } from "../providers/swapi.js"
import { getCharacters as getDatabankCharacters } from "../providers/databank.js"

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
    image: character.image,
    description: character.description ?? "",
  }
}

function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/"/g, "")
    .replace(/'/g, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

export async function getCharacters() {
  const [swapiData, databankData] = await Promise.all([
    getPeople(),
    getDatabankCharacters(),
  ])

  const swapiCharacters = Array.isArray(swapiData)
    ? swapiData
    : swapiData.results || []

  const databankCharacters = Array.isArray(databankData)
    ? databankData
    : databankData.data || databankData.results || []

  const normalizedDatabank = databankCharacters.map(normalizeDatabankCharacter)

  const databankMap = new Map(
    normalizedDatabank.map((character) => [
      normalizeName(character.name),
      character,
    ]),
  )

  return swapiCharacters.map((character) => {
    const swapiCharacter = normalizeSwapiCharacter(character)

    const databankCharacter = databankMap.get(
      normalizeName(swapiCharacter.name),
    )

    return {
      ...swapiCharacter,

      image: databankCharacter?.image ?? null,
      description: databankCharacter?.description ?? "",
    }
  })
}

export async function getCharacter(id) {
  const [character, databankData] = await Promise.all([
    getPerson(id),
    getDatabankCharacters(),
  ])

  const swapiCharacter = normalizeSwapiCharacter(character)

  const databankCharacters = Array.isArray(databankData)
    ? databankData
    : databankData.data || databankData.results || []

  const databankMap = new Map(
    databankCharacters.map((character) => [
      normalizeName(character.name),
      normalizeDatabankCharacter(character),
    ]),
  )

  const databankCharacter = databankMap.get(normalizeName(swapiCharacter.name))

  return {
    ...swapiCharacter,
    image: databankCharacter?.image ?? null,
    description: databankCharacter?.description ?? "",
  }
}