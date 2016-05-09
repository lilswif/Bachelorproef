/**
 * Database configuration
 */
console.log('Loading config file');

var config = {};

config.port = process.env.PORT || 8085;

config.mongodb = {};
config.mongodb.url = 'mongodb://mongo';
config.mongodb.port = '27017';

module.exports = config;