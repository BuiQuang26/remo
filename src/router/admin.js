const adminController = require('../controller/adminController')
const express = require('express');
const router = express.Router();
const authTokenAdmin = require('../middleware/authenTokenAdmin');


router.delete('/comment',adminController.deleComment)
router.post('/add-movie/save', adminController.save);
router.get('/update/:id',adminController.update);
router.post('/update/:id',adminController.updateSave);
router.get('/add-movie', authTokenAdmin,adminController.addMovie);
router.get('/Garbage-box', authTokenAdmin,adminController.GarbageBox);
router.get('/login',adminController.loginForm)
router.post('/login',adminController.checkAdmin)
router.get('/:slug', adminController.adminShowMovie);
router.get('/', authTokenAdmin,adminController.index);


module.exports = router;