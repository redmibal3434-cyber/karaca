import { createClient } from "@supabase/supabase-js";

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Yalnızca POST desteklenir."});
  try{
    const {name,phone,city,district,address,product,request_no,request_date,request_code}=req.body||{};
    if(!name||!phone||!city||!district||!address||!product) return res.status(400).json({error:"Lütfen teslimat bilgilerini eksiksiz doldurun."});
    if(!/^\d{17}$/.test(request_no||"")||!/^\d{3}$/.test(request_code||"")||!/^(0[1-9]|1[0-2]) \/ \d{4}$/.test(request_date||""))
      return res.status(400).json({error:"Talep bilgileri geçersiz."});
    const url=process.env.SUPABASE_URL;
    const key=process.env.SUPABASE_SECRET_KEY;
    if(!url||!key) return res.status(500).json({error:"Sunucu bağlantısı yapılandırılmamış."});
    const db=createClient(url,key,{auth:{persistSession:false}});
    const reference="SP-"+Date.now().toString().slice(-8);
    const {error}=await db.from("orders").insert({
      reference,full_name:name,phone,city,district,address,product,
      request_no,request_date,request_code,status:"Yeni"
    });
    if(error) throw error;
    return res.status(200).json({ok:true,reference});
  }catch(e){console.error(e);return res.status(500).json({error:"Sipariş kaydedilemedi. Veritabanı yapılandırmasını kontrol edin."})}
}