
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
         var  articles = JSON.parse(body).articles;
         articles.map(function(ac){
         	var item = new Post.model();
         	var data = {
         		"title": ac.title,
				"author": "57bfe0a1d59fbbb36d515005",
				"categories": [
				  "5855250a89b5c877541fc1ea"
				],
				"content": {
				"brief": ac.description,
				"extended": "<p>"+ac.description+"</p>" + "<p >Read more at <a href='"+ac.url+"'>"+ac.url+"</a></p>"
				},
				"state": "published"
         	};
         		item.getUpdateHandler(req).process(data, function(err) {
		
					if (err) return res.apiError('error', err);
				});
         });
         res.send(JSON.parse(body));
            });
}