// Zielpfad im Repo: app/ReferralVisitTracker.tsx
// Einmal einbinden, z.B. in app/layout.tsx (gilt dann automatisch auch für
// /de/*, da das Root-Layout für alle Routen gerendert wird):
//
//   import ReferralVisitTracker from "./ReferralVisitTracker";
//   ...
//   <body>
//     <ReferralVisitTracker />
//     {children}
//   </body>
"use client";

import { useEffect } from "react";
import { createClient } from "./lib/supabase/client";

export default function ReferralVisitTracker() {
  useEffect(() => {
    try {
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (!ref) return;

      // Zählt pro Browser-Tab-Session nur einmal pro Code, damit ein
      // Reload oder das Navigieren zwischen Seiten den Klick nicht mehrfach
      // zählt.
      const storageKey = `wendelo_ref_visit_${ref}`;
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");

      const supabase = createClient();
      supabase.rpc("record_referral_visit", { p_ref: ref }).then(() => {});
    } catch {
      // no-op: el tracking nunca debe romper la carga de la página
    }
  }, []);

  return null;
}
