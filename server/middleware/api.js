/**
 * Main application routes
 */

import path from 'path';

module.exports = (app) => {

  // GET request to homepage
  app.get('/', (req, res) => {
	  console.log('  | GET request to homepage');
    res.render(path.join(__dirname,'..','client','public/index'));
  });

  // GET request to 404 error page
  app.get('/404', (req, res) => {
	  console.log('  | GET request to 404 page');
    res.render('404');
  });

  // All other non-existent routes should redirect to the 404 Not Found error page
  app.all('/*', (req, res) => {
    console.log('  | Redirect to 404');
    res.redirect('/404');
  });
  
};
