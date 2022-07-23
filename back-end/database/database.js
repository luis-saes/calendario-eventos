const Sequelize = require("sequelize");
const createSequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

module.exports = createSequelize;
