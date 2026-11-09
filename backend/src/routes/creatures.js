import { Router } from "express"
import { getCreature } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const creature = await getCreature()
    res.json(creature)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router