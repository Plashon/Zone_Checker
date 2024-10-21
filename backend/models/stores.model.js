const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Store = sequelize.define("stores",{
    lat:{
        type:DataTypes.STRING,
        allowNull:false,
    } ,
    lng:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    radius: {
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    name: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    address: {
        type:DataTypes.STRING,
        allowNull:false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
})
module.exports = Store;