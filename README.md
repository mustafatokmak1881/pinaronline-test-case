markdown
# PinarOnline Ödül Yönetim Sistemi API

![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-orange)
![Docker](https://img.shields.io/badge/Docker-24.0-yellow)

## 📌 Proje Özeti

Kullanıcı ve ödül yönetimi için geliştirilmiş RESTful API servisi. Docker container'ları ile kolay dağıtım ve PostgreSQL veritabanı entegrasyonu.

## 🛠 Teknik Detaylar

| Bileşen         | Teknoloji       | Versiyon  |
|-----------------|----------------|----------|
| Backend         | Node.js        | 18.x     |
| Framework       | Express.js     | 4.18.x   |
| Veritabanı      | PostgreSQL     | 15.x     |
| ORM             | Sequelize      | 6.x      |
| API Dokümantasyon | Swagger UI    | 4.x      |

## 🚀 Kurulum

### Docker ile Çalıştırma

```bash
git clone https://github.com/mustafatokmak1881/pinaronline-test-case.git
cd pinaronline-test-case
docker-compose up -d
```

#Ortam Değişkenleri (.env)
```bash

PORT=3000
POSTGRES_HOST=postgres
POSTGRES_USER=admin
POSTGRES_PASS=admin123
POSTGRES_DB=mydb
POSTGRES_PORT=5432
SECRET_KEY=secureSecretKeyWillHere123
```

🌐 Servis Erişim Bilgileri
Servis	URL	Kullanıcı Bilgileri
```bash
API	http://localhost:3000	-
Swagger UI	http://localhost:3000/api-docs	-
PGAdmin	http://localhost:5050	admin@example.com / 123@example.com123
```


🔍 Dokümantasyon ve Test Durumu

Swagger UI
✅ /users endpointleri dokümante edilmiştir ama zamanım tamamına yetmedi

Test Kapsamı
```bash
npm test
```
✅ /users modülü için unit testler tamamlandı ama zamanım tamamına yetmedi


Postman Koleksiyonu
✅ Tüm endpointleri kapsayan eksiksiz koleksiyon:

odul-yonetimi.postman_collection.json


📝 Geliştirici Notları
diff
+ Başarılı Implementasyonlar:
- PostgreSQL naming convention (user_id)
- JWT tabanlı auth sistemi
- Ödül talep mekanizması

! Geliştirilecek Alanlar:
- Pagination desteği
- Validation kurallarının genişletilmesi
- Docker image optimizasyonu
- Kod tekrarlarının refaktörü

  
📬 İletişim
Mustafa Tokmak
GitHub
📧 mustafatokmak1881@gmail.com

