/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var passport = require('passport');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.set('signout redirect', '/signout');

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	auth: importRoutes('./auth'),
	api: importRoutes('./api')
};

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(user, done) {
	  done(null, user);
	});
// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.get('/about', routes.views.about);
	app.all('/contact', routes.views.contact);
		// Session
	app.all('/join', routes.views.session.join);
	app.all('/signin', routes.views.session.signin);
	app.get('/signout', routes.views.session.signout);
	app.all('/forgot-password', routes.views.session['forgot-password']);
	app.all('/reset-password/:key', routes.views.session['reset-password']);
	
		// Authentication
	app.use(passport.initialize());
	app.use(passport.session());
	app.all('/auth/confirm', routes.auth.confirm);
	app.all('/auth/app', routes.auth.app);
	app.all('/auth/:service', routes.auth.service);

	// User
	app.all('/me*', middleware.requireUser);
	app.all('/me', routes.views.me);
	app.all('/me/create/post', routes.views.createPost);
	app.all('/me/create/link', routes.views.createLink);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	//Dota
	app.all('/dota/leaderboards', routes.views.dota.leaderboards);
	app.all('/dota/bets', routes.views.dota.bets);
	// API
	app.get('/api/post/list', keystone.middleware.api, routes.api.posts.list);
	app.all('/api/post/create', keystone.middleware.api, routes.api.posts.create);
	app.get('/api/post/:id', keystone.middleware.api, routes.api.posts.get);
	app.all('/api/post/:id/update', keystone.middleware.api, routes.api.posts.update);
	app.get('/api/post/:id/remove', keystone.middleware.api, routes.api.posts.remove);

	//bet API
	app.get('/api/bet/list', keystone.middleware.api, routes.api.bets.list);
	app.all('/api/bet/create', keystone.middleware.api, routes.api.bets.create);
	app.all('/api/bet/place', keystone.middleware.api, routes.api.bets.place);
	app.get('/api/bet/:id', keystone.middleware.api, routes.api.bets.get);
	app.all('/api/bet/:id/update', keystone.middleware.api, routes.api.bets.update);
	app.get('/api/bet/:id/remove', keystone.middleware.api, routes.api.bets.remove);
	//auth API
	app.post('/api/auth/signin', keystone.middleware.api, routes.api.auth.signin);
	app.post('/api/auth/signinfacebook', keystone.middleware.api, routes.api.auth.signinfacebook);
	app.get('/api/auth/signout', keystone.middleware.api, routes.api.auth.signout);
	// user API
	app.get('/api/user/:id', keystone.middleware.api, routes.api.users.get);
	
	// scrape API
	app.get('/api/scrape', keystone.middleware.api, routes.api.scrape);

};
