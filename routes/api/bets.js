var async = require('async'),
	keystone = require('keystone');

var Bet = keystone.list('Bet');

/**
 * List Bets
 */
exports.list = function(req, res) {
	Bet.model.find(function(err, items) {
		
		if (err) return res.apiError('database error', err);
		
		res.apiResponse({
			Bets: items
		});
		
	});
}

/**
 * Get Bet by ID
 */
exports.get = function(req, res) {
	Bet.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		res.apiResponse({
			Bet: item
		});
		
	});
}


/**
 * Create a Bet
 */
exports.create = function(req, res) {
	
	var item = new Bet.model(),
		data = (req.method == 'Bet') ? req.body : req.query;
	
	item.getUpdateHandler(req).process(data, function(err) {
		
		if (err) return res.apiError('error', err);
		
		res.apiResponse({
			Bet: item
		});
		
	});
}

/**
 * Get Bet by ID
 */
exports.update = function(req, res) {
	Bet.model.findById(req.params.id).exec(function(err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		var data = (req.method == 'Bet') ? req.body : req.query;
		
		item.getUpdateHandler(req).process(data, function(err) {
			
			if (err) return res.apiError('create error', err);
			
			res.apiResponse({
				Bet: item
			});
			
		});
		
	});
}

/**
 * Delete Bet by ID
 */
exports.remove = function(req, res) {
	Bet.model.findById(req.params.id).exec(function (err, item) {
		
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		
		item.remove(function (err) {
			if (err) return res.apiError('database error', err);
			
			return res.apiResponse({
				success: true
			});
		});
		
	});
}
