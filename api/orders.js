const {db}=require('./_lib');
const crypto=require('crypto');

function text(v){ return String(v ?? '').trim(); }
function digits(v){ return text(v).replace(/\D/g,''); }

module.exports=async(req,res)=>{
  if(req.method!=='POST') return res.status(405).json({error:'method'});
  try{
    const b=req.body||{};

    const data={
      product:text(b.product),
      name:text(b.name),
      phone:digits(b.phone),
      city:text(b.city),
      district:text(b.district),
      address:text(b.address),
      request_no:digits(b.request_no),
      request_date:text(b.request_date).replace(/[./\s]/g,'-'),
      request_code:digits(b.request_code)
    };

    // Keep the requested lengths, but don't require one specific date such as 12-26.
    const missing=[];
    if(!data.product) missing.push('product');
    if(!data.name) missing.push('name');
    if(!data.city) missing.push('city');
    if(!data.district) missing.push('district');
    if(!data.address) missing.push('address');

    if(missing.length){
      console.warn('orders validation: missing', missing);
      const labels={product:'Ürün',name:'Ad Soyad',city:'İl',district:'İlçe',address:'Adres'};
      return res.status(400).json({error:'validation',field:missing[0],detail:(labels[missing[0]]||missing[0])+' alanı zorunludur.'});
    }
    if(!/^05\d{9}$/.test(data.phone)){
      console.warn('orders validation: phone', {length:data.phone.length});
      return res.status(400).json({error:'validation',field:'phone',detail:'Telefon numarası 05 ile başlayan 11 rakam olmalıdır.'});
    }
    if(!/^\d{17}$/.test(data.request_no)){
      console.warn('orders validation: request_no', {length:data.request_no.length});
      return res.status(400).json({error:'validation',field:'request_no',detail:'Talep numarası 17 rakam olmalıdır.'});
    }
    if(!/^\d{2}-\d{2}$/.test(data.request_date)){
      console.warn('orders validation: request_date', {value:data.request_date});
      return res.status(400).json({error:'validation',field:'request_date',detail:'Talep tarihi AA-YY biçiminde olmalıdır.'});
    }
    if(!/^\d{5}$/.test(data.request_code)){
      console.warn('orders validation: request_code', {length:data.request_code.length});
      return res.status(400).json({error:'validation',field:'request_code',detail:'Talep kodu 5 rakam olmalıdır.'});
    }

    const orderRef='STK-'+Date.now().toString(36).toUpperCase()+'-'+crypto.randomBytes(3).toString('hex').toUpperCase();

    const {error}=await db().from('orders').insert({
      product:data.product,
      name:data.name,
      phone:data.phone,
      city:data.city,
      district:data.district,
      address:data.address,
      request_no:data.request_no,
      request_date:data.request_date,
      request_code:data.request_code,
      order_reference:orderRef,
      status:'stok_yok'
    });

    if(error){
      console.error('orders supabase insert failed', {
        message:error.message,
        code:error.code,
        details:error.details,
        hint:error.hint
      });
      return res.status(500).json({error:'save',detail:'Kayıt veritabanına yazılamadı.',dbCode:error.code||null});
    }

    return res.status(200).json({ok:true,orderReference:orderRef,status:'stok_yok'});
  }catch(e){
    console.error('orders unexpected error', e);
    return res.status(500).json({error:'save',detail:e?.message||'Beklenmeyen sunucu hatası.'});
  }
};
