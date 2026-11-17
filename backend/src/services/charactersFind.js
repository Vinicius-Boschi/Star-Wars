import { getPeople, getPerson } from "../providers/swapi.js"
import { getCharacters as fetchDatabankCharacters } from "../providers/databank.js"
import { getAkababCharacters } from "../providers/akabab.js"
import { getPlanet, getSpecie, getMovies } from "./catalog.js"
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
  homeworld_name: null,
  species_name: null,
  films: [],
  species: [],
  vehicles: [],
  starships: [],
})

const toArray = (value) => {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

const hasValue = (value) =>
  value !== null &&
  value !== undefined &&
  String(value).trim() !== "" &&
  !["unknown", "n/a", "none", "null"].includes(
    String(value).trim().toLowerCase(),
  )

const firstValid = (...values) => values.find(hasValue) ?? null

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
    films: toArray(character.films),
    species: toArray(character.species),
    vehicles: toArray(character.vehicles),
    starships: toArray(character.starships),
  }
}

const significantWords = (name) =>
  name.split(" ").filter((word) => word.length > 2 && !IGNORED_WORDS.has(word))

function prepareDatabank(characters) {
  return characters.map((character) => {
    const aliases = character.name
      .split("/")
      .map((name) => normalizeName(name.trim()))

    return {
      character,
      name: normalizeName(character.name),
      aliases,
      words: significantWords(normalizeName(character.name)),
    }
  })
}

const getDatabankCharacters = databankList(fetchDatabankCharacters)

const getDatabankIndex = cached(async () =>
  prepareDatabank(await getDatabankCharacters()),
)

const getAkababIndex = cached(async () =>
  indexByName(await getAkababCharacters()),
)

const getPlanetNames = cached(
  async () =>
    new Map((await getPlanet()).map((planet) => [planet.id, planet.name])),
)

const getSpecieNames = cached(
  async () =>
    new Map((await getSpecie()).map((specie) => [specie.id, specie.name])),
)

const getMoviesList = cached(async () => getMovies())

function findDatabankCharacter(name, entries) {
  const normalizedName = normalizeName(name)

  const exact = entries.filter((entry) =>
    entry.aliases.includes(normalizedName),
  )

  if (exact.length === 1) return exact[0].character
  if (exact.length > 1) return null

  const nameWords = significantWords(normalizedName)

  if (!nameWords.length) return null

  if (nameWords.length === 1) {
    const aliasMatches = entries.filter((entry) =>
      entry.aliases.some((alias) =>
        significantWords(alias).includes(nameWords[0]),
      ),
    )

    if (aliasMatches.length === 1) return aliasMatches[0].character
    if (aliasMatches.length > 1) return null
  }

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

const prettify = (value) => {
  const text = Array.isArray(value) ? value[0] : value

  if (!text || typeof text !== "string") return null

  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

const resolveNames = (swapi, akababMatch, planetNames, specieNames) => ({
  species_name:
    specieNames.get(extractIdFromUrl(swapi.species[0])) ||
    prettify(akababMatch?.species),

  homeworld_name:
    planetNames.get(extractIdFromUrl(swapi.homeworld)) ||
    prettify(akababMatch?.homeworld),
})

const related_aliases = new Map([
  ["ben solo", "kylo ren"],
  ["kylo ren", "supreme leader kylo ren"],
  ["darth sidious", "palpatine"]
])

const findRelatedCharacters = (names, akabab, databankEntries) =>
  toArray(names).map((name) => {
    const cleanName = name.replace(/\s*\([^)]*\)/g, "").trim()
    const normalizedName = normalizeName(cleanName)

    const searchName = related_aliases.get(normalizedName) || normalizedName

    const akababMatch = akabab.get(searchName)

    const databankMatch = findDatabankCharacter(searchName, databankEntries)

    return {
      name: akababMatch?.name || databankMatch?.name || cleanName,
      image: akababMatch?.image || databankMatch?.image || null,
    }
  })

const findCharacterFilms = (films, movies) => {
  return toArray(films)
    .map((url) => {
      const id = extractIdFromUrl(url)

      if (!id) return null

      const movie = movies.find(
        (item) => Number(extractIdFromUrl(item.url)) === Number(id),
      )

      if (!movie) return null

      return {
        id: extractIdFromUrl(movie.url),
        title: movie.title,
        image: movie.image || null,
      }
    })
    .filter(Boolean)
}

const enrich = (
  swapi,
  databankMatch,
  akababMatch,
  names,
  akabab,
  databankEntries,
  movies,
) => ({
  ...swapi,
  ...names,

  image: akababMatch?.image || databankMatch?.image || null,
  description: databankMatch?.description || "",

  // Akabab
  born: akababMatch?.born || null,
  died: akababMatch?.died || null,
  bornLocation: akababMatch?.bornLocation || null,
  diedLocation: akababMatch?.diedLocation || null,

  height: firstValid(swapi.height, akababMatch?.height),
  mass: firstValid(swapi.mass, akababMatch?.mass),

  hairColor: akababMatch?.hairColor || null,
  eyeColor: akababMatch?.eyeColor || null,
  skinColor: akababMatch?.skinColor || null,

  cybernetics: toArray(akababMatch?.cybernetics),
  affiliations: toArray(akababMatch?.affiliations),
  formerAffiliations: toArray(akababMatch?.formerAffiliations),
  masters: findRelatedCharacters(akababMatch?.masters, akabab, databankEntries),
  apprentices: findRelatedCharacters(
    akababMatch?.apprentices,
    akabab,
    databankEntries,
  ),
  films: findCharacterFilms(swapi.films, movies),
})

async function getOptionalData() {
  const results = await Promise.allSettled([
    getDatabankIndex(),
    getAkababIndex(),
    getPlanetNames(),
    getSpecieNames(),
    getMoviesList(),
  ])

  const [
    databankResult,
    akababResult,
    planetsResult,
    speciesResult,
    moviesResult,
  ] = results

  if (databankResult.status === "rejected") {
    console.error(
      "Error to loading characters Databank:",
      databankResult.reason,
    )
  }

  if (akababResult.status === "rejected") {
    console.error("Error to loading characters Akabab:", akababResult.reason)
  }

  if (planetsResult.status === "rejected") {
    console.error("Error to loading planet names:", planetsResult.reason)
  }

  if (speciesResult.status === "rejected") {
    console.error("Error to loading species names:", speciesResult.reason)
  }

  if (moviesResult.status === "rejected") {
    console.error("Error loading movies:", moviesResult.reason)
  }

  return {
    databankEntries:
      databankResult.status === "fulfilled" ? databankResult.value : [],

    akabab:
      akababResult.status === "fulfilled" ? akababResult.value : new Map(),

    planetNames:
      planetsResult.status === "fulfilled" ? planetsResult.value : new Map(),

    specieNames:
      speciesResult.status === "fulfilled" ? speciesResult.value : new Map(),

    movies: moviesResult.status === "fulfilled" ? moviesResult.value : [],
  }
}

export async function getCharacters() {
  const [swapiData, optionalData] = await Promise.all([
    getPeople(),
    getOptionalData(),
  ])

  const { databankEntries, akabab, planetNames, specieNames, movies } =
    optionalData

  const usedIds = new Set()

  const merged = toList(swapiData).map((raw) => {
    const swapi = normalizeSwapiCharacter(raw)

    const databankMatch = findDatabankCharacter(swapi.name, databankEntries)

    const akababMatch = akabab.get(normalizeName(swapi.name))

    if (databankMatch) {
      usedIds.add(databankMatch._id)
    }

    return enrich(
      swapi,
      databankMatch,
      akababMatch,
      resolveNames(swapi, akababMatch, planetNames, specieNames),
      akabab,
      databankEntries,
      movies,
    )
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
  const [raw, optionalData] = await Promise.all([
    getPerson(id),
    getOptionalData(),
  ])

  const { databankEntries, akabab, planetNames, specieNames, movies } =
    optionalData

  const swapi = normalizeSwapiCharacter(raw)

  const akababMatch = akabab.get(normalizeName(swapi.name))
  const databankMatch = findDatabankCharacter(swapi.name, databankEntries)

  return enrich(
    swapi,
    databankMatch,
    akababMatch,
    resolveNames(swapi, akababMatch, planetNames, specieNames),
    akabab,
    databankEntries,
    movies,
  )
}
