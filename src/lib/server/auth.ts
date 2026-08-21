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

const bytesToHex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const toArrayBuffer = (bytes: Uint8Array) => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

async function derivePbkdf2(password: string, salt: Uint8Array, iterationCount: number) {
  const passwordBytes = new TextEncoder().encode(password);
  const key = await crypto.subtle.importKey("raw", toArrayBuffer(passwordBytes), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: toArrayBuffer(salt),
      iterations: iterationCount
    },
    key,
    256
  );
  return new Uint8Array(bits);
}

function equalBytes(a: Uint8Array, b: Uint8Array) {
  if (a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a[index] ^ b[index];
  }
  return difference === 0;
}

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
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

export async function hashPassword(password: string, salt = randomToken(16)) {
  const derived = await derivePbkdf2(password, hexToBytes(salt), iterations);
  return `pbkdf2-sha256$${iterations}$${salt}$${bytesToHex(derived)}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterationText, salt, expected] = storedHash.split("$");
  if (algorithm !== "pbkdf2-sha256" || !iterationText || !salt || !expected) return false;
  const actual = await derivePbkdf2(password, hexToBytes(salt), Number(iterationText));
  const expectedBytes = hexToBytes(expected);
  return equalBytes(actual, expectedBytes);
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
