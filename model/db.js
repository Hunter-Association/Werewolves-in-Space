const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://shank:vEpe5XgqPjzF6711@cluster0.ddi8xuv.mongodb.net/ocean?retryWrites=true&w=majority',
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
