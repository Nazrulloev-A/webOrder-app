import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and anon key (found in your Supabase dashboard)
const supabaseUrl = 'https://iabdednneodujvmiepox.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhYmRlZG5uZW9kdWp2bWllcG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MDc5NTUsImV4cCI6MjA1NjE4Mzk1NX0.SwYtR8XKTfZ46WU8Xy_g7EZ3Hr2yKuhAvtNUAb5oZkI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);