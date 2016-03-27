require('dotenv').config();
var mongoose = require('mongoose');

var mongoUrl = 'mongodb://';
if (process.env.DB_USER && process.env.DB_PASS) {
  mongoUrl +=
    process.env.DB_USER + ':' +
    process.env.DB_PASS + '@' +
    process.env.DB_HOST + '/' +
    process.env.DB_NAME;
} else {
  mongoUrl += process.env.DB_HOST + '/' + process.env.DB_NAME;
}

mongoose.connect(mongoUrl, function() {
  if (mongoose.connection.db.s.databaseName.indexOf('test') !== -1) {
    console.log('Dropping DB: ' + mongoose.connection.db.s.databaseName);
    mongoose.connection.db.dropDatabase();
    console.log('Done');
  } else {
    console.log('DB name: ' + mongoose.connection.db.s.databaseName);
    console.log('Test DB must have test in the database name');
  }
  mongoose.connection.close();
});
