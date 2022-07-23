const Sequelize = require("sequelize");
const database = require("../database/database");

const Event = database.define("events", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_inicio: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data_fim: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horario_inicio: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  horario_fim: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Event;
