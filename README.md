# Get hard API

A very simple express based API which allows CORS requests. Used for experimenting with frontend frameworks, it is definitely not production safe!

### Dependencies

Runs off a mongo database which at the moment requires pre-filled data. At some stage I should add a mongo script to initialise and populate this database, or better yet add endpoints to create and populate all the required data!

### Usage

You'll need to set some environment variables:

- DBURL

*Run normally:*

`npm start`

*Run with nodemon*

`nodemon ./bin/www`

*Run with nodemon in debug mode*

`nodemon --debug ./bin/www`

*Run tests*

`node clear-test-db.js && mocha tests`
