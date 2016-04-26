/**
 * Main application routes
 */

 module.exports = (app, path) => {

  // GET request to homepage
  app.get('/', (req, res) => {
  	console.log('  | GET request to homepage');
  	res.render(path.join(__dirname,'..','client','public/index'));
  });

  // POST request to login
  app.post('/login', (req, res) => {
    console.log('  | POST request to /login');
  });

  app.get('/logout', function(req, res) {
    console.log('  | GET request to /logout');
    req.logout();
    res.redirect('/');
  });

  // POST request to register
  app.post('/register', (req, res) => {
    console.log('  | POST request to /register');
  });
  
  // Route middleware to check if a user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
    	return next();
    } else {
    	res.redirect('/');
    }
  }

};
