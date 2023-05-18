'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Customer.init({
    full_name: {
      type: DataTypes.STRING        
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address_line_1: {
      type: DataTypes.STRING
    },
    address_line_2: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};