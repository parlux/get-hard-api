require('dotenv').config();
var app = require('./app/app.js');
var port = process.env.PORT || 3000;

// Serve
app.listen(port, function () {
 console.log('Application listening on port %s!', port);
 console.log('Using DB %s at %s', process.env.DB_NAME, process.env.DB_HOST);
});