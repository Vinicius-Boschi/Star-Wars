import { Router } from "express"
import { getMovies } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const movies = await getMovies()
    res.json(movies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router