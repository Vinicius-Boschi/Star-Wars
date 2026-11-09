import { Router } from "express"
import { getLocation } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const location = await getLocation()
    res.json(location)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router