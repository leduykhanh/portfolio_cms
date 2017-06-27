exports = module.exports = function(req, res){
	var data = JSON.parse(req.body);
  	res.send(data);
}