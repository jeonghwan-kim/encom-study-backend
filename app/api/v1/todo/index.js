'use strict';

const router = require('express').Router();
const ctrl = require('./todo.ctrl');
const api = require('../../');
const v = require('../../../components/param-validator');
const e = require('../../../components/errors');

router.get('/',
    api.http(ctrl.index));

router.get('/:id',
    api.checkParams(v.genChecker('id', e.get('BadRequest'), v.num)),
    api.http(ctrl.show));

router.post('/',
    api.checkParams(v.genChecker('name', e.get('NameLength'), v.lenGt(2))),
    api.http(ctrl.create));

router.put('/:id',
    api.checkParams(
        v.genChecker('id', e.get('BadRequest'), v.num),
        v.genChecker('name', e.get('NameLength'), v.str, v.lenGt(2))),
    api.http(ctrl.update));

router.delete('/:id',
    api.checkParams(v.genChecker('id', e.get('BadRequest'), v.num)),
    api.http(ctrl.destroy));

module.exports = router;