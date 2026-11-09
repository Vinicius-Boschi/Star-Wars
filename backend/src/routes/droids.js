import { Router } from "express"
import { getDroid } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const droid = await getDroid()
    res.json(droid)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router