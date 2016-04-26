/**
 * Main application file
 */

import express from 'express';
import http from 'http';
import morgan from 'morgan';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';

// Setup server
const app = express();
const server = http.createServer(app);

// Load app config and other configs
require('./config/index')(app, path, favicon, cookieParser, bodyParser, session, passport, mongoose);
require('./middleware/api')(app, path);

// Production or development environment
// Use logging
if (app.get('env') == 'production') {
	console.log('Using production environment');
	app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
	console.log('Using development environment');
	app.use(morgan('dev'));
}

// Start server
server.listen(app.get('port'), () => {
    console.log("Express server listening on port " + app.get('port'));
});


// Expose app
exports = module.exports = app;