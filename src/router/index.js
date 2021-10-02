const siteRouter = require('./site');
const adminRouter = require('./admin');
const movieRouter = require('./movie');
const userRouter = require('./user');
const commentRouter = require('./comment')

function router(app) {
    app.use('/', siteRouter);
    app.use('/admin', adminRouter);
    app.use('/movie', movieRouter);
    app.use('/user', userRouter);
    app.use('/comment',commentRouter);
}

module.exports = router;