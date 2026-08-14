# V5.7

Değişiklik:
- Talep tarihi artık sabit bir tarih istemez.
- Kullanıcı istediği 4 rakamı girebilir; araya `-` otomatik gelir.
- Örnekler: `08-27`, `11-25`, `12-26`.
- Biçim zorunluluğu yalnızca `NN-NN`.
- Talep numarası 17 rakam ve talep kodu 5 rakam olarak korunmuştur.
- Telefon 05 ile başlayan 11 rakam olarak korunmuştur.

Not: “Talebiniz şu anda kaydedilemedi” uyarısı tarih biçiminden ayrı olarak API/Supabase kayıt hatası anlamına gelebilir. Vercel Environment Variables içinde SUPABASE_URL ve SUPABASE_SECRET_KEY tanımlı olmalı ve Supabase orders tablosunda request_no, request_date, request_code sütunları bulunmalıdır.
