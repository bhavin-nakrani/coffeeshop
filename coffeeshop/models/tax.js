'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tax extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tax.hasMany(models.Product);
    }
  }
  Tax.init({
    tax_percentage: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    tax_flat_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Tax',
  });
  return Tax;
};