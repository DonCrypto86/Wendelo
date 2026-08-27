// Zielpfad im Repo: app/admin/referidos/ReferrerControls.tsx
"use client";

import { useState, useTransition, type FormEvent } from "react";
import { Copy, KeyRound, Pencil, Plus } from "lucide-react";
import {
  updateReferrerCommission,
  createReferrerLogin,
  updateReferrerProfile,
  createReferrerManually,
  updateReferrerCode,
} from "./actions";

const COMMISSION_OPTIONS = [15, 20, 30, 50];

export function CommissionSelect({ referrerId, commissionPercent }: { referrerId: string; commissionPercent: number | null }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      className="adminReferidosStatus"
      defaultValue={commissionPercent ?? ""}
      disabled={isPending}
      onChange={(e) => {
        const value = Number(e.target.value);
        if (!value) return;
        startTransition(() => {
          updateReferrerCommission(referrerId, value);
        });
      }}
    >
      <option value="" disabled>
        Sin definir
      </option>
      {COMMISSION_OPTIONS.map((pct) => (
        <option key={pct} value={pct}>
          {pct}%
        </option>
      ))}
    </select>
  );
}

function CopyableLogin({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="adminReferidosLoginEmail"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // no-op
        }
      }}
    >
      <Copy size={11} /> {copied ? "¡Copiado!" : email}
    </button>
  );
}

export function EditCodeButton({ referrerId, code }: { referrerId: string; code: string }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!editing) {
    return (
      <div className="adminReferidosCodeCell">
        <code>{code}</code>
        <button type="button" className="adminReferidosEditCodeBtn" onClick={() => setEditing(true)}>
          <Pencil size={11} />
        </button>
      </div>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const value = String(new FormData(e.currentTarget).get("code") ?? "");
    startTransition(async () => {
      try {
        await updateReferrerCode(referrerId, value);
        setEditing(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al guardar");
      }
    });
  }

  return (
    <form className="adminReferidosCodeForm" onSubmit={handleSubmit}>
      <input name="code" defaultValue={code} required disabled={isPending} pattern="[a-z0-9][a-z0-9-]{1,30}[a-z0-9]" />
      <div className="adminReferidosEditFormActions">
        <button type="submit" disabled={isPending}>
          {isPending ? "..." : "Guardar"}
        </button>
        <button type="button" disabled={isPending} onClick={() => setEditing(false)}>
          Cancelar
        </button>
      </div>
      {error && <p className="adminReferidosError">{error}</p>}
    </form>
  );
}

export function EditReferrerButton({
  referrer,
}: {
  referrer: { id: string; name: string; cedula: string; whatsapp: string; email: string | null };
}) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!editing) {
    return (
      <button type="button" className="adminReferidosEditBtn" onClick={() => setEditing(true)}>
        <Pencil size={12} /> Editar
      </button>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const fields = {
      name: String(data.get("name") ?? ""),
      cedula: String(data.get("cedula") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      email: String(data.get("email") ?? ""),
    };
    startTransition(async () => {
      try {
        await updateReferrerProfile(referrer.id, fields);
        setEditing(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al guardar");
      }
    });
  }

  return (
    <form className="adminReferidosEditForm" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="name" defaultValue={referrer.name} required disabled={isPending} />
      </label>
      <label>
        Cédula
        <input name="cedula" defaultValue={referrer.cedula} required disabled={isPending} />
      </label>
      <label>
        WhatsApp
        <input name="whatsapp" defaultValue={referrer.whatsapp} required disabled={isPending} />
      </label>
      <label>
        Email
        <input name="email" type="email" defaultValue={referrer.email ?? ""} disabled={isPending} />
      </label>
      {error && <p className="adminReferidosError">{error}</p>}
      <div className="adminReferidosEditFormActions">
        <button type="submit" disabled={isPending}>
          {isPending ? "Guardando..." : "Guardar"}
        </button>
        <button type="button" disabled={isPending} onClick={() => setEditing(false)}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export function NewReferrerForm() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  if (!open) {
    return (
      <button type="button" className="adminReferidosNewBtn" onClick={() => setOpen(true)}>
        <Plus size={14} /> Nuevo referidor
      </button>
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const data = new FormData(e.currentTarget);
    const fields = {
      name: String(data.get("name") ?? ""),
      cedula: String(data.get("cedula") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      email: String(data.get("email") ?? ""),
    };
    startTransition(async () => {
      try {
        const result = await createReferrerManually(fields);
        setCreatedCode(result.code);
        (e.target as HTMLFormElement).reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al crear el referidor");
      }
    });
  }

  return (
    <div className="adminReferidosNewFormWrap">
      <form className="adminReferidosEditForm adminReferidosNewForm" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input name="name" required disabled={isPending} />
        </label>
        <label>
          Cédula
          <input name="cedula" required disabled={isPending} />
        </label>
        <label>
          WhatsApp
          <input name="whatsapp" required disabled={isPending} />
        </label>
        <label>
          Email
          <input name="email" type="email" disabled={isPending} />
        </label>
        {error && <p className="adminReferidosError">{error}</p>}
        {createdCode && (
          <p className="adminReferidosNewSuccess">
            Creado con código <strong>{createdCode}</strong>. Ahora podés asignarle comisión y crear su login abajo
            en la tabla.
          </p>
        )}
        <div className="adminReferidosEditFormActions">
          <button type="submit" disabled={isPending}>
            {isPending ? "Creando..." : "Crear"}
          </button>
          <button type="button" disabled={isPending} onClick={() => setOpen(false)}>
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
}

export function CreateLoginButton({
  referrerId,
  loginEmail: existingLoginEmail,
  hasLogin,
  onboarded,
}: {
  referrerId: string;
  loginEmail: string | null;
  hasLogin: boolean;
  onboarded: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [credentials, setCredentials] = useState<{ email: string; tempPassword: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loginEmail = credentials?.email ?? existingLoginEmail ?? "";

  if (hasLogin && !credentials) {
    return (
      <div className="adminReferidosLoginInfo">
        <CopyableLogin email={loginEmail} />
        <span className={onboarded ? "adminReferidosOnboardedYes" : "adminReferidosOnboardedNo"}>
          {onboarded ? "Ya configuró su cuenta" : "Todavía no ingresó"}
        </span>
      </div>
    );
  }

  if (credentials) {
    const text = `Usuario: ${credentials.email}\nContraseña provisoria: ${credentials.tempPassword}\nIngresá en wendelo.online/panel/login y cambiá tu contraseña al entrar.`;
    return (
      <div className="adminReferidosCredentials">
        <p>
          <strong>{credentials.email}</strong>
          <br />
          {credentials.tempPassword}
        </p>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            } catch {
              // no-op
            }
          }}
        >
          <Copy size={12} /> {copied ? "¡Copiado!" : "Copiar para enviar"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="adminReferidosCreateLogin"
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              const result = await createReferrerLogin(referrerId);
              setCredentials(result);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Error al crear el login");
            }
          });
        }}
      >
        <KeyRound size={12} /> {isPending ? "Creando..." : "Crear login"}
      </button>
      {error && <p className="adminReferidosError">{error}</p>}
    </div>
  );
}
