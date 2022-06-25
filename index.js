const express = require('express');
const app = express();
const router = require('./routes');
const path = require('path');

app.use(express.json())
app.use('/', express.static(path.join(__dirname, './public')))
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port:', PORT))