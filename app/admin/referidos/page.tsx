// Zielpfad im Repo: app/admin/referidos/page.tsx (ersetzt die bestehende Datei)
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { signOutAdmin } from "./actions";
import { StatusSelect, NotesField, ReferrerSelect, STATUS_LABELS } from "./LeadControls";
import { CommissionSelect, CreateLoginButton, EditReferrerButton, NewReferrerForm } from "./ReferrerControls";

type Referrer = {
  id: string;
  name: string;
  cedula: string;
  whatsapp: string;
  email: string | null;
  code: string;
  created_at: string;
  user_id: string | null;
  commission_percent: number | null;
  onboarded: boolean;
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

type ReferralLinkVisit = {
  source_type: "referrer" | "catalog";
  code: string;
};

type Tenant = {
  slug: string;
  name: string;
};

function catalogLabel(slug: string, tenants: Tenant[]) {
  return tenants.find((t) => t.slug === slug)?.name ?? slug;
}

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

  const [{ data: referrersData }, { data: leadsData }, { data: visitsData }, { data: tenantsData }] =
    await Promise.all([
      supabase.from("referrers").select("*").order("created_at", { ascending: false }),
      supabase.from("referral_leads").select("*").order("created_at", { ascending: false }),
      supabase.from("referral_link_visits").select("source_type, code"),
      supabase.from("tenants").select("slug, name"),
    ]);

  const referrers = (referrersData ?? []) as Referrer[];
  const leads = (leadsData ?? []) as ReferralLead[];
  const visits = (visitsData ?? []) as ReferralLinkVisit[];
  const tenants = (tenantsData ?? []) as Tenant[];

  const referrerById = new Map(referrers.map((r) => [r.id, r]));
  const leadCountByReferrer = new Map<string, number>();
  for (const lead of leads) {
    if (lead.referrer_id) {
      leadCountByReferrer.set(lead.referrer_id, (leadCountByReferrer.get(lead.referrer_id) ?? 0) + 1);
    }
  }

  const clickCountByReferrerCode = new Map<string, number>();
  const clickCountByCatalogCode = new Map<string, number>();
  for (const visit of visits) {
    const map = visit.source_type === "referrer" ? clickCountByReferrerCode : clickCountByCatalogCode;
    map.set(visit.code, (map.get(visit.code) ?? 0) + 1);
  }

  const leadCountByCatalogCode = new Map<string, number>();
  for (const lead of leads) {
    if (!lead.referrer_id && lead.referral_code?.startsWith("cat-")) {
      leadCountByCatalogCode.set(lead.referral_code, (leadCountByCatalogCode.get(lead.referral_code) ?? 0) + 1);
    }
  }

  const catalogRows = tenants.map((t) => {
    const code = `cat-${t.slug}`;
    return {
      slug: t.slug,
      name: t.name,
      code,
      clicks: clickCountByCatalogCode.get(code) ?? 0,
      leads: leadCountByCatalogCode.get(code) ?? 0,
    };
  });

  function commissionGs(referrer: Referrer | undefined, count: number) {
    if (!referrer?.commission_percent) return null;
    return Math.round((referrer.commission_percent / 100) * 600000 * count);
  }

  let totalPendingGs = 0;
  let totalPaidGs = 0;
  for (const lead of leads) {
    const referrer = lead.referrer_id ? referrerById.get(lead.referrer_id) : undefined;
    if (!referrer?.commission_percent) continue;
    const amount = Math.round((referrer.commission_percent / 100) * 600000);
    if (lead.status === "cliente") totalPendingGs += amount;
    if (lead.status === "pagado") totalPaidGs += amount;
  }

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
          <strong>Gs. {totalPendingGs.toLocaleString("es-PY")}</strong>
          <span>Por pagar</span>
        </div>
        <div>
          <strong>Gs. {totalPaidGs.toLocaleString("es-PY")}</strong>
          <span>Ya pagado</span>
        </div>
      </div>

      <section>
        <div className="adminReferidosSectionHead">
          <h2>Referidores</h2>
          <NewReferrerForm />
        </div>
        <div className="adminReferidosTableWrap">
          <table className="adminReferidosTable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código</th>
                <th>WhatsApp</th>
                <th>Email</th>
                <th>Cédula</th>
                <th>Clics</th>
                <th>Leads</th>
                <th>Comisión</th>
                <th>Login</th>
                <th>Desde</th>
                <th>Acciones</th>
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
                  <td>{r.email ?? "—"}</td>
                  <td>{r.cedula}</td>
                  <td>{clickCountByReferrerCode.get(r.code) ?? 0}</td>
                  <td>{leadCountByReferrer.get(r.id) ?? 0}</td>
                  <td>
                    <CommissionSelect referrerId={r.id} commissionPercent={r.commission_percent} />
                  </td>
                  <td>
                    <CreateLoginButton
                      referrerId={r.id}
                      code={r.code}
                      hasLogin={Boolean(r.user_id)}
                      onboarded={r.onboarded}
                    />
                  </td>
                  <td>{new Date(r.created_at).toLocaleDateString("es-PY")}</td>
                  <td>
                    <EditReferrerButton referrer={r} />
                  </td>
                </tr>
              ))}
              {referrers.length === 0 && (
                <tr>
                  <td colSpan={11}>Todavía no hay referidores.</td>
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
                <th>Comisión</th>
                <th>Notas</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const referrer = lead.referrer_id ? referrerById.get(lead.referrer_id) : undefined;
                const amount = commissionGs(referrer, 1);
                return (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>
                      {lead.email}
                      {lead.whatsapp ? ` · ${lead.whatsapp}` : ""}
                    </td>
                    <td>
                      <ReferrerSelect leadId={lead.id} referrerId={lead.referrer_id} referrers={referrers} />
                      {!lead.referrer_id && lead.referral_code?.startsWith("cat-") && (
                        <span className="adminReferidosOrphanCode">
                          Vino desde el catálogo: {catalogLabel(lead.referral_code.slice(4), tenants)}
                        </span>
                      )}
                      {!lead.referrer_id && lead.referral_code && !lead.referral_code.startsWith("cat-") && (
                        <span className="adminReferidosOrphanCode">Código usado: {lead.referral_code}</span>
                      )}
                    </td>
                    <td>
                      <StatusSelect leadId={lead.id} status={lead.status} />
                    </td>
                    <td>{amount !== null ? `Gs. ${amount.toLocaleString("es-PY")}` : "—"}</td>
                    <td>
                      <NotesField leadId={lead.id} notes={lead.notes ?? ""} />
                    </td>
                    <td>{new Date(lead.created_at).toLocaleDateString("es-PY")}</td>
                  </tr>
                );
              })}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={7}>Todavía no hay leads referidos.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Tráfico desde catálogos</h2>
        <p className="adminReferidosCatalogNote">
          Cada catálogo tiene su propio link de vuelta a wendelo.online. Acá ves cuántos clics e interesados generó
          cada uno.
        </p>
        <div className="adminReferidosTableWrap">
          <table className="adminReferidosTable">
            <thead>
              <tr>
                <th>Catálogo</th>
                <th>Link a usar</th>
                <th>Clics</th>
                <th>Leads</th>
              </tr>
            </thead>
            <tbody>
              {catalogRows.map((c) => (
                <tr key={c.slug}>
                  <td>{c.name}</td>
                  <td>
                    <code className="adminReferidosCatalogLink">https://wendelo.online?ref={c.code}</code>
                  </td>
                  <td>{c.clicks}</td>
                  <td>{c.leads}</td>
                </tr>
              ))}
              {catalogRows.length === 0 && (
                <tr>
                  <td colSpan={4}>Todavía no hay catálogos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="adminReferidosLegend">
        Estados: {Object.entries(STATUS_LABELS).map(([, label]) => label).join(" → ")}. Comisión = % configurado ×
        Gs. 600.000.
      </p>
    </main>
  );
}
