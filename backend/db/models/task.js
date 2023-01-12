'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    userId: DataTypes.INTEGER,
    task: DataTypes.STRING
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Task;
};
