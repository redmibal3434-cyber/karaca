# Mutfak Kampanyası V5.1 — Admin + Medya düzeltmesi

## Değişiklikler
- Admin görsel yükleme akışı Vercel için yeniden yazıldı.
- Logo artık ana sayfada **Mutfak Kampanyası** yazısının hemen önünde görünür.
- Logo yüklenince başlık kaybolmaz.
- Logo, tencere, çaydanlık ve promosyon görselleri kutularında `object-fit: contain` ile TAM görünür.
- Admin panelinde görsel önizleme kutuları büyütüldü.
- Yükleme hatalarında gerçek hata mesajı admin ekranına iletilir.
- Maksimum görsel boyutu: 4 MB. JPG / PNG / WEBP.

## Kurulum
1. GitHub'daki eski proje dosyalarının yerine bu pakettekileri yükleyin.
2. Supabase SQL Editor'de `supabase.sql` daha önce çalışmadıysa çalıştırın.
3. Vercel Environment Variables:
   - SUPABASE_URL
   - SUPABASE_SECRET_KEY
   - ADMIN_PASSWORD
4. Vercel'de yeni deployment oluşmasını bekleyin veya Redeploy yapın.
5. `/admin.html` adresinden giriş yapıp görselleri yükleyin.
