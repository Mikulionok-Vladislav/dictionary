const sequelize = require("./db");
const Expression = require("./models/Expression");

async function syncDB() {
  try {
    await sequelize.sync(); // Удалит и создаст заново таблицы
    console.log("✅ База данных успешно синхронизирована!");

    // Добавим тестовые данные
    await Expression.bulkCreate([
      { english: "Break the ice", russian: "Растопить лед", example: "He told a joke to break the ice." },
      { english: "Hit the sack", russian: "Ложиться спать", example: "I'm really tired, I think I'll hit the sack." },
    ]);

    console.log("✅ Демо-данные добавлены!");
  } catch (error) {
    console.error("❌ Ошибка синхронизации БД:", error);
  } finally {
    process.exit();
  }
}

syncDB();
