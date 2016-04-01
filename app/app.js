require('dotenv').config()
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var morgan = require('morgan')

// Routes
var exercises = require('./routes/exercises')
var programs = require('./routes/programs')
var workouts = require('./routes/workouts')
var sessions = require('./routes/sessions')

var mongoUrl = 'mongodb://'
if (process.env.DB_USER && process.env.DB_PASS) {
  mongoUrl +=
    process.env.DB_USER + ':' +
    process.env.DB_PASS + '@' +
    process.env.DB_HOST + '/' +
    process.env.DB_NAME
} else {
  mongoUrl += process.env.DB_HOST + '/' + process.env.DB_NAME
}
mongoose.connect(mongoUrl)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next()
})

app.use('/exercises', exercises)
app.use('/programs', programs)
app.use('/workouts', workouts)
app.use('/sessions', sessions)

// Error handling
app.use(function(req, res, next) {
  res.status(404).json({
    message: 'Sorry cant find that!'
  })
})

app.use(function(err, req, res, next) {
  switch(err.name) {
    case 'ValidationError':
      console.log(err.errors)

      return res.status(500).send({
        message: err.errors.type.message
      })
    default:
      console.error(err.stack)
      return res.status(500).json({
        message: 'Something broke!'
      })
  }
})

module.exports = app
