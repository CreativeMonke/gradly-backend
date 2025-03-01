import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const SUPABASE_BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_BUCKET_NAME) {
  throw new Error('Missing Supabase configuration in .env');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase, SUPABASE_BUCKET_NAME };
