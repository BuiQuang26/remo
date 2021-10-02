const user = require('../model/user');
const movie = require('../model/movie');
const path = require('path');
const jwt = require('jsonwebtoken');

class userController {

    //[GET]  /user
    loginForm(req, res, next) {
        res.sendFile(path.join(__dirname, '../views', 'login.html'));
    }

    //[GET]  /user/register
    registerForm(req, res, next) {
        res.sendFile(path.join(__dirname, '../views', 'register.html'));
    }

    //[POST]  /user/register
    register(req, res, next) {
        user.findOne({
                username: req.body.username
            })
            .then((data) => {
                if (data) {
                    res.status(400).json({
                        success: false,
                        message: 'username da được sử dụng !!!',
                    })
                } else {
                    user.create(req.body);
                    var username = req.body.username;
                    const accessToken = jwt.sign({
                        username
                    },process.env.SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    res.set('accessToken', accessToken).json({
                        success: true,
                        message: 'Bạn đã đăng ký thành công',
                    })
                }
            })
            .catch(err => {
                res.status(500).send('loi server')
            })
    }

    //[POST]  /user/login
    login(req, res, next) {
        var {username,password} = req.body;

        user.findOne({
                username: username,
                password: password
            })
            .then(user => {
                if (user) {
                    const accessToken = jwt.sign({
                        username
                    }, process.env.SECRET_KEY, {
                        expiresIn: '1h'
                    });
                    res.set('accessToken', accessToken).json({
                        success: true,
                        message: 'bạn đã login thành công !!!',
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        message: 'username or password false !!!'
                    })
                }
            })
            .catch(err => {
                res.status(500).send('loi server')
            })
    }

    //[POST]  /user
    nameUser(req, res, next) {
        var username = res.locals.username;
        res.json({
            username
        })
    }

    //[POST]  /user/like
    like(req, res, next) {
        var username = res.locals.username;
        var arrayMovieLike = [];
        user.findOne({
                username: username
            })
            .then(userLocal => {
                arrayMovieLike = userLocal.movieLike;
                arrayMovieLike.push(req.body.movieId)
                return user.findOneAndUpdate({
                    username: username
                }, {
                    $set: {
                        movieLike: arrayMovieLike,
                    }
                })
            })
            .then(user => {
                res.json({
                    access: true,
                    message: 'đã thêm movie vao danh sach yeu thich thanh cong!!!'
                })
            })
            .catch(err => {
                res.status(500);
            })
    }

    //[POST]  /user/checkliked
    checkLiked(req, res, next) {
        res.send('movie chưa có trong danh mục yêu thích của bạn !!!');
    }

    //[GET] /user/list-movie-liked
    formListMovieLiked(req, res, next) {
        res.render('list-movie-liked');
    }

    //[POST] /user/list-movie-liked
    dataListMovieLiked(req, res, next) {
        var username = res.locals.username;
        var listMovieLike = [];
        user.findOne({
                username: username
            })
            .then(user => {
                var idMoviesLike = user.movieLike;
                movie.find({})
                    .then(movie => {
                        for (var i = 0; i < idMoviesLike.length; i++)
                            for (var j = 0; j < movie.length; j++) {
                                if (idMoviesLike[i] == movie[j]._id)
                                    listMovieLike.push(movie[j])
                            }
                        res.json(listMovieLike);
                    })
                    .catch(err => {
                        res.status(500)
                    });
            })
            .catch(err => {
                res.status(500);
            })
    }

    deleteMovieLiked(req, res, next) {
        const idMovie = req.body.idMovie;
        const username = res.locals.username;

        user.findOneAndUpdate({
                username: username
            }, {
                $pull: {
                    movieLike: idMovie,
                }
            })
            .then(data => {
                res.json({
                    access: true,
                    message: 'xóa thành công '
                })
            })
            .catch(err => {
                res.status(500);
            })
    }

}

module.exports = new userController;