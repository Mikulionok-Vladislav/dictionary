// const { DataTypes } = require("sequelize");
// const sequelize = require("../src/db");

// // Определяем модель "Expression"
// const Expression = sequelize.define("Expression", {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   english: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   russian: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   example: {
//     type: DataTypes.TEXT,
//     allowNull: true,
//   },
// }, {
//   timestamps: false, // Не добавлять поля createdAt и updatedAt
// });

// module.exports = Expression;


// module.exports = (sequelize, DataTypes) => {
//     const Expression = sequelize.define("Expression", {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       english: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       russian: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       example: {
//         type: DataTypes.TEXT,
//       },
//     });
  
//     return Expression;
//   };
  

const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Expression extends Model {}

  Expression.init(
    {
      id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          english: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          russian: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          example: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
    },
    {
      sequelize,
      modelName: "Expression",
      tableName: "Expressions",
      timestamps: false, // если нет createdAt/updatedAt
    }
  );

  return Expression;
};
