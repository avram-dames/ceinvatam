import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ymmocwpfmnxstxvntvjh.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODM2MDA1MiwiZXhwIjoxOTUzOTM2MDUyfQ.nc8F-S3aWnyM3gHaFVqlaykoNX8xKU0Dqi3NTINqM7k"
export default createClient(supabaseUrl, supabaseKey);