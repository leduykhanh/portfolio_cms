
var async = require('async'),
	keystone = require('keystone');

var Post = keystone.list('Post');

var request = require("request"),
	URL = "https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=62d76b2754d042d68d21ed9ca0d897ce",
      headers={
           "Content-Type": 'application/json'
         };
var options = {
        method: "GET",
        url: URL,
        headers: headers
      };
module.exports = function(req, res){

	    request(options, function (error, response, body) {

                 if (error) {
                   console.log("Authorize Error: ",error,response.statusCode);

                 }
                res.send(JSON.parse(body));
            });
}