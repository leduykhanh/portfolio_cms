var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Comments Model
 * ===================
 */

var BetUser = new keystone.List('BetUser', {
	nocreate: true
});

BetUser.add({
	bet: { type: Types.Relationship, ref: 'Bet', index: true },
	user: { type: Types.Relationship, ref: 'User', index: true },
	date: { type: Types.Date, default: Date.now, index: true },
	betChoice : { type: Number, default: 0 },
	betAmount : { type: Number, default: 10 }
});


/**
 * Registration
 * ============
 */

BetUser.defaultColumns = 'bet, user, betChoice, betAmount, date|20%';
BetUser.register();
