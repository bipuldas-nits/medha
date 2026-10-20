// Medha settings for classes, sign-in and approval.
// Fill these in once, from Supabase → Project Settings → API Keys (see README, "Set up classes and sign-in").
// Use the PUBLISHABLE key (starts with sb_publishable_) or, on older projects, the "anon public" key.
// Never paste the SECRET key here.
// The publishable key is meant to be public: what each person can see is protected by the
// database rules in supabase-setup.sql, not by keeping this key secret.
// Leave both empty to use Medha without classes (recording, AI and sharing files still work).
window.MEDHA_CONFIG = {
  supabaseUrl: "https://rhsvetbzhflehhdxqmuw.supabase.co",       // e.g. "https://rhsvetbzhflehhdxqmuw.supabase.co"
  supabaseAnonKey: "sb_publishable_G7gECcKfgR-ks_XLqzSxeg_YBurZuKp"    // e.g. "sb_publishable_G7gECcKfgR-ks_XLqzSxeg_YBurZuKp"
};
