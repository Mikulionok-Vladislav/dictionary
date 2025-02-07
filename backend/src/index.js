

const express = require("express");
const cors = require("cors");
const { sequelize } = require("../models");
const expressionRoutes = require("./routes/expressionRoutes"); // ✅ Импорт маршрутов

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Подключаем маршруты
app.use("/api", expressionRoutes);  // Важно: "/api", а не "/api/expressions"

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("✅ Успешное подключение к базе данных");
  } catch (error) {
    console.error("❌ Ошибка подключения к базе данных:", error);
  }
});
