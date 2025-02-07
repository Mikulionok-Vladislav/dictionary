


const express = require("express");
const { Op } = require("sequelize");
const { Expression } = require("../../models"); // Импортируем модель Expression

const router = express.Router();

// Получить выражения с учетом пагинации
router.get("/expressions", async (req, res) => {
  try {
    console.log("📥 GET /api/expressions - Получение выражений с пагинацией");

    // Получаем параметры запроса
    let { page, limit } = req.query;
    page = parseInt(page) || 1; // Значение по умолчанию - 1
    limit = parseInt(limit) || 10; // Значение по умолчанию - 10

    const offset = (page - 1) * limit; // Смещение

    // Запрос к базе с учетом пагинации
    const expressions = await Expression.findAll({
      limit,
      offset,
    });

    console.log(`📤 Найдено выражений: ${expressions.length} (страница ${page})`);
    res.json(expressions);
  } catch (error) {
    console.error("❌ Ошибка при получении выражений:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Поиск выражений
router.get("/expressions/search", async (req, res) => {
  try {
    const { query } = req.query;
    console.log(`📥 GET /api/expressions/search?query=${query} - Поиск выражений`);
    if (!query) {
      console.log("❌ Пустой запрос");
      return res.json([]);
    }

    const expressions = await Expression.findAll({
      where: {
        [Op.or]: [
          { english: { [Op.iLike]: `%${query}%` } },
          { russian: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    console.log("📤 Найдено выражений:", expressions.length);
    res.json(expressions);
  } catch (error) {
    console.error("Ошибка поиска:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = router;













// const express = require("express");
// const db = require("../../models"); // ✅ Импортируем всю базу данных
// const router = express.Router();

// console.log("🟢 Все модели:", Object.keys(db)); // 🔍 Логируем, какие модели загружены

// const Expression = db.Expression; // ✅ Берем модель Expression
// if (!Expression) {
//   console.error("❌ Модель Expression не найдена! Проверь путь и экспорт модели.");
// }

// router.get("/expressions", async (req, res) => {
//   try {
//     console.log("📥 Запрос всех выражений");
//     const expressions = await Expression.findAll();
//     res.json(expressions);
//   } catch (error) {
//     console.error("❌ Ошибка при получении выражений:", error);
//     res.status(500).json({ error: "Ошибка сервера" });
//   }
// });

// module.exports = router;

