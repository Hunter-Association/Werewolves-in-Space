const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

//going to come back to this to change from "secretcode"
app.use(session({
  secret: 'secretcode',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);


app.use('/', express.static(path.join(__dirname, './public')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port:', PORT));