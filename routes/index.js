var express = require('express');
var fs = require('fs');
var _ = require('underscore');
var md = require('markdown').markdown;
var router = express.Router();
var oauth2 = require('../oauth2');


router.get('/', function(req, res) {
	res.render('index.html');
});


function jsonFindOneById(name, id, callback) {
	fs.readFile('./db/' + name + '.json', function(err, data) {
		if(err) console.log(err);
		var findOneData = _.find(JSON.parse(data.toString())[name], function(obj) {
			return obj.id == id
		});
		var callObj = {};
		callObj[name] = [findOneData];
		callback(callObj);
	});
}
function getPostContentByTitle(scoreData) {
	var score = scoreData;
	var posts = scoreData["posts"];
	_.each(posts, function(n, i, l) {
		n["text"] = md.toHTML(fs.readFileSync('./public/posts/' + n["alias"] + '.md', 'utf8'));
	});
	return score;
}

router.get('/login', function(req, res) {
	oauth2({ provider: "github", code: req.query.authorizationCode }, function(data) {
		res.send(data);
	});
});

router.get('/posts', function(req, res) {
	fs.readFile('./db/posts.json', function(err, data) {
		if(err) console.log(err);
		res.send(getPostContentByTitle(JSON.parse(data.toString())));
	});
});
router.get('/posts/:id', function(req, res) {
	jsonFindOneById("posts", req.params.id, function(data) {
		res.send(getPostContentByTitle(data));
	});
});

router.get('/keywords/:id', function(req, res) {
	jsonFindOneById("keywords", req.params.id, function(data) {
		res.send(data);
	});
});

router.get('/comments/:id', function(req, res) {
	jsonFindOneById("comments", req.params.id, function(data) {
		res.send(data);
	});
});

router.get('/comments/:id', function(req, res) {
	jsonFindOneById("comments", req.params.id, function(data) {
		res.send(data);
	});
});

router.post('/comments', function(req, res) {
	var comment = req.body.comment;

	fs.readFile('./db/comments.json', function(err, data) {
		if(err) console.log(err);
		var comments = JSON.parse(data.toString()).comments;
		comment.replies = [];
		comment.id = ++comments.length;

		comments.push(comment);
		

		res.send(comments);
	});
});





module.exports = router;
