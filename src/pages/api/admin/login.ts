import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      ok: false,
      message:
        "Milestone 1 stellt nur das Admin-Grundgeruest bereit. D1-Login, Passwort-Hashing, CSRF und Sessions folgen im naechsten CMS-Schritt."
    }),
    {
      status: 501,
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    }
  );
};
