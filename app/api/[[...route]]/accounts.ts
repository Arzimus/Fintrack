
import { db } from "@/db/drizzle";
import { accounts } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from 'hono/http-exception'

const app = new Hono()
  .get("/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c)
      //  here we throw this http error to maintain the typesaftey that we have used 
      // if there are two return statements then the output could be either be of type 
      // object id and name or an objext of error which might cause an issue further
      if (!auth?.userId) {
        throw new HTTPException(401, {
          res: c.json({ error: "Unauthorized" }, 401)
        })
      }
      const data = await db.select({
        id: accounts.id,
        name: accounts.name
      }).from(accounts)
        .where(eq(accounts.userId, auth.userId))
      return c.json({ data })
    })

export default app; 
