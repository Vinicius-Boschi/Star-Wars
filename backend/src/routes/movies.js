import { Router } from "express"
import { getMovies } from "../services/mergeCharacters.js"
import { withContentImage } from "../services/contentImage.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const movies = await getMovies()
    const result = withContentImage(movies, "movies", "title").map((movie) => ({
      ...movie,
      id: movie.episode_id,
    }))
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router