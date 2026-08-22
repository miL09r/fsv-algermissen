import { runFussballImport } from "../src/lib/server/fussball-import";
import type { D1DatabaseLike } from "../src/lib/server/auth";

type Env = {
  DB: D1DatabaseLike;
};

export default {
  async scheduled(_controller: unknown, env: Env, ctx: { waitUntil: (promise: Promise<unknown>) => void }) {
    ctx.waitUntil(runFussballImport(env.DB));
  },

  async fetch(request: Request, env: Env) {
    if (request.method !== "POST") {
      return Response.json({ ok: false, message: "POST required" }, { status: 405 });
    }

    const result = await runFussballImport(env.DB);
    return Response.json({ ok: true, ...result });
  }
};
