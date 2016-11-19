'use strict';

const User = require('../../../lib/User');
const errors = require('../../../components/errors');

module.exports = {
  index(options) {
    return Promise.resolve()
        .then(() => User.index(options))
  },
  show(options) {
    return Promise.resolve()
        .then(() => User.show(options))
        .then(user => {
          if (!user) return Promise.reject(errors.NotFound('user is not found'));
          return user;
        })
  },
  create(options) {
    return Promise.resolve()
        .then(_=> User.create(options))
        .then(user => Object.assign(user, {statusCode: 201}))
        .catch(err => {
          if (err === errors.code('Conflict'))
            return Promise.reject(errors.Conflict(`${options.name} is already existed`));
          throw err;
        });
  },
  update(options) {
    return Promise.resolve()
        .then(_=> User.update(options))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`user id: ${options.id} is not found`));
          throw err;
        });
  },
  destroy(options) {
    return Promise.resolve()
        .then(_ => User.destroy(options))
        .then(() => ({statusCode: 204}))
        .catch(err => {
          if (err === errors.code('NotFound'))
            return Promise.reject(errors.NotFound(`user id: ${options.id} is not found`));
          throw err;
        });
  }
};
