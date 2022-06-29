const mongoose = require('mongoose');

mongoose.connect(
  // connection path goes here
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
