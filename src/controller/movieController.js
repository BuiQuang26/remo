const movie = require('../model/movie');
const user = require('../model/user');
const comment = require('../model/comment');

class movieController {
    // [GET] ./movie/:slug
    showMovie(req, res, next) {
        let slugMovie = req.params.slug;
        let movies = {};
        movie.findOne({
                slug: slugMovie,
            })
            .then((movie) => {
                movies = movie;
                
                return  comment.find({movieSlug: slugMovie, })
            })
            .then(comments=>{
                res.render('showMovie.hbs', {
                    movies: movies.toObject(),
                    comments: comments.map(comment=>comment.toObject()),
                });
            })
            .catch(()=>{
                res.status(400).json({message: 'get database false !!!'});
            });
    }

    // [POST] ./movie/add-related/:slug
    addRelate(req, res, next) {
        var arrayRelated = []
        movie.findOne({
                slug: req.params.slug
            })
            .then((movieLocal) => {
                arrayRelated = movieLocal.related;
                arrayRelated.push(req.body)
                return movie.findOneAndUpdate({
                        slug: req.params.slug
                    }, {
                        // update
                        $set: {
                            related: arrayRelated,
                        }
                    }, {
                        // option
                        upsert: true,
                        new: true
                    })
            })
            .then((movie) => {
                res.redirect('back')
            })
            .catch(next);
    }

    // [DELETE] ./movie/related/:slug
    deleteRelate(req, res, next) {
        movie.findOneAndUpdate({
                slug: req.params.slug
            }, {
                $pull: {
                    related: {
                        _id: req.query.id
                    }
                }
            }, )
            .then((movie) => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [DELETE] ./movie/delete/:id
    delete(req, res, next) {
        movie.delete({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [DELETE] ./movie/delete/danger/:id
    deleteDanger(req, res, next) {
        movie.deleteOne({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

    // [PATCH] ./movie/restore/:id
    restore(req, res, next) {
        movie.restore({
                _id: req.params.id
            })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }

}

module.exports = new movieController();