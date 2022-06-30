const router = require('express').Router();
const login = require('./login');
const signup = require('./signup');
const user = require('./user');

router.use('/login', login);
router.use('/signup', signup);
router.use('/user', user);

module.exports = router;