var async = require('async'),
	keystone = require('keystone');

var User = keystone.list('User');


exports.get = function(req, res) {

	User.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			item
		});
		
	});
}