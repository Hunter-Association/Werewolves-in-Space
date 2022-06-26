const router = require('express').Router();

router.get('/', (req, res) => {
  // console.log(req.session);
  res.send({user: req.user, session: req.sessionID});
});



module.exports = router;