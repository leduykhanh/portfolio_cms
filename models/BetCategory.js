var keystone = require('keystone');

/**
 * BetCategory Model
 * ==================
 */

var BetCategory = new keystone.List('BetCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
});

BetCategory.add({
	name: { type: String, required: true },
});

BetCategory.relationship({ ref: 'Bet', path: 'categories' });

BetCategory.register();
