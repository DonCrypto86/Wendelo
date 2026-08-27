// Zielpfad im Repo: app/admin/referidos/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

const VALID_STATUSES = ["nuevo", "contactado", "cliente", "pagado"];

export async function updateLeadStatus(leadId: string, status: string) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Estado inválido");
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from("referral_leads")
    .update({ status })
    .eq("id", leadId);
  if (error) throw error;
  revalidatePath("/admin/referidos");
}

export async function updateLeadNotes(leadId: string, notes: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("referral_leads")
    .update({ notes })
    .eq("id", leadId);
  if (error) throw error;
  revalidatePath("/admin/referidos");
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/referidos/login");
}
