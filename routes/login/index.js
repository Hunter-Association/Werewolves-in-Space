const router = require('express').Router();
const passWordRouter = require('./password');

router.use('/password', passWordRouter)


module.exports = router;