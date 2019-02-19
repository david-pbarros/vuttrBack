'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tag', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      toolId: {
        type: Sequelize.UUID
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