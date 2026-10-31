import dotenv from "dotenv"

dotenv.config()

import express from "express"
import cors from "cors"

import charactersRouter from "./routes/characters.js"
import characterRouter from "./routes/character.js"
import moviesRoutes from "./routes/movies.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" })
})

app.use("/characters", charactersRouter)
app.use("/character", characterRouter)
app.use("/movies", moviesRoutes)

export default app