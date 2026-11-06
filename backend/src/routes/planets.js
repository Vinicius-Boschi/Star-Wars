import { Router } from "express"
import { getPlanet } from "../services/mergeCharacters.js"
import { withContentImage } from "../services/contentImage.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const planets = await getPlanet()
    res.json(withContentImage(planets, "planets"))
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router