import { Router } from "express"
import {
  getCharacters,
  getCreature,
  getMovies,
  getPlanet,
  getSpecie,
  getStarship,
  getVehicle,
  getDroid,
  getLocation,
  getOrganization,
} from "../services/mergeCharacters.js"

const router = Router()

const sources = {
  characters: getCharacters,
  creatures: getCreature,
  movies: getMovies,
  planets: getPlanet,
  ships: getStarship,
  species: getSpecie,
  vehicles: getVehicle,
  droids: getDroid,
  locations: getLocation,
  organizations: getOrganization,
}

let cache = null
let cachedAt = 0
const ONE_HOUR = 60 * 60 * 1000

router.get("/", async (req, res) => {
  try {
    if (cache && Date.now() - cachedAt < ONE_HOUR) {
      return res.json(cache)
    }

    const entries = await Promise.all(
      Object.entries(sources).map(async ([key, fetchList]) => {
        try {
          const list = await fetchList()
          return [key, list.length]
        } catch (error) {
          console.error(`Stats: erro em ${key}`, error)
          return [key, null]
        }
      }),
    )

    const stats = Object.fromEntries(entries)

    if (!entries.some(([, value]) => value === null)) {
      cache = stats
      cachedAt = Date.now()
    }

    res.json(stats)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router