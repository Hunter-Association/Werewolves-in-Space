const router = require('express').Router();
const User = require('../../../model/db.js');
const bcrypt = require('bcryptjs');


router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, async (error, doc) => {
    if (error) throw error;
    if (doc) res.send('User Already Exists');
    if(!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});



module.exports = router;