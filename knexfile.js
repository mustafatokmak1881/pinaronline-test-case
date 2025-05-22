require('dotenv').config();

// knexfile.js
module.exports = {
  development: {
    client: 'postgresql', // Sadece PostgreSQL
    connection: {
      host: process.env.POSTGRES_HOST, // PostgreSQL sunucu adresi
      port: process.env.POSTGRES_PORT,        // PostgreSQL varsayılan portu
      user: process.env.POSTGRES_USER,  // PostgreSQL kullanıcı adı
      password: process.env.POSTGRES_PASS, // PostgreSQL şifre
      database: process.env.POSTGRES_DB// Hedef veritabanı
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations'
    },
    // PostgreSQL'e özel ayarlar
    useNullAsDefault: false // PostgreSQL'de NULL handling
  }
};