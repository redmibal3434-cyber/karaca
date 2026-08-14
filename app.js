const products=[...document.querySelectorAll(".product")];
const fmt=n=>new Intl.NumberFormat("tr-TR").format(n)+" TL";
products.forEach(card=>card.querySelector(".choose").addEventListener("click",()=>{
 products.forEach(x=>{x.classList.remove("selected");x.querySelector(".choose").textContent="Bu ürünü seç"});
 card.classList.add("selected");card.querySelector(".choose").textContent="Seçildi ✓";
 const name=card.dataset.product,price=Number(card.dataset.price);
 document.querySelector("#summaryName").textContent=name;
 document.querySelector("#summaryPrice").textContent=fmt(price);
 document.querySelector("#totalPrice").textContent=fmt(price);
 document.querySelector("#productInput").value=name;
 document.querySelector(".order-bg").scrollIntoView({behavior:"smooth",block:"start"});
}));
const digits=(el,max)=>el.addEventListener("input",()=>el.value=el.value.replace(/\D/g,"").slice(0,max));
digits(document.querySelector("#requestNo"),17);digits(document.querySelector("#requestCode"),3);
document.querySelector("#requestDate").addEventListener("input",e=>{
 let v=e.target.value.replace(/\D/g,"").slice(0,6);
 if(v.length>2)v=v.slice(0,2)+" / "+v.slice(2);
 e.target.value=v;
});
document.querySelector("#orderForm").addEventListener("submit",async e=>{
 e.preventDefault(); const form=e.currentTarget, btn=form.querySelector(".submit"), msg=document.querySelector("#formMsg");
 msg.textContent="";
 if(!form.reportValidity())return;
 const rn=document.querySelector("#requestNo").value,rc=document.querySelector("#requestCode").value,rd=document.querySelector("#requestDate").value;
 if(rn.length!==17||rc.length!==3||!/^(0[1-9]|1[0-2]) \/ \d{4}$/.test(rd)){msg.textContent="Talep bilgilerini belirtilen formatta eksiksiz giriniz.";return}
 btn.disabled=true;btn.firstChild.textContent="Gönderiliyor... ";
 const data=Object.fromEntries(new FormData(form).entries());
 try{
   const res=await fetch("/api/orders",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(data)});
   const out=await res.json().catch(()=>({}));
   if(!res.ok) throw new Error(out.error||"Sipariş gönderilemedi.");
   document.querySelector("#refNo").textContent=out.reference||("SP-"+Date.now().toString().slice(-8));
   document.querySelector("#successModal").classList.add("show");
 }catch(err){msg.textContent=err.message||"Bir hata oluştu. Lütfen tekrar deneyin."}
 finally{btn.disabled=false;btn.firstChild.textContent="Siparişi Gönder "}
});