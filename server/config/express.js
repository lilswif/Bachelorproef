/**
 * Express configuration
 */

module.exports = (app, path, favicon, cookieParser, bodyParser, session, passport) => {

  console.log('Initializing settings');
  
  app.use(cookieParser());
  app.use(bodyParser());
  // Session secret
  app.use(session({ secret: app.config.session.secret })); 
  app.use(passport.initialize());
  // Persistent login sessions
  app.use(passport.session());
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