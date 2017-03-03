// var async = require('async'),
// 	keystone = require('keystone');

// var Bet = keystone.list('Bet');
// var BetUser = keystone.list("BetUser");
// var User = keystone.list("User");
var osmosis = require('osmosis');

osmosis
.get('http://wiki.teamliquid.net/dota2/Liquipedia:Upcoming_and_ongoing_matches')
.find('h1 + div a')
.set('location')
.follow('@href')
.find('header + div + div li > a')
.set('category')
.follow('@href')
.paginate('.totallink + a.button.next:first')
.find('p > a')
.follow('@href')
.set({
    'title':        'section > h2',
    'description':  '#postingbody',
    'subcategory':  'div.breadbox > span[4]',
    'date':         'time@datetime',
    'latitude':     '#map@data-latitude',
    'longitude':    '#map@data-longitude',
    'images':       ['img@src']
})
.data(function(listing) {
    console.log(listing);
})
// .log(console.log)
// .error(console.log)
// .debug(console.log)