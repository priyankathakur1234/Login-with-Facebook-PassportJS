var User =require('./models/user');
module.exports = function(app, passport){
	app.get('/',function(req,res){
		res.render("index.ejs");
	});

	app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


     app.get('/signup',function(req,res){
     	res.render('signup.ejs',{message:req.flash('signupMessage')});
     });

     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
      app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


 app.get('/auth/facebook',
passport.authenticate('facebook', { scope: ['email']}),
    function(req, res){
});
 
// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback',
  passport.authenticate('facebook',{
    successRedirect : '/profile',
    failureRedirect : '/'
  })
);
	 app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};


    function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}


	