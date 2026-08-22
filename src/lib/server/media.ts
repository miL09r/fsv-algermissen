import { randomToken, type D1DatabaseLike } from "./auth";

type R2ObjectLike = {
  body: ReadableStream;
  httpMetadata?: { contentType?: string };
  writeHttpMetadata?: (headers: Headers) => void;
};

export type R2BucketLike = {
  get: (key: string) => Promise<R2ObjectLike | null>;
  put: (
    key: string,
    value: ArrayBuffer | ReadableStream,
    options?: { httpMetadata?: { contentType?: string }; customMetadata?: Record<string, string> }
  ) => Promise<unknown>;
};

export async function getMediaBucket(locals: unknown) {
  const runtimeBucket = (locals as { runtime?: { env?: { MEDIA_BUCKET?: R2BucketLike } } }).runtime?.env?.MEDIA_BUCKET;
  if (runtimeBucket) return runtimeBucket;

  try {
    const workerModule = await import("cloudflare:workers");
    return (workerModule.env as { MEDIA_BUCKET?: R2BucketLike }).MEDIA_BUCKET;
  } catch {
    return undefined;
  }
}

export async function uploadMediaFile(
  db: D1DatabaseLike | undefined,
  bucket: R2BucketLike | undefined,
  file: FormDataEntryValue | null,
  uploadedBy?: number
) {
  if (!db || !bucket || !(file instanceof File) || file.size === 0) return undefined;
  if (!file.type.startsWith("image/")) return undefined;

  const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const key = `uploads/${new Date().toISOString().slice(0, 10)}/${randomToken(12)}.${extension}`;

  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
    customMetadata: { originalName: file.name }
  });

  await db
    .prepare(
      `INSERT INTO media (r2_key, filename, mime_type, byte_size, uploaded_by)
       VALUES (?, ?, ?, ?, ?)`
    )
    .bind(key, file.name, file.type, file.size, uploadedBy ?? null)
    .run();

  const media = await db.prepare("SELECT id FROM media WHERE r2_key = ?").bind(key).first<{ id: number }>();
  return media ? `/api/media/${media.id}` : undefined;
}
