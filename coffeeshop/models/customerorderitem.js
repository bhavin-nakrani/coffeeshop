'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CustomerOrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CustomerOrderItem.belongsTo(models.CustomerOrder);
      CustomerOrderItem.belongsTo(models.Product);
    }
  }
  CustomerOrderItem.init({
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'CustomerOrderItem',
  });
  return CustomerOrderItem;
};