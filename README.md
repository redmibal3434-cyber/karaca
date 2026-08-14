# V5.6 — Telefon ve talep alanı doğrulaması

- Cep telefonu: zorunlu, yalnızca rakam, 05 ile başlayan 11 hane (ör. 05321234567)
- Talep numarası: zorunlu, yalnızca rakam, tam 17 hane
- Talep tarihi: zorunlu, AA-YY (ör. 12-26), ayraç otomatik eklenir
- Talep kodu: zorunlu, yalnızca rakam, tam 5 hane
- Doğrulamalar hem tarayıcıda hem API tarafında uygulanır.

Kurulum: mevcut dosyaların üzerine yükleyip Vercel deployment tamamlandıktan sonra Ctrl+F5 ile yenileyin.
