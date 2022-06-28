const router = require('express').Router();
const passWordRouter = require('./password');

<<<<<<< HEAD
// router.use('/password', passWordRouter)
// router.get('/:username', handler)
=======
router.use('/password', passWordRouter)
>>>>>>> dev


module.exports = router;