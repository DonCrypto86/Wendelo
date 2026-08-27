// Zielpfad im Repo: app/admin/referidos/actions.ts (ersetzt die bestehende Datei)
"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { createAdminClient } from "../../lib/supabase/admin";

const VALID_LEAD_STATUSES = ["nuevo", "contactado", "cliente", "pagado"];
const VALID_COMMISSIONS = [15, 20, 30, 50];

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("No autenticado");

  const { data: adminRow } = await supabase
    .from("platform_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!adminRow) throw new Error("No autorizado");

  return { supabase, user };
}

export async function updateLeadStatus(leadId: string, status: string) {
  if (!VALID_LEAD_STATUSES.includes(status)) {
    throw new Error("Estado inválido");
  }
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("referral_leads").update({ status }).eq("id", leadId);
  if (error) throw error;
  revalidatePath("/admin/referidos");
}

export async function updateLeadNotes(leadId: string, notes: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("referral_leads").update({ notes }).eq("id", leadId);
  if (error) throw error;
  revalidatePath("/admin/referidos");
}

export async function updateLeadReferrer(leadId: string, referrerId: string | null) {
  const { supabase } = await requireAdmin();

  if (referrerId) {
    const { data: referrer, error: fetchError } = await supabase
      .from("referrers")
      .select("id, code")
      .eq("id", referrerId)
      .single();
    if (fetchError || !referrer) throw new Error("Referidor no encontrado");
    const { error } = await supabase
      .from("referral_leads")
      .update({ referrer_id: referrerId, referral_code: referrer.code })
      .eq("id", leadId);
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from("referral_leads")
      .update({ referrer_id: null })
      .eq("id", leadId);
    if (error) throw error;
  }

  revalidatePath("/admin/referidos");
}

export async function updateReferrerCommission(referrerId: string, percent: number) {
  if (!VALID_COMMISSIONS.includes(percent)) {
    throw new Error("Porcentaje inválido");
  }
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("referrers")
    .update({ commission_percent: percent })
    .eq("id", referrerId);
  if (error) throw error;
  revalidatePath("/admin/referidos");
}

function generateTempPassword() {
  return randomBytes(9).toString("base64url"); // ~12 caracteres, url-safe
}

export async function createReferrerLogin(referrerId: string): Promise<{ email: string; tempPassword: string }> {
  const { supabase } = await requireAdmin();

  const { data: referrer, error: fetchError } = await supabase
    .from("referrers")
    .select("id, code, user_id")
    .eq("id", referrerId)
    .single();
  if (fetchError || !referrer) throw new Error("Referidor no encontrado");
  if (referrer.user_id) throw new Error("Este referidor ya tiene un login");

  const email = `${referrer.code}@login.wendelo.local`;
  const tempPassword = generateTempPassword();

  const admin = createAdminClient();
  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
  });
  if (createError || !created?.user) {
    throw new Error(createError?.message ?? "No se pudo crear el login");
  }

  const { error: linkError } = await admin
    .from("referrers")
    .update({ user_id: created.user.id })
    .eq("id", referrerId);
  if (linkError) throw linkError;

  revalidatePath("/admin/referidos");
  return { email, tempPassword };
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/referidos/login");
}
