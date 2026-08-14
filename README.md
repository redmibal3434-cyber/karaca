# Mutfak Kampanyası V4

## Dosyalar
- `index.html`: profesyonel satış/talep sayfası
- `admin.html`: şifre korumalı yönetim paneli
- `api/orders.js`: yeni sipariş kaydı
- `api/admin-orders.js`: admin listeleme/durum/silme API'si
- `supabase.sql`: Supabase tablo şeması

## Vercel Environment Variables
Production için şu 3 değişkeni ekleyin:
- `SUPABASE_URL`
- `SUPABASE_SECRET_KEY`
- `ADMIN_PASSWORD` (uzun ve benzersiz bir parola seçin)

Ardından Redeploy yapın.

## Supabase
SQL Editor'de `supabase.sql` içeriğini çalıştırın. Eski `orders` tablonuz farklı kolonlara sahipse geliştirme aşamasında tabloyu yedekleyip yeni şemaya göre migration uygulayın.

## Admin
`/admin.html` adresinden giriş yapılır. Şifre Vercel'deki `ADMIN_PASSWORD` değeridir.

## Güvenlik notu
Bu proje kart numarası, CVV, kart şifresi veya SMS doğrulama kodu toplamaz. Bu nedenle ödeme ağı logoları, gerçek kart tahsilatı yapılıyormuş izlenimi oluşturmaması için kullanılmamıştır.

## Görseller
Sayfada yüksek çözünürlüklü uzaktan görseller kullanılır. Kendi lisanslı ürün fotoğraflarınızla değiştirmek için `index.html` içindeki ürün görsel URL'lerini değiştirmeniz yeterlidir.
