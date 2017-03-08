var async = require('async'),
	keystone = require('keystone');

var Bet = keystone.list('Bet');
var BetUser = keystone.list("BetUser");
var User = keystone.list("User");
var osmosis = require('osmosis');
var fs = require('fs');
var moment = require('moment');
exports = module.exports = function(req, res) {
	osmosis
		.get('http://wiki.teamliquid.net/dota2/Liquipedia:Upcoming_and_ongoing_matches')
		.find('#infobox_matches_content')
		.set('tr')
		// .set('location')
		// .follow('@href')
		// .find('header + div + div li > a')
		// .set('category')
		// .follow('@href')
		// .paginate('.totallink + a.button.next:first')
		// .find('p > a')
		// .follow('@href')
		// .set({
		// 	'teanLeft':'.team-left',
		// 	'teanRight':'.team-right'
		// 'title':        'section > h2',
		// 'description':  '#postingbody',
		// 'subcategory':  'div.breadbox > span[4]',
		// 'date':         'time@datetime',
		// 'latitude':     '#map@data-latitude',
		// 'longitude':    '#map@data-longitude',
		// 'images':       ['img@src']
		// })
		.data(function (listing) {
			// console.log(listing);
			// fs.appendFile('message.txt', JSON.stringify(listing), (err) => {
			//  if (err) throw err;
			//   console.log('The "data to append" was appended to file!');
			// });
			var stringBet = listing.tr;
			var teams = stringBet.split("\n\n");
			var team1 = teams[0].trim();
			var team2 = teams[2].trim();
			var timeBetandName = teams[3].trim();
			var name = timeBetandName.split("UTC")[1];
			var timeBet = timeBetandName.split("UTC")[0];
			console.log(moment(timeBet, "MMM D, YYYY - HH:mm").toDate());
			var item = new Bet.model();
			var data = {
					name : name,
					firstTeam: { name: team1, logo: "google.com" },
					secondTeam: { name: team2, logo: "google.com" },
					state: "live",
					// firstScore: { type: Number, default: 0 },
					// secondScore: { type: Number, default: 0 },
					// firstTeamBets: { type: Number, default: 0 },
					// secondTeamBets: { type: Number, default: 0 },
					// drawBets: { type: Number, default: 0 },
					// result : { type: Number, default: 0 }, // 1 2 0
					// expireDate: moment(timeBet, "MMM D, YYYY - HH:mm").toDate(),
					// image: { type: Types.CloudinaryImage },
	
			};
			
			item.getUpdateHandler(req).process(data, function(err) {
				
				if (err) return res.apiError('error', err);

				
			});
		})
	// .log(console.log)
	// .error(console.log)
	// .debug(console.log)
}
