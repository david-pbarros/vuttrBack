'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      toolId: {
        type: Sequelize.INTEGER
      }
    })
    .then(() => queryInterface.addConstraint('Tag', ['toolId'], {
      type: 'FOREIGN KEY',
      name: 'FK_tag_tool', // useful if using queryInterface.removeConstraint
      references: {
        table: 'Tool',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tag');
  }
};