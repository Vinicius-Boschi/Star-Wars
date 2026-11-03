import "dotenv/config"
import app from "./app.js"

const PORT = process.env.PORT || 3000

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
  })
}

export default app