const mongoose = require('mongoose');

mongoose.connect(
  // connection path goes here
<<<<<<< HEAD
  'mongodb://localhost:27017/users',
=======
  // 'mongodb://localhost:27017/users',
>>>>>>> dev
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
)
  .catch((error) => console.log(error));

const user = new mongoose.Schema({
  username: String,
  password: String,
});

module.exports = mongoose.model('User', user);
