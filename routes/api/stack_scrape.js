
var async = require('async'),
	keystone = require('keystone');

var Post = keystone.list('Post');

var request = require("request"),
	URL = "https://api.rss2json.com/v1/api.json?rss_url=http://stackoverflow.com/feeds/tag/javascript",
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
         var  articles = JSON.parse(body).items;
         articles.map(function(ac){
         	var item = new Post.model();
         	var data = {
         		"title": ac.title,
				"author": "57bfe0a1d59fbbb36d515005",
				"categories": [
				  "591a6fb6298840d819712189"
				],
				"content": {
				"brief": ac.description,
				"extended": "<p>"+ac.description+"</p>" + "<p >Read more at <a href='"+ac.link+"'>"+ac.link+"</a></p>"
				},
				"publishedDate":ac.pubDate,
				"state": "published"
         	};
         		item.getUpdateHandler(req).process(data, function(err) {
		
					if (err) return res.apiError('error', err);
				});
         });
         res.send(JSON.parse(body));
            });
}