var async = require('async'),
  keystone = require('keystone');

exports.signin = function(req, res) {
  
  if (!req.body.username || !req.body.password) return res.json({ success: false });
  
  keystone.list('User').model.findOne({ email: req.body.username }).exec(function(err, user) {
    
    if (err || !user) {
      return res.json({
        success: false,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    }
    
    keystone.session.signin({ email: user.email, password: req.body.password }, req, res, function(user) {
      user.populateRelated('bets[user]', function(err) {
          
        });
      return res.json({
        success: true,
        session: true,
        date: new Date().getTime(),
        user: user
      });
      
    }, function(err) {
      
      return res.json({
        success: true,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
      
    });
    
  });
}

// you'll want one for signout too
exports.signout=function(req, res) {
  keystone.session.signout(req, res, function() {
    res.json({ 'signedout': true });
  });
}

exports.signinfacebook = function(req, res) {
  
  if (!req.body.username) return res.json({ success: false });
  
  keystone.list('User').model.findOne({ email: req.body.username }).exec(function(err, user) {
    
    if (err || !user) {
      return res.json({
        success: false,
        session: false,
        message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
      });
    }
      user.populateRelated('bets[user]', function(err) {
          
        });
      return res.json({
        success: true,
        session: true,
        date: new Date().getTime(),
        user: user
      });

  });
}