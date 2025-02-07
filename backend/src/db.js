const { Sequelize } = require("sequelize");
require("dotenv").config();

// Подключаемся к базе данных через переменные окружения
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Отключаем логи SQL-запросов (можно включить при отладке)
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Успешное подключение к базе данных!");
  } catch (error) {
    console.error("❌ Ошибка подключения к БД:", error);
  }
}

testConnection();

module.exports = sequelize;
