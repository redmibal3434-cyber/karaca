# V5.8 — /api/orders düzeltme ve teşhis sürümü

Bu sürüm:
- Form ve API alanlarını birebir eşleştirir.
- Telefonu rakama normalize eder ve 05 ile başlayan 11 hane kontrolünü korur.
- Talep numarasını 17 rakam olarak korur.
- Talep tarihini sabit 12-26 yapmaz; NN-NN biçimini kabul eder.
- Talep kodunu 5 rakam olarak korur.
- 400 doğrulama hatalarında hangi alanın sorunlu olduğunu açıkça döndürür ve Vercel loguna yazar.
- Supabase insert hatalarını Vercel loguna code/message/details/hint olarak yazar.

Dosyaları GitHub ana dizinine mevcutların üzerine yükleyin. Vercel yeni deployment tamamlandıktan sonra sayfayı Ctrl+F5 ile yenileyin.
