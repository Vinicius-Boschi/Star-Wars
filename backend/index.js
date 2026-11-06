import "dotenv/config"
import express from "express"
import cors from "cors"

import charactersRouter from "./src/routes/characters.js"
import characterRouter from "./src/routes/character.js"
import moviesRouter from "./src/routes/movies.js"
import planetsRouter from "./src/routes/planets.js"
import speciesRouter from "./src/routes/species.js"
import vehiclesRouter from "./src/routes/vehicles.js"

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://star-wars-src.vercel.app",
]

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" })
})

app.use("/characters", charactersRouter)
app.use("/character", characterRouter)
app.use("/movies", moviesRouter)
app.use("/planets", planetsRouter)
app.use("/species", speciesRouter)
app.use("/vehicles", vehiclesRouter)

export default app