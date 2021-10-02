const siteController = require('../controller/siteController')
const express = require('express');
const router = express.Router();

// router.get('/search', siteController.search);

router.get('/list-all-movie', siteController.listAllMovie);
router.post('/list-all-movie', siteController.listAllMovieFilter);
router.get('/', siteController.index);

module.exports = router;