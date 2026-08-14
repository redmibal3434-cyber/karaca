const {createClient}=require('@supabase/supabase-js');
function db(){return createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SECRET_KEY,{auth:{persistSession:false}})}
function auth(req){return !!process.env.ADMIN_PASSWORD && req.headers['x-admin-password']===process.env.ADMIN_PASSWORD}
module.exports={db,auth};