import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

type D1Statement<T = unknown> = {
  bind: (...values: unknown[]) => D1Statement<T>;
  first: <R = T>() => Promise<R | null>;
  run: () => Promise<{ success: boolean }>;
  all: <R = T>() => Promise<{ results: R[] }>;
};

export type D1DatabaseLike = {
  prepare: <T = unknown>(query: string) => D1Statement<T>;
};

export type AdminUser = {
  id: number;
  email: string;
  name: string;
  role: string;
};

const sessionCookie = "fsv_session";
const iterations = 210000;

const hexToBytes = (hex: string) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
};

export async function getDb(locals: unknown) {
  const runtimeDb = (locals as { runtime?: { env?: { DB?: D1DatabaseLike } } }).runtime?.env?.DB;
  if (runtimeDb) return runtimeDb;

  try {
    const workerModule = await import("cloudflare:workers");
    return (workerModule.env as { DB?: D1DatabaseLike }).DB;
  } catch {
    return undefined;
  }
}

export function randomToken(byteLength = 32) {
  return randomBytes(byteLength).toString("hex");
}

export async function hashPassword(password: string, salt = randomToken(16)) {
  const derived = pbkdf2Sync(password, hexToBytes(salt), iterations, 32, "sha256");
  return `pbkdf2-sha256$${iterations}$${salt}$${derived.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationText, salt, expected] = storedHash.split("$");
  if (algorithm !== "pbkdf2-sha256" || !iterationText || !salt || !expected) return false;
  const actual = pbkdf2Sync(password, hexToBytes(salt), Number(iterationText), 32, "sha256");
  const expectedBytes = hexToBytes(expected);
  return actual.length === expectedBytes.length && timingSafeEqual(actual, expectedBytes);
}

export async function createSession(db: D1DatabaseLike, userId: number) {
  const sessionId = randomToken(32);
  const csrfToken = randomToken(24);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
  await db
    .prepare("INSERT INTO sessions (id, user_id, csrf_token, expires_at) VALUES (?, ?, ?, ?)")
    .bind(sessionId, userId, csrfToken, expiresAt.toISOString())
    .run();
  return { sessionId, expiresAt };
}

export async function getCurrentUser(db: D1DatabaseLike | undefined, cookies: { get: (name: string) => { value: string } | undefined }) {
  const session = cookies.get(sessionCookie)?.value;
  if (!db || !session) return null;
  return db
    .prepare(
      `SELECT users.id, users.email, users.name, roles.name AS role
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       JOIN roles ON roles.id = users.role_id
       WHERE sessions.id = ? AND users.is_active = 1 AND sessions.expires_at > datetime('now')`
    )
    .bind(session)
    .first<AdminUser>();
}

export function setSessionCookie(
  cookies: { set: (name: string, value: string, options: Record<string, unknown>) => void },
  sessionId: string,
  expiresAt: Date
) {
  cookies.set(sessionCookie, sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  });
}

export function clearSessionCookie(cookies: { delete: (name: string, options: Record<string, unknown>) => void }) {
  cookies.delete(sessionCookie, { path: "/" });
}
