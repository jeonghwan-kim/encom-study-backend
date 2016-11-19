'use strict';

const should = require('should');
const request = require('supertest');
const app = require('../../../');
const models = require('../../../models');
const helper = require('../../../components/test-helper');
const errors = require('../../../components/errors');

describe('/v1/todos', () => {
  before('Sync database', () => helper.syncDb());

  describe('GET /v1/todos', () => {
    let todos = [{name: 'name1'}, {name: 'name2'}, {name: 'name3'}];
    before('Insert seed data', () => helper.insertSeed(models['Todo'], todos));
    after('Delete seed data', () => helper.deleteSeed(models['Todo'], todos));

    it('should return 200 status code and array', done => {
      request(app)
          .get('/v1/todos')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Array);
            done();
          });
    });
  });

  describe('GET /v1/todos/:id', () => {
    let todos = [{name: 'name1'}];
    before('Insert seed data', () => helper.insertSeed(models['Todo'], todos));
    after('Delete seed data', () => helper.deleteSeed(models['Todo'], todos));

    it('should return 200 status code and an object', done => {
      request(app)
          .get('/v1/todos/1')
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.instanceOf(Object);
            done();
          });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .get(helper.bindAccessToken('/v1/todos/abc'))
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('BadRequest');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .get(helper.bindAccessToken('/v1/todos/999'))
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('NotFound');
            done();
          });
    });
  });

  describe('POST /v1/todos', () => {
    let todos = [{name: 'name1'}];
    after('Delete seed data', () => helper.deleteSeed(models['Todo'], todos));

    it('should return 201 status code and new id', done => {
      request(app)
          .post('/v1/todos')
          .send(todos[0])
          .expect(201)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.have.property('id');
            done();
          });
    });

    it('should return 400 status code on empty name', done => {
      request(app)
          .post('/v1/todos')
          .send({name: ' '})
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].should.have.property('errorCode', 'NameLength');
            done();
          });
    });

    it('should return 409 status code on duplicated name', done => {
      request(app)
          .post('/v1/todos')
          .send(todos[0])
          .expect(409)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].should.have.property('errorCode', errors.code('Conflict'));
            done();
          });
    });
  });

  describe('PUT /v1/todos/:id', () => {
    let todos = [{name: 'name1'}];
    before('Insert seed data', () => helper.insertSeed(models['Todo'], todos));
    after('Delete seed data', () => helper.deleteSeed(models['Todo'], todos));

    it('should return 200 status code and an updated object', done => {
      request(app)
          .put('/v1/todos/1')
          .send({name: 'name2'})
          .expect(200)
          .end((err, res) => {
            if (err) throw err;
            res.body.should.be.property('name', 'name2');
            done();
          });
    });

    it('should return 400 status code on invalid id', done => {
      request(app)
          .put(helper.bindAccessToken('/v1/todos/abc'))
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('BadRequest');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .put(helper.bindAccessToken('/v1/todos/999'))
          .send({name: 'foo'})
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('NotFound');
            done();
          });
    });
  });

  describe('DELETE /v1/todos/:id', () => {
    let todos = [{name: 'name1'}];
    before('Insert seed data', () => helper.insertSeed(models['Todo'], todos));
    after('Delete seed data', () => helper.deleteSeed(models['Todo'], todos));

    it('should return 400 status code on invalid id', done => {
      request(app)
          .delete(helper.bindAccessToken('/v1/todos/abc'))
          .expect(400)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('BadRequest');
            done();
          });
    });

    it('should return 404 status code on no id', done => {
      request(app)
          .delete(helper.bindAccessToken('/v1/todos/999'))
          .expect(404)
          .end((err, res) => {
            if (err) throw err;
            res.body[0].errorCode.should.be.equal('NotFound');
            done();
          });
    });

    it('should return 204 status code', done => {
      request(app)
          .delete('/v1/todos/1')
          .expect(204)
          .end(done);
    });
  });
});
