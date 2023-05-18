
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Tax);
    }
  }
  Product.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          unit_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
          },
          tax_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
          },
          total_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0
          }
    },
    {
      sequelize,
      modelName: "Product",
      timestamps: true
    }
  );
  return Product;
};
