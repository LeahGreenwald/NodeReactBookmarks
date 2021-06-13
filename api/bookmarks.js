const router = require('express').Router();
const bookmarksDb = require('../db/bookmarks');

router.get('/getbookmarks', async (req, res) => {
    const bookmarks = await bookmarksDb.getbookmarks(req.query.id);
    res.json(bookmarks);
});

router.post('/addbookmark', async (req, res) => {
    await bookmarksDb.addbookmark(req.body);
    res.json({status: 'ok'});
});

router.post('/delete', async (req, res) => {
    await bookmarksDb.deleteBookmark(req.query.id);
    res.json({status: 'ok'});
});

router.post('/update', async (req, res) => {
    await bookmarksDb.update(req.query.id, req.query.title);
    res.json({status: 'ok'});
})

router.get('/gettop5', async (req, res) => {
    const top5 = await bookmarksDb.top5();
    res.json(top5);
})


module.exports = router;