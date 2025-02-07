const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Определяем модель "Expression"
const Expression = sequelize.define("Expression", {
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
}, {
  timestamps: false, // Не добавлять поля createdAt и updatedAt
});

module.exports = Expression;


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
  