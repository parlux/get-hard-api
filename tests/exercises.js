var request = require('supertest');
var app = require('../server.js');

describe('Exercises', function() {
  var exerciseId;

  describe('POST /exercises/', function() {
    it('should create an exercise', function(done) {
      request(app)
        .post('/exercises/')
        .send({
          "exercise": {
            "name" : "Postman Test",
            "sets" : 4,
            "reps" : 6,
            "weight" : 35,
            "increments" : 2.5
          }
        })
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);

          exerciseId = res.body._id;
          done();
        });
    });
  });

  describe('GET /exercises/', function(){
    it('should return all exercises', function(done){
      request(app)
        .get('/exercises')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /exercises/' + exerciseId, function(){
    it('should return a single exercise', function(done){
      request(app)
        .get('/exercises/' + exerciseId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          "__v": 0,
          "_id": exerciseId,
          "increments": 2.5,
          "name": "Postman Test",
          "reps": 6,
          "sets": 4,
          "weight": 35
       }, done);
    });
  });

})
