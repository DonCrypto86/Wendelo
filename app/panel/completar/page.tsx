// Zielpfad im Repo: app/panel/completar/page.tsx
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function CompletarPerfilPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [name, setName] = useState("");
  const [cedula, setCedula] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace("/panel/login");
        return;
      }
      supabase.rpc("get_my_referral_dashboard").then(({ data: dashboard, error: rpcError }) => {
        if (!rpcError && dashboard) {
          setName(dashboard.name ?? "");
          setCedula(dashboard.cedula ?? "");
          setWhatsapp(dashboard.whatsapp ?? "");
          setEmail(dashboard.email ?? "");
          setCode(dashboard.code ?? "");
          if (dashboard.onboarded) {
            router.replace("/panel");
            return;
          }
        }
        setChecking(false);
      });
    });
  }, [router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const trimmedCode = code.trim().toLowerCase();
    if (trimmedCode && !/^[a-z0-9][a-z0-9-]{1,30}[a-z0-9]$/.test(trimmedCode)) {
      setError("Tu link solo puede tener letras, números y guiones (3 a 32 caracteres).");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: passwordError } = await supabase.auth.updateUser({ password });
    if (passwordError) {
      setLoading(false);
      setError("No se pudo actualizar la contraseña. Probá de nuevo.");
      return;
    }

    const { error: profileError } = await supabase.rpc("update_own_referrer_profile", {
      p_name: name,
      p_cedula: cedula,
      p_whatsapp: whatsapp,
      p_email: email,
      p_code: trimmedCode || null,
    });
    setLoading(false);

    if (profileError) {
      setError(
        profileError.message?.includes("en uso")
          ? "Ese link ya está en uso. Probá con otro."
          : "No se pudieron guardar tus datos. Probá de nuevo."
      );
      return;
    }

    router.push("/panel");
    router.refresh();
  }

  if (checking) {
    return (
      <main className="adminLoginPage">
        <p>Cargando...</p>
      </main>
    );
  }

  return (
    <main className="adminLoginPage">
      <form className="adminLoginForm panelOnboardForm" onSubmit={handleSubmit}>
        <h1>Completá tu perfil</h1>
        <p className="panelOnboardIntro">
          Es la primera vez que ingresás. Confirmá tus datos y elegí una contraseña nueva para tu cuenta.
        </p>
        <label>
          Nombre completo
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Cédula
          <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
        </label>
        <label>
          WhatsApp
          <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Tu link (opcional, podés dejar el que ya tenés)
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            pattern="[a-zA-Z0-9-]{3,32}"
            placeholder="tu-nombre"
          />
        </label>
        <p className="panelOnboardCodePreview">wendelo.online?ref={code.trim().toLowerCase() || "..."}</p>
        <label>
          Nueva contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </label>
        <label>
          Repetí la contraseña
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            minLength={8}
          />
        </label>
        {error && <p className="adminLoginError">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar y entrar a mi panel"}
        </button>
      </form>
    </main>
  );
}
