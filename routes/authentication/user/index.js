const router = require('express').Router();

router.get('/', (req, res) => {
  res.send({user: req.user, session: req.sessionID});
});



module.exports = router;