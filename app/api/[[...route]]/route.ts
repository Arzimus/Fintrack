import { Hono } from 'hono'
import { handle } from 'hono/vercel'

import accounts from './accounts'
import categories from './categories'
import transactions from './transactions'

export const runtime = 'edge'

const app = new Hono().basePath('/api')


const routes = app
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions)

// enable hono to work on get and post routes this overwrites the existing route handlers
export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)


// The RPC feature allows sharing of the API specifications between the server and the client.
// You can export the types of input type specified by the Validator and the output type 
// emitted by json(). And Hono Client will be able to import it.

export type AppType = typeof routes;
