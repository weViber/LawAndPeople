const express = require('express');

const router = express.Router();

const casesRouter = require('./cases.routes');
const counselRouter = require('./counsel.routes');
const searchRouter = require('./search.routes');
const guideRouter = require('./guide.routes');
const videoRouter = require('./video.routes');
const userRouter = require('./user.routes');
const uploadsRouter = require('./uploads.routes');

router.use('/cases', casesRouter);
router.use('/counsel', counselRouter);
router.use('/search', searchRouter);
router.use('/guide', guideRouter);
router.use('/video', videoRouter);
router.use('/user', userRouter);
router.use('/uploads', uploadsRouter);

module.exports = router;