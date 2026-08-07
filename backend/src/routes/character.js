import { Router } from "express"
import { getCharacter } from "../services/mergeCharacters.js"

const router = Router()

router.get("/:id", async (req, res) => {
  try {
    const character = await getCharacter(req.params.id)
    res.json(character)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router