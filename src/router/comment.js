const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenToken');
const commentController = require('../controller/commentController');


router.post('/',auth,commentController.addComment)

module.exports = router;