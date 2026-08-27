// Zielpfad im Repo: app/admin/referidos/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { signOutAdmin } from "./actions";
import { StatusSelect, NotesField, STATUS_LABELS } from "./LeadControls";

type Referrer = {
  id: string;
  name: string;
  cedula: string;
  whatsapp: string;
  code: string;
  created_at: string;
};

type ReferralLead = {
  id: string;
  referrer_id: string | null;
  referral_code: string | null;
  name: string;
  email: string | null;
  whatsapp: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function ReferidosAdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/referidos/login");
  }

  const { data: adminRow } = await supabase
    .from("platform_admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    redirect("/admin/referidos/login");
  }

  const [{ data: referrersData }, { data: leadsData }] = await Promise.all([
    supabase.from("referrers").select("*").order("created_at", { ascending: false }),
    supabase.from("referral_leads").select("*").order("created_at", { ascending: false }),
  ]);

  const referrers = (referrersData ?? []) as Referrer[];
  const leads = (leadsData ?? []) as ReferralLead[];

  const referrerById = new Map(referrers.map((r) => [r.id, r]));
  const leadCountByReferrer = new Map<string, number>();
  for (const lead of leads) {
    if (lead.referrer_id) {
      leadCountByReferrer.set(lead.referrer_id, (leadCountByReferrer.get(lead.referrer_id) ?? 0) + 1);
    }
  }

  const totalCustomers = leads.filter((l) => l.status === "cliente").length;
  const totalPaid = leads.filter((l) => l.status === "pagado").length;
  const pendingPayoutGs = totalCustomers * 90000;

  return (
    <main className="adminReferidosPage">
      <header className="adminReferidosHeader">
        <h1>Panel de referidos</h1>
        <form action={signOutAdmin}>
          <button type="submit">Cerrar sesión</button>
        </form>
      </header>

      <div className="adminReferidosStats">
        <div>
          <strong>{referrers.length}</strong>
          <span>Referidores</span>
        </div>
        <div>
          <strong>{leads.length}</strong>
          <span>Leads totales</span>
        </div>
        <div>
          <strong>{totalCustomers}</strong>
          <span>Por pagar (Gs. {pendingPayoutGs.toLocaleString("es-PY")})</span>
        </div>
        <div>
          <strong>{totalPaid}</strong>
          <span>Comisiones pagadas</span>
        </div>
      </div>

      <section>
        <h2>Referidores</h2>
        <div className="adminReferidosTableWrap">
          <table className="adminReferidosTable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>WhatsApp</th>
                <th>Cédula</th>
                <th>Leads</th>
                <th>Desde</th>
              </tr>
            </thead>
            <tbody>
              {referrers.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>
                    <code>{r.code}</code>
                  </td>
                  <td>{r.whatsapp}</td>
                  <td>{r.cedula}</td>
                  <td>{leadCountByReferrer.get(r.id) ?? 0}</td>
                  <td>{new Date(r.created_at).toLocaleDateString("es-PY")}</td>
                </tr>
              ))}
              {referrers.length === 0 && (
                <tr>
                  <td colSpan={6}>Todavía no hay referidores.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Leads referidos</h2>
        <div className="adminReferidosTableWrap">
          <table className="adminReferidosTable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Referido por</th>
                <th>Estado</th>
                <th>Notas</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const referrer = lead.referrer_id ? referrerById.get(lead.referrer_id) : undefined;
                return (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>
                      {lead.email}
                      {lead.whatsapp ? ` · ${lead.whatsapp}` : ""}
                    </td>
                    <td>{referrer ? `${referrer.name} (${referrer.code})` : lead.referral_code || "—"}</td>
                    <td>
                      <StatusSelect leadId={lead.id} status={lead.status} />
                    </td>
                    <td>
                      <NotesField leadId={lead.id} notes={lead.notes ?? ""} />
                    </td>
                    <td>{new Date(lead.created_at).toLocaleDateString("es-PY")}</td>
                  </tr>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6}>Todavía no hay leads referidos.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="adminReferidosLegend">
        Estados: {Object.entries(STATUS_LABELS).map(([, label]) => label).join(" → ")}. Comisión: Gs. 90.000 por
        cliente que paga la configuración completa.
      </p>
    </main>
  );
}
