import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})
// enable hono to work on get and post routes this overwrites the existing route handlers
export const GET = handle(app)
export const POST = handle(app)