/**
 * Main application file
 */

import express from 'express';
import http from 'http';

// Setup server
const app = express();
const server = http.createServer(app);
app.config = require('./config/config');
require('./config/express')(app);
require('./config/mongoose')(app);
require('./middleware/api')(app);

// Start server
server.listen(app.get('port'), () => {
    console.log("Express server listening on port " + app.get('port'));
});

// Expose app
exports = module.exports = app;