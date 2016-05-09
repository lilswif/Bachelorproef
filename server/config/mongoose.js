/**
 * MongoDB configuration
 */

import mongoose from 'mongoose';

module.exports = (app) => {

    console.log('Connecting MongoDB');
  
	// Connect to MongoDB
	mongoose.connect(app.config.mongodb.url+':'+app.config.mongodb.port);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection error:'));
	db.once('open', function() {
	  console.log("Succesfully connected to MongoDB");
	});

};