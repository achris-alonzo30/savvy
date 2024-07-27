import { Hono } from "hono";

const app = new Hono();

app.get("/", async (c) => {
    return c.json({text: "Hello World!"});
});

export default app;