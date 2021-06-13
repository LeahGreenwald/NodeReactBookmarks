const router = require('express').Router();
const account = require('./account');
const bookmarks = require('./bookmarks');

router.use('/account', account);
router.use('/bookmarks', bookmarks);

module.exports = router;