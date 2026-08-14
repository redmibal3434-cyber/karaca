const {db}=require('./_lib');
const crypto=require('crypto');

module.exports=async(req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'method'});
  try{
    const b=req.body||{};
    if(!b.product||!b.name||!/^05\d{9}$/.test(String(b.phone||''))||!b.city||!b.district||!b.address||
       !/^\d{17}$/.test(String(b.request_no||''))||
       !/^(0[1-9]|1[0-2])-\d{2}$/.test(String(b.request_date||''))||
       !/^\d{5}$/.test(String(b.request_code||'')))
      return res.status(400).json({error:'validation',detail:'Talep bilgileri geçersiz veya eksik.'});
    const orderRef='STK-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomBytes(3).toString('hex').toUpperCase();
    const {error}=await db().from('orders').insert({
      product:b.product,name:b.name,phone:b.phone,city:b.city,district:b.district,address:b.address,
      request_no:String(b.request_no),request_date:String(b.request_date),request_code:String(b.request_code),
      order_reference:orderRef,status:'stok_yok'
    });
    if(error) throw error;
    return res.json({ok:true,orderReference:orderRef,status:'stok_yok'});
  }catch(e){
    return res.status(500).json({error:'save',detail:e.message});
  }
}