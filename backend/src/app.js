import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"

import charactersRouter from "./routes/characters.js"
import characterRouter from "./routes/character.js"
import moviesRoutes from "./routes/movies.js"

const app = express()

const allowedOrigins = [
  "http://localhost:5173",
  "https://star-wars-src.vercel.app",
]

app.use(
  cors({
    origin: allowedOrigins,
  }),
)

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" })
})

app.use("/characters", charactersRouter)
app.use("/character", characterRouter)
app.use("/movies", moviesRoutes)

export default app