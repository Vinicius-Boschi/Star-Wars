import { getPeople, getPerson } from "../providers/swapi.js"
import { getCharacters as fetchDatabankCharacters } from "../providers/databank.js"
import { getAkababCharacters } from "../providers/akabab.js"
import {
  toList,
  extractIdFromUrl,
  normalizeName,
  fromDatabank,
  indexByName,
  databankList,
  cached,
} from "./helpers.js"

const IGNORED_WORDS = new Set([
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

const emptySwapiFields = () => ({
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
})

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

const significantWords = (name) =>
  name.split(" ").filter((word) => word.length > 2 && !IGNORED_WORDS.has(word))

function prepareDatabank(characters) {
  return characters.map((character) => {
    const name = normalizeName(character.name)
    return { character, name, words: significantWords(name) }
  })
}

const getDatabankCharacters = databankList(fetchDatabankCharacters)

const getDatabankIndex = cached(async () =>
  prepareDatabank(await getDatabankCharacters()),
)

const getAkababIndex = cached(async () =>
  indexByName(await getAkababCharacters()),
)

function findDatabankCharacter(name, entries) {
  const normalizedName = normalizeName(name)

  const exact = entries.find((entry) => entry.name === normalizedName)
  if (exact) return exact.character

  const nameWords = significantWords(normalizedName)
  if (!nameWords.length) return null

  let best = null
  let bestScore = 0
  let hasTie = false

  for (const entry of entries) {
    const score = nameWords.filter((word) => entry.words.includes(word)).length

    if (score > bestScore) {
      bestScore = score
      best = entry.character
      hasTie = false
    } else if (score === bestScore && score > 0) {
      hasTie = true
    }
  }

  return best && bestScore >= 2 && !hasTie ? best : null
}

const enrich = (swapi, databankMatch, akababMatch) => ({
  ...swapi,
  image: akababMatch?.image || databankMatch?.image || null,
  description: databankMatch?.description || "",
})

export async function getCharacters() {
  const [swapiData, databankEntries, akabab] = await Promise.all([
    getPeople(),
    getDatabankIndex(),
    getAkababIndex(),
  ])

  const usedIds = new Set()

  const merged = toList(swapiData).map((raw) => {
    const swapi = normalizeSwapiCharacter(raw)
    const databankMatch = findDatabankCharacter(swapi.name, databankEntries)
    const akababMatch = akabab.get(normalizeName(swapi.name))

    if (databankMatch) usedIds.add(databankMatch._id)

    return enrich(swapi, databankMatch, akababMatch)
  })

  const databankOnly = databankEntries
    .filter(({ character }) => !usedIds.has(character._id))
    .map(({ character }) => ({
      ...fromDatabank(character),
      source: "databank",
      ...emptySwapiFields(),
    }))

  return [...merged, ...databankOnly]
}

export async function getCharacter(id) {
  const [raw, databankEntries, akabab] = await Promise.all([
    getPerson(id),
    getDatabankIndex(),
    getAkababIndex(),
  ])

  const swapi = normalizeSwapiCharacter(raw)

  return enrich(
    swapi,
    findDatabankCharacter(swapi.name, databankEntries),
    akabab.get(normalizeName(swapi.name)),
  )
}