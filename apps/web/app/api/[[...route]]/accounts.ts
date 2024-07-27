import { z } from "zod";
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { eq, and, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { zValidator } from "@hono/zod-validator";
import { accounts, insertAccountSchema } from "@/db/schema";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";


const app = new Hono()
    .get("/",
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);

            if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

            const data = await db.select({
                id: accounts.id,
                name: accounts.name
            })
                .from(accounts)
                .where(eq(accounts.userId, auth.userId));

            return c.json({ data });
        })
    .post("/",
        clerkMiddleware(),
        zValidator("json", insertAccountSchema.pick({
            name: true
        })),
        async (c) => {
            const auth = getAuth(c);
            const val = c.req.valid("json");

            if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

            // SQL always returns an array
            // But since we're doing a POST request we get a unique value
            // So we can destructure it off the bat
            const [data] = await db.insert(accounts).values({
                id: createId(),
                userId: auth.userId,
                ...val,
            }).returning();

            return c.json({ data });
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
            const auth = getAuth(c);
            const val = c.req.valid("json");

            if (!auth?.userId) return c.json({ error: "Unauthorized" }, 401);

            const data = await db
                .delete(accounts)
                .where(
                    and(
                        eq(accounts.userId, auth.userId),
                        inArray(accounts.id, val.ids)
                    )
                )
                .returning({
                    id: accounts.id
                });

            return c.json({ data });
        }
    )

export default app;