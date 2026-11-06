import { Router } from "express"
import { getVehicle } from "../services/mergeCharacters.js"

const router = Router()

router.get("/", async (req, res) => {
  try {
    const vehicles = await getVehicle()
    res.json(vehicles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
})

export default router