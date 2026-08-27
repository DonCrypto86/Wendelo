// Zielpfad im Repo: app/admin/referidos/LeadControls.tsx
"use client";

import { useTransition } from "react";
import { updateLeadStatus, updateLeadNotes, updateLeadReferrer } from "./actions";

export const STATUS_LABELS: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cliente: "Cliente (pagó)",
  pagado: "Comisión pagada",
};

export function StatusSelect({ leadId, status }: { leadId: string; status: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      className="adminReferidosStatus"
      data-status={status}
      onChange={(e) => {
        const value = e.target.value;
        startTransition(() => {
          updateLeadStatus(leadId, value);
        });
      }}
    >
      {Object.entries(STATUS_LABELS).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}

export function ReferrerSelect({
  leadId,
  referrerId,
  referrers,
}: {
  leadId: string;
  referrerId: string | null;
  referrers: { id: string; name: string; code: string }[];
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={referrerId ?? ""}
      disabled={isPending}
      className="adminReferidosReferrerSelect"
      onChange={(e) => {
        const value = e.target.value || null;
        startTransition(() => {
          updateLeadReferrer(leadId, value);
        });
      }}
    >
      <option value="">— Sin referidor —</option>
      {referrers.map((r) => (
        <option key={r.id} value={r.id}>
          {r.name} ({r.code})
        </option>
      ))}
    </select>
  );
}

export function NotesField({ leadId, notes }: { leadId: string; notes: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="adminReferidosNotesForm"
      onSubmit={(e) => {
        e.preventDefault();
        const value = String(new FormData(e.currentTarget).get("notes") ?? "");
        startTransition(() => {
          updateLeadNotes(leadId, value);
        });
      }}
    >
      <input name="notes" defaultValue={notes} placeholder="Notas..." disabled={isPending} />
      <button type="submit" disabled={isPending}>
        {isPending ? "..." : "Guardar"}
      </button>
    </form>
  );
}
