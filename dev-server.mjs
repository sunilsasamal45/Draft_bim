// Local dev server — runs api/contact.js alongside Vite during development.
// NOT used in production. Vercel runs api/contact.js natively.
import 'dotenv/config'
import express from 'express'
import handler from './api/contact.js'

const app = express()
app.use(express.json())
app.post('/api/contact', handler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`[dev-server] API running at http://localhost:${PORT}/api/contact`)
})
