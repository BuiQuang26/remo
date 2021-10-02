const express = require('express');
const router = express.Router();
const user = require('../controller/userController')
const authenToken = require('../middleware/authenToken');
const isLikedMovie = require('../middleware/Is-like-movie')

router.post('/api/dele-movie-liked', authenToken, user.deleteMovieLiked);
router.post('/api/list-movie-liked', authenToken ,user.dataListMovieLiked);
router.get('/list-movie-liked', user.formListMovieLiked);
router.post('/checkLiked', authenToken, isLikedMovie, user.checkLiked);
router.post('/like', authenToken, isLikedMovie, user.like);
router.post('/', authenToken , user.nameUser);
router.get('/login', user.loginForm);
router.get('/register', user.registerForm);
router.post('/register', user.register);
router.post('/login', user.login);

module.exports = router

