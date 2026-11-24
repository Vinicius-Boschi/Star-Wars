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
  cached,
} from "./helpers.js"

import content from "../data/content.json" with { type: "json" }
import { withContentImage } from "./contentImage.js"

const databankSpecies = databankList(fetchDatabankSpecies)
const databankPlanets = databankList(fetchDatabankPlanets)
const databankVehicles = databankList(fetchDatabankVehicles)

const normalizeComparisonName = (name) =>
  normalizeName(name).replace(/\s+/g, "")

function mergeWithDatabank(
  swapiItems,
  databankItems,
  { keepDatabankOnly = false } = {},
) {
  // Remove duplicados do próprio Databank
  const uniqueDatabank = [
    ...new Map(
      databankItems.map((item) => [normalizeComparisonName(item.name), item]),
    ).values(),
  ]

  const byName = indexByName(uniqueDatabank)
  const usedNames = new Set()

  const merged = swapiItems.map((item) => {
    const normalizedName = normalizeComparisonName(item.name)
    const match = byName.get(normalizedName)

    if (match) usedNames.add(normalizedName)

    return {
      ...item,
      id: extractIdFromUrl(item.url),
      image: match?.image || null,
      description: match?.description || "",
    }
  })

  if (!keepDatabankOnly) return merged

  const extras = uniqueDatabank
    .filter((item) => !usedNames.has(normalizeComparisonName(item.name)))
    .map(fromDatabank)

  return [...merged, ...extras]
}

export const getPlanetNames = cached(
  async () =>
    new Map((await getPlanet()).map((planet) => [planet.id, planet.name])),
)

export async function getPlanet() {
  const [{ enrichPlanetResidents }, swapi, databank, films] = await Promise.all(
    [
      import("./charactersFind.js"),
      getPlanets(),
      databankPlanets(),
      getFilms(),
    ],
  )

  const planets = mergeWithDatabank(toList(swapi), databank)
  const allFilms = toList(films)

  const planetsWithCharacters = await enrichPlanetResidents(planets)

  return planetsWithCharacters.map((planet) => ({
    ...planet,

    films: allFilms
      .filter((film) =>
        toList(film.planets).some(
          (url) => Number(extractIdFromUrl(url)) === Number(planet.id),
        ),
      )
      .map((film) => {
        const movie = content.movies.find(
          (item) => Number(item.id) === Number(film.episode_id),
        )

        return {
          ...film,
          id: extractIdFromUrl(film.url),
          image: movie?.image || null,
        }
      }),
  }))
}

export async function getVehicle() {
  const [{ enrichVehiclePilots }, swapi, databank, filmsData] =
    await Promise.all([
      import("./charactersFind.js"),
      getVehicles(),
      databankVehicles(),
      getFilms(),
    ])

  const vehicles = mergeWithDatabank(toList(swapi), databank, {
    keepDatabankOnly: true,
  })

  const films = toList(filmsData)

  const vehiclesWithPilots = await enrichVehiclePilots(vehicles)

  return vehiclesWithPilots.map((vehicle) => ({
    ...vehicle,

    films: films
      .filter((film) =>
        toList(film.vehicles).some(
          (url) => Number(extractIdFromUrl(url)) === Number(vehicle.id),
        ),
      )
      .map((film) => {
        const movie = content.movies.find(
          (item) => Number(item.id) === Number(film.episode_id),
        )

        return {
          id: extractIdFromUrl(film.url),
          title: film.title,
          image: movie?.image || null,
        }
      }),
  }))
}

function resolveRelations(urls, items) {
  const itemsById = new Map(items.map((item) => [Number(item.id), item]))

  return toList(urls)
    .map((url) => {
      const id = extractIdFromUrl(url)

      return itemsById.get(Number(id)) || null
    })
    .filter(Boolean)
}

export async function getMovies() {
  const films = toList(await getFilms())

  const movies = films.map((film) => {
    const movie = content.movies.find(
      (item) => Number(item.id) === Number(film.episode_id),
    )

    return {
      ...film,
      id: extractIdFromUrl(film.url),
      image: movie?.image || null,
    }
  })

  const [{ enrichMovieCharacters }, planets, species, vehicles, starships] =
    await Promise.all([
      import("./charactersFind.js"),
      getPlanet(),
      getSpecie(),
      getVehicle(),
      getStarship(),
    ])

  const moviesWithCharacters = await enrichMovieCharacters(movies)

  return moviesWithCharacters.map((movie) => ({
    ...movie,
    planets: resolveRelations(
      movie.planets,
      withContentImage(planets, "planets"),
    ),
    starships: resolveRelations(movie.starships, starships),
    vehicles: resolveRelations(movie.vehicles, vehicles),
    species: resolveRelations(movie.species, species),
  }))
}

export async function getStarship() {
  const [{ enrichStarshipPilots }, starshipsData, filmsData] =
    await Promise.all([
      import("./charactersFind.js"),
      getStarships(),
      getFilms(),
    ])

  const starships = toList(starshipsData)
  const films = toList(filmsData)

  const normalizedStarships = starships.map((starship) => ({
    ...starship,
    id: extractIdFromUrl(starship.url),
    image: null,
    description: "",
  }))

  const starshipsWithPilots = await enrichStarshipPilots(normalizedStarships)

  return starshipsWithPilots.map((starship) => ({
    ...starship,

    films: films
      .filter((film) =>
        toList(film.starships).some(
          (url) => Number(extractIdFromUrl(url)) === Number(starship.id),
        ),
      )
      .map((film) => {
        const movie = content.movies.find(
          (item) => Number(item.id) === Number(film.episode_id),
        )

        return {
          id: extractIdFromUrl(film.url),
          title: film.title,
          image: movie?.image || null,
        }
      }),
  }))
}

export async function getSpecie() {
  const [{ enrichSpeciesPeople }, swapiData, databank, planetNames, filmsData] =
    await Promise.all([
      import("./charactersFind.js"),
      getSpecies(),
      databankSpecies(),
      getPlanetNames(),
      getFilms(),
    ])

  const films = toList(filmsData)

  const species = mergeWithDatabank(toList(swapiData), databank, {
    keepDatabankOnly: true,
  }).map((specie) => ({
    ...specie,
    id: specie.id ?? extractIdFromUrl(specie.url),
    homeworld_name: specie.homeworld
      ? planetNames.get(extractIdFromUrl(specie.homeworld)) || null
      : null,
  }))

  const speciesWithPeople = await enrichSpeciesPeople(species)

  return speciesWithPeople.map((specie) => ({
    ...specie,

    films: films
      .filter((film) =>
        toList(film.species).some(
          (url) => Number(extractIdFromUrl(url)) === Number(specie.id),
        ),
      )
      .map((film) => {
        const movie = content.movies.find(
          (item) => Number(item.id) === Number(film.episode_id),
        )

        return {
          id: extractIdFromUrl(film.url),
          title: film.title,
          image: movie?.image || null,
        }
      }),
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
