'use strict';

module.exports = function(sequelize, DataTypes) {
  const Todo = sequelize.define('Todo', {
    title: {type: DataTypes.STRING},
    done: {type: DataTypes.BOOLEAN}
  }, {
    classMethods: {
      // associations can be defined here
    }
  });

  return Todo;
};
