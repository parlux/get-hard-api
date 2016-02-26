var request = require('supertest');
var express = require('express');

var app = request('http://localhost:3000');

describe('GET /', function(){
  it('should respond with a JSON 404', function(done){
    app
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });
});

describe('GET /exercises', function(){
  it('should respond with JSON', function(done){
    app
      .get('/exercises')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
