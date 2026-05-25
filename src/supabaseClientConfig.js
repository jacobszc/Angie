
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
//const AnimalsURL = import.meta.env.VITE_ANIMALS_KEY
 export const supabaseClient = createClient(supabaseUrl, supabaseKey)