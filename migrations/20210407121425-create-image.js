'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imagePath: {
        field: 'image_path',
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        allowNull: false,
        type: Sequelize.DATE
      },
      superheroId: { 
        field: 'superhero_id',
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { 
          model: 'superheroes', 
          key: 'id',
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Images');
  }
};