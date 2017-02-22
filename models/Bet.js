var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Bet = new keystone.List('Bet', {
	track: true,
	sortable: true,
	autokey: { from: 'name', path: 'key', unique: true },
});

Bet.add({
	name : {type: String, required: true},
	firstTeam: { name: {type:String}, logo: { type: String } },
	secondTeam: { name: {type:String}, logo: { type: String } },
	state: { type: Types.Select, options: 'draft, live, defunct ', default: 'draft', index: true },
	firstScore: { type: Number, default: 0 },
	secondScore: { type: Number, default: 0 },
	firstTeamBets: { type: Number, default: 0 },
	secondTeamBets: { type: Number, default: 0 },
	drawBets: { type: Number, default: 0 },
	result : { type: Number, default: 0 }, // 1 2 0
	expireDate: { type: Types.Datetime, index: true},
	image: { type: Types.CloudinaryImage },
	categories: { type: Types.Relationship, ref: 'BetCategory', many: true },
});


Bet.defaultColumns = 'firstTeam, secondTeam, firstScore, secondScore, state|20%, expireDate|20%';
Bet.register();
