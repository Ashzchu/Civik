import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ddfcknhpemcrewdbwzux.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_SR_fdZAqvT7aRGK2lfhSbQ_B20r_UQP";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
