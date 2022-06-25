const router = require('express').Router();
const passWordRouter = require('./password');

router.use('/password', passWordRouter)
router.get('/:username', handler)


module.exports = router;