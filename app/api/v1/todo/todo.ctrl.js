'use strict';

const Todo = require('../../../lib/Todo');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
        .then(() => Todo.index(options))
  },
  show(options) {
    return Promise.resolve()
        .then(() => Todo.show(options))
        .then(todo => {
          if (!todo) return Promise.reject(errors.NotFound('todo is not found'));
          return todo;
        })
  },
  create(options) {
    return Promise.resolve()
        .then(_=> Todo.create(options))
        .then(todo => Object.assign(todo, {statusCode: 201}))
        .catch(err => {
          if (err === errors.code('Conflict'))
            return Promise.reject(errors.Conflict(`${options.name} is already existed`));
          throw err;
        });
  },
  update(options) {
    return Promise.resolve()
        .then(_=> Todo.update(options))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`todo id: ${options.id} is not found`));
          throw err;
        });
  },
  destroy(options) {
    return Promise.resolve()
        .then(_ => Todo.destroy(options))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`todo id: ${options.id} is not found`));
          throw err;
        });
  }
};
