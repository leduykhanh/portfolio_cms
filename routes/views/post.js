var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post,
	};
	locals.data = {
		posts: [],
	};

	// Load the current post
	view.on('init', function (next) {

		var q = keystone.list('Post').model.findOne({
			state: 'published',
			slug: locals.filters.post,
		}).populate('author categories');

		q.exec(function (err, result) {
			if (err) return res.err(err);
			if (!result) return res.notfound('Post not found');
			locals.data.post = result;
			locals.data.post.populateRelated('comments[author]', next);
		});

	});

	view.on('post', { action: 'create-comment' }, function(next) {

		// handle form
		var newPostComment = new PostComment.model({
				post: locals.data.post.id,
				author: locals.user.id
			}),
			updater = newPostComment.getUpdateHandler(req, res, {
				errorMessage: 'There was an error creating your comment:'
			});

		updater.process(req.body, {
			flashErrors: true,
			logErrors: true,
			fields: 'content'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				req.flash('success', 'Your comment has been added successfully.');
				return res.redirect('/blog/post/' + locals.data.post.slug);
			}
			next();
		});

	});
	// Load other posts
	view.on('init', function (next) {

		var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

		q.exec(function (err, results) {
			locals.data.posts = results;
			next(err);
		});

	});

	// Render the view
	view.render('post');
};
