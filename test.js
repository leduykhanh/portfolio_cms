var async = require('async'),
	keystone = require('keystone');

var Bet = keystone.list('Bet');
// var BetUser = keystone.list("BetUser");
// var User = keystone.list("User");
var osmosis = require('osmosis');
var fs = require('fs');

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
.data(function(listing) {
    // console.log(listing);
    fs.appendFile('message.txt', JSON.stringify(listing), (err) => {
	  if (err) throw err;
	  console.log('The "data to append" was appended to file!');
	});
})
// .log(console.log)
// .error(console.log)
// .debug(console.log)