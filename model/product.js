const { DataTypes } = require("sequelize");

const productModel = (sequelize) => {
  let productSchema = sequelize.define("product", {
    title: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: DataTypes.INTEGER,
  });
  return productSchema;
};

module.exports = { productModel };
