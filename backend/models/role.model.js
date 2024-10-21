const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;
