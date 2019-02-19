'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define('Tool', {
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Tool.associate = function(models) {
    Tool.hasMany(models.Tag, {
      foreignKey: 'toolId',
      onDelete: 'CASCADE'
    });
  };
  return Tool;
};