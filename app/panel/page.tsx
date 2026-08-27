// Zielpfad im Repo: app/panel/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "../lib/supabase/server";
import { signOutReferrer } from "./actions";
import MaterialesSection from "./MaterialesSection";
import PanelLinkBox from "./PanelLinkBox";

type DashboardCounts = {
  nuevo: number;
  contactado: number;
  cliente: number;
  pagado: number;
};

type Dashboard = {
  code: string;
  name: string;
  cedula: string;
  whatsapp: string;
  commission_percent: number | null;
  onboarded: boolean;
  leads: { name: string; status: string; created_at: string }[];
  counts: DashboardCounts;
};

const STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cliente: "Cliente (pagó)",
  pagado: "Comisión pagada",
};

export const dynamic = "force-dynamic";

export default async function PanelPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/panel/login");
  }

  const { data, error } = await supabase.rpc("get_my_referral_dashboard");

  if (error || !data) {
    redirect("/panel/login");
  }

  const dashboard = data as Dashboard;

  if (!dashboard.onboarded) {
    redirect("/panel/completar");
  }

  const link = `https://wendelo.online?ref=${dashboard.code}`;
  const totalLeads =
    dashboard.counts.nuevo + dashboard.counts.contactado + dashboard.counts.cliente + dashboard.counts.pagado;

  const pendingGs = dashboard.commission_percent
    ? Math.round((dashboard.commission_percent / 100) * 600000 * dashboard.counts.cliente)
    : null;
  const paidGs = dashboard.commission_percent
    ? Math.round((dashboard.commission_percent / 100) * 600000 * dashboard.counts.pagado)
    : null;

  return (
    <main className="panelPage">
      <header className="panelHeader">
        <div>
          <h1>Hola, {dashboard.name.split(" ")[0]}</h1>
          <p>Tu código: <code>{dashboard.code}</code></p>
        </div>
        <form action={signOutReferrer}>
          <button type="submit">Cerrar sesión</button>
        </form>
      </header>

      <PanelLinkBox link={link} />

      {dashboard.commission_percent ? (
        <div className="panelStats">
          <div>
            <strong>{totalLeads}</strong>
            <span>Personas referidas</span>
          </div>
          <div>
            <strong>{dashboard.counts.cliente}</strong>
            <span>Se hicieron clientes</span>
          </div>
          <div>
            <strong>Gs. {(pendingGs ?? 0).toLocaleString("es-PY")}</strong>
            <span>Por cobrar ({dashboard.commission_percent}%)</span>
          </div>
          <div>
            <strong>Gs. {(paidGs ?? 0).toLocaleString("es-PY")}</strong>
            <span>Ya cobrado</span>
          </div>
        </div>
      ) : (
        <div className="panelStats">
          <div>
            <strong>{totalLeads}</strong>
            <span>Personas referidas</span>
          </div>
          <div>
            <strong>{dashboard.counts.cliente}</strong>
            <span>Se hicieron clientes</span>
          </div>
        </div>
      )}

      {!dashboard.commission_percent && (
        <p className="panelCommissionPending">
          Tu porcentaje de comisión todavía no fue configurado. Escribinos si tenés dudas.
        </p>
      )}

      <section className="panelLeadsSection">
        <h2>Tus referidos</h2>
        {dashboard.leads.length === 0 ? (
          <p className="panelEmptyState">Todavía no tenés referidos. Compartí tu link para empezar.</p>
        ) : (
          <div className="adminReferidosTableWrap">
            <table className="adminReferidosTable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.leads.map((lead, i) => (
                  <tr key={i}>
                    <td>{lead.name}</td>
                    <td>{STATUS_LABELS[lead.status] ?? lead.status}</td>
                    <td>{new Date(lead.created_at).toLocaleDateString("es-PY")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <MaterialesSection link={link} />
    </main>
  );
}
