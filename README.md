# pinaronline-test-case

# Postman Collection - (At root folder and ignored for git and docker)
odul-yonetimi.postman_collection.json

# Notes && Feedbacks
- Swaggger ve test kısmını sadece /user endpoint'i için yaptım, yetiştiremedim.
- userId yerine postgresql'da user_id kullandım. Garip bir şekilde userId kabul etmiyor. Daha önce hep Mysql kullandım. PostgreSQL'de yeni sayılırım. Mysql'de böyle bir durum yoktu. Yani: userId => user_id, isActive => is_active
- Verilen görevde string olarak belirtildiği için user_id vb. string bıraktım eğer başka sebep yoksa integer yapmak yerinde olur.
- Görevde verilmediği için pagination yapmadım. Kısıtlı zamanım vardı normal şartlarda kesinlikle pagination şart.
- Genel olarak gerekli yerlerde DESC sıralaması yaptım taskta yok ama inisiyatif aldım
- Zamanım pek yoktu bu yüzden validationlara test ve swagger tarafına pek özenemedim.
- /api/rewards/claim kısmında verilen "örnek puan bu ödül için yeterli mi değil mi" şeklinde algıladım ve bu şekilde yaptım. Burada yanlış anlaşılma olabilir.
- Docker image küçültme işine vakit ayıramadım. Daha fazla vaktim olsaydı buna çok dikkat ederdim.
- Bazı yerlerde tekrarlanan kodlar var farkındayım; ama daha fazla vaktim olsaydı buna çok dikkat ederdim.
- Genel olarak yorumlara önem vermeye çalıştım ama zaman kısıtım nedniyle yeterince özenemedim

# How to Run (Don't forget to change ip address as localhost if you run on local computer)

git clone https://github.com/mustafatokmak1881/pinaronline-test-case.git && cd pinaronline-test-case && docker-compose up -d

# How to test
npm test

# Env File

# Express Port
PORT=3000

# Postgresql
POSTGRES_HOST=postgres
POSTGRES_USER=admin
POSTGRES_PASS=admin123
POSTGRES_DB=mydb
POSTGRES_PORT=5432

# JWT
SECRET_KEY=secureSecretKeyWillHere123


# URL

# PGADMIN 
http://localhost:5050/

# PGADMIN_DEFAULT_EMAIL: admin@example.com
# PGADMIN_DEFAULT_PASSWORD: 123@example.com123

# SwaggerURL
http://localhost:3000/api-docs
