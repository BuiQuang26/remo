const movieController = require('../controller/movieController')
const express = require('express');
const router = express.Router();


router.delete('/delete/:id', movieController.delete);
router.patch('/restore/:id', movieController.restore);
router.delete('/delete/danger/:id', movieController.deleteDanger)
router.post('/add-related/:slug', movieController.addRelate);
router.delete('/related/:slug', movieController.deleteRelate);
router.get('/:slug', movieController.showMovie);



module.exports = router;