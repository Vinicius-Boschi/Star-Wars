import { Router } from "express"
import { getOrganization } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const organization = await getOrganization()
    res.json(organization)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router