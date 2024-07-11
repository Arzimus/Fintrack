import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import accounts from './accounts'
import { HTTPException } from 'hono/http-exception'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  return c.json({ error: "Internal Error" }, 401)
})

const routes = app.route("/accounts", accounts)

// enable hono to work on get and post routes this overwrites the existing route handlers
export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof routes;
