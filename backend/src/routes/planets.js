import { Router } from "express"
import { getPlanet } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const planets = await getPlanet()
    res.json(planets)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router