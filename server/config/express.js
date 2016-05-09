/**
 * Express configuration
 */

import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';

module.exports = (app) => {

  console.log('Initializing settings');
  
  // Set view directory
  app.set('views',path.join(__dirname,'..','client','views'));
  // Default view engine
  app.set('view engine', 'html');
  app.engine('html', require('ejs').renderFile);
  // Port where app runs on
  app.set('port', app.config.port);
  // Routing case sensitive disabled ( /Example = /example)
  app.disable('case sensitive routing');
  // Strict routing disabled ( /example/ = /example)
  app.disable('strict routing');
  // Disables the "X-Powered-By: Express" HTTP header.
  app.disable('x-powered-by');

};