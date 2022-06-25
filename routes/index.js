const router = require('express').Router();
const authentication = require('./authentication');

router.use('/', (req, res) => res.send('hello'));
router.use('/authentication', authentication);
/*
  Express server redirects to here...
  all base path should start here with this syntax router.use('/anyPath', HandlerFunc)
  use router like App but split routes into there own folders/files so router mirrors file structure
  This allows for cleaner code base.
  from here make a new folder within the routes folder for each path that follows.
  const router = require('express').Router();
  make a new router using the above syntax in each new folder you make.
  require that router in this file to set up the route!
 */
module.exports = router;
