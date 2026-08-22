import type { APIRoute } from "astro";
import { getDb } from "../../../lib/server/auth";
import { getMediaBucket } from "../../../lib/server/media";

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const db = await getDb(locals);
  const bucket = await getMediaBucket(locals);
  const id = Number(params.id);
  if (!db || !bucket || !Number.isFinite(id)) return new Response("Not found", { status: 404 });

  const media = await db
    .prepare("SELECT r2_key, mime_type FROM media WHERE id = ?")
    .bind(id)
    .first<{ r2_key: string; mime_type: string }>();
  if (!media) return new Response("Not found", { status: 404 });

  const object = await bucket.get(media.r2_key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata?.(headers);
  headers.set("content-type", headers.get("content-type") || media.mime_type || "application/octet-stream");
  headers.set("cache-control", "public, max-age=31536000, immutable");
  return new Response(object.body, { headers });
};
