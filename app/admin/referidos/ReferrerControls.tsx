// Zielpfad im Repo: app/admin/referidos/ReferrerControls.tsx
"use client";

import { useState, useTransition } from "react";
import { Copy, KeyRound } from "lucide-react";
import { updateReferrerCommission, createReferrerLogin } from "./actions";

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

export function CreateLoginButton({
  referrerId,
  code,
  hasLogin,
  onboarded,
}: {
  referrerId: string;
  code: string;
  hasLogin: boolean;
  onboarded: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [credentials, setCredentials] = useState<{ email: string; tempPassword: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const loginEmail = `${code}@login.wendelo.local`;

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
