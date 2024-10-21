const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("users", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lat:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  lng:{
    type:DataTypes.STRING,
    allowNull:false,
  }
});

module.exports = User;
