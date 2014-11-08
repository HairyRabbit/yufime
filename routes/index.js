var express = require('express');
var fs = require('fs');
var _ = require('underscore');
var md = require('markdown').markdown;
var router = express.Router();



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
		var title = n["title"].split(' ').join('_');
		n["text"] = md.toHTML(fs.readFileSync('./public/posts/' + title + '.md', 'utf8'));
	});
	return score;
}


router.get('/posts', function(req, res) {
	fs.readFile('./db/posts.json', function(err, data) {
		if(err) console.log(err);
		res.send(getPostContentByTitle(JSON.parse(data.toString())));
	});
});
router.get('/posts/:id', function(req, res) {
	var id = req.params.id;
	jsonFindOneById("posts", req.params.id, function(data) {
		// var title = scoreData["posts"][0].title.split(' ').join('_');
		// fs.readFile('./public/posts/' + title + '.md', function(data) {
		// 	scoreData["posts"][0].text = md.toHTML(fs.readFileSync('./public/posts/' + title + '.md', 'utf8'));
		// 	res.send(scoreData);
		// });
		res.send(getPostContentByTitle(data));
	});
});

router.get('/keywords/:id', function(req, res) {
	var id = req.params.id;
	fs.readFile('./db/keywords.json', function(err, data) {
		if(err) console.log(err);
		var data = JSON.parse(data.toString());
		var keyword = _.find(data.keywords, function(obj) {
			return obj.id == id
		});
		res.send({ "keywords": [keyword] });
	});
});









module.exports = router;
