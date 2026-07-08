import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whlnhubchhbygbidtmoc.supabase.co';

const supabaseAnonKey =
  'sb_publishable_6MA2xQJoVJksw_jrv0Wkzg_LNhacD2A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export default supabase;
