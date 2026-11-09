import { Router } from "express"
import { getStarship } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const starships = await getStarship()
    res.json(starships)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router