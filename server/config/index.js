/**
 * Passport configuration
 */

module.exports = (app, path, favicon, cookieParser, bodyParser, session, passport, mongoose) => {

	app.config = require('./config');

    console.log('Loading all other configs');
  	require('./express')(app, path, cookieParser, bodyParser, session, passport);
	require('./mongoose')(app, mongoose);
	require('./passport')(app, passport);
};