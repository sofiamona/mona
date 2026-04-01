import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wujhgdugqjmhiwqoxmah.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1amhnZHVncWptaGl3cW94bWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MzcwNDMsImV4cCI6MjA4ODMxMzA0M30.tZjJT4Dx8U5mtom59WAMjjmhsQppfabaoi2H6yZ6j68'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)