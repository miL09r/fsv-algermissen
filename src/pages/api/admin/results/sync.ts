import type { APIRoute } from "astro";
import { getCurrentUser, getDb } from "../../../../lib/server/auth";
import { runFussballImport } from "../../../../lib/server/fussball-import";

export const prerender = false;

export const POST: APIRoute = async ({ locals, cookies, redirect }) => {
  const db = await getDb(locals);
  const currentUser = await getCurrentUser(db, cookies);
  if (!db || !currentUser) return redirect("/admin/teams?sync=auth#ergebnisse", 303);
  if (currentUser.role !== "admin") return redirect("/admin/teams?sync=forbidden#ergebnisse", 303);

  const result = await runFussballImport(db);
  const status = result.parsed > 0 ? "ok" : "empty";
  return redirect(`/admin/teams?sync=${status}&inserted=${result.inserted}&updated=${result.updated}#ergebnisse`, 303);
};
