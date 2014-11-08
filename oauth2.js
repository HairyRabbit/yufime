var request = require('request');
var async = require('async');
var util = require('util');
var _ = require('underscore');
var fs = require('fs');



var config = {};

config.github = {
	BaseTokenUrl: 'https://github.com/login/oauth/access_token',
	BaseUserUrl: 'https://api.github.com/user',
	getTokenUrl: function(githubConfig, code) {
		return util.format('%s?%s&code=%s', this.BaseTokenUrl, queryfmt(githubConfig), code);
	},
	getToken: function(callback) {
		return access_token = callback.split('&')[0].split('=')[1];
	},
	getUserUrl: function(token) {
		return {
			url: util.format('%s?access_token=%s', this.BaseUserUrl, token),
			headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64; rv:33.0) Gecko/20100101 Firefox/33.0" }
		}
	},
	getUserInfo: function(content) {
		content = JSON.parse(content);
		return {
			name: content.login,
			photo: content.avatar_url
		}
	}
}


var queryfmt = function(queryObj) {
	var querystr = ''
	_.each(queryObj, function(v, k, l) {
		querystr += util.format('%s=%s&', k, v);
	});
	return querystr.slice(0, -1);
} 

var oauth2 = function(options, callback) {
	var provider = options.provider;
	var code = options.code;
	var readConfig = function(callback) {
		fs.readFile('./oauth2.json', function(err, data) {
			if (err) return callback(err);
			callback(null, JSON.parse(data.toString()));
		});
	}
	var getToken = function(setting, callback) {
		request.get(config[provider].getTokenUrl(setting[provider], code), function(err, res, body) {
			if (err) return callback(err);
			callback(null, config[provider].getToken(body));
		});
	}

	var getUser = function(token, callback) {
		if(token == "bad_verification_code") return callback(new Error("token may be bad!"));
		request.get(config[provider].getUserUrl(token), function(err, res, body) {
			if (err) return callback(err);
			callback(null, config[provider].getUserInfo(body))
		});
	}

	
	var callback = function(err, result) {
		console.log(result)
	}
	
	async.waterfall([readConfig, getToken, getUser], callback);

	return callback;
}


request.get('https://github.com/login/oauth/authorize?client_id=feebf3fa280163233841&redirect_uri=http://localhost:4200&scope=user&=test', function(err, res, body) {
	if (err) return callback(err);
	console.log(body);
});




module.exports = oauth2;