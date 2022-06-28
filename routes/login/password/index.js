const router = require('express').Router();
<<<<<<< HEAD

// router.get('/:username', handler);
=======
// just to make server work I added this function.
const handler = (req, res) => res.send('hello, world')
router.get('/:username', handler);
>>>>>>> dev

module.exports = router;