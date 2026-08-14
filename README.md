# V5.4 — Talep numaralı sürüm

- Talep Numarası: zorunlu, tam 17 rakam
- Talep Tarihi: zorunlu, AY-YIL biçimi (ör. 12-26); tire otomatik eklenir
- Talep Kodu: zorunlu, tam 5 rakam
- Bu alanlar ödeme/kredi kartı alanı değildir.
- Sipariş kaydı yönetim paneline talep bilgileriyle birlikte düşer.
- Başarılı kayıttan sonra stok bulunmadığına ilişkin kurumsal sonuç ekranı gösterilir.

Kurulum:
1. Supabase SQL Editor'de `supabase.sql` dosyasını bir kez çalıştırın.
2. Vercel'de `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD` tanımlı olsun.
3. Tüm dosyaları GitHub'a yükleyin ve Vercel deployment tamamlandıktan sonra sayfayı Ctrl+F5 ile yenileyin.
