const sequelize = require("./db");
const Sequelize = require("sequelize");
const User = require("./user.model")
const Role = require("./role.model")
const Store = require("./stores.model")

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Role = Role;
db.Store = Store;

db.User.belongsToMany(db.Role, {
  through: "user_Roles",
});
db.Role.belongsToMany(db.User, {
  through: "user_Roles",
});


db.User.hasMany(db.Store, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE',  
  onUpdate: 'CASCADE',
});
db.Store.belongsTo(db.User, {
  foreignKey: 'userId', 
  targetKey: 'id',       
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
    

module.exports = db;