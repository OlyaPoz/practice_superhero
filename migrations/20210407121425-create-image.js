'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      path: {
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
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('images');
  }
};