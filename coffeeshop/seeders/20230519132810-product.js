'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Product', [{
      name: 'Mobile',
      unit_price: 200,
      tax_price: 4,
      total_price: 204,
      TaxId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Speaker',
      unit_price: 500,
      tax_price: 50,
      total_price: 550,
      TaxId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Product', null, {});
  }
};
