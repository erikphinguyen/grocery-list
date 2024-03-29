'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [
      {
        userId: "1",
        task: "100 watermelons",
        completed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        task: "200 bananas",
        completed: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
