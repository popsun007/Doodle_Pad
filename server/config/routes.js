var doodlesController = require('./../controllers/doodles.js');

module.exports = function(app, passport) {
	app.get('/doodles', function(req, res){
		// doodlesController.show_all(req, res);
		res.redirect('/partials');
	});
	app.get('/show_msg', function(req, res){
		// doodlesController.show_all(req, res);
		doodlesController.show_msg(req, res);
	});

	app.get('/', function(req, res){
      // console.log(req.user);
      if(req.user === undefined)
      {
          res.redirect("https://mypad.herokuapp.com/partials/chatroom.html");
      }
      else
      {
          res.redirect("login");
      }
    });

	app.get('/login', function(req, res){
		res.render('login');
	});

	// GET /auth/facebook
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  The first step in Facebook authentication will involve
	//   redirecting the user to facebook.com.  After authorization, Facebook will
	//   redirect the user back to this application at /auth/facebook/callback
	app.get('/auth/facebook',
	  	passport.authenticate('facebook'),
	  	function(req, res){
	    // The request will be redirected to Facebook for authentication, so this
	    // function will not be called.
	  	});

	// GET /auth/facebook/callback
	//   Use passport.authenticate() as route middleware to authenticate the
	//   request.  If authentication fails, the user will be redirected back to the
	//   login page.  Otherwise, the primary route function function will be called,
	//   which, in this example, will redirect the user to the home page.
	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { failureRedirect: '/login' }),
	  function(req, res) {
	    res.redirect('/');
	  });


	// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }),
  function(req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

}