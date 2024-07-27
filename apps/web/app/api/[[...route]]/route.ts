import { z } from "zod";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

// You can use `edge` or `node`
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.get("/", async (c) => {
    return c.text("Hello World!");
});

export const GET = handle(app);
export const POST = handle(app);