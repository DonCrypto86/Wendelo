// Zielpfad im Repo: app/panel/actions.ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";

export async function signOutReferrer() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/panel/login");
}
