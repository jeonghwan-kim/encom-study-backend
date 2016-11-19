'use strict';

const router = require('express').Router();
const ctrl = require('./todo.ctrl');
const api = require('../../');
const v = require('../../../components/param-validator');
const e = require('../../../components/errors');

router.get('/', api.http(ctrl.index));
router.post('/', api.http(ctrl.create));
router.put('/:id', api.http(ctrl.update));
router.delete('/:id', api.http(ctrl.destroy));

module.exports = router;
