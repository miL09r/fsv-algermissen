import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  let workerKeys: string[] = [];
  try {
    const workerModule = await import("cloudflare:workers");
    workerKeys = Object.keys(workerModule.env ?? {});
  } catch {
    workerKeys = [];
  }

  return Response.json({
    localKeys: Object.keys((locals as { runtime?: { env?: Record<string, unknown> } }).runtime?.env ?? {}),
    workerKeys
  });
};
