'use strict';

module.exports = function(sequelize, DataTypes) {
  const Todo = sequelize.define('Todo', {
    name: {
      type:DataTypes.STRING,
      unique: true
    },
  }, {
    classMethods: {
      // associations can be defined here
    }
  });

  return Todo;
};