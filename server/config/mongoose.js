/**
 * MongoDB configuration
 */

module.exports = (app, mongoose) => {

    console.log('Connecting MongoDB');
  
	// Connect to MongoDB
	mongoose.connect(app.config.mongodb.url+':'+app.config.mongodb.port);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection error:'));
	db.once('open', function() {
	  console.log("Succesfully connected to MongoDB");
	});

};