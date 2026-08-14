const {db,auth}=require('./_lib');
module.exports=async(req,res)=>{
 if(!auth(req)) return res.status(401).json({error:'Yetkisiz erişim'});
 if(req.method!=='POST') return res.status(405).json({error:'Method'});
 try{
  const {key,fileName,mime,data}=req.body||{};
  const allowed=['logo_url','product1_image_url','product2_image_url','gift_image_url'];
  const mimes=['image/jpeg','image/png','image/webp'];
  if(!allowed.includes(key)) return res.status(400).json({error:'Geçersiz görsel alanı'});
  if(!mimes.includes(mime)) return res.status(400).json({error:'Sadece JPG, PNG veya WEBP yükleyin'});
  if(typeof data!=='string'||!data) return res.status(400).json({error:'Görsel verisi bulunamadı'});
  const buf=Buffer.from(data,'base64');
  if(buf.length>4*1024*1024) return res.status(413).json({error:'Görsel 4 MB altında olmalı'});
  const ext=mime==='image/png'?'png':mime==='image/webp'?'webp':'jpg';
  const path=`${key}-${Date.now()}.${ext}`;
  const s=db();
  const {error:upErr}=await s.storage.from('site-media').upload(path,buf,{contentType:mime,upsert:false});
  if(upErr) throw upErr;
  const {data:pub}=s.storage.from('site-media').getPublicUrl(path);
  const url=pub.publicUrl;
  const {error:setErr}=await s.from('site_settings').upsert({id:1,[key]:url,updated_at:new Date().toISOString()},{onConflict:'id'});
  if(setErr) throw setErr;
  return res.json({ok:true,url});
 }catch(e){
  console.error(e);
  return res.status(500).json({error:'Görsel yüklenemedi',detail:e.message||String(e)});
 }
};