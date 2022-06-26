const router = require('express').Router();
// just to make server work I added this function.
const handler = (req, res) => res.send('hello, world')
router.get('/:username', handler);

module.exports = router;