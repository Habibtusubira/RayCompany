// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validate that we have the required values
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  
  // You can choose to throw an error or create a mock client
  // throw new Error('Missing Supabase configuration');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);