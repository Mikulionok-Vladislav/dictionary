const Expression = require("../models/Expression");

// 📌 Получение всех выражений с пагинацией и сортировкой
exports.getAllExpressions = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = "english" } = req.query;

    const offset = (page - 1) * limit;
    const expressions = await Expression.findAll({
      order: [[sort, "ASC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(expressions);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// 📌 Получение выражения по ID
exports.getExpressionById = async (req, res) => {
  try {
    const { id } = req.params;
    const expression = await Expression.findByPk(id);

    if (!expression) {
      return res.status(404).json({ error: "Выражение не найдено" });
    }

    res.json(expression);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// 📌 Поиск выражений по английскому или русскому языку
exports.searchExpressions = async (req, res) => {
  try {
    const { query } = req.params;
    const expressions = await Expression.findAll({
      where: {
        [Op.or]: [
          { english: { [Op.iLike]: `%${query}%` } },
          { russian: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    res.json(expressions);
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
};
