const movie = require('../model/movie');
const user = require('../model/user');
const mongoose = require('mongoose');

class siteController {

    // [GET] ./
    index(req, res, next) {

        let movieQuery = movie.find({});

        movieQuery = movieQuery.sort({
            imdb: 'desc',
        })

        movieQuery
            .then((movie) => {
                res.render('home', {
                    movie: movie.map((movie) => movie.toObject())
                });
            })
            .catch(() => {

            })
    }

    // [GET] ./list-all-movie
    listAllMovie(req, res, next) {
        movie.find({})
            .then((movie) => {
                var category = [];
                var local = true;
                for (var i = 0; i < movie.length; i++) {
                    for (var j = 0; j < category.length; j++) {
                        if (movie[i].category != category[j]) {
                            local = true;
                        } else {
                            local = false;
                            break;
                        }
                    }
                    if (local) {
                        category.push(movie[i].category);
                    }
                }
                var Country = [];
                var localCountry = false;
                Country.push(movie[0].Country);
                for (var i = 1; i < movie.length; i++) {
                    for (var j = 0; j < Country.length;) {
                        if (movie[i].Country != Country[j]) {
                            localCountry = true;
                            j++;
                        } else {
                            localCountry = false;
                            break;
                        }
                    }
                    if (localCountry) {
                        Country.push(movie[i].Country);
                    }
                }
                res.render('list-all-movie', {
                    movie: movie.map((movie) => movie.toObject()),
                    category,
                    Country
                });
            })
            .catch(next);
    }

    // [POST] ./list-all-movie
    listAllMovieFilter(req, res, next) {
        if (req.query.category == undefined) {
            var x = req.query.Country;
            movie.find({
                    Country: req.query.Country
                })
                .then((movie) => {
                    res.render('list-filter-movie', {
                        movie: movie.map((movie) => movie.toObject()),
                        x
                    });
                })
                .catch(next);
        } else if (req.query.Country == undefined) {
            var x = req.query.category;
            movie.find({
                    category: req.query.category
                })
                .then((movie) => {
                    res.render('list-filter-movie', {
                        movie: movie.map((movie) => movie.toObject()),
                        x
                    });
                })
                .catch(next);
        } else {
            var y = req.query.category;
            var x = req.query.Country;
            movie.find({
                    category: req.query.category,
                    Country: req.query.Country
                })
                .then((movie) => {
                    res.render('list-filter-movie', {
                        movie: movie.map((movie) => movie.toObject()),
                        x,
                        y
                    });
                })
                .catch(next);
        }
    }
}

module.exports = new siteController();