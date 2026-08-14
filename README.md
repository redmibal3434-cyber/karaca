# Kampanya V2

## Kurulum
1. Supabase SQL Editor'da `supabase.sql` dosyasını çalıştırın.
2. Vercel Environment Variables'a:
   - `SUPABASE_URL`
   - `SUPABASE_SECRET_KEY`
   ekleyin.
3. Bu klasörün tamamını GitHub deponuzun kök dizinine yükleyin.
4. Vercel yeni deployment'ı otomatik oluşturacaktır.

Not: `vercel.json` içinde eski `functions: api/*.js` deseni yoktur. `/api/orders.js` Vercel tarafından otomatik Serverless Function olarak algılanır.
