import { Router } from "express"
import { getCharacters } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const characters = await getCharacters()
    res.json(characters)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router