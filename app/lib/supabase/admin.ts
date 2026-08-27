// Zielpfad im Repo: app/lib/supabase/admin.ts
// NUR serverseitig verwenden (Server Actions), NIE in einer "use client"-Datei
// importieren. Der Service-Role-Key umgeht RLS vollständig.
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
