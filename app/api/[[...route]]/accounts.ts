
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { createId } from '@paralleldrive/cuid2'
import { z } from "zod";


const app = new Hono()
  .get("/",
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c)

      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401)
      }
      const data = await db.select({
        id: accounts.id,
        name: accounts.name
      }).from(accounts)
        .where(eq(accounts.userId, auth.userId))
      // data is an array of objects
      return c.json({ data })
    })
  .get("/:id",
    clerkMiddleware(),
    zValidator("param", z.object({
      id: z.string().optional()
    })),

    async (c) => {
      const auth = getAuth(c)
      const { id } = c.req.valid("param")

      if (!id) {
        return c.json({ error: "Missing id" }, 401)
      }

      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401)
      }

      const [data] = await db
        .select({
          id: accounts.id,
          name: accounts.name
        })
        .from(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            eq(accounts.id, id)
          )
        )

      if (!data) {
        return c.json({ error: "Not found" }, 400)
      }

      return c.json({ data })
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator("json", insertAccountSchema.pick({
      name: true
    })),
    async (c) => {
      const auth = getAuth(c);
      // value recives the data posted in the forms
      const values = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401)
      }

      const [data] = await db.insert(accounts).values({
        id: createId(),
        userId: auth?.userId,
        ...values,
      }).returning()
      // .returing to return the inserted row 
      return c.json({ data })
    }
  )
  .post("/bulk-delete",

    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string())
      })
    ),
    async (c) => {
      const auth = getAuth(c)
      const values = c.req.valid("json")

      if (!auth?.userId) {
        return c.json({ error: "unauthorized" }, 401)
      }
      const data = await db
        .delete(accounts)
        .where(
          and(
            eq(accounts.userId, auth.userId),
            inArray(accounts.id, values.ids)
          )
        )
        .returning({
          id: accounts.id,
        })
      // data=array of ids
      return c.json({ data })
    }
  )
export default app;


