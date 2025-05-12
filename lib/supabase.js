    // supabase.js
    import 'react-native-url-polyfill/auto';
    import AsyncStorage from '@react-native-async-storage/async-storage';
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://znjhktvzxqlhdgphepyy.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuamhrdHZ6eHFsaGRncGhlcHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1ODkzNDEsImV4cCI6MjA2MTE2NTM0MX0.ccgh01XPa4rPwThtypXj4mC9Hsd46eM9eZOVo7onNro';

    export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });