'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDiscount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductDiscount.belongsTo(models.Product);
    }
  }
  ProductDiscount.init({
    is_free: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    related_products: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, 
  {
    sequelize,
    modelName: 'ProductDiscount',
  });
  return ProductDiscount;
};