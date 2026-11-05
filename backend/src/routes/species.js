import { Router } from "express"
import { getSpecie } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const species = await getSpecie()
    res.json(species)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router