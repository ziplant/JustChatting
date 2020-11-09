const conn = require("config").get("connection"),
  { Sequelize } = require("sequelize");

const sequelize = new Sequelize(conn.database, conn.user, conn.password, {
  host: conn.host,
  dialect: conn.dialect,
});

module.exports = sequelize;
