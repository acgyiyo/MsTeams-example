'use strict';

module.exports.setup = function(app) {
    var path = require('path');
    var express = require('express')
    const request = require("request");
    const url = 'https://api.themoviedb.org/3/';
    const imageUrl = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2/';

    let movieOptions = {
        method: 'GET',
        url: url,
        qs: {
            api_key: '84ded254fa09932c02a7777a80a71ff3'
        },
        body: '{}'
    };

    // Configure the view engine, views folder and the statics path
    app.use(express.static(path.join(__dirname, 'static')));
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));

    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // app.use('/data', configData);

    // Setup home page
    app.get('/', function(req, res) {
        res.render('hello');
    });

    // Setup the static tab
    app.get('/hello', function(req, res) {
        res.render('hello');
    });

    // Setup the configure tab, with first and second as content tabs
    app.get('/configure', function(req, res) {
        res.render('configure');
    });

    app.get('/first', function(req, res) {
        movieOptions.url += 'configuration'
        request(movieOptions, function(error, response, body) {
            if (error) throw new Error(error);

            res.render('first', {
                config: body
            });
        });
    });

    app.get('/second', function(req, res) {
        movieOptions.url += 'configuration'
        request(movieOptions, function(error, response, body) {
            if (error) throw new Error(error);

            console.log("config", body);
            res.render('second', {
                config: body
            });
        });
    });

    /**
     * search for the name of the movie
     */
    app.post('/sendData', function(req, res) {
        movieOptions.url = url + 'search/movie'
        movieOptions.qs.page = '1';
        movieOptions.qs.query = req.body.name;
        movieOptions.qs.language = 'en-US';

        console.log(movieOptions.url);

        request(movieOptions, function(error, response, body) {
            if (error) throw new Error(error);

            let movies = JSON.parse(body).results;
            console.log(movies[1].title);

            res.render('first', {
                movies: movies,
                imageUrl
            });
            res.end();
        });
    });
};