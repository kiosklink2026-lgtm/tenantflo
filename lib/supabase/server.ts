import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function getSupabaseUrl(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim()
  );
}

/** Legacy JWT anon key (`eyJ...`) or newer publishable key (`sb_publishable_...`). */
function getSupabasePublicKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim()
  );
}

export function createSupabaseServerClient(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const publicKey = getSupabasePublicKey();
  if (!url || !publicKey) {
    return null;
  }
  return createClient(url, publicKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
