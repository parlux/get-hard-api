var request = require('supertest');
var app = require('../server.js');

describe('General tests', function() {
  describe('a 404', function(){
    it('should respond with a JSON 404', function(done){
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
})