const {db}=require('./_lib');
const crypto=require('crypto');

module.exports=async(req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'method'});
  try{
    const b=req.body||{};
    if(!b.product||!b.name||!b.phone||!b.city||!b.district||!b.address)
      return res.status(400).json({error:'validation'});
    const orderRef='STK-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomBytes(3).toString('hex').toUpperCase();
    const {error}=await db().from('orders').insert({
      product:b.product,name:b.name,phone:b.phone,city:b.city,district:b.district,address:b.address,
      order_reference:orderRef,status:'stok_yok'
    });
    if(error) throw error;
    return res.json({ok:true,orderReference:orderRef,status:'stok_yok'});
  }catch(e){
    return res.status(500).json({error:'save',detail:e.message});
  }
}