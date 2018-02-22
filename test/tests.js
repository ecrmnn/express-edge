'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const dist = require('../dist');

let app;

describe('Test Suite', () => {
  before(() => {
    app = express();

    app.use(bodyParser.json());
    app.use(dist);

    app.set('views', `${__dirname}/views`);

    app.get('/hello', (req, res) => res.render('sub.hello'));
    app.get('/conditionals', (req, res) => res.render('conditionals', req.body));
    app.post('/conditionals', (req, res) => res.render('conditionals', req.body));
    app.post('/iteration', (req, res) => res.render('iteration', req.body));
    app.post('/partial', (req, res) => res.render('partial', req.body));
  });

  it('should be able to render a basic view', (done) => {
    request(app)
      .get('/hello')
      .end((err, res) => {
        expect(res.text.trim()).to.eql('hello world');
        done();
      });
  });

  it('should be able to render conditionals', (done) => {
    request(app)
      .post('/conditionals')
      .send({ name: 'daniel' })
      .end((err, res) => {
        expect(res.text.trim()).to.eql('hello, daniel');
        done();
      });
  });

  it('should be able to render conditionals without data', (done) => {
    request(app)
      .get('/conditionals')
      .end((err, res) => {
        expect(res.text.trim()).to.eql('hello');
        done();
      });
  });

  it('should be able to iterate data', (done) => {
    request(app)
      .post('/iteration')
      .send({
        users: [{
          name: 'Daniel Eckermann',
          username: 'ecrmnn',
        }],
      })
      .end((err, res) => {
        expect(res.text.trim()).to.eql('Daniel Eckermann (ecrmnn)');
        done();
      });
  });

  it('should be able to user partials', (done) => {
    request(app)
      .post('/partial')
      .send({
        users: [{
          name: 'Daniel Eckermann',
          username: 'ecrmnn',
        }],
      })
      .end((err, res) => {
        expect(res.text.trim()).to.eql('Daniel Eckermann (ecrmnn)');
        done();
      });
  });
});
