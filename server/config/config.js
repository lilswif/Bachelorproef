/**
 * Database configuration
 */
console.log('Loading app config file');

var config = {};

config.port = process.env.PORT || 8085;

config.mongodb = {};
config.mongodb.url = 'mongodb://mongo';
config.mongodb.port = '27017';

config.session = {};
config.session.secret = 'dockeresvréwijs';

module.exports = config;