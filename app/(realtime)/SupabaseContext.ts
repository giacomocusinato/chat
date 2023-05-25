import { SupabaseClient } from '@supabase/supabase-js';
import React from 'react'

export default React.createContext<SupabaseClient | null>(null);