/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/',icon:'fa fa-home' },
		{ label: 'Blog', key: 'blog', href: '/blog',icon:'fa fa-book' },
		{ label: 'Gallery', key: 'gallery', href: '/gallery',icon:'fa fa-folder-open' },
		{ label: 'Contact', key: 'contact', href: '/contact',icon:'fa fa-comment' },
		{ label: 'About', key: 'about', href: '/about',icon:'fa fa-user' },
	];
	res.locals.user = req.user;
	res.locals.page = {
		title: 'Jangkoo',
		path: req.url.split("?")[0] // strip the query - handy for redirecting back to the page
	};
	var bowser = require('../lib/node-bowser').detect(req);

	res.locals.system = {
		mobile: bowser.mobile,
		ios: bowser.ios,
		iphone: bowser.iphone,
		ipad: bowser.ipad,
		android: bowser.android
	}
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
