const { Sequelize } = require("sequelize");
const { userModel } = require("./user");
const { productModel } = require("./product");

const sequelize = new Sequelize("user-management-system", "root", "", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
  pool: { max: 5, min: 0, idle: 1000 },
});

sequelize
  .authenticate()
  .then(() => console.log("Connected with MySQL"))
  .catch((err) => console.log("Error syncing database:", err));

const USER = userModel(sequelize);
const PRODUCT = productModel(sequelize);

USER.hasMany(PRODUCT, {foreignKey: 'user_id', as: 'userInfo'});
PRODUCT.belongsTo(USER, {foreignKey: 'user_id', as: 'productInfo'});

sequelize
  .sync({force: false})
  .then(() => console.log("Database and tables synced."))
  .catch((err) => console.error("Error syncing database:", err));

module.exports = {
  sequelize,
  models: {
    USER,
    PRODUCT,
  },
};